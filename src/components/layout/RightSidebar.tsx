'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Text, Card } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';
import Image from 'next/image';

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  
  // Получаем данные кампании из глобального стейта
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const audienceEstimation = useAppSelector((state) => state.campaign.estimations.audienceEstimation);
  const marketEstimation = useAppSelector((state) => state.campaign.estimations.marketEstimation);
  
  // Локальное состояние для редактирования бюджета
  const [budgetInput, setBudgetInput] = useState('');

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    if (totalBudget > 0) {
      setBudgetInput(totalBudget.toString());
    }
  }, [totalBudget]);

  // Форматирование бюджета для отображения
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Обработчик изменения бюджета
  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Разрешаем только цифры и точку для десятичных чисел
    if (/^\d*\.?\d*$/.test(value)) {
      setBudgetInput(value);
      
      // Обновляем глобальный стейт
      const numericValue = parseFloat(value) || 0;
      dispatch(updateBudgetData({ totalBudget: numericValue }));
    }
  };

  return (
    <div 
      className={`w-80 flex-shrink-0 h-full overflow-auto ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '100px',
        marginLeft: '24px'
      }}
    >
      <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: '16px' }}>
        {/* Budget Estimation */}
        <div>
          <TextInput
            label="Budget Estimation"
            placeholder="Enter budget amount"
            leftSection={<IconCurrencyDollar size={16} color="#666" />}
            value={budgetInput}
            onChange={handleBudgetChange}
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                paddingLeft: '40px', // Добавляем отступ для иконки
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* Audience Estimation */}
        <div>
          <TextInput
            label="Audience Estimation"
            placeholder="Audience estimation"
            disabled
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* Market Estimation */}
        <div>
          <TextInput
            label="Market Estimation"
            placeholder="Market estimation"
            disabled
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* AI Suggestions */}
        <Card
          padding="lg"
          radius="md"
          styles={{
            root: {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              position: 'relative'
            }
          }}
        >
          {/* Spark Icon in top right corner */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px'
          }}>
            <Image
              src="/assets/icons/other/spark.svg"
              alt="AI Spark"
              width={20}
              height={20}
              className={className}
            />
          </div>
          
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5, paddingRight: '30px' }}>
            We suggest you : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;
