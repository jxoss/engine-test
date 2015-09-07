exports.getTests = function (data, stream) {

    // implement caching, cause the method can be called directly from a route
    stream.write(null, {index: 1, name: 'A', duration: 0.003, status: 'Passed', date: '1/1/11'});
    stream.write(null, {index: 2, name: 'B', duration: 0.003, status: 'Failed', date: '2/2/12'});
    stream.write(null, {index: 3, name: 'C', duration: 0.003, status: 'Passed', date: '3/3/13'});
};

exports.getTest = function (data, stream) {

    stream.write(null, {
        name: data.name,
        flow: [
            [
                "event1",
                "method1"
            ]
        ]
    });
};

exports.saveTest = function (data, stream) {

};

exports.runTests = function (data, stream) {

};

exports.runTest = function (data, stream) {

};