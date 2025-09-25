'use client';

import React, { useState, useEffect } from 'react';
import { Group, Text, ActionIcon, NumberInput, TextInput } from '@mantine/core';
import { IconTrash, IconCurrencyDollar } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useRedux';

// Типы
interface ChannelAllocation {
  id: string;
  name: string;
  color: string;
  budget: number;
  maxReach: number;
  reachPercent: number;
  isInefficient: boolean;
}

// Названия каналов
const channelNames: Record<string, string> = {
  linear_tv: 'Linear TV',
  display: 'Display',
  ctv: 'CTV',
  audio: 'Audio',
  social: 'Social',
  search: 'Search',
  email: 'Email'
};

// Цвета каналов
const channelColors: Record<string, string> = {
  linear_tv: '#3B82F6',
  display: '#10B981',
  ctv: '#F59E0B',
  audio: '#EF4444',
  social: '#8B5CF6',
  search: '#F97316',
  email: '#EC4899'
};

// Мок функция для получения метрик
async function fetchForecastMetrics(channelId: string, budget: number) {
  // Имитируем API вызов
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const baseReach = Math.floor(Math.random() * 50000) + 10000;
  const budgetFactor = budget / 100000;
  
  return {
    maxReach: Math.floor(baseReach * budgetFactor),
    reachPercent: Math.min(95, Math.floor(Math.random() * 40) + 20)
  };
}

// Простой слайдер
interface SimpleSliderProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ value, max, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  
  // Синхронизируем с внешним value когда не перетаскиваем
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);
  
  const percent = (localValue / max) * 100;
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((newPercent / 100) * max / 1000) * 1000;
    
    setLocalValue(newValue);
    onChange(newValue);
  };
  
  const handleMarkerMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    
    let currentDragValue = localValue; // Отслеживаем актуальное значение
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = Math.round((newPercent / 100) * max / 1000) * 1000;
      
      currentDragValue = newValue; // Обновляем локальную переменную
      setLocalValue(newValue);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(currentDragValue); // Используем актуальное значение
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div 
      ref={sliderRef}
      data-slider
      onClick={handleSliderClick}
      style={{ 
        position: 'relative', 
        height: '30px',
        marginBottom: '12px',
        cursor: 'pointer',
      }}
    >
      {/* Фон */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        right: 0,
        height: '20px',
        backgroundColor: '#EBE6EC',
        borderRadius: '4px'
      }} />
      
      {/* Заливка */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        width: `${percent}%`,
        height: '20px',
        backgroundColor: '#4B5563',
        borderRadius: percent > 0 ? '4px 0 0 4px' : '4px'
      }} />
      
      {/* Вертикальная линия от слайдера до ярлычка */}
      <div style={{
        position: 'absolute',
        left: `${percent}%`,
        top: '5px',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '27px',
        backgroundColor: '#EC4899'
      }} />
      
      {/* Маркер */}
      <div
        onMouseDown={handleMarkerMouseDown}
        style={{
          position: 'absolute',
          left: `${percent}%`,
          top: '28px',
          transform: 'translateX(-50%)',
          backgroundColor: '#EC4899',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'grab',
          userSelect: 'none',
          zIndex: 10,
          minWidth: '40px',
          textAlign: 'center'
        }}
      >
        ${Math.round(localValue / 1000)}K
      </div>
    </div>
  );
};

