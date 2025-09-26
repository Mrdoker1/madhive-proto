// Основные компоненты
export { AllocationSection } from './AllocationSection';

// Компоненты графика
export { DraggablePoint } from './components/DraggablePoint';
export { ChartGrid } from './components/ChartGrid';
export { ChartAxes } from './components/ChartAxes';
export { ChartLines } from './components/ChartLines';

// Компоненты слайдеров
export { SimpleSlider, ChannelSlider } from './components/sliders';

// Экспорт типов для использования в других компонентах
export type { 
  ChannelPoint, 
  ChannelAllocation as ChartChannelAllocation, 
  ChartDimensions, 
  AllocationSectionProps,
  DraggablePointProps 
} from './types';

// Экспорт типов слайдеров
export type { 
  ChannelAllocation, 
  SimpleSliderProps, 
  ChannelSliderProps 
} from './components/sliders';

// Экспорт констант для переиспользования
export { channelColors, channelNames, CHART_CONFIG, CHANNEL_REACH_COEFFICIENTS } from './constants';

// Экспорт констант слайдеров
export { SLIDER_CONFIG } from './components/sliders';

// Экспорт утилит
export { 
  createParabolicPath, 
  calculateChartPosition, 
  mouseToValues, 
  clampToChart,
  calculateReachFromBudget,
  redistributeBudgetSmart,
  debugReachGrowth,
  debugSmartRedistribution
} from './utils';

// Экспорт утилит слайдеров
export { 
  fetchForecastMetrics, 
  isChannelInefficient, 
  formatCurrency, 
  parseNumericValue 
} from './components/sliders';
