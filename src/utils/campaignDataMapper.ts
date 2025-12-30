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
  const { general, channelDetails } = state;
  
  // Calculate total budget from markets
  const totalBudget = channelDetails?.markets?.reduce((sum, market) => sum + market.budget, 0) || 0;
  
  // Format flight dates
  const formatDate = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
  };
  
  const flight = general.startDate && general.endDate
    ? `${formatDate(general.startDate)} - ${formatDate(general.endDate)}`
    : 'Not specified';
  
  // Format dayparts
  const daypartsList = general.dayparts && general.dayparts.length > 0
    ? general.dayparts.join(', ')
    : 'All dayparts';
  
  // Format genres
  const genresList = general.contentGenre && general.contentGenre.genres.length > 0
    ? general.contentGenre.genres.map(g => GENRE_LABELS[g] || g).join(', ')
    : 'All genres';
  
  // Format markets with stations
  const markets = channelDetails?.markets?.map(market => ({
    name: market.name,
    budget: market.budget,
    stations: market.stations?.map(s => s.name) || []
  })) || [];
  
  // Mock data for fields not in Redux (for preview purposes)
  const mockSparkline = Array.from({ length: 30 }, (_, i) => 
    Math.floor(Math.random() * 50000) + 30000
  );
  
  return {
    // Basic info
    name: general.campaignName || 'Untitled Campaign',
    approvalStatus: 'Pending',
    status: 'Not Started',
    
    // Campaign Details
    advertiser: general.advertiser || 'Not specified',
    brand: general.brand || 'Not specified',
    cpeCode: general.cpeCode || 'Not assigned',
    contact: general.contact || 'Not specified',
    approver: general.approver || 'Not specified',
    
    // Goals & Budget
    goal: general.goal || 'Maximum Impressions',
    totalBudget,
    estImpressions: general.estImpressions || 0,
    avgCPM: general.avgCPM || 17.2,
    
    // Campaign Status (mock for preview)
    progressPercent: 0,
    pacingPercent: null,
    channels: ['Linear'],
    
    // Markets & Stations
    markets,
    
    // Guidelines
    flight,
    audience: general.audience || 'Not specified',
    spotLengthMix: general.spotLengthMix || { fifteen: 0, thirty: 100, sixty: 0 },
    language: general.language || 'English',
    dayparts: daypartsList,
    genres: genresList,
    fluidity: general.fluidityPercentage || 0,
    exclusions: general.excludedPrograms?.length || 0,
    
    // Pacing data (mock for preview)
    progressGoal: general.estImpressions || 0,
    deliveredImpressions: 0,
    deliveredSpend: 0,
    remainingImpression: general.estImpressions || 0,
    remainingBudget: totalBudget,
    sparkline: mockSparkline,
  };
}
