// data test handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options.num);
    next(null, data);
};

// stream test handler
exports.stream = function (stream, options) {
    console.log('Stream handler:', options);
    return stream;
};
