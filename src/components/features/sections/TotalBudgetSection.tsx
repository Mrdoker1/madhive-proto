'use client';

import React, { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';

interface TotalBudgetSectionProps {
  className?: string;
  onChange?: (budget: number) => void;
}

const TotalBudgetSection: React.FC<TotalBudgetSectionProps> = ({
  className = '',
  onChange
}) => {
  const dispatch = useAppDispatch();
  const globalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const [totalBudget, setTotalBudget] = useState('');

  // Функция для форматирования числа с разделителями
  const formatNumber = (value: string): string => {
    // Убираем все нецифровые символы кроме точки
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    // Форматируем целую часть с разделителями
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Функция для парсинга форматированного числа
  const parseFormattedNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    if (globalBudget > 0) {
      setTotalBudget(formatNumber(globalBudget.toString()));
    }
  }, [globalBudget]);

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Убираем запятые для валидации
    const cleanValue = value.replace(/,/g, '');
    
    // Разрешаем только цифры и точку для десятичных чисел
    if (/^\d*\.?\d*$/.test(cleanValue)) {
      // Сохраняем с форматированием
      setTotalBudget(formatNumber(cleanValue));
      
      // Обновляем глобальный стейт
      const numericValue = parseFloat(cleanValue) || 0;
      dispatch(updateBudgetData({ totalBudget: numericValue }));
      
      // Вызываем onChange для обратной совместимости
      if (onChange) {
        onChange(numericValue);
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="w-full">
        <TextInput
          placeholder="Enter total budget amount"
          value={totalBudget}
          onChange={handleBudgetChange}
          leftSection={
            <IconCurrencyDollar 
              size={18} 
              style={{ color: '#9CA3AF' }} // Тусклый серый цвет
            />
          }
          styles={{
            root: {
              width: '100%'
            },
            input: {
              paddingLeft: '44px', // Дополнительный отступ слева для иконки
            }
          }}
        />
      </div>
    </div>
  );
};

export default TotalBudgetSection;