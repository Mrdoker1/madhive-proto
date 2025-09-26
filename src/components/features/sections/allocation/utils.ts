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
