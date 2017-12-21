import * as localForage from 'localforage';
import Q from 'q';

export default class LocalForageStorage {
    constructor(name) {
        this.name = name;
        this.storage = undefined;
        this.initPromise = undefined;
    }

    init() {
        if (!this.initPromise) {
            this.initPromise = Q.defer();

            this.storage = localForage.default.createInstance({name: this.name});
            this.initPromise.resolve(this.storage);
        }

        return this.initPromise.promise;
    }

    set(key, value) {
        return this.storage.setItem(key, value);
    }

    get(key) {
        return this.storage.getItem(key);
    }

    remove(key) {
        return this.storage.removeItem(key);
    }

    keys() {
        return this.storage.keys();
    }

    clean() {
        return this.storage.clear();
    }
}
