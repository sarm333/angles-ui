import React, { Component } from 'react';
import Chart from 'chart.js';
import './Charts.css';
import { getRandomColor } from '../../utility/ChartUtilities';

class PlatformDistributionPieChart extends Component {
    chartRef = React.createRef();

    piechart;

    constructor(props) {
      super(props);
      this.state = {
        //
      };
    }

    componentDidMount() {
      const { metrics } = this.props;
      const myChartRef = this.chartRef.current.getContext('2d');
      this.piechart = new Chart(myChartRef, {
        type: 'pie',
        data: {},
        options: {
          animation: false,
          responsive: true,
          title: {
            display: true,
            text: 'Platform Distribution',
          },
        },
      });
      this.renderPieChart(this.piechart, metrics);
    }

    renderPieChart = (piechart, metrics) => {
      const result = {};
      if (piechart !== undefined && piechart.config != null) {
        metrics.periods.forEach((period) => {
          period.phases.forEach((phase) => {
            phase.executions.forEach((execution) => {
              if (execution.platforms && execution.platforms.length > 0) {
                execution.platforms.forEach((platform) => {
                  if (!result[platform.platformName]) {
                    result[platform.platformName] = 0;
                  }
                  result[platform.platformName] += 1;
                });
              }
            });
          });
        });
        const graphData = piechart.config.data;
        const data = [];
        const labels = [];
        Object.keys(result).forEach((platformName) => {
          data.push(result[platformName]);
          labels.push(platformName);
        });
        graphData.datasets = [{
          label: 'Results',
          data,
          backgroundColor: getRandomColor(),
        }];
        graphData.labels = labels;
        piechart.update();
      }
    }

    render() {
      return (
        <div className="graphContainer">
          <canvas
            id="myChart"
            ref={this.chartRef}
          />
        </div>
      );
    }
}

export default PlatformDistributionPieChart;
