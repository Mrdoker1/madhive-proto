import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типы для данных кампании
export interface CampaignGeneralData {
  campaignName: string;
  advertiser: string;
  brand: string;
  product: string;
  campaignType: string;
  agency: string;
  cpeCode: string;
  campaignOwner: string;
  campaignApprover: string;
  spotLength: string[]; // Массив выбранных длительностей: ['15', '30', '60']
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
}

export interface CampaignLinearData {
  broadcasters: string[];
  measurementProvider: string;
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
  marketsDetails?: MarketBudget[]; // Детальная информация о markets и stations
}

export interface CampaignDaypartsData {
  selectedSlots: Record<string, Record<number, boolean>>;
}

export interface CampaignChannelsData {
  selectedChannels: string[];
  budgetAllocation?: Record<string, number>; // Распределение бюджета по каналам
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
  
  // Вычисляемые поля
  estimations: {
    budgetEstimation: number;
    audienceEstimation: number;
    marketEstimation: number;
  };
  
  // Список сохранённых кампаний
  savedCampaigns: SavedCampaign[];
}

// Начальное состояние
const initialState: CampaignState = {
  general: {
    campaignName: '',
    advertiser: '',
    brand: '',
    product: '',
    campaignType: 'Linear',
    agency: '',
    cpeCode: '',
    campaignOwner: '',
    campaignApprover: '',
    spotLength: ['60'] // По умолчанию выбран :60
  },
  budget: {
    totalBudget: 0,
    budgetType: 'fixed',
    currency: 'USD'
  },
  goal: {
    goalType: '',
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

    // Estimations Actions
    updateEstimations: (state, action: PayloadAction<Partial<CampaignState['estimations']>>) => {
      state.estimations = { ...state.estimations, ...action.payload };
    },

    // Utility Actions
    resetCampaign: (state) => {
      // Сохраняем список кампаний при сбросе
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
      state.savedCampaigns.unshift(newCampaign); // Добавляем в начало списка
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
  updateEstimations,
  resetCampaign,
  setCampaignData,
  saveCampaign
} = campaignSlice.actions;

export default campaignSlice.reducer;
