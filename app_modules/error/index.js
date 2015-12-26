exports.server = function (options, data, next) {
    console.log('SERVER ERROR DH:', options, data);
    next(null, data);
};

exports.client = function (options, data, next) {
    console.log('CLIENT ERROR DH:', options, data);
    next(null, data);
}
