exports.getTests = function (data, stream) {

    // implement caching, cause the method can be called directly from a route
    stream.write(null, {name: 'A', duration: 0.003, status: 1, date: '11/11/11'});
    stream.write(null, {name: 'B', duration: 0.003, status: 1, date: '11/11/11'});
    stream.write(null, {name: 'C', duration: 0.003, status: 1, date: '11/11/11'});
};

exports.getTest = function (stream, data) {

};

exports.saveTest = function (stream, data) {

};

exports.runTests = function (stream, data) {

};

exports.runTest = function (stream, data) {

};