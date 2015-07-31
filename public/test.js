
console.log('REQUIRE "./worker":', require('./worker'));
console.log('REQUIRE "/worker":', require('/worker'));
console.log('REQUIRE "(W)/worker":', require('(W)/worker'));

function combinator (items, multiply) {
    
    var result = [];
    var combos = [];
    for (var i = 0, _c; i < multiply; ++i) {
        combos.push(items);
        result = result.concat(allPossibleCases(combos));
    }
    
    return result;
}

function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] + allCasesOfRest[i]);
      }
    }
    return result;
  }
}

exports.init = function () {

    // generate all possible combinations
    // - ":" -> Data handler
    // - "|" -> Stream handler
    // - ">" -> Broken stream handler
    this.flows = combinator([":", "!", "|", ">"], this._config.handlerCount || 1);

    // create test flow config for every combination
    for (var i = 0, type, handler, flow; i < this.flows.length; ++i) {
        type = this.flows[i];
        flow = [type];

        for (var c = 0, cl = type.length; c < cl; ++c) {

            switch (type[c]) {

                case ':':
                    handler = ':data';
                    break;
                case '|':
                    handler = 'stream';
                    break;
                case '>':
                    handler = '>stream';
                    break;
                case '!':
                    handler = '!error';
                    break;

                default:
                    this.log('E', 'Invalid flow type "' + type + '"');
            }
            
            // push handler into flow config
            flow.push([handler, {
                
                // handler arguments
                id: i,
                name: type
            }]);
        }
        
        // push flow stream
        this.flows[i] = flow;

        // listen to flow event
        this.mind(flow);
    }
};


exports.test = function (stream) {
    stream.data([this, function () {

        console.log('TEST ' + this.flows.length + ' FLOW STREAM HANDLERS');
        callFlows.call(this, this.flows);
    }]);
};

function callFlows (flows) {
    for (var i = 0, l = flows.length, stream; i < l; ++i) {
      
          // create stream
          stream = this.flow(flows[i][0]);
          
          // write to data handlers
          stream.write(null,{
              id: i,
              name: flows[i][0]
          });
          
          // write to error handlers
          stream.write({
              id: i,
              name: flows[i][0]
          });
    }
}

exports.data = function (data, stream, args) {
    
    // checks
    // - if expected arguments are received
    if (!args) {
        console.log('Data: No args');
    }
    // - if data object contains all expected data
    if (!data) {
        console.log('Data: No data');
    }
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order
    
    //setTimeout(function() {
    //    stream.write(err, data);
    //}, 0);
    
    this.log('I', {
        type: ':',
        id: args.id,
        name: args.name
    }, 'data successful');
};

exports.error = function (data, stream, args) {
    
    // checks
    // - if expected arguments are received
    if (!args) {
        console.log('Error: No args');
    }
    // - if data object contains all expected data
    if (!data) {
        console.log('Error: No data');
    }
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order
    
    //setTimeout(function() {
    //    stream.write(err, data);
    //}, 0);
    
    this.log('I', {
        type: ':',
        id: args.id,
        name: args.name
    }, 'error successful');
};

exports.stream = function (stream, args) {

    // checks
    // - if expected arguments are received
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order

    stream.data([this, this.data], args);

    return stream;
};

exports.broken = function (stream, args) {

    // checks
    // - if expected arguments are received
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order

    stream._break = true;
    stream.data([this, function (data, stream, args) {
        setTimeout(function() {
            stream.write(data);
        }, 0);
    }], args);

    return stream;
};
