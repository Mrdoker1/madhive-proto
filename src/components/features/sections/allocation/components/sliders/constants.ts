// DEPRECATED: Use CHANNEL_CONFIGS from channelConfig.ts
// Colors and names are now centralized in channelConfig.ts
import { CHANNEL_CONFIGS } from '../../channelConfig';

export const channelNames: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
);

export const channelColors: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
);

export const SLIDER_CONFIG = {
  DEFAULT_BUDGET: 390250,
  INEFFICIENT_THRESHOLD: 0.5, // 50% of average budget
  API_DELAY: 0 // API simulation delay
} as const;
