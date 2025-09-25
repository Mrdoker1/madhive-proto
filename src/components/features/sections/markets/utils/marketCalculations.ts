import type { MarketData } from '../types';

export const calculateBudgetAndPercentageDistribution = (
  availableMarkets: MarketData[], 
  selectedMarkets: MarketData[], 
  totalBudget: number
): MarketData[] => {
  if (selectedMarkets.length === 0) {
    return availableMarkets.map(market => ({ 
      ...market, 
      budget: 0,
      percentage: 0
    }));
  }

  const percentagePerMarket = 100 / selectedMarkets.length;
  
  return availableMarkets.map(market => {
    if (market.selected) {
      // Рассчитываем бюджет на основе процента от общего бюджета
      const budget = (totalBudget * percentagePerMarket) / 100;
      return {
        ...market,
        percentage: Math.round(percentagePerMarket * 100) / 100, // Округляем до 2 знаков
        budget: budget
      };
    } else {
      return {
        ...market,
        percentage: 0,
        budget: 0
      };
    }
  });
};

export const getTotalPercentage = (markets: MarketData[]): number => {
  let total = 0;
  
  markets.forEach(market => {
    // Добавляем процент основного рынка, если он выбран
    // Подрынки являются частью основного рынка, поэтому их проценты не суммируются с основным
    if (market.selected) {
      total += market.percentage;
    }
  });
  
  return total;
};

export const checkSubMarketOverallocation = (markets: MarketData[]): boolean => {
  return markets.some(market => {
    if (market.selected && market.details.length > 0) {
      const subMarketTotal = market.details
        .filter(detail => detail.selected)
        .reduce((sum, detail) => sum + detail.percentage, 0);
      return subMarketTotal > 100;
    }
    return false;
  });
};

export const getSelectedMarketsWithDetails = (markets: MarketData[]): MarketData[] => {
  return markets.filter(market => market.selected && market.details.length > 0);
};

export const distributePercentagesEvenly = (detailsCount: number): number => {
  return detailsCount > 0 ? Math.round((100 / detailsCount) * 100) / 100 : 0;
};
