export type CampaignStatus = 'On Target' | 'Way Under Pace' | 'Over Pace' | 'Way Over Pace' | 'Under Pace' | 'Not Started' | 'Completed';

export interface CampaignSummary {
  id: string;
  name: string;
  status: CampaignStatus;
  channels: string[]; // ['CTV','Social','Audio','Display','Linear TV']
  progressPercent: number; // 0..100
  progressDelivered: number;
  progressGoal: number;
  pacingPercent: number | null; // 0..100 or null for "Not Started" and "Completed"
  pacingDelivered: number;
  pacingTarget: number;
  deliveredImpressions: number;
  deliveredSpend: number; // Delivered Spend in dollars
  remainingImpression: number; // Remaining impressions
  remainingBudget: number; // Remaining budget in dollars
  sparkline: number[]; // small series for Delivered by Days
}

export const statusColor: Record<CampaignStatus, string> = {
  'On Target': '#22c55e',
  'Way Under Pace': '#ef4444',
  'Over Pace': '#38bdf8',
  'Way Over Pace': '#8b5cf6',
  'Under Pace': '#f59e0b',
  'Not Started': '#9ca3af',
  'Completed': '#10b981',
};

// Simple helper to generate pseudo sparkline data
const genSpark = (): number[] => Array.from({ length: 14 }, () => 60 + Math.round(Math.random() * 40));

// Deterministic pseudo-random generator (LCG)
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Deterministic sparkline with noise and rare spikes/drops
const genSparkByIndex = (index: number): number[] => {
  const rand = seededRandom(12345 + index * 97);
  const length = 24;
  const arr: number[] = [];
  let value = 70 + (index % 8) * 2;
  for (let i = 0; i < length; i++) {
    const trend = Math.sin((i + index) / 2.4) * 10; // base wave
    const noise = (rand() - 0.5) * 10; // noise
    value = 70 + trend + noise;
    // rare spikes/drops
    if (rand() > 0.92) value += 18;
    if (rand() < 0.08) value -= 16;
    arr.push(Math.max(40, Math.min(110, Math.round(value))));
  }
  return arr;
};

function makeCampaign(i: number): CampaignSummary {
  const statuses: CampaignStatus[] = ['On Target', 'Way Under Pace', 'Over Pace', 'Way Over Pace', 'Under Pace'];
  const channelsPool = [
    ['CTV', 'Social', 'Audio', 'Display'],
    ['Social', 'CTV', 'Audio'],
    ['Social', 'Linear TV'],
    ['Email', 'Search', 'Display', 'Audio'],
    ['CTV', 'Display'],
  ];
  const status = statuses[i % statuses.length];
  const channels = channelsPool[i % channelsPool.length];
  const goal = 1500000 + (i % 5) * 250000;
  const delivered = Math.floor(goal * (0.4 + (i % 10) * 0.05));
  const progressPercent = Math.min(100, +(delivered / goal * 100).toFixed(2));
  const pacingTarget = 1400000 + (i % 7) * 30000;
  const pacingDelivered = Math.min(pacingTarget - 10000 + i * 1234, pacingTarget + 50000);
  const pacingPercent = +((pacingDelivered / pacingTarget) * 100).toFixed(2);
  const avgCPM = 25 + (i % 10) * 2;
  const deliveredSpend = (delivered * avgCPM) / 1000;
  const remainingImpression = goal - delivered;
  const remainingBudget = (goal * avgCPM) / 1000 - deliveredSpend;

  return {
    id: `c${i}`,
    name: `Campaign_${i.toString().padStart(2, '0')} 08.01 - 08.${(i % 28) + 1}`,
    status,
    channels,
    progressPercent,
    progressDelivered: delivered,
    progressGoal: goal,
    pacingPercent,
    pacingDelivered,
    pacingTarget,
    deliveredImpressions: pacingDelivered,
    deliveredSpend,
    remainingImpression,
    remainingBudget,
    sparkline: genSparkByIndex(i),
  };
}

