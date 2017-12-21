// Load components dependencies
import contactItemModule from './_components/contactItem/contactItem';
import specialContactItemModule from './_components/specialContactItem/specialContactItem';

// load main component
import contactsComponent from './contacts.component';

const contactsModule = angular
    .module('main.pages.app.contacts', [
        contactItemModule,
        specialContactItemModule,
    ])
    .component('contacts', contactsComponent)
    .name;

export default contactsModule;
