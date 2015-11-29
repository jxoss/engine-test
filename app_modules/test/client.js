var stream = require('stream');
// data handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options.num);
    next(null, data);
};

// stream handler
exports.stream = function (seqStream, options) {

    console.log('Stream handler:', options);
    var newStream = stream.Transform({
        objectMode: true,
        transform: function (chunk, enc, next) {
            console.log('Custom transform', options.num);
            next(null, chunk);
        }
    });

    return newStream;
};

