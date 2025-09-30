import React from 'react';
import { CHART_CONFIG } from '../constants';
import { BASE_REACH_SCALE } from '../channelConfig';

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
      {(() => {
        // Используем тот же масштаб reach что и в channelConfig.ts
        const maxReach = BASE_REACH_SCALE;
        const maxReachK = Math.ceil(maxReach / 1000);
        const stepSize = Math.max(2, Math.ceil(maxReachK / 8)); // 8-9 шагов максимум
        const steps = [];
        for (let i = 0; i <= maxReachK; i += stepSize) {
          steps.push(i);
        }
        return steps.map((value, index) => (
        <g key={value}>
          <text 
            x={offsetX - 5} 
            y={yAxisEnd - (index * (chartHeight / (steps.length - 1)))} 
            textAnchor="end" 
            alignmentBaseline="middle"
            fontSize="12" 
            fill="#6B7280"
          >
            {value}K
          </text>
          <line 
            x1={offsetX - 3} 
            y1={yAxisEnd - (index * (chartHeight / (steps.length - 1)))} 
            x2={offsetX} 
            y2={yAxisEnd - (index * (chartHeight / (steps.length - 1)))} 
            stroke="#E5E7EB" 
            strokeWidth="1"
          />
        </g>
        ));
      })()}
      
      {/* X Axis labels */}
      {(() => {
        const maxBudget = totalBudget || CHART_CONFIG.DEFAULT_BUDGET;
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

      {/* Y Axis label */}
      <text 
        x={offsetX - 35} 
        y={offsetY + chartHeight / 2} 
        textAnchor="middle"
        fontSize="12" 
        fill="#000"
        transform={`rotate(-90, ${offsetX - 35}, ${offsetY + chartHeight / 2})`}
      >
        Reach
      </text>

      {/* X Axis label */}
      <text 
        x={offsetX + chartWidth / 2} 
        y={yAxisEnd + 40} 
        textAnchor="middle"
        fontSize="12" 
        fill="#000"
      >
        Budget ($)
      </text>
    </>
  );
};
