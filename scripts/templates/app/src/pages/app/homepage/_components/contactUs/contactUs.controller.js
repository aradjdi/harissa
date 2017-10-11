/** @ngInject */
export default function contactUsController(hoursSrv) {
  // Private, utils
  const setSavIsClosed = (openingTime) => {
    this.savIsClosed = (openingTime && (
      openingTime.openingTimeHumanReadable === '00h' ||
      openingTime.closingTimeHumanReadable === '00h' ||
      openingTime.openingTime === '' ||
      openingTime.closingTime === ''
    )) || !openingTime;
  };

  // Binding datas
  this.savIsClosed = false;

  // Binding process
  this.$onInit = () => hoursSrv.getOpeningTime().then(setSavIsClosed);

  return this;
}
