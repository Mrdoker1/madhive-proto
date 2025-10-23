import { CampaignAudienceData } from '@/store/slices/campaignSlice';

// Базовые размеры аудитории для каналов (без фильтров)
// Audience всегда меньше Market - это активная достижимая аудитория
const CHANNEL_BASE_AUDIENCE: Record<string, number> = {
  'preroll': 95234781,     // ~95M
  'ctv': 73892456,         // ~74M
  'audio': 84567123,       // ~85M
  'social': 117283945,     // ~117M
  'search': 107654892,     // ~108M
  'email': 67123894,       // ~67M
};

// Логика расчета Audience Estimation
// Базовая аудитория зависит от бюджета канала, фильтры её УМЕНЬШАЮТ
// ВАЖНО: Audience НИКОГДА не может быть больше Market Estimation
export const calculateAudienceEstimation = (
  audienceData: CampaignAudienceData,
  interests: string[] = [],
  channelBudget: number = 0,
  channel: string = 'preroll',
  selectedZipCodes: string[] = [] // Добавлен параметр для расчета market
): number => {
  // Если бюджет = 0, возвращаем 0 (нет бюджета = нет оценки)
  if (channelBudget === 0) {
    return 0;
  }
  
  // Сначала вычисляем Market Estimation как ceiling
  const marketEstimation = calculateMarketEstimation(selectedZipCodes, channelBudget, channel);
  
  // Базовая аудитория зависит от бюджета и канала
  const maxChannelAudience = CHANNEL_BASE_AUDIENCE[channel] || CHANNEL_BASE_AUDIENCE['preroll'];
  
  const budgetMultiplier = 15; // ~15 человек на $1
  let baseAudience = Math.min(channelBudget * budgetMultiplier, maxChannelAudience);
  
  // Коэффициент сужения для каждого фильтра
  let narrowingFactor = 1.0;
  
  // Подсчитываем выбранные параметры в Audiences
  const totalAudienceParams = 
    (audienceData.gender?.length || 0) +
    (audienceData.age?.length || 0) +
    (audienceData.income?.length || 0) +
    (audienceData.education?.length || 0) +
    (audienceData.householdSize?.length || 0);
  
  // Каждый параметр в Audiences уменьшает аудиторию на 15%
  if (totalAudienceParams > 0) {
    narrowingFactor *= Math.pow(0.85, totalAudienceParams);
  }
  
  // Каждый интерес уменьшает аудиторию на 10%
  if (interests.length > 0) {
    narrowingFactor *= Math.pow(0.90, interests.length);
  }
  
  // Применяем коэффициент сужения
  let finalAudience = Math.round(baseAudience * narrowingFactor);
  
  // КРИТИЧНО: Audience не может превышать Market Estimation
  finalAudience = Math.min(finalAudience, marketEstimation);
  
  return finalAudience;
};

// Базовые размеры рынка для каждого канала (в людях)
// Реалистичные значения для США с учетом охвата каждого канала
const CHANNEL_MARKET_SIZES: Record<string, number> = {
  'preroll': 127456891,    // ~127M - Pre-roll video ads
  'ctv': 98234567,         // ~98M - Connected TV
  'audio': 112847623,      // ~113M - Audio/Streaming
  'social': 156392847,     // ~156M - Social Media (самый широкий охват)
  'search': 143728956,     // ~144M - Search
  'email': 89567234,       // ~90M - Email (более узкая аудитория)
};

// Логика расчета Market Estimation
// Размер рынка зависит от канала, geo-фильтры его УМЕНЬШАЮТ
export const calculateMarketEstimation = (
  selectedZipCodes: string[],
  channelBudget: number = 0,
  channel: string = 'preroll' // Канал определяет базовый размер рынка
): number => {
  // Если бюджет = 0, возвращаем 0 (нет бюджета = нет оценки)
  if (channelBudget === 0) {
    return 0;
  }
  
  // Базовый размер рынка для канала
  let baseMarket = CHANNEL_MARKET_SIZES[channel] || CHANNEL_MARKET_SIZES['preroll'];
  
  // Если выбраны конкретные zip codes, размер рынка уменьшается (более узкий географический таргетинг)
  if (selectedZipCodes.length > 0) {
    // Каждый zip code покрывает в среднем 100,000-150,000 человек (особенно в городских районах)
    // Используем более реалистичное значение 120,000 на zip code
    // Это обеспечивает, что Market Estimation будет больше Audience Estimation при нормальных бюджетах
    baseMarket = selectedZipCodes.length * 120000;
  }
  
  return baseMarket;
};

