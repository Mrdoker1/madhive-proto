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
  
  const [allAvailableMarkets, setAllAvailableMarkets] = useState<MarketWithStationsData[]>([]);
  const [markets, setMarkets] = useState<MarketWithStationsData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [filteredMarketIds, setFilteredMarketIds] = useState<string[]>([]);


  // Derived state
  const selectedMarketsWithStations = markets.filter(market => market.selected);
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

    // Сохраняем все доступные маркеты
    setAllAvailableMarkets(marketsWithStations);
    
    // Сбрасываем фильтр при смене бродкастеров (пользователь выберет маркеты вручную)
    setFilteredMarketIds([]);
    setMarkets([]);
  }, [linearData.broadcasters]);

  // Filter markets based on selected filter - только при изменении фильтра
  useEffect(() => {
    if (allAvailableMarkets.length === 0) return;

    const filteredMarkets = allAvailableMarkets.filter(market => 
      filteredMarketIds.includes(market.id)
    );

    // Инициализируем маркеты с пустым состоянием
    const initializedMarkets = filteredMarkets.map(market => ({
      ...market,
      selected: false,
      percentage: 0,
      budget: 0,
      stations: market.stations.map(station => ({
        ...station,
        selected: false,
        percentage: 0,
        budget: 0
      }))
    }));

    setMarkets(initializedMarkets);
  }, [filteredMarketIds]);

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

  // Auto-expand detailed tables when markets are selected
  useEffect(() => {
    if (selectedMarketsWithStations.length > 0) {
      // Автоматически раскрываем все выбранные маркеты
      const newExpanded = new Set(selectedMarketsWithStations.map(m => m.id));
      setExpandedDetails(newExpanded);
    } else {
      // Закрываем все, если ничего не выбрано
      setExpandedDetails(new Set());
    }
  }, [selectedMarketsWithStations.length]);

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
    allAvailableMarkets.map(market => ({
      id: market.id,
      name: market.name,
      displayName: market.displayName
    })), [allAvailableMarkets]
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
