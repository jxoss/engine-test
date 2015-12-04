// data test handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options.num);
    setTimeout(function () {
        next(null, data);
    }, 1000);
};

// stream test handler
exports.stream = function (stream, options) {
    console.log('Stream handler:', options);
    return stream;
};
