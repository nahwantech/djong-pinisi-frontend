'use client';

import React from 'react';

interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  title: string;
  width?: number;
  height?: number;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  width = 400, 
  height = 250,
  color = '#3B82F6'
}) => {
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue || 1;
  
  // Create points for the line
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((item.value - minValue) / valueRange) * chartHeight;
    return { x, y, value: item.value, label: item.label };
  });
  
  // Create path string for the line
  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');
  
  // Create area path (filled area under the line)
  const areaPathData = pathData + 
    ` L ${points[points.length - 1].x} ${padding + chartHeight}` +
    ` L ${padding} ${padding + chartHeight} Z`;
  
  // Y-axis labels
  const yAxisLabels = [];
  const labelCount = 5;
  for (let i = 0; i <= labelCount; i++) {
    const value = minValue + (valueRange * i) / labelCount;
    const y = padding + chartHeight - (i / labelCount) * chartHeight;
    yAxisLabels.push({ value: Math.round(value), y });
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">{title}</h3>
      <div className="flex justify-center">
        <svg width={width} height={height}>
          {/* Grid lines */}
          {yAxisLabels.map((label, index) => (
            <g key={index}>
              <line
                x1={padding}
                y1={label.y}
                x2={padding + chartWidth}
                y2={label.y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </g>
          ))}
          
          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + chartHeight}
            stroke="#6b7280"
            strokeWidth="2"
          />
          
          {/* X-axis */}
          <line
            x1={padding}
            y1={padding + chartHeight}
            x2={padding + chartWidth}
            y2={padding + chartHeight}
            stroke="#6b7280"
            strokeWidth="2"
          />
          
          {/* Area fill */}
          <path
            d={areaPathData}
            fill={`${color}20`}
            strokeWidth="0"
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill={color}
                stroke="#fff"
                strokeWidth="2"
              />
              {/* Hover tooltip */}
              <title>{`${point.label}: ${point.value}`}</title>
            </g>
          ))}
          
          {/* Y-axis labels */}
          {yAxisLabels.map((label, index) => (
            <text
              key={index}
              x={padding - 10}
              y={label.y + 5}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {label.value}
            </text>
          ))}
          
          {/* X-axis labels */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={padding + chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              transform={`rotate(-45 ${point.x} ${padding + chartHeight + 20})`}
            >
              {point.label.length > 8 ? point.label.substring(0, 8) + '...' : point.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;