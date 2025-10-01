export type CampaignStatus = 'On Target' | 'Way Under Pace' | 'Over Pace' | 'Way Over Pace' | 'Under Pace';

export interface CampaignSummary {
  id: string;
  name: string;
  status: CampaignStatus;
  channels: string[]; // ['CTV','Social','Audio','Display','Linear TV']
  progressPercent: number; // 0..100
  progressDelivered: number;
  progressGoal: number;
  pacingPercent: number; // 0..100
  pacingDelivered: number;
  pacingTarget: number;
  deliveredImpressions: number;
  sparkline: number[]; // small series for Delivered by Days
}

export const statusColor: Record<CampaignStatus, string> = {
  'On Target': '#22c55e',
  'Way Under Pace': '#ef4444',
  'Over Pace': '#38bdf8',
  'Way Over Pace': '#8b5cf6',
  'Under Pace': '#f59e0b',
};

// Simple helper to generate pseudo sparkline data
const genSpark = (): number[] => Array.from({ length: 14 }, () => 60 + Math.round(Math.random() * 40));

// Deterministic pseudo-random generator (LCG)
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Deterministic sparkline with шумом и редкими пиками/провалами
const genSparkByIndex = (index: number): number[] => {
  const rand = seededRandom(12345 + index * 97);
  const length = 24;
  const arr: number[] = [];
  let value = 70 + (index % 8) * 2;
  for (let i = 0; i < length; i++) {
    const trend = Math.sin((i + index) / 2.4) * 10; // базовая волна
    const noise = (rand() - 0.5) * 10; // шум
    value = 70 + trend + noise;
    // редкие всплески/провалы
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
    sparkline: genSparkByIndex(i),
  };
}

export const campaignsMock: CampaignSummary[] = Array.from({ length: 45 }, (_, i) => makeCampaign(i + 1));


