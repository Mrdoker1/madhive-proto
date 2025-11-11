import { allBroadcasterStations } from './stations';

export interface StationData {
  id: string;
  name: string;
  marketId: string;
  broadcasterId: string;
  cpm: string;
  marketShare: number;
  audienceSize: number;
}

// Generate stations based on new data from stations folder
export const stationsData: StationData[] = [];

// Fill stationsData from new structure with guaranteed ID uniqueness
let globalStationIndex = 0;
const usedCombinations = new Set<string>(); // Track used combinations to prevent duplicates

allBroadcasterStations.forEach(broadcaster => {
  broadcaster.stations.forEach((station) => {
    // Create market ID from DMA
    const marketId = station.associatedDma 
      ? station.associatedDma.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : `unknown-${globalStationIndex}`;
    
    // Create unique combination key to check for duplicates
    const combinationKey = `${broadcaster.broadcasterId}|${station.station}|${marketId}`;
    
    // Skip if this exact combination already exists
    if (usedCombinations.has(combinationKey)) {
      return;
    }
    usedCombinations.add(combinationKey);
    
    // Generate station ID
    const stationName = station.station.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const marketPart = marketId.substring(0, 20);
    const stationId = `${broadcaster.broadcasterId}-${stationName}-${marketPart}`;
    
    stationsData.push({
      id: stationId,
      name: station.station,
      marketId: marketId,
      broadcasterId: broadcaster.broadcasterId,
      cpm: '$' + (Math.random() * 10 + 15).toFixed(2), // Generate CPM from $15 to $25
      marketShare: Math.floor(Math.random() * 40) + 10, // From 10% to 50%
      audienceSize: Math.floor(Math.random() * 3000000) + 500000 // From 500k to 3.5M
    });
    
    globalStationIndex++;
  });
});

// Functions for working with stations
export const getStationsByMarket = (marketId: string): StationData[] => {
  return stationsData.filter(station => station.marketId === marketId);
};

export const getStationsByBroadcaster = (broadcasterId: string): StationData[] => {
  return stationsData.filter(station => station.broadcasterId === broadcasterId);
};

export const getStationsByMarketAndBroadcaster = (marketId: string, broadcasterId: string): StationData[] => {
  return stationsData.filter(station => station.marketId === marketId && station.broadcasterId === broadcasterId);
};

export const getStationById = (id: string): StationData | undefined => {
  return stationsData.find(station => station.id === id);
};

export const getAvailableMarkets = (broadcasterIds: string[]): string[] => {
  const marketIds = new Set<string>();
  stationsData.forEach(station => {
    if (broadcasterIds.includes(station.broadcasterId)) {
      marketIds.add(station.marketId);
    }
  });
  return Array.from(marketIds);
};

export const getAvailableBroadcasters = (marketIds: string[]): string[] => {
  const broadcasterIds = new Set<string>();
  stationsData.forEach(station => {
    if (marketIds.includes(station.marketId)) {
      broadcasterIds.add(station.broadcasterId);
    }
  });
  return Array.from(broadcasterIds);
};
