import React, { Component } from 'react';
import * as d3 from 'd3';
import fetchExpenseCost from './components/FetchExpenseCost';

class BarChart extends Component {
  componentDidMount() {
    this.fetchDataAndDrawChart();
  }

  async fetchDataAndDrawChart() {
    try {
      const data = await fetchExpenseCost();
      this.drawChart(data);
    } catch (error) {
      console.error('Error fetching expense cost:', error);
    }
  }

  drawChart(data) {
    const svg = d3
      .select("#" + this.props.id)
      .append("svg")
      .attr("width", 900)
      .attr("height", 500);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "blue");

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d - 3);
  }

  render() {
    return <div id={this.props.id}></div>;
  }
}

export default BarChart;