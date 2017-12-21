import _ from 'lodash';
import * as d3 from 'd3';
import {TweenLite, TimelineLite} from 'gsap';

const toRadians = degrees => (degrees * Math.PI) / 180;

/**
 * BUILD INDICATOR ARC
 * */
const arcAngle = {
    start: toRadians(-120),
    end: toRadians(120),
    fill: '#e5e0ef',
    firstTier: {
        start: toRadians(-120),
        end: toRadians(-40), // -120 + (120 * 2/3)*1
        fill: '#79b94b',
    },
    secondTier: {
        start: toRadians(-40), // -120 + (120 * 2/3)*1
        end: toRadians(40), // -120 + (120 * 2/3)*2
        fill: '#df8145',
    },
    thirdTier: {
        start: toRadians(40), // -120 + (120 * 2/3)*2
        end: toRadians(120), // -120 + (120 * 2/3)*3
        fill: '#9a3135',
    },
};

/**
 * BUILD POWER ARC
 * */

/**
 * Convert min + sec in minutes
 * @param value {String} waitingTime
 * @return minutes {Number}
 * */
const convertToMin = (value) => {
    const secondes = parseFloat(value.split(':')[1]) / 60;
    const minutes = parseFloat(value.split(':')[0]);
    return secondes + minutes;
};

/**
 * Define the angle of the power arc
 * @param value {String} waitingTime
 * @return angle {Number}
 * */
const setAngleArc = (value) => {
    const min = convertToMin(value);
    let angle = 0;
    // GREEN ZONE if less than one minute
    if (min <= 1) {
        angle = -120 + (min * 80);
        // ORANGE ZONE if more than one minute and less than 5 minutes
    } else if (min > 1 && min < 5) {
        angle = (-120 + (240 / 3)) + ((((min * 100) / 5) / 100) * 80);
        // RED ZONE if more than 5 minutes
    } else if (min >= 5) {
        angle = (-120 + ((240 / 3) * 2)) + ((((min * 100) / 21) / 100) * 80);
    }
    return angle;
};

