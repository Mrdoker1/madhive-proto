import { useCallback } from 'react';
import { updateMarketsData, updateEstimations } from '@/store/slices/campaignSlice';
import { calculateMarketEstimation } from '../utils/marketCalculations';
import type { MarketWithStationsData, MarketHandlers } from '../types';
import type { AppDispatch } from '@/store/store';

interface UseMarketsHandlersProps {
  markets: MarketWithStationsData[];
  setMarkets: (markets: MarketWithStationsData[]) => void;
  expandedDetails: Set<string>;
  setExpandedDetails: (expanded: Set<string>) => void;
  budgetData: { totalBudget: number };
  dispatch: AppDispatch;
}

// calculateMarketEstimation импортирован из utils

export const useMarketsHandlers = ({
  markets,
  setMarkets,
  expandedDetails,
  setExpandedDetails,
  budgetData,
  dispatch
}: UseMarketsHandlersProps): MarketHandlers => {

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      // Если выбираем все маркеты, равномерно распределяем проценты
      const percentagePerMarket = Math.round((100 / markets.length) * 100) / 100;
      
      const updatedMarkets = markets.map(market => {
        const marketBudget = (budgetData.totalBudget * percentagePerMarket) / 100;
        const budgetPerStation = market.stations.length > 0 
          ? marketBudget / market.stations.length 
          : 0;

        return {
          ...market,
          selected: true,
          percentage: percentagePerMarket,
          budget: marketBudget,
          stations: market.stations.map(station => ({
            ...station,
            selected: true,
            percentage: market.stations.length > 0 ? Math.round((100 / market.stations.length) * 100) / 100 : 0,
            budget: budgetPerStation
          }))
        };
      });

      setMarkets(updatedMarkets);

      // Update Redux
      const selectedMarketNames = updatedMarkets.map(m => m.name);
      dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));

      // Update estimations
      const marketEstimation = calculateMarketEstimation(updatedMarkets);
      dispatch(updateEstimations({ marketEstimation }));
    } else {
      // Если снимаем выбор со всех маркетов
      const updatedMarkets = markets.map(market => ({
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

      setMarkets(updatedMarkets);

      // Update Redux
      dispatch(updateMarketsData({ selectedMarkets: [] }));

      // Update estimations
      dispatch(updateEstimations({ marketEstimation: 0 }));
    }
  }, [markets, budgetData.totalBudget, setMarkets, dispatch]);

  const handleSelect = useCallback((marketId: string, checked: boolean) => {
    // Сначала обновляем статус выбранного маркета
    const preliminaryMarkets = markets.map(market => {
      if (market.id === marketId) {
        return {
          ...market,
          selected: checked,
          stations: market.stations.map(station => ({
            ...station,
            selected: checked,
            percentage: checked ? Math.round((100 / market.stations.length) * 100) / 100 : 0,
            budget: 0 // Пока 0, пересчитаем после распределения процентов
          }))
        };
      }
      return market;
    });

    // Подсчитываем количество выбранных маркетов
    const selectedMarkets = preliminaryMarkets.filter(market => market.selected);
    const selectedCount = selectedMarkets.length;
    
    // Равномерно распределяем проценты между выбранными маркетами
    const percentagePerMarket = selectedCount > 0 ? Math.round((100 / selectedCount) * 100) / 100 : 0;
    
    const updatedMarkets = preliminaryMarkets.map(market => {
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
            // Сохраняем selected и percentage из preliminaryMarkets
            budget: station.selected ? budgetPerStation : 0
          }))
        };
      } else {
        return {
          ...market,
          percentage: 0,
          budget: 0,
          stations: market.stations.map(station => ({
            ...station,
            selected: false,
            percentage: 0,
            budget: 0
          }))
        };
      }
    });

    setMarkets(updatedMarkets);

    // Update Redux
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));

    // Update estimations
    const marketEstimation = calculateMarketEstimation(updatedMarkets);
    dispatch(updateEstimations({ marketEstimation }));
  }, [markets, budgetData.totalBudget, setMarkets, dispatch]);

  const handlePercentageChange = useCallback((marketId: string, value: string) => {
    const percentage = Math.max(0, Math.min(100, parseFloat(value) || 0));
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const budget = (budgetData.totalBudget * percentage) / 100;
        
        // Redistribute budget among selected stations
        const selectedStations = market.stations.filter(s => s.selected);
        const updatedStations = market.stations.map(station => {
          if (station.selected && selectedStations.length > 0) {
            return {
              ...station,
              budget: budget / selectedStations.length
            };
          }
          return station;
        });

        return {
          ...market,
          percentage,
          budget,
          stations: updatedStations
        };
      }
      return market;
    });

    setMarkets(updatedMarkets);
  }, [markets, budgetData.totalBudget, setMarkets]);

  const handleToggleDetailExpand = useCallback((marketId: string) => {
    const newExpanded = new Set(expandedDetails);
    if (newExpanded.has(marketId)) {
      newExpanded.delete(marketId);
    } else {
      newExpanded.add(marketId);
    }
    setExpandedDetails(newExpanded);
  }, [expandedDetails, setExpandedDetails]);

  const handleDetailSelect = useCallback((marketId: string, stationId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedStations = market.stations.map(station => {
          if (station.id === stationId) {
            return {
              ...station,
              selected: checked
            };
          }
          return station;
        });

        // Пересчитываем бюджет и проценты для выбранных станций
        const selectedStations = updatedStations.filter(s => s.selected);
        const selectedCount = selectedStations.length;
        
        if (selectedCount > 0) {
          const percentagePerStation = Math.round((100 / selectedCount) * 100) / 100;
          const budgetPerStation = market.budget / selectedCount;
          
          const recalculatedStations = updatedStations.map(station => ({
            ...station,
            percentage: station.selected ? percentagePerStation : 0,
            budget: station.selected ? budgetPerStation : 0
          }));

          return {
            ...market,
            stations: recalculatedStations
          };
        } else {
          // Если нет выбранных станций, обнуляем их бюджеты
          const clearedStations = updatedStations.map(station => ({
            ...station,
            percentage: 0,
            budget: 0
          }));

          return {
            ...market,
            stations: clearedStations
          };
        }
      }
      return market;
    });

    setMarkets(updatedMarkets);

    // Update estimations
    const marketEstimation = calculateMarketEstimation(updatedMarkets);
    dispatch(updateEstimations({ marketEstimation }));
  }, [markets, setMarkets, dispatch]);

  const handleDetailSelectAll = useCallback((marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedStations = market.stations.map(station => ({
          ...station,
          selected: checked,
            percentage: checked ? Math.round((100 / market.stations.length) * 100) / 100 : 0,
          budget: checked ? (market.budget / market.stations.length) : 0
        }));

        return {
          ...market,
          stations: updatedStations
        };
      }
      return market;
    });

    setMarkets(updatedMarkets);

    // Update estimations
    const marketEstimation = calculateMarketEstimation(updatedMarkets);
    dispatch(updateEstimations({ marketEstimation }));
  }, [markets, setMarkets, dispatch]);

  const handleDetailPercentageChange = useCallback((marketId: string, stationId: string, value: string) => {
    const percentage = Math.round(Math.max(0, Math.min(100, parseFloat(value) || 0)) * 100) / 100;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedStations = market.stations.map(station => {
          if (station.id === stationId) {
            const budget = (market.budget * percentage) / 100;
            return {
              ...station,
              percentage,
              budget
            };
          }
          return station;
        });

        return {
          ...market,
          stations: updatedStations
        };
      }
      return market;
    });

    setMarkets(updatedMarkets);

    // Update estimations
    const marketEstimation = calculateMarketEstimation(updatedMarkets);
    dispatch(updateEstimations({ marketEstimation }));
  }, [markets, setMarkets, dispatch]);

  return {
    handleSelectAll,
    handleSelect,
    handlePercentageChange,
    handleToggleDetailExpand,
    handleDetailSelect,
    handleDetailSelectAll,
    handleDetailPercentageChange
  };
};
