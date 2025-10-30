import type { MarketWithStationsData, StationSelectionData } from '../types';

/**
 * Calculates Impressions using formula: Impressions = (Total Campaign Cost / CPM) × 1,000
 * @param budget - total campaign budget for this station
 * @param cpmString - CPM string value (e.g., "$12.50")
 * @returns formatted impressions string (e.g., "2.1M")
 */
export const calculateStationImpressions = (budget: number, cpmString: string): string => {
  if (budget === 0) return '0';
  
  // Extract numeric CPM value from string (remove $ and parse)
  const cpm = parseFloat(cpmString.replace('$', ''));
  if (cpm === 0) return '0';
  
  // Formula: Impressions = (Total Campaign Cost / CPM) × 1,000
  const impressions = (budget / cpm) * 1000;
  
  // Format result (K for thousands, M for millions)
  if (impressions >= 1000000) {
    return `${(impressions / 1000000).toFixed(1)}M`;
  } else if (impressions >= 1000) {
    return `${(impressions / 1000).toFixed(0)}K`;
  } else {
    return impressions.toFixed(0);
  }
};

/**
 * Calculates Impressions for main market
 * If there are selected stations, returns sum of their impressions
 * Otherwise returns 0
 */
export const calculateMarketImpressions = (market: MarketWithStationsData): string => {
  if (market.budget === 0) return '0';
  
  // Check if there are selected stations
  const selectedStations = market.stations.filter(station => station.selected);
  
  if (selectedStations.length > 0) {
    // Sum impressions of all selected stations
    let totalImpressions = 0;
    
    selectedStations.forEach(station => {
      if (station.budget > 0) {
        const cpm = parseFloat(station.cpm.replace('$', ''));
        if (cpm > 0) {
          totalImpressions += (station.budget / cpm) * 1000;
        }
      }
    });
    
    // Format result
    if (totalImpressions >= 1000000) {
      return `${(totalImpressions / 1000000).toFixed(1)}M`;
    } else if (totalImpressions >= 1000) {
      return `${(totalImpressions / 1000).toFixed(0)}K`;
    } else {
      return totalImpressions.toFixed(0);
    }
  } else {
    // If no stations selected, return 0
    return '0';
  }
};

/**
 * Calculates total percentage for all markets
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
 * Checks if there is station overallocation (sum of percentages > 100%)
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
 * Calculates Market Estimation based on selected markets
 * @param markets - array of markets with their current state
 * @returns total audience size of selected markets
 */
export const calculateMarketEstimation = (markets: MarketWithStationsData[]): number => {
  let totalMarketSize = 0;
  
  markets.forEach(market => {
    if (market.selected && market.marketSize) {
      // Sum marketSize of all selected markets
      totalMarketSize += market.marketSize;
    }
  });
  
  return totalMarketSize;
};
