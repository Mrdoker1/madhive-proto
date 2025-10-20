// DEPRECATED: Используйте CHANNEL_CONFIGS из channelConfig.ts
// Цвета и названия теперь централизованы в channelConfig.ts
import { CHANNEL_CONFIGS } from './channelConfig';

export const channelColors: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
);

export const channelNames: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
);

// Коэффициенты эффективности каналов (влияют на максимальный reach канала)
export const CHANNEL_REACH_COEFFICIENTS: Record<string, number> = {
  'ctv': 0.025,         // Самый эффективный канал (достигает 100% от MAX_REACH)
  'preroll': 0.022,     // Высокая эффективность (достигает ~95% от MAX_REACH)
  'search': 0.020,      // Хорошая эффективность (достигает ~90% от MAX_REACH)
  'audio': 0.018,       // Средняя эффективность (достигает ~85% от MAX_REACH)
  'social': 0.015,      // Ниже среднего (достигает ~80% от MAX_REACH)
  'email': 0.012        // Низкая эффективность (достигает ~75% от MAX_REACH)
};

export const CHART_CONFIG = {
  MAX_REACH: 16000,           // Максимально возможный reach (никогда не достигается)
  OFFSET_X: 60,               // Отступ для Y-axis
  OFFSET_Y: 20,               // Отступ сверху
  DEFAULT_BUDGET: 390250,
  BASE_REACH: 6000,
  REACH_INCREMENT: 1000,
  MAX_DISPLAY_REACH: 15000,
  // Настройки асимптотического роста reach
  THRESHOLD_PERCENTAGE: 0.2,  // 20% порог для начала индивидуального роста
  MIN_REACH: 500,             // Минимальный reach при нулевом бюджете
  SATURATION_POINT: 0.8,      // При каком проценте от MAX_REACH начинается насыщение (80%)
  GROWTH_STEEPNESS: 3.0       // Крутизна роста (чем больше, тем круче кривая)
} as const;
