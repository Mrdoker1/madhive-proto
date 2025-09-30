import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData, updateEstimations } from '@/store/slices/campaignSlice';
import { marketsData } from '@/data/marketsData';
import { getAvailableMarkets, getStationsByMarket, getStationsByMarketAndBroadcaster } from '@/data/stationsData';
import { getBroadcasterByName } from '@/data/broadcastersData';
import type { MarketWithStationsData } from '../types';

export const useMarketsState = () => {
  const dispatch = useAppDispatch();
  const marketsReduxData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  
  const [markets, setMarkets] = useState<MarketWithStationsData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [filteredMarketIds, setFilteredMarketIds] = useState<string[]>([]);


  // Derived state
  const selectedMarketsWithStations = markets.filter(market => 
    market.selected && market.stations.some(station => station.selected)
  );
  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  // Load available markets when broadcasters change
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
      setFilteredMarketIds([]);
      return;
    }

    // Получаем ID бродкастеров
    const broadcasterIds = linearData.broadcasters
      .map(name => getBroadcasterByName(name)?.id)
      .filter(Boolean) as string[];

    // Получаем доступные маркеты для выбранных бродкастеров
    const availableMarketIds = getAvailableMarkets(broadcasterIds);
    
    // Создаем структуру маркетов со станциями
    const marketsWithStations: MarketWithStationsData[] = availableMarketIds
      .map(marketId => {
        const marketInfo = marketsData.find(m => m.id === marketId);
        if (!marketInfo) return null;

        // Получаем станции для этого маркета и выбранных бродкастеров
        const stations = broadcasterIds.flatMap(broadcasterId => 
          getStationsByMarketAndBroadcaster(marketId, broadcasterId)
        ).map(station => ({
          ...station,
          selected: false,
          percentage: 0,
          budget: 0
        }));

        return {
          id: marketInfo.id,
          name: marketInfo.name,
          displayName: marketInfo.displayName,
          rank: marketInfo.rank,
          marketSize: marketInfo.marketSize,
          percentage: 0,
          budget: 0,
          selected: false,
          stations
        };
      })
      .filter(Boolean) as MarketWithStationsData[];

    // Сортируем по рангу
    marketsWithStations.sort((a, b) => a.rank - b.rank);

    setMarkets(marketsWithStations);
    
    // По умолчанию показываем все доступные маркеты
    if (filteredMarketIds.length === 0) {
      setFilteredMarketIds(marketsWithStations.map(market => market.id));
    }
  }, [linearData.broadcasters]);

  // Filter markets based on selected filter and update budgets
  useEffect(() => {
    if (markets.length === 0) return;

    const filteredMarkets = markets.filter(market => 
      filteredMarketIds.includes(market.id)
    );

    // Проставляем статус selected на основе сохраненных данных и пересчитываем бюджет
    const marketsWithSelection = filteredMarkets.map(market => {
      const isSelected = marketsReduxData.selectedMarkets.includes(market.name);
      const marketBudget = isSelected ? (budgetData.totalBudget * market.percentage) / 100 : 0;
      
      // Пересчитываем бюджет станций
      const updatedStations = market.stations.map(station => {
        if (station.selected && isSelected) {
          const selectedStations = market.stations.filter(s => s.selected);
          return {
            ...station,
            budget: selectedStations.length > 0 ? marketBudget / selectedStations.length : 0
          };
        }
        return {
          ...station,
          budget: 0
        };
      });

      return {
        ...market,
        selected: isSelected,
        budget: marketBudget,
        stations: updatedStations
      };
    });

    setMarkets(marketsWithSelection);
  }, [filteredMarketIds, marketsReduxData.selectedMarkets, budgetData.totalBudget]);

  // Update Market Estimation when markets change
  useEffect(() => {
    if (markets.length > 0) {
      // Используем динамический импорт для избежания циклических зависимостей
      import('../utils/marketCalculations').then(({ calculateMarketEstimation }) => {
        const marketEstimation = calculateMarketEstimation(markets);
        dispatch(updateEstimations({ marketEstimation }));
      });
    }
  }, [markets, dispatch]);

  // Auto-expand first detailed table for testing
  useEffect(() => {
    if (selectedMarketsWithStations.length > 0 && expandedDetails.size === 0) {
      const firstMarketId = selectedMarketsWithStations[0].id;
      setExpandedDetails(new Set([firstMarketId]));
    }
  }, [selectedMarketsWithStations, expandedDetails.size]);

  // Handler for markets filter change (memoized)
  const handleMarketsFilterChange = useCallback((selectedMarketNames: string[]) => {
    // Конвертируем названия маркетов в ID
    const selectedIds = selectedMarketNames
      .map(name => marketsData.find(m => m.name === name)?.id)
      .filter(Boolean) as string[];
    
    setFilteredMarketIds(selectedIds);
  }, []);

  // Get available markets for filter (memoized)
  const availableMarketsForFilter = useMemo(() => 
    markets.map(market => ({
      id: market.id,
      name: market.name,
      displayName: market.displayName
    })), [markets]
  );

  // Get filtered market names (memoized)
  const filteredMarketNames = useMemo(() => 
    filteredMarketIds.map(id => 
      marketsData.find(m => m.id === id)?.name || ''
    ).filter(Boolean), [filteredMarketIds]
  );

  return {
    // State
    markets,
    expandedDetails,
    selectedMarketsWithStations,
    allSelected,
    someSelected,
    availableMarkets: availableMarketsForFilter,
    filteredMarketNames,
    
    // Internal setters (for handlers)
    setMarkets,
    setExpandedDetails,
    handleMarketsFilterChange,
    
    // Redux data
    budgetData,
    dispatch
  };
};
