'use client';

import React, { useState, useEffect } from 'react';
import { Text, ActionIcon, TextInput, Tooltip } from '@mantine/core';
import { IconTrash, IconCurrencyDollar } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useRedux';
import { ChannelSliderProps } from './types';
import { SimpleSlider } from './SimpleSlider';
import { formatCurrency, parseNumericValue } from './utils';

export const ChannelSlider: React.FC<ChannelSliderProps> = ({ 
  allocation, 
  onBudgetChange, 
  onRemove,
  isLoading = false 
}) => {
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 390250;
  
  // Локальное состояние для инпута
  const [inputValue, setInputValue] = useState(formatCurrency(allocation.budget));
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Синхронизируем локальное состояние с внешним значением
  useEffect(() => {
    if (!isInputFocused) {
      setInputValue(formatCurrency(allocation.budget));
    }
  }, [allocation.budget, isInputFocused]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    const numericValue = parseNumericValue(inputValue);
    onBudgetChange(allocation.id, numericValue);
    setInputValue(formatCurrency(numericValue));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    // При фокусе показываем сырое числовое значение
    setInputValue(allocation.budget.toString());
  };

  const handleSliderChange = (value: number) => {
    onBudgetChange(allocation.id, value);
  };

  const handleRemove = () => {
    onRemove(allocation.id);
  };

  // Вычисляем процент бюджета
  const budgetPercent = totalBudget > 0 ? (allocation.budget / totalBudget) * 100 : 0;
  const isLowBudget = budgetPercent < 10 && budgetPercent > 0;

  return (
    <Tooltip
      label="Think about reallocate"
      disabled={!isLowBudget}
      position="top"
      withArrow
    >
      <div style={{ 
        marginBottom: '32px',
        backgroundColor: isLowBudget ? '#FFF5FB' : 'transparent',
        padding: '8px',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease'
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
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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
              Max Reach: {isLoading ? '...' : allocation.maxReach.toLocaleString()}
            </span>
            <span>
              Reach%: {isLoading ? '...' : `${allocation.reachPercent}%`}
            </span>
          </div>
          
          <SimpleSlider
            value={allocation.budget}
            max={totalBudget}
            step={100} // Шаг в 100 долларов для точного контроля
            color={allocation.color} // Оставляем оригинальный цвет канала
            onChange={handleSliderChange}
          />
        </div>
        
        {/* Кнопка удаления */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={handleRemove}
          style={{ flexShrink: 0 }}
        >
          <IconTrash size={16} />
        </ActionIcon>
        </div>
      </div>
    </Tooltip>
  );
};
