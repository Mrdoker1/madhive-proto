import { CampaignAudienceData } from '@/store/slices/campaignSlice';

// Базовые размеры аудитории для каналов (без фильтров)
// Используем неровные числа для реалистичности
const CHANNEL_BASE_AUDIENCE: Record<string, number> = {
  'preroll': 187456321,    // ~187M
  'ctv': 123847562,        // ~124M
  'audio': 145328917,      // ~145M
  'social': 226789453,     // ~227M
  'search': 243591827,     // ~244M
  'email': 165432198,      // ~165M
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
const CHANNEL_MARKET_SIZES: Record<string, number> = {
  'preroll': 250000000,    // 250M - Pre-roll video ads
  'ctv': 150000000,        // 150M - Connected TV
  'audio': 180000000,      // 180M - Audio/Streaming
  'social': 280000000,     // 280M - Social Media
  'search': 300000000,     // 300M - Search
  'email': 200000000,      // 200M - Email
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
    // Каждый zip code покрывает примерно 30,000-50,000 человек
    // Используем среднее значение 40,000
    baseMarket = selectedZipCodes.length * 40000;
  }
  
  return baseMarket;
};

