'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button, Group, Table, Checkbox, NumberInput, Text, Collapse, Tooltip, Pagination, Select, MultiSelect } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData, type BroadcasterStationBudget } from '@/store/slices/campaignSlice';
import { getBroadcasterById, broadcastersData } from '@/data/broadcastersData';
import { stationsData, type StationData, getAvailableBroadcasters } from '@/data/stationsData';
import InfoNotification from '@/components/ui/InfoNotification';
import { AnimatePresence } from 'framer-motion';

interface StationWithData extends StationData {
  selected: boolean;
  percentage: number;
  budget: number;
  broadcasterName: string; // Add broadcaster name for display
}

interface MarketWithStations {
  id: string;
  name: string;
  displayName: string;
  budget: number;
  stations: StationWithData[];
}

const MarketStationsSection = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const linearData = useAppSelector((state) => state.campaign.linear);
  
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set());
  const [marketStations, setMarketStations] = useState<MarketWithStations[]>([]);
  const [previousStationValues, setPreviousStationValues] = useState<Record<string, number>>({});
  const [stationErrorTooltips, setStationErrorTooltips] = useState<Record<string, boolean>>({});
  const [marketPages, setMarketPages] = useState<Record<string, number>>({});
  const [marketPageSizes, setMarketPageSizes] = useState<Record<string, number>>({});
  const previousMarketBudgetsRef = useRef<string>('');
  const isInitialLoad = useRef<boolean>(true);
  const shouldSaveToRedux = useRef<boolean>(false);
  
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

  // Handle broadcaster selection
  const handleBroadcastersChange = (value: string[]) => {
    dispatch(updateLinearData({ broadcasters: value }));
  };

  // Handle Select All broadcasters
  const handleSelectAllBroadcasters = () => {
    dispatch(updateLinearData({ broadcasters: availableBroadcasters }));
  };

  // Handle Reset
  const handleReset = () => {
    dispatch(updateLinearData({ broadcasters: [] }));
    setMarketStations([]);
  };

  // Build market-grouped stations from selected markets
  React.useEffect(() => {
    if (!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
      setMarketStations([]);
      isInitialLoad.current = true;
      return;
    }

    // If no broadcasters selected, don't show stations
    if (!linearData.broadcasters || linearData.broadcasters.length === 0) {
      setMarketStations([]);
      return;
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];

    // Get selected broadcaster IDs
    const selectedBroadcasterIds = linearData.broadcasters
      .map(name => broadcastersData.find(b => b.name === name)?.id)
      .filter(Boolean) as string[];

    // Get saved data from Redux only on initial load
    const savedStations = isInitialLoad.current 
      ? (linearData.broadcastersWithStations || [])
      : [];

    // Build markets with stations
    const marketsWithStations: MarketWithStations[] = selectedMarketIds.map(marketId => {
      const market = marketsData.marketsDetails?.find(m => m.id === marketId);
      if (!market) return null;

      // Get all stations for this market, filtered by selected broadcasters
      const marketStationsData = stationsData.filter(s => 
        s.marketId === marketId && selectedBroadcasterIds.includes(s.broadcasterId)
      );
      
      // Get market budget from marketsDetails
      const marketBudget = market.budget || 0;
      
      // First pass: determine which stations are selected
      const stationsWithSelection: { station: typeof marketStationsData[0]; isSelected: boolean; broadcasterName: string }[] = 
        marketStationsData.map(station => {
          const broadcaster = getBroadcasterById(station.broadcasterId);
          const broadcasterName = broadcaster?.name || station.broadcasterId;
          
          // Default to selected = true
          let isSelected = true;
          
          // Check if station was saved in Redux (for persistence of selection state only)
          if (savedStations.length > 0) {
            savedStations.forEach(savedBroadcaster => {
              const savedStation = savedBroadcaster.stations.find(s => s.id === station.id);
              if (savedStation) {
                isSelected = savedStation.selected;
              }
            });
          }
          
          return { station, isSelected, broadcasterName };
        });
      
      // Calculate equal weighting based on SELECTED stations only
      const selectedStationsCount = stationsWithSelection.filter(s => s.isSelected).length;
      const equalPercentage = selectedStationsCount > 0 ? Math.round(100 / selectedStationsCount) : 0;
      const equalBudget = selectedStationsCount > 0 ? marketBudget / selectedStationsCount : 0;

      const stations: StationWithData[] = stationsWithSelection.map(({ station, isSelected, broadcasterName }) => {
        return {
          ...station,
          selected: isSelected,
          percentage: isSelected ? equalPercentage : 0,
          budget: isSelected ? equalBudget : 0,
          broadcasterName
        };
      });

      return {
        id: marketId,
        name: market.name,
        displayName: market.displayName || market.name,
        budget: marketBudget,
        stations
      };
    }).filter(Boolean) as MarketWithStations[];
    
    setMarketStations(marketsWithStations);
    isInitialLoad.current = false;
    
    // Always expand all markets by default (add any new markets to expanded set)
    if (marketsWithStations.length > 0) {
      setExpandedMarkets(prev => {
        const newSet = new Set(prev);
        marketsWithStations.forEach(m => newSet.add(m.id));
        return newSet;
      });
      
      // Auto-save to Redux when stations are loaded with default selections
      // This ensures data is persisted even if user doesn't interact with checkboxes
      const hasSelectedStations = marketsWithStations.some(m => m.stations.some(s => s.selected));
      if (hasSelectedStations) {
        // Convert market-grouped data to broadcaster-grouped format for Redux
        const broadcasterGroupedData: any[] = [];
        
        marketsWithStations.forEach(market => {
          market.stations.forEach(station => {
            if (!station.selected) return;
            
            let broadcaster = broadcasterGroupedData.find(b => b.id === station.broadcasterId);
            
            if (!broadcaster) {
              const broadcasterInfo = getBroadcasterById(station.broadcasterId);
              broadcaster = {
                id: station.broadcasterId,
                name: broadcasterInfo?.name || station.broadcasterId,
                stations: []
              };
              broadcasterGroupedData.push(broadcaster);
            }
            
            broadcaster.stations.push({
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
        
        dispatch(updateLinearData({ broadcastersWithStations: broadcasterGroupedData }));
      }
    }
  }, [marketsData.selectedMarkets, marketsData.marketsDetails, linearData.broadcasters, dispatch]);

  // Recalculate budgets when market budgets change
  useEffect(() => {
    const currentMarketBudgets = (marketsData.marketsDetails || [])
      .filter(m => m.selected)
      .map(m => ({ id: m.id, budget: m.budget }))
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(m => `${m.id}:${m.budget}`)
      .join(',');
    
    if (previousMarketBudgetsRef.current === currentMarketBudgets) {
      return;
    }
    
    previousMarketBudgetsRef.current = currentMarketBudgets;
    
    setMarketStations(prev => {
      if (prev.length === 0) return prev;
      
      return prev.map(market => {
        const marketInfo = marketsData.marketsDetails?.find(m => m.id === market.id);
        const newMarketBudget = marketInfo?.budget || 0;
        
        // Redistribute budget among selected stations with equal weighting
        const selectedStations = market.stations.filter(s => s.selected);
        const stationsCount = selectedStations.length;
        
        if (stationsCount === 0) {
          return { ...market, budget: newMarketBudget };
        }
        
        const equalBudget = newMarketBudget / stationsCount;
        const equalPercentage = Math.round(100 / stationsCount);
        
        const updatedStations = market.stations.map(station => {
          if (!station.selected) return station;
          
          return {
            ...station,
            budget: equalBudget,
            percentage: equalPercentage
          };
        });
        
        return {
          ...market,
          budget: newMarketBudget,
          stations: updatedStations
        };
      });
    });
  }, [marketsData.marketsDetails]);

  // Handle station selection
  const handleStationSelect = (marketId: string, stationId: string, checked: boolean) => {
    setMarketStations(prev => {
      const updated = prev.map(market => {
        if (market.id !== marketId) return market;
        
        const updatedStations = market.stations.map(station => {
          if (station.id === stationId) {
            return { ...station, selected: checked };
          }
          return station;
        });
        
        // Recalculate equal weighting for selected stations
        const selectedStations = updatedStations.filter(s => s.selected);
        const stationsCount = selectedStations.length;
        
        if (stationsCount === 0) {
          return { ...market, stations: updatedStations };
        }
        
        const equalBudget = market.budget / stationsCount;
        const equalPercentage = Math.round(100 / stationsCount);
        
        const reweightedStations = updatedStations.map(station => {
          if (!station.selected) {
            return { ...station, budget: 0, percentage: 0 };
          }
          
          return {
            ...station,
            budget: equalBudget,
            percentage: equalPercentage
          };
        });
        
        return { ...market, stations: reweightedStations };
      });
      
      // Mark that we should save to Redux
      shouldSaveToRedux.current = true;
      
      return updated;
    });
  };

  // Handle "Select All" for market
  const handleSelectAllMarket = (marketId: string, checked: boolean) => {
    setMarketStations(prev => {
      const updated = prev.map(market => {
        if (market.id !== marketId) return market;
        
        const updatedStations = market.stations.map(station => ({
          ...station,
          selected: checked
        }));
        
        if (!checked) {
          return {
            ...market,
            stations: updatedStations.map(s => ({ ...s, budget: 0, percentage: 0 }))
          };
        }
        
        // Equal weighting
        const stationsCount = updatedStations.length;
        const equalBudget = market.budget / stationsCount;
        const equalPercentage = Math.round(100 / stationsCount);
        
        return {
          ...market,
          stations: updatedStations.map(station => ({
            ...station,
            budget: equalBudget,
            percentage: equalPercentage
          }))
        };
      });
      
      // Mark that we should save to Redux
      shouldSaveToRedux.current = true;
      
      return updated;
    });
  };

  // Handle percentage change (legacy - keeping for compatibility)
  const handleStationPercentageChange = (marketId: string, stationId: string, value: string | number) => {
    const numericValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    
    setMarketStations(prev => {
      const updated = prev.map(market => {
        if (market.id !== marketId) return market;
        
        return {
          ...market,
          stations: market.stations.map(station => {
            if (station.id === stationId) {
              const newBudget = (market.budget * numericValue) / 100;
              return { ...station, percentage: numericValue, budget: newBudget };
            }
            return station;
          })
        };
      });
      
      return updated;
    });
  };

  // Handle budget change (new - input in dollars)
  const handleStationBudgetChange = (marketId: string, stationId: string, value: string | number) => {
    const numericValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    
    setMarketStations(prev => {
      const updated = prev.map(market => {
        if (market.id !== marketId) return market;
        
        return {
          ...market,
          stations: market.stations.map(station => {
            if (station.id === stationId) {
              const newPercentage = market.budget > 0 ? (numericValue / market.budget) * 100 : 0;
              return { ...station, budget: numericValue, percentage: newPercentage };
            }
            return station;
          })
        };
      });
      
      return updated;
    });
  };

  // Handle budget blur (validation)
  const handleStationBudgetBlur = (marketId: string, stationId: string, value: string | number) => {
    const numericValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    
    const market = marketStations.find(m => m.id === marketId);
    if (!market) return;
    
    const currentStation = market.stations.find(s => s.id === stationId);
    if (!currentStation) return;
    
    // Calculate total budget for this market
    const otherStationsTotal = market.stations.reduce((total, station) => {
      if (station.id === stationId || !station.selected) return total;
      return total + station.budget;
    }, 0);
    
    const wouldBeTotal = otherStationsTotal + numericValue;
    
    // If exceeds market budget, show error and revert
    if (wouldBeTotal > market.budget) {
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: true
      }));
      
      const previousValue = previousStationValues[stationId] || currentStation.budget;
      handleStationBudgetChange(marketId, stationId, previousValue);
      
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
      
      // Mark that we should save to Redux
      shouldSaveToRedux.current = true;
      
      // Trigger re-render to activate the save useEffect
      setMarketStations(prev => [...prev]);
    }
  };

  // Handle percentage blur (legacy - keeping for compatibility)
  const handleStationPercentageBlur = (marketId: string, stationId: string, value: string | number) => {
    const numericValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    
    const market = marketStations.find(m => m.id === marketId);
    if (!market) return;
    
    const currentStation = market.stations.find(s => s.id === stationId);
    if (!currentStation) return;
    
    // Calculate total percentage for this market
    const otherStationsTotal = market.stations.reduce((total, station) => {
      if (station.id === stationId || !station.selected) return total;
      return total + station.percentage;
    }, 0);
    
    const wouldBeTotal = otherStationsTotal + numericValue;
    
    // If exceeds 100%, show error and revert
    if (wouldBeTotal > 100) {
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: true
      }));
      
      const previousValue = previousStationValues[stationId] || currentStation.percentage;
      handleStationPercentageChange(marketId, stationId, previousValue.toString());
      
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
      
      // Mark that we should save to Redux
      shouldSaveToRedux.current = true;
      
      // Trigger re-render to activate the save useEffect
      setMarketStations(prev => [...prev]);
    }
  };

  // Handle percentage focus (save current value)
  const handleStationPercentageFocus = (stationId: string, currentValue: number) => {
    setPreviousStationValues(prev => ({
      ...prev,
      [stationId]: currentValue
    }));
  };

  // Toggle market expansion
  const toggleMarket = (marketId: string) => {
    setExpandedMarkets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
      } else {
        newSet.add(marketId);
      }
      return newSet;
    });
  };

  // Save to Redux when user makes changes (not during initialization)
  useEffect(() => {
    if (!shouldSaveToRedux.current) return;
    
    shouldSaveToRedux.current = false;
    
    // Convert market-grouped data back to broadcaster-grouped format for Redux compatibility
    const broadcasterGroupedData: any[] = [];
    
    marketStations.forEach(market => {
      market.stations.forEach(station => {
        if (!station.selected) return;
        
        let broadcaster = broadcasterGroupedData.find(b => b.id === station.broadcasterId);
        
        if (!broadcaster) {
          const broadcasterInfo = getBroadcasterById(station.broadcasterId);
          broadcaster = {
            id: station.broadcasterId,
            name: broadcasterInfo?.name || station.broadcasterId,
            stations: []
          };
          broadcasterGroupedData.push(broadcaster);
        }
        
        broadcaster.stations.push({
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
    
    dispatch(updateLinearData({ broadcastersWithStations: broadcasterGroupedData }));
  }, [marketStations, dispatch]);

  if (!marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
    return (
      <AnimatePresence>
        <InfoNotification 
          message="Market selection and associated Stations will automatically be defined once markets are selected"
        />
      </AnimatePresence>
    );
  }

  return (
    <div>
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

      {marketStations.length === 0 && linearData.broadcasters.length > 0 && (
        <Text c="dimmed" size="sm" mb="lg">
          No stations available for selected broadcasters and markets.
        </Text>
      )}

      {marketStations.length === 0 && linearData.broadcasters.length === 0 && (
        <Text c="dimmed" size="sm" mb="lg">
          Please select broadcasters to view stations.
        </Text>
      )}
      {/* Markets grouped by market */}
      {marketStations.map((market) => {
        const isExpanded = expandedMarkets.has(market.id);
        const selectedStations = market.stations.filter(s => s.selected);
        const allSelected = market.stations.length > 0 && market.stations.every(s => s.selected);
        const someSelected = selectedStations.length > 0;
        
        // Get market budget and percentage from marketsData
        const marketInfo = marketsData.marketsDetails?.find(m => m.id === market.id);
        const marketBudget = marketInfo?.budget || 0;
        const marketPercentage = marketInfo?.percentage || 0;
        
        // Pagination
        const pageSize = marketPageSizes[market.id] || 10;
        const currentPage = marketPages[market.id] || 1;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedStations = market.stations.slice(startIndex, endIndex);
        const totalPages = Math.ceil(market.stations.length / pageSize);

        return (
          <div
            key={market.id}
            style={{
              marginBottom: '16px',
              border: '1px solid #E6E3E8',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#FAFAFA'
            }}
          >
            {/* Market Header */}
            <div
              onClick={() => toggleMarket(market.id)}
              style={{
                padding: '16px 20px',
                backgroundColor: '#F9F8FA',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s'
              }}
            >
              <Group gap={12}>
                {isExpanded ? (
                  <IconChevronDown size={20} color="#666" />
                ) : (
                  <IconChevronRight size={20} color="#666" />
                )}
                <Text fw={600} size="md">
                  {market.name} ({market.stations.length})
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                Market Budget / Pct: ${marketBudget.toLocaleString('en-US', { maximumFractionDigits: 0 })} / {marketPercentage.toFixed(1)}%
              </Text>
            </div>

            {/* Stations Table */}
            <Collapse in={isExpanded}>
              <div style={{ padding: '0' }}>
                <Table style={{ width: '100%' }}>
                  <Table.Thead>
                    <Table.Tr style={{ height: '48px' }}>
                      <Table.Th style={{ width: '50px', paddingLeft: '16px' }}>
                        <Checkbox
                          checked={allSelected}
                          indeterminate={someSelected && !allSelected}
                          onChange={(e) => handleSelectAllMarket(market.id, e.currentTarget.checked)}
                          color="var(--primary-color)"
                        />
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>TV Stations</Text>
                      </Table.Th>
                      <Table.Th>
                        <Text size="xs" fw={500}>Media Owner</Text>
                      </Table.Th>
                      <Table.Th style={{ width: '120px', textAlign: 'center', paddingRight: '16px' }}>
                        <Text size="xs" fw={500}>Budget</Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  
                  <Table.Tbody>
                    {paginatedStations.map((station) => (
                      <Table.Tr key={station.id} style={{ height: '48px' }}>
                        <Table.Td style={{ paddingLeft: '16px' }}>
                          <Checkbox
                            checked={station.selected}
                            onChange={(e) => handleStationSelect(market.id, station.id, e.currentTarget.checked)}
                            color="var(--primary-color)"
                          />
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs">{station.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs">{station.broadcasterName}</Text>
                        </Table.Td>
                        <Table.Td style={{ paddingRight: '16px' }}>
                          <Tooltip
                            label="You have exceeded the maximum budget value"
                            opened={stationErrorTooltips[station.id] || false}
                            color="red"
                            position="top"
                            withArrow
                          >
                            <NumberInput
                              value={station.selected ? Math.round(station.budget) : undefined}
                              onChange={(value) => handleStationBudgetChange(market.id, station.id, value)}
                              onFocus={() => handleStationPercentageFocus(station.id, station.budget)}
                              onBlur={() => handleStationBudgetBlur(market.id, station.id, station.budget)}
                              placeholder="0"
                              size="xs"
                              min={0}
                              step={100}
                              prefix="$"
                              thousandSeparator=","
                              allowNegative={false}
                              allowDecimal={false}
                              disabled={!station.selected}
                              styles={{
                                root: { width: '110px' },
                                input: {
                                  textAlign: 'center',
                                  fontSize: '13px',
                                  backgroundColor: !station.selected ? '#f0f0f0' : 'white'
                                }
                              }}
                            />
                          </Tooltip>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Group justify="space-between" p="md" style={{ borderTop: '1px solid #E6E3E8' }}>
                    <Group gap="sm">
                      <Text size="xs" c="dimmed">Rows per page:</Text>
                      <Select
                        value={pageSize.toString()}
                        onChange={(value) => {
                          if (value) {
                            setMarketPageSizes(prev => ({ ...prev, [market.id]: parseInt(value) }));
                            setMarketPages(prev => ({ ...prev, [market.id]: 1 }));
                          }
                        }}
                        data={PAGE_SIZE_OPTIONS}
                        size="xs"
                        style={{ width: '70px' }}
                      />
                    </Group>
                    <Pagination
                      total={totalPages}
                      value={currentPage}
                      onChange={(page) => setMarketPages(prev => ({ ...prev, [market.id]: page }))}
                      size="sm"
                    />
                  </Group>
                )}
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default MarketStationsSection;

