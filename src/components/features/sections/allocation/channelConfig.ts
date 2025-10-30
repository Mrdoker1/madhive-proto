/**
 * Channel configuration for reach calculation by formula
 * reach = maxReach × (1 - e^(-efficiency × budget / saturation))
 */

export interface ChannelConfig {
  id: string;
  name: string;
  color: string;
  maxReach: number;        // Maximum reach for channel (as percentage of total reach)
  efficiency: number;      // Channel efficiency (affects curve growth rate)
  budgetWeight: number;    // Budget weight for default allocation
  reachWeight: number;     // Reach weight for calculations
  // Saturation points for different campaign sizes (as percentage of total budget)
  saturationSmall: number;   // ~50K campaign
  saturationMedium: number;  // ~100K campaign  
  saturationLarge: number;   // ~200K campaign
}

// Base values for channel reach calculation according to provided data
export const CHANNEL_CONFIGS: Record<string, ChannelConfig> = {
  'preroll': {
    id: 'preroll',
    name: 'Pre Roll',
    color: '#6633CC',
    maxReach: 45,              // 45% of total reach - lowest
    efficiency: 1.5,           // Reduced for slower growth
    budgetWeight: 12,          // 12% budget weight
    reachWeight: 18,           // 18% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  },
  'ctv': {
    id: 'ctv',
    name: 'CTV',
    color: '#FF9BD3',
    maxReach: 65,              // 65% of total reach - highest
    efficiency: 2.5,           // Reduced for better scaling
    budgetWeight: 55,          // 55% budget weight
    reachWeight: 45,           // 45% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  },
  'audio': {
    id: 'audio',
    name: 'Audio',
    color: '#33CCCC',
    maxReach: 55,              // 55% of total reach - medium
    efficiency: 3.0,           // Reduced for better scaling
    budgetWeight: 8,           // 8% budget weight
    reachWeight: 15,           // 15% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  },
  'social': {
    id: 'social',
    name: 'Social',
    color: '#FF0099',
    maxReach: 60,              // 60% of total reach - high potential
    efficiency: 2.0,           // Reduced for better scaling
    budgetWeight: 15,          // 15% budget weight
    reachWeight: 12,           // 12% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  },
  'search': {
    id: 'search',
    name: 'Search',
    color: '#00A3FF',
    maxReach: 40,              // 40% of total reach - medium potential
    efficiency: 3.5,           // Reduced for better scaling
    budgetWeight: 8,           // 8% budget weight
    reachWeight: 7,            // 7% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  },
  'email': {
    id: 'email',
    name: 'Email',
    color: '#FFA100',
    maxReach: 25,              // 25% of total reach - lowest potential
    efficiency: 4.0,           // Reduced for better scaling
    budgetWeight: 2,           // 2% budget weight
    reachWeight: 3,            // 3% reach weight
    saturationSmall: 200,      // Increased for better scaling
    saturationMedium: 150,     // Increased for better scaling
    saturationLarge: 100       // Increased for better scaling
  }
};

/**
 * Base reach scale for all channels (increased for better visibility)
 */
export const BASE_REACH_SCALE = 20000;

/**
 * Determines saturation point based on total budget size
 */
const getSaturationPoint = (config: ChannelConfig, totalBudget: number): number => {
  if (totalBudget <= 75000) {
    // Small campaign (~50K)
    return totalBudget * (config.saturationSmall / 100);
  } else if (totalBudget <= 150000) {
    // Medium campaign (~100K)
    return totalBudget * (config.saturationMedium / 100);
  } else {
    // Large campaign (~200K+)
    return totalBudget * (config.saturationLarge / 100);
  }
};

/**
 * Calculates reach by formula: reach = maxReach × (1 - e^(-efficiency × budget / saturation))
 */
export const calculateReachByFormula = (channelId: string, budget: number, totalBudget: number = 390000): number => {
  const config = CHANNEL_CONFIGS[channelId];
  if (!config || budget <= 0) return 0;
  
  const { maxReach, efficiency } = config;
  
  // Determine saturation point based on campaign size
  const saturation = getSaturationPoint(config, totalBudget);
  
  // Calculate absolute maxReach for this channel
  const absoluteMaxReach = (maxReach / 100) * BASE_REACH_SCALE;
  
  // Formula reach = maxReach × (1 - e^(-efficiency × budget / saturation))
  const reach = absoluteMaxReach * (1 - Math.exp(-efficiency * budget / saturation));
  
  return Math.round(reach);
};

/**
 * Generates points for static channel curve
 */
export const generateStaticCurvePoints = (
  channelId: string, 
  maxBudget: number, 
  pointsCount: number = 100
): Array<{ budget: number; reach: number }> => {
  const points: Array<{ budget: number; reach: number }> = [];
  
  for (let i = 0; i <= pointsCount; i++) {
    const budget = (i / pointsCount) * maxBudget;
    const reach = calculateReachByFormula(channelId, budget, maxBudget);
    points.push({ budget, reach });
  }
  
  return points;
};

/**
 * Creates SVG path for static curve
 */
export const createStaticCurvePath = (
  channelId: string,
  maxBudget: number,
  chartWidth: number,
  chartHeight: number,
  maxReach: number = 13000
): string => {
  const points = generateStaticCurvePoints(channelId, maxBudget, 50);
  
  if (points.length === 0) return '';
  
  let path = '';
  
  points.forEach((point, index) => {
    const x = (point.budget / maxBudget) * chartWidth;
    const y = ((maxReach - point.reach) / maxReach) * chartHeight;
    
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  });
  
  return path;
};

/**
 * Calculates default budget allocation using Budget Weight
 */
export const calculateDefaultBudgetAllocation = (
  selectedChannels: string[], 
  totalBudget: number
): Record<string, number> => {
  // Get total weight of selected channels
  const totalWeight = selectedChannels.reduce((sum, channelId) => {
    const config = CHANNEL_CONFIGS[channelId];
    return sum + (config?.budgetWeight || 0);
  }, 0);
  
  // Distribute budget proportionally to weights
  const allocation: Record<string, number> = {};
  selectedChannels.forEach(channelId => {
    const config = CHANNEL_CONFIGS[channelId];
    if (config) {
      allocation[channelId] = Math.round((config.budgetWeight / totalWeight) * totalBudget / 100) * 100;
    }
  });
  
  return allocation;
};

/**
 * Get channel color
 */
export const getChannelColor = (channelId: string): string => {
  return CHANNEL_CONFIGS[channelId]?.color || '#6B7280';
};

/**
 * Get channel name
 */
export const getChannelName = (channelId: string): string => {
  return CHANNEL_CONFIGS[channelId]?.name || channelId;
};

/**
 * Get all channel colors
 */
export const getAllChannelColors = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
  );
};

/**
 * Get all channel names
 */
export const getAllChannelNames = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
  );
};
