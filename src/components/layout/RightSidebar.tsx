'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, Card } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData, updateEstimations } from '@/store/slices/campaignSlice';
import Image from 'next/image';

interface RightSidebarProps {
  className?: string;
  isOmnichannel?: boolean; // Флаг для определения типа кампании
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className = '', isOmnichannel = false }) => {
  const dispatch = useAppDispatch();
  
  // Получаем данные кампании из глобального стейта
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const linearAudienceEstimation = useAppSelector((state) => state.campaign.estimations.audienceEstimation);
  const linearMarketEstimation = useAppSelector((state) => state.campaign.estimations.marketEstimation);
  const audienceData = useAppSelector((state) => state.campaign.audience);
  
  // Для omnichannel получаем данные из каналов
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const selectedChannels = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // Вычисляем суммарные estimations для omnichannel (только для выбранных каналов)
  const omnichannelAudienceEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    // Audience НЕ может быть больше Market - это один и тот же пул людей
    // Берем максимальное значение среди каналов (лучший охват)
    const audienceValues = selectedChannels
      .filter(ch => ch !== 'linear_tv')
      .map(ch => channelData[ch]?.estimations?.audienceEstimation || 0);
    
    return audienceValues.length > 0 ? Math.max(...audienceValues) : 0;
  }, [isOmnichannel, channelData, selectedChannels]);
  
  const omnichannelMarketEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    // Market НЕ суммируется - это размер доступного рынка (одни и те же люди)
    // Берём максимальное значение из всех выбранных каналов
    const marketValues = selectedChannels
      .filter(ch => ch !== 'linear_tv')
      .map(ch => channelData[ch]?.estimations?.marketEstimation || 0);
    
    return marketValues.length > 0 ? Math.max(...marketValues) : 0;
  }, [isOmnichannel, channelData, selectedChannels]);
  
  // Используем правильные значения в зависимости от типа кампании
  const audienceEstimation = isOmnichannel ? omnichannelAudienceEstimation : linearAudienceEstimation;
  const marketEstimation = isOmnichannel ? omnichannelMarketEstimation : linearMarketEstimation;
  
  // Локальное состояние для редактирования бюджета
  const [budgetInput, setBudgetInput] = useState('');

  // Функция для форматирования числа с разделителями
  const formatNumber = (value: string): string => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    if (totalBudget > 0) {
      setBudgetInput(formatNumber(totalBudget.toString()));
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
    // Используем правильное значение market estimation для linear
    const currentMarketEstimation = isOmnichannel ? omnichannelMarketEstimation : linearMarketEstimation;
    
    // Если нет Market Estimation, то и Audience Estimation должен быть 0
    if (currentMarketEstimation === 0) {
      return 0;
    }
    
    const totalPopulation = currentMarketEstimation;
    
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
  }, [isOmnichannel, omnichannelMarketEstimation, linearMarketEstimation, audienceData, audienceMapping]);

  // Автоматически обновляем Audience Estimation при изменении выбранной аудитории или market estimation
  // Только для linear кампаний (не для omnichannel)
  useEffect(() => {
    if (!isOmnichannel) {
      const calculatedAudience = calculateAudienceEstimation();
      if (calculatedAudience !== linearAudienceEstimation) {
        dispatch(updateEstimations({ audienceEstimation: calculatedAudience }));
      }
    }
  }, [audienceData, linearAudienceEstimation, linearMarketEstimation, dispatch, calculateAudienceEstimation, isOmnichannel]);

  // Обработчик изменения бюджета
  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Убираем запятые для валидации
    const cleanValue = value.replace(/,/g, '');
    
    // Разрешаем только цифры и точку для десятичных чисел
    if (/^\d*\.?\d*$/.test(cleanValue)) {
      setBudgetInput(formatNumber(cleanValue));
      
      // Обновляем глобальный стейт
      const numericValue = parseFloat(cleanValue) || 0;
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
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Budget Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IconCurrencyDollar size={20} color="#666" />
              <input
                type="text"
                value={budgetInput}
                onChange={handleBudgetChange}
                placeholder="Enter budget"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '24px',
                  fontWeight: 600,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Audience Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Audience Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '16px'
          }}>
            <Text size="xl" fw={600} ta="center">
              {audienceEstimation > 0 ? audienceEstimation.toLocaleString('en-US') : '--'}
            </Text>
          </div>
        </div>

        {/* Market Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Market Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '16px'
          }}>
            <Text size="xl" fw={600} ta="center">
              {marketEstimation > 0 ? marketEstimation.toLocaleString('en-US') : '--'}
            </Text>
          </div>
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
