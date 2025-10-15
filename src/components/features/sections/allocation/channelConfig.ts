/**
 * Конфигурация каналов для расчета reach по формуле
 * reach = maxReach × (1 - e^(-efficiency × budget / saturation))
 */

export interface ChannelConfig {
  id: string;
  name: string;
  color: string;
  maxReach: number;        // Максимальный reach для канала (в процентах от общего reach)
  efficiency: number;      // Эффективность канала (влияет на скорость роста кривой)
  budgetWeight: number;    // Вес бюджета для распределения по умолчанию
  reachWeight: number;     // Вес reach для расчетов
  // Saturation points для разных размеров кампаний (в процентах от total budget)
  saturationSmall: number;   // ~50K campaign
  saturationMedium: number;  // ~100K campaign  
  saturationLarge: number;   // ~200K campaign
}

// Базовые значения для расчета reach каналов согласно предоставленным данным
export const CHANNEL_CONFIGS: Record<string, ChannelConfig> = {
  'display': {
    id: 'display',
    name: 'Pre Roll',
    color: '#6633CC',
    maxReach: 45,              // 45% от общего reach - самый низкий
    efficiency: 1.5,           // Снижен для более медленного роста
    budgetWeight: 12,          // 12% budget weight
    reachWeight: 18,           // 18% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  },
  'ctv': {
    id: 'ctv',
    name: 'CTV',
    color: '#FF9BD3',
    maxReach: 65,              // 65% от общего reach - самый высокий
    efficiency: 2.5,           // Снижен для лучшего масштабирования
    budgetWeight: 55,          // 55% budget weight
    reachWeight: 45,           // 45% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  },
  'audio': {
    id: 'audio',
    name: 'Audio',
    color: '#33CCCC',
    maxReach: 55,              // 55% от общего reach - средний
    efficiency: 3.0,           // Снижен для лучшего масштабирования
    budgetWeight: 8,           // 8% budget weight
    reachWeight: 15,           // 15% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  },
  'social': {
    id: 'social',
    name: 'Social',
    color: '#FF0099',
    maxReach: 60,              // 60% от общего reach - высокий потенциал
    efficiency: 2.0,           // Снижен для лучшего масштабирования
    budgetWeight: 15,          // 15% budget weight
    reachWeight: 12,           // 12% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  },
  'search': {
    id: 'search',
    name: 'Search',
    color: '#00A3FF',
    maxReach: 40,              // 40% от общего reach - средний потенциал
    efficiency: 3.5,           // Снижен для лучшего масштабирования
    budgetWeight: 8,           // 8% budget weight
    reachWeight: 7,            // 7% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  },
  'email': {
    id: 'email',
    name: 'Email',
    color: '#FFA100',
    maxReach: 25,              // 25% от общего reach - самый низкий потенциал
    efficiency: 4.0,           // Снижен для лучшего масштабирования
    budgetWeight: 2,           // 2% budget weight
    reachWeight: 3,            // 3% reach weight
    saturationSmall: 200,      // Увеличено для лучшего масштабирования
    saturationMedium: 150,     // Увеличено для лучшего масштабирования
    saturationLarge: 100       // Увеличено для лучшего масштабирования
  }
};

/**
 * Базовый масштаб reach для всех каналов (увеличен для лучшей видимости)
 */
export const BASE_REACH_SCALE = 20000;

/**
 * Определяет saturation point в зависимости от размера total budget
 */
const getSaturationPoint = (config: ChannelConfig, totalBudget: number): number => {
  if (totalBudget <= 75000) {
    // Малая кампания (~50K)
    return totalBudget * (config.saturationSmall / 100);
  } else if (totalBudget <= 150000) {
    // Средняя кампания (~100K)
    return totalBudget * (config.saturationMedium / 100);
  } else {
    // Большая кампания (~200K+)
    return totalBudget * (config.saturationLarge / 100);
  }
};

/**
 * Вычисляет reach по формуле: reach = maxReach × (1 - e^(-efficiency × budget / saturation))
 */
export const calculateReachByFormula = (channelId: string, budget: number, totalBudget: number = 390000): number => {
  const config = CHANNEL_CONFIGS[channelId];
  if (!config || budget <= 0) return 0;
  
  const { maxReach, efficiency } = config;
  
  // Определяем saturation point в зависимости от размера кампании
  const saturation = getSaturationPoint(config, totalBudget);
  
  // Рассчитываем абсолютный maxReach для данного канала
  const absoluteMaxReach = (maxReach / 100) * BASE_REACH_SCALE;
  
  // Формула reach = maxReach × (1 - e^(-efficiency × budget / saturation))
  const reach = absoluteMaxReach * (1 - Math.exp(-efficiency * budget / saturation));
  
  return Math.round(reach);
};

/**
 * Генерирует точки для статической кривой канала
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
 * Создает SVG path для статической кривой
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
 * Вычисляет budget allocation по умолчанию используя Budget Weight
 */
export const calculateDefaultBudgetAllocation = (
  selectedChannels: string[], 
  totalBudget: number
): Record<string, number> => {
  // Получаем общий вес выбранных каналов
  const totalWeight = selectedChannels.reduce((sum, channelId) => {
    const config = CHANNEL_CONFIGS[channelId];
    return sum + (config?.budgetWeight || 0);
  }, 0);
  
  // Распределяем бюджет пропорционально весам
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
 * Получить цвет канала
 */
export const getChannelColor = (channelId: string): string => {
  return CHANNEL_CONFIGS[channelId]?.color || '#6B7280';
};

/**
 * Получить название канала
 */
export const getChannelName = (channelId: string): string => {
  return CHANNEL_CONFIGS[channelId]?.name || channelId;
};

/**
 * Получить все цвета каналов
 */
export const getAllChannelColors = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.color])
  );
};

/**
 * Получить все названия каналов
 */
export const getAllChannelNames = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(CHANNEL_CONFIGS).map(([id, config]) => [id, config.name])
  );
};
