// load main component
import affluenceStatsComponent from './affluenceStats.component';

const affluenceStatsModule = angular
    .module('affluenceStats', [])
    .component('affluenceStats', affluenceStatsComponent)
    .name;

export default affluenceStatsModule;
