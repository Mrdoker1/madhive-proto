export const channelColors: Record<string, string> = {
  linear_tv: '#6633CC', // Purple
  ctv: '#FF9BD3',       // Pink
  display: '#FFA100',   // Orange
  audio: '#33CCCC',     // Teal
  social: '#00A3FF',    // Blue
  search: '#AB00FF',    // Violet
  email: '#F97316'      // Orange-red
};

export const channelNames: Record<string, string> = {
  linear_tv: 'Linear TV',
  ctv: 'CTV',
  display: 'Display',
  audio: 'Audio',
  social: 'Social',
  search: 'Search',
  email: 'Email'
};

export const CHART_CONFIG = {
  MAX_REACH: 16000,
  OFFSET_X: 60, // Отступ для Y-axis
  OFFSET_Y: 20, // Отступ сверху
  DEFAULT_BUDGET: 390250,
  BASE_REACH: 6000,
  REACH_INCREMENT: 1000,
  MAX_DISPLAY_REACH: 15000
} as const;
