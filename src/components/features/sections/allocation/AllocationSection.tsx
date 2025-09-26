'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, Group } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import { ChannelPoint, ChannelAllocation, ChartDimensions } from './types';
import { channelColors, channelNames, CHART_CONFIG } from './constants';
import { DraggablePoint } from './components/DraggablePoint';
import { ChartGrid } from './components/ChartGrid';
import { ChartAxes } from './components/ChartAxes';
import { ChartLines } from './components/ChartLines';
import { 
  ChannelAllocation as SliderChannelAllocation, 
  ChannelSlider, 
  SLIDER_CONFIG,
  fetchForecastMetrics,
  isChannelInefficient
} from './components/sliders';

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
  const [focusedInputs, setFocusedInputs] = useState<Set<string>>(new Set());

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
      
      const budgetPerChannel = totalBudget / selectedChannels.length;
      const newChannelData: Record<string, ChannelPoint & SliderChannelAllocation> = {};
      const loadingStates: Record<string, boolean> = {};

      for (let index = 0; index < selectedChannels.length; index++) {
        const channelId = selectedChannels[index];
        loadingStates[channelId] = true;
        setIsLoading(prev => ({ ...prev, [channelId]: true }));
        
        // Получаем метрики для слайдеров
        const metrics = await fetchForecastMetrics(channelId, budgetPerChannel);
        
        // Создаем объединенные данные для графика и слайдеров
        const fixedReach = CHART_CONFIG.BASE_REACH + (index * CHART_CONFIG.REACH_INCREMENT);
        
        newChannelData[channelId] = {
          // Данные для графика
          id: channelId,
          name: channelNames[channelId] || channelId,
          color: channelColors[channelId] || '#6B7280',
          budget: budgetPerChannel,
          reach: Math.min(fixedReach, CHART_CONFIG.MAX_DISPLAY_REACH),
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
  
  // Обработчик изменения точки на графике
  const handlePointChange = useCallback((channelId: string, newBudget: number, newReach: number) => {
    setChannelData(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        budget: newBudget,
        reach: newReach
      }
    }));
  }, []);

  // Обработчик изменения бюджета для слайдеров
  const handleBudgetChange = async (channelId: string, newBudget: number) => {
    const currentData = channelData[channelId];
    if (!currentData) return;

    // Обновляем бюджет сразу для UX
    setChannelData(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        budget: newBudget
      }
    }));

    // Получаем новые метрики
    setIsLoading(prev => ({ ...prev, [channelId]: true }));
    
    try {
      const metrics = await fetchForecastMetrics(channelId, newBudget);
      const averageBudget = totalBudget / selectedChannels.length;
      
      setChannelData(prev => ({
        ...prev,
        [channelId]: {
          ...prev[channelId],
          budget: newBudget,
          maxReach: metrics.maxReach,
          reachPercent: metrics.reachPercent,
          // Не меняем isInefficient если инпут в фокусе
          isInefficient: focusedInputs.has(channelId) 
            ? prev[channelId].isInefficient
            : isChannelInefficient(newBudget, averageBudget)
        }
      }));
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [channelId]: false }));
    }
  };

  // Удаление канала
  const handleRemoveChannel = (channelId: string) => {
    setChannelData(prev => {
      const newData = { ...prev };
      delete newData[channelId];
      return newData;
    });
  };
  
  // Вычисляем allocations для budget bar
  const totalAllocatedBudget = points.reduce((sum, point) => sum + point.budget, 0);
  const chartAllocations: ChannelAllocation[] = points.map(point => ({
    ...point,
    percentage: totalAllocatedBudget > 0 ? (point.budget / totalAllocatedBudget) * 100 : 0
  }));

  // Вычисляем данные для слайдеров
  const sliderAllocatedBudget = Object.values(channelData).reduce((sum, channel) => sum + channel.budget, 0);
  const remainingBudget = totalBudget - sliderAllocatedBudget;
  const isValidAllocation = Math.abs(remainingBudget) < 1;

  // Группировка каналов для слайдеров
  const confidentChannels = Object.values(channelData).filter(channel => !channel.isInefficient);
  const inefficientChannels = Object.values(channelData).filter(channel => channel.isInefficient);

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
        <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative' }}>
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
          {/* Остаток бюджета */}
          {!isValidAllocation && (
            <div style={{ 
              marginBottom: '32px',
              padding: '16px 20px',
              backgroundColor: remainingBudget > 0 ? '#FEF3C7' : '#FEE2E2',
              border: remainingBudget > 0 ? '1px solid #FBBF24' : '1px solid #FECACA',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Text size="16px" fw={600} c={remainingBudget > 0 ? '#92400E' : '#DC2626'}>
                {remainingBudget > 0 
                  ? `$${remainingBudget.toLocaleString()} remaining to allocate` 
                  : `Over allocated by $${Math.abs(remainingBudget).toLocaleString()}`
                }
              </Text>
              <Text size="14px" c={remainingBudget > 0 ? '#92400E' : '#DC2626'} mt="4px">
                {remainingBudget > 0 
                  ? 'Allocate remaining budget to continue' 
                  : 'Reduce allocation to continue'
                }
              </Text>
            </div>
          )}

          {/* Индикатор валидности аллокации */}
          {isValidAllocation && (
            <div style={{ 
              marginBottom: '32px',
              padding: '16px 20px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Text size="16px" fw={600} c="#15803D">
                ✓ Budget allocation complete
              </Text>
              <Text size="14px" c="#15803D" mt="4px">
                Total budget of ${totalBudget.toLocaleString()} has been fully allocated
              </Text>
            </div>
          )}

          {/* Confident channels */}
          {confidentChannels.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <Text size="12px" fw={400} c="#1F2937" mb="20px">
                Confident to the following channels to meet your goals:
              </Text>
              {confidentChannels.map(channel => (
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

          {/* Inefficient channels */}
          {inefficientChannels.length > 0 && (
            <div>
              {/* Дивайдер */}
              <div style={{
                height: '1px',
                backgroundColor: '#EBE6EC',
                marginBottom: '24px'
              }} />
              
              <div style={{
                backgroundColor: '#FFF5FB',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <Text size="14px" fw={400} c="#1F2937" mb="20px">
                  Think about reallocate:
                </Text>
                {inefficientChannels.map(channel => (
                  <ChannelSlider 
                    key={channel.id} 
                    allocation={channel} 
                    onBudgetChange={handleBudgetChange}
                    onRemove={handleRemoveChannel}
                    isLoading={isLoading[channel.id]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllocationSection;
