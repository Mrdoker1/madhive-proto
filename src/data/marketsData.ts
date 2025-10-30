import { getAllUniqueDMAs } from './stations';

export interface MarketInfo {
  id: string;
  name: string;
  displayName: string;
  rank: number;
  marketSize: number; // audience size
}

// Generate markets based on unique DMAs from new station files
const uniqueDMAs = getAllUniqueDMAs();

export const marketsData: MarketInfo[] = uniqueDMAs.map((dma, index) => {
  // Create ID from DMA
  const id = dma.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  // Use full DMA name for name and displayName to avoid duplicates
  const name = dma;
  const displayName = dma;
  
  return {
    id,
    name,
    displayName: `${displayName} (${index + 1})`,
    rank: index + 1,
    marketSize: Math.floor(Math.random() * 5000000) + 1000000 // From 1M to 6M
  };
});

// Functions to get data
export const getMarketById = (id: string): MarketInfo | undefined => {
  return marketsData.find(market => market.id === id);
};

export const getMarketByName = (name: string): MarketInfo | undefined => {
  return marketsData.find(market => market.name === name);
};

export const getMarketsByRegion = (region: string): MarketInfo[] => {
  // Simple filtering by region (can be expanded later)
  return marketsData.filter(market => market.displayName.includes(region));
};
