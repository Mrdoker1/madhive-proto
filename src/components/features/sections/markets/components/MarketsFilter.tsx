'use client';

import React, { useMemo } from 'react';
import { MultiSelect } from '@mantine/core';
// import type { MarketData } from '../types';

interface MarketFilterOption {
  id: string;
  name: string;
  displayName: string;
}

interface MarketsFilterProps {
  availableMarkets: MarketFilterOption[];
  selectedMarkets: string[];
  onMarketsChange: (selectedMarkets: string[]) => void;
}

const MarketsFilter: React.FC<MarketsFilterProps> = ({
  availableMarkets,
  selectedMarkets,
  onMarketsChange
}) => {
  // Form data for MultiSelect (memoized)
  const marketOptions = useMemo(() => 
    availableMarkets.map(market => ({
      value: market.name,
      label: market.name // Use name instead of displayName to remove numbers
    })), [availableMarkets]
  );

  return (
    <MultiSelect
      label="Available Markets"
      placeholder="Select markets"
      data={marketOptions}
      value={selectedMarkets}
      onChange={onMarketsChange}
      searchable
      clearable
      hidePickedOptions
      maxDropdownHeight={200}
    />
  );
};

export default MarketsFilter;
