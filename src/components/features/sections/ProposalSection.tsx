'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Tabs, Accordion, Table, Checkbox, Group, Text, Badge, TextInput, Select, Button, Tooltip, Menu, Pagination, NumberInput, Popover, RangeSlider, Switch } from '@mantine/core';
import { IconSearch, IconPlus, IconAlertCircle } from '@tabler/icons-react';
import { getProgramsByStation, Program } from '@/data/programsData';
import { useAppSelector } from '@/hooks/useRedux';
import { getAvailableMarkets, getStationsByMarket } from '@/data/stationsData';
import { getMarketById } from '@/data/marketsData';
import { getBroadcasterByName } from '@/data/broadcastersData';
import { BroadcasterStationBudget } from '@/store/slices/campaignSlice';

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

interface ProposalSectionProps {
  onValidationChange?: (isValid: boolean, programSelections: ProgramSelection, stationPrograms: any, stationBudgets: Record<string, number>) => void;
}

const ProposalSection: React.FC<ProposalSectionProps> = ({ onValidationChange }) => {
  // Get detailed information about markets and stations from Redux
  const marketsDetails = useAppSelector((state) => state.campaign.markets.marketsDetails || []);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const selectedBroadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations || []);
  const flightData = useAppSelector((state) => state.campaign.flight);
  const daypartsData = useAppSelector((state) => state.campaign.dayparts);
  const spotLengths = useAppSelector((state) => state.campaign.general.spotLength || []);
  
  // Convert broadcaster names to IDs
  const broadcasterIds = useMemo(() => {
    return selectedBroadcasters
      .map(name => getBroadcasterByName(name)?.id)
      .filter(Boolean) as string[];
  }, [selectedBroadcasters]);
  
  // Get ALL available markets from selected broadcasters
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
  
  // Combine: take all available markets and overlay data from marketsDetails (budgets) and broadcastersWithStations (stations)
  const combinedMarkets = useMemo(() => {
    const marketMap = new Map();
    
    // First add all available markets from broadcasters
    allAvailableMarkets.forEach(market => {
      marketMap.set(market.id, market);
    });
    
    // Then overwrite with data from previous step selections (they have correct budgets)
    marketsDetails.forEach(market => {
      const existing = marketMap.get(market.id);
      if (existing) {
        // Get stations for this market from broadcastersWithStations
        const marketStations: BroadcasterStationBudget[] = [];
        
        broadcastersWithStations.forEach(broadcaster => {
          const broadcasterStations = broadcaster.stations.filter(s => 
            s.marketId === market.id && s.selected
          );
          
          // Calculate total percentage of all selected stations in this broadcaster
          const allBroadcasterStations = broadcaster.stations.filter(s => s.selected);
          const totalPercentage = allBroadcasterStations.reduce((sum, s) => sum + s.percentage, 0);
          
          broadcasterStations.forEach(station => {
            // Station budget for this specific market = (station percentage / total percentage) * total station budget
            // This gives us the portion of station's total budget allocated to this market
            const stationBudgetForMarket = totalPercentage > 0
              ? (station.budget * station.percentage) / totalPercentage
              : 0;
            
            marketStations.push({
              id: station.id,
              name: station.name,
              selected: station.selected,
              percentage: station.percentage,
              budget: stationBudgetForMarket,
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
  
  // Create stable list of market IDs from marketsDetails
  const marketIds = useMemo(() => {
    return marketsDetails.map(m => m.id).join(',');
  }, [marketsDetails]);
  
  // Local state for market visibility
  // Show only markets that were selected in previous step
  const [visibleMarkets, setVisibleMarkets] = useState<Set<string>>(() => {
    return new Set(marketsDetails.map(m => m.id));
  });
  
  // Update visibleMarkets when market ID list changes
  useEffect(() => {
    if (marketIds) {
      setVisibleMarkets(new Set(marketIds.split(',').filter(Boolean)));
    }
  }, [marketIds]);
  
  // Filter only visible markets
  const selectedMarketsWithStations = useMemo(() => {
    return combinedMarkets.filter(m => visibleMarkets.has(m.id));
  }, [combinedMarkets, visibleMarkets]);
  
  const [activeMarketTab, setActiveMarketTab] = useState<string | null>(() => {
    if (marketsDetails.length > 0) {
      return marketsDetails[0].id;
    }
    return null;
  });
  
  // Get first market ID for initializing active tab
  const firstMarketId = useMemo(() => {
    return marketsDetails.length > 0 ? marketsDetails[0].id : null;
  }, [marketIds]); // Use stable dependency marketIds
  
  // Update active tab when market list changes
  useEffect(() => {
    if (firstMarketId && !activeMarketTab) {
      setActiveMarketTab(firstMarketId);
    }
  }, [firstMarketId, activeMarketTab]);
  
  const [programSelections, setProgramSelections] = useState<ProgramSelection>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDaypartFilter, setSelectedDaypartFilter] = useState<string | null>(null);
  const [programPages, setProgramPages] = useState<Record<string, number>>({});
  const [rateFilter, setRateFilter] = useState<[number, number]>([0, 10000]);
  const [budgetPopoverOpened, setBudgetPopoverOpened] = useState(false);
  const [expandedStations, setExpandedStations] = useState<string[]>([]);
  const [showRecommended, setShowRecommended] = useState(true);
  const PROGRAMS_PER_PAGE = 20;
  
  // Reset pagination when filters change
  useEffect(() => {
    setProgramPages({});
  }, [searchQuery, selectedDaypartFilter, rateFilter[0], rateFilter[1]]);
  
  // Auto-expand first station for active market
  useEffect(() => {
    if (!activeMarketTab) return;
    
    const market = selectedMarketsWithStations.find(m => m.id === activeMarketTab);
    if (!market || !market.stations || market.stations.length === 0) return;
    
    // Find first station with programs
    const firstStationWithPrograms = market.stations.find((station: BroadcasterStationBudget) => {
      const programs = getProgramsByStation(station.id);
      return programs && programs.length > 0;
    });
    
    if (firstStationWithPrograms && !expandedStations.includes(firstStationWithPrograms.id)) {
      setExpandedStations([firstStationWithPrograms.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMarketTab, selectedMarketsWithStations.length]);
  
  // Extract selected days of week from dayparts
  const selectedDaysOfWeek = useMemo(() => {
    const selectedSlots = daypartsData.selectedSlots;
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
      return null; // No selected slots - use default days
    }
    
    // Get unique days that have at least one selected slot
    const days = Object.keys(selectedSlots).filter(day => {
      const daySlots = selectedSlots[day];
      return Object.values(daySlots).some(selected => selected);
    });
    
    return days.length > 0 ? days : null;
  }, [daypartsData.selectedSlots]);
  
  // Extract selected hours and determine active dayparts
  const activeDaypartsInfo = useMemo(() => {
    const selectedSlots = daypartsData.selectedSlots;
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
      return null; // No selected slots - use default dayparts
    }
    
    // Collect all selected hours (unique)
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
    
    // Determine which dayparts are active and collect their hours
    const activeDayparts = daypartDefinitions
      .map(daypart => {
        // Filter only those hours from daypart that are selected
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
  
  // Function to generate random date in range
  const getRandomDateInRange = useCallback((startDate: string, endDate: string): string => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0];
  }, []);
  
  // Function to format hour to AM/PM format
  const formatHourToTime = useCallback((hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  }, []);
  
  // Function to get random item from array
  const getRandomItem = useCallback(<T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  }, []);
  
  // Function to update program dates and days based on Flight Range and Dayparts
  const updateProgramDates = useCallback((program: Program): Program => {
    let updatedProgram = { ...program };
    
    // Update dates if Flight Range is selected
    if (flightData.startDate && flightData.endDate) {
      const startDate = flightData.startDate;
      const endDate = flightData.endDate;
      
      // Generate random dates within range
      const programStartDate = getRandomDateInRange(startDate, endDate);
      const programEndDate = getRandomDateInRange(programStartDate, endDate);
      
      updatedProgram = {
        ...updatedProgram,
        airStartDate: programStartDate,
        airEndDate: programEndDate
      };
    }
    
    // Update days of week if Dayparts are selected
    if (selectedDaysOfWeek) {
      updatedProgram = {
        ...updatedProgram,
        daysOfWeek: selectedDaysOfWeek
      };
    }
    
    // Update daypart and airTime if Dayparts are selected
    if (activeDaypartsInfo) {
      // Select random active daypart
      const randomDaypart = getRandomItem(activeDaypartsInfo);
      
      // Select random hour from this daypart
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
  
  // Function to toggle market visibility
  const toggleMarketVisibility = (marketId: string) => {
    setVisibleMarkets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
        // If removing active tab, switch to first available
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

  // Get all programs for all stations with updated dates
  const stationPrograms = useMemo(() => {
    const programs: Record<string, Program[]> = {};
    selectedMarketsWithStations.forEach(market => {
      market.stations.forEach((station: BroadcasterStationBudget) => {
        const originalPrograms = getProgramsByStation(station.id);
        // Apply date update to each program
        programs[station.id] = originalPrograms.map(program => updateProgramDates(program));
      });
    });
    return programs;
  }, [selectedMarketsWithStations, updateProgramDates]);

  // Calculate min and max rate from all programs
  const rateRange = useMemo((): [number, number] => {
    let minRate = Infinity;
    let maxRate = 0;
    
    Object.values(stationPrograms).forEach(programs => {
      programs.forEach(program => {
        if (program.rate < minRate) minRate = program.rate;
        if (program.rate > maxRate) maxRate = program.rate;
      });
    });
    
    if (minRate === Infinity) {
      return [0, 10000];
    }
    
    return [Math.floor(minRate / 100) * 100, Math.ceil(maxRate / 100) * 100];
  }, [stationPrograms]);
  
  // Update rate filter when rate range changes
  useEffect(() => {
    setRateFilter(prev => {
      // Only update if range actually changed
      if (prev[0] !== rateRange[0] || prev[1] !== rateRange[1]) {
        return rateRange;
      }
      return prev;
    });
  }, [rateRange[0], rateRange[1]]);

  // Function to get selected programs for station
  const getSelectedPrograms = (stationId: string): Program[] => {
    const programs = stationPrograms[stationId] || [];
    const selections = programSelections[stationId] || {};
    return programs.filter(p => selections[p.id]);
  };

  // Function to apply recommended program selections
  const applyRecommendedSelections = useCallback(() => {
    const newSelections: ProgramSelection = {};
    
    selectedMarketsWithStations.forEach(market => {
      market.stations.forEach((station: BroadcasterStationBudget) => {
        const programs = stationPrograms[station.id] || [];
        
        if (programs.length === 0) return;
        
        // Sort programs by CPM (best value first)
        const sortedPrograms = [...programs].sort((a, b) => a.cpm - b.cpm);
        
        // Target: use 80-85% of station budget
        const targetBudget = station.budget * 0.825;
        let currentBudget = 0;
        
        newSelections[station.id] = {};
        
        // Select programs until we reach target budget
        for (const program of sortedPrograms) {
          if (currentBudget + program.rate <= targetBudget) {
            newSelections[station.id][program.id] = true;
            currentBudget += program.rate;
          } else {
            newSelections[station.id][program.id] = false;
          }
        }
        
        // If no programs selected (budget too small), select at least the cheapest one
        const hasSelected = Object.values(newSelections[station.id]).some(v => v);
        if (!hasSelected && sortedPrograms.length > 0) {
          newSelections[station.id][sortedPrograms[0].id] = true;
        }
      });
    });
    
    setProgramSelections(newSelections);
  }, [selectedMarketsWithStations, stationPrograms]);

  // Apply recommended selections when showRecommended is enabled
  useEffect(() => {
    if (showRecommended && Object.keys(stationPrograms).length > 0) {
      applyRecommendedSelections();
    } else if (!showRecommended) {
      // Clear all selections when switching to "Show All Programs"
      setProgramSelections({});
    }
  }, [showRecommended, stationPrograms, applyRecommendedSelections]);

  // Calculate totals for station
  const calculateStationTotals = (stationId: string) => {
    const selectedPrograms = getSelectedPrograms(stationId);
    const totalImpressions = selectedPrograms.reduce((sum, p) => sum + p.impressions, 0);
    const totalRate = selectedPrograms.reduce((sum, p) => sum + p.rate, 0);
    const avgCPM = totalImpressions > 0 ? (totalRate / totalImpressions) * 1000 : 0;
    
    return { totalImpressions, totalRate, avgCPM };
  };

  // Check if budget is exceeded for station
  const checkBudgetExceeded = (stationId: string, allocatedBudget: number) => {
    const { totalRate } = calculateStationTotals(stationId);
    return totalRate > allocatedBudget;
  };

  // Grand totals across all stations
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

  // Track previous validation data to prevent infinite loops
  const prevValidationDataRef = useRef<string>('');

  // Pass validation data to parent component
  useEffect(() => {
    if (onValidationChange) {
      // Collect station budgets
      const stationBudgets: Record<string, number> = {};
      selectedMarketsWithStations.forEach(market => {
        market.stations.forEach((station: BroadcasterStationBudget) => {
          stationBudgets[station.id] = station.budget;
        });
      });

      // Check validity (at least one program selected and budget not exceeded)
      let hasSelectedPrograms = false;
      let budgetExceeded = false;

      Object.keys(stationPrograms).forEach(stationId => {
        const selections = programSelections[stationId] || {};
        const hasSelected = Object.values(selections).some(selected => selected);
        if (hasSelected) {
          hasSelectedPrograms = true;
        }
        
        if (checkBudgetExceeded(stationId, stationBudgets[stationId] || 0)) {
          budgetExceeded = true;
        }
      });

      const isValid = hasSelectedPrograms && !budgetExceeded;
      
      // Create a stable string representation of validation data
      const currentData = JSON.stringify({
        isValid,
        selections: programSelections,
        stationIds: Object.keys(stationPrograms),
        budgets: stationBudgets
      });
      
      // Only call onValidationChange if data actually changed
      if (currentData !== prevValidationDataRef.current) {
        prevValidationDataRef.current = currentData;
        onValidationChange(isValid, programSelections, stationPrograms, stationBudgets);
      }
    }
  }, [programSelections, stationPrograms, selectedMarketsWithStations, onValidationChange]);

  // Toggle program
  const toggleProgram = (stationId: string, programId: string) => {
    setProgramSelections(prev => ({
      ...prev,
      [stationId]: {
        ...(prev[stationId] || {}),
        [programId]: !(prev[stationId]?.[programId] || false)
      }
    }));
  };

  // Toggle all station programs
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

  // Number formatting
  const formatNumber = (num: number) => num.toLocaleString('en-US');
  const formatCurrency = (num: number) => `$${num.toLocaleString('en-US')}`;
  const formatCPM = (num: number) => `$${num.toFixed(2)}`;

  // Function to get first letter of day of week
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

  // Render programs table for station
  const renderProgramsTable = (stationId: string, allocatedBudget: number) => {
    const programs = stationPrograms[stationId] || [];
    const selections = programSelections[stationId] || {};
    const allSelected = programs.length > 0 && programs.every(p => selections[p.id]);
    const someSelected = programs.some(p => selections[p.id]);
    const totals = calculateStationTotals(stationId);
    const budgetExceeded = checkBudgetExceeded(stationId, allocatedBudget);

    // Filter by search, daypart, and rate range
    const filteredPrograms = programs.filter(program => {
      const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDaypart = !selectedDaypartFilter || program.daypart === selectedDaypartFilter;
      const matchesRate = program.rate >= rateFilter[0] && program.rate <= rateFilter[1];
      
      return matchesSearch && matchesDaypart && matchesRate;
    });

    // Pagination
    const currentPage = programPages[stationId] || 1;
    const totalPages = Math.ceil(filteredPrograms.length / PROGRAMS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROGRAMS_PER_PAGE;
    const endIndex = startIndex + PROGRAMS_PER_PAGE;
    const paginatedPrograms = filteredPrograms.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
      setProgramPages(prev => ({ ...prev, [stationId]: page }));
    };

    return (
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table
          style={{ tableLayout: 'fixed' }}
          styles={{
            tr: {
              height: '48px'
            }
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: '40px', minWidth: '40px' }}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={(e) => toggleAllStationPrograms(stationId, e.currentTarget.checked)}
                  color="var(--primary-color)"
                />
              </Table.Th>
              <Table.Th style={{ width: '160px', minWidth: '160px' }}>
                <Text size="xs" fw={500}>Program Name</Text>
              </Table.Th>
              <Table.Th style={{ width: '120px', minWidth: '120px' }}>
                <Text size="xs" fw={500}>Daypart</Text>
              </Table.Th>
              <Table.Th style={{ width: '80px', minWidth: '80px' }}>
                <Text size="xs" fw={500}>Air Time</Text>
              </Table.Th>
              <Table.Th style={{ width: '100px', minWidth: '100px' }}>
                <Text size="xs" fw={500}>Air Start Date</Text>
              </Table.Th>
              <Table.Th style={{ width: '100px', minWidth: '100px' }}>
                <Text size="xs" fw={500}>Air End Date</Text>
              </Table.Th>
              <Table.Th style={{ width: '190px', minWidth: '190px' }}>
                <Text size="xs" fw={500}>Days of Week</Text>
              </Table.Th>
              <Table.Th style={{ width: '80px', minWidth: '40px' }}>
                <Text size="xs" fw={500}>Length</Text>
              </Table.Th>
              <Table.Th style={{ width: '90px', minWidth: '90px', textAlign: 'right' }}>
                <Text size="xs" fw={500}>Rate</Text>
              </Table.Th>
              <Table.Th style={{ width: '100px', minWidth: '100px', textAlign: 'right' }}>
                <Text size="xs" fw={500}>Impressions</Text>
              </Table.Th>
              <Table.Th style={{ width: '80px', minWidth: '80px', textAlign: 'right' }}>
                <Text size="xs" fw={500}>CPM</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredPrograms.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={11} style={{ textAlign: 'center', padding: '20px' }}>
                  <Text c="dimmed" size="xs">
                    {searchQuery || selectedDaypartFilter ? 'No programs found' : 'No programs available'}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              paginatedPrograms.map((program) => {
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
                      <Group gap={4}>
                        {spotLengths.map((length, index) => (
                          <div
                            key={`${length}-${index}`}
                            style={{
                              width: '28px',
                              height: '20px',
                              borderRadius: '10px',
                              backgroundColor: '#291036',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '9px',
                              fontWeight: 600,
                              flexShrink: 0
                            }}
                          >
                            :{length}
                          </div>
                        ))}
                      </Group>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text size="xs">{formatCurrency(program.rate)}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text size="xs">{formatNumber(program.impressions)}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text size="xs">{formatCPM(program.cpm)}</Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="space-between" align="center" mt="md">
            <Text size="xs" c="dimmed">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPrograms.length)} of {filteredPrograms.length} programs
            </Text>
            <Pagination 
              total={totalPages} 
              value={currentPage} 
              onChange={handlePageChange} 
              size="sm"
            />
          </Group>
        )}
        
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

  // Render accordions for stations
  const renderStationsAccordions = (marketId: string) => {
    const market = selectedMarketsWithStations.find(m => m.id === marketId);
    if (!market) return null;

    const availableStations = market.stations;

    if (availableStations.length === 0) {
      return (
        <Text c="dimmed" size="sm" p="md">
          No stations selected for this market
        </Text>
      );
    }

    return (
      <Accordion 
        multiple 
        value={expandedStations} 
        onChange={setExpandedStations}
      >
        {availableStations.map((station: BroadcasterStationBudget) => {
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

  // Check if broadcasters are selected
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
      {/* Toggle for Recommended/All Programs */}
      <Group mb="lg">
        <Switch
          checked={showRecommended}
          onChange={(event) => setShowRecommended(event.currentTarget.checked)}
          label={showRecommended ? "Show Recommended Programs" : "Show All Programs"}
          color="var(--primary-color)"
          size="md"
          styles={{
            label: {
              fontWeight: 500,
              fontSize: '14px',
              color: '#291036'
            }
          }}
        />
        <Text size="xs" c="dimmed">
          {showRecommended 
            ? "Showing programs selected by our AI system based on best value" 
            : "Showing all available programs"}
        </Text>
      </Group>

      {/* Filters and controls */}
      <Group justify="space-between" mb="lg">
        <Group gap="md">
          <TextInput
            placeholder="Search Program Name"
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
                fontSize: '13px'
              }
            }}
          />
          <Popover 
            width={360} 
            position="bottom" 
            withArrow 
            shadow="md"
            opened={budgetPopoverOpened}
            onChange={setBudgetPopoverOpened}
          >
            <Popover.Target>
              <TextInput
                value={`Budget: ${rateFilter[0].toLocaleString()} - ${rateFilter[1].toLocaleString()}`}
                onClick={() => setBudgetPopoverOpened(true)}
                readOnly
                size="sm"
                w={200}
                styles={{
                  input: {
                    cursor: 'pointer',
                    fontSize: '13px'
                  }
                }}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <div style={{ padding: '20px' }}>
                <Text size="sm" fw={600} mb={20}>
                  Budget Range: ${rateFilter[0].toLocaleString()} - ${rateFilter[1].toLocaleString()}
                </Text>
                <RangeSlider
                  value={rateFilter}
                  onChange={setRateFilter}
                  min={rateRange[0]}
                  max={rateRange[1]}
                  step={100}
                  color="var(--primary-color)"
                  size="md"
                  styles={{
                    bar: {
                      backgroundColor: 'var(--primary-color)'
                    }
                  }}
                  label={null}
                />
                <Group justify="space-between" mt={12}>
                  <Text size="xs" c="dimmed">${rateRange[0].toLocaleString()}</Text>
                  <Text size="xs" c="dimmed">${rateRange[1].toLocaleString()}</Text>
                </Group>
              </div>
            </Popover.Dropdown>
          </Popover>
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

      {/* Tabs for Markets */}
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
                fontSize: '13px'
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
                    fontSize: '13px'
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
