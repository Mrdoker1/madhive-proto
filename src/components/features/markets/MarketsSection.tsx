'use client';

import React from 'react';
import { Text } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import MarketDetailTable from './components/MarketDetailTable';
import { useMarketsState } from './hooks/useMarketsState';
import { useMarketsHandlers } from './hooks/useMarketsHandlers';
import PercentageWarning from './components/PercentageWarning';
import MainMarketsTable from './components/MainMarketsTable';
import MarketsFilter from './components/MarketsFilter';

const MarketsSection = () => {
  const linearData = useAppSelector((state) => state.campaign.linear);
  
  const {
    markets,
    expandedDetails,
    selectedMarketsWithDetails,
    allSelected,
    someSelected,
    validation,
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

      {/* Percentage Allocation Warning */}
      <PercentageWarning validation={validation} />

      {/* Main Markets Table */}
      <MainMarketsTable
        markets={markets}
        allSelected={allSelected}
        someSelected={someSelected}
        handlers={handlers}
      />

      {/* Detailed Tables for Selected Markets */}
      {selectedMarketsWithDetails.map((market) => (
        <MarketDetailTable
          key={`detail-${market.id}`}
          market={market}
          isExpanded={expandedDetails.has(market.id)}
          onToggleExpand={() => handlers.handleToggleDetailExpand(market.id)}
          onDetailSelect={(detailId, checked) => handlers.handleDetailSelect(market.id, detailId, checked)}
          onDetailSelectAll={(checked) => handlers.handleDetailSelectAll(market.id, checked)}
          onDetailPercentageChange={(detailId, value) => handlers.handleDetailPercentageChange(market.id, detailId, value)}
        />
      ))}
    </div>
  );
};

export default MarketsSection;
