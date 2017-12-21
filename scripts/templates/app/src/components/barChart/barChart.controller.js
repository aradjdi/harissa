import _ from 'lodash';
import * as d3 from 'd3';
import {TweenLite, TimelineLite} from 'gsap';

/** @ngInject */
export default function barChartController($element) {
    /**
     * CONSTRUCTION CHART
     * */

    const getContainer = container => d3.select(container).select('.bar-chart').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight}`);

    const getXFun = () => {
        const domain = this.items.map(item => item.x);

        const xFun = d3.scaleBand();
        xFun.domain(domain);
        xFun.rangeRound([0, this.graphWidth]);
        xFun.paddingInner(0.05);

        return xFun;
    };

    const getYFun = () => {
        const domain = this.items.map(item => item.y);

        const yFun = d3.scaleLinear();
        yFun.domain([0, d3.max(domain)]);
        yFun.range([this.graphHeight - 1, 0]);

        return yFun;
    };

    // build axis chart
    const addAxis = (barChartContainer) => {
        // add axis bottom
        const xAxisContainer = barChartContainer.append('g');
        xAxisContainer.attr('class', 'bar-chart-x-axis');
        xAxisContainer.attr('transform', `translate(0, ${this.graphHeight})`);

        // init bar function
        const xFun = getXFun();

        // add axis bottom
        const xAxis = d3.axisBottom(xFun);
        xAxis.tickSize(0);
        xAxis.tickPadding(9);

        // build axis bottom
        xAxisContainer.call(xAxis);
    };

    const addBar = (container, data) => {
        const xFun = getXFun();
        const yFun = getYFun();

        const bar = container.append('rect');
        bar.attr('class', 'bar-chart-bars-item');
        bar.attr('height', yFun(0) - yFun(data.y) - 1);
        bar.attr('width', xFun.bandwidth());
        bar.attr('x', xFun(data.x));
        bar.attr('y', yFun(data.y - 1) - 1);
        bar.attr('rx', 5);
        bar.attr('ry', 5);
        bar.attr('fill', data.color);
    };

    // build bar chart
    const addBars = (barChartContainer) => {
        // add container for bars
        const barsContainer = barChartContainer.append('g');
        barsContainer.attr('class', 'bar-chart-bars');
        barsContainer.attr('width', this.graphWidth);
        barsContainer.attr('height', this.graphHeight);

        this.items.forEach(item => addBar(barsContainer, item));
    };

    /**
     * COMPONENT LIFECYCLE
     * */

    /**
     * Operate the different states of the data
     * @param changes {Object} detect data change */
    this.$onChanges = (changes) => {
        // get the data
        this.items = changes.data.currentValue;
        const previous = changes.data.previousValue;

        if (this.items.length) {
            // if no previous data then init graph and init animation
            if (_.isEmpty(previous)) {
                this.cleanChart();
                this.initChart();
                this.initialAnimation(this.svgContainer);
            } else {
                // if not init data, then update graph
                this.updateGraph(this.svgContainer, this.items, previous);
            }
        } else {
            this.cleanChart();
            this.initChart();
        }
    };

    this.$onDestroy = () => this.cleanChart();

    /**
     * INITIALISATION CHART
     * */

    /**
     * Build the chart at initialisation */
    this.initChart = () => {
        // chart containers
        this.svgContainer = getContainer($element[0]);
        this.initDimensions();
        this.axis = addAxis(this.svgContainer);
        this.bar = addBars(this.svgContainer);
    };

    /**
     * Init dimensions */
    this.initDimensions = () => {
        this.graphWidth = $element[0].offsetWidth;
        this.graphHeight = $element[0].offsetHeight - 30;
    };

    /**
     * Init animation */
    this.initialAnimation = (barChartContainer) => {
        const rectNodes = barChartContainer.selectAll('rect').nodes();

        const tweens = rectNodes.map(rectNode => TweenLite.from(rectNode, 0.4, {
            attr: {height: '0'},
        }));

        const timeline = new TimelineLite();
        tweens.forEach((tween) => {
            // start drawing the next bar with a delay
            timeline.add(tween, '-=0.25');
        });
        timeline.play();
    };

    /**
     * Clean Chart */
    this.cleanChart = () => {
        if (this.svgContainer) {
            this.svgContainer.remove();
        }
    };

    /**
     * UPDATE CHART
     * */

    /**
     * Update bar chart graph
     * @param container {HTMLElement} svg container
     * @param data {Array} new data
     * @param previous {Array} previous data
     * */
    this.updateGraph = (container, data) => {
        const yFun = getYFun();

        // first draw the previous data
        container.selectAll('rect')
            .data(data)
            .transition()
            .duration(300)
            .attr('y', d => yFun(d.y - 1) - 1)
            .attr('height', d => yFun(0) - yFun(d.y) - 1)
            .attr('fill', d => d.color);
    };
}
