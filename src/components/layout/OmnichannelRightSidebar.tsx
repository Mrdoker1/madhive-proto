'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Text, Card, Group } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';
import ChannelPills, { ChannelPill } from '@/components/ui/ChannelPills';

// Цвета каналов из allocation
const CHANNEL_COLORS: Record<string, string> = {
  total: '#000000',
  ctv: '#FF9BD3', 
  preroll: '#6633CC',
  audio: '#33CCCC',
  display: '#6633CC',
  social: '#FF0099',
  search: '#00A3FF',
  email: '#FFA100'
};

type ChannelType = 'total' | 'ctv' | 'preroll' | 'audio' | 'social' | 'search' | 'email';

interface OmnichannelRightSidebarProps {
  className?: string;
  selectedChannels?: string[]; // Массив выбранных каналов (preroll, ctv, audio, etc.)
  readOnly?: boolean; // Если true, то бюджет нельзя редактировать
}

const OmnichannelRightSidebar: React.FC<OmnichannelRightSidebarProps> = ({ 
  className = '',
  selectedChannels = [],
  readOnly = false
}) => {
  const dispatch = useAppDispatch();
  const [activeChannel, setActiveChannel] = useState<ChannelType>('total');
  const [audienceSize, setAudienceSize] = useState<'Small' | 'Good' | 'Strong'>('Strong');
  
  // Получаем распределение бюджета и total budget из Redux
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 0;
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
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

  const allChannelPills: ChannelPill[] = [
    { id: 'total', label: 'Total' },
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];
  
  // Фильтруем pills: Total всегда показываем + выбранные каналы
  const channelPills = useMemo(() => {
    if (selectedChannels.length === 0) {
      return allChannelPills; // Если ничего не выбрано, показываем все
    }
    
    return allChannelPills.filter(pill => 
      pill.id === 'total' || selectedChannels.includes(pill.id)
    );
  }, [selectedChannels]);
  
  // Если активный канал не в списке доступных, переключаемся на Total
  useEffect(() => {
    const isActiveChannelAvailable = channelPills.some(pill => pill.id === activeChannel);
    if (!isActiveChannelAvailable) {
      setActiveChannel('total');
    }
  }, [channelPills, activeChannel]);

  // Список всех возможных каналов для легенды
  const allLegendChannels = [
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];

  // Фильтруем легенду только для выбранных каналов
  const visibleLegendChannels = selectedChannels.length > 0
    ? allLegendChannels.filter(channel => selectedChannels.includes(channel.id))
    : allLegendChannels;

  // Вычисляем процент бюджета для канала
  const getChannelBudgetPercent = (channelId: string): number => {
    if (!budgetAllocation || totalBudget === 0) return 0;
    const channelBudget = budgetAllocation[channelId] || 0;
    return (channelBudget / totalBudget) * 100;
  };

  // Получаем Market Estimation для канала
  const getMarketEstimation = (): number => {
    if (activeChannel === 'total') {
      const marketValues = selectedChannels.map(ch => 
        channelData[ch]?.estimations?.marketEstimation || 0
      );
      
      if (marketValues.length === 0) return 0;
      if (marketValues.length === 1) return marketValues[0];
      
      // Проверяем, используются ли конкретные zip codes для таргетинга
      // Если хотя бы один канал использует geo-targeting, суммируем с коэффициентом
      const hasGeoTargeting = selectedChannels.some(ch => {
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
    } else {
      // Для конкретного канала
      return channelData[activeChannel]?.estimations?.marketEstimation || 0;
    }
  };

  // Получаем Audience Estimation для канала
  const getAudienceEstimation = (): number => {
    if (activeChannel === 'total') {
      // Для Total - суммируем все каналы с учетом overlap
      // Простая логика: ~30% людей видят рекламу в нескольких каналах
      const audienceValues = selectedChannels.map(ch => 
        channelData[ch]?.estimations?.audienceEstimation || 0
      );
      
      if (audienceValues.length === 0) return 0;
      if (audienceValues.length === 1) return audienceValues[0];
      
      // Суммируем и применяем фиксированный коэффициент 0.7
      const totalSum = audienceValues.reduce((sum, val) => sum + val, 0);
      const totalAudience = Math.round(totalSum * 0.7);
      
      // ВАЖНО: Audience не может превышать Market Estimation
      const totalMarket = getMarketEstimation();
      
      return Math.min(totalAudience, totalMarket);
    } else {
      // Для конкретного канала
      return channelData[activeChannel]?.estimations?.audienceEstimation || 0;
    }
  };

  // Вычисляем распределение для выбранных каналов в режиме Total
  const getTotalProgressBars = () => {
    if (selectedChannels.length === 0 || !budgetAllocation) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    // Используем реальное распределение бюджета из Redux
    return selectedChannels.map(channelId => {
      const percentOfTotal = getChannelBudgetPercent(channelId);
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfTotal}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Вычисляем процент аудитории для канала
  const getChannelAudiencePercent = (channelId: string): number => {
    if (selectedChannels.length === 0) return 0;
    
    const channelAudience = channelData[channelId]?.estimations?.audienceEstimation || 0;
    const totalAudience = selectedChannels.reduce((sum, ch) => {
      return sum + (channelData[ch]?.estimations?.audienceEstimation || 0);
    }, 0);
    
    return totalAudience > 0 ? (channelAudience / totalAudience) * 100 : 0;
  };

  // Вычисляем распределение аудитории для выбранных каналов
  const getTotalAudienceProgressBars = () => {
    if (selectedChannels.length === 0) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    return selectedChannels.map(channelId => {
      const percentOfTotal = getChannelAudiencePercent(channelId);
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfTotal}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Вычисляем процент market estimation для канала
  const getChannelMarketPercent = (channelId: string): number => {
    if (selectedChannels.length === 0) return 0;
    
    const channelMarket = channelData[channelId]?.estimations?.marketEstimation || 0;
    const totalMarket = selectedChannels.reduce((sum, ch) => {
      return sum + (channelData[ch]?.estimations?.marketEstimation || 0);
    }, 0);
    
    return totalMarket > 0 ? (channelMarket / totalMarket) * 100 : 0;
  };

  // Вычисляем распределение market estimation для выбранных каналов
  const getTotalMarketProgressBars = () => {
    if (selectedChannels.length === 0) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    return selectedChannels.map(channelId => {
      const percentOfTotal = getChannelMarketPercent(channelId);
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfTotal}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Функция для определения цвета легенды
  const getLegendColor = (channelId: string): string => {
    if (activeChannel === 'total') {
      return CHANNEL_COLORS[channelId] || '#CCCCCC';
    }
    // Если выбран конкретный канал, только он цветной, остальные серые
    return activeChannel === channelId ? CHANNEL_COLORS[channelId] : '#CCCCCC';
  };

  return (
    <div 
      className={`w-80 flex-shrink-0 ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '24px',
        marginLeft: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: 'calc(100vh - 48px)'
      }}
    >
      {/* Sticky Header with Pills */}
      <div style={{ 
        position: 'sticky',
        top: 0,
        backgroundColor: '#F3F2EB',
        zIndex: 10,
        paddingTop: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }}>
        <ChannelPills
          channels={channelPills}
          activeChannel={activeChannel}
          onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
        />
        {/* Divider */}
        <div style={{ 
          width: 'calc(100% + 48px)', 
          height: '1px', 
          backgroundColor: '#D1D5DB', 
          marginLeft: '-24px',
          marginTop: '16px'
        }} />
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px',
        gap: '16px',
        overflowY: 'auto',
        flex: 1
      }}>
        {/* Budget Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Budget Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '8px'
          }}>
            {activeChannel === 'total' ? (
              readOnly ? (
                // Режим только для чтения - показываем текст
                <Text size="xl" fw={600} ta="center">
                  $ {totalBudget.toLocaleString('en-US')}
                </Text>
              ) : (
                // Режим редактирования - показываем input
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
              )
            ) : (
              <Text size="xl" fw={600} ta="center">
                {budgetAllocation && budgetAllocation[activeChannel] ? (
                  `$ ${budgetAllocation[activeChannel].toLocaleString('en-US')}`
                ) : (
                  '$ 0'
                )}
              </Text>
            )}
          </div>
          
          {activeChannel === 'total' && selectedChannels.length > 0 && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              of $ {totalBudget.toLocaleString('en-US')} in {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
            </Text>
          )}
          
          {activeChannel !== 'total' && budgetAllocation && budgetAllocation[activeChannel] && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              {getChannelBudgetPercent(activeChannel).toFixed(1)}% of total budget
            </Text>
          )}
          
          {/* Progress Bar */}
          <div style={{ 
            display: 'flex', 
            height: '8px', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            {activeChannel === 'total' ? (
              getTotalProgressBars()
            ) : (
              <>
                <div style={{ 
                  width: `${getChannelBudgetPercent(activeChannel)}%`, 
                  backgroundColor: CHANNEL_COLORS[activeChannel] 
                }} />
                <div style={{ 
                  width: `${100 - getChannelBudgetPercent(activeChannel)}%`, 
                  backgroundColor: '#E5E5E5' 
                }} />
              </>
            )}
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
            gap: '8px 4px',
            fontSize: '11px',
            color: '#666',
            marginBottom: '16px'
          }}>
            {visibleLegendChannels.map(channel => (
              <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                <span>{channel.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Estimation - показываем только если выбран хотя бы один канал И введен бюджет */}
        {selectedChannels.length > 0 && totalBudget > 0 && (
          <div>
            <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
              Audience Estimation
            </Text>
            
            <div style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 16px',
              marginBottom: '8px'
            }}>
              <Text size="xl" fw={600} ta="center">
                {getAudienceEstimation().toLocaleString('en-US')}
              </Text>
            </div>
            
            {activeChannel === 'total' && selectedChannels.length > 0 && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                across {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
              </Text>
            )}
            
            {activeChannel !== 'total' && channelData[activeChannel]?.estimations?.audienceEstimation && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                {getChannelAudiencePercent(activeChannel).toFixed(1)}% of total audience
              </Text>
            )}
            
            {/* Progress Bar */}
            <div style={{ 
              display: 'flex', 
              height: '8px', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              {activeChannel === 'total' ? (
                getTotalAudienceProgressBars()
              ) : (
                <>
                  <div style={{ 
                    width: `${getChannelAudiencePercent(activeChannel)}%`, 
                    backgroundColor: CHANNEL_COLORS[activeChannel] 
                  }} />
                  <div style={{ 
                    width: `${100 - getChannelAudiencePercent(activeChannel)}%`, 
                    backgroundColor: '#E5E5E5' 
                  }} />
                </>
              )}
            </div>
            
            {/* Legend */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
              gap: '8px 4px',
              fontSize: '11px',
              color: '#666'
            }}>
              {visibleLegendChannels.map(channel => (
                <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                  <span>{channel.label}</span>
                </div>
              ))}
            </div>
            
            <Text size="sm" fw={500} mb="xs" mt="lg">Your Audience size is: {audienceSize}</Text>
            <Group gap="xs" mb="md">
              <div 
                onClick={() => setAudienceSize('Small')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Small' ? '#B46565' : '#EBE6EC',
                  color: audienceSize === 'Small' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Small</div>
              <div 
                onClick={() => setAudienceSize('Good')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Good' ? '#AFB465' : '#EBE6EC',
                  color: audienceSize === 'Good' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Good</div>
              <div 
                onClick={() => setAudienceSize('Strong')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Strong' ? '#65B48C' : '#EBE6EC',
                  color: audienceSize === 'Strong' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Strong</div>
            </Group>
          </div>
        )}

        {/* Market Estimation - показываем только если выбран хотя бы один канал И введен бюджет */}
        {selectedChannels.length > 0 && totalBudget > 0 && (
          <div>
            <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
              Market Estimation
            </Text>
            
            <div style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 16px',
              marginBottom: '8px'
            }}>
              <Text size="xl" fw={600} ta="center">
                {getMarketEstimation().toLocaleString('en-US')}
              </Text>
            </div>
            
            {activeChannel === 'total' && selectedChannels.length > 0 && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                across {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
              </Text>
            )}
            
            {activeChannel !== 'total' && channelData[activeChannel]?.estimations?.marketEstimation && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                {getChannelMarketPercent(activeChannel).toFixed(1)}% of total market
              </Text>
            )}
            
            {/* Progress Bar */}
            <div style={{ 
              display: 'flex',
              height: '8px', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              {activeChannel === 'total' ? (
                getTotalMarketProgressBars()
              ) : (
                <>
                  <div style={{ 
                    width: `${getChannelMarketPercent(activeChannel)}%`, 
                    backgroundColor: CHANNEL_COLORS[activeChannel] 
                  }} />
                  <div style={{ 
                    width: `${100 - getChannelMarketPercent(activeChannel)}%`, 
                    backgroundColor: '#E5E5E5' 
                  }} />
                </>
              )}
            </div>
            
            {/* Legend */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
              gap: '8px 4px',
              fontSize: '11px',
              color: '#666'
            }}>
              {visibleLegendChannels.map(channel => (
                <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                  <span>{channel.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <Card
          padding="lg"
          radius="md"
          styles={{
            root: {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'visible',
              minHeight: 'auto',
              height: 'auto',
              marginBottom: '100px'
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

export default OmnichannelRightSidebar;

