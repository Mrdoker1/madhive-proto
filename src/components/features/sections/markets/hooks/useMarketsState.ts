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
  
  const [markets, setMarkets] = useState<MarketWithStationsData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());


  // Derived state
  const selectedMarketsWithStations = markets.filter(market => market.selected);
  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  // Load available markets when broadcasters change
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
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
          selected: false, // НЕ выбираем изначально
          stations
        };
      })
      .filter(Boolean) as MarketWithStationsData[];

    // Сортируем по рангу
    marketsWithStations.sort((a, b) => a.rank - b.rank);

    // Показываем все доступные маркеты, но без выбора
    setMarkets(marketsWithStations);
  }, [linearData.broadcasters]);

  // Update budgets when total budget changes
  useEffect(() => {
    if (markets.length === 0) return;

    const selectedMarkets = markets.filter(m => m.selected);
    if (selectedMarkets.length === 0) return;

    const percentagePerMarket = Math.round((100 / selectedMarkets.length) * 100) / 100;

    setMarkets(currentMarkets => 
      currentMarkets.map(market => {
        if (market.selected) {
          const marketBudget = (budgetData.totalBudget * percentagePerMarket) / 100;
          const selectedStationsCount = market.stations.filter(s => s.selected).length;
          const budgetPerStation = selectedStationsCount > 0 ? marketBudget / selectedStationsCount : 0;

          return {
            ...market,
            percentage: percentagePerMarket,
            budget: marketBudget,
            stations: market.stations.map(station => ({
              ...station,
              budget: station.selected ? budgetPerStation : 0
            }))
          };
        }
        return market;
      })
    );
  }, [budgetData.totalBudget]);

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

  // Get available markets for filter (memoized) - все доступные markets
  const availableMarketsForFilter = useMemo(() => 
    markets.map(market => ({
      id: market.id,
      name: market.name,
      displayName: market.displayName
    })), [markets]
  );

  // Get selected market names for multiselect (memoized)
  const selectedMarketNames = useMemo(() => 
    markets
      .filter(m => m.selected)
      .map(m => m.name), 
    [markets]
  );

  return {
    // State
    markets,
    expandedDetails,
    selectedMarketsWithStations,
    allSelected,
    someSelected,
    availableMarkets: availableMarketsForFilter,
    selectedMarketNames,
    
    // Internal setters (for handlers)
    setMarkets,
    setExpandedDetails,
    
    // Redux data
    budgetData,
    dispatch
  };
};
