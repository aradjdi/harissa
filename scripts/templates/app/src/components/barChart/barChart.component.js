import template from './barChart.html';
import controller from './barChart.controller';
import './barChart.scss';

const barChartComponent = {
  bindings: {
    data: '<',
  },
  template,
  controller,
};

export default barChartComponent;
