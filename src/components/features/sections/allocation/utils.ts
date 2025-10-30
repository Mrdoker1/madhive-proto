import { CHANNEL_REACH_COEFFICIENTS, CHART_CONFIG } from './constants';

/**
 * Calculates reach based on budget with strong influence and maximum limit
 * Budget strongly affects reach, but reach never exceeds MAX_REACH
 */
export const calculateReachFromBudget = (channelId: string, budget: number, totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET): number => {
  if (budget <= 0) return CHART_CONFIG.MIN_REACH;
  
  const channelCoefficient = CHANNEL_REACH_COEFFICIENTS[channelId] || 0.015;
  
  // Normalize channel coefficient (0.008-0.025 -> 0.7-1.0)
  const normalizedCoeff = (channelCoefficient - 0.008) / (0.025 - 0.008) * 0.3 + 0.7;
  
  // Target maximum reach for this channel (70-100% of MAX_REACH)
  const channelMaxReach = CHART_CONFIG.MAX_REACH * normalizedCoeff;
  
  // Calculate "raw" reach with strong budget influence
  const budgetProgress = budget / totalBudget;
  
  // Aggressive growth using power function
  // Small budgets give little reach, large budgets give much reach
  let rawReach;
  
  if (budgetProgress <= CHART_CONFIG.THRESHOLD_PERCENTAGE) {
    // Up to 20%: moderate growth
    const progress = budgetProgress / CHART_CONFIG.THRESHOLD_PERCENTAGE;
    rawReach = CHART_CONFIG.MIN_REACH + (channelMaxReach * 0.3) * Math.pow(progress, 1.5);
  } else {
    // After 20%: more aggressive growth
    const baseReach = CHART_CONFIG.MIN_REACH + (channelMaxReach * 0.3);
    const excessProgress = (budgetProgress - CHART_CONFIG.THRESHOLD_PERCENTAGE) / (1 - CHART_CONFIG.THRESHOLD_PERCENTAGE);
    
    // Power function for strong growth, but with limitation
    const additionalReach = (channelMaxReach - baseReach) * Math.pow(excessProgress, 0.8);
    rawReach = baseReach + additionalReach;
  }
  
  // Apply "soft limit" to prevent exceeding maximum
  // Use hyperbolic tangent for smooth approach to maximum
  const saturatedReach = channelMaxReach * Math.tanh(rawReach / channelMaxReach);
  
  return Math.min(saturatedReach, channelMaxReach);
};

/**
 * Smart budget redistribution considering efficiency coefficients
 * More efficient channels lose less budget, less efficient ones lose more
 */
export const redistributeBudgetSmart = (
  currentBudgets: Record<string, number>,
  targetChannelId: string,
  newBudgetForTarget: number,
  totalBudget: number
): Record<string, number> => {
  const otherChannelIds = Object.keys(currentBudgets).filter(id => id !== targetChannelId);
  
  if (otherChannelIds.length === 0) {
    return { [targetChannelId]: newBudgetForTarget };
  }

  // Calculate how much budget needs to be redistributed
  const currentTargetBudget = currentBudgets[targetChannelId] || 0;
  const budgetDifference = newBudgetForTarget - currentTargetBudget;
  const availableBudgetForOthers = totalBudget - newBudgetForTarget;

  // Get efficiency coefficients for other channels
  const otherChannelsEfficiency = otherChannelIds.map(id => ({
    id,
    coefficient: CHANNEL_REACH_COEFFICIENTS[id] || 0.015,
    currentBudget: currentBudgets[id] || 0
  }));

  // Sort by efficiency (more efficient channels should keep more budget)
  otherChannelsEfficiency.sort((a, b) => b.coefficient - a.coefficient);

  // Calculate weights for distribution (inversely proportional to efficiency)
  // Less efficient channels get higher weight = lose more budget
  const totalWeight = otherChannelsEfficiency.reduce((sum, channel) => {
    // Invert coefficient: lower coefficient = higher weight
    const invertedWeight = 1 / channel.coefficient;
    return sum + invertedWeight;
  }, 0);

  // Distribute budget proportionally to weights
  const newBudgets: Record<string, number> = { [targetChannelId]: newBudgetForTarget };
  
  otherChannelsEfficiency.forEach(channel => {
    const weight = (1 / channel.coefficient) / totalWeight;
    const newBudget = availableBudgetForOthers * weight;
    newBudgets[channel.id] = Math.max(0, Math.round(newBudget / 100) * 100); // Round to multiples of 100
  });

  return newBudgets;
};

