export interface ChannelAllocation {
  id: string;
  name: string;
  color: string;
  budget: number;
  maxReach: number;
  reachPercent: number;
  isInefficient: boolean;
}

export interface SimpleSliderProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export interface ChannelSliderProps {
  allocation: ChannelAllocation;
  onBudgetChange: (channelId: string, newBudget: number) => void;
  onRemove: (channelId: string) => void;
  isLoading?: boolean;
}
