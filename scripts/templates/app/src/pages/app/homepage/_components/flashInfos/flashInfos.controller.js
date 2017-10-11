/** @ngInject */
export default function flashInfosController($timeout, flashInfosSrv) {
  this.flashInfos = [];

  const setFlashInfos = (flashInfos) => {
    this.flashInfos = flashInfos;
  };

  this.$onInit = () => flashInfosSrv.getFlashInfos().then(setFlashInfos);

  return this;
}
