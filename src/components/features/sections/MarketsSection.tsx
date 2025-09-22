'use client';

import React, { useState, useEffect } from 'react';
import { Select, Radio, Group, Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData } from '@/store/slices/campaignSlice';

interface MarketData {
  id: string;
  name: string;
  percentage: number;
  budget: string;
  impression: string;
  cpm: string;
  selected: boolean;
}

const MarketsSection = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(marketsData.selectedRegion || null);
  const [markets, setMarkets] = useState<MarketData[]>([]);

  const regionOptions = [
    { value: 'texas', label: 'Texas Markets' },
    { value: 'california', label: 'California Markets' },
    { value: 'newyork', label: 'New York Markets' },
    { value: 'florida', label: 'Florida Markets' }
  ];

  // База данных рынков по регионам
  const marketsDatabase: Record<string, MarketData[]> = {
    texas: [
      {
        id: 'tx-1',
        name: 'Dallas-Ft. Worth, TX (4)',
        percentage: 40,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'tx-2',
        name: 'Houston, TX (2)',
        percentage: 40,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'tx-3',
        name: 'San Antonio, TX (2)',
        percentage: 20,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      }
    ],
    california: [
      {
        id: 'ca-1',
        name: 'Los Angeles, CA (2)',
        percentage: 50,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'ca-2',
        name: 'San Francisco, CA (6)',
        percentage: 35,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'ca-3',
        name: 'San Diego, CA (28)',
        percentage: 15,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      }
    ],
    newyork: [
      {
        id: 'ny-1',
        name: 'New York, NY (1)',
        percentage: 60,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'ny-2',
        name: 'Albany, NY (51)',
        percentage: 25,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'ny-3',
        name: 'Buffalo, NY (52)',
        percentage: 15,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      }
    ],
    florida: [
      {
        id: 'fl-1',
        name: 'Miami-Ft. Lauderdale, FL (16)',
        percentage: 45,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'fl-2',
        name: 'Tampa-St. Petersburg, FL (13)',
        percentage: 35,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      },
      {
        id: 'fl-3',
        name: 'Orlando, FL (19)',
        percentage: 20,
        budget: '#',
        impression: '#',
        cpm: '#',
        selected: false
      }
    ]
  };

  // Обработчик выбора региона
  // Загружаем рынки при изменении региона
  useEffect(() => {
    if (selectedRegion && marketsDatabase[selectedRegion]) {
      const regionMarkets = marketsDatabase[selectedRegion].map(market => ({
        ...market,
        selected: marketsData.selectedMarkets.includes(market.name)
      }));
      setMarkets(regionMarkets);
    } else {
      setMarkets([]);
    }
  }, [selectedRegion, marketsData.selectedMarkets]);

  const handleRegionChange = (region: string | null) => {
    setSelectedRegion(region);
    dispatch(updateMarketsData({ selectedRegion: region || undefined }));
  };

  const handleModeChange = (mode: 'include' | 'exclude') => {
    dispatch(updateMarketsData({ mode }));
  };

  const handleSelectAll = (checked: boolean) => {
    const updatedMarkets = markets.map(market => ({ ...market, selected: checked }));
    setMarkets(updatedMarkets);
    
    const selectedMarketNames = checked ? markets.map(market => market.name) : [];
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const handleMarketSelect = (marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => 
      market.id === marketId ? { ...market, selected: checked } : market
    );
    setMarkets(updatedMarkets);
    
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  return (
    <div>
      {/* Top Row: Dropdown and Radio buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
        {/* Dropdown - полная ширина */}
        <div style={{ flex: 1 }}>
          <Select
            placeholder="Select region or market"
            data={regionOptions}
            value={selectedRegion}
            onChange={handleRegionChange}
            clearable
          />
        </div>

        {/* Radio buttons */}
        <Radio.Group value={marketsData.mode} onChange={(value) => handleModeChange(value as 'include' | 'exclude')}>
          <Group gap="md">
            <Radio value="include" label="Include" />
            <Radio value="exclude" label="Exclude" />
          </Group>
        </Radio.Group>
      </div>

      {/* Markets Table */}
      <Table>
        <TableThead>
          <TableTr>
            <TableTh style={{ width: '40px' }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onChange={(event) => handleSelectAll(event.currentTarget.checked)}
              />
            </TableTh>
            <TableTh>
              <Text size="xs" fw={500}>Market</Text>
            </TableTh>
            <TableTh style={{ width: '80px' }}>
              <Text size="xs" fw={500}>%</Text>
            </TableTh>
            <TableTh style={{ width: '100px' }}>
              <Text size="xs" fw={500}>Budget</Text>
            </TableTh>
            <TableTh style={{ width: '120px' }}>
              <Text size="xs" fw={500}>Impression</Text>
            </TableTh>
            <TableTh style={{ width: '80px' }}>
              <Text size="xs" fw={500}>CPM</Text>
            </TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {markets.map((market) => (
            <TableTr key={market.id}>
              <TableTd>
                <Checkbox
                  checked={market.selected}
                  onChange={(event) => handleMarketSelect(market.id, event.currentTarget.checked)}
                />
              </TableTd>
              <TableTd>
                <Text size="xs">{market.name}</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.percentage}%</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.budget}</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.impression}</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.cpm}</Text>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  );
};

export default MarketsSection;
