const Q = require('q');

let startime;

const start = () => {
    startime = Date.now();
    return Q();
};

const end = () => {
    const endtime = Date.now();
    const duration = (endtime - startime) / 1000;
    return Q(duration.toFixed(3));
};

module.exports = {
    start,
    end
};
