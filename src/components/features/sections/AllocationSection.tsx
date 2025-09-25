'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelsData } from '@/store/slices/campaignSlice';

interface ChannelPoint {
  id: string;
  name: string;
  color: string;
  budget: number;
  reach: number;
}

interface ChannelAllocation extends ChannelPoint {
  percentage: number;
}

const channelColors: Record<string, string> = {
  linear_tv: '#6B46C1', // Purple
  ctv: '#EC4899',       // Pink
  display: '#F59E0B',   // Orange
  audio: '#10B981',     // Teal
  social: '#3B82F6',    // Blue
  search: '#8B5CF6',    // Violet
  email: '#F97316'      // Orange-red
};

const channelNames: Record<string, string> = {
  linear_tv: 'Linear TV',
  ctv: 'CTV',
  display: 'Display',
  audio: 'Audio',
  social: 'Social',
  search: 'Search',
  email: 'Email'
};

  // Создание параболического пути: от (0,0) до точки, затем горизонтально
  const createParabolicPath = (pointX: number, pointY: number, chartWidth: number, chartHeight: number): string => {
    // Начинаем от (0, chartHeight) - это соответствует reach = 0
    let path = `M 0 ${chartHeight}`;
    
    // Создаем параболическую кривую до точки с помощью квадратичной кривой Безье
    const controlX = pointX * 0.5; // Контрольная точка по X (в середине пути)
    const controlY = pointY; // Контрольная точка по Y (на уровне целевой точки)
    
    // Квадратичная кривая Безье для параболы
    path += ` Q ${controlX} ${controlY} ${pointX} ${pointY}`;
    
    // Горизонтальная линия до конца графика
    path += ` L ${chartWidth} ${pointY}`;
    
    return path;
  };

// Компонент перетаскиваемой точки
interface DraggablePointProps {
  point: ChannelPoint;
  chartWidth: number;
  chartHeight: number;
  totalBudget: number;
  onPointChange: (channelId: string, newBudget: number, newReach: number) => void;
}

const DraggablePoint: React.FC<DraggablePointProps> = ({
  point,
  chartWidth,
  chartHeight,
  totalBudget,
  onPointChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGCircleElement>(null);
  
  const maxBudget = totalBudget || 390250; // Используем реальный бюджет
  const maxReach = 16000;
  const offsetX = 60; // Отступ для Y-axis
  const offsetY = 20; // Отступ сверху
  
  // Позиция точки на графике (в координатах графика 0-chartWidth, 0-chartHeight)
  const chartX = (point.budget / maxBudget) * chartWidth;
  const chartY = ((maxReach - point.reach) / maxReach) * chartHeight;
  
  // Позиция точки в SVG координатах (с учетом отступов)
  const svgX = chartX + offsetX;
  const svgY = chartY + offsetY;
  
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
    const mouseXInChart = mouseXInSvg - offsetX;
    const mouseYInChart = mouseYInSvg - offsetY;
    
    // Ограничиваем в пределах графика
    const clampedX = Math.max(0, Math.min(mouseXInChart, chartWidth));
    const clampedY = Math.max(0, Math.min(mouseYInChart, chartHeight));
    
    // Преобразуем в бюджет и reach
    const newBudget = (clampedX / chartWidth) * maxBudget;
    const newReach = maxReach - (clampedY / chartHeight) * maxReach;
    
    onPointChange(point.id, Math.round(newBudget), Math.round(newReach));
  }, [isDragging, chartWidth, chartHeight, maxBudget, maxReach, point.id, onPointChange, offsetX, offsetY]);
  
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

