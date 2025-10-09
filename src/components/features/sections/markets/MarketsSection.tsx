'use client';

import React, { useState, useMemo } from 'react';
import { Text, Group, Pagination, Select } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';
import MarketDetailTable from './components/MarketDetailTable';
import { useMarketsState } from './hooks/useMarketsState';
import { useMarketsHandlers } from './hooks/useMarketsHandlers';
import MainMarketsTable from './components/MainMarketsTable';
import MarketsFilter from './components/MarketsFilter';

const MarketsSection = () => {
  const linearData = useAppSelector((state) => state.campaign.linear);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('10');
  
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

  // Вычисляем общее количество страниц
  const perPage = parseInt(itemsPerPage);
  const totalPages = Math.ceil(markets.length / perPage);

  // Ограничиваем количество показываемых markets для текущей страницы
  const displayedMarkets = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return markets.slice(startIndex, endIndex);
  }, [markets, currentPage, perPage]);

  // Сброс на первую страницу при изменении количества markets или элементов на странице
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [markets.length, currentPage, totalPages, itemsPerPage]);

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

      {/* Pagination and Items per page */}
      {markets.length > 0 && (
        <Group justify="space-between" align="center" mt="lg">
          <Group gap="xs" align="center">
            <Text size="sm" c="dimmed">Show</Text>
            <Select
              value={itemsPerPage}
              onChange={(value) => {
                setItemsPerPage(value || '10');
                setCurrentPage(1);
              }}
              data={['10', '25', '50', '100']}
              size="xs"
              w={70}
            />
            <Text size="sm" c="dimmed">items</Text>
          </Group>
          
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              size="sm"
            />
          )}
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
