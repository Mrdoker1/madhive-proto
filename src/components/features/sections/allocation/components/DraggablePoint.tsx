'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DraggablePointProps } from '../types';
import { CHART_CONFIG } from '../constants';
import { calculateChartPosition, mouseToValues, clampToChart } from '../utils';

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
  const { OFFSET_X, OFFSET_Y, MAX_REACH } = CHART_CONFIG;
  
  // Позиция точки на графике
  const chartPosition = calculateChartPosition(
    point.budget,
    point.reach,
    maxBudget,
    MAX_REACH,
    chartWidth,
    chartHeight
  );
  
  // Позиция точки в SVG координатах (с учетом отступов)
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
    
    // Позиция мыши в SVG координатах
    const mouseXInSvg = e.clientX - rect.left;
    const mouseYInSvg = e.clientY - rect.top;
    
    // Преобразуем в координаты графика (убираем отступы)
    const mouseXInChart = mouseXInSvg - OFFSET_X;
    const mouseYInChart = mouseYInSvg - OFFSET_Y;
    
    // Ограничиваем в пределах графика
    const clamped = clampToChart(mouseXInChart, mouseYInChart, chartWidth, chartHeight);
    
    // Преобразуем в бюджет и reach
    const values = mouseToValues(
      clamped.x, 
      clamped.y, 
      chartWidth, 
      chartHeight, 
      maxBudget, 
      MAX_REACH
    );
    
    onPointChange(point.id, values.budget, values.reach);
  }, [isDragging, chartWidth, chartHeight, maxBudget, point.id, onPointChange, OFFSET_X, OFFSET_Y, MAX_REACH]);
  
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
    <circle
      ref={svgRef}
      cx={svgX}
      cy={svgY}
      r="8"
      fill={point.color}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'all 0.1s ease'
      }}
      onMouseDown={handleMouseDown}
    />
  );
};
