import type { CampaignDetailData } from '@/components/features/campaigns/CampaignDetailView';
import type { CampaignState } from '@/store/slices/campaignSlice';

// Content genre labels
const GENRE_LABELS: Record<string, string> = {
  action: 'Action',
  comedy: 'Comedy',
  documentary: 'Documentary',
  drama: 'Drama',
  news: 'News & Information',
  reality: 'Reality TV',
  scifi: 'Sci-fi & Fantasy',
  sports: 'Sports'
};

/**
 * Maps Redux campaign state to CampaignDetailData format
 */
export function mapCampaignStateToDetailData(state: CampaignState): CampaignDetailData {
  const { general, budget, goal, flight, markets, dayparts, audience } = state;
  
  // Calculate total budget from markets or use budget.totalBudget
  const totalBudget = markets?.marketsDetails?.reduce((sum, market) => sum + market.budget, 0) || budget.totalBudget || 0;
  
  // Format flight dates
  const formatDate = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
  };
  
  const flightDates = flight.startDate && flight.endDate
    ? `${formatDate(flight.startDate)} - ${formatDate(flight.endDate)}`
    : 'Not specified';
  
  // Format dayparts - get selected dayparts from dayparts state
  const selectedDayparts = Object.keys(dayparts.daypartPercentages || {}).filter(dp => {
    const dayValues = dayparts.daypartPercentages?.[dp];
    return dayValues && Object.values(dayValues).some(v => v > 0);
  });
  const daypartsList = selectedDayparts.length > 0
    ? selectedDayparts.join(', ')
    : 'All dayparts';
  
  // Format genres
  const genresList = general.contentGenre && general.contentGenre.genres.length > 0
    ? general.contentGenre.genres.map(g => GENRE_LABELS[g] || g).join(', ')
    : 'All genres';
  
  // Format markets with stations
  const marketsList = markets?.marketsDetails?.map(market => ({
    name: market.displayName || market.name,
    budget: market.budget,
    stations: market.stations?.map(s => s.name) || []
  })) || [];
  
  // Mock data for fields not in Redux (for preview purposes)
  const mockSparkline = Array.from({ length: 30 }, (_, i) => 
    Math.floor(Math.random() * 50000) + 30000
  );
  
  // Calculate estimated impressions based on budget and average CPM
  const avgCPM = 17.2; // Default CPM
  const estImpressions = totalBudget > 0 ? Math.round((totalBudget / avgCPM) * 1000) : 0;

  // Format audience from available fields
  const audienceParts: string[] = [];
  if (audience.gender && audience.gender.length > 0) {
    audienceParts.push(`Gender: ${audience.gender.join(', ')}`);
  }
  if (audience.age && audience.age.length > 0) {
    audienceParts.push(`Age: ${audience.age.join(', ')}`);
  }
  const audienceString = audienceParts.length > 0 ? audienceParts.join('; ') : 'All audiences';

  return {
    // Basic info
    name: general.campaignName || 'Untitled Campaign',
    approvalStatus: 'Pending',
    status: 'Not Started',
    
    // Campaign Details
    advertiser: general.advertiser || 'Not specified',
    brand: general.brand || 'Not specified',
    cpeCode: general.cpeCode || 'Not assigned',
    contact: general.campaignOwner || 'Not specified',
    approver: general.campaignApprover || 'Not specified',
    
    // Goals & Budget
    goal: goal.goalType || 'Maximum Impressions',
    totalBudget,
    estImpressions,
    avgCPM,
    
    // Campaign Status (mock for preview)
    progressPercent: 0,
    pacingPercent: null,
    channels: ['Linear'],
    
    // Markets & Stations
    markets: marketsList,
    
    // Guidelines
    flight: flightDates,
    audience: audienceString,
    spotLengthMix: general.spotLengthMix || { fifteen: 0, thirty: 100, sixty: 0 },
    language: general.language === 'spanish' ? 'Spanish' : 'English',
    dayparts: daypartsList,
    genres: genresList,
    fluidity: general.fluidityPercentage || 0,
    exclusions: general.excludedPrograms?.length || 0,
    
    // Pacing data (mock for preview)
    progressGoal: estImpressions,
    deliveredImpressions: 0,
    deliveredSpend: 0,
    remainingImpression: estImpressions,
    remainingBudget: totalBudget,
    sparkline: mockSparkline,
  };
}
