/** @ngInject */
export default function contactsController($timeout, $q, contactsSrv) {
  this.contacts = [];
  this.specialContacts = [];

  this.setContacts = contacts => $timeout(() => { this.contacts = contacts; }, 0);
  this.setSpecialContacts = contacts => $timeout(() => { this.specialContacts = contacts; }, 0);

  this.$onInit = () => {
    $q.all([
      contactsSrv.getContacts().then(this.setContacts),
      contactsSrv.getSpecialContacts().then(this.setSpecialContacts),
    ]);
  };

  return this;
}
