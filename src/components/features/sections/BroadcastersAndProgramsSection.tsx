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
  const stationInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const previousMarketBudgetsRef = useRef<string>('');
  const isInitialLoad = useRef<boolean>(true);

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
    if (linearData.broadcasters.length === 0 || !marketsData.selectedMarkets || marketsData.selectedMarkets.length === 0) {
      setBroadcasterStations([]);
      isInitialLoad.current = true;
      return;
    }

    const selectedMarketIds = marketsData.marketsDetails
      ?.filter(m => m.selected)
      .map(m => m.id) || [];

    const broadcastersWithStations: LocalBroadcasterWithStations[] = [];
    
    // Get saved data from Redux only on initial load
    const savedBroadcastersWithStations = isInitialLoad.current 
      ? (linearData.broadcastersWithStations || [])
      : [];

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
          
          stations.push({
            ...station,
            // Automatically select all stations by default
            selected: savedStation?.selected !== undefined ? savedStation.selected : true,
            percentage: savedStation?.percentage || 0,
            budget: savedStation?.budget || 0
          });
        });
      });

      if (stations.length > 0) {
        // Automatically distribute budget among selected stations
        const selectedStations = stations.filter(s => s.selected);
        
        if (selectedStations.length > 0) {
          // Calculate total budget of all markets for this broadcaster
          const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
          const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
            const market = marketsData.marketsDetails?.find(m => m.id === marketId);
            return sum + (market?.budget || 0);
          }, 0);
          
          // Evenly distribute percentage among all selected stations
          const percentagePerStation = Math.round((100 / selectedStations.length) * 100) / 100;
          const budgetPerStation = (totalBudgetAllMarkets * percentagePerStation) / 100;
          
          // Update all stations with budget
          const finalStations = stations.map(station => {
            if (!station.selected) {
              return { ...station, percentage: 0, budget: 0 };
            }
            
            // If there's saved data on initial load, use it
            if (isInitialLoad.current && station.percentage > 0) {
              return station;
            }
            
            return {
              ...station,
              percentage: percentagePerStation,
              budget: budgetPerStation
            };
          });
          
          broadcastersWithStations.push({
            id: broadcaster.id,
            name: broadcaster.name,
            stations: finalStations
          });
        } else {
          broadcastersWithStations.push({
            id: broadcaster.id,
            name: broadcaster.name,
            stations
          });
        }
      }
    });

    setBroadcasterStations(broadcastersWithStations);
    
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
    
    // Use functional update to get actual values
    setBroadcasterStations(prev => {
      if (prev.length === 0) return prev;
      
      let hasChanges = false;
      
      const updatedBroadcasters = prev.map(broadcaster => {
        const selectedStations = broadcaster.stations.filter(s => s.selected);
        
        if (selectedStations.length === 0) {
          return broadcaster;
        }
        
        // Calculate total budget of all markets for this broadcaster
        const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
        const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
          const market = marketsData.marketsDetails?.find(m => m.id === marketId);
          return sum + (market?.budget || 0);
        }, 0);
        
        const updatedStations = broadcaster.stations.map(station => {
          if (!station.selected || station.percentage === 0) {
            return station;
          }
          
          // Recalculate station budget based on its percentage and total budget
          const stationBudget = (totalBudgetAllMarkets * station.percentage) / 100;
          
          // Check if budget has changed
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
      
      // Return updated data only if there are changes
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
        // Update station selection
        const updatedStations = broadcaster.stations.map(station => 
          station.id === stationId ? { ...station, selected: checked } : station
        );
        
        // Automatically distribute budget among selected stations
        const selectedStations = updatedStations.filter(s => s.selected);
        
        if (selectedStations.length > 0) {
          // Calculate total budget of all markets for this broadcaster
          const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
          const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
            const market = marketsData.marketsDetails?.find(m => m.id === marketId);
            return sum + (market?.budget || 0);
          }, 0);
          
          // Evenly distribute percentage among all selected stations
          const percentagePerStation = Math.round((100 / selectedStations.length) * 100) / 100;
          const budgetPerStation = (totalBudgetAllMarkets * percentagePerStation) / 100;
          
          // Update all stations
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
          // If nothing is selected, reset everything to 0
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
        // Get selected market IDs
        const selectedMarketIds = marketsData.marketsDetails
          ?.filter(m => m.selected)
          .map(m => m.id) || [];
        
        // Update selection ONLY for stations from selected markets
        const updatedStations = broadcaster.stations.map(station => {
          // If station is from selected market, update its selected status
          if (selectedMarketIds.includes(station.marketId)) {
            return { ...station, selected: checked };
          }
          // Otherwise leave as is
          return station;
        });
        
        if (checked) {
          // Filter only selected stations from selected markets
          const selectedVisibleStations = updatedStations.filter(
            s => s.selected && selectedMarketIds.includes(s.marketId)
          );
          
          // Calculate total budget of all markets for this broadcaster
          const uniqueMarketIds = new Set(selectedVisibleStations.map(s => s.marketId));
          const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
            const market = marketsData.marketsDetails?.find(m => m.id === marketId);
            return sum + (market?.budget || 0);
          }, 0);
          
          // Evenly distribute percentage among selected visible stations
          const percentagePerStation = selectedVisibleStations.length > 0
            ? Math.round((100 / selectedVisibleStations.length) * 100) / 100
            : 0;
          const budgetPerStation = (totalBudgetAllMarkets * percentagePerStation) / 100;
          
          // Update all stations
          const finalStations = updatedStations.map(station => {
            // If station is selected and from selected market
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
          // If unchecking, reset budgets ONLY for stations from selected markets
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
        
        // Calculate total budget of all markets for this broadcaster
        const uniqueMarketIds = new Set(selectedStations.map(s => s.marketId));
        const totalBudgetAllMarkets = Array.from(uniqueMarketIds).reduce((sum, marketId) => {
          const market = marketsData.marketsDetails?.find(m => m.id === marketId);
          return sum + (market?.budget || 0);
        }, 0);

        return {
          ...broadcaster,
          stations: broadcaster.stations.map(station => {
            if (station.id === stationId) {
              // Station budget = percentage of total budget of all markets
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

    // Calculate total percentage of ALL selected stations of broadcaster
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
        
        const totalStationBudget = visibleStations.reduce((sum, station) => sum + station.budget, 0);
        const totalStationPercentage = visibleStations.reduce((sum, station) => sum + station.percentage, 0);
        const allStationsSelected = visibleStations.length > 0 && visibleStations.every(station => station.selected);
        const someStationsSelected = visibleStations.some(station => station.selected);
        const isExpanded = expandedBroadcasters.has(broadcaster.id);

        // Don't show broadcaster if there are no visible stations
        if (visibleStations.length === 0) {
          return null;
        }

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
