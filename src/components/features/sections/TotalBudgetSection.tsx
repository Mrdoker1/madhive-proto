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
          size="md"
          styles={{
            root: {
              width: '100%'
            },
            input: {
              fontSize: '14px',
              padding: '12px 16px 12px 44px', // Дополнительный отступ слева для иконки
            },
            label: {
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px',
              color: 'var(--foreground)'
            }
          }}
        />
      </div>
    </div>
  );
};

export default TotalBudgetSection;