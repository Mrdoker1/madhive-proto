export interface MarketInfo {
  id: string;
  name: string;
  displayName: string;
  rank: number;
  marketSize: number; // размер аудитории
}

// Список всех доступных маркетов
export const marketsData: MarketInfo[] = [
  {
    id: 'new-york-ny',
    name: 'New York, NY',
    displayName: 'New York, NY (1)',
    rank: 1,
    marketSize: 8400000
  },
  {
    id: 'los-angeles-ca',
    name: 'Los Angeles, CA',
    displayName: 'Los Angeles, CA (2)',
    rank: 2,
    marketSize: 13200000
  },
  {
    id: 'chicago-il',
    name: 'Chicago, IL',
    displayName: 'Chicago, IL (3)',
    rank: 3,
    marketSize: 9600000
  },
  {
    id: 'dallas-ft-worth-tx',
    name: 'Dallas-Ft. Worth, TX',
    displayName: 'Dallas-Ft. Worth, TX (4)',
    rank: 4,
    marketSize: 7600000
  },
  {
    id: 'philadelphia-pa',
    name: 'Philadelphia, PA',
    displayName: 'Philadelphia, PA (5)',
    rank: 5,
    marketSize: 6200000
  },
  {
    id: 'houston-tx',
    name: 'Houston, TX',
    displayName: 'Houston. TX (6)',
    rank: 6,
    marketSize: 7100000
  },
  {
    id: 'atlanta-ga',
    name: 'Atlanta, GA',
    displayName: 'Atlanta, GA (7)',
    rank: 7,
    marketSize: 6100000
  },
  {
    id: 'washington-dc',
    name: 'Washington, DC',
    displayName: 'Washington, DC (Hagerstown, MD) (8)',
    rank: 8,
    marketSize: 6300000
  },
  {
    id: 'boston-ma',
    name: 'Boston, MA',
    displayName: 'Boston, MA (Manchester, NH) (9)',
    rank: 9,
    marketSize: 4900000
  },
  {
    id: 'san-francisco-ca',
    name: 'San Francisco-Oakland-San Jose, CA',
    displayName: 'San Francisco-Oakland-San Jose, CA (10)',
    rank: 10,
    marketSize: 7800000
  },
  {
    id: 'tampa-st-petersburg-fl',
    name: 'Tampa-St. Petersburg (Sarasota), FL',
    displayName: 'Tampa-St. Petersburg (Sarasota), FL (11)',
    rank: 11,
    marketSize: 3200000
  },
  {
    id: 'phoenix-az',
    name: 'Phoenix (Prescott), AZ',
    displayName: 'Phoenix (Prescott), AZ (12)',
    rank: 12,
    marketSize: 5000000
  }
];

// Функция для получения маркета по ID
export const getMarketById = (id: string): MarketInfo | undefined => {
  return marketsData.find(market => market.id === id);
};

// Функция для получения маркета по названию
export const getMarketByName = (name: string): MarketInfo | undefined => {
  return marketsData.find(market => market.name === name);
};

// Функция для сортировки маркетов по рангу
export const getMarketsSortedByRank = (): MarketInfo[] => {
  return [...marketsData].sort((a, b) => a.rank - b.rank);
};
