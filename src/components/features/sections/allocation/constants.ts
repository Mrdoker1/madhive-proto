// DEPRECATED: Use CHANNEL_CONFIGS from channelConfig.ts
// Colors and names are now centralized in channelConfig.ts
import { CHANNEL_CONFIGS } from './channelConfig';

export const channelColors: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
);

export const channelNames: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
);

// Channel efficiency coefficients (affect maximum channel reach)
export const CHANNEL_REACH_COEFFICIENTS: Record<string, number> = {
  'ctv': 0.025,         // Most efficient channel (reaches 100% of MAX_REACH)
  'preroll': 0.022,     // High efficiency (reaches ~95% of MAX_REACH)
  'search': 0.020,      // Good efficiency (reaches ~90% of MAX_REACH)
  'audio': 0.018,       // Medium efficiency (reaches ~85% of MAX_REACH)
  'social': 0.015,      // Below average (reaches ~80% of MAX_REACH)
  'email': 0.012        // Low efficiency (reaches ~75% of MAX_REACH)
};

export const CHART_CONFIG = {
  MAX_REACH: 16000,           // Maximum possible reach (never fully reached)
  OFFSET_X: 60,               // Offset for Y-axis
  OFFSET_Y: 20,               // Top offset
  DEFAULT_BUDGET: 390250,
  BASE_REACH: 6000,
  REACH_INCREMENT: 1000,
  MAX_DISPLAY_REACH: 15000,
  // Asymptotic reach growth settings
  THRESHOLD_PERCENTAGE: 0.2,  // 20% threshold for individual growth start
  MIN_REACH: 500,             // Minimum reach at zero budget
  SATURATION_POINT: 0.8,      // At what percentage of MAX_REACH saturation begins (80%)
  GROWTH_STEEPNESS: 3.0       // Growth steepness (higher = steeper curve)
} as const;
