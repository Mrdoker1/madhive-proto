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

export const campaignsMock: CampaignSummary[] = [
  {
    id: 'c1',
    name: 'ChambersForOregon_5.25 - 6.26',
    status: 'On Target',
    channels: ['CTV', 'Social', 'Audio', 'Display'],
    progressPercent: 88.22,
    progressDelivered: 1981961,
    progressGoal: 2133334,
    pacingPercent: 101.16,
    pacingDelivered: 1903789,
    pacingTarget: 1881961,
    deliveredImpressions: 1903789,
    sparkline: genSpark(),
  },
  {
    id: 'c2',
    name: 'Metro City 7.01 - 7.31',
    status: 'Over Pace',
    channels: ['Social', 'CTV', 'Audio'],
    progressPercent: 90.74,
    progressDelivered: 95600,
    progressGoal: 21600,
    pacingPercent: 110.16,
    pacingDelivered: 903789,
    pacingTarget: 881961,
    deliveredImpressions: 903789,
    sparkline: genSpark(),
  },
  {
    id: 'c3',
    name: 'Statewide_6.01 - 6.30',
    status: 'Way Under Pace',
    channels: ['Social', 'Linear TV'],
    progressPercent: 20.0,
    progressDelivered: 10000,
    progressGoal: 50000,
    pacingPercent: 50.16,
    pacingDelivered: 903789,
    pacingTarget: 881961,
    deliveredImpressions: 903789,
    sparkline: genSpark(),
  },
];


