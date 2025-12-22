import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types for campaign data
export interface SpotLengthMix {
  fifteen: number; // Percentage for :15
  thirty: number;  // Percentage for :30
  sixty: number;   // Percentage for :60
}

export interface CampaignGeneralData {
  campaignName: string;
  advertiser: string;
  brand: string;
  product: string;
  campaignType: string;
  cpeCode: string;
  campaignOwner: string;
  campaignApprover: string;
  spotLength: string[]; // Array of selected durations: ['15', '30', '60']
  spotLengthMix: SpotLengthMix; // Percentage mix for each spot length
}

export interface CampaignBudgetData {
  totalBudget: number;
  budgetType: 'fixed' | 'flexible';
  currency: string;
}

export interface CampaignGoalData {
  goalType: string;
  targetValue: number;
  goalMetric: string;
}

export interface CampaignFlightData {
  startDate: string;
  endDate: string;
  flightStatus: 'active' | 'hiatus';
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  hiatusRanges?: Array<{id: string, start: string, end: string}>;
}

export interface BroadcasterStationBudget extends StationBudget {
  marketId: string;
  broadcasterId: string;
  cpm: string;
  marketShare: number;
  audienceSize: number;
}

export interface BroadcasterWithStations {
  id: string;
  name: string;
  stations: BroadcasterStationBudget[];
}

export interface CampaignLinearData {
  broadcasters: string[];
  measurementProvider: string;
  broadcastersWithStations?: BroadcasterWithStations[]; // Detailed information about broadcasters and their stations
}

export interface CampaignAudienceData {
  gender: string[];
  age: string[];
  income: string[];
  education: string[];
  householdSize: string[];
}

export interface StationBudget {
  id: string;
  name: string;
  selected: boolean;
  percentage: number;
  budget: number;
}

export interface MarketBudget {
  id: string;
  name: string;
  displayName: string;
  selected: boolean;
  percentage: number;
  budget: number;
  stations: StationBudget[];
}

export interface CampaignMarketsData {
  selectedMarkets: string[];
  selectedRegion?: string;
  mode: 'include' | 'exclude';
  marketsDetails?: MarketBudget[]; // Detailed information about markets and stations
}

// Daypart percentage allocation by day: { daypartName: { Mon: 40, Tue: 40, ... } }
export type DaypartPercentages = Record<string, Record<string, number>>;

export interface CampaignDaypartsData {
  selectedSlots: Record<string, Record<number, boolean>>;
  daypartPercentages?: DaypartPercentages; // Percentage allocation per daypart per day
}

export interface CampaignChannelsData {
  selectedChannels: string[];
  budgetAllocation?: Record<string, number>; // Budget allocation by channels
}

// Data for sections by each channel in omnichannel campaign
export interface ChannelSectionData {
  audience: CampaignAudienceData;
  geo: {
    selectedZipCodes: string[];
    geoType?: string; // Type of geo: 'zip_codes', 'dmas', 'states', 'districts'
    country: string;
    targetNationally: boolean;
  };
  dayparts: CampaignDaypartsData;
  interests: string[]; // For Interests section
  keywords: string[]; // For Keywords section (search only)
  estimations: {
    audienceEstimation: number;
    marketEstimation: number;
  };
}

// Omnichannel specific data
export interface OmnichannelData {
  carryOverMode: boolean; // "Carry over" mode - data propagates to all channels
  channelData: Record<string, ChannelSectionData>; // Data for each channel separately
}

export interface SavedCampaign {
  id: string;
  general: CampaignGeneralData;
  budget: CampaignBudgetData;
  goal: CampaignGoalData;
  flight: CampaignFlightData;
  linear: CampaignLinearData;
  audience: CampaignAudienceData;
  markets: CampaignMarketsData;
  dayparts: CampaignDaypartsData;
  channels: CampaignChannelsData;
  createdAt: string;
}

