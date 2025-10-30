import { CampaignAudienceData } from '@/store/slices/campaignSlice';

// Base audience sizes for channels (without filters)
// Audience is always less than Market - this is the active reachable audience
const CHANNEL_BASE_AUDIENCE: Record<string, number> = {
  'preroll': 95234781,     // ~95M
  'ctv': 73892456,         // ~74M
  'audio': 84567123,       // ~85M
  'social': 117283945,     // ~117M
  'search': 107654892,     // ~108M
  'email': 67123894,       // ~67M
};

// Audience Estimation calculation logic
// Base audience depends on channel budget, filters REDUCE it
// IMPORTANT: Audience can NEVER exceed Market Estimation
export const calculateAudienceEstimation = (
  audienceData: CampaignAudienceData,
  interests: string[] = [],
  channelBudget: number = 0,
  channel: string = 'preroll',
  selectedZipCodes: string[] = [] // Added parameter for market calculation
): number => {
  // If budget = 0, return 0 (no budget = no estimation)
  if (channelBudget === 0) {
    return 0;
  }
  
  // First calculate Market Estimation as ceiling
  const marketEstimation = calculateMarketEstimation(selectedZipCodes, channelBudget, channel);
  
  // Base audience depends on budget and channel
  const maxChannelAudience = CHANNEL_BASE_AUDIENCE[channel] || CHANNEL_BASE_AUDIENCE['preroll'];
  
  const budgetMultiplier = 15; // ~15 people per $1
  let baseAudience = Math.min(channelBudget * budgetMultiplier, maxChannelAudience);
  
  // Narrowing factor for each filter
  let narrowingFactor = 1.0;
  
  // Count selected parameters in Audiences
  const totalAudienceParams = 
    (audienceData.gender?.length || 0) +
    (audienceData.age?.length || 0) +
    (audienceData.income?.length || 0) +
    (audienceData.education?.length || 0) +
    (audienceData.householdSize?.length || 0);
  
  // Each parameter in Audiences reduces audience by 15%
  if (totalAudienceParams > 0) {
    narrowingFactor *= Math.pow(0.85, totalAudienceParams);
  }
  
  // Each interest reduces audience by 10%
  if (interests.length > 0) {
    narrowingFactor *= Math.pow(0.90, interests.length);
  }
  
  // Apply narrowing factor
  let finalAudience = Math.round(baseAudience * narrowingFactor);
  
  // CRITICAL: Audience cannot exceed Market Estimation
  finalAudience = Math.min(finalAudience, marketEstimation);
  
  return finalAudience;
};

// Base market sizes for each channel (in people)
// Realistic values for USA considering each channel's reach
const CHANNEL_MARKET_SIZES: Record<string, number> = {
  'preroll': 127456891,    // ~127M - Pre-roll video ads
  'ctv': 98234567,         // ~98M - Connected TV
  'audio': 112847623,      // ~113M - Audio/Streaming
  'social': 156392847,     // ~156M - Social Media (widest reach)
  'search': 143728956,     // ~144M - Search
  'email': 89567234,       // ~90M - Email (narrower audience)
};

// Market Estimation calculation logic
// Market size depends on channel, geo-filters REDUCE it
export const calculateMarketEstimation = (
  selectedZipCodes: string[],
  channelBudget: number = 0,
  channel: string = 'preroll' // Channel determines base market size
): number => {
  // If budget = 0, return 0 (no budget = no estimation)
  if (channelBudget === 0) {
    return 0;
  }
  
  // Base market size for channel
  let baseMarket = CHANNEL_MARKET_SIZES[channel] || CHANNEL_MARKET_SIZES['preroll'];
  
  // If specific zip codes are selected, market size decreases (narrower geographic targeting)
  if (selectedZipCodes.length > 0) {
    // Each zip code covers on average 100,000-150,000 people (especially in urban areas)
    // Using a more realistic value of 120,000 per zip code
    // This ensures Market Estimation will be larger than Audience Estimation at normal budgets
    baseMarket = selectedZipCodes.length * 120000;
  }
  
  return baseMarket;
};

