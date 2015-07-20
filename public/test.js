var flows = [];

exports.init = function () {

    /*
     * ":" -> Data handler
     * "|" -> Stream handler
     * ">" -> Stream handler with loop stream
     */

    for (var i = 0, flow; i < flows.length; i++) {
        flow = flows[i];
    }

    this.flows = {
        one: [
            [   // data handler call
                ":",
                [":data", {index: 1}]
            ],
            [   // stream handler call
                "|",
                ["stream", {index: 1}]
            ],
            [   // link handler call
                ">",
                ["link", {index: 1}]
            ]
        ],
        two: [
            [   // data -> data
                "::",
                [":data", {index: 1, next: ":"}],
                [":data", {index: 2}]
            ],
            [   // data -> stream
                ":|",
                [":data", {index: 1, next: "|"}],
                ["stream", {index: 2}]
            ],
            [   // data -> link
                ":>",
                [":data", {index: 1, next: ">"}],
                ["link", {index: 2}]
            ],
            [   // stream -> stream
                "||",
                ["stream", {index: 1, next: "|"}],
                ["stream", {index: 1}]
            ],
            [   // stream -> data
                "|:",
                ["stream", {index: 1, next: ":"}],
                [":data", {index: 2}]
            ],
            [   // stream -> link
                "|>",
                ["stream", {index: 1, next: ">"}],
                ["link", {index: 2}]
            ],
            [   // link -> link
                ">>",
                ["link", {index: 1, next: ">"}],
                ["link", {index: 2}]
            ],
            [   // link -> data
                ">:",
                ["link", {index: 1, next: ":"}],
                [":data", {index: 2}]
            ],
            [   // link -> stream
                ">|",
                ["link", {index: 1, next: "|"}],
                ["stream", {index: 2}]
            ]
        ]
    };

    var i;
    for (i = this.flows.one.length - 1; i >= 0; i--) {
        this.mind(this.flows.one[i]);
    }
    for (i = this.flows.two.length - 1; i >= 0; i--) {
        this.mind(this.flows.two[i]);
    }

    /*
    var threeHandlers = [
        [   // 
            ":::"
        ],
        [   // 
            "::|"
        ],
        [   // 
            ":|:"
        ],
        [   // 
            ":||"
        ],
        [   // 
            "::>"
        ],
        [   // 
            ":>:"
        ],
        [   // 
            ":>>"
        ],
        [   // 
            "|||"
        ],
        [   // 
            "||:"
        ],
        [   // 
            "|:|"
        ],
        [   // 
            "|::"
        ],
        [   // 
            "||>"
        ],
        [   // 
            "|>|"
        ],
        [   // 
            "|>>"
        ],
        [   // 
            ">>>"
        ],
        [   // 
            ">>:"
        ],
        [   // 
            ">:>"
        ],
        [   // 
            ">::"
        ],
        [   // 
            ">>|"
        ],
        [   // 
            ">|>"
        ],
        [   // 
            ">||"
        ]
    ];
    */
};

exports.test = {
    flow: function (stream) {

        stream.data([this, function () {

            console.log('1. -> TEST FLOW STREAM WITH ONE HANDLER');
            callFlows.call(this, this.flows.one);
            console.log('2. -> TEST FLOW STREAM WITH TWO HANDLERS');
            callFlows.call(this, this.flows.two);
        }]);
    }
};

function callFlows (flows) {
    for (var i = flows.length - 1; i >= 0; i--) {

          // emit event
          this.flow(flows[i][0]).write(

              // error
              null,

              // write the event name to stream
              {
                  event: flows[i][0],
                  data: ''
              }
          );
    }
}

exports.data = function (err, data, stream, testConfig) {
    
    // checks
    // - if expected arguments are received
    // - if data object contains all expected data
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order
    
    console.log(':DATA', data, testConfig);
};

exports.stream = function (stream, testConfig) {

    // checks
    // - if expected arguments are received
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order

    stream.data([this, this.data], testConfig);

    return stream;
};

exports.link = function (stream, testConfig) {

    // checks
    // - if expected arguments are received
    // - function scope
    // - stream scope
    // - how many times the handler is called
    // - if method is called, timeout after a while
    // - call order

    stream._ext = true;
    stream.data([this, this.data], testConfig);

    return stream;
};
