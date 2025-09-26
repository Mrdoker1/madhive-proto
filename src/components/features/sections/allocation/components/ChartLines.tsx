import React from 'react';
import { ChannelPoint } from '../types';
import { CHART_CONFIG } from '../constants';
import { createParabolicPath, calculateChartPosition } from '../utils';

interface ChartLinesProps {
  points: ChannelPoint[];
  chartWidth: number;
  chartHeight: number;
  totalBudget: number;
  offsetX: number;
  offsetY: number;
}

export const ChartLines: React.FC<ChartLinesProps> = ({
  points,
  chartWidth,
  chartHeight,
  totalBudget,
  offsetX,
  offsetY
}) => {
  const maxBudget = totalBudget || CHART_CONFIG.DEFAULT_BUDGET;

  return (
    <>
      {points.map(point => {
        // Позиция точки пользователя на графике
        const chartPosition = calculateChartPosition(
          point.budget,
          point.reach,
          maxBudget,
          CHART_CONFIG.MAX_REACH,
          chartWidth,
          chartHeight
        );
        
        // Создаем параболическую кривую: от (0,0) до точки, затем горизонтально
        const pathData = createParabolicPath(
          chartPosition.x, 
          chartPosition.y, 
          chartWidth, 
          chartHeight
        );
        
        return (
          <path
            key={`line-${point.id}`}
            d={pathData}
            fill="none"
            stroke={point.color}
            strokeWidth="4"
            strokeOpacity="0.8"
            style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
          />
        );
      })}
    </>
  );
};
