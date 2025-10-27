'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, Card } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData, updateEstimations } from '@/store/slices/campaignSlice';
import AISuggestionCard from '@/components/ui/AISuggestionCard';

interface RightSidebarProps {
  className?: string;
  isOmnichannel?: boolean; // Флаг для определения типа кампании
  pageKey?: string; // Ключ страницы для AI подсказок
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className = '', isOmnichannel = false, pageKey = 'default' }) => {
  const dispatch = useAppDispatch();
  
  // Получаем данные кампании из глобального стейта
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const linearAudienceEstimation = useAppSelector((state) => state.campaign.estimations.audienceEstimation);
  const linearMarketEstimation = useAppSelector((state) => state.campaign.estimations.marketEstimation);
  const audienceData = useAppSelector((state) => state.campaign.audience);
  
  // Для omnichannel получаем данные из каналов
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const selectedChannels = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // Для Linear: получаем данные о markets, broadcasters и stations
  const marketsDetails = useAppSelector((state) => state.campaign.markets.marketsDetails);
  const broadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations);
  
  // Вычисляем суммарные estimations для omnichannel (только для выбранных каналов)
  // Сначала вычисляем market estimation, чтобы использовать его для ограничения audience
  const omnichannelMarketEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    
    const filteredChannels = selectedChannels.filter(ch => ch !== 'linear_tv');
    const marketValues = filteredChannels.map(ch => channelData[ch]?.estimations?.marketEstimation || 0);
    
    if (marketValues.length === 0) return 0;
    if (marketValues.length === 1) return marketValues[0];
    
    // Проверяем, используются ли конкретные zip codes для таргетинга
    const hasGeoTargeting = filteredChannels.some(ch => {
      const geoData = channelData[ch]?.geo;
      return geoData?.selectedZipCodes && geoData.selectedZipCodes.length > 0;
    });
    
    if (hasGeoTargeting) {
      // При geo-таргетинге суммируем market estimation с коэффициентом overlap 0.85
      const totalSum = marketValues.reduce((sum, val) => sum + val, 0);
      return Math.round(totalSum * 0.85);
    } else {
      // При nationwide таргетинге берем максимум - это один и тот же рынок США
      return Math.max(...marketValues);
    }
  }, [isOmnichannel, channelData, selectedChannels]);
  
  const omnichannelAudienceEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    // Для omnichannel - суммируем все каналы с учетом overlap
    // Простая логика: ~30% людей видят рекламу в нескольких каналах
    const audienceValues = selectedChannels
      .filter(ch => ch !== 'linear_tv')
      .map(ch => channelData[ch]?.estimations?.audienceEstimation || 0);
    
    if (audienceValues.length === 0) return 0;
    if (audienceValues.length === 1) return audienceValues[0];
    
    // Суммируем и применяем фиксированный коэффициент 0.7
    const totalSum = audienceValues.reduce((sum, val) => sum + val, 0);
    const totalAudience = Math.round(totalSum * 0.7);
    
    // ВАЖНО: Audience не может превышать Market Estimation
    return Math.min(totalAudience, omnichannelMarketEstimation);
  }, [isOmnichannel, channelData, selectedChannels, omnichannelMarketEstimation]);
  
  // Используем правильные значения в зависимости от типа кампании
  const audienceEstimation = isOmnichannel ? omnichannelAudienceEstimation : linearAudienceEstimation;
  const marketEstimation = isOmnichannel ? omnichannelMarketEstimation : linearMarketEstimation;
  
  // Вычисляем детали для Linear Market Estimation
  const linearMarketDetails = useMemo(() => {
    if (isOmnichannel) return null;
    
    const selectedMarketsCount = marketsDetails?.filter(m => m.selected).length || 0;
    const selectedBroadcastersCount = broadcasters?.length || 0;
    
    // Подсчитываем количество выбранных станций
    let totalStations = 0;
    let totalImpressions = 0;
    let totalCPM = 0;
    let stationCount = 0;
    
    if (broadcastersWithStations && broadcastersWithStations.length > 0) {
      broadcastersWithStations.forEach(broadcaster => {
        broadcaster.stations.forEach(station => {
          if (station.selected) {
            totalStations++;
            
            // Расчет impressions: (budget / CPM) * 1000
            if (station.budget > 0 && station.cpm) {
              const cpmValue = parseFloat(station.cpm.replace('$', ''));
              if (cpmValue > 0) {
                totalImpressions += (station.budget / cpmValue) * 1000;
                totalCPM += cpmValue;
                stationCount++;
              }
            }
          }
        });
      });
    }
    
    const averageCPM = stationCount > 0 ? totalCPM / stationCount : 0;
    
    return {
      marketsCount: selectedMarketsCount,
      broadcastersCount: selectedBroadcastersCount,
      programsCount: totalStations,
      totalImpressions,
      averageCPM
    };
  }, [isOmnichannel, marketsDetails, broadcasters, broadcastersWithStations]);
  
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
            padding: '24px 16px',
            marginBottom: '16px'
          }}>
            {!isOmnichannel && linearMarketDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Markets */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="xl" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.marketsCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Markets
                  </Text>
                </div>
                
                {/* Broadcasters */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="xl" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.broadcastersCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Broadcasters
                  </Text>
                </div>
                
                {/* Stations */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="xl" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.programsCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Stations
                  </Text>
                </div>
                
                {/* Impressions */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="xl" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.totalImpressions > 0 
                      ? linearMarketDetails.totalImpressions.toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : '#'
                    }
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Impressions
                  </Text>
                </div>
                
                {/* Average CPM */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="xl" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.averageCPM > 0 
                      ? `$${linearMarketDetails.averageCPM.toFixed(2)}`
                      : '#'
                    }
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Avg. CPM
                  </Text>
                </div>
              </div>
            ) : (
              <Text size="xl" fw={600} ta="center">
                {marketEstimation > 0 ? marketEstimation.toLocaleString('en-US') : '--'}
              </Text>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        <AISuggestionCard pageKey={pageKey} />
      </div>
    </div>
  );
};

export default RightSidebar;
