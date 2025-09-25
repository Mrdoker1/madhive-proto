export interface MarketDetailData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  impression: string;
  cpm: string;
  selected: boolean;
}

export interface MarketData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  impression: string;
  cpm: string;
  selected: boolean;
  broadcaster: string;
  details: MarketDetailData[];
}

export interface MarketsState {
  markets: MarketData[];
  expandedDetails: Set<string>;
}

export interface ValidationState {
  totalPercentage: number;
  hasSubMarketOverallocation: boolean;
  isOverHundredPercent: boolean;
}

export interface MarketHandlers {
  handleMarketSelect: (marketId: string, checked: boolean) => void;
  handlePercentageChange: (marketId: string, value: string) => void;
  handleDetailSelect: (marketId: string, detailId: string, checked: boolean) => void;
  handleDetailPercentageChange: (marketId: string, detailId: string, value: string) => void;
  handleSelectAll: (checked: boolean) => void;
  handleToggleDetailExpand: (marketId: string) => void;
}
