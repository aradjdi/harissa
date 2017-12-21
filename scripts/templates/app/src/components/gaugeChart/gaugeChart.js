// load main component
import gaugeChartComponent from './gaugeChart.component';

const gaugeChartModule = angular
    .module('gaugeChart', [])
    .component('gaugeChart', gaugeChartComponent)
    .name;

export default gaugeChartModule;
