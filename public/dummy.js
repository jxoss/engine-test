exports.init = function () {
    this.log('I', 'Dummy initialized.');
};
exports.data = function () {
    this.log('I', 'Dummy data handler.');
};
exports.error = function () {
    this.log('I', 'Dummy error handler.');
};
exports.stream = function () {
    this.log('I', 'Dummy client handler.');
};