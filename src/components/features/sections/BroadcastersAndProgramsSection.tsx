'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MultiSelect, Button, Group, Table, Checkbox, TextInput, Text, Collapse, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData, type BroadcasterWithStations, type BroadcasterStationBudget } from '@/store/slices/campaignSlice';
import { broadcastersData, getBroadcasterById } from '@/data/broadcastersData';
import { getAvailableBroadcasters, getStationsByMarketAndBroadcaster, type StationData } from '@/data/stationsData';
import InfoNotification from '@/components/ui/InfoNotification';
import { AnimatePresence } from 'framer-motion';

interface StationWithData extends StationData {
  selected: boolean;
  percentage: number;
  budget: number;
}

interface LocalBroadcasterWithStations {
  id: string;
  name: string;
  stations: StationWithData[];
}

// Функция для форматирования процентов (максимум 2 знака после запятой)
const formatPercentage = (value: number): string => {
  return Number(value.toFixed(2)).toString();
};

const calculateStationImpressions = (budget: number, cpm: string): string => {
  const cpmValue = parseFloat(cpm.replace('$', ''));
  if (budget === 0 || cpmValue === 0) return '#';
  const impressions = (budget / cpmValue) * 1000;
  return impressions.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const BroadcastersAndProgramsSection = () => {
  const dispatch = useAppDispatch();
  const linearData = useAppSelector((state) => state.campaign.linear);
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  
  const [expandedBroadcasters, setExpandedBroadcasters] = useState<Set<string>>(new Set());
  const [broadcasterStations, setBroadcasterStations] = useState<LocalBroadcasterWithStations[]>([]);
  const [previousStationValues, setPreviousStationValues] = useState<Record<string, number>>({});
  const [stationErrorTooltips, setStationErrorTooltips] = useState<Record<string, boolean>>({});
  const stationInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const previousMarketBudgetsRef = useRef<string>('');
  const isInitialLoad = useRef<boolean>(true);

  // Получаем доступных broadcasters на основе выбранных markets
  const availableBroadcasters = useMemo(() => {
    if (!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
      return [];
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];

    if (selectedMarketIds.length === 0) return [];

    const broadcasterIds = getAvailableBroadcasters(selectedMarketIds);
    
    return broadcasterIds
      .map(id => getBroadcasterById(id))
      .filter(Boolean)
      .map(b => b!.name);
  }, [marketsData.selectedMarkets, marketsData.marketsDetails]);

  // Получаем stations на основе выбранных broadcasters и markets
  React.useEffect(() => {
    if (linearData.broadcasters.length === 0 || !marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
      setBroadcasterStations([]);
      isInitialLoad.current = true;
      return;
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];

    const broadcastersWithStations: LocalBroadcasterWithStations[] = [];
    
    // Получаем сохраненные данные из Redux только при начальной загрузке
    const savedBroadcastersWithStations = isInitialLoad.current 
      ? (linearData.broadcastersWithStations || [])
      : [];

    linearData.broadcasters.forEach(broadcasterName => {
      const broadcaster = broadcastersData.find(b => b.name === broadcasterName);
      if (!broadcaster) return;

      const stations: StationWithData[] = [];
      
      // Находим сохраненные данные для этого broadcaster
      const savedBroadcaster = savedBroadcastersWithStations.find(b => b.id === broadcaster.id);

      selectedMarketIds.forEach(marketId => {
        const marketStations = getStationsByMarketAndBroadcaster(marketId, broadcaster.id);
        
        marketStations.forEach(station => {
          // Ищем сохраненные данные для этой станции (только при начальной загрузке)
          const savedStation = isInitialLoad.current 
            ? savedBroadcaster?.stations.find(s => s.id === station.id)
            : undefined;
          
          stations.push({
            ...station,
            selected: savedStation?.selected || false,
            percentage: savedStation?.percentage || 0,
            budget: savedStation?.budget || 0
          });
        });
      });

      if (stations.length > 0) {
        broadcastersWithStations.push({
          id: broadcaster.id,
          name: broadcaster.name,
          stations
        });
      }
    });

    setBroadcasterStations(broadcastersWithStations);
    isInitialLoad.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linearData.broadcasters, marketsData.selectedMarkets, marketsData.marketsDetails]);

  // Сохранение broadcasterStations в Redux
  useEffect(() => {
    if (broadcasterStations.length === 0) {
      return;
    }
    
    const broadcastersWithStationsData: BroadcasterWithStations[] = broadcasterStations.map(broadcaster => ({
      id: broadcaster.id,
      name: broadcaster.name,
      stations: broadcaster.stations.map(station => ({
        id: station.id,
        name: station.name,
        selected: station.selected,
        percentage: station.percentage,
        budget: station.budget,
        marketId: station.marketId,
        broadcasterId: station.broadcasterId,
        cpm: station.cpm,
        marketShare: station.marketShare,
        audienceSize: station.audienceSize
      }))
    }));
    
    dispatch(updateLinearData({ broadcastersWithStations: broadcastersWithStationsData }));
  }, [broadcasterStations, dispatch]);

  // Автоматический пересчет бюджетов станций при изменении бюджетов markets
  useEffect(() => {
    // Создаем строку из всех бюджетов markets для сравнения
    const currentMarketBudgets = (marketsData.marketsDetails || [])
      .map(m => `${m.id}:${m.budget}`)
      .sort()
      .join('|');
    
    // Если бюджеты не изменились, не пересчитываем
    if (previousMarketBudgetsRef.current === currentMarketBudgets) {
      return;
    }
    
    previousMarketBudgetsRef.current = currentMarketBudgets;
    
    // Используем функциональное обновление чтобы получить актуальные значения
    setBroadcasterStations(prev => {
      if (prev.length === 0) return prev;
      
      let hasChanges = false;
      
      const updatedBroadcasters = prev.map(broadcaster => {
        const selectedStations = broadcaster.stations.filter(s => s.selected);
        
        if (selectedStations.length === 0) {
          return broadcaster;
        }
        
        // Считаем общий бюджет всех markets этого broadcaster
        const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
        const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
          const market = marketsData.marketsDetails?.find(m => m.id === marketId);
          return sum + (market?.budget || 0);
        }, 0);
        
        const updatedStations = broadcaster.stations.map(station => {
          if (!station.selected || station.percentage === 0) {
            return station;
          }
          
          // Пересчитываем бюджет станции на основе её процента и общего бюджета
          const stationBudget = (totalBudgetAllMarkets * station.percentage) / 100;
          
          // Проверяем, изменился ли бюджет
          if (Math.abs(station.budget - stationBudget) > 0.01) {
            hasChanges = true;
          }
          
          return {
            ...station,
            budget: stationBudget
          };
        });
        
        return {
          ...broadcaster,
          stations: updatedStations
        };
      });
      
      // Возвращаем обновленные данные только если есть изменения
      return hasChanges ? updatedBroadcasters : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketsData.marketsDetails]);

  const handleBroadcastersChange = (value: string[]) => {
    dispatch(updateLinearData({ broadcasters: value }));
  };

  const handleSelectAllBroadcasters = () => {
    dispatch(updateLinearData({ broadcasters: availableBroadcasters }));
  };

  const handleReset = () => {
    dispatch(updateLinearData({ broadcasters: [] }));
  };

  const handleToggleExpand = (broadcasterId: string) => {
    const newExpanded = new Set(expandedBroadcasters);
    if (newExpanded.has(broadcasterId)) {
      newExpanded.delete(broadcasterId);
    } else {
      newExpanded.add(broadcasterId);
    }
    setExpandedBroadcasters(newExpanded);
  };

  const handleStationSelect = (broadcasterId: string, stationId: string, checked: boolean) => {
    setBroadcasterStations(prev => prev.map(broadcaster => {
      if (broadcaster.id === broadcasterId) {
        // Обновляем выбор станции
        const updatedStations = broadcaster.stations.map(station => 
          station.id === stationId ? { ...station, selected: checked } : station
        );
        
        // Автоматически распределяем бюджет между выбранными станциями
        const selectedStations = updatedStations.filter(s => s.selected);
        
        if (selectedStations.length > 0) {
          // Считаем общий бюджет всех markets этого broadcaster
          const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
          const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
            const market = marketsData.marketsDetails?.find(m => m.id === marketId);
            return sum + (market?.budget || 0);
          }, 0);
          
          // Равномерно распределяем процент между всеми выбранными станциями
          const percentagePerStation = Math.round((100 / selectedStations.length) * 100) / 100;
          const budgetPerStation = (totalBudgetAllMarkets * percentagePerStation) / 100;
          
          // Обновляем все станции
          const finalStations = updatedStations.map(station => {
            if (!station.selected) {
              return { ...station, percentage: 0, budget: 0 };
            }
            
            return {
              ...station,
              percentage: percentagePerStation,
              budget: budgetPerStation
            };
          });
          
          return {
            ...broadcaster,
            stations: finalStations
          };
        } else {
          // Если ничего не выбрано, сбрасываем все к 0
          return {
            ...broadcaster,
            stations: updatedStations.map(s => ({ ...s, percentage: 0, budget: 0 }))
          };
        }
      }
      return broadcaster;
    }));
  };

  const handleSelectAllStations = (broadcasterId: string, checked: boolean) => {
    setBroadcasterStations(prev => prev.map(broadcaster => {
      if (broadcaster.id === broadcasterId) {
        // Получаем ID выбранных markets
        const selectedMarketIds = marketsData.marketsDetails
          ?.filter(m => m.selected)
          .map(m => m.id) || [];
        
        // Обновляем выбор ТОЛЬКО для станций из выбранных markets
        const updatedStations = broadcaster.stations.map(station => {
          // Если станция из выбранного market, обновляем её selected
          if (selectedMarketIds.includes(station.marketId)) {
            return { ...station, selected: checked };
          }
          // Иначе оставляем как есть
          return station;
        });
        
        if (checked) {
          // Фильтруем только выбранные станции из выбранных markets
          const selectedVisibleStations = updatedStations.filter(
            s => s.selected && selectedMarketIds.includes(s.marketId)
          );
          
          // Считаем общий бюджет всех markets этого broadcaster
          const uniqueMarketIds = new Set(selectedVisibleStations.map(s => s.marketId));
          const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
            const market = marketsData.marketsDetails?.find(m => m.id === marketId);
            return sum + (market?.budget || 0);
          }, 0);
          
          // Равномерно распределяем процент между выбранными видимыми станциями
          const percentagePerStation = selectedVisibleStations.length > 0
            ? Math.round((100 / selectedVisibleStations.length) * 100) / 100
            : 0;
          const budgetPerStation = (totalBudgetAllMarkets * percentagePerStation) / 100;
          
          // Обновляем все станции
          const finalStations = updatedStations.map(station => {
            // Если станция выбрана и из выбранного market
            if (station.selected && selectedMarketIds.includes(station.marketId)) {
              return {
                ...station,
                percentage: percentagePerStation,
                budget: budgetPerStation
              };
            }
            return station;
          });
          
          return {
            ...broadcaster,
            stations: finalStations
          };
        } else {
          // Если снимаем выбор, сбрасываем бюджеты ТОЛЬКО для станций из выбранных markets
          const finalStations = updatedStations.map(s => {
            if (selectedMarketIds.includes(s.marketId) && !s.selected) {
              return { ...s, percentage: 0, budget: 0 };
            }
            return s;
          });
          
          return {
            ...broadcaster,
            stations: finalStations
          };
        }
      }
      return broadcaster;
    }));
  };

  const handleStationPercentageChange = (broadcasterId: string, stationId: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    
    setBroadcasterStations(prev => prev.map(broadcaster => {
      if (broadcaster.id === broadcasterId) {
        const selectedStations = broadcaster.stations.filter(s => s.selected);
        
        // Считаем общий бюджет всех markets этого broadcaster
        const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
        const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
          const market = marketsData.marketsDetails?.find(m => m.id === marketId);
          return sum + (market?.budget || 0);
        }, 0);

        return {
          ...broadcaster,
          stations: broadcaster.stations.map(station => {
            if (station.id === stationId) {
              // Бюджет станции = процент от общего бюджета всех markets
              const stationBudget = (totalBudgetAllMarkets * numericValue) / 100;
              return { ...station, percentage: numericValue, budget: stationBudget };
            }
            return station;
          })
        };
      }
      return broadcaster;
    }));
  };

  const handleStationPercentageFocus = (stationId: string, currentValue: number) => {
    setPreviousStationValues(prev => ({
      ...prev,
      [stationId]: currentValue
    }));
  };

  const handleStationPercentageBlur = (broadcasterId: string, stationId: string, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;
    const broadcaster = broadcasterStations.find(b => b.id === broadcasterId);
    const currentStation = broadcaster?.stations.find(s => s.id === stationId);
    
    if (!currentStation || !broadcaster) return;

    // Рассчитываем общий процент ВСЕХ выбранных станций broadcaster
    const selectedStations = broadcaster.stations.filter(s => s.selected);
    
    const otherStationsTotal = selectedStations.reduce((total, station) => {
      if (station.id === stationId) return total;
      return total + station.percentage;
    }, 0);
    
    const wouldBeTotal = otherStationsTotal + numericValue;
    
    if (wouldBeTotal > 100) {
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: true
      }));
      
      const previousValue = previousStationValues[stationId] || currentStation.percentage;
      handleStationPercentageChange(broadcasterId, stationId, previousValue.toString());
      
      setTimeout(() => {
        setStationErrorTooltips(prev => ({
          ...prev,
          [stationId]: false
        }));
      }, 3000);
    } else {
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: false
      }));
    }
  };

  return (
    <div>
      {/* Уведомление о необходимости выбрать markets */}
      <AnimatePresence>
        {(!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) && (
          <InfoNotification 
            key="broadcaster-auto-selection-notification"
            message="Broadcaster selection and associated Stations per DMA will automatically be defined once markets are selected"
          />
        )}
      </AnimatePresence>

      {/* Multiselect для выбора broadcasters */}
      <MultiSelect
        label="Broadcasters"
        placeholder="Select Broadcasters"
        data={availableBroadcasters}
        value={linearData.broadcasters}
        onChange={handleBroadcastersChange}
        clearable
        searchable
        mb="lg"
        disabled={availableBroadcasters.length === 0}
      />

      {/* Кнопки управления */}
      <Group justify="flex-end" gap="4px" mb="lg">
        <Button 
          variant="outline" 
          onClick={handleSelectAllBroadcasters}
          disabled={availableBroadcasters.length === 0}
        >
          Select All
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>

      {/* Детальные таблицы для каждого broadcaster */}
      {broadcasterStations.map((broadcaster) => {
        // Фильтруем только станции из выбранных markets
        const selectedMarketIds = marketsData.marketsDetails
          ?.filter(m => m.selected)
          .map(m => m.id) || [];
        
        const visibleStations = broadcaster.stations.filter(station => 
          selectedMarketIds.includes(station.marketId)
        );
        
        const totalStationBudget = visibleStations.reduce((sum, station) => sum + station.budget, 0);
        const totalStationPercentage = visibleStations.reduce((sum, station) => sum + station.percentage, 0);
        const allStationsSelected = visibleStations.length > 0 && visibleStations.every(station => station.selected);
        const someStationsSelected = visibleStations.some(station => station.selected);
        const isExpanded = expandedBroadcasters.has(broadcaster.id);

        // Не показываем broadcaster если нет видимых станций
        if (visibleStations.length === 0) {
          return null;
        }

        return (
          <div key={broadcaster.id} style={{ marginTop: '24px' }}>
            {/* Header с информацией о broadcaster и кнопкой коллапса */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px 16px',
                marginBottom: '8px',
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}
              onClick={() => handleToggleExpand(broadcaster.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#291036', display: 'flex', alignItems: 'center' }}>
                  {isExpanded ? 
                    <IconChevronDown size={16} /> : 
                    <IconChevronRight size={16} />
                  }
                </div>
                <Text fw={500} size="sm">{broadcaster.name} ({visibleStations.length})</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Text size="xs" c="dimmed">
                  Total Budget: ${totalStationBudget.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </Text>
                <Text size="xs" c="dimmed">
                  Total %: {totalStationPercentage.toFixed(1)}%
                </Text>
              </div>
            </div>

            {/* Детальная таблица */}
            <Collapse in={isExpanded}>
              <Table>
                <Table.Tbody>
                  {/* Header row для детальной таблицы */}
                  <Table.Tr style={{ height: '48px' }}>
                    <Table.Th style={{ width: '40px', textAlign: 'center' }}>
                      <Checkbox
                        checked={allStationsSelected}
                        indeterminate={someStationsSelected && !allStationsSelected}
                        onChange={(event) => handleSelectAllStations(broadcaster.id, event.currentTarget.checked)}
                      />
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={500}>TV Stations</Text>
                    </Table.Th>
                    <Table.Th style={{ width: '120px' }}>
                      <Text size="xs" fw={500}>% of Budget</Text>
                    </Table.Th>
                    <Table.Th style={{ width: '120px' }}>
                      <Text size="xs" fw={500}>Budget</Text>
                    </Table.Th>
                    <Table.Th style={{ width: '100px' }}>
                      <Text size="xs" fw={500}>Impression</Text>
                    </Table.Th>
                    <Table.Th style={{ width: '80px' }}>
                      <Text size="xs" fw={500}>CPM</Text>
                    </Table.Th>
                  </Table.Tr>
                  
                  {/* Station rows */}
                  {visibleStations.map((station) => (
                    <Table.Tr key={station.id} style={{ height: '48px' }}>
                      <Table.Td>
                        <Checkbox
                          checked={station.selected}
                          onChange={(event) => handleStationSelect(broadcaster.id, station.id, event.currentTarget.checked)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">{station.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Tooltip
                          label="You have exceeded the maximum budget value"
                          opened={stationErrorTooltips[station.id] || false}
                          color="red"
                          position="top"
                          withArrow
                        >
                          <TextInput
                            ref={(el) => { stationInputRefs.current[station.id] = el; }}
                            value={station.percentage > 0 ? formatPercentage(station.percentage) : ''}
                            onChange={(event) => handleStationPercentageChange(broadcaster.id, station.id, event.target.value)}
                            onFocus={() => handleStationPercentageFocus(station.id, station.percentage)}
                            onBlur={(event) => handleStationPercentageBlur(broadcaster.id, station.id, event.target.value)}
                            placeholder="0"
                            size="xs"
                            disabled={!station.selected}
                            styles={{
                              input: {
                                textAlign: 'center',
                                padding: '4px 20px 4px 0',
                                height: '28px',
                                fontSize: '12px',
                                borderColor: stationErrorTooltips[station.id] ? '#fa5252' : undefined
                              },
                              section: {
                                width: '32px'
                              }
                            }}
                            rightSection={<Text size="xs" c="dimmed">%</Text>}
                          />
                        </Tooltip>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">
                          {station.budget > 0 
                            ? `$${station.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                            : '$0'
                          }
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">{calculateStationImpressions(station.budget, station.cpm)}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">{station.cpm}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Collapse>
          </div>
        );
      })}

      {/* Сообщение когда broadcasters выбраны но нет stations */}
      {linearData.broadcasters.length > 0 && broadcasterStations.length === 0 && (
        <Text size="sm" c="dimmed" mt="md">
          No stations available for selected broadcasters and markets
        </Text>
      )}
    </div>
  );
};

export default BroadcastersAndProgramsSection;
