import template from './gaugeChart.html';
import controller from './gaugeChart.controller';
import './gaugeChart.scss';

const gaugeChartComponent = {
    bindings: {
        minValue: '<',
        maxValue: '<',
        data: '<',
    },
    template,
    controller,
};

export default gaugeChartComponent;