export interface CampaignState {
  general: CampaignGeneralData;
  budget: CampaignBudgetData;
  goal: CampaignGoalData;
  flight: CampaignFlightData;
  linear: CampaignLinearData;
  audience: CampaignAudienceData;
  markets: CampaignMarketsData;
  dayparts: CampaignDaypartsData;
  channels: CampaignChannelsData;
  omnichannel: OmnichannelData;
  
  // Computed fields
  estimations: {
    budgetEstimation: number;
    audienceEstimation: number;
    marketEstimation: number;
  };
  
  // List of saved campaigns
  savedCampaigns: SavedCampaign[];
}

// Initial state
const initialState: CampaignState = {
  general: {
    campaignName: '',
    advertiser: '',
    brand: '',
    product: '',
    campaignType: 'Linear',
    cpeCode: '',
    campaignOwner: '',
    campaignApprover: '',
    spotLength: ['60'], // Default selected :60
    spotLengthMix: { fifteen: 0, thirty: 0, sixty: 100 } // Default 100% on :60
  },
  budget: {
    totalBudget: 0,
    budgetType: 'fixed',
    currency: 'USD'
  },
  goal: {
    goalType: 'maximize-impressions',
    targetValue: 0,
    goalMetric: ''
  },
  flight: {
    startDate: '',
    endDate: '',
    flightStatus: 'active'
  },
  linear: {
    broadcasters: [],
    measurementProvider: ''
  },
  audience: {
    gender: [],
    age: [],
    income: [],
    education: [],
    householdSize: []
  },
  markets: {
    selectedMarkets: [],
    mode: 'include'
  },
  dayparts: {
    selectedSlots: {}
  },
  channels: {
    selectedChannels: []
  },
  omnichannel: {
    carryOverMode: true, // Carry over mode is active by default
    channelData: {}
  },
  estimations: {
    budgetEstimation: 0,
    audienceEstimation: 0,
    marketEstimation: 0
  },
  savedCampaigns: []
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    // General Data Actions
    updateGeneralData: (state, action: PayloadAction<Partial<CampaignGeneralData>>) => {
      state.general = { ...state.general, ...action.payload };
    },

    // Budget Data Actions
    updateBudgetData: (state, action: PayloadAction<Partial<CampaignBudgetData>>) => {
      state.budget = { ...state.budget, ...action.payload };
    },

    // Goal Data Actions
    updateGoalData: (state, action: PayloadAction<Partial<CampaignGoalData>>) => {
      state.goal = { ...state.goal, ...action.payload };
    },

    // Flight Data Actions
    updateFlightData: (state, action: PayloadAction<Partial<CampaignFlightData>>) => {
      state.flight = { ...state.flight, ...action.payload };
    },

    // Linear Data Actions
    updateLinearData: (state, action: PayloadAction<Partial<CampaignLinearData>>) => {
      state.linear = { ...state.linear, ...action.payload };
    },

    // Audience Data Actions
    updateAudienceData: (state, action: PayloadAction<Partial<CampaignAudienceData>>) => {
      state.audience = { ...state.audience, ...action.payload };
    },

    // Markets Data Actions
    updateMarketsData: (state, action: PayloadAction<Partial<CampaignMarketsData>>) => {
      state.markets = { ...state.markets, ...action.payload };
    },

    // Dayparts Data Actions
    updateDaypartsData: (state, action: PayloadAction<Partial<CampaignDaypartsData>>) => {
      Object.assign(state.dayparts, action.payload);
    },

    // Channels Data Actions
    updateChannelsData: (state, action: PayloadAction<Partial<CampaignChannelsData>>) => {
      state.channels = { ...state.channels, ...action.payload };
    },

    // Omnichannel Data Actions
    setCarryOverMode: (state, action: PayloadAction<boolean>) => {
      state.omnichannel.carryOverMode = action.payload;
    },
    
    updateChannelSectionData: (
      state, 
      action: PayloadAction<{ 
        channel: string; 
        section: 'audience' | 'geo' | 'dayparts' | 'interests' | 'keywords'; 
        data: any;
      }>
    ) => {
      const { channel, section, data } = action.payload;
      
      if (!state.omnichannel.channelData[channel]) {
        state.omnichannel.channelData[channel] = {
          audience: {
            gender: [],
            age: [],
            income: [],
            education: [],
            householdSize: []
          },
          geo: {
            selectedZipCodes: [],
            geoType: 'zip_codes',
            country: 'United States',
            targetNationally: true
          },
          dayparts: {
            selectedSlots: {}
          },
          interests: [],
          keywords: [],
          estimations: {
            audienceEstimation: 0,
            marketEstimation: 0
          }
        };
      }
      
      // Handle interests and keywords separately as they're direct arrays
      if (section === 'interests') {
        state.omnichannel.channelData[channel].interests = Array.isArray(data) ? data : [];
      } else if (section === 'keywords') {
        state.omnichannel.channelData[channel].keywords = Array.isArray(data) ? data : [];
      } else {
        state.omnichannel.channelData[channel][section] = { 
          ...state.omnichannel.channelData[channel][section], 
          ...data 
        };
      }
    },
    
    initializeChannelData: (state, action: PayloadAction<string[]>) => {
      const channels = action.payload;
      channels.forEach(channel => {
        if (!state.omnichannel.channelData[channel]) {
          state.omnichannel.channelData[channel] = {
            audience: {
              gender: [],
              age: [],
              income: [],
              education: [],
              householdSize: []
            },
            geo: {
              selectedZipCodes: [],
              country: 'United States',
              targetNationally: true
            },
            dayparts: {
              selectedSlots: {}
            },
            interests: [],
            keywords: [],
            estimations: {
              audienceEstimation: 0,
              marketEstimation: 0
            }
          };
        }
      });
    },
    
    // Update estimations for specific channel
    updateChannelEstimations: (
      state,
      action: PayloadAction<{
        channel: string;
        audienceEstimation: number;
        marketEstimation: number;
      }>
    ) => {
      const { channel, audienceEstimation, marketEstimation } = action.payload;
      if (state.omnichannel.channelData[channel]) {
        state.omnichannel.channelData[channel].estimations = {
          audienceEstimation,
          marketEstimation
        };
      }
    },
    
    // Remove channel data (when channel is disabled)
    removeChannelData: (state, action: PayloadAction<string>) => {
      const channel = action.payload;
      delete state.omnichannel.channelData[channel];
    },

    // Estimations Actions
    updateEstimations: (state, action: PayloadAction<Partial<CampaignState['estimations']>>) => {
      state.estimations = { ...state.estimations, ...action.payload };
    },

    // Utility Actions
    resetCampaign: (state) => {
      // Save campaign list on reset
      const savedCampaigns = state.savedCampaigns;
      return { ...initialState, savedCampaigns };
    },
    
    setCampaignData: (state, action: PayloadAction<Partial<CampaignState>>) => {
      return { ...state, ...action.payload };
    },
    
    // Saved Campaigns Actions
    saveCampaign: (state) => {
      const newCampaign: SavedCampaign = {
        id: `campaign_${Date.now()}`,
        general: state.general,
        budget: state.budget,
        goal: state.goal,
        flight: state.flight,
        linear: state.linear,
        audience: state.audience,
        markets: state.markets,
        dayparts: state.dayparts,
        channels: state.channels,
        createdAt: new Date().toISOString()
      };
      state.savedCampaigns.unshift(newCampaign); // Add to beginning of list
    }
  }
});

export const {
  updateGeneralData,
  updateBudgetData,
  updateGoalData,
  updateFlightData,
  updateLinearData,
  updateAudienceData,
  updateMarketsData,
  updateDaypartsData,
  updateChannelsData,
  setCarryOverMode,
  updateChannelSectionData,
  initializeChannelData,
  updateChannelEstimations,
  removeChannelData,
  updateEstimations,
  resetCampaign,
  setCampaignData,
  saveCampaign
} = campaignSlice.actions;

export default campaignSlice.reducer;
