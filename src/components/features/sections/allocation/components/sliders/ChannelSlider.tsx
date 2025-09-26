'use client';

import React from 'react';
import { Text, ActionIcon, TextInput } from '@mantine/core';
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

  const handleInputChange = (value: string) => {
    const numericValue = parseNumericValue(value);
    onBudgetChange(allocation.id, numericValue);
  };

  const handleSliderChange = (value: number) => {
    onBudgetChange(allocation.id, value);
  };

  const handleRemove = () => {
    onRemove(allocation.id);
  };

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
          value={formatCurrency(allocation.budget)}
          onChange={(e) => handleInputChange(e.target.value)}
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
  );
};
