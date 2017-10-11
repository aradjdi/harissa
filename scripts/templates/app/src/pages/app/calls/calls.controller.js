/** @ngInject */
export default function callsController($timeout, callsSrv) {
  this.calls = [];

  this.setCalls = calls => $timeout(() => { this.calls = calls; }, 0);

  this.$onInit = () => callsSrv.getCalls().then(this.setCalls);

  return this;
}
