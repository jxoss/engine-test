var stream = require('stream');

// data handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options.num);
    next(null, JSON.stringify(data));
};

// stream handler
exports.stream = function (chain, options, onError) {

    console.log('Stream handler:', options);
    var newStream = stream.Transform({
        objectMode: true,
        transform: function (chunk, enc, next) {
            console.log('Custom transform', options.num, chunk);
            next(null, chunk);
        }
    })
    newStream.on('error', onError);

    chain.i.pipe(newStream).pipe(chain.o);
};

