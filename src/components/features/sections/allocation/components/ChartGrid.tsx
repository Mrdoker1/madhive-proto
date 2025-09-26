import React from 'react';

interface ChartGridProps {
  chartWidth: number;
  chartHeight: number;
  offsetX: number;
  offsetY: number;
}

export const ChartGrid: React.FC<ChartGridProps> = ({
  chartWidth,
  chartHeight,
  offsetX,
  offsetY
}) => {
  return (
    <>
      {/* Grid pattern definition */}
      <defs>
        <pattern id="grid" width={chartWidth / 5} height="37.5" patternUnits="userSpaceOnUse">
          <path d={`M ${chartWidth / 5} 0 L 0 0 0 37.5`} fill="none" stroke="#F3F4F6" strokeWidth="1"/>
        </pattern>
      </defs>
      
      {/* Grid background */}
      <rect 
        width={chartWidth} 
        height={chartHeight} 
        fill="url(#grid)" 
        x={offsetX} 
        y={offsetY}
      />
    </>
  );
};
