const _ = require('lodash');

const mergeConfig = (...configs) => _.mergeWith({}, ...configs, (a, b) => {
    if (_.isArray(a)) {
        return a.concat(b);
    }
    return undefined;
});

const mergeSimpleConfig = (...configs) => _.merge({}, ...configs);

module.exports = {
    mergeConfig,
    mergeSimpleConfig,
};
