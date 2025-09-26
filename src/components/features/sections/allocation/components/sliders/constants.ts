// Названия каналов
export const channelNames: Record<string, string> = {
  linear_tv: 'Linear TV',
  display: 'Display',
  ctv: 'CTV',
  audio: 'Audio',
  social: 'Social',
  search: 'Search',
  email: 'Email'
};

// Цвета каналов
export const channelColors: Record<string, string> = {
  linear_tv: '#3B82F6',
  display: '#10B981',
  ctv: '#F59E0B',
  audio: '#EF4444',
  social: '#8B5CF6',
  search: '#F97316',
  email: '#EC4899'
};

export const SLIDER_CONFIG = {
  DEFAULT_BUDGET: 390250,
  INEFFICIENT_THRESHOLD: 0.5, // 50% от среднего бюджета
  API_DELAY: 300 // Задержка имитации API
} as const;
