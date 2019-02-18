const Q = require('q');

const logs = require('./_logs');

function spy(action, file, caller) {
    let self;

    if (this && this.then) {
        self = this;
    } else {
        self = Q();
    }

    return self
        .tap(() => logs.info(`-- ${file}`, `start ${caller}`))
        .then(action)
        .tap(() => logs.success(`-- ${file}`, `finish ${caller}`))
        .catch((err) => {
            logs.error(`-- ${file}`, `${caller} failed`, err);
            throw err;
        });
}

Q.makePromise.prototype.spy = spy;
