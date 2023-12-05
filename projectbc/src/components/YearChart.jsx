import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const YearChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const yearValues = data.map((item) => item.start_year)

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Sort the unique years in ascending order
    const sortedUniqueYears = [...new Set([...yearValues, null, 2050].filter((d) => d !== null))].sort((a, b) => a - b);

    const xScale = d3.scaleBand().domain(sortedUniqueYears).range([0, width]).padding(0.1);

    const yScale = d3.scaleLinear().domain([0, d3.max(yearValues, (d) => yearValues.filter((x) => x === d).length)]).range([height, 0]);

    chart
      .selectAll('rect')
      .data(sortedUniqueYears)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d))
      .attr('y', (d) => yScale(yearValues.filter((x) => x === d).length))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(yearValues.filter((x) => x === d).length))
      .attr('fill', 'brown');

    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g').call(d3.axisLeft(yScale).ticks(5));
  }, [data]);

  return <svg ref={chartRef} width={600} height={400}></svg>;
};

export default YearChart;
