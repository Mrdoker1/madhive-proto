'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DraggablePointProps } from '../types';
import { CHART_CONFIG } from '../constants';
import { calculateChartPosition } from '../utils';
import { BASE_REACH_SCALE } from '../channelConfig';

export const DraggablePoint: React.FC<DraggablePointProps> = ({
  point,
  chartWidth,
  chartHeight,
  totalBudget,
  onPointChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGCircleElement>(null);
  
  const maxBudget = totalBudget || CHART_CONFIG.DEFAULT_BUDGET;
  const { OFFSET_X, OFFSET_Y } = CHART_CONFIG;
  
  // Use the same reach scale as in channelConfig.ts
  const maxReach = BASE_REACH_SCALE;
  
  // Point position on the chart
  const chartPosition = calculateChartPosition(
    point.budget,
    point.reach,
    maxBudget,
    maxReach,
    chartWidth,
    chartHeight
  );
  
  // Point position in SVG coordinates (with offsets)
  const svgX = chartPosition.x + OFFSET_X;
  const svgY = chartPosition.y + OFFSET_Y;
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !svgRef.current) return;
    
    const svg = svgRef.current.closest('svg');
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    
    // Mouse position in SVG coordinates
    const mouseXInSvg = e.clientX - rect.left;
    
    // Convert to chart coordinates (remove X offset)
    const mouseXInChart = mouseXInSvg - OFFSET_X;
    
    // Limit only along X axis
    const clampedX = Math.max(0, Math.min(mouseXInChart, chartWidth));
    
    // Calculate new budget based on X position
    const newBudget = (clampedX / chartWidth) * maxBudget;
    
    // Pass only new budget (rounded to multiple of 100), reach will be calculated automatically
    onPointChange(point.id, Math.round(newBudget / 100) * 100);
  }, [isDragging, chartWidth, maxBudget, point.id, onPointChange, OFFSET_X]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  return (
    <motion.circle
      ref={svgRef}
      cx={svgX}
      cy={svgY}
      r="8"
      fill={point.color}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isDragging ? 1.3 : 1,
        cx: svgX,
        cy: svgY
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        opacity: { duration: 0.3 },
        scale: { duration: 0.2 }
      }}
    />
  );
};
