const contactsBack = {
  head: 'MES CONTACTS',
  detailsServices: [{
    color: 'GREEN',
    hexColor: '#5CBD74',
    backgroundColor: 'GREY',
    hexBackgroundColor: '#E6E1E5',
    serviceName: 'Mon Assistance PDV',
    contactNumber: '02 99 84 70 40',
    schedules: 'Horaires : De 07H00 à 21H00 du Lundi au Samedi',
    comment: 'La Gestion Administrative du Lundi au Vendredi',
    link: '',
  }, {
    color: 'ORANGE',
    hexColor: '#E35C25',
    backgroundColor: 'GREY',
    hexBackgroundColor: '#E6E1E5',
    serviceName: 'Astreinte',
    contactNumber: '06 75 09 38 38',
    schedules: 'Tous les Dimanches de 08H00 à 13H00 pour les incidents bloquants liés à la Monétique',
    comment: '',
    link: '',
  }, {
    color: 'RED',
    hexColor: '#D54140',
    backgroundColor: 'GREY',
    hexBackgroundColor: '#E6E1E5',
    serviceName: 'Permanence ',
    contactNumber: '01 41 17 24 01 ',
    schedules: 'Le 17/04/2017 : De 07H00 à 14H00',
    comment: '',
    link: '',
  }, {
    color: 'RED',
    hexColor: '#D54140',
    backgroundColor: 'GREY',
    hexBackgroundColor: '#E6E1E5',
    serviceName: 'Astreinte',
    contactNumber: '06 08 75 47 22',
    schedules: 'Le 17/04/2017 : De 14H00 à 20H00',
    comment: '',
    link: '',
  }, {
    color: null,
    hexColor: '',
    backgroundColor: null,
    hexBackgroundColor: '',
    serviceName: 'Mon Service Commercial',
    contactNumber: '02 99 84 70 55',
    schedules: 'Horaires : De 09H30 à 12H30, puis de 14H00 à 18H00 du Lundi au Vendredi',
    comment: 'Fax : 01 41 48 35 44',
    link: '',
  }, {
    color: null,
    hexColor: '',
    backgroundColor: null,
    hexBackgroundColor: '',
    serviceName: 'Mon Assistance Regiex',
    contactNumber: '02 99 84 70 39',
    schedules: 'Horaires : De 09H30 à 18H30 du Lundi au Vendredi',
    comment: '',
    link: '',
  }, {
    color: null,
    hexColor: '',
    backgroundColor: null,
    hexBackgroundColor: '',
    serviceName: 'Service E-commerce PDV',
    contactNumber: '02 99 84 38 68',
    schedules: 'Horaires : De 08H00 à 21H00 du Lundi au Samedi',
    comment: '',
    link: '',
  }, {
    color: null,
    hexColor: '',
    backgroundColor: null,
    hexBackgroundColor: '',
    serviceName: 'Service Accueil PDV',
    contactNumber: '02 99 84 70 27',
    schedules: 'Horaires : De 08H30 à 18H00 du Lundi au Vendredi',
    comment: 'Fax : 02 99 84 70 30',
    link: '',
  }],
};

const rawContacts = contactsBack.detailsServices;

/* @ngInject */
export default function contactsSrv($q) {
  this.getContacts = () => {
    const contacts = rawContacts.filter(contact => !contact.color);
    return $q(resolve => resolve(contacts));
  };
  this.getSpecialContacts = () => {
    const contacts = rawContacts.filter(contact => contact.color);
    return $q(resolve => resolve(contacts));
  };

  return this;
}
