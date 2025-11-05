import { SLIDER_CONFIG } from './constants';
import { calculateReachByFormula, CHANNEL_CONFIGS } from '../../channelConfig';

/**
 * Mock function to get forecast metrics (synchronized with new formula)
 */
export async function fetchForecastMetrics(channelId: string, budget: number, totalBudget: number = 390000) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, SLIDER_CONFIG.API_DELAY));
  
  // Use new formula from channelConfig.ts
  const calculatedReach = calculateReachByFormula(channelId, budget, totalBudget);
  const config = CHANNEL_CONFIGS[channelId];
  
  if (!config) {
    return {
      maxReach: 0,
      reachPercent: 0,
      audienceEstimation: 0,
      marketEstimation: 0
    };
  }
  
  // Max Reach = maximum achievable reach if spending all totalBudget on this channel
  const maxPossibleReach = calculateReachByFormula(channelId, totalBudget, totalBudget);
  
  // Reach% = percentage of channel budget from total budget (slider position)
  const reachPercent = totalBudget > 0 ? Math.round((budget / totalBudget) * 100) : 0;
  
  // Calculate Market Estimation
  const baseMarket: Record<string, number> = {
    'ctv': 184000000,
    'audio': 151000000,
    'social': 240000000,
    'preroll': 117000000,
    'search': 117000000,
    'email': 67000000
  };
  
  const market = baseMarket[channelId] || 100000000;
  const budgetFactor = Math.min(0.9, Math.sqrt(budget / 100000) * 0.15);
  const marketEstimation = Math.round(market * budgetFactor);
  
  // Calculate Audience Estimation (percentage of market)
  const audienceFactor = Math.min(0.8, Math.sqrt(budget / 100000) * 0.25);
  const audienceEstimation = Math.round(marketEstimation * audienceFactor);
  
  console.log(`📊 fetchForecastMetrics: ${channelId}, budget: ${budget}, market: ${marketEstimation}, audience: ${audienceEstimation}`);
  
  return {
    maxReach: Math.round(maxPossibleReach), // Maximum achievable reach with full budget
    reachPercent: Math.min(99, Math.max(1, reachPercent)),
    audienceEstimation,
    marketEstimation
  };
}

/**
 * Checks if the channel is inefficient
 */
export function isChannelInefficient(
  budget: number, 
  averageBudget: number, 
  threshold: number = SLIDER_CONFIG.INEFFICIENT_THRESHOLD
): boolean {
  return budget < averageBudget * threshold;
}

/**
 * Formats number as currency
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Parses value from string to number
 */
export function parseNumericValue(value: string): number {
  return Number(value.replace(/[^0-9]/g, '')) || 0;
}
