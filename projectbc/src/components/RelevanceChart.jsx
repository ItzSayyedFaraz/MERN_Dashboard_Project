import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelevanceChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const relevanceValues = data.map((item) => item.relevance);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    console.log("R",Math.max(...relevanceValues),Math.min(...relevanceValues))

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(d3.range(relevanceValues.length)).range([0, width]).padding(0.5);

    const yScale = d3.scaleLinear().domain([1, 6]).range([height, 0]);

    chart
      .selectAll('rect')
      .data(relevanceValues)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d))
      .attr('fill', 'green');

    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g').call(d3.axisLeft(yScale).ticks(5));

  }, [data]);

  return <svg ref={chartRef} width={600} height={400}></svg>;
};

export default RelevanceChart;
