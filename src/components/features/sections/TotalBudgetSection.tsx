'use client';

import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';

interface TotalBudgetSectionProps {
  className?: string;
  onChange?: (budget: number) => void;
}

const TotalBudgetSection: React.FC<TotalBudgetSectionProps> = ({
  className = '',
  onChange
}) => {
  const [totalBudget, setTotalBudget] = useState('');

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Разрешаем только цифры и точку для десятичных чисел
    if (/^\d*\.?\d*$/.test(value)) {
      setTotalBudget(value);
      
      // Вызываем onChange с числовым значением
      if (onChange) {
        const numericValue = parseFloat(value) || 0;
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