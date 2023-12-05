import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TopicsChart = ({ data }) => {
  const topicsData = Array.from(d3.rollup(data, v => v.length, d => d.topic))
    .map(([name, frequency]) => ({ name, frequency }));
    // console.log("topics",topicsData)

  const svgRef = useRef();

  useEffect(() => {
    const width = 928;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 100;

    const root = d3.hierarchy({ name:'Topic', children: topicsData,frequency:('S')});
    const dx = 10;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);
    
    

    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", dx)
      .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr("style", "max-width: 100%; height: auto; font: 8px sans-serif; user-select: none;");

    const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);
      

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    function update(event, source) {
      const duration = event?.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      tree(root);

      let left = root;
      let right = root;
      root.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      const node = gNode.selectAll("g")
        .data(nodes, (d) => d.id);

      const nodeEnter = node.enter().append("g")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(event, d);
        });

      nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", (d) => (d._children ? "#555" : "#999"))
        .attr("stroke-width", 10);

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d._children ? -6 : 6))
        .attr("text-anchor", (d) => (d._children ? "end" : "start"))
        .text((d) => `${d.data.name || ''} (${d.data.frequency})`)        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      const link = gLink.selectAll("path")
        .data(links, (d) => d.target.id);

      const linkEnter = link.enter().append("path")
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      link.exit().transition(transition).remove()
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      root.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    update(null, root);

    const container = document.getElementById("chart-container");
    container.appendChild(svg.node());

    return () => {
      container.removeChild(svg.node());
    };
  }, [topicsData]);

  return <div id="chart-container" />;
};

export default TopicsChart;
