import _ from 'lodash';

const getUniqueId = () => (new Date()).getTime();

export default class Messenger {
  constructor() {
    this.subscribers = [];
  }

  publish(event) {
    const data = JSON.parse(event.data);
    this.subscribers.forEach(subscriber => subscriber.callback(data));
  }

  subscribe(callback) {
    const id = getUniqueId();

    this.subscribers.push({ callback, id });

    return id;
  }

  unsubscribe(id) {
    _.remove(this.subscribers, subscriber => subscriber.id === id);
  }
}
