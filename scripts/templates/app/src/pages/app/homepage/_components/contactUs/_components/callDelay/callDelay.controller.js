import WebSocketMessenger from './_messenger/webSocketMessenger';

// differents states colors
const color = {
    LIGHT: '#79b94b',
    MODERATE: '#df8145',
    HEAVY: '#9a3135',
};

/**
 * Format data for gauge chart
 * @param callDelay {Object} waiting time, state
 * @return {Object} format gauge data chart callDelay
 * */
const formatGaugeData = callDelay => ({
    value: callDelay.waitingTime,
    color: color[callDelay.level],
});

/** @ngInject */
export default function callDelayController($timeout, hoursSrv) {
    this.waitingTime = {};
    const setWaitingTime = waitingTime => $timeout(() => {
        this.waitingTime = formatGaugeData(waitingTime);
    }, 0);
    const setCallDelay = callDelay => setWaitingTime(callDelay.waitingTime);

    let subscription;
    const callDelaySocket = new WebSocketMessenger('waitingtime/');
    const startCallDelaySocket = () => {
        subscription = callDelaySocket.subscribe(setCallDelay);
    };
    const stopCallDelaySocket = () => {
        callDelaySocket.unsubscribe(subscription);
    };

    let firstLoadPromise;
    this.$onInit = () => {
        firstLoadPromise = hoursSrv.getCallDelay();
        firstLoadPromise.then(setWaitingTime);
        firstLoadPromise.then(startCallDelaySocket);
    };
    this.$onDestroy = () => {
        firstLoadPromise.then(stopCallDelaySocket);
    };

    return this;
}