export const BudgetAllocationSliders: React.FC = () => {
  const channelsData = useAppSelector((state) => state.campaign.channels);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 390250;
  
  const selectedChannels = channelsData.selectedChannels;
  const [allocations, setAllocations] = useState<Record<string, ChannelAllocation>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [focusedInputs, setFocusedInputs] = useState<Set<string>>(new Set());

  // Инициализация аллокаций
  useEffect(() => {
    const initializeAllocations = async () => {
      const budgetPerChannel = totalBudget / selectedChannels.length;
      const newAllocations: Record<string, ChannelAllocation> = {};
      const loadingStates: Record<string, boolean> = {};

      for (const channelId of selectedChannels) {
        loadingStates[channelId] = true;
        setIsLoading(prev => ({ ...prev, [channelId]: true }));
        
        const metrics = await fetchForecastMetrics(channelId, budgetPerChannel);
        
        newAllocations[channelId] = {
          id: channelId,
          name: channelNames[channelId] || channelId,
          color: channelColors[channelId] || '#6B7280',
          budget: budgetPerChannel,
          maxReach: metrics.maxReach,
          reachPercent: metrics.reachPercent,
          isInefficient: false
        };
        
        loadingStates[channelId] = false;
      }
      
      setAllocations(newAllocations);
      setIsLoading(loadingStates);
    };

    if (selectedChannels.length > 0) {
      initializeAllocations();
    }
  }, [selectedChannels, totalBudget]);

  // Обработчик изменения бюджета
  const handleBudgetChange = async (channelId: string, newBudget: number) => {
    const currentAllocation = allocations[channelId];
    if (!currentAllocation) return;

    // Обновляем бюджет сразу для UX
    setAllocations(prev => ({
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
      
      setAllocations(prev => ({
        ...prev,
        [channelId]: {
          ...prev[channelId],
          budget: newBudget,
          maxReach: metrics.maxReach,
          reachPercent: metrics.reachPercent,
          // Не меняем isInefficient если инпут в фокусе
          isInefficient: focusedInputs.has(channelId) 
            ? prev[channelId].isInefficient
            : newBudget < totalBudget / selectedChannels.length * 0.5
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
    setAllocations(prev => {
      const newAllocations = { ...prev };
      delete newAllocations[channelId];
      return newAllocations;
    });
  };

  const allocatedBudget = Object.values(allocations).reduce((sum, allocation) => sum + allocation.budget, 0);
  const remainingBudget = totalBudget - allocatedBudget;
  const isValidAllocation = Math.abs(remainingBudget) < 1;

  // Группировка каналов
  const confidentChannels = Object.values(allocations).filter(allocation => !allocation.isInefficient);
  const inefficientChannels = Object.values(allocations).filter(allocation => allocation.isInefficient);

  const ChannelSlider: React.FC<{ allocation: ChannelAllocation }> = ({ allocation }) => {
    return (
      <div style={{ 
        marginBottom: '32px',
        backgroundColor: 'transparent'
      }}>
        {/* Все элементы в одну строку */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'nowrap',
          minHeight: '40px' // Минимальная высота для выравнивания
        }}>
          {/* Иконка канала - 32px черная */}
          <Image
            src={`/assets/icons/channels/${allocation.id}.svg`}
            alt={allocation.name}
            width={32}
            height={32}
            style={{ filter: 'brightness(0)', flexShrink: 0, marginRight: '8px' }} // Делает иконку черной + отступ 8px
          />
          
          {/* Название канала - 12px */}
          <Text size="12px" fw={500} c="#1F2937" style={{ minWidth: '80px', flexShrink: 0, marginRight: '16px' }}>
            {allocation.name}
          </Text>
          
          {/* Поле ввода бюджета */}
          <TextInput
            value={allocation.budget.toLocaleString()}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              handleBudgetChange(allocation.id, Number(value) || 0);
            }}
            leftSection={<IconCurrencyDollar size={16} color="#666" />}
            w={140}
            styles={{
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                paddingLeft: '40px', // Добавляем отступ для иконки
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
            style={{ flexShrink: 0, marginRight: '16px' }}
          />
          
          {/* Слайдер занимает все свободное место */}
          <div style={{ 
            flex: 1, 
            minWidth: '200px', 
            marginRight: '16px'
          }}>
            {/* Метрики над слайдером */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              fontSize: '12px',
              color: '#6B7280',
              marginBottom: '4px'
            }}>
              <span>
                Max Reach: {isLoading[allocation.id] ? '...' : allocation.maxReach.toLocaleString()}
              </span>
              <span>
                Reach%: {isLoading[allocation.id] ? '...' : `${allocation.reachPercent}%`}
              </span>
            </div>
            
            <SimpleSlider
              value={allocation.budget}
              max={totalBudget}
              onChange={(value) => handleBudgetChange(allocation.id, value)}
            />
          </div>
          
          {/* Кнопка удаления */}
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={() => handleRemoveChannel(allocation.id)}
            style={{ flexShrink: 0 }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '900px' }}>
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
          {confidentChannels.map(allocation => (
            <ChannelSlider key={allocation.id} allocation={allocation} />
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
            {inefficientChannels.map(allocation => (
              <ChannelSlider key={allocation.id} allocation={allocation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};