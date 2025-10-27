/**
 * Dashboard Data
 * 
 * Этот файл содержит данные о кампаниях для дашборда с географическими DMA зонами.
 * 
 * Доступные кампании с DMA данными:
 * - Ford Motor Company: Ford Mach-E EV Intro, Q3 25 Ford F150 TRISTATE
 * - Toyota Motor Company: Toyota Q3 Brand Push
 * - Chevrolet: Chevy Silverado Summer Sale
 * - Ram Trucks: August Ram Truck Month
 * - Hyundai: Hyundai Sonata Sept Event
 * - Lincoln: Lincoln Aviator Luxury
 * - Jeep: JGC Holiday Pre-Launch
 * 
 * Для просмотра DMA зон выберите Advertiser и Campaign в фильтрах Dashboard.
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
  // Ford Motor Company campaigns
  {
    id: "ford-mach-e-ev",
    advertiser: "Ford Motor Company",
    campaign: "Ford Mach-E EV Intro",
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
    id: "q3-ford-f150",
    advertiser: "Ford Motor Company",
    campaign: "Q3 25 Ford F150 TRISTATE",
    impressions: 2987654,
    impressionsTrend: [95000, 98000, 102000, 105000, 108000, 112000, 115000, 118000, 121000, 124000],
    reach: 1234567,
    reachTrend: [70000, 135000, 195000, 250000, 300000, 345000, 385000, 425000, 460000, 495000],
    frequency: 2.2,
    frequencyTrend: [1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8, 1.8, 1.9],
    incrementalReach: 543210,
    incrementalReachTrend: [35000, 68000, 98000, 125000, 150000, 173000, 193000, 213000, 230000, 248000],
    uniqueReach: 876543,
    uniqueReachTrend: [55000, 105000, 152000, 195000, 233000, 268000, 300000, 330000, 358000, 385000],
  },
  // Toyota campaigns
  {
    id: "toyota-q3-brand",
    advertiser: "Toyota Motor Company",
    campaign: "Toyota Q3 Brand Push",
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
  },
  // Chevrolet campaigns
  {
    id: "chevy-silverado",
    advertiser: "Chevrolet",
    campaign: "Chevy Silverado Summer Sale",
    impressions: 4234789,
    impressionsTrend: [135000, 140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000],
    reach: 2123456,
    reachTrend: [110000, 215000, 315000, 410000, 500000, 585000, 665000, 740000, 810000, 875000],
    frequency: 2.0,
    frequencyTrend: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1],
    incrementalReach: 987654,
    incrementalReachTrend: [55000, 108000, 158000, 205000, 250000, 293000, 333000, 370000, 405000, 438000],
    uniqueReach: 1654321,
    uniqueReachTrend: [85000, 167000, 245000, 318000, 388000, 454000, 517000, 575000, 630000, 680000],
  },
  // Ram campaigns
  {
    id: "august-ram-truck",
    advertiser: "Ram Trucks",
    campaign: "August Ram Truck Month",
    impressions: 3824567,
    impressionsTrend: [120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 160000, 165000],
    reach: 1876234,
    reachTrend: [95000, 185000, 270000, 350000, 425000, 495000, 560000, 620000, 675000, 730000],
    frequency: 2.1,
    frequencyTrend: [1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2],
    incrementalReach: 876234,
    incrementalReachTrend: [48000, 93000, 135000, 175000, 213000, 248000, 280000, 310000, 338000, 365000],
    uniqueReach: 1456789,
    uniqueReachTrend: [74000, 144000, 210000, 272000, 330000, 385000, 435000, 482000, 525000, 567000],
  },
  // Hyundai campaigns
  {
    id: "hyundai-sonata-sept",
    advertiser: "Hyundai",
    campaign: "Hyundai Sonata Sept Event",
    impressions: 5123456,
    impressionsTrend: [165000, 170000, 175000, 180000, 185000, 190000, 195000, 200000, 205000, 210000],
    reach: 2987654,
    reachTrend: [155000, 305000, 450000, 590000, 725000, 855000, 980000, 1100000, 1215000, 1325000],
    frequency: 1.7,
    frequencyTrend: [1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.6],
    incrementalReach: 1345678,
    incrementalReachTrend: [78000, 153000, 225000, 295000, 363000, 428000, 490000, 550000, 608000, 663000],
    uniqueReach: 2345678,
    uniqueReachTrend: [120000, 237000, 350000, 458000, 563000, 664000, 761000, 855000, 943000, 1030000],
  },
  // Lincoln campaigns
  {
    id: "lincoln-aviator-luxury",
    advertiser: "Lincoln",
    campaign: "Lincoln Aviator Luxury",
    impressions: 4123456,
    impressionsTrend: [132000, 137000, 142000, 147000, 152000, 157000, 162000, 167000, 172000, 177000],
    reach: 2345678,
    reachTrend: [125000, 245000, 360000, 470000, 575000, 675000, 770000, 860000, 945000, 1025000],
    frequency: 1.8,
    frequencyTrend: [1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.6],
    incrementalReach: 1123456,
    incrementalReachTrend: [63000, 123000, 180000, 235000, 288000, 338000, 385000, 430000, 473000, 513000],
    uniqueReach: 1876543,
    uniqueReachTrend: [97000, 190000, 280000, 365000, 447000, 525000, 598000, 668000, 735000, 797000],
  },
  // Jeep campaigns
  {
    id: "jgc-holiday-pre",
    advertiser: "Jeep",
    campaign: "JGC Holiday Pre-Launch",
    impressions: 5123456,
    impressionsTrend: [165000, 170000, 175000, 180000, 185000, 190000, 195000, 200000, 205000, 210000],
    reach: 2876543,
    reachTrend: [145000, 285000, 420000, 550000, 675000, 795000, 910000, 1020000, 1125000, 1225000],
    frequency: 1.8,
    frequencyTrend: [1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.6],
    incrementalReach: 1298765,
    incrementalReachTrend: [73000, 143000, 210000, 275000, 338000, 398000, 455000, 510000, 563000, 613000],
    uniqueReach: 2234567,
    uniqueReachTrend: [113000, 222000, 327000, 428000, 525000, 618000, 707000, 792000, 875000, 952000],
  }
];
