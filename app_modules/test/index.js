// data test handler
exports.data = function (options, data, next) {

    console.log('Data handler:', options.num, options.session);

    setTimeout(function () {
        //next(new Error('Test server error'));
        next(null, data);
    }, 10);
};

// stream test handler
exports.stream = function (stream, options) {
    console.log('Stream handler:', options);
    return stream;
};
