// data handler
exports.data = function (options, data, next) {
    console.log('Data handler:', options, data);
    next(null, data);
};

// stream handler
exports.stream = function (stream, options) {
    console.log('Stream handler:', options);
};

