/**
 * Dashboard Data
 * 
 * Этот файл содержит 3 кейса для демонстрации различных состояний дашборда:
 * 
 * Кейс 1 (Example 1): Ford Motor Company - F-150 'Built Ford Tough' Q4
 * Кейс 2 (Example 2): Stellantis - Wrangler 'Go Anywhere, Do Anything'
 * Кейс 3 (Example 3): Toyota Motor Company - Toyota 'Let's Go Places' Brand
 * 
 * Для переключения между кейсами используйте фильтр "Advertiser" на странице Dashboard:
 * - Выберите "Ford Motor Company" для отображения кейса 1
 * - Выберите "Stellantis" для отображения кейса 2
 * - Выберите "Toyota Motor Company" для отображения кейса 3
 * - Не выбирайте ничего для отображения всех кейсов вместе
 */

export interface CampaignTableRow {
  id: string;
  advertiser: string;
  campaign: string;
  impressions: number;
  impressionsTrend: number[];
  reach: number;
  reachTrend: number[];
  frequency: number;
  frequencyTrend: number[];
  incrementalReach: number;
  incrementalReachTrend: number[];
  uniqueReach: number;
  uniqueReachTrend: number[];
}

export const campaignTableData: CampaignTableRow[] = [
  {
    id: "Example 1",
    advertiser: "Ford Motor Company",
    campaign: "F-150 'Built Ford Tough' Q4",
    impressions: 3510420,
    impressionsTrend: [110543, 115234, 121876, 120543, 105876, 98432, 101234, 118765, 123456, 125678],
    reach: 1450110,
    reachTrend: [85000, 165000, 240000, 310000, 375000, 435000, 490000, 545000, 600000, 650000],
    frequency: 2.4,
    frequencyTrend: [1.3, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8],
    incrementalReach: 625500,
    incrementalReachTrend: [40000, 78000, 113000, 145000, 175000, 203000, 228000, 252000, 275000, 298000],
    uniqueReach: 915230,
    uniqueReachTrend: [65000, 125000, 180000, 230000, 275000, 315000, 355000, 390000, 425000, 460000],
  },
  {
    id: "Example 2",
    advertiser: "Stellantis",
    campaign: "Wrangler 'Go Anywhere, Do Anything",
    impressions: 4882195,
    impressionsTrend: [155100, 162300, 168900, 175200, 181500, 190100, 185400, 160200, 158800, 163400],
    reach: 2550830,
    reachTrend: [120000, 235000, 345000, 450000, 550000, 645000, 735000, 820000, 900000, 975000],
    frequency: 1.9,
    frequencyTrend: [1.29, 1.34, 1.38, 1.41, 1.45, 1.49, 1.52, 1.55, 1.57, 1.6],
    incrementalReach: 1315440,
    incrementalReachTrend: [70000, 135000, 198000, 258000, 315000, 369000, 420000, 468000, 513000, 555000],
    uniqueReach: 2105788,
    uniqueReachTrend: [],
  },
  {
    id: "Example 3",
    advertiser: "Toyota Motor Company",
    campaign: "Toyota 'Let's Go Places' Brand",
    impressions: 6125840,
    impressionsTrend: [201450, 205830, 210110, 215400, 220180, 225300, 218990, 195600, 198230, 202450],
    reach: 4050225,
    reachTrend: [250000, 490000, 720000, 940000, 1150000, 1350000, 1540000, 1720000, 1890000, 2050000],
    frequency: 1.5,
    frequencyTrend: [1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3],
    incrementalReach: 1850100,
    incrementalReachTrend: [110000, 215000, 315000, 410000, 500000, 585000, 665000, 740000, 810000, 875000],
    uniqueReach: 3780990,
    uniqueReachTrend: [230000, 450000, 660000, 860000, 1050000, 1230000, 1400000, 1560000, 1710000, 1850000],
  }
];
