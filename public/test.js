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

function streamHandler (A) {
  
  // IMPORTANT:
  // - "FL" stands for this.flow([] || "event") stream.
  // - "i" is input streams
  // - "o" are output streams
  
  // Stream A setup:
  // (A.w).o ==> (?.d)
  //      .i --> (FL.d).o ==> (?.d)
  //                   .i --> (?.d)
  // (A.d).o ==> (?.d)
  
  // Stream B setup:
  // (B.w).o ==> (?.d)
  //      .i --> (?.d)
  // (B.d).o ==> (?.d)
  var B = this.flow([] || "event");
  
  // Stream C setup (_ext):
  // (C.w).o ==> (?.d)
  // (C.d)
  var C = this.flow([] || "event");
  C._ext = true;
  
  // TODO connect streams with emit and link
  // TODO show how to connect streams in stream handler
  
  // 1. ?.d <--o FL.d <--i (A.w) o--> ?.d
  A.write(err, data);
  
  // 1. ?.d <--i (FL.w) o--> A.d o--> ?.d
  // 2. ?.d <--o FL.d <--i (A.w) o--> ?.d
  A.data(A.write.bind(A));
  
  // 1. ?.d <--i (FL.w) o--> A.d o--> ?.d
  // 2. ?.d <--i (B.w) o--> ?.d (note, that writing on B don't emit data on B itself, FL or A.)
  A.data(stream_B.write.bind(stream_B));
  
  // Not connected streams
  // ------------------------------------------------------------------------------
  // 2. ?.d <--i (B.w) o--> ?.d
  B.write(err, data);
  
  // 1. ?.d <--i (?.w) o--> B.d o--> ?.d
  // 2. ?.d <--i (B.w) o--> ?.d
  B.data(B.write.bind(B));
  
  // 1. ?.d <--i (?.w) o--> B.d o--> ?.d
  // 2. ?.d <--o FL.d <--i (A.w) o--> ?.d
  B.data(A.write.bind(A));
  
  // 1. |i (C.w) o--> ?.d (note, that "_ext" streams only write to the output and NOT on the input)
  C.write();
  
  // 1. <--i (?.w) o--> C.d| (note, that "_ext" streams, WON'T emit the received data further to the ouput)
  // 2. |i (C.w) o--> ?.d
  C.data(C.write.bind(C));
  
  // 1. <--i (?.w) o--> C.d|
  // 2. ?.d <--o FL.d <--i (A.w) o--> ?.d
  C.data(A.write.bind(A));
}


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
