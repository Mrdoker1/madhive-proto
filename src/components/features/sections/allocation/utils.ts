import { CHANNEL_REACH_COEFFICIENTS, CHART_CONFIG } from './constants';

/**
 * Вычисляет reach на основе бюджета с сильным влиянием и ограничением максимума
 * Бюджет сильно влияет на reach, но reach никогда не превышает MAX_REACH
 */
export const calculateReachFromBudget = (channelId: string, budget: number, totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET): number => {
  if (budget <= 0) return CHART_CONFIG.MIN_REACH;
  
  const channelCoefficient = CHANNEL_REACH_COEFFICIENTS[channelId] || 0.015;
  
  // Нормализуем коэффициент канала (0.008-0.025 -> 0.7-1.0)
  const normalizedCoeff = (channelCoefficient - 0.008) / (0.025 - 0.008) * 0.3 + 0.7;
  
  // Целевой максимальный reach для этого канала (70-100% от MAX_REACH)
  const channelMaxReach = CHART_CONFIG.MAX_REACH * normalizedCoeff;
  
  // Вычисляем "сырой" reach с сильным влиянием бюджета
  const budgetProgress = budget / totalBudget;
  
  // Агрессивный рост с использованием степенной функции
  // Малые бюджеты дают мало reach, большие бюджеты дают много reach
  let rawReach;
  
  if (budgetProgress <= CHART_CONFIG.THRESHOLD_PERCENTAGE) {
    // До 20%: умеренный рост
    const progress = budgetProgress / CHART_CONFIG.THRESHOLD_PERCENTAGE;
    rawReach = CHART_CONFIG.MIN_REACH + (channelMaxReach * 0.3) * Math.pow(progress, 1.5);
  } else {
    // После 20%: более агрессивный рост
    const baseReach = CHART_CONFIG.MIN_REACH + (channelMaxReach * 0.3);
    const excessProgress = (budgetProgress - CHART_CONFIG.THRESHOLD_PERCENTAGE) / (1 - CHART_CONFIG.THRESHOLD_PERCENTAGE);
    
    // Степенная функция для сильного роста, но с ограничением
    const additionalReach = (channelMaxReach - baseReach) * Math.pow(excessProgress, 0.8);
    rawReach = baseReach + additionalReach;
  }
  
  // Применяем "мягкое ограничение" для предотвращения превышения максимума
  // Используем гиперболический тангенс для плавного приближения к максимуму
  const saturatedReach = channelMaxReach * Math.tanh(rawReach / channelMaxReach);
  
  return Math.min(saturatedReach, channelMaxReach);
};

/**
 * Умное перераспределение бюджета с учетом коэффициентов эффективности
 * Более эффективные каналы теряют меньше бюджета, менее эффективные - больше
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

  // Вычисляем сколько бюджета нужно перераспределить
  const currentTargetBudget = currentBudgets[targetChannelId] || 0;
  const budgetDifference = newBudgetForTarget - currentTargetBudget;
  const availableBudgetForOthers = totalBudget - newBudgetForTarget;

  // Получаем коэффициенты эффективности для других каналов
  const otherChannelsEfficiency = otherChannelIds.map(id => ({
    id,
    coefficient: CHANNEL_REACH_COEFFICIENTS[id] || 0.015,
    currentBudget: currentBudgets[id] || 0
  }));

  // Сортируем по эффективности (более эффективные каналы должны сохранить больше бюджета)
  otherChannelsEfficiency.sort((a, b) => b.coefficient - a.coefficient);

  // Вычисляем веса для распределения (обратно пропорционально эффективности)
  // Менее эффективные каналы получают больший вес = теряют больше бюджета
  const totalWeight = otherChannelsEfficiency.reduce((sum, channel) => {
    // Инвертируем коэффициент: меньший коэффициент = больший вес
    const invertedWeight = 1 / channel.coefficient;
    return sum + invertedWeight;
  }, 0);

  // Распределяем бюджет пропорционально весам
  const newBudgets: Record<string, number> = { [targetChannelId]: newBudgetForTarget };
  
  otherChannelsEfficiency.forEach(channel => {
    const weight = (1 / channel.coefficient) / totalWeight;
    const newBudget = availableBudgetForOthers * weight;
    newBudgets[channel.id] = Math.max(0, Math.round(newBudget / 100) * 100); // Округляем до кратных 100
  });

  return newBudgets;
};

/**
 * Функция для тестирования умного перераспределения
 */
export const debugSmartRedistribution = (totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET) => {
  console.log('\n=== Smart Budget Redistribution Test ===');
  
  // Пример: Linear TV, Email, Social
  const testChannels = ['linear_tv', 'email', 'social'];
  const initialBudgets: Record<string, number> = {
    'linear_tv': totalBudget / 3,
    'email': totalBudget / 3, 
    'social': totalBudget / 3
  };
  
  console.log('Initial budgets (equal):');
  testChannels.forEach(id => {
    const coeff = CHANNEL_REACH_COEFFICIENTS[id];
    console.log(`  ${id}: $${Math.round(initialBudgets[id]/1000)}K (coeff: ${coeff})`);
  });
  
  // Увеличиваем бюджет Linear TV до 60% от общего
  const newLinearTvBudget = totalBudget * 0.6;
  const redistributed = redistributeBudgetSmart(initialBudgets, 'linear_tv', newLinearTvBudget, totalBudget);
  
  console.log(`\nAfter increasing Linear TV to $${Math.round(newLinearTvBudget/1000)}K:`);
  Object.entries(redistributed).forEach(([id, budget]) => {
    const coeff = CHANNEL_REACH_COEFFICIENTS[id];
    const change = budget - initialBudgets[id];
    const changePercent = ((change / initialBudgets[id]) * 100).toFixed(1);
    console.log(`  ${id}: $${Math.round(budget/1000)}K (${change > 0 ? '+' : ''}${changePercent}%, coeff: ${coeff})`);
  });
};

/**
 * Вспомогательная функция для отладки - показывает как растет reach для канала
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
 * Создание параболического пути: от (0,0) до точки, затем горизонтально
 */
export const createParabolicPath = (
  pointX: number, 
  pointY: number, 
  chartWidth: number, 
  chartHeight: number
): string => {
  // Начинаем от (0, chartHeight) - это соответствует reach = 0
  let path = `M 0 ${chartHeight}`;
  
  // Создаем параболическую кривую до точки с помощью квадратичной кривой Безье
  const controlX = pointX * 0.5; // Контрольная точка по X (в середине пути)
  const controlY = pointY; // Контрольная точка по Y (на уровне целевой точки)
  
  // Квадратичная кривая Безье для параболы
  path += ` Q ${controlX} ${controlY} ${pointX} ${pointY}`;
  
  // Горизонтальная линия до конца графика
  path += ` L ${chartWidth} ${pointY}`;
  
  return path;
};

/**
 * Вычисляет позицию точки на графике
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
 * Преобразует координаты мыши в значения бюджета и reach
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
 * Ограничивает значения в пределах графика
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
