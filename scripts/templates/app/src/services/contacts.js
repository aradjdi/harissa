/* @ngInject */
export default function contactsSrv($q, fetchSrv) {
    let rawContactsDeferred;
    const getRawContacts = () => {
        if (!rawContactsDeferred) rawContactsDeferred = $q.defer();

        fetchSrv.get('contacts')
            .then(result => rawContactsDeferred.resolve(result.data))
            .catch(error => rawContactsDeferred.reject(error));

        return rawContactsDeferred.promise;
    };

    this.getContacts = () => getRawContacts()
        .then(data => data.detailsServices.filter(contact => !contact.color));

    this.getSpecialContacts = () => getRawContacts()
        .then(data => data.detailsServices.filter(contact => contact.color));

    return this;
}
