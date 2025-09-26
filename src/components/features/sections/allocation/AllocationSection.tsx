'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, Group } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import { ChannelPoint, ChannelAllocation, ChartDimensions } from './types';
import { channelColors, channelNames, CHART_CONFIG, CHANNEL_REACH_COEFFICIENTS } from './constants';
import { DraggablePoint } from './components/DraggablePoint';
import { ChartGrid } from './components/ChartGrid';
import { ChartAxes } from './components/ChartAxes';
import { ChartLines } from './components/ChartLines';
import { 
  ChannelAllocation as SliderChannelAllocation, 
  ChannelSlider, 
  fetchForecastMetrics
} from './components/sliders';
import { calculateReachFromBudget, redistributeBudgetSmart } from './utils';

export const AllocationSection: React.FC = () => {
  const channelsData = useAppSelector((state) => state.campaign.channels);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState<ChartDimensions>({ width: 600, height: 300 });
  
  const selectedChannels = channelsData.selectedChannels;
  const channelCount = selectedChannels.length;
  
  // Единое состояние для каналов (содержит данные для графика и слайдеров)
  const [channelData, setChannelData] = useState<Record<string, ChannelPoint & SliderChannelAllocation>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // Отслеживаем размеры контейнера
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const rect = chartContainerRef.current.getBoundingClientRect();
        
        setChartDimensions({
          width: rect.width - CHART_CONFIG.OFFSET_X, // Минус отступ для Y-axis
          height: 300 // Фиксированная высота
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Инициализация данных каналов (для графика и слайдеров)
  useEffect(() => {
    const initializeChannelData = async () => {
      if (!totalBudget || selectedChannels.length === 0) return;
      
      const budgetPerChannel = Math.round(totalBudget / selectedChannels.length / 100) * 100;
      const newChannelData: Record<string, ChannelPoint & SliderChannelAllocation> = {};
      const loadingStates: Record<string, boolean> = {};

      for (let index = 0; index < selectedChannels.length; index++) {
        const channelId = selectedChannels[index];
        loadingStates[channelId] = true;
        setIsLoading(prev => ({ ...prev, [channelId]: true }));
        
        // Получаем метрики для слайдеров
        const metrics = await fetchForecastMetrics(channelId, budgetPerChannel, totalBudget);
        
        // Вычисляем reach на основе бюджета и коэффициента канала
        const calculatedReach = calculateReachFromBudget(channelId, budgetPerChannel, totalBudget);
        
        newChannelData[channelId] = {
          // Данные для графика
          id: channelId,
          name: channelNames[channelId] || channelId,
          color: channelColors[channelId] || '#6B7280',
          budget: budgetPerChannel,
          reach: calculatedReach,
          // Данные для слайдеров
          maxReach: metrics.maxReach,
          reachPercent: metrics.reachPercent,
          isInefficient: false
        };
        
        loadingStates[channelId] = false;
      }
      
      setChannelData(newChannelData);
      setIsLoading(loadingStates);
    };

    initializeChannelData();
  }, [selectedChannels, totalBudget]);

  const points = Object.values(channelData);
  
  // Обработчик изменения точки на графике с умным перераспределением (только по X - бюджет)
  const handlePointChange = useCallback((channelId: string, newBudget: number) => {
    // Ограничиваем бюджет максимальным значением и округляем до кратного 100
    const clampedBudget = Math.round(Math.min(Math.max(0, newBudget), totalBudget) / 100) * 100;

    setChannelData(prev => {
      // Получаем текущие бюджеты всех каналов
      const currentBudgets: Record<string, number> = {};
      Object.keys(prev).forEach(id => {
        currentBudgets[id] = prev[id].budget;
      });

      // Умное перераспределение с учетом коэффициентов
      const newBudgets = redistributeBudgetSmart(currentBudgets, channelId, clampedBudget, totalBudget);

      // Обновляем все каналы с новыми бюджетами и пересчитанным reach
      const updated = { ...prev };
      Object.keys(newBudgets).forEach(id => {
        if (updated[id]) {
          const newChannelBudget = newBudgets[id];
          const calculatedReach = calculateReachFromBudget(id, newChannelBudget, totalBudget);
          updated[id] = {
            ...updated[id],
            budget: newChannelBudget,
            reach: calculatedReach
          };
        }
      });
      
      return updated;
    });
  }, [selectedChannels, totalBudget]);

  // Обработчик изменения бюджета с умным перераспределением
  const handleBudgetChange = async (channelId: string, newBudget: number) => {
    const currentData = channelData[channelId];
    if (!currentData) return;

    // Ограничиваем бюджет максимальным значением и округляем до кратного 100
    const clampedBudget = Math.round(Math.min(Math.max(0, newBudget), totalBudget) / 100) * 100;

    // Обновляем данные с умным перераспределением и пересчетом reach
    setChannelData(prev => {
      // Получаем текущие бюджеты всех каналов
      const currentBudgets: Record<string, number> = {};
      Object.keys(prev).forEach(id => {
        currentBudgets[id] = prev[id].budget;
      });

      // Умное перераспределение с учетом коэффициентов
      const newBudgets = redistributeBudgetSmart(currentBudgets, channelId, clampedBudget, totalBudget);

      // Обновляем все каналы с новыми бюджетами и пересчитанным reach
      const updated = { ...prev };
      Object.keys(newBudgets).forEach(id => {
        if (updated[id]) {
          const newChannelBudget = newBudgets[id];
          const calculatedReach = calculateReachFromBudget(id, newChannelBudget, totalBudget);
          updated[id] = {
            ...updated[id],
            budget: newChannelBudget,
            reach: calculatedReach
          };
        }
      });
      
      return updated;
    });

    // Получаем новые метрики для изменённого канала
    setIsLoading(prev => ({ ...prev, [channelId]: true }));
    
    try {
      const metrics = await fetchForecastMetrics(channelId, clampedBudget, totalBudget);
      
      setChannelData(prev => ({
        ...prev,
        [channelId]: {
          ...prev[channelId],
          budget: clampedBudget,
          maxReach: metrics.maxReach,
          reachPercent: metrics.reachPercent,
          isInefficient: false
        }
      }));
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [channelId]: false }));
    }
  };

  // Удаление канала с перераспределением бюджета
  const handleRemoveChannel = (channelId: string) => {
    setChannelData(prev => {
      const newData = { ...prev };
      const removedChannelBudget = newData[channelId]?.budget || 0;
      delete newData[channelId];
      
      // Перераспределяем бюджет удаленного канала между оставшимися
      const remainingChannels = Object.keys(newData);
      if (remainingChannels.length > 0) {
        const budgetPerChannel = removedChannelBudget / remainingChannels.length;
        remainingChannels.forEach(otherId => {
          newData[otherId] = {
            ...newData[otherId],
            budget: newData[otherId].budget + budgetPerChannel
          };
        });
      }
      
      return newData;
    });
  };
  
  // Вычисляем allocations для budget bar
  const totalAllocatedBudget = points.reduce((sum, point) => sum + point.budget, 0);
  const chartAllocations: ChannelAllocation[] = points.map(point => ({
    ...point,
    percentage: totalAllocatedBudget > 0 ? (point.budget / totalAllocatedBudget) * 100 : 0
  }));

  // Все каналы для слайдеров
  const allChannels = Object.values(channelData);

  // Используем динамические размеры
  const chartWidth = chartDimensions.width;
  const chartHeight = chartDimensions.height;

  // Показываем заглушку если нет каналов или бюджета
  if (channelCount === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="14px" c="dimmed">
          Select channels to display budget distribution
        </Text>
      </div>
    );
  }

  if (!totalBudget || totalBudget === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="14px" c="dimmed">
          Set a budget to display allocation controls
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
          {chartAllocations.map(allocation => (
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
            <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="350" style={{ overflow: 'visible' }}>
            <ChartGrid 
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              offsetX={CHART_CONFIG.OFFSET_X}
              offsetY={CHART_CONFIG.OFFSET_Y}
            />
            
            <ChartAxes 
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              offsetX={CHART_CONFIG.OFFSET_X}
              offsetY={CHART_CONFIG.OFFSET_Y}
              totalBudget={totalBudget}
            />
            
            <ChartLines 
              points={points}
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              totalBudget={totalBudget}
              offsetX={CHART_CONFIG.OFFSET_X}
              offsetY={CHART_CONFIG.OFFSET_Y}
            />
            
            {/* Draggable points */}
            {points.map(point => (
              <DraggablePoint
                key={`point-${point.id}`}
                point={point}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                totalBudget={totalBudget}
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

      {/* Budget Allocation Sliders */}
      {selectedChannels.length > 0 && (
        <div style={{ marginTop: '32px', maxWidth: '900px' }}>

          {/* Channel Sliders */}
          {allChannels.length > 0 && (
            <div>
              <Text size="12px" fw={400} c="#1F2937" mb="20px">
                Budget allocation by channel:
              </Text>
              {allChannels.map(channel => (
                <ChannelSlider 
                  key={channel.id} 
                  allocation={channel} 
                  onBudgetChange={handleBudgetChange}
                  onRemove={handleRemoveChannel}
                  isLoading={isLoading[channel.id]}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllocationSection;