/**
 * Function for testing smart redistribution
 */
export const debugSmartRedistribution = (totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET) => {
  console.log('\n=== Smart Budget Redistribution Test ===');
  
  // Example: CTV, Email, Social
  const testChannels = ['ctv', 'email', 'social'];
  const initialBudgets: Record<string, number> = {
    'ctv': totalBudget / 3,
    'email': totalBudget / 3, 
    'social': totalBudget / 3
  };
  
  console.log('Initial budgets (equal):');
  testChannels.forEach(id => {
    const coeff = CHANNEL_REACH_COEFFICIENTS[id];
    console.log(`  ${id}: $${Math.round(initialBudgets[id]/1000)}K (coeff: ${coeff})`);
  });
  
  // Increase CTV budget to 60% of total
  const newCtvBudget = totalBudget * 0.6;
  const redistributed = redistributeBudgetSmart(initialBudgets, 'ctv', newCtvBudget, totalBudget);
  
  console.log(`\nAfter increasing CTV to $${Math.round(newCtvBudget/1000)}K:`);
  Object.entries(redistributed).forEach(([id, budget]) => {
    const coeff = CHANNEL_REACH_COEFFICIENTS[id];
    const change = budget - initialBudgets[id];
    const changePercent = ((change / initialBudgets[id]) * 100).toFixed(1);
    console.log(`  ${id}: $${Math.round(budget/1000)}K (${change > 0 ? '+' : ''}${changePercent}%, coeff: ${coeff})`);
  });
};

/**
 * Helper function for debugging - shows how reach grows for a channel
 */
export const debugReachGrowth = (channelId: string, totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET) => {
  const steps = [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0];
  console.log(`\n=== Reach Growth for ${channelId} ===`);
  console.log(`Total Budget: $${totalBudget.toLocaleString()}`);
  console.log(`Max Reach: ${CHART_CONFIG.MAX_REACH.toLocaleString()}`);
  
  steps.forEach(step => {
    const budget = totalBudget * step;
    const reach = calculateReachFromBudget(channelId, budget, totalBudget);
    const percentage = (reach / CHART_CONFIG.MAX_REACH * 100).toFixed(1);
    console.log(`${(step * 100).toString().padStart(3)}% budget ($${Math.round(budget/1000)}K) → ${Math.round(reach).toLocaleString()} reach (${percentage}% of max)`);
  });
};

/**
 * Create parabolic path: from (0,0) to point, then horizontally
 */
export const createParabolicPath = (
  pointX: number, 
  pointY: number, 
  chartWidth: number, 
  chartHeight: number
): string => {
  // Start from (0, chartHeight) - this corresponds to reach = 0
  let path = `M 0 ${chartHeight}`;
  
  // Create parabolic curve to point using quadratic Bezier curve
  const controlX = pointX * 0.5; // Control point X (in the middle of path)
  const controlY = pointY; // Control point Y (at target point level)
  
  // Quadratic Bezier curve for parabola
  path += ` Q ${controlX} ${controlY} ${pointX} ${pointY}`;
  
  // Horizontal line to end of chart
  path += ` L ${chartWidth} ${pointY}`;
  
  return path;
};

/**
 * Calculates point position on chart
 */
export const calculateChartPosition = (
  budget: number,
  reach: number,
  maxBudget: number,
  maxReach: number,
  chartWidth: number,
  chartHeight: number
): { x: number; y: number } => {
  const x = (budget / maxBudget) * chartWidth;
  const y = ((maxReach - reach) / maxReach) * chartHeight;
  
  return { x, y };
};

/**
 * Converts mouse coordinates to budget and reach values
 */
export const mouseToValues = (
  mouseX: number,
  mouseY: number,
  chartWidth: number,
  chartHeight: number,
  maxBudget: number,
  maxReach: number
): { budget: number; reach: number } => {
  const budget = (mouseX / chartWidth) * maxBudget;
  const reach = maxReach - (mouseY / chartHeight) * maxReach;
  
  return { 
    budget: Math.round(budget), 
    reach: Math.round(reach) 
  };
};

/**
 * Limits values within chart bounds
 */
export const clampToChart = (
  x: number,
  y: number,
  chartWidth: number,
  chartHeight: number
): { x: number; y: number } => {
  return {
    x: Math.max(0, Math.min(x, chartWidth)),
    y: Math.max(0, Math.min(y, chartHeight))
  };
};
