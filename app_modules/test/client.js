// run test
exports.run = function (stream, options) {

    // call test events
    // render results
    var pkg = {
        verify: function () {
            // ..
        }
    };

    /*var flow = this.flow('test');
    flow.write(pkg);
    flow.end('endData');
    flow.on('end');
    flow.on('error');
    flow.on('data');*/
};

// data handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options, data);
    next(null, data);
};

// stream handler
exports.stream = function (stream, options) {
    console.log('Stream handler:', options);
};

