import React, { Component } from 'react';
import MetricTemplate from './MetricTemplate.jsx';

// Renders Metric component which uses methods defined in MetricTemplate to
// render component title, labels, and generate chart
class Metric extends MetricTemplate {
  render() {
    const { title, data } = this.props;
    const { sum, numOfDataPoints, smallest, largest } = data;

    /*
    {
          sum: dataSize.sum + data.size,
          numOfDataPoints: dataSize.numOfDataPoints + 1,
          smallest: Math.min(dataSize.smallest, data.size),
          largest: Math.max(dataSize.largest, data.size),
    }
    */
    // Labels used in the Metric component
    const labels = ['Average', 'Smallest', 'Largest'];

    // Calculate data to be displayed in each Label
    const processedData = [
      this.calculateAvg(sum, numOfDataPoints),
      smallest,
      largest,
    ];

    // Defined in MetricTemplate, this method generates the chart data for the chart
    const chartData = this.generateChartData(title, processedData[0]);

    // Defined in MetricTemplate, this method generates the style of the chart
    const chartOptions = this.generateChartOptions();

    return (
      <div className="system-data">
        {this.generateTitle(title)}
        {labels.map((label, idx) =>
          this.generateLabel(label, processedData[idx])
        )}
        {this.generateChart(chartData, chartOptions)}
      </div>
    );
  }
}

export default Metric;
