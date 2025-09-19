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

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    if (globalBudget > 0) {
      setTotalBudget(globalBudget.toString());
    }
  }, [globalBudget]);

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Разрешаем только цифры и точку для десятичных чисел
    if (/^\d*\.?\d*$/.test(value)) {
      setTotalBudget(value);
      
      // Обновляем глобальный стейт
      const numericValue = parseFloat(value) || 0;
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