export const AllocationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const channelsData = useAppSelector((state) => state.campaign.channels);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 300 });
  
  const selectedChannels = channelsData.selectedChannels;
  const channelCount = selectedChannels.length;
  
  // Состояние для точек каналов (budget и reach)
  const [channelPoints, setChannelPoints] = useState<Record<string, ChannelPoint>>(() => {
    const defaultBudget = totalBudget || 390250;
    const initialPoints: Record<string, ChannelPoint> = {};
    
    selectedChannels.forEach((channelId, index) => {
      // Фиксированная позиция на 50% от бюджета
      const fixedBudget = defaultBudget * 0.5;
      
      // Фиксированный reach: каждый канал чуть выше предыдущего
      const baseReach = 6000; // Базовый reach
      const reachIncrement = 1000; // Увеличение для каждого следующего канала
      const fixedReach = baseReach + (index * reachIncrement);
      
      initialPoints[channelId] = {
        id: channelId,
        name: channelNames[channelId] || channelId,
        color: channelColors[channelId] || '#6B7280',
        budget: fixedBudget,
        reach: Math.min(fixedReach, 15000) // Максимум 15K из 16K
      };
    });
    
    return initialPoints;
  });

  // Отслеживаем размеры контейнера
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const rect = chartContainerRef.current.getBoundingClientRect();
        const offsetX = 60; // Отступ для Y-axis
        const offsetY = 60; // Отступы сверху и снизу
        
        setChartDimensions({
          width: rect.width - offsetX, // Минус отступ для Y-axis
          height: 300 // Фиксированная высота
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Обновляем точки при изменении каналов или бюджета
  useEffect(() => {
    const defaultBudget = totalBudget || 390250;
    
    setChannelPoints(prevPoints => {
      const newPoints: Record<string, ChannelPoint> = {};
      
      selectedChannels.forEach((channelId, index) => {
        if (prevPoints[channelId]) {
          // Обновляем существующую точку - устанавливаем на 50% от нового бюджета
          newPoints[channelId] = {
            ...prevPoints[channelId],
            budget: defaultBudget * 0.5
          };
        } else {
          // Создаем новую точку с фиксированными позициями
          const fixedBudget = defaultBudget * 0.5;
          
          const baseReach = 6000;
          const reachIncrement = 1000;
          const fixedReach = baseReach + (index * reachIncrement);
          
          newPoints[channelId] = {
            id: channelId,
            name: channelNames[channelId] || channelId,
            color: channelColors[channelId] || '#6B7280',
            budget: fixedBudget,
            reach: Math.min(fixedReach, 15000)
          };
        }
      });
      
      return newPoints;
    });
  }, [selectedChannels, totalBudget]);

  const points = Object.values(channelPoints);
  
  // Обработчик изменения точки
  const handlePointChange = useCallback((channelId: string, newBudget: number, newReach: number) => {
    setChannelPoints(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        budget: newBudget,
        reach: newReach
      }
    }));
  }, []);
  
  // Вычисляем allocations для budget bar
  const totalAllocatedBudget = points.reduce((sum, point) => sum + point.budget, 0);
  const allocations: ChannelAllocation[] = points.map(point => ({
    ...point,
    percentage: totalAllocatedBudget > 0 ? (point.budget / totalAllocatedBudget) * 100 : 0
  }));

  // Используем динамические размеры
  const chartWidth = chartDimensions.width;
  const chartHeight = chartDimensions.height;

  if (channelCount === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="md" c="dimmed">
          Выберите каналы для отображения распределения бюджета
        </Text>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header with Budget and Legend */}
      <div>
        <Group justify="space-between" align="center" mb="md">
          <Text size="16px" fw={600} c="#374151">
            Budget: ${totalAllocatedBudget.toLocaleString()} in {channelCount} Channels
          </Text>
          <Group gap="lg">
            {points.map(point => (
              <Group key={point.id} gap="xs">
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: point.color
                  }}
                />
                <Text size="12px" fw={500}>{point.name}</Text>
              </Group>
            ))}
          </Group>
        </Group>

        {/* Budget Distribution Bar */}
        <div style={{ 
          display: 'flex', 
          height: '32px', 
          overflow: 'hidden'
        }}>
          {allocations.map(allocation => (
            <div
              key={allocation.id}
              style={{
                backgroundColor: allocation.color,
                width: `${allocation.percentage}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: allocation.percentage > 10 ? '0' : '60px'
              }}
            >
              {allocation.percentage > 10 && (
                <Text size="xs" c="white" fw={600}>
                  ${Math.round(allocation.budget / 1000)}K
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Chart */}
      <div>
        <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative' }}>
          <svg width="100%" height="350" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width={chartWidth / 5} height="37.5" patternUnits="userSpaceOnUse">
                <path d={`M ${chartWidth / 5} 0 L 0 0 0 37.5`} fill="none" stroke="#F3F4F6" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width={chartWidth} height={chartHeight} fill="url(#grid)" x="60" y="20"/>
            
            {/* Axes */}
            <line x1="60" y1="20" x2="60" y2="320" stroke="#E5E7EB" strokeWidth="1"/>
            <line x1="60" y1="320" x2={60 + chartWidth} y2="320" stroke="#E5E7EB" strokeWidth="1"/>
            
            {/* Y Axis labels */}
            {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((value, index) => (
              <g key={value}>
                <text 
                  x="55" 
                  y={320 - (index * 37.5)} 
                  textAnchor="end" 
                  alignmentBaseline="middle"
                  fontSize="12" 
                  fill="#6B7280"
                >
                  {value}K
                </text>
                <line 
                  x1="57" 
                  y1={320 - (index * 37.5)} 
                  x2="60" 
                  y2={320 - (index * 37.5)} 
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
                return (
                  <g key={step}>
                    <text 
                      x={60 + (index * chartWidth / 4)} 
                      y="340" 
                      textAnchor="middle"
                      fontSize="12" 
                      fill="#6B7280"
                    >
                      {value}K
                    </text>
                    <line 
                      x1={60 + (index * chartWidth / 4)} 
                      y1="320" 
                      x2={60 + (index * chartWidth / 4)} 
                      y2="323" 
                      stroke="#E5E7EB" 
                      strokeWidth="1"
                    />
                  </g>
                );
              });
            })()}
            
            {/* Simple linear graphs through points */}
            {points.map(point => {
              // Позиция точки пользователя на графике
              const maxBudget = totalBudget || 390250; // Используем реальный бюджет
              const pointX = maxBudget > 0 ? (point.budget / maxBudget) * chartWidth : 0;
              const pointY = ((16000 - point.reach) / 16000) * chartHeight;
              
                // Создаем параболическую кривую: от (0,0) до точки, затем горизонтально
                const pathData = createParabolicPath(pointX, pointY, chartWidth, chartHeight);
              
              return (
                <path
                  key={`line-${point.id}`}
                  d={pathData}
                  fill="none"
                  stroke={point.color}
                  strokeWidth="4"
                  strokeOpacity="0.8"
                  style={{ transform: 'translate(60px, 20px)' }}
                />
              );
            })}
            
            {/* Draggable points */}
            {points.map(point => (
              <DraggablePoint
                key={`point-${point.id}`}
                point={point}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                totalBudget={totalBudget || 390250}
                onPointChange={handlePointChange}
              />
            ))}
          </svg>
          
          {/* Axis labels */}
          <Text 
            size="12px" 
            c="black" 
            ta="center" 
            style={{ 
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            Budget ($)
          </Text>
          <Text 
            size="12px" 
            c="black" 
            style={{ 
              position: 'absolute', 
              left: '10px', 
              top: '170px', 
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center'
            }}
          >
            Reach
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AllocationSection;
