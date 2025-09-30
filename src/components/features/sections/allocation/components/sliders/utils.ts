import { SLIDER_CONFIG } from './constants';
import { calculateReachByFormula, CHANNEL_CONFIGS } from '../../channelConfig';

/**
 * Мок функция для получения метрик прогнозирования (синхронизировано с новой формулой)
 */
export async function fetchForecastMetrics(channelId: string, budget: number, totalBudget: number = 390000) {
  // Имитируем API вызов
  await new Promise(resolve => setTimeout(resolve, SLIDER_CONFIG.API_DELAY));
  
  // Используем новую формулу из channelConfig.ts
  const calculatedReach = calculateReachByFormula(channelId, budget, totalBudget);
  const config = CHANNEL_CONFIGS[channelId];
  
  if (!config) {
    return {
      maxReach: 0,
      reachPercent: 0
    };
  }
  
  // Max Reach = максимально достижимый reach если потратить весь totalBudget на этот канал
  const maxPossibleReach = calculateReachByFormula(channelId, totalBudget, totalBudget);
  
  // Reach% = процент бюджета канала от общего бюджета (позиция слайдера)
  const reachPercent = totalBudget > 0 ? Math.round((budget / totalBudget) * 100) : 0;
  
  
  return {
    maxReach: Math.round(maxPossibleReach), // Максимально достижимый reach при полном бюджете
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
