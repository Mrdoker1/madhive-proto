import { getAllUniqueDMAs } from './stations';

export interface MarketInfo {
  id: string;
  name: string;
  displayName: string;
  rank: number;
  marketSize: number; // размер аудитории
}

// Генерируем markets на основе уникальных DMA из новых station files
const uniqueDMAs = getAllUniqueDMAs();

export const marketsData: MarketInfo[] = uniqueDMAs.map((dma, index) => {
  // Создаем ID из DMA
  const id = dma.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  // Используем полное название DMA для name и displayName, чтобы избежать дубликатов
  const name = dma;
  const displayName = dma;
  
  return {
    id,
    name,
    displayName: `${displayName} (${index + 1})`,
    rank: index + 1,
    marketSize: Math.floor(Math.random() * 5000000) + 1000000 // От 1M до 6M
  };
});

// Функции для получения данных
export const getMarketById = (id: string): MarketInfo | undefined => {
  return marketsData.find(market => market.id === id);
};

export const getMarketByName = (name: string): MarketInfo | undefined => {
  return marketsData.find(market => market.name === name);
};

export const getMarketsByRegion = (region: string): MarketInfo[] => {
  // Простая фильтрация по region (можно расширить позже)
  return marketsData.filter(market => market.displayName.includes(region));
};
