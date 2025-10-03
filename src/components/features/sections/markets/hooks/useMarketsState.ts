import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  const previousFilteredMarketIdsRef = useRef<string[]>([]);


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
    previousFilteredMarketIdsRef.current = [];
  }, [linearData.broadcasters]);

  // Filter markets based on selected filter - только при изменении фильтра
  useEffect(() => {
    if (allAvailableMarkets.length === 0) return;

    // Проверяем, действительно ли изменились filteredMarketIds
    const previousIds = previousFilteredMarketIdsRef.current;
    const idsChanged = 
      previousIds.length !== filteredMarketIds.length ||
      !previousIds.every((id, index) => id === filteredMarketIds[index]);
    
    if (!idsChanged) return;
    
    previousFilteredMarketIdsRef.current = filteredMarketIds;

    const filteredMarkets = allAvailableMarkets.filter(market => 
      filteredMarketIds.includes(market.id)
    );

    // Используем функциональное обновление для доступа к актуальному состоянию
    setMarkets(currentMarkets => {
      // Определяем новые маркеты (которые не были в старом списке)
      const oldMarketIds = new Set(currentMarkets.map(m => m.id));
      const newMarketIds = filteredMarkets
        .filter(market => !oldMarketIds.has(market.id))
        .map(market => market.id);

      // Подсчитываем количество выбранных маркетов после добавления новых
      const currentSelectedCount = currentMarkets.filter(m => m.selected).length;
      const totalSelectedCount = currentSelectedCount + newMarketIds.length;
      
      // Вычисляем процент для каждого маркета
      const percentagePerMarket = totalSelectedCount > 0 
        ? Math.round((100 / totalSelectedCount) * 100) / 100 
        : 0;

      // Инициализируем маркеты
      const initializedMarkets = filteredMarkets.map(market => {
        // Если это существующий маркет, сохраняем его данные но пересчитываем процент
        const existingMarket = currentMarkets.find(m => m.id === market.id);
        if (existingMarket) {
          const budget = (budgetData.totalBudget * percentagePerMarket) / 100;
          const selectedStationsCount = existingMarket.stations.filter(s => s.selected).length;
          const budgetPerStation = selectedStationsCount > 0 ? budget / selectedStationsCount : 0;

          return {
            ...existingMarket,
            percentage: existingMarket.selected ? percentagePerMarket : 0,
            budget: existingMarket.selected ? budget : 0,
            stations: existingMarket.stations.map(station => ({
              ...station,
              budget: station.selected && existingMarket.selected ? budgetPerStation : 0
            }))
          };
        }
        
        // Если это новый маркет, автоматически выбираем его
        const budget = (budgetData.totalBudget * percentagePerMarket) / 100;
        const budgetPerStation = market.stations.length > 0 ? budget / market.stations.length : 0;
        const stationPercentage = market.stations.length > 0 
          ? Math.round((100 / market.stations.length) * 100) / 100 
          : 0;

        return {
          ...market,
          selected: true, // Автоматически выбираем новый маркет
          percentage: percentagePerMarket,
          budget: budget,
          stations: market.stations.map(station => ({
            ...station,
            selected: true,
            percentage: stationPercentage,
            budget: budgetPerStation
          }))
        };
      });

      return initializedMarkets;
    });
  }, [filteredMarketIds, budgetData.totalBudget, allAvailableMarkets]);

  // Update Redux when markets change
  useEffect(() => {
    // Обновляем список выбранных маркетов в Redux
    const selectedMarketNames = markets
      .filter(m => m.selected)
      .map(m => m.name);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));

    // Обновляем estimations
    if (markets.length > 0) {
      // Используем динамический импорт для избежания циклических зависимостей
      import('../utils/marketCalculations').then(({ calculateMarketEstimation }) => {
        const marketEstimation = calculateMarketEstimation(markets);
        dispatch(updateEstimations({ marketEstimation }));
      });
    } else {
      dispatch(updateEstimations({ marketEstimation: 0 }));
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
    setFilteredMarketIds,
    filteredMarketIds,
    
    // Redux data
    budgetData,
    dispatch
  };
};
