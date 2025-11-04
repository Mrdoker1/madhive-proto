'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MultiSelect, Button, Group, Table, Checkbox, TextInput, Text, Collapse, Tooltip, Pagination, Select } from '@mantine/core';
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

// Function to format percentages (maximum 2 decimal places)
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
  const [broadcasterPages, setBroadcasterPages] = useState<Record<string, number>>({});
  const [broadcasterPageSizes, setBroadcasterPageSizes] = useState<Record<string, number>>({});
  const stationInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const previousMarketBudgetsRef = useRef<string>('');
  const isInitialLoad = useRef<boolean>(true);
  
  const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

  // Get available broadcasters based on selected markets
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

  // Get stations based on selected broadcasters and markets
  React.useEffect(() => {
    console.log('\n🚀 useEffect: Building broadcaster stations');
    
    if (linearData.broadcasters.length === 0 || !marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
      setBroadcasterStations([]);
      isInitialLoad.current = true;
      return;
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];
    
    console.log('📍 Selected markets:', selectedMarketIds);
    console.log('🎙️ Selected broadcasters:', linearData.broadcasters);
    console.log('💵 Market budgets:', selectedMarketIds.map(id => {
      const market = marketsData.marketsDetails?.find(m => m.id === id);
      return { id, name: market?.name, budget: market?.budget };
    }));
    
    // Get saved data from Redux only on initial load
    const savedBroadcastersWithStations = isInitialLoad.current 
      ? (linearData.broadcastersWithStations || [])
      : [];

    // First, collect ALL stations from ALL broadcasters to count total stations per market
    const allStationsByMarket = new Map<string, number>();
    
    linearData.broadcasters.forEach(broadcasterName => {
      const broadcaster = broadcastersData.find(b => b.name === broadcasterName);
      if (!broadcaster) return;
      
      const savedBroadcaster = savedBroadcastersWithStations.find(b => b.id === broadcaster.id);

      selectedMarketIds.forEach(marketId => {
        const marketStations = getStationsByMarketAndBroadcaster(marketId, broadcaster.id);
        
        marketStations.forEach(station => {
          const savedStation = isInitialLoad.current 
            ? savedBroadcaster?.stations.find(s => s.id === station.id)
            : undefined;
          
          const isSelected = savedStation?.selected !== undefined ? savedStation.selected : true;
          
          if (isSelected) {
            allStationsByMarket.set(marketId, (allStationsByMarket.get(marketId) || 0) + 1);
          }
        });
      });
    });

    console.log('📊 ALL Stations per market (initial):', Object.fromEntries(allStationsByMarket));

    // Now build broadcaster data with correct budget distribution
    const broadcastersWithStations: LocalBroadcasterWithStations[] = [];

    linearData.broadcasters.forEach(broadcasterName => {
      const broadcaster = broadcastersData.find(b => b.name === broadcasterName);
      if (!broadcaster) return;

      const stations: StationWithData[] = [];
      
      // Find saved data for this broadcaster
      const savedBroadcaster = savedBroadcastersWithStations.find(b => b.id === broadcaster.id);

      selectedMarketIds.forEach(marketId => {
        const marketStations = getStationsByMarketAndBroadcaster(marketId, broadcaster.id);
        
        marketStations.forEach(station => {
          // Search for saved data for this station (only on initial load)
          const savedStation = isInitialLoad.current 
            ? savedBroadcaster?.stations.find(s => s.id === station.id)
            : undefined;
          
          const isSelected = savedStation?.selected !== undefined ? savedStation.selected : true;
          
          // Get market budget
          const market = marketsData.marketsDetails?.find(m => m.id === marketId);
          const marketBudget = market?.budget || 0;
          
          // Get total selected stations in this market (from all broadcasters)
          const totalStationsInMarket = allStationsByMarket.get(marketId) || 1;
          
          // Calculate station's share of market budget
          const budgetPerStation = marketBudget / totalStationsInMarket;
          
          stations.push({
            ...station,
            selected: isSelected,
            percentage: 0, // Will be calculated after all broadcasters are created
            budget: isSelected ? (isInitialLoad.current && savedStation?.budget ? savedStation.budget : budgetPerStation) : 0
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

    // Recalculate percentages for all broadcasters
    const broadcastersWithCorrectPercentages = recalculateBudgets(broadcastersWithStations);
    
    setBroadcasterStations(broadcastersWithCorrectPercentages);
    
    // Automatically expand all broadcasters to show selected stations
    const broadcasterIds = broadcastersWithStations.map(b => b.id);
    setExpandedBroadcasters(new Set(broadcasterIds));
    
    isInitialLoad.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linearData.broadcasters, marketsData.selectedMarkets, marketsData.marketsDetails]);

  // Save broadcasterStations to Redux
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

  // Automatic recalculation of station budgets when market budgets change
  useEffect(() => {
    // Create string from all market budgets for comparison
    const currentMarketBudgets = (marketsData.marketsDetails || [])
      .map(m => `${m.id}:${m.budget}`)
      .sort()
      .join('|');
    
    // If budgets haven't changed, don't recalculate
    if (previousMarketBudgetsRef.current === currentMarketBudgets) {
      return;
    }
    
    previousMarketBudgetsRef.current = currentMarketBudgets;
    
    // Instead of manually recalculating, use the proper recalculateBudgets function
    setBroadcasterStations(prev => {
      if (prev.length === 0) return prev;
      return recalculateBudgets(prev);
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

  // Helper function to recalculate budgets for all stations correctly
  const recalculateBudgets = (broadcasters: LocalBroadcasterWithStations[]) => {
    console.log('🔄 recalculateBudgets START');
    
    // First pass: count selected stations per market across ALL broadcasters
    const selectedStationsPerMarket = new Map<string, number>();
    
    broadcasters.forEach(broadcaster => {
      broadcaster.stations.forEach(station => {
        if (station.selected) {
          selectedStationsPerMarket.set(
            station.marketId,
            (selectedStationsPerMarket.get(station.marketId) || 0) + 1
          );
        }
      });
    });

    console.log('📊 Stations per market:', Object.fromEntries(selectedStationsPerMarket));

    // Second pass: calculate budgets based on market distribution
    const broadcastersWithBudgets = broadcasters.map(broadcaster => ({
      ...broadcaster,
      stations: broadcaster.stations.map(station => {
        if (!station.selected) {
          return { ...station, percentage: 0, budget: 0 };
        }

        const market = marketsData.marketsDetails?.find(m => m.id === station.marketId);
        const marketBudget = market?.budget || 0;
        const totalStationsInMarket = selectedStationsPerMarket.get(station.marketId) || 1;

        // Calculate station's equal share of market budget
        const budgetPerStation = marketBudget / totalStationsInMarket;

        console.log(`💰 ${broadcaster.name} - ${station.name}: market=${marketBudget}, stations=${totalStationsInMarket}, budget=${budgetPerStation}`);

        return {
          ...station,
          percentage: 0, // Will be calculated in third pass
          budget: budgetPerStation
        };
      })
    }));

    // Third pass: calculate display percentages relative to broadcaster's total budget
    const result = broadcastersWithBudgets.map(broadcaster => {
      const totalBroadcasterBudget = broadcaster.stations.reduce(
        (sum, station) => sum + (station.selected ? station.budget : 0),
        0
      );

      console.log(`🎯 ${broadcaster.name} Total Budget: $${totalBroadcasterBudget.toFixed(2)}`);

      return {
        ...broadcaster,
        stations: broadcaster.stations.map(station => {
          if (!station.selected || totalBroadcasterBudget === 0) {
            return station;
          }

          // Display percentage relative to broadcaster's total budget (NOT market!)
          const displayPercentage = Math.round((station.budget / totalBroadcasterBudget) * 100 * 100) / 100;

          return {
            ...station,
            percentage: displayPercentage
          };
        })
      };
    });

    const grandTotal = result.reduce((sum, b) => {
      return sum + b.stations.reduce((s, st) => s + (st.selected ? st.budget : 0), 0);
    }, 0);
    console.log(`💸 GRAND TOTAL: $${grandTotal.toFixed(2)}`);
    console.log('🔄 recalculateBudgets END\n');

    return result;
  };

  const handleStationSelect = (broadcasterId: string, stationId: string, checked: boolean) => {
    setBroadcasterStations(prev => {
      // Update selection first
      const updated = prev.map(broadcaster => {
        if (broadcaster.id === broadcasterId) {
          return {
            ...broadcaster,
            stations: broadcaster.stations.map(station =>
              station.id === stationId ? { ...station, selected: checked } : station
            )
          };
        }
        return broadcaster;
      });
      
      // Recalculate budgets for all broadcasters
      return recalculateBudgets(updated);
    });
  };

  const handleSelectAllStations = (broadcasterId: string, checked: boolean) => {
    setBroadcasterStations(prev => {
      // Get selected market IDs
      const selectedMarketIds = marketsData.marketsDetails
        ?.filter(m => m.selected)
        .map(m => m.id) || [];
      
      // Update selection first
      const updated = prev.map(broadcaster => {
        if (broadcaster.id === broadcasterId) {
          return {
            ...broadcaster,
            stations: broadcaster.stations.map(station => {
              // Update selection only for stations from selected markets
              if (selectedMarketIds.includes(station.marketId)) {
                return { ...station, selected: checked };
              }
              return station;
            })
          };
        }
        return broadcaster;
      });
      
      // Recalculate budgets for all broadcasters
      return recalculateBudgets(updated);
    });
  };

  const handleStationPercentageChange = (broadcasterId: string, stationId: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    
    setBroadcasterStations(prev => {
      // Calculate total selected stations per market from ALL broadcasters (CRITICAL!)
      const selectedStationsPerMarket = new Map<string, number>();
      prev.forEach(b => {
        b.stations.forEach(station => {
          if (station.selected) {
            selectedStationsPerMarket.set(
              station.marketId,
              (selectedStationsPerMarket.get(station.marketId) || 0) + 1
            );
          }
        });
      });
      
      return prev.map(broadcaster => {
        if (broadcaster.id === broadcasterId) {
          // Calculate FIXED total broadcaster budget from market shares
          const totalBroadcasterBudget = broadcaster.stations.reduce((sum, station) => {
            if (!station.selected) return sum;
            const market = marketsData.marketsDetails?.find(m => m.id === station.marketId);
            const marketBudget = market?.budget || 0;
            const totalStationsInMarket = selectedStationsPerMarket.get(station.marketId) || 1;
            return sum + (marketBudget / totalStationsInMarket);
          }, 0);
          
          return {
            ...broadcaster,
            stations: broadcaster.stations.map(station => {
              if (station.id === stationId) {
                // Calculate new budget based on percentage of broadcaster's FIXED total budget
                const newStationBudget = (totalBroadcasterBudget * numericValue) / 100;
                return { ...station, percentage: numericValue, budget: newStationBudget };
              }
              return station;
            })
          };
        }
        return broadcaster;
      });
    });
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

    // Simple validation: Check if total percentage of broadcaster's stations exceeds 100%
    const selectedStations = broadcaster.stations.filter(s => s.selected);
    const otherStationsPercentage = selectedStations.reduce((total, station) => {
      if (station.id === stationId) return total;
      return total + station.percentage;
    }, 0);
    
    const totalBroadcasterPercentage = otherStationsPercentage + numericValue;
    
    if (totalBroadcasterPercentage > 100) {
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
      {/* Notification about need to select markets */}
      <AnimatePresence>
        {(!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) && (
          <InfoNotification 
            key="broadcaster-auto-selection-notification"
            message="Broadcaster selection and associated Stations per DMA will automatically be defined once markets are selected"
          />
        )}
      </AnimatePresence>

      {/* Multiselect for broadcaster selection */}
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

      {/* Control buttons */}
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

      {/* Detail tables for each broadcaster */}
      {broadcasterStations.map((broadcaster) => {
        // Filter only stations from selected markets
        const selectedMarketIds = marketsData.marketsDetails
          ?.filter(m => m.selected)
          .map(m => m.id) || [];
        
        const visibleStations = broadcaster.stations.filter(station => 
          selectedMarketIds.includes(station.marketId)
        );
        
        // Sum only SELECTED stations' budgets
        const totalStationBudget = visibleStations
          .filter(station => station.selected)
          .reduce((sum, station) => sum + station.budget, 0);
        // Total % = percentage of total campaign budget
        const totalCampaignBudget = budgetData.totalBudget || 100000;
        const totalStationPercentage = totalCampaignBudget > 0 
          ? (totalStationBudget / totalCampaignBudget) * 100 
          : 0;
        const allStationsSelected = visibleStations.length > 0 && visibleStations.every(station => station.selected);
        const someStationsSelected = visibleStations.some(station => station.selected);
        const isExpanded = expandedBroadcasters.has(broadcaster.id);

        // Don't show broadcaster if there are no visible stations
        if (visibleStations.length === 0) {
          return null;
        }

        // Pagination logic
        const currentPage = broadcasterPages[broadcaster.id] || 1;
        const pageSize = broadcasterPageSizes[broadcaster.id] || 10;
        const totalPages = Math.ceil(visibleStations.length / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedStations = visibleStations.slice(startIndex, endIndex);
        
        const handlePageSizeChange = (value: string | null) => {
          if (value) {
            const newSize = parseInt(value);
            setBroadcasterPageSizes(prev => ({ ...prev, [broadcaster.id]: newSize }));
            // Reset to page 1 when changing page size
            setBroadcasterPages(prev => ({ ...prev, [broadcaster.id]: 1 }));
          }
        };

        return (
          <div key={broadcaster.id} style={{ marginTop: '24px' }}>
            {/* Header with broadcaster info and collapse button */}
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

            {/* Detail table */}
            <Collapse in={isExpanded}>
              <Table>
                <Table.Tbody>
                  {/* Header row for detail table */}
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
                  {paginatedStations.map((station) => (
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
                                fontSize: '13px',
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
              
              {/* Pagination Controls */}
              {visibleStations.length > 10 && (
                <Group justify="space-between" align="center" mt="lg">
                  <Group gap="xs" align="center">
                    <Text size="sm" c="dimmed">Show</Text>
                    <Select
                      data={PAGE_SIZE_OPTIONS}
                      value={pageSize.toString()}
                      onChange={handlePageSizeChange}
                      size="xs"
                      w={70}
                    />
                    <Text size="sm" c="dimmed">items</Text>
                  </Group>
                  {totalPages > 1 && (
                    <Pagination
                      total={totalPages}
                      value={currentPage}
                      onChange={(page) => setBroadcasterPages(prev => ({ ...prev, [broadcaster.id]: page }))}
                      size="sm"
                    />
                  )}
                </Group>
              )}
            </Collapse>
          </div>
        );
      })}

      {/* Message when broadcasters are selected but there are no stations */}
      {linearData.broadcasters.length > 0 && broadcasterStations.length === 0 && (
        <Text size="sm" c="dimmed" mt="md">
          No stations available for selected broadcasters and markets
        </Text>
      )}
    </div>
  );
};

export default BroadcastersAndProgramsSection;
