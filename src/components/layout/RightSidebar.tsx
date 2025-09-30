'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TextInput, Text, Card } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData, updateEstimations } from '@/store/slices/campaignSlice';
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
  const audienceData = useAppSelector((state) => state.campaign.audience);
  
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

  // Маппинг аудитории на количество людей (мемоизированный)
  const audienceMapping = useMemo(() => ({
    gender: {
      'Male': 1247832,
      'Female': 1363571
    },
    age: {
      'Under 18': 734291,
      '18 - 24': 982145,
      '25 - 34': 1458367,
      '35 - 44': 1203794,
      '45 - 54': 967523,
      '55 - 64': 845192,
      '65 and over': 623847
    },
    income: {
      'Under $50k': 1567239,
      '$50k - $100k': 1892156,
      '$100k - $150k': 834672,
      '$150k - $200k': 456283,
      '$200k - $250k': 187394,
      'Over $250k': 89156
    },
    education: {
      'High school diploma': 1623948,
      "Associate's degree": 743821,
      "Bachelor's degree": 1256347,
      "Master's degree": 478392
    },
    householdSize: {
      'One child': 892734,
      'Two children': 1034567,
      '>2 children': 523189
    }
  }), []); // Пустой массив зависимостей, так как данные статичные

  // Функция для расчета общей аудитории (мемоизированная)
  const calculateAudienceEstimation = useCallback(() => {
    // Если нет Market Estimation, то и Audience Estimation должен быть 0
    if (marketEstimation === 0) {
      return 0;
    }
    
    const totalPopulation = marketEstimation;
    
    // Если ничего не выбрано в аудитории - возвращаем полную аудиторию рынков
    const hasSelections = Object.values(audienceData).some(arr => Array.isArray(arr) && arr.length > 0);
    if (!hasSelections) {
      return totalPopulation;
    }
    
    // Рассчитываем процент сужения для каждой категории
    let audienceMultiplier = 1.0;
    
    Object.entries(audienceData).forEach(([category, selectedOptions]) => {
      if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        // Получаем общую сумму для этой категории
        const categoryMapping = audienceMapping[category as keyof typeof audienceMapping];
        if (categoryMapping) {
          const categoryTotal = Object.values(categoryMapping).reduce((sum, value) => sum + value, 0);
          const selectedTotal = selectedOptions.reduce((sum, option) => {
            const optionValue = categoryMapping[option as keyof typeof categoryMapping] || 0;
            return sum + optionValue;
          }, 0);
          
          // Процент от общей категории
          const categoryPercent = selectedTotal / categoryTotal;
          audienceMultiplier *= categoryPercent;
        }
      }
    });
    
    return Math.round(totalPopulation * audienceMultiplier);
  }, [marketEstimation, audienceData, audienceMapping]);

  // Автоматически обновляем Audience Estimation при изменении выбранной аудитории или market estimation
  useEffect(() => {
    const calculatedAudience = calculateAudienceEstimation();
    if (calculatedAudience !== audienceEstimation) {
      dispatch(updateEstimations({ audienceEstimation: calculatedAudience }));
    }
  }, [audienceData, audienceEstimation, marketEstimation, dispatch, calculateAudienceEstimation]);

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
            placeholder="Select audience criteria"
            value={audienceEstimation > 0 ? audienceEstimation.toLocaleString('en-US') : ''}
            readOnly
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
                backgroundColor: '#F8F9FA', // Слегка серый фон для readOnly поля
                cursor: 'default'
              }
            }}
          />
        </div>

        {/* Market Estimation */}
        <div>
          <TextInput
            label="Market Estimation"
            placeholder="Select markets to see estimation"
            value={marketEstimation > 0 ? marketEstimation.toLocaleString('en-US') : ''}
            readOnly
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
                backgroundColor: '#F8F9FA', // Слегка серый фон для readOnly поля
                cursor: 'default'
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
