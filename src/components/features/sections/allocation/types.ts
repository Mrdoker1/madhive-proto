export interface ChannelPoint {
  id: string;
  name: string;
  color: string;
  budget: number;
  reach: number;
}

export interface ChannelAllocation extends ChannelPoint {
  percentage: number;
}

export interface DraggablePointProps {
  point: ChannelPoint;
  chartWidth: number;
  chartHeight: number;
  totalBudget: number;
  onPointChange: (channelId: string, newBudget: number, newReach: number) => void;
}

export interface ChartDimensions {
  width: number;
  height: number;
}

export interface AllocationSectionProps {
  className?: string;
}
