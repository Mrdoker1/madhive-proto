import { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData } from '@/store/slices/campaignSlice';
import { marketsDatabase, type MarketData } from '@/data/marketsData';
import type { MarketHandlers, ValidationState } from '../types';
import { 
  getTotalPercentage, 
  checkSubMarketOverallocation, 
  getSelectedMarketsWithDetails,
  distributePercentagesEvenly
} from '../utils/marketCalculations';

export const useMarketsState = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());

  // Validation state
  const totalPercentage = getTotalPercentage(markets);
  const hasSubMarketOverallocation = checkSubMarketOverallocation(markets);
  const isOverHundredPercent = totalPercentage > 100 || hasSubMarketOverallocation;
  
  const validation: ValidationState = {
    totalPercentage,
    hasSubMarketOverallocation,
    isOverHundredPercent
  };

  // Derived state
  const selectedMarketsWithDetails = getSelectedMarketsWithDetails(markets);
  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  // Load markets when broadcasters change
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
      return;
    }

    // Собираем все рынки для выбранных broadcasters
    const allAvailableMarkets: MarketData[] = [];
    linearData.broadcasters.forEach(broadcaster => {
      if (marketsDatabase[broadcaster]) {
        allAvailableMarkets.push(...marketsDatabase[broadcaster]);
      }
    });

    // Проставляем статус selected на основе сохраненных данных
    const marketsWithSelection = allAvailableMarkets.map(market => ({
      ...market,
      selected: marketsData.selectedMarkets.includes(market.name)
    }));

    // Сохраняем уже введенные пользователем проценты и состояние подстанций
    const marketsWithPreservedData = marketsWithSelection.map(market => {
      // Ищем существующий рынок с теми же данными, чтобы сохранить введенные проценты
      const existingMarket = markets.find(m => m.id === market.id);
      if (existingMarket) {
        // Сохраняем процент и пересчитываем бюджет
        const budget = market.selected ? (budgetData.totalBudget * existingMarket.percentage) / 100 : 0;
        
        // Сохраняем состояние подстанций
        const preservedDetails = market.details.map(detail => {
          const existingDetail = existingMarket.details.find(d => d.id === detail.id);
          if (existingDetail) {
            // Пересчитываем бюджет для подстанции от бюджета основного рынка
            const detailBudget = (budget * existingDetail.percentage) / 100;
            return {
              ...detail,
              selected: existingDetail.selected,
              percentage: existingDetail.percentage,
              budget: detailBudget
            };
          }
          return detail;
        });
        
        return {
          ...market,
          percentage: market.selected ? existingMarket.percentage : 0,
          budget: budget,
          details: preservedDetails
        };
      }
      return {
        ...market,
        percentage: 0,
        budget: 0
      };
    });
    
    setMarkets(marketsWithPreservedData);
  }, [linearData.broadcasters, marketsData.selectedMarkets, budgetData.totalBudget]);

  // Auto-expand first detailed table for testing
  useEffect(() => {
    if (selectedMarketsWithDetails.length > 0 && expandedDetails.size === 0) {
      const firstMarketId = selectedMarketsWithDetails[0].id;
      setExpandedDetails(new Set([firstMarketId]));
    }
  }, [selectedMarketsWithDetails.length > 0 ? selectedMarketsWithDetails[0]?.id : null]);

  return {
    // State
    markets,
    expandedDetails,
    selectedMarketsWithDetails,
    allSelected,
    someSelected,
    validation,
    
    // Internal setters (for handlers)
    setMarkets,
    setExpandedDetails,
    
    // Redux data
    budgetData,
    dispatch
  };
};
