'use client';

import React, { useState, useMemo } from 'react';
import { Text, Button, Group } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import MarketDetailTable from './components/MarketDetailTable';
import { useMarketsState } from './hooks/useMarketsState';
import { useMarketsHandlers } from './hooks/useMarketsHandlers';
import MainMarketsTable from './components/MainMarketsTable';
import MarketsFilter from './components/MarketsFilter';

const MARKETS_PER_PAGE = 10;

const MarketsSection = () => {
  const linearData = useAppSelector((state) => state.campaign.linear);
  const [showAllMarkets, setShowAllMarkets] = useState(false);
  
  const {
    markets,
    expandedDetails,
    selectedMarketsWithStations,
    allSelected,
    someSelected,
    availableMarkets,
    selectedMarketNames,
    setMarkets,
    setExpandedDetails,
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

  // Handler для изменения markets через мультиселект
  const handleMultiselectChange = (selectedMarketNames: string[]) => {
    // Определяем какие markets нужно выбрать/снять
    markets.forEach(market => {
      const shouldBeSelected = selectedMarketNames.includes(market.name);
      if (market.selected !== shouldBeSelected) {
        handlers.handleSelect(market.id, shouldBeSelected);
      }
    });
  };

  // Ограничиваем количество показываемых markets
  const displayedMarkets = useMemo(() => {
    if (showAllMarkets || markets.length <= MARKETS_PER_PAGE) {
      return markets;
    }
    return markets.slice(0, MARKETS_PER_PAGE);
  }, [markets, showAllMarkets]);

  const hasMoreMarkets = markets.length > MARKETS_PER_PAGE;

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

      {/* Markets Filter - Interactive multiselect */}
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
      <MainMarketsTable
        markets={displayedMarkets}
        allSelected={allSelected}
        someSelected={someSelected}
        handlers={handlers}
      />

      {/* Show More/Less Button */}
      {hasMoreMarkets && (
        <Group justify="center" mt="md">
          <Button
            variant="subtle"
            onClick={() => setShowAllMarkets(!showAllMarkets)}
          >
            {showAllMarkets ? 'Show Less' : `Show More (${markets.length - MARKETS_PER_PAGE} more)`}
          </Button>
        </Group>
      )}

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
