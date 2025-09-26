import React from 'react';

interface ChartAxesProps {
  chartWidth: number;
  chartHeight: number;
  offsetX: number;
  offsetY: number;
  totalBudget: number;
}

export const ChartAxes: React.FC<ChartAxesProps> = ({
  chartWidth,
  chartHeight,
  offsetX,
  offsetY,
  totalBudget
}) => {
  const yAxisEnd = offsetY + chartHeight;
  const xAxisEnd = offsetX + chartWidth;

  return (
    <>
      {/* Main axes */}
      <line 
        x1={offsetX} 
        y1={offsetY} 
        x2={offsetX} 
        y2={yAxisEnd} 
        stroke="#E5E7EB" 
        strokeWidth="1"
      />
      <line 
        x1={offsetX} 
        y1={yAxisEnd} 
        x2={xAxisEnd} 
        y2={yAxisEnd} 
        stroke="#E5E7EB" 
        strokeWidth="1"
      />
      
      {/* Y Axis labels */}
      {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((value, index) => (
        <g key={value}>
          <text 
            x={offsetX - 5} 
            y={yAxisEnd - (index * 37.5)} 
            textAnchor="end" 
            alignmentBaseline="middle"
            fontSize="12" 
            fill="#6B7280"
          >
            {value}K
          </text>
          <line 
            x1={offsetX - 3} 
            y1={yAxisEnd - (index * 37.5)} 
            x2={offsetX} 
            y2={yAxisEnd - (index * 37.5)} 
            stroke="#E5E7EB" 
            strokeWidth="1"
          />
        </g>
      ))}
      
      {/* X Axis labels */}
      {(() => {
        const maxBudget = totalBudget || 390250;
        const steps = [0, 0.25, 0.5, 0.75, 1.0];
        return steps.map((step, index) => {
          const value = Math.round((maxBudget * step) / 1000);
          const x = offsetX + (index * chartWidth / 4);
          
          return (
            <g key={step}>
              <text 
                x={x} 
                y={yAxisEnd + 20} 
                textAnchor="middle"
                fontSize="12" 
                fill="#6B7280"
              >
                {value}K
              </text>
              <line 
                x1={x} 
                y1={yAxisEnd} 
                x2={x} 
                y2={yAxisEnd + 3} 
                stroke="#E5E7EB" 
                strokeWidth="1"
              />
            </g>
          );
        });
      })()}
    </>
  );
};
