import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LikelihoodChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const likelihoodValues = data.map((item) => item.likelihood);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    console.log("L",Math.max(...likelihoodValues),Math.min(...likelihoodValues))

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(d3.range(likelihoodValues.length)).range([0, width]).padding(0.5);

    const yScale = d3.scaleLinear().domain([d3.min(likelihoodValues), d3.max(likelihoodValues)]).range([height, 0]);

    chart
      .selectAll('rect')
      .data(likelihoodValues)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => (d !== null ? yScale(d) : height)) 
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => (d !== null ? height - yScale(d) : 0)) 
      .attr('fill', 'darkblue');

    // Add x-axis
    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    chart.append('g').call(d3.axisLeft(yScale).ticks(5).tickFormat((d) => (d !== null ? d : 'Null')));
  }, [data]);

  return <svg ref={chartRef} width={600} height={400}></svg>;
};

export default LikelihoodChart;
