'use client';

import React from 'react';
import { Text } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import MarketDetailTable from './components/MarketDetailTable';
import { useMarketsState } from './hooks/useMarketsState';
import { useMarketsHandlers } from './hooks/useMarketsHandlers';
import MainMarketsTable from './components/MainMarketsTable';
import MarketsFilter from './components/MarketsFilter';

const MarketsSection = () => {
  const linearData = useAppSelector((state) => state.campaign.linear);
  
  const {
    markets,
    expandedDetails,
    selectedMarketsWithStations,
    allSelected,
    someSelected,
    availableMarkets,
    filteredMarketNames,
    setMarkets,
    setExpandedDetails,
    handleMarketsFilterChange,
    budgetData,
    dispatch
  } = useMarketsState();

  const handlers = useMarketsHandlers({
    markets,
    setMarkets,
    expandedDetails,
    setExpandedDetails,
    budgetData,
    dispatch
  });

  return (
    <div>
      {/* Info message */}
      <div style={{ marginBottom: '24px' }}>
        {linearData.broadcasters.length > 0 && (
          <Text size="sm" c="dark">
            Markets available for selected broadcasters: {linearData.broadcasters.join(', ')}
          </Text>
        )}
      </div>

      {/* Markets Filter */}
      {availableMarkets.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <MarketsFilter
            availableMarkets={availableMarkets}
            selectedMarkets={filteredMarketNames}
            onMarketsChange={handleMarketsFilterChange}
          />
        </div>
      )}


      {/* Main Markets Table */}
      <MainMarketsTable
        markets={markets}
        allSelected={allSelected}
        someSelected={someSelected}
        handlers={handlers}
      />

      {/* Detailed Tables for Selected Markets */}
      {selectedMarketsWithStations.map((market) => (
        <MarketDetailTable
          key={`detail-${market.id}`}
          market={market}
          isExpanded={expandedDetails.has(market.id)}
          onToggleExpand={() => handlers.handleToggleDetailExpand(market.id)}
          onDetailSelect={(stationId, checked) => handlers.handleDetailSelect(market.id, stationId, checked)}
          onDetailSelectAll={(checked) => handlers.handleDetailSelectAll(market.id, checked)}
          onDetailPercentageChange={(stationId, value) => handlers.handleDetailPercentageChange(market.id, stationId, value)}
        />
      ))}
    </div>
  );
};

export default MarketsSection;