const getContainer = parentElement => d3.select(parentElement).select('.gauge-chart').append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${parentElement.offsetWidth} ${parentElement.offsetHeight}`);

const addContainer = (parentElement, clazz, position = {x: 0, y: 0}) => parentElement.append('g')
    .attr('class', clazz)
    .attr('transform', `translate(${position.x}, ${position.y})`);

const getIndicatorArcFunction = angle => d3.arc()
    .innerRadius(65)
    .outerRadius(70)
    .startAngle(angle.start)
    .endAngle(angle.end);

const addIndicatorArcPath = (parentElement, angle) => {
    const arcFunction = getIndicatorArcFunction(angle);

    return parentElement.append('path')
        .attr('class', 'arc-path')
        .attr('d', arcFunction())
        .attr('fill', angle.fill);
};
const getCounterArcFunction = angle => d3.arc()
    .innerRadius(35)
    .outerRadius(60)
    .startAngle(angle.start)
    .endAngle(angle.end);

const addCounterArcPath = (parentElement, angle) => {
    const arcFunction = getCounterArcFunction(angle);

    return parentElement.append('path')
        .attr('class', 'arc-path')
        .attr('d', arcFunction())
        .attr('fill', angle.fill);
};

const addText = (parentElement, data) => parentElement.append('text')
    .attr('class', 'arc-path')
    .attr('text-anchor', 'middle')
    .attr('textLength', '30')
    .attr('lengthAdjust', 'spacingAndGlyphs')
    .attr('fill', data.color)
    .text(data.value);

/** @ngInject */
export default function gaugeChartController($element) {
    const addIndicatorArc = () => {
        const indicatorArcContainer = addContainer(
            this.svgContainer, 'gauge-chart-indicator',
            {x: this.graphWidth / 2, y: this.graphHeight * (2 / 3)},
        );

        addIndicatorArcPath(indicatorArcContainer, arcAngle.firstTier);
        addIndicatorArcPath(indicatorArcContainer, arcAngle.secondTier);
        addIndicatorArcPath(indicatorArcContainer, arcAngle.thirdTier);

        return indicatorArcContainer;
    };
    const addCounterArc = () => {
        const counterArcContainer = addContainer(
            this.svgContainer, 'gauge-chart-counter',
            {x: this.graphWidth / 2, y: this.graphHeight * (2 / 3)},
        );

        addCounterArcPath(counterArcContainer, arcAngle);

        return counterArcContainer;
    };
    const addValueText = () => {
        const valueTextContainer = addContainer(
            this.svgContainer, 'gauge-chart-value',
            {x: this.graphWidth / 2, y: this.graphHeight * (2 / 3)},
        );

        addText(valueTextContainer, this.data).attr('y', 0);
        addText(valueTextContainer, {color: this.data.color, value: 'min'}).attr('y', 20);

        return valueTextContainer;
    };
    const addPowerArc = () => {
        const powerArcContainer = addContainer(
            this.svgContainer, 'gauge-chart-power',
            {x: this.graphWidth / 2, y: this.graphHeight * (2 / 3)},
        );

        const arcFunction = d3.arc().innerRadius(35).outerRadius(60).startAngle(arcAngle.start);

        const newAngle = {
            end: toRadians(setAngleArc(this.data.value)),
            fill: this.data.color,
        };

        const arcTween = (d) => {
            let interpolate;
            let previousAngle;
            if (!_.isEmpty(this.previous)) {
                previousAngle = setAngleArc(this.previous.value);
                interpolate = d3.interpolate(toRadians(previousAngle), d.endAngle);
            } else {
                interpolate = d3.interpolate(toRadians(-120), d.endAngle);
            }
            // 't': what's t? T is the fraction of time (between 0 and 1) since the
            // transition began. Handy
            return (t) => {
                d.endAngle = interpolate(t);
                return arcFunction(d);
            };
        };

        const powerArcPath = powerArcContainer.append('path');
        powerArcPath.attr('class', 'arc-path');
        powerArcPath.datum({endAngle: newAngle.end});
        powerArcPath.transition()
            .ease(d3.easeBackOut)
            .duration(500)
            .attrTween('d', arcTween)
            .attr('fill', newAngle.fill);
    };


    /**
     * INITIALISATION CHART
     * */

    /**
     * Build the chart at initialisation
     * */
    const initChart = () => {
        this.svgContainer = getContainer($element[0]);
        this.graphWidth = $element[0].offsetWidth;
        this.graphHeight = $element[0].offsetHeight;
        this.indicatorArc = addIndicatorArc();
        this.counterArc = addCounterArc();
        this.valueText = addValueText();
        this.powerArc = addPowerArc();
        // this.initialAnimation();
    };

    /**
     * Clean whole chart
     * */
    const cleanChart = () => {
        if (this.svgContainer) {
            this.svgContainer.remove();
        }
    };

    /**
     * Clean only the power arc
     * */
    const cleanPowerArc = () => {
        // const counterArcContainer = this.svgContainer.select('.gauge-chart-counter');
        const powerArcContainer = this.svgContainer.select('.gauge-chart-power');
        const valueTextContainer = this.svgContainer.select('.gauge-chart-value');
        // console.log(this.svgContainer.select('.gauge-chart-power path').nodes()[0].getTotalLength());
        if (powerArcContainer && valueTextContainer) {
            // counterArcContainer.remove();
            powerArcContainer.remove();
            valueTextContainer.remove();
        }
    };

    /**
     * UPDATE CHART
     * */

    /**
     * Update only the power arc
     * */
    const updateChart = () => {
        this.valueText = addValueText();
        this.powerArc = addPowerArc();
        // this.initialAnimation();
    };

    /**
     * Init animation
     * */
    this.initialAnimation = () => {
        const pathLineNodes = this.powerArc.selectAll('path').nodes();
        pathLineNodes.forEach((pathLineNode) => {
            const pathLength = pathLineNode.getTotalLength();

            const tween = TweenLite.fromTo(pathLineNode, 5, {
                attr: {
                    'stroke-dasharray': `${pathLength} ${pathLength}`,
                    'stroke-dashoffset': pathLength,
                },
            }, {
                attr: {
                    'stroke-dashoffset': 0,
                },
            });

            const timeline = new TimelineLite();
            timeline.add(tween);
            timeline.play();
        });
    };

    /**
     * COMPONENT LIFECYCLE
     * */

    /**
     * Operate the different states of the data
     * @param changes {Object} detect data change
     * */
    this.$onChanges = (changes) => {
        // get the data
        this.data = changes.data.currentValue;
        this.previous = changes.data.previousValue;
        // if data, clean chart and draw
        if (this.data.value) {
            if (_.isEmpty(this.previous)) { // if init
                cleanChart();
                initChart();
            } else { // if update
                cleanPowerArc();
                updateChart();
            }
        }
    };

    this.$onDestroy = () => cleanChart();
}
