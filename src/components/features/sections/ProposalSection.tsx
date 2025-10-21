'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
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

// Dayparts definition with colors
// Colors follow the natural progression of the day to avoid confusion
const daypartDefinitions = [
  { name: 'Late Fringe', color: '#5C6BC0', hours: [0, 1] },        // Indigo - late night
  { name: 'Overnight', color: '#3F51B5', hours: [2, 3, 4, 5] },    // Deep blue - night
  { name: 'Early Morning', color: '#FFB74D', hours: [6, 7, 8, 9] }, // Warm orange - sunrise
  { name: 'Daytime', color: '#4FC3F7', hours: [10, 11, 12, 13, 14, 15] }, // Sky blue - daytime
  { name: 'Early Fringe', color: '#FFD54F', hours: [16, 17, 18] }, // Golden yellow - afternoon
  { name: 'Prime Access', color: '#9575CD', hours: [19] },         // Purple - prime start
  { name: 'Prime Time', color: '#7E57C2', hours: [20, 21, 22] },   // Deeper purple - prime
  { name: 'Late News', color: '#5C6BC0', hours: [23] }             // Indigo - late night
];

const ProposalSection = () => {
  // Получаем детальную информацию о markets и stations из Redux
  const marketsDetails = useAppSelector((state) => state.campaign.markets.marketsDetails || []);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const selectedBroadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations || []);
  const flightData = useAppSelector((state) => state.campaign.flight);
  const daypartsData = useAppSelector((state) => state.campaign.dayparts);
  
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
  
  // Объединяем: берем все доступные markets и накладываем данные из marketsDetails (budgets) и broadcastersWithStations (stations)
  const combinedMarkets = useMemo(() => {
    const marketMap = new Map();
    
    // Сначала добавляем все доступные markets от broadcasters
    allAvailableMarkets.forEach(market => {
      marketMap.set(market.id, market);
    });
    
    // Затем перезаписываем данными из выбранных на предыдущем шаге (у них корректные budgets)
    marketsDetails.forEach(market => {
      const existing = marketMap.get(market.id);
      if (existing) {
        // Получаем stations для этого market из broadcastersWithStations
        const marketStations: StationBudget[] = [];
        
        broadcastersWithStations.forEach(broadcaster => {
          const broadcasterStations = broadcaster.stations.filter(s => 
            s.marketId === market.id && s.selected
          );
          broadcasterStations.forEach(station => {
            marketStations.push({
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
            });
          });
        });
        
        marketMap.set(market.id, {
          ...existing,
          selected: market.selected,
          percentage: market.percentage,
          budget: market.budget,
          stations: marketStations
        });
      }
    });
    
    return Array.from(marketMap.values());
  }, [allAvailableMarkets, marketsDetails, broadcastersWithStations]);
  
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
  const [selectedDaypartFilter, setSelectedDaypartFilter] = useState<string | null>(null);
  
  // Извлекаем выбранные дни недели из dayparts
  const selectedDaysOfWeek = useMemo(() => {
    const selectedSlots = daypartsData.selectedSlots;
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
      return null; // Нет выбранных слотов - используем дефолтные дни
    }
    
    // Получаем уникальные дни, у которых есть хотя бы один выбранный слот
    const days = Object.keys(selectedSlots).filter(day => {
      const daySlots = selectedSlots[day];
      return Object.values(daySlots).some(selected => selected);
    });
    
    return days.length > 0 ? days : null;
  }, [daypartsData.selectedSlots]);
  
  // Извлекаем выбранные часы и определяем активные dayparts
  const activeDaypartsInfo = useMemo(() => {
    const selectedSlots = daypartsData.selectedSlots;
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
      return null; // Нет выбранных слотов - используем дефолтные dayparts
    }
    
    // Собираем все выбранные часы (уникальные)
    const selectedHours = new Set<number>();
    Object.values(selectedSlots).forEach(daySlots => {
      Object.entries(daySlots).forEach(([hour, selected]) => {
        if (selected) {
          selectedHours.add(parseInt(hour));
        }
      });
    });
    
    if (selectedHours.size === 0) {
      return null;
    }
    
    // Определяем какие dayparts активны и собираем их часы
    const activeDayparts = daypartDefinitions
      .map(daypart => {
        // Фильтруем только те часы из daypart, которые выбраны
        const activeHours = daypart.hours.filter(hour => selectedHours.has(hour));
        if (activeHours.length > 0) {
          return {
            name: daypart.name,
            hours: activeHours
          };
        }
        return null;
      })
      .filter(Boolean) as Array<{ name: string; hours: number[] }>;
    
    return activeDayparts.length > 0 ? activeDayparts : null;
  }, [daypartsData.selectedSlots]);
  
  // Функция для генерации случайной даты в диапазоне
  const getRandomDateInRange = useCallback((startDate: string, endDate: string): string => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0];
  }, []);
  
  // Функция для форматирования часа в AM/PM формат
  const formatHourToTime = useCallback((hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  }, []);
  
  // Функция для получения случайного элемента из массива
  const getRandomItem = useCallback(<T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  }, []);
  
  // Функция для обновления дат и дней программы на основе Flight Range и Dayparts
  const updateProgramDates = useCallback((program: Program): Program => {
    let updatedProgram = { ...program };
    
    // Обновляем даты, если Flight Range выбран
    if (flightData.startDate && flightData.endDate) {
      const startDate = flightData.startDate;
      const endDate = flightData.endDate;
      
      // Генерируем случайные даты в пределах диапазона
      const programStartDate = getRandomDateInRange(startDate, endDate);
      const programEndDate = getRandomDateInRange(programStartDate, endDate);
      
      updatedProgram = {
        ...updatedProgram,
        airStartDate: programStartDate,
        airEndDate: programEndDate
      };
    }
    
    // Обновляем дни недели, если Dayparts выбраны
    if (selectedDaysOfWeek) {
      updatedProgram = {
        ...updatedProgram,
        daysOfWeek: selectedDaysOfWeek
      };
    }
    
    // Обновляем daypart и airTime, если Dayparts выбраны
    if (activeDaypartsInfo) {
      // Выбираем случайный активный daypart
      const randomDaypart = getRandomItem(activeDaypartsInfo);
      
      // Выбираем случайный час из этого daypart
      const randomHour = getRandomItem(randomDaypart.hours);
      
      updatedProgram = {
        ...updatedProgram,
        daypart: randomDaypart.name,
        airTime: formatHourToTime(randomHour)
      };
    }
    
    return updatedProgram;
  }, [
    flightData.startDate, 
    flightData.endDate, 
    getRandomDateInRange, 
    selectedDaysOfWeek,
    activeDaypartsInfo,
    getRandomItem,
    formatHourToTime
  ]);
  
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

  // Получаем все программы для всех станций с обновленными датами
  const stationPrograms = useMemo(() => {
    const programs: Record<string, Program[]> = {};
    selectedMarketsWithStations.forEach(market => {
      market.stations.forEach((station: StationBudget) => {
        const originalPrograms = getProgramsByStation(station.id);
        // Применяем обновление дат к каждой программе
        programs[station.id] = originalPrograms.map(program => updateProgramDates(program));
      });
    });
    return programs;
  }, [selectedMarketsWithStations, updateProgramDates]);

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

  // Функция для получения первой буквы дня недели
  const getDayLetter = (day: string): string => {
    const dayMap: Record<string, string> = {
      'Mon': 'M',
      'Tue': 'T',
      'Wed': 'W',
      'Thu': 'T',
      'Fri': 'F',
      'Sat': 'S',
      'Sun': 'S'
    };
    return dayMap[day] || day.charAt(0);
  };

  // Рендер таблицы программ для станции
  const renderProgramsTable = (stationId: string, allocatedBudget: number) => {
    const programs = stationPrograms[stationId] || [];
    const selections = programSelections[stationId] || {};
    const allSelected = programs.length > 0 && programs.every(p => selections[p.id]);
    const someSelected = programs.some(p => selections[p.id]);
    const totals = calculateStationTotals(stationId);
    const budgetExceeded = checkBudgetExceeded(stationId, allocatedBudget);

    // Фильтрация по поиску и daypart
    const filteredPrograms = programs.filter(program => {
      const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDaypart = !selectedDaypartFilter || program.daypart === selectedDaypartFilter;
      return matchesSearch && matchesDaypart;
    });

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
                <Text size="xs" fw={500}>Daypart</Text>
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
                    {searchQuery || selectedDaypartFilter ? 'No programs found' : 'No programs available'}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              filteredPrograms.map((program) => {
                const daypartInfo = daypartDefinitions.find(dp => dp.name === program.daypart);
                
                return (
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
                      <Group gap={6} wrap="nowrap">
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: daypartInfo?.color || '#999',
                            borderRadius: '2px',
                            flexShrink: 0
                          }}
                        />
                        <Text size="xs">{program.daypart}</Text>
                      </Group>
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
                        {program.daysOfWeek.map((day, index) => (
                          <div
                            key={`${day}-${index}`}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: '#291036',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: 600,
                              flexShrink: 0
                            }}
                          >
                            {getDayLetter(day)}
                          </div>
                        ))}
                      </Group>
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
                );
              })
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
                  <Text fw={500} size="sm">{station.name} ({programs.length})</Text>
                  <Group gap={20} align="center">
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      gap: '4px'
                    }}>
                      <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
                        Impressions
                      </Text>
                      <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
                        {formatNumber(totals.totalImpressions)}
                      </Text>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      gap: '4px'
                    }}>
                      <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
                        CPM
                      </Text>
                      <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
                        {formatCPM(totals.avgCPM)}
                      </Text>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      gap: '4px'
                    }}>
                      <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
                        Total
                      </Text>
                      <Group gap={4} align="center" style={{ lineHeight: 1 }}>
                        <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
                          {formatCurrency(totals.totalRate)}
                        </Text>
                        {budgetExceeded && (
                          <Tooltip 
                            label={`Selected programs exceed the allocated budget: ${formatCurrency(totals.totalRate)} / ${formatCurrency(station.budget)}`} 
                            position="top"
                          >
                            <IconAlertCircle size={14} color="red" />
                          </Tooltip>
                        )}
                      </Group>
                    </div>
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

  // Проверяем наличие broadcasters
  const hasBroadcasters = selectedBroadcasters.length > 0;
  
  if (!hasBroadcasters) {
    return (
      <Text c="dimmed" size="sm">
        No broadcasters selected. Please select broadcasters in the Linear Details section on the Channel Details step.
      </Text>
    );
  }

  return (
    <div>
      {/* Фильтры и контролы */}
      <Group justify="space-between" mb="lg">
        <Group gap="md">
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
          <Select
            placeholder="All Dayparts"
            value={selectedDaypartFilter}
            onChange={(value) => setSelectedDaypartFilter(value)}
            data={daypartDefinitions.map(dp => ({
              value: dp.name,
              label: dp.name
            }))}
            w={200}
            size="sm"
            clearable
            styles={{
              input: {
                fontSize: '12px'
              }
            }}
          />
{/* Add market button is hidden */}
        </Group>

        <Group gap={20} align="center">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
              Impressions
            </Text>
            <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
              {formatNumber(calculateGrandTotals.totalImpressions)}
            </Text>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
              Budget
            </Text>
            <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
              {formatCurrency(calculateGrandTotals.totalRate)} / {formatCurrency(totalBudget)}
            </Text>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            <Text size="10px" c="dimmed" style={{ lineHeight: 1 }}>
              Target CPM
            </Text>
            <Text size="sm" fw={600} style={{ lineHeight: 1 }}>
              {formatCPM(calculateGrandTotals.avgCPM)}
            </Text>
          </div>
        </Group>
      </Group>

      {/* Табы для Markets */}
      {selectedMarketsWithStations.length === 0 ? (
        <div style={{ 
          marginTop: '24px',
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px',
          padding: '40px 20px'
        }}>
          Select markets and stations to display programs
        </div>
      ) : selectedMarketsWithStations.length >= 6 ? (
        // For 6+ markets: use dropdown selector for better UX
        <div>
          <Select
            value={activeMarketTab}
            onChange={(value) => setActiveMarketTab(value)}
            data={selectedMarketsWithStations.map((market) => ({
              value: market.id,
              label: `${market.name} (${market.stations.length} stations)`
            }))}
            placeholder="Select market"
            size="sm"
            mb="md"
            styles={{
              input: {
                fontWeight: 500,
                fontSize: '12px'
              }
            }}
          />
          {selectedMarketsWithStations.map((market) => (
            activeMarketTab === market.id && (
              <div key={market.id}>
                {renderStationsAccordions(market.id)}
              </div>
            )
          ))}
        </div>
      ) : (
        // For less than 6 markets: use tabs
        <Tabs value={activeMarketTab} onChange={setActiveMarketTab} color="var(--primary-color)">
          <Tabs.List>
            {selectedMarketsWithStations.map((market) => (
              <Tabs.Tab 
                key={market.id} 
                value={market.id}
                styles={{
                  tab: {
                    fontSize: '12px'
                  }
                }}
              >
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
      )}
    </div>
  );
};

export default ProposalSection;
