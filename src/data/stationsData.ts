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

// Генерируем stations на основе новых данных из папки stations
export const stationsData: StationData[] = [];

// Заполняем stationsData из новой структуры
let globalStationIndex = 0;
allBroadcasterStations.forEach(broadcaster => {
  broadcaster.stations.forEach((station) => {
    // Создаем market ID из DMA
    const marketId = station.associatedDma 
      ? station.associatedDma.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : `unknown-${globalStationIndex}`;
    
    // Генерируем уникальный ID станции (broadcaster + station + market для уникальности)
    const stationName = station.station.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const marketPart = marketId.substring(0, 20); // Используем часть market ID для уникальности
    const stationId = `${broadcaster.broadcasterId}-${stationName}-${marketPart}`;
    
    stationsData.push({
      id: stationId,
      name: station.station,
      marketId: marketId,
      broadcasterId: broadcaster.broadcasterId,
      cpm: '$' + (Math.random() * 10 + 15).toFixed(2), // Генерируем CPM от $15 до $25
      marketShare: Math.floor(Math.random() * 40) + 10, // От 10% до 50%
      audienceSize: Math.floor(Math.random() * 3000000) + 500000 // От 500k до 3.5M
    });
    
    globalStationIndex++;
  });
});

// Функции для работы со станциями
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
