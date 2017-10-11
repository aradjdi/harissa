const rawActualities = [{
  title: 'Déclaration sociale nominative. Prestation de fin d\'année.',
  summary: 'Informations sur la prestation de fin d\'année (PFA).',
  state: 'Information',
  startDate: '2017-05-02T15:31:11Z',
  endDate: '',
  link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=117,E=0000052785970151680,K=5805,Sxi=0,Case=obj(446323),templateset=defautpdv3',
}, {
  title: 'Flash URGENT : Incident BL Electronique',
  summary: '',
  state: 'En cours',
  startDate: '2017-05-02T10:35:57Z',
  endDate: '',
  link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=117,E=0000052785970151680,K=5805,Sxi=0,Case=obj(398443),templateset=defautpdv3',
}, {
  title: 'Problème de transmission des commandes.',
  summary: 'Le problème de transmission des commandes sur la région Est est maintenant résolu.',
  state: 'Résolu',
  startDate: '2017-04-28T17:10:37Z',
  endDate: '',
  link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=117,E=0000052785970151680,K=5805,Sxi=0,Case=obj(486790),templateset=defautpdv3',
}];

/* @ngInject */
export default function actualitiesSrv($q) {
  this.getActualities = () => {
    const actualities = rawActualities.filter(actuality => actuality);
    return $q(resolve => resolve(actualities));
  };

  return this;
}
