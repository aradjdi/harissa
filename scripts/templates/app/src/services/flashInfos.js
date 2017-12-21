/* @ngInject */
export default function flashInfosSrv(fetchSrv) {
    this.getFlashInfos = () => fetchSrv.get('news/flashs').then(result => result.data);

    return this;
}
