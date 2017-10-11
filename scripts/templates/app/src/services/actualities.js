/* @ngInject */
export default function actualitiesSrv(fetchSrv) {
  this.getActualities = () => fetchSrv.get('news/actualities').then(result => result.data);

  return this;
}
