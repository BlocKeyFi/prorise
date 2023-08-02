import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = () => {
  const ref = useRef();

  useEffect(() => {
    const data = [
      { value: 50, innerRadius: 70, outerRadius: 90, color: '#f00' },
      { value: 30, innerRadius: 60, outerRadius: 70, color: '#0f0' },
      { value: 20, innerRadius: 50, outerRadius: 60, color: '#ff0' },
      // Add more slices as needed
    ];

    const width = 200;
    const height = 200;

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arc = d3.arc();

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const g = svg.selectAll('g')
      .data(pie(data))
      .enter()
      .append('g');

    g.append('path')
      .attr('d', d => {
        arc.innerRadius(d.data.innerRadius);
        arc.outerRadius(d.data.outerRadius);
        return arc(d);
      })
      .style('fill', d => d.data.color);

    svg.append('text')
      .text('react js')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', '#fff');

  }, []);

  return <div ref={ref}></div>;
};

export default DonutChart;
    