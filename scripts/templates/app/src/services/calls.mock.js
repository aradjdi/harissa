const rawCalls = [{
  id: '5253584',
  state: 'Résolu',
  title: 'appel tech au niveau de la borne \r\nEcran noir , changement UC  car plus au norme',
  creationDate: '2016-02-04T11:23:00Z',
  evaluation: '0.0',
  evaluationComment: '',
}, {
  id: '5253584',
  state: 'Résolu',
  title: 'appel tech au niveau de la borne \r\nEcran noir , changement UC  car plus au norme',
  creationDate: '2016-02-04T11:23:00Z',
  evaluation: '0.0',
  evaluationComment: '',
}, {
  id: '5253584',
  state: 'Résolu',
  title: 'appel tech au niveau de la borne \r\nEcran noir , changement UC  car plus au norme',
  creationDate: '2016-02-04T11:23:00Z',
  evaluation: '0.0',
  evaluationComment: '',
}];

/* @ngInject */
export default function callsSrv($q) {
  this.getCalls = () => {
    const calls = rawCalls.filter(call => call);
    return $q(resolve => resolve(calls));
  };

  return this;
}
