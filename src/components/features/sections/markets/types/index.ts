import type { StationData } from '@/data/stationsData';
import type { MarketInfo } from '@/data/marketsData';

export interface MarketWithStationsData {
  id: string;
  name: string;
  displayName: string;
  rank: number;
  marketSize: number;
  percentage: number;
  budget: number;
  selected: boolean;
  stations: StationSelectionData[];
}

export interface StationSelectionData extends StationData {
  selected: boolean;
  percentage: number;
  budget: number;
}


export interface MarketHandlers {
  handleSelectAll: (checked: boolean) => void;
  handleSelect: (marketId: string, checked: boolean) => void;
  handlePercentageChange: (marketId: string, value: string) => void;
  handleToggleDetailExpand: (marketId: string) => void;
  handleDetailSelect: (marketId: string, stationId: string, checked: boolean) => void;
  handleDetailSelectAll: (marketId: string, checked: boolean) => void;
  handleDetailPercentageChange: (marketId: string, stationId: string, value: string) => void;
}
