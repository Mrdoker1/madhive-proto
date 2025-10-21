import { allBroadcasterStations } from './stations';

export interface BroadcasterData {
  id: string;
  name: string;
  displayName: string;
}

// Генерируем broadcasters на основе новых данных из папки stations
export const broadcastersData: BroadcasterData[] = allBroadcasterStations.map(broadcaster => ({
  id: broadcaster.broadcasterId,
  name: broadcaster.broadcasterName,
  displayName: broadcaster.broadcasterName
}));

// Функция для получения бродкастера по ID
export const getBroadcasterById = (id: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.id === id);
};

// Функция для получения бродкастера по названию
export const getBroadcasterByName = (name: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.name === name);
};
