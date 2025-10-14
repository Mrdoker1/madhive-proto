import React from 'react';
import { motion } from 'framer-motion';
import { ChannelPoint } from '../types';
import { CHART_CONFIG } from '../constants';
import { calculateChartPosition } from '../utils';
import { createStaticCurvePath, BASE_REACH_SCALE } from '../channelConfig';

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
  const maxReach = BASE_REACH_SCALE;

  return (
    <>
      {points.map((point, index) => {
        // Создаем статическую кривую по формуле для каждого канала
        const pathData = createStaticCurvePath(
          point.id,
          maxBudget,
          chartWidth,
          chartHeight,
          maxReach
        );
        
        return (
          <motion.path
            key={`line-${point.id}`}
            d={pathData}
            fill="none"
            stroke={point.color}
            strokeWidth="4"
            strokeOpacity="0.8"
            style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.8, pathLength: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </>
  );
};
