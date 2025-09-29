export interface BroadcasterData {
  id: string;
  name: string;
  displayName: string;
}

// Список всех доступных бродкастеров
export const broadcastersData: BroadcasterData[] = [
  { id: 'abc', name: 'ABC', displayName: 'ABC' },
  { id: 'cbs', name: 'CBS', displayName: 'CBS' },
  { id: 'nbc', name: 'NBC', displayName: 'NBC' },
  { id: 'gray', name: 'Gray', displayName: 'Gray' },
  { id: 'nexstar', name: 'Nexstar', displayName: 'Nexstar' },
  { id: 'hearst', name: 'Hearst', displayName: 'Hearst' },
  { id: 'tegna', name: 'TEGNA', displayName: 'TEGNA' },
  { id: 'scripps', name: 'Scripps', displayName: 'Scripps' },
  { id: 'news-press-gazette', name: 'News Press Gazette', displayName: 'News Press Gazette' },
  { id: 'morgan-murphy', name: 'Morgan Murphy', displayName: 'Morgan Murphy' },
  { id: 'hubbard-broadcasting', name: 'Hubbard Broadcasting', displayName: 'Hubbard Broadcasting' },
  { id: 'univision', name: 'Univision', displayName: 'Univision' },
  { id: 'entravision', name: 'Entravision', displayName: 'Entravision' }
];

// Функция для получения бродкастера по ID
export const getBroadcasterById = (id: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.id === id);
};

// Функция для получения бродкастера по названию
export const getBroadcasterByName = (name: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.name === name);
};
