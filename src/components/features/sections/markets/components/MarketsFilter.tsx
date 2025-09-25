'use client';

import React from 'react';
import { MultiSelect } from '@mantine/core';
import type { MarketData } from '../types';

interface MarketsFilterProps {
  availableMarkets: MarketData[];
  selectedMarkets: string[];
  onMarketsChange: (selectedMarkets: string[]) => void;
}

const MarketsFilter: React.FC<MarketsFilterProps> = ({
  availableMarkets,
  selectedMarkets,
  onMarketsChange
}) => {
  // Формируем данные для MultiSelect
  const marketOptions = availableMarkets.map(market => ({
    value: market.name,
    label: market.name
  }));

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
