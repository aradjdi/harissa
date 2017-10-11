// load main component
import barChartComponent from './barChart.component';

const barChartModule = angular
  .module('barChart', [])
  .component('barChart', barChartComponent)
  .name;

export default barChartModule;
