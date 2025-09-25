import { useCallback } from 'react';
import { updateMarketsData } from '@/store/slices/campaignSlice';
import type { MarketData } from '@/data/marketsData';
import type { MarketHandlers } from '../types';
import { distributePercentagesEvenly } from '../utils/marketCalculations';

interface UseMarketsHandlersProps {
  markets: MarketData[];
  setMarkets: (markets: MarketData[]) => void;
  expandedDetails: Set<string>;
  setExpandedDetails: React.Dispatch<React.SetStateAction<Set<string>>>;
  budgetData: { totalBudget: number };
  dispatch: any;
}

export const useMarketsHandlers = ({
  markets,
  setMarkets,
  expandedDetails,
  setExpandedDetails,
  budgetData,
  dispatch
}: UseMarketsHandlersProps): MarketHandlers => {

  const handlePercentageChange = useCallback((marketId: string, value: string) => {
    // Разрешаем только цифры и точку для десятичных чисел
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    const numericValue = parseFloat(value) || 0;
    
    // Ограничиваем максимальным значением 100
    if (numericValue > 100) return;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        // Пересчитываем бюджет на основе нового процента
        const budget = (budgetData.totalBudget * numericValue) / 100;
        
        // Пересчитываем бюджеты подрынков на основе нового бюджета основного рынка
        const updatedDetails = market.details.map(detail => ({
          ...detail,
          budget: (budget * detail.percentage) / 100
        }));
        
        return {
          ...market,
          percentage: numericValue,
          budget: budget,
          details: updatedDetails
        };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
  }, [markets, budgetData.totalBudget, setMarkets]);

  const handleDetailSelect = useCallback((marketId: string, detailId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedDetails = market.details.map(detail => {
          if (detail.id === detailId) {
            return { 
              ...detail, 
              selected: checked,
              percentage: checked ? detail.percentage : 0,
              budget: checked ? detail.budget : 0
            };
          }
          return detail;
        });
        
        // Проверяем, остались ли выбранные подстанции
        const hasSelectedDetails = updatedDetails.some(detail => detail.selected);
        console.log(`Market ${market.name}: hasSelectedDetails = ${hasSelectedDetails}`, updatedDetails.map(d => ({ name: d.name, selected: d.selected })));
        
        // Если нет выбранных подстанций, снимаем выделение с основного рынка
        let updatedMarket = { 
          ...market, 
          details: updatedDetails
        };
        
        // Если нет выбранных подрынков, снимаем выделение с основного рынка
        if (!hasSelectedDetails) {
          console.log(`Deselecting main market: ${market.name}`);
          updatedMarket.selected = false;
          updatedMarket.percentage = 0;
          updatedMarket.budget = 0;
        }
        
        return updatedMarket;
      }
      return market;
    });
    
    // Обновляем selectedMarkets в Redux
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  }, [markets, setMarkets, dispatch]);

  const handleDetailPercentageChange = useCallback((marketId: string, detailId: string, value: string) => {
    // Разрешаем только цифры и точку для десятичных чисел
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    const numericValue = parseFloat(value) || 0;
    
    // Ограничиваем максимальным значением 100
    if (numericValue > 100) return;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedDetails = market.details.map(detail => {
          if (detail.id === detailId) {
            // Пересчитываем бюджет на основе нового процента от бюджета основного рынка
            const budget = (market.budget * numericValue) / 100;
            return {
              ...detail,
              percentage: numericValue,
              budget: budget
            };
          }
          return detail;
        });
        return { ...market, details: updatedDetails };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
  }, [markets, setMarkets]);

  const handleToggleDetailExpand = useCallback((marketId: string) => {
    setExpandedDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
      } else {
        newSet.add(marketId);
      }
      return newSet;
    });
  }, [setExpandedDetails]);

  const handleSelectAll = useCallback((checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      const newMarket = { ...market, selected: checked };
      if (!checked) {
        newMarket.percentage = 0;
        newMarket.budget = 0;
        newMarket.details = newMarket.details.map(detail => ({
          ...detail,
          selected: false,
          percentage: 0,
          budget: 0
        }));
      } else {
        // При выборе всех рынков, подрынки тоже выбираются с равномерным распределением
        const detailsCount = newMarket.details.length;
        const percentagePerDetail = distributePercentagesEvenly(detailsCount);
        
        newMarket.details = newMarket.details.map(detail => ({
          ...detail,
          selected: true,
          percentage: percentagePerDetail,
          budget: (newMarket.budget * percentagePerDetail) / 100
        }));
      }
      return newMarket;
    });
    
    const selectedMarketNames = checked ? updatedMarkets.map(market => market.name) : [];
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  }, [markets, setMarkets, dispatch]);

  const handleMarketSelect = useCallback((marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const newMarket = { ...market, selected: checked };
        
        // При снятии выделения сбрасываем процент и бюджет
        if (!checked) {
          newMarket.percentage = 0;
          newMarket.budget = 0;
          
          // Также снимаем выделение со всех подстанций
          newMarket.details = newMarket.details.map(detail => ({
            ...detail,
            selected: false,
            percentage: 0,
            budget: 0
          }));
        } else {
          // При выделении основного рынка выбираем все подстанции с равномерным распределением
          const detailsCount = newMarket.details.length;
          const percentagePerDetail = distributePercentagesEvenly(detailsCount);
          
          newMarket.details = newMarket.details.map(detail => {
            const percentage = percentagePerDetail;
            const budget = (newMarket.budget * percentage) / 100;
            
            return {
              ...detail,
              selected: true,
              percentage: percentage,
              budget: budget
            };
          });
        }
        
        return newMarket;
      }
      return market;
    });
    
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  }, [markets, setMarkets, dispatch]);

  const handleDetailSelectAll = useCallback((marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        // Обновляем все подрынки одновременно
        const updatedDetails = market.details.map(detail => ({
          ...detail,
          selected: checked,
          percentage: checked ? detail.percentage : 0,
          budget: checked ? detail.budget : 0
        }));
        
        // Проверяем, остались ли выбранные подстанции
        const hasSelectedDetails = updatedDetails.some(detail => detail.selected);
        console.log(`Market ${market.name}: Select All ${checked}, hasSelectedDetails = ${hasSelectedDetails}`);
        
        // Если нет выбранных подрынков, снимаем выделение с основного рынка
        let updatedMarket = { 
          ...market, 
          details: updatedDetails
        };
        
        if (!hasSelectedDetails) {
          console.log(`Deselecting main market via Select All: ${market.name}`);
          updatedMarket.selected = false;
          updatedMarket.percentage = 0;
          updatedMarket.budget = 0;
        }
        
        return updatedMarket;
      }
      return market;
    });
    
    // Обновляем selectedMarkets в Redux
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    console.log('Updated selectedMarketNames via Select All:', selectedMarketNames);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  }, [markets, setMarkets, dispatch]);

  return {
    handleMarketSelect,
    handlePercentageChange,
    handleDetailSelect,
    handleDetailPercentageChange,
    handleDetailSelectAll,
    handleSelectAll,
    handleToggleDetailExpand
  };
};
