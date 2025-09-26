import type { MarketData } from '../types';
import type { MarketData as MarketDbData } from '@/data/marketsData';

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

/**
 * Вычисляет Market Estimation на основе выбранных рынков и подстанций
 * @param markets - массив рынков с их текущим состоянием (выбраны/не выбраны)
 * @returns общий размер аудитории выбранных рынков и подстанций
 */
export const calculateMarketEstimation = (markets: MarketDbData[]): number => {
  let totalMarketSize = 0;
  
  markets.forEach(market => {
    if (market.selected) {
      // Проверяем, есть ли выбранные подстанции
      const selectedDetails = market.details.filter(detail => detail.selected);
      
      if (selectedDetails.length > 0) {
        // Если есть выбранные подстанции, суммируем их marketSize
        selectedDetails.forEach(detail => {
          totalMarketSize += detail.marketSize;
        });
      } else {
        // Если подстанций нет или они не выбраны, используем marketSize основного рынка
        totalMarketSize += market.marketSize;
      }
    }
  });
  
  return totalMarketSize;
};

/**
 * Вычисляет Impressions по формуле: Impressions = (Total Campaign Cost / CPM) × 1,000
 * @param budget - общий бюджет кампании для данного рынка/подстанции
 * @param cpmString - строковое значение CPM (например, "$12.50")
 * @returns отформатированная строка impressions (например, "2.1M")
 */
export const calculateImpressions = (budget: number, cpmString: string): string => {
  if (budget === 0) return '0';
  
  // Извлекаем числовое значение CPM из строки (убираем $ и парсим)
  const cpm = parseFloat(cpmString.replace('$', ''));
  if (cpm === 0) return '0';
  
  // Формула: Impressions = (Total Campaign Cost / CPM) × 1,000
  const impressions = (budget / cpm) * 1000;
  
  // Форматируем результат (K для тысяч, M для миллионов)
  if (impressions >= 1000000) {
    return `${(impressions / 1000000).toFixed(1)}M`;
  } else if (impressions >= 1000) {
    return `${(impressions / 1000).toFixed(0)}K`;
  } else {
    return impressions.toFixed(0);
  }
};

/**
 * Вычисляет Impressions для основного рынка
 * Если есть выбранные подстанции, возвращает сумму их impressions
 * Иначе использует собственный CPM и бюджет рынка
 */
export const calculateMarketImpressions = (market: MarketDbData): string => {
  if (market.budget === 0) return '0';
  
  // Проверяем, есть ли выбранные подстанции
  const selectedDetails = market.details.filter(detail => detail.selected);
  
  if (selectedDetails.length > 0) {
    // Суммируем impressions всех выбранных подстанций
    let totalImpressions = 0;
    
    selectedDetails.forEach(detail => {
      if (detail.budget > 0) {
        const cpm = parseFloat(detail.cpm.replace('$', ''));
        if (cpm > 0) {
          totalImpressions += (detail.budget / cpm) * 1000;
        }
      }
    });
    
    // Форматируем результат
    if (totalImpressions >= 1000000) {
      return `${(totalImpressions / 1000000).toFixed(1)}M`;
    } else if (totalImpressions >= 1000) {
      return `${(totalImpressions / 1000).toFixed(0)}K`;
    } else {
      return totalImpressions.toFixed(0);
    }
  } else {
    // Если подстанции не выбраны, используем CPM основного рынка
    return calculateImpressions(market.budget, market.cpm);
  }
};
