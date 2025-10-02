export { SimpleSlider } from './SimpleSlider';
export { ChannelSlider } from './ChannelSlider';
export { SuggestedChannelSlider } from './SuggestedChannelSlider';

// Экспорт типов
export type { ChannelAllocation, SimpleSliderProps, ChannelSliderProps } from './types';

// Экспорт констант
export { channelNames, channelColors, SLIDER_CONFIG } from './constants';

// Экспорт утилит
export { fetchForecastMetrics, isChannelInefficient, formatCurrency, parseNumericValue } from './utils';
