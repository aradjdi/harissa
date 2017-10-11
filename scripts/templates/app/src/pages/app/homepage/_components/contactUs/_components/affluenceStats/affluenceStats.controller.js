/** @ngInject */
export default function affluenceStatsController($timeout, hoursSrv) {
  this.affluenceStats = [];
  this.barChartData = [];

  // differents states colors
  const color = {
    LIGHT: '#83bf78',
    MODERATE: '#fbb082',
    HEAVY: '#e4796e',
  };

  /**
   * Format data for bar chart
   * @param data {Object}
   * @return {Array} bar chart data
   * */
  const formatDataBarChart = data => data[0].rushDetails.map(d => ({
    x: `${d.intervalHumanReadableStart} - ${d.intervalHumanReadableEnd}`,
    y: d.estimatedTime,
    color: color[d.level],
  }));

  /**
   * Format options for radio field
   * @param data {Object}
   * @return {Array} options radio field
   * */
  const formatOptions = affluenceStats => affluenceStats.map(affluenceStat => ({
    label: affluenceStat.dayOfWeek.substring(0, 3),
    value: affluenceStat.dayOfWeek,
  }));

  const setAffluenceStats = affluenceStats => $timeout(() => {
    this.affluenceStats = affluenceStats;
  }, 0);

  /**
   * On different value radio, change the data of the bar chart
   * @param value {String} radio field value option
   * */
  this.onValueChange = (value) => {
    const affluenceStat = this.affluenceStats.filter(stat => stat.dayOfWeek === value);
    this.barChartData = formatDataBarChart(affluenceStat);
  };

  this.$onInit = () => {
    hoursSrv.getAffluenceStats().then((affluenceStats) => {
      affluenceStats = affluenceStats.filter(affluenceStat => affluenceStat.rushDetails.length);
      setAffluenceStats(affluenceStats);
      this.value = affluenceStats[0].dayOfWeek;
      this.options = formatOptions(affluenceStats);
      const affluenceStat = affluenceStats.filter(stat => stat.dayOfWeek === this.value);
      this.barChartData = formatDataBarChart(affluenceStat);
    });
  };

  return this;
}
