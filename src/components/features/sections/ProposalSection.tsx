'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, Accordion, Table, Checkbox, Group, Text, Badge, TextInput, Select, Button, Tooltip, Menu } from '@mantine/core';
import { IconSearch, IconPlus, IconAlertCircle } from '@tabler/icons-react';
import { getProgramsByStation, Program } from '@/data/programsData';
import { useAppSelector } from '@/hooks/useRedux';
import { getAvailableMarkets, getStationsByMarket } from '@/data/stationsData';
import { getMarketById } from '@/data/marketsData';
import { getBroadcasterByName } from '@/data/broadcastersData';
import { StationBudget } from '@/store/slices/campaignSlice';

interface ProgramSelection {
  [stationId: string]: {
    [programId: string]: boolean;
  };
}

const ProposalSection = () => {
  // Получаем детальную информацию о markets и stations из Redux
  const marketsDetails = useAppSelector((state) => state.campaign.markets.marketsDetails || []);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const selectedBroadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  
  // Конвертируем имена broadcasters в ID
  const broadcasterIds = useMemo(() => {
    return selectedBroadcasters
      .map(name => getBroadcasterByName(name)?.id)
      .filter(Boolean) as string[];
  }, [selectedBroadcasters]);
  
  // Получаем ВСЕ доступные markets от выбранных broadcasters
  const allAvailableMarkets = useMemo(() => {
    const marketIds = getAvailableMarkets(broadcasterIds);
    return marketIds.map(marketId => {
      const marketInfo = getMarketById(marketId);
      const stations = getStationsByMarket(marketId)
        .filter(station => broadcasterIds.includes(station.broadcasterId))
        .map(station => ({
          id: station.id,
          name: station.name,
          selected: false,
          percentage: 0,
          budget: 0,
          marketId: station.marketId,
          broadcasterId: station.broadcasterId,
          cpm: '$20.00',
          marketShare: 0,
          audienceSize: 0
        }));
      
      return {
        id: marketId,
        name: marketInfo?.name || marketId,
        displayName: marketInfo?.displayName || marketId,
        selected: false,
        percentage: 0,
        budget: 0,
        rank: marketInfo?.rank || 0,
        marketSize: marketInfo?.marketSize || 0,
        stations
      };
    });
  }, [broadcasterIds]);
  
  // Объединяем: берем все доступные markets и накладываем данные из marketsDetails (budgets, selections)
  const combinedMarkets = useMemo(() => {
    const marketMap = new Map();
    
    // Сначала добавляем все доступные markets от broadcasters
    allAvailableMarkets.forEach(market => {
      marketMap.set(market.id, market);
    });
    
    // Затем перезаписываем данными из выбранных на предыдущем шаге (у них корректные budgets и selections)
    marketsDetails.forEach(market => {
      const existing = marketMap.get(market.id);
      if (existing) {
        marketMap.set(market.id, {
          ...existing,
          ...market,
          rank: existing.rank,
          marketSize: existing.marketSize,
          stations: market.stations.map((station: StationBudget) => ({
            ...station,
            marketId: market.id,
            cpm: '$20.00',
            marketShare: 0,
            audienceSize: 0
          }))
        });
      }
    });
    
    return Array.from(marketMap.values());
  }, [allAvailableMarkets, marketsDetails]);
  
  // Создаем стабильный список ID markets из marketsDetails
  const marketIds = useMemo(() => {
    return marketsDetails.map(m => m.id).join(',');
  }, [marketsDetails]);
  
  // Локальное состояние для видимости markets
  // Показываем только те markets которые были выбраны на предыдущем шаге
  const [visibleMarkets, setVisibleMarkets] = useState<Set<string>>(() => {
    return new Set(marketsDetails.map(m => m.id));
  });
  
  // Обновляем visibleMarkets когда меняется список ID markets
  useEffect(() => {
    if (marketIds) {
      setVisibleMarkets(new Set(marketIds.split(',').filter(Boolean)));
    }
  }, [marketIds]);
  
  // Фильтруем только видимые markets
  const selectedMarketsWithStations = useMemo(() => {
    return combinedMarkets.filter(m => visibleMarkets.has(m.id));
  }, [combinedMarkets, visibleMarkets]);
  
  const [activeMarketTab, setActiveMarketTab] = useState<string | null>(() => {
    if (marketsDetails.length > 0) {
      return marketsDetails[0].id;
    }
    return null;
  });
  
  // Получаем первый market ID для инициализации активного таба
  const firstMarketId = useMemo(() => {
    return marketsDetails.length > 0 ? marketsDetails[0].id : null;
  }, [marketIds]); // Используем стабильную зависимость marketIds
  
  // Обновляем активный таб при изменении списка markets
  useEffect(() => {
    if (firstMarketId && !activeMarketTab) {
      setActiveMarketTab(firstMarketId);
    }
  }, [firstMarketId, activeMarketTab]);
  
  const [programSelections, setProgramSelections] = useState<ProgramSelection>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState<string>('outlet');
  const [flightFilter, setFlightFilter] = useState<string>('all');
  
  // Функция для toggle видимости market
  const toggleMarketVisibility = (marketId: string) => {
    setVisibleMarkets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
        // Если удаляем активный таб, переключаемся на первый доступный
        if (activeMarketTab === marketId) {
          const remainingMarkets = combinedMarkets.filter(m => newSet.has(m.id));
          setActiveMarketTab(remainingMarkets.length > 0 ? remainingMarkets[0].id : null);
        }
      } else {
        newSet.add(marketId);
      }
      return newSet;
    });
  };

  // Получаем все программы для всех станций
  const stationPrograms = useMemo(() => {
    const programs: Record<string, Program[]> = {};
    selectedMarketsWithStations.forEach(market => {
      market.stations.forEach((station: StationBudget) => {
        programs[station.id] = getProgramsByStation(station.id);
      });
    });
    return programs;
  }, [selectedMarketsWithStations]);

  // Функция для получения выбранных программ станции
  const getSelectedPrograms = (stationId: string): Program[] => {
    const programs = stationPrograms[stationId] || [];
    const selections = programSelections[stationId] || {};
    return programs.filter(p => selections[p.id]);
  };

  // Подсчет totals для станции
  const calculateStationTotals = (stationId: string) => {
    const selectedPrograms = getSelectedPrograms(stationId);
    const totalImpressions = selectedPrograms.reduce((sum, p) => sum + p.impressions, 0);
    const totalRate = selectedPrograms.reduce((sum, p) => sum + p.rate, 0);
    const avgCPM = totalImpressions > 0 ? (totalRate / totalImpressions) * 1000 : 0;
    
    return { totalImpressions, totalRate, avgCPM };
  };

  // Проверка превышения бюджета для станции
  const checkBudgetExceeded = (stationId: string, allocatedBudget: number) => {
    const { totalRate } = calculateStationTotals(stationId);
    return totalRate > allocatedBudget;
  };

  // Общий подсчет по всем станциям
  const calculateGrandTotals = useMemo(() => {
    let totalImpressions = 0;
    let totalRate = 0;
    
    Object.keys(stationPrograms).forEach(stationId => {
      const { totalImpressions: stationImpressions, totalRate: stationRate } = calculateStationTotals(stationId);
      totalImpressions += stationImpressions;
      totalRate += stationRate;
    });
    
    const avgCPM = totalImpressions > 0 ? (totalRate / totalImpressions) * 1000 : 0;
    
    return { totalImpressions, totalRate, avgCPM };
  }, [programSelections, stationPrograms]);

  // Toggle программы
  const toggleProgram = (stationId: string, programId: string) => {
    setProgramSelections(prev => ({
      ...prev,
      [stationId]: {
        ...(prev[stationId] || {}),
        [programId]: !(prev[stationId]?.[programId] || false)
      }
    }));
  };

  // Toggle всех программ станции
  const toggleAllStationPrograms = (stationId: string, checked: boolean) => {
    const programs = stationPrograms[stationId] || [];
    const newSelections: Record<string, boolean> = {};
    programs.forEach(p => {
      newSelections[p.id] = checked;
    });
    
    setProgramSelections(prev => ({
      ...prev,
      [stationId]: newSelections
    }));
  };

  // Форматирование чисел
  const formatNumber = (num: number) => num.toLocaleString('en-US');
  const formatCurrency = (num: number) => `$${num.toLocaleString('en-US')}`;
  const formatCPM = (num: number) => `$${num.toFixed(2)}`;

  // Рендер таблицы программ для станции
  const renderProgramsTable = (stationId: string, allocatedBudget: number) => {
    const programs = stationPrograms[stationId] || [];
    const selections = programSelections[stationId] || {};
    const allSelected = programs.length > 0 && programs.every(p => selections[p.id]);
    const someSelected = programs.some(p => selections[p.id]);
    const totals = calculateStationTotals(stationId);
    const budgetExceeded = checkBudgetExceeded(stationId, allocatedBudget);

    // Фильтрация по поиску
    const filteredPrograms = programs.filter(program =>
      program.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <Table
          styles={{
            tr: {
              height: '48px'
            }
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: '40px' }}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={(e) => toggleAllStationPrograms(stationId, e.currentTarget.checked)}
                  color="var(--primary-color)"
                />
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Program Name</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Air Time</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Air Start Date</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Air End Date</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Days of Week</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Daypart</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Rate</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>Impressions</Text>
              </Table.Th>
              <Table.Th>
                <Text size="xs" fw={500}>CPM</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredPrograms.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={10} style={{ textAlign: 'center', padding: '20px' }}>
                  <Text c="dimmed" size="xs">
                    {searchQuery ? 'No programs found' : 'No programs available'}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              filteredPrograms.map((program) => (
                <Table.Tr key={program.id}>
                  <Table.Td>
                    <Checkbox
                      checked={selections[program.id] || false}
                      onChange={() => toggleProgram(stationId, program.id)}
                      color="var(--primary-color)"
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{program.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{program.airTime}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{program.airStartDate}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{program.airEndDate}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      {program.daysOfWeek.map(day => (
                        <Badge key={day} size="xs" variant="light" color="var(--primary-color)">{day}</Badge>
                      ))}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{program.daypart}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{formatCurrency(program.rate)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{formatNumber(program.impressions)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{formatCPM(program.cpm)}</Text>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
        {budgetExceeded && (
          <Group gap={6} mt="xs">
            <IconAlertCircle size={16} color="red" />
            <Text c="red" size="xs">
              Selected programs exceed the allocated budget.
            </Text>
          </Group>
        )}
      </div>
    );
  };

  // Рендер аккордеонов для станций
  const renderStationsAccordions = (marketId: string) => {
    const market = selectedMarketsWithStations.find(m => m.id === marketId);
    if (!market) return null;

    const availableStations = market.stations;

    if (availableStations.length === 0) {
      return (
        <Text c="dimmed" size="sm" p="md">
          No stations available for this market
        </Text>
      );
    }

    return (
      <Accordion>
        {availableStations.map((station: StationBudget) => {
          const programs = stationPrograms[station.id] || [];
          const totals = calculateStationTotals(station.id);
          const budgetExceeded = checkBudgetExceeded(station.id, station.budget);
          
          return (
            <Accordion.Item key={station.id} value={station.id}>
              <Accordion.Control>
                <Group justify="space-between" pr="md" style={{ width: '100%' }}>
                  <Text fw={500}>{station.name} ({programs.length})</Text>
                  <Group gap="xs" align="center">
                    <Badge variant="light" color="var(--primary-color)" size="sm">
                      Impressions: {formatNumber(totals.totalImpressions)}
                    </Badge>
                    <Badge variant="light" color="var(--primary-color)" size="sm">
                      CPM: {formatCPM(totals.avgCPM)}
                    </Badge>
                    <Badge variant="light" color="var(--primary-color)" size="sm">
                      <Group gap={4} align="center">
                        <span>Total: {formatCurrency(totals.totalRate)}</span>
                        {budgetExceeded && (
                          <Tooltip label="Selected programs exceed the allocated budget" position="top">
                            <IconAlertCircle size={14} color="red" />
                          </Tooltip>
                        )}
                      </Group>
                    </Badge>
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {renderProgramsTable(station.id, station.budget)}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  };

  if (marketsDetails.length === 0) {
    return (
      <Text c="dimmed" size="sm">
        No markets selected. Please select markets in the Channel Details step.
      </Text>
    );
  }

  return (
    <div>
      {/* Фильтры и контролы */}
      <Group justify="space-between" mb="lg">
        <Group gap="md">
          <Select
            value={groupBy}
            onChange={(value) => setGroupBy(value || 'outlet')}
            data={[
              { value: 'outlet', label: 'Group by Outlet' },
              { value: 'daypart', label: 'Group by Daypart' },
              { value: 'date', label: 'Group by Date' }
            ]}
            w={180}
            size="sm"
          />
          <Select
            value={flightFilter}
            onChange={(value) => setFlightFilter(value || 'all')}
            data={[
              { value: 'all', label: 'Flight' },
              { value: 'q1', label: 'Q1 2025' },
              { value: 'q2', label: 'Q2 2025' }
            ]}
            w={150}
            size="sm"
          />
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            w={200}
            size="sm"
            styles={{
              input: {
                paddingLeft: '36px'
              }
            }}
          />
          <Menu shadow="md" width={300} closeOnItemClick={false}>
            <Menu.Target>
              <Button
                leftSection={<IconPlus size={16} />}
                variant="outline"
                size="sm"
              >
                Add item
              </Button>
            </Menu.Target>

            <Menu.Dropdown style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Menu.Label>Select Markets to Display</Menu.Label>
              {allAvailableMarkets.length === 0 ? (
                <Menu.Item disabled>No markets available</Menu.Item>
              ) : (
                allAvailableMarkets.map((market) => (
                  <Menu.Item
                    key={market.id}
                    onClick={() => toggleMarketVisibility(market.id)}
                    leftSection={
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={visibleMarkets.has(market.id)}
                          onChange={() => toggleMarketVisibility(market.id)}
                          color="var(--primary-color)"
                          style={{ cursor: 'pointer' }}
                          styles={{
                            input: { cursor: 'pointer' },
                            label: { cursor: 'pointer' }
                          }}
                        />
                      </div>
                    }
                  >
                    <Text size="sm">{market.displayName}</Text>
                  </Menu.Item>
                ))
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group gap="md" align="center">
          <div>
            <Text size="xs" c="dimmed" mb={4}>Budget</Text>
            <Text size="sm" fw={500}>
              {formatCurrency(calculateGrandTotals.totalRate)} / {formatCurrency(totalBudget)}
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" mb={4}>Target CPM</Text>
            <Text size="sm" fw={500}>
              {formatCPM(calculateGrandTotals.avgCPM)}
            </Text>
          </div>
        </Group>
      </Group>

      {/* Табы для Markets */}
      <Tabs value={activeMarketTab} onChange={setActiveMarketTab} color="var(--primary-color)">
        <Tabs.List>
          {selectedMarketsWithStations.map((market) => (
            <Tabs.Tab key={market.id} value={market.id}>
              {market.name} ({market.stations.length})
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {selectedMarketsWithStations.map((market) => (
          <Tabs.Panel key={market.id} value={market.id} pt="md">
            {renderStationsAccordions(market.id)}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProposalSection;
