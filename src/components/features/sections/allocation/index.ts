// Main components
export { AllocationSection } from './AllocationSection';

// Chart components
export { DraggablePoint } from './components/DraggablePoint';
export { ChartGrid } from './components/ChartGrid';
export { ChartAxes } from './components/ChartAxes';
export { ChartLines } from './components/ChartLines';

// Slider components
export { SimpleSlider, ChannelSlider } from './components/sliders';

// Export types for use in other components
export type { 
  ChannelPoint, 
  ChannelAllocation as ChartChannelAllocation, 
  ChartDimensions, 
  AllocationSectionProps,
  DraggablePointProps 
} from './types';

// Export slider types
export type { 
  ChannelAllocation, 
  SimpleSliderProps, 
  ChannelSliderProps 
} from './components/sliders';

// Export constants for reuse
export { channelColors, channelNames, CHART_CONFIG, CHANNEL_REACH_COEFFICIENTS } from './constants';

// Export slider constants
export { SLIDER_CONFIG } from './components/sliders';

// Export utilities
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

// Export slider utilities
export { 
  fetchForecastMetrics, 
  isChannelInefficient, 
  formatCurrency, 
  parseNumericValue 
} from './components/sliders';
