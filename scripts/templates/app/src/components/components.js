import barChartModule from './barChart/barChart';
import gaugeChartModule from './gaugeChart/gaugeChart';
import radioFieldModule from './radioField/radioField';
import loaderModule from './loader/loader';

const componentsModule = angular
    .module('main.components', [
        barChartModule,
        gaugeChartModule,
        radioFieldModule,
        loaderModule,
    ])
    .name;

export default componentsModule;
