/* @ngInject */
export default function callsSrv(fetchSrv, pdvStorage) {
  this.getCalls = () => pdvStorage.getPdv()
    .then(pdv => fetchSrv.get(`call/history/${pdv}`))
    .then(result => result.data);

  return this;
}
