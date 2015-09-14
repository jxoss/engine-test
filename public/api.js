var tests = [
    {index: 1, name: 'A', duration: 0.003, status: 'Passed', vis_state: 'success', date: '1/1/11'},
    {index: 2, name: 'B', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 3, name: 'C', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 4, name: 'D', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '2/2/12'},
    {index: 5, name: 'E', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 6, name: 'F', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 7, name: 'G', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 8, name: 'H', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '3/3/13'},
    {index: 9, name: 'I', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '2/2/12'},
    {index: 10, name: 'J', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 11, name: 'K', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 12, name: 'L', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 13, name: 'N', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '2/2/12'},
    {index: 14, name: 'M', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 15, name: 'O', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '2/2/12'},
    {index: 16, name: 'P', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 17, name: 'Q', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 18, name: 'R', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 19, name: 'S', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 20, name: 'T', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 21, name: 'U', duration: 0.003, status: 'Failed', vis_state: 'danger', date: '2/2/12'},
    {index: 22, name: 'V', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 23, name: 'W', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 24, name: 'X', duration: 0.003, status: 'Incomplete', vis_state: 'warning', date: '3/3/13'},
    {index: 25, name: 'Y', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'},
    {index: 26, name: 'Z', duration: 0.003, status: 'Passed', vis_state: 'success', date: '3/3/13'}
];

exports.getTests = function (stream, options, data) {

    // implement caching, cause the method can be called directly from a route
    var index = 0;
    var ivid = setInterval(function() {
        stream.write(null, tests[index]);
        if (++index === tests.length) {

            // signal sequenze end
            stream.write(null, null);
            return clearInterval(ivid);
        }
    }, 25);
};

exports.getTest = function (stream, options, data) {

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

exports.saveTest = function (stream, options, data) {

};

exports.runTests = function (stream, options, data) {

};

exports.runTest = function (stream, options, data) {

};