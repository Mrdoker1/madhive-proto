'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MultiSelect, Button, Group, Table, Checkbox, TextInput, Text, Collapse, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData, type BroadcasterWithStations, type BroadcasterStationBudget } from '@/store/slices/campaignSlice';
import { broadcastersData, getBroadcasterById } from '@/data/broadcastersData';
import { getAvailableBroadcasters, getStationsByMarketAndBroadcaster, type StationData } from '@/data/stationsData';

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
      return;
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];

    const broadcastersWithStations: LocalBroadcasterWithStations[] = [];

    linearData.broadcasters.forEach(broadcasterName => {
      const broadcaster = broadcastersData.find(b => b.name === broadcasterName);
      if (!broadcaster) return;

      const stations: StationWithData[] = [];

      selectedMarketIds.forEach(marketId => {
        const marketStations = getStationsByMarketAndBroadcaster(marketId, broadcaster.id);
        
        marketStations.forEach(station => {
          stations.push({
            ...station,
            selected: false,
            percentage: 0,
            budget: 0
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
  }, [linearData.broadcasters, marketsData.selectedMarkets, marketsData.marketsDetails]);

  // Сохранение broadcasterStations в Redux
  useEffect(() => {
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
        return {
          ...broadcaster,
          stations: broadcaster.stations.map(station => 
            station.id === stationId ? { ...station, selected: checked } : station
          )
        };
      }
      return broadcaster;
    }));
  };

  const handleSelectAllStations = (broadcasterId: string, checked: boolean) => {
    setBroadcasterStations(prev => prev.map(broadcaster => {
      if (broadcaster.id === broadcasterId) {
        return {
          ...broadcaster,
          stations: broadcaster.stations.map(station => ({ ...station, selected: checked }))
        };
      }
      return broadcaster;
    }));
  };

  const handleStationPercentageChange = (broadcasterId: string, stationId: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    
    setBroadcasterStations(prev => prev.map(broadcaster => {
      if (broadcaster.id === broadcasterId) {
        const selectedStations = broadcaster.stations.filter(s => s.selected);
        const totalMarketBudget = selectedStations.reduce((sum, s) => {
          const market = marketsData.marketsDetails?.find(m => m.id === s.marketId);
          return sum + (market?.budget || 0);
        }, 0);

        return {
          ...broadcaster,
          stations: broadcaster.stations.map(station => {
            if (station.id === stationId) {
              const market = marketsData.marketsDetails?.find(m => m.id === station.marketId);
              const marketBudget = market?.budget || 0;
              const stationBudget = (marketBudget * numericValue) / 100;
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

    // Рассчитываем общий процент станций в этом broadcaster для этого market
    const stationMarket = currentStation.marketId;
    const marketStations = broadcaster.stations.filter(s => s.marketId === stationMarket);
    
    const otherStationsTotal = marketStations.reduce((total, station) => {
      if (station.id === stationId || !station.selected) return total;
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
      {(!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) && (
        <Text size="sm" c="dimmed" mb="md">
          Please select markets first
        </Text>
      )}

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
        const totalStationBudget = broadcaster.stations.reduce((sum, station) => sum + station.budget, 0);
        const totalStationPercentage = broadcaster.stations.reduce((sum, station) => sum + station.percentage, 0);
        const allStationsSelected = broadcaster.stations.length > 0 && broadcaster.stations.every(station => station.selected);
        const someStationsSelected = broadcaster.stations.some(station => station.selected);
        const isExpanded = expandedBroadcasters.has(broadcaster.id);

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
                <Text fw={500} size="sm">{broadcaster.name} ({broadcaster.stations.length})</Text>
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
                  {broadcaster.stations.map((station) => (
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
