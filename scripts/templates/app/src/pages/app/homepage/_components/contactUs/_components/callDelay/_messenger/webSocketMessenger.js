import Messenger from './messenger';

const endPoint = 'ws:api-vip-rec-dmz.mousquetaires.com/ws/';

export default class WebSocketMessenger extends Messenger {
    constructor(url) {
        super();

        this.url = url;
        this.socket = null;
    }

    start() {
        this.socket = new WebSocket(endPoint + this.url);
        this.socket.addEventListener('close', this.restart.bind(this));
        this.socket.addEventListener('message', this.publish.bind(this));
    }

    restart() {
        if (this.socket) {
            this.socket.removeEventListener('close', this.restart.bind(this));
            this.socket.removeEventListener('message', this.publish.bind(this));

            this.start();
        }
    }

    stop() {
        this.socket.removeEventListener('close', this.restart.bind(this));
        this.socket.removeEventListener('message', this.publish.bind(this));

        // Si la WS n'est encore ouverte
        if (this.socket.readyState === 0) {
            // Cas particulier, il faut attendre que la WS soit ouverte avant de la close
            this.socket.addEventListener('open', this.close.bind(this));
        } else {
            this.close();
        }
    }

    close() {
        this.socket.close();
        this.socket = undefined;
    }

    subscribe(callback) {
        if (!this.socket) this.start();

        return super.subscribe(callback);
    }

    unsubscribe(id) {
        super.unsubscribe(id);

        if (!this.subscribers.length) this.stop();
    }
}
