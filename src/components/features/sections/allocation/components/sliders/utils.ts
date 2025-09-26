import { SLIDER_CONFIG } from './constants';

/**
 * Мок функция для получения метрик прогнозирования
 */
export async function fetchForecastMetrics(channelId: string, budget: number) {
  // Имитируем API вызов
  await new Promise(resolve => setTimeout(resolve, SLIDER_CONFIG.API_DELAY));
  
  const baseReach = Math.floor(Math.random() * 50000) + 10000;
  const budgetFactor = budget / 100000;
  
  return {
    maxReach: Math.floor(baseReach * budgetFactor),
    reachPercent: Math.min(95, Math.floor(Math.random() * 40) + 20)
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
