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
    this.flows = combinator([":", "|", ">"], this._config.handlerCount || 1);
    
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
                handler = 'broken';
                break;
              
              default:
                this.log('E', 'Invalid flow type "' + type + '"');
            }
            
            flow.push([handler, {
                id: i,
                name: type
            }]);
        }
        
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
    for (var i = 0, l = flows.length; i < l; ++i) {

          // emit event
          this.flow(flows[i][0]).write(

              // error
              null,

              // write the event name to stream
              {
                  id: i,
                  name: flows[i][0]
              }
          );
    }
}

exports.data = function (err, data, stream, args) {
    
    // checks
    // - if expected arguments are received
    if (!args) {
        console.log('');
    }
    // - if data object contains all expected data
    if (!data) {
        console.log('');
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
    }, 'successful');
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

    stream._ext = true;
    stream.data([this, function (err, data, stream, args) {
        setTimeout(function() {
            stream.write(err, data);
        }, 0);
    }], args);

    return stream;
};
