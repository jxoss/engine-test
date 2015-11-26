exports.init = function () {

    // Tests
    // - check if module is initialized
    this.log('I', 'Dummy initialized.');
};

exports.data = function (stream, data, argN) {

    // Test
    // - check if data handler is called in the right order
    // - check if data arguments are correct
    this.log('I', 'Dummy data handler.');
};
exports.error = function (stream, error, argN) {

    // Test
    // - check if error handler is called in the right order
    // - check if error arguments are correct
    this.log('I', 'Dummy error handler.');
};
exports.handler = function (stream, argN) {

    // Test
    // - check if stream handler is called in the right order
    // - check if handler arguments are correct
    this.log('I', 'Dummy client handler.');
};