// Real mock campaigns from the table
const realMockCampaigns: CampaignSummary[] = [
  {
    id: 'real-1',
    name: 'Q4 25 HSP WEAT',
    status: 'Not Started',
    channels: ['Linear TV', 'CTV'],
    progressPercent: 0,
    progressDelivered: 0,
    progressGoal: 390250,
    pacingPercent: null,
    pacingDelivered: 0,
    pacingTarget: 0,
    deliveredImpressions: 0,
    deliveredSpend: 0,
    remainingImpression: 15610000,
    remainingBudget: 390250,
    sparkline: Array(24).fill(0),
  },
  {
    id: 'real-2',
    name: 'JGC HOLIDAY SALE Q425',
    status: 'Not Started',
    channels: ['Social', 'Display', 'CTV'],
    progressPercent: 0,
    progressDelivered: 0,
    progressGoal: 750000,
    pacingPercent: null,
    pacingDelivered: 0,
    pacingTarget: 0,
    deliveredImpressions: 0,
    deliveredSpend: 0,
    remainingImpression: 25000000,
    remainingBudget: 750000,
    sparkline: Array(24).fill(0),
  },
  {
    id: 'jgc-holiday-pre',
    name: 'JGC Holiday Pre-Launch',
    status: 'Over Pace',
    channels: ['Social', 'Display', 'Audio'],
    progressPercent: 20,
    progressDelivered: 400000,
    progressGoal: 2000000,
    pacingPercent: 118.52,
    pacingDelivered: 400000,
    pacingTarget: 337500,
    deliveredImpressions: 400000,
    deliveredSpend: 11200,
    remainingImpression: 1600000,
    remainingBudget: 44800,
    sparkline: genSparkByIndex(3),
  },
  {
    id: 'ford-mach-e-ev',
    name: 'Ford Mach-E EV Intro',
    status: 'Under Pace',
    channels: ['Linear TV', 'CTV', 'Display'],
    progressPercent: 88.22,
    progressDelivered: 1764400,
    progressGoal: 2000000,
    pacingPercent: 90.16,
    pacingDelivered: 1764400,
    pacingTarget: 1957143,
    deliveredImpressions: 1764400,
    deliveredSpend: 47638.8,
    remainingImpression: 235600,
    remainingBudget: 6361.2,
    sparkline: genSparkByIndex(4),
  },
  {
    id: 'toyota-q3-brand',
    name: 'Toyota Q3 Brand Push',
    status: 'Way Over Pace',
    channels: ['Linear TV', 'CTV', 'Social', 'Display'],
    progressPercent: 90.74,
    progressDelivered: 3175900,
    progressGoal: 3500000,
    pacingPercent: 132.5,
    pacingDelivered: 3175900,
    pacingTarget: 2395833,
    deliveredImpressions: 3175900,
    deliveredSpend: 79397.5,
    remainingImpression: 324100,
    remainingBudget: 8102.5,
    sparkline: genSparkByIndex(5),
  },
  {
    id: 'chevy-silverado',
    name: 'Chevy Silverado Summer Sale',
    status: 'Way Under Pace',
    channels: ['Linear TV', 'Display'],
    progressPercent: 50,
    progressDelivered: 1250000,
    progressGoal: 2500000,
    pacingPercent: 74.07,
    pacingDelivered: 1250000,
    pacingTarget: 1687500,
    deliveredImpressions: 1250000,
    deliveredSpend: 30000,
    remainingImpression: 1250000,
    remainingBudget: 30000,
    sparkline: genSparkByIndex(6),
  },
  {
    id: 'q3-ford-f150',
    name: 'Q3 25 Ford F150 TRISTATE',
    status: 'On Target',
    channels: ['Linear TV', 'CTV'],
    progressPercent: 68.32,
    progressDelivered: 2049600,
    progressGoal: 3000000,
    pacingPercent: 101.16,
    pacingDelivered: 2049600,
    pacingTarget: 2026667,
    deliveredImpressions: 2049600,
    deliveredSpend: 51240,
    remainingImpression: 950400,
    remainingBudget: 23760,
    sparkline: genSparkByIndex(7),
  },
  {
    id: 'hyundai-sonata-sept',
    name: 'Hyundai Sonata Sept Event',
    status: 'On Target',
    channels: ['Linear TV', 'Display', 'Social'],
    progressPercent: 68.32,
    progressDelivered: 1024800,
    progressGoal: 1500000,
    pacingPercent: 101.16,
    pacingDelivered: 1024800,
    pacingTarget: 1013333,
    deliveredImpressions: 1024800,
    deliveredSpend: 22545.6,
    remainingImpression: 475200,
    remainingBudget: 10454.4,
    sparkline: genSparkByIndex(8),
  },
  {
    id: 'lincoln-aviator-luxury',
    name: 'Lincoln Aviator Luxury',
    status: 'On Target',
    channels: ['Linear TV', 'CTV', 'Social'],
    progressPercent: 88.22,
    progressDelivered: 705760,
    progressGoal: 800000,
    pacingPercent: 100.11,
    pacingDelivered: 705760,
    pacingTarget: 705000,
    deliveredImpressions: 705760,
    deliveredSpend: 21172.8,
    remainingImpression: 94240,
    remainingBudget: 2827.2,
    sparkline: genSparkByIndex(9),
  },
  {
    id: 'dodge-charger-national',
    name: 'Dodge Charger National',
    status: 'On Target',
    channels: ['Linear TV', 'CTV', 'Display', 'Social'],
    progressPercent: 50.16,
    progressDelivered: 3009600,
    progressGoal: 6000000,
    pacingPercent: 99,
    pacingDelivered: 3009600,
    pacingTarget: 3040000,
    deliveredImpressions: 3009600,
    deliveredSpend: 66211.2,
    remainingImpression: 2990400,
    remainingBudget: 65788.8,
    sparkline: genSparkByIndex(10),
  },
  {
    id: 'chrysler-pacifica-family',
    name: 'Chrysler Pacifica Family',
    status: 'On Target',
    channels: ['CTV', 'Display', 'Social'],
    progressPercent: 80.16,
    progressDelivered: 1202400,
    progressGoal: 1500000,
    pacingPercent: 101.25,
    pacingDelivered: 1202400,
    pacingTarget: 1187500,
    deliveredImpressions: 1202400,
    deliveredSpend: 26452.8,
    remainingImpression: 297600,
    remainingBudget: 6547.2,
    sparkline: genSparkByIndex(11),
  },
  {
    id: 'august-ram-truck',
    name: 'August Ram Truck Month',
    status: 'Completed',
    channels: ['Linear TV', 'CTV', 'Display'],
    progressPercent: 100,
    progressDelivered: 4500000,
    progressGoal: 4500000,
    pacingPercent: null,
    pacingDelivered: 4500000,
    pacingTarget: 4500000,
    deliveredImpressions: 4500000,
    deliveredSpend: 121500,
    remainingImpression: 0,
    remainingBudget: 0,
    sparkline: genSparkByIndex(12),
  },
];

// Generated campaigns
const generatedCampaigns: CampaignSummary[] = Array.from({ length: 33 }, (_, i) => makeCampaign(i + 13));

// Combine real mocks with generated campaigns
export const campaignsMock: CampaignSummary[] = [...realMockCampaigns, ...generatedCampaigns];


