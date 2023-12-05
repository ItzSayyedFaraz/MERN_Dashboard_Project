import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CountryChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const countryValues = data.map((item) => item.country);

    const margin = { top: 20, right: 20, bottom: 75, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const uniqueCountries = [...new Set(countryValues)];

    const xScale = d3.scaleBand().domain(uniqueCountries).range([0, width]).padding(0.1).paddingOuter(0.1);

    const yScale = d3.scaleLinear().domain([0, d3.max(countryValues, (d) => countryValues.filter((x) => x === d).length)]).range([height, 0]);

    chart
      .selectAll('rect')
      .data(uniqueCountries)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d))
      .attr('y', (d) => yScale(countryValues.filter((x) => x === d).length))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(countryValues.filter((x) => x === d).length))
      .attr('fill', 'steelblue');

    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('x', -10)
      .attr('y', 0)
      .style('text-anchor', 'end');
     

    chart.append('g').call(d3.axisLeft(yScale).ticks(5));
  }, [data]);

  return <svg ref={chartRef} width={600} height={400}></svg>;
};

export default CountryChart;
