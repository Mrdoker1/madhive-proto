export interface DMAData {
  dmaCode: string;
  dmaName: string;
  state: string;
  impressions: number;
  grps: number;
  reach: number;
}

// Mock данные для DMA регионов - все 50 штатов США
export const dmaMapData: DMAData[] = [
  // Топ рынки
  { dmaCode: 'NY', dmaName: 'New York', state: 'NY', impressions: 1969227, grps: 850, reach: 1250000 },
  { dmaCode: 'LA', dmaName: 'Los Angeles', state: 'CA', impressions: 1750000, grps: 750, reach: 1100000 },
  { dmaCode: 'CHI', dmaName: 'Chicago', state: 'IL', impressions: 1450000, grps: 620, reach: 950000 },
  { dmaCode: 'PHI', dmaName: 'Philadelphia', state: 'PA', impressions: 1200000, grps: 510, reach: 820000 },
  { dmaCode: 'DAL', dmaName: 'Dallas-Fort Worth', state: 'TX', impressions: 1350000, grps: 580, reach: 900000 },
  { dmaCode: 'SF', dmaName: 'San Francisco', state: 'CA', impressions: 1280000, grps: 550, reach: 870000 },
  { dmaCode: 'BOS', dmaName: 'Boston', state: 'MA', impressions: 1100000, grps: 470, reach: 750000 },
  { dmaCode: 'ATL', dmaName: 'Atlanta', state: 'GA', impressions: 1320000, grps: 565, reach: 880000 },
  { dmaCode: 'WAS', dmaName: 'Washington DC', state: 'DC', impressions: 1250000, grps: 535, reach: 850000 },
  { dmaCode: 'HOU', dmaName: 'Houston', state: 'TX', impressions: 1180000, grps: 505, reach: 800000 },
  { dmaCode: 'DET', dmaName: 'Detroit', state: 'MI', impressions: 980000, grps: 420, reach: 680000 },
  { dmaCode: 'SEA', dmaName: 'Seattle-Tacoma', state: 'WA', impressions: 1050000, grps: 450, reach: 720000 },
  { dmaCode: 'PHX', dmaName: 'Phoenix', state: 'AZ', impressions: 1150000, grps: 490, reach: 780000 },
  { dmaCode: 'MIN', dmaName: 'Minneapolis-St. Paul', state: 'MN', impressions: 940000, grps: 400, reach: 650000 },
  { dmaCode: 'MIA', dmaName: 'Miami-Fort Lauderdale', state: 'FL', impressions: 1220000, grps: 520, reach: 830000 },
  { dmaCode: 'DEN', dmaName: 'Denver', state: 'CO', impressions: 920000, grps: 390, reach: 630000 },
  { dmaCode: 'ORL', dmaName: 'Orlando', state: 'FL', impressions: 850000, grps: 360, reach: 580000 },
  { dmaCode: 'SAC', dmaName: 'Sacramento', state: 'CA', impressions: 780000, grps: 330, reach: 530000 },
  
  // Остальные штаты
  { dmaCode: 'AL', dmaName: 'Birmingham', state: 'AL', impressions: 650000, grps: 280, reach: 450000 },
  { dmaCode: 'AK', dmaName: 'Anchorage', state: 'AK', impressions: 320000, grps: 140, reach: 220000 },
  { dmaCode: 'AR', dmaName: 'Little Rock', state: 'AR', impressions: 480000, grps: 200, reach: 330000 },
  { dmaCode: 'CT', dmaName: 'Hartford', state: 'CT', impressions: 720000, grps: 310, reach: 490000 },
  { dmaCode: 'DE', dmaName: 'Wilmington', state: 'DE', impressions: 420000, grps: 180, reach: 290000 },
  { dmaCode: 'HI', dmaName: 'Honolulu', state: 'HI', impressions: 550000, grps: 235, reach: 380000 },
  { dmaCode: 'ID', dmaName: 'Boise', state: 'ID', impressions: 450000, grps: 190, reach: 310000 },
  { dmaCode: 'IN', dmaName: 'Indianapolis', state: 'IN', impressions: 880000, grps: 375, reach: 600000 },
  { dmaCode: 'IA', dmaName: 'Des Moines', state: 'IA', impressions: 520000, grps: 220, reach: 360000 },
  { dmaCode: 'KS', dmaName: 'Kansas City', state: 'KS', impressions: 680000, grps: 290, reach: 470000 },
  { dmaCode: 'KY', dmaName: 'Louisville', state: 'KY', impressions: 630000, grps: 270, reach: 440000 },
  { dmaCode: 'LA', dmaName: 'New Orleans', state: 'LA', impressions: 750000, grps: 320, reach: 520000 },
  { dmaCode: 'ME', dmaName: 'Portland', state: 'ME', impressions: 380000, grps: 160, reach: 260000 },
  { dmaCode: 'MD', dmaName: 'Baltimore', state: 'MD', impressions: 890000, grps: 380, reach: 610000 },
  { dmaCode: 'MS', dmaName: 'Jackson', state: 'MS', impressions: 410000, grps: 175, reach: 280000 },
  { dmaCode: 'MO', dmaName: 'St. Louis', state: 'MO', impressions: 820000, grps: 350, reach: 560000 },
  { dmaCode: 'MT', dmaName: 'Billings', state: 'MT', impressions: 340000, grps: 145, reach: 235000 },
  { dmaCode: 'NE', dmaName: 'Omaha', state: 'NE', impressions: 560000, grps: 240, reach: 390000 },
  { dmaCode: 'NV', dmaName: 'Las Vegas', state: 'NV', impressions: 920000, grps: 395, reach: 640000 },
  { dmaCode: 'NH', dmaName: 'Manchester', state: 'NH', impressions: 440000, grps: 190, reach: 305000 },
  { dmaCode: 'NJ', dmaName: 'Newark', state: 'NJ', impressions: 1050000, grps: 450, reach: 720000 },
  { dmaCode: 'NM', dmaName: 'Albuquerque', state: 'NM', impressions: 530000, grps: 225, reach: 370000 },
  { dmaCode: 'NC', dmaName: 'Charlotte', state: 'NC', impressions: 960000, grps: 410, reach: 660000 },
  { dmaCode: 'ND', dmaName: 'Fargo', state: 'ND', impressions: 310000, grps: 130, reach: 215000 },
  { dmaCode: 'OH', dmaName: 'Cleveland', state: 'OH', impressions: 950000, grps: 405, reach: 650000 },
  { dmaCode: 'OK', dmaName: 'Oklahoma City', state: 'OK', impressions: 670000, grps: 285, reach: 465000 },
  { dmaCode: 'OR', dmaName: 'Portland', state: 'OR', impressions: 870000, grps: 370, reach: 600000 },
  { dmaCode: 'RI', dmaName: 'Providence', state: 'RI', impressions: 490000, grps: 210, reach: 340000 },
  { dmaCode: 'SC', dmaName: 'Columbia', state: 'SC', impressions: 610000, grps: 260, reach: 425000 },
  { dmaCode: 'SD', dmaName: 'Sioux Falls', state: 'SD', impressions: 350000, grps: 150, reach: 245000 },
  { dmaCode: 'TN', dmaName: 'Nashville', state: 'TN', impressions: 910000, grps: 390, reach: 630000 },
  { dmaCode: 'UT', dmaName: 'Salt Lake City', state: 'UT', impressions: 720000, grps: 310, reach: 500000 },
  { dmaCode: 'VT', dmaName: 'Burlington', state: 'VT', impressions: 290000, grps: 125, reach: 200000 },
  { dmaCode: 'VA', dmaName: 'Richmond', state: 'VA', impressions: 840000, grps: 360, reach: 580000 },
  { dmaCode: 'WV', dmaName: 'Charleston', state: 'WV', impressions: 370000, grps: 160, reach: 255000 },
  { dmaCode: 'WI', dmaName: 'Milwaukee', state: 'WI', impressions: 780000, grps: 335, reach: 540000 },
  { dmaCode: 'WY', dmaName: 'Cheyenne', state: 'WY', impressions: 270000, grps: 115, reach: 185000 }
];

// Функция для получения цвета зоны в зависимости от значения метрики
export const getColorForValue = (value: number, metric: 'impressions' | 'grps' | 'reach'): string => {
  const maxValues = {
    impressions: 2000000,
    grps: 900,
    reach: 1300000
  };

  const max = maxValues[metric];
  const percentage = (value / max) * 100;

  if (percentage >= 75) return '#059669'; // Dark green
  if (percentage >= 50) return '#10b981'; // Green
  if (percentage >= 25) return '#6ee7b7'; // Light green
  return '#d1fae5'; // Very light green
};

// Форматирование чисел для отображения
export const formatMetricValue = (value: number, metric: 'impressions' | 'grps' | 'reach'): string => {
  if (metric === 'grps') {
    return value.toLocaleString('en-US');
  }
  return value.toLocaleString('en-US');
};

