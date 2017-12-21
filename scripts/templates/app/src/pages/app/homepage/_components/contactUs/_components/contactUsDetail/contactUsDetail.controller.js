/** @ngInject */
export default function contactUsDetailController($state, hoursSrv) {
    // contacts state
    const contactsState = 'app.contacts';

    // Private, utils
    const setOpeningTime = (openingTime) => {
        this.openingTime = openingTime;
    };

    // Binding datas
    this.openingTime = [];

    // Binding actions
    this.navigateToContacts = () => $state.go(contactsState);

    // Binding process
    this.$onInit = () => hoursSrv.getOpeningTime().then(setOpeningTime);

    return this;
}
