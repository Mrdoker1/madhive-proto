'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Text, Group, Pagination, Select, Checkbox, Table, TextInput, Tooltip } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData, updateEstimations, updateLinearData } from '@/store/slices/campaignSlice';
import { marketsData } from '@/data/marketsData';
import { getAvailableBroadcasters } from '@/data/stationsData';
import { getBroadcasterById } from '@/data/broadcastersData';
import MarketsFilter from './components/MarketsFilter';
import { TABLE_HEADERS } from '@/constants/tableHeaders';

interface MarketRow {
  id: string;
  name: string;
  displayName: string;
  rank: number;
  marketSize: number;
  selected: boolean;
  percentage: number;
  budget: number;
}

// Function to calculate station Impressions
const calculateStationImpressions = (budget: number, cpm: string): number => {
  const cpmValue = parseFloat(cpm.replace('$', ''));
  if (budget === 0 || cpmValue === 0) return 0;
  return (budget / cpmValue) * 1000;
};

// Function to calculate market Impressions
const calculateMarketImpressions = (marketId: string, broadcastersWithStations: any[]): string => {
  if (!broadcastersWithStations || broadcastersWithStations.length === 0) return '#';
  
  let totalImpressions = 0;
  
  // Iterate through all broadcasters and their stations
  broadcastersWithStations.forEach(broadcaster => {
    broadcaster.stations.forEach((station: any) => {
      // If station belongs to this market and is selected
      if (station.marketId === marketId && station.selected && station.budget > 0) {
        totalImpressions += calculateStationImpressions(station.budget, station.cpm);
      }
    });
  });
  
  if (totalImpressions === 0) return '#';
  
  // Format result
  return totalImpressions.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

// Function to calculate average market CPM
const calculateMarketCPM = (marketId: string, broadcastersWithStations: any[]): string => {
  if (!broadcastersWithStations || broadcastersWithStations.length === 0) return '#';
  
  let totalCPM = 0;
  let stationCount = 0;
  
  // Iterate through all broadcasters and their stations
  broadcastersWithStations.forEach(broadcaster => {
    broadcaster.stations.forEach((station: any) => {
      // If station belongs to this market and is selected
      if (station.marketId === marketId && station.selected) {
        const cpmValue = parseFloat(station.cpm.replace('$', ''));
        totalCPM += cpmValue;
        stationCount++;
      }
    });
  });
  
  if (stationCount === 0) return '#';
  
  const averageCPM = totalCPM / stationCount;
  return `$${averageCPM.toFixed(2)}`;
};

const MarketsSection = () => {
  const dispatch = useAppDispatch();
  const marketsReduxData = useAppSelector((state) => state.campaign.markets);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const linearData = useAppSelector((state) => state.campaign.linear);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [markets, setMarkets] = useState<MarketRow[]>([]);
  const [previousValues, setPreviousValues] = useState<Record<string, number>>({});
  const [errorTooltips, setErrorTooltips] = useState<Record<string, boolean>>({});

  // Initialize markets
  useEffect(() => {
    const initialMarkets: MarketRow[] = marketsData.map(market => {
      const savedMarket = marketsReduxData.marketsDetails?.find(m => m.id === market.id);
      return {
        id: market.id,
        name: market.name,
        displayName: market.displayName,
        rank: market.rank,
        marketSize: market.marketSize,
        selected: savedMarket?.selected || false,
        percentage: savedMarket?.percentage || 0,
        budget: savedMarket?.budget || 0
      };
    });
    
    initialMarkets.sort((a, b) => a.rank - b.rank);
    setMarkets(initialMarkets);
  }, []);

  // Update budgets when total budget changes
  useEffect(() => {
    if (markets.length === 0) return;

    const selectedMarkets = markets.filter(m => m.selected);
    if (selectedMarkets.length === 0) return;

    setMarkets(currentMarkets => 
      currentMarkets.map(market => {
        if (market.selected && market.percentage > 0) {
          const marketBudget = (budgetData.totalBudget * market.percentage) / 100;
          return {
            ...market,
            budget: marketBudget
          };
        }
        return market;
      })
    );
  }, [budgetData.totalBudget]);
  
  // Function for automatic budget redistribution
  const redistributeBudget = (updatedMarkets: MarketRow[]) => {
    const selectedMarkets = updatedMarkets.filter(m => m.selected);
    if (selectedMarkets.length === 0) {
      return updatedMarkets.map(market => ({
        ...market,
        percentage: 0,
        budget: 0
      }));
    }

    const percentagePerMarket = Math.round((100 / selectedMarkets.length) * 100) / 100;

    return updatedMarkets.map(market => {
      if (market.selected) {
        const marketBudget = (budgetData.totalBudget * percentagePerMarket) / 100;
        return {
          ...market,
          percentage: percentagePerMarket,
          budget: marketBudget
        };
      }
      return {
        ...market,
        percentage: 0,
        budget: 0
      };
    });
  };

  // Save to Redux
  useEffect(() => {
    const selectedMarketNames = markets.filter(m => m.selected).map(m => m.name);
    const marketsDetails = markets.filter(m => m.selected).map(market => ({
      id: market.id,
      name: market.name,
      displayName: market.displayName,
      selected: market.selected,
      percentage: market.percentage,
      budget: market.budget,
      stations: [] // stations are now managed in BroadcastersAndProgramsSection
    }));
    
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames, marketsDetails }));
    
    // Update Market Estimation
    const selectedMarkets = markets.filter(m => m.selected);
    
    if (selectedMarkets.length > 0) {
      // Calculate total market size
      const totalMarketSize = selectedMarkets.reduce((sum, market) => {
        return sum + market.marketSize;
      }, 0);
      
      dispatch(updateEstimations({ marketEstimation: totalMarketSize }));
    } else {
      dispatch(updateEstimations({ marketEstimation: 0 }));
    }
  }, [markets, dispatch]);

  // Automatic selection of broadcasters when markets are selected
  useEffect(() => {
    const selectedMarketIds = markets.filter(m => m.selected).map(m => m.id);
    
    if (selectedMarketIds.length === 0) {
      // If no markets selected, clear broadcasters
      dispatch(updateLinearData({ broadcasters: [] }));
      return;
    }
    
    // Get all available broadcasters for selected markets
    const broadcasterIds = getAvailableBroadcasters(selectedMarketIds);
    
    // Convert IDs to names
    const broadcasterNames = broadcasterIds
      .map(id => getBroadcasterById(id))
      .filter(Boolean)
      .map(b => b!.name);
    
    // Automatically select all available broadcasters
    dispatch(updateLinearData({ broadcasters: broadcasterNames }));
  }, [markets, dispatch]);

  // Handlers
  const handleSelect = (marketId: string, checked: boolean) => {
    setMarkets(currentMarkets => {
      const updated = currentMarkets.map(market =>
        market.id === marketId ? { ...market, selected: checked } : market
      );
      return redistributeBudget(updated);
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setMarkets(currentMarkets => {
      const updated = currentMarkets.map(market => ({ ...market, selected: checked }));
      return redistributeBudget(updated);
    });
  };

  const handlePercentageChange = (marketId: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setMarkets(currentMarkets =>
      currentMarkets.map(market => {
        if (market.id === marketId) {
          const newBudget = (budgetData.totalBudget * numericValue) / 100;
          return { ...market, percentage: numericValue, budget: newBudget };
        }
        return market;
      })
    );
  };

  const handlePercentageFocus = (marketId: string, currentValue: number) => {
    setPreviousValues(prev => ({ ...prev, [marketId]: currentValue }));
  };

  const handlePercentageBlur = (marketId: string, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;
    const otherMarketsTotal = markets.reduce((total, market) => {
      if (market.id === marketId || !market.selected) return total;
      return total + market.percentage;
    }, 0);
    
    const wouldBeTotal = otherMarketsTotal + numericValue;
    
    if (wouldBeTotal > 100) {
      setErrorTooltips(prev => ({ ...prev, [marketId]: true }));
      const previousValue = previousValues[marketId] || 0;
      handlePercentageChange(marketId, previousValue.toString());
      setTimeout(() => {
        setErrorTooltips(prev => ({ ...prev, [marketId]: false }));
      }, 3000);
    } else {
      setErrorTooltips(prev => ({ ...prev, [marketId]: false }));
    }
  };

  const handleMultiselectChange = (selectedMarketNames: string[]) => {
    markets.forEach(market => {
      const shouldBeSelected = selectedMarketNames.includes(market.name);
      if (market.selected !== shouldBeSelected) {
        handleSelect(market.id, shouldBeSelected);
      }
    });
  };

  const formatPercentage = (value: number): string => {
    return Number(value.toFixed(2)).toString();
  };

  // Pagination
  const perPage = parseInt(itemsPerPage);
  const totalPages = Math.ceil(markets.length / perPage);
  const displayedMarkets = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return markets.slice(startIndex, endIndex);
  }, [markets, currentPage, perPage]);

  const allSelected = markets.length > 0 && markets.every(m => m.selected);
  const someSelected = markets.some(m => m.selected);
  const selectedMarketNames = markets.filter(m => m.selected).map(m => m.name);
  const availableMarkets = markets.map(m => ({ id: m.id, name: m.name, displayName: m.displayName }));

  return (
    <div>
      {/* Markets Filter */}
      {markets.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <MarketsFilter
            availableMarkets={availableMarkets}
            selectedMarkets={selectedMarketNames}
            onMarketsChange={handleMultiselectChange}
          />
        </div>
      )}

      {/* Main Markets Table */}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: '40px' }}>
              <Checkbox checked={allSelected} indeterminate={someSelected && !allSelected} onChange={(e) => handleSelectAll(e.currentTarget.checked)} />
            </Table.Th>
            <Table.Th><Text size="xs" fw={500}>Market</Text></Table.Th>
            <Table.Th style={{ width: '120px' }}><Text size="xs" fw={500}>% of Budget</Text></Table.Th>
            <Table.Th style={{ width: '100px' }}><Text size="xs" fw={500}>{TABLE_HEADERS.BUDGET}</Text></Table.Th>
            <Table.Th style={{ width: '120px' }}><Text size="xs" fw={500}>{TABLE_HEADERS.IMPRESSIONS}</Text></Table.Th>
            <Table.Th style={{ width: '80px' }}><Text size="xs" fw={500}>CPM</Text></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayedMarkets.map((market) => (
            <Table.Tr key={market.id}>
              <Table.Td>
                <Checkbox checked={market.selected} onChange={(e) => handleSelect(market.id, e.currentTarget.checked)} />
              </Table.Td>
              <Table.Td><Text size="xs">{market.name}</Text></Table.Td>
              <Table.Td>
                {market.selected ? (
                  <Tooltip label="You have exceeded the maximum budget value" opened={errorTooltips[market.id] || false} color="red" position="top" withArrow>
                    <TextInput
                      size="xs"
                      value={formatPercentage(market.percentage)}
                      onChange={(e) => handlePercentageChange(market.id, e.currentTarget.value)}
                      onFocus={() => handlePercentageFocus(market.id, market.percentage)}
                      onBlur={(e) => handlePercentageBlur(market.id, e.currentTarget.value)}
                      rightSection={<Text size="xs" c="dimmed">%</Text>}
                      styles={{
                        input: {
                          fontSize: '13px',
                          padding: '4px 20px 4px 0',
                          height: '28px',
                          textAlign: 'center',
                          borderColor: errorTooltips[market.id] ? '#fa5252' : undefined
                        }
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Text size="xs" c="dimmed">-</Text>
                )}
              </Table.Td>
              <Table.Td><Text size="xs">{market.budget > 0 ? `$${market.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'}</Text></Table.Td>
              <Table.Td><Text size="xs">{calculateMarketImpressions(market.id, linearData.broadcastersWithStations || [])}</Text></Table.Td>
              <Table.Td><Text size="xs">{calculateMarketCPM(market.id, linearData.broadcastersWithStations || [])}</Text></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Pagination */}
      {markets.length > 0 && (
        <Group justify="space-between" align="center" mt="lg">
          <Group gap="xs" align="center">
            <Text size="sm" c="dimmed">Show</Text>
            <Select value={itemsPerPage} onChange={(value) => { setItemsPerPage(value || '10'); setCurrentPage(1); }} data={['10', '25', '50', '100']} size="xs" w={70} />
            <Text size="sm" c="dimmed">items</Text>
          </Group>
          {totalPages > 1 && <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} size="sm" />}
        </Group>
      )}
    </div>
  );
};

export default MarketsSection;
