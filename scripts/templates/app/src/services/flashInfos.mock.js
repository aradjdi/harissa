const rawFlashInfos = [{
    title: 'Flash infos : Préconisations en matière de contrôle fiscal',
    link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=125,E=0000052785986928896,K=3109,Sxi=0,Case=obj(398119),templateset=defautpdv3',
    startDate: '2017-05-02T11:16:50Z',
    endDate: '',
}, {
    title: 'Flash infos : Préconisations en matière de contrôle fiscal',
    link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=125,E=0000052785986928896,K=3109,Sxi=0,Case=obj(398119),templateset=defautpdv3',
    startDate: '2017-05-02T11:16:50Z',
    endDate: '',
}, {
    title: 'Flash infos : Préconisations en matière de contrôle fiscal',
    link: 'http://W203PKL304/SRVS/CGI-BIN/WEBCGI.EXE?St=125,E=0000052785986928896,K=3109,Sxi=0,Case=obj(398119),templateset=defautpdv3',
    startDate: '2017-05-02T11:16:50Z',
    endDate: '',
}];

/* @ngInject */
export default function flashInfosSrv($q) {
    this.getFlashInfos = () => {
        const flashInfos = rawFlashInfos.filter(flashInfo => flashInfo);
        return $q(resolve => resolve(flashInfos));
    };

    return this;
}
