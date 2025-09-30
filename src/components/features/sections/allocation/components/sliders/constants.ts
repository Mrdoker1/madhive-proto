// DEPRECATED: Используйте CHANNEL_CONFIGS из channelConfig.ts
// Цвета и названия теперь централизованы в channelConfig.ts
import { CHANNEL_CONFIGS } from '../../channelConfig';

export const channelNames: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
);

export const channelColors: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
);

export const SLIDER_CONFIG = {
  DEFAULT_BUDGET: 390250,
  INEFFICIENT_THRESHOLD: 0.5, // 50% от среднего бюджета
  API_DELAY: 300 // Задержка имитации API
} as const;
