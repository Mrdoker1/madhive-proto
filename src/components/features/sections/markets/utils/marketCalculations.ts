import type { MarketWithStationsData, StationSelectionData } from '../types';

/**
 * Вычисляет Impressions по формуле: Impressions = (Total Campaign Cost / CPM) × 1,000
 * @param budget - общий бюджет кампании для данной станции
 * @param cpmString - строковое значение CPM (например, "$12.50")
 * @returns отформатированная строка impressions (например, "2.1M")
 */
export const calculateStationImpressions = (budget: number, cpmString: string): string => {
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
 * Вычисляет Impressions для основного маркета
 * Если есть выбранные станции, возвращает сумму их impressions
 * Иначе возвращает 0
 */
export const calculateMarketImpressions = (market: MarketWithStationsData): string => {
  if (market.budget === 0) return '0';
  
  // Проверяем, есть ли выбранные станции
  const selectedStations = market.stations.filter(station => station.selected);
  
  if (selectedStations.length > 0) {
    // Суммируем impressions всех выбранных станций
    let totalImpressions = 0;
    
    selectedStations.forEach(station => {
      if (station.budget > 0) {
        const cpm = parseFloat(station.cpm.replace('$', ''));
        if (cpm > 0) {
          totalImpressions += (station.budget / cpm) * 1000;
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
    // Если станции не выбраны, возвращаем 0
    return '0';
  }
};

/**
 * Вычисляет общий процент для всех маркетов
 */
export const getTotalPercentage = (markets: MarketWithStationsData[]): number => {
  return markets.reduce((total, market) => {
    if (market.selected) {
      return total + market.percentage;
    }
    return total;
  }, 0);
};

/**
 * Проверяет, есть ли переаллокация в станциях (сумма процентов > 100%)
 */
export const checkStationOverallocation = (markets: MarketWithStationsData[]): boolean => {
  return markets.some(market => {
    if (market.selected && market.stations.length > 0) {
      const stationTotal = market.stations
        .filter(station => station.selected)
        .reduce((sum, station) => sum + station.percentage, 0);
      return stationTotal > 100;
    }
    return false;
  });
};

/**
 * Вычисляет Market Estimation на основе выбранных станций
 * @param markets - массив маркетов с их текущим состоянием
 * @returns общий размер аудитории выбранных станций
 */
export const calculateMarketEstimation = (markets: MarketWithStationsData[]): number => {
  let totalAudienceSize = 0;
  
  markets.forEach(market => {
    if (market.selected) {
      // Суммируем audienceSize всех выбранных станций
      const selectedStations = market.stations.filter(station => station.selected);
      selectedStations.forEach(station => {
        totalAudienceSize += station.audienceSize;
      });
    }
  });
  
  return totalAudienceSize;
};
