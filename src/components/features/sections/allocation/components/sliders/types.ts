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
  step?: number; // Step for value change (default 100)
  color?: string; // Marker color (default pink)
  showChannelColors?: boolean; // Show channel colors on labels (default false)
  onChange: (value: number) => void;
}

export interface ChannelSliderProps {
  allocation: ChannelAllocation;
  onBudgetChange: (channelId: string, newBudget: number) => void;
  onRemove: (channelId: string) => void;
  isLoading?: boolean;
  showChannelColors?: boolean; // Show channel colors on labels (default false)
}
