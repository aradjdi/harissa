/* @ngInject */
export default function hoursSrv(fetchSrv) {
    this.getOpeningTime = () => fetchSrv.get('contacts/openhours').then(result => result.data);

    this.getCallDelay = () => fetchSrv.get('contacts/waitingtime').then(result => result.data);

    this.getAffluenceStats = () => fetchSrv.get('contacts/rushhours').then(result => result.data);

    return this;
}
