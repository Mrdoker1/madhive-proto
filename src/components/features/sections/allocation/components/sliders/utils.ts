import { SLIDER_CONFIG } from './constants';
import { CHART_CONFIG, CHANNEL_REACH_COEFFICIENTS } from '../../constants';

/**
 * Вычисляет reach на основе бюджета (синхронизировано с графиком)
 */
function calculateReachForSlider(channelId: string, budget: number, totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET): number {
  if (budget <= 0) return CHART_CONFIG.MIN_REACH;
  
  const channelCoefficient = CHANNEL_REACH_COEFFICIENTS[channelId] || 0.015;
  
  // Нормализуем коэффициент канала (0.008-0.025 -> 0.7-1.0)
  const normalizedCoeff = (channelCoefficient - 0.008) / (0.025 - 0.008) * 0.3 + 0.7;
  
  // Целевой максимальный reach для этого канала (70-100% от MAX_REACH)
  const channelMaxReach = CHART_CONFIG.MAX_REACH * normalizedCoeff;
  
  // Вычисляем "сырой" reach с сильным влиянием бюджета
  const budgetProgress = budget / totalBudget;
  
  // Агрессивный рост с использованием степенной функции
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
  const saturatedReach = channelMaxReach * Math.tanh(rawReach / channelMaxReach);
  
  return Math.min(saturatedReach, channelMaxReach);
}

/**
 * Мок функция для получения метрик прогнозирования (синхронизировано с графиком)
 */
export async function fetchForecastMetrics(channelId: string, budget: number, totalBudget: number = CHART_CONFIG.DEFAULT_BUDGET) {
  // Имитируем API вызов
  await new Promise(resolve => setTimeout(resolve, SLIDER_CONFIG.API_DELAY));
  
  // Используем ту же логику что и график
  const calculatedReach = calculateReachForSlider(channelId, budget, totalBudget);
  const channelCoefficient = CHANNEL_REACH_COEFFICIENTS[channelId] || 0.015;
  const normalizedCoeff = (channelCoefficient - 0.008) / (0.025 - 0.008) * 0.3 + 0.7;
  const channelMaxReach = CHART_CONFIG.MAX_REACH * normalizedCoeff;
  
  // Вычисляем процент от максимального reach канала
  const reachPercent = Math.round((calculatedReach / channelMaxReach) * 100);
  
  return {
    maxReach: Math.round(calculatedReach),
    reachPercent: Math.min(99, Math.max(1, reachPercent))
  };
}

/**
 * Проверяет, является ли канал неэффективным
 */
export function isChannelInefficient(
  budget: number, 
  averageBudget: number, 
  threshold: number = SLIDER_CONFIG.INEFFICIENT_THRESHOLD
): boolean {
  return budget < averageBudget * threshold;
}

/**
 * Форматирует число как валюту
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Парсит значение из строки в число
 */
export function parseNumericValue(value: string): number {
  return Number(value.replace(/[^0-9]/g, '')) || 0;
}
