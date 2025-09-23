'use client';

import React, { useState, useEffect } from 'react';
import { Select, Radio, Group, Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData } from '@/store/slices/campaignSlice';

interface MarketData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  impression: string;
  cpm: string;
  selected: boolean;
  broadcaster: string;
}

const MarketsSection = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const [markets, setMarkets] = useState<MarketData[]>([]);

  // База данных рынков по broadcasters
  const marketsDatabase: Record<string, MarketData[]> = {
    ABC: [
      {
        id: 'abc-1',
        name: 'New York, NY (ABC)',
        percentage: 25,
        budget: 0,
        impression: '2.5M',
        cpm: '$12.50',
        selected: false,
        broadcaster: 'ABC'
      },
      {
        id: 'abc-2',
        name: 'Los Angeles, CA (ABC)',
        percentage: 30,
        budget: 0,
        impression: '3.0M',
        cpm: '$11.80',
        selected: false,
        broadcaster: 'ABC'
      },
      {
        id: 'abc-3',
        name: 'Chicago, IL (ABC)',
        percentage: 20,
        budget: 0,
        impression: '2.0M',
        cpm: '$13.20',
        selected: false,
        broadcaster: 'ABC'
      },
      {
        id: 'abc-4',
        name: 'Dallas-Ft. Worth, TX (ABC)',
        percentage: 25,
        budget: 0,
        impression: '2.2M',
        cpm: '$12.90',
        selected: false,
        broadcaster: 'ABC'
      }
    ],
    CBS: [
      {
        id: 'cbs-1',
        name: 'New York, NY (CBS)',
        percentage: 28,
        budget: 0,
        impression: '2.8M',
        cpm: '$13.10',
        selected: false,
        broadcaster: 'CBS'
      },
      {
        id: 'cbs-2',
        name: 'Los Angeles, CA (CBS)',
        percentage: 32,
        budget: 0,
        impression: '3.2M',
        cpm: '$12.40',
        selected: false,
        broadcaster: 'CBS'
      },
      {
        id: 'cbs-3',
        name: 'Chicago, IL (CBS)',
        percentage: 22,
        budget: 0,
        impression: '2.1M',
        cpm: '$13.80',
        selected: false,
        broadcaster: 'CBS'
      },
      {
        id: 'cbs-4',
        name: 'Houston, TX (CBS)',
        percentage: 18,
        budget: 0,
        impression: '1.8M',
        cpm: '$14.20',
        selected: false,
        broadcaster: 'CBS'
      }
    ],
    CW: [
      {
        id: 'cw-1',
        name: 'New York, NY (CW)',
        percentage: 15,
        budget: 0,
        impression: '1.2M',
        cpm: '$8.50',
        selected: false,
        broadcaster: 'CW'
      },
      {
        id: 'cw-2',
        name: 'Los Angeles, CA (CW)',
        percentage: 18,
        budget: 0,
        impression: '1.4M',
        cpm: '$8.90',
        selected: false,
        broadcaster: 'CW'
      },
      {
        id: 'cw-3',
        name: 'Atlanta, GA (CW)',
        percentage: 20,
        budget: 0,
        impression: '1.1M',
        cpm: '$9.20',
        selected: false,
        broadcaster: 'CW'
      }
    ],
    FOX: [
      {
        id: 'fox-1',
        name: 'New York, NY (FOX)',
        percentage: 24,
        budget: 0,
        impression: '2.4M',
        cpm: '$12.20',
        selected: false,
        broadcaster: 'FOX'
      },
      {
        id: 'fox-2',
        name: 'Los Angeles, CA (FOX)',
        percentage: 26,
        budget: 0,
        impression: '2.6M',
        cpm: '$11.90',
        selected: false,
        broadcaster: 'FOX'
      },
      {
        id: 'fox-3',
        name: 'Chicago, IL (FOX)',
        percentage: 22,
        budget: 0,
        impression: '2.2M',
        cpm: '$12.80',
        selected: false,
        broadcaster: 'FOX'
      },
      {
        id: 'fox-4',
        name: 'Philadelphia, PA (FOX)',
        percentage: 28,
        budget: 0,
        impression: '2.0M',
        cpm: '$13.50',
        selected: false,
        broadcaster: 'FOX'
      }
    ],
    'Graham Media': [
      {
        id: 'graham-1',
        name: 'Detroit, MI (Graham)',
        percentage: 35,
        budget: 0,
        impression: '1.5M',
        cpm: '$10.20',
        selected: false,
        broadcaster: 'Graham Media'
      },
      {
        id: 'graham-2',
        name: 'Orlando, FL (Graham)',
        percentage: 40,
        budget: 0,
        impression: '1.2M',
        cpm: '$9.80',
        selected: false,
        broadcaster: 'Graham Media'
      },
      {
        id: 'graham-3',
        name: 'San Antonio, TX (Graham)',
        percentage: 25,
        budget: 0,
        impression: '1.0M',
        cpm: '$11.50',
        selected: false,
        broadcaster: 'Graham Media'
      }
    ],
    Gray: [
      {
        id: 'gray-1',
        name: 'Atlanta, GA (Gray)',
        percentage: 30,
        budget: 0,
        impression: '1.3M',
        cpm: '$9.90',
        selected: false,
        broadcaster: 'Gray'
      },
      {
        id: 'gray-2',
        name: 'Birmingham, AL (Gray)',
        percentage: 45,
        budget: 0,
        impression: '0.8M',
        cpm: '$8.70',
        selected: false,
        broadcaster: 'Gray'
      },
      {
        id: 'gray-3',
        name: 'Cleveland, OH (Gray)',
        percentage: 25,
        budget: 0,
        impression: '1.1M',
        cpm: '$10.50',
        selected: false,
        broadcaster: 'Gray'
      }
    ],
    Hearst: [
      {
        id: 'hearst-1',
        name: 'Boston, MA (Hearst)',
        percentage: 32,
        budget: 0,
        impression: '1.4M',
        cpm: '$11.20',
        selected: false,
        broadcaster: 'Hearst'
      },
      {
        id: 'hearst-2',
        name: 'Seattle, WA (Hearst)',
        percentage: 28,
        budget: 0,
        impression: '1.2M',
        cpm: '$10.80',
        selected: false,
        broadcaster: 'Hearst'
      },
      {
        id: 'hearst-3',
        name: 'Pittsburgh, PA (Hearst)',
        percentage: 40,
        budget: 0,
        impression: '0.9M',
        cpm: '$9.60',
        selected: false,
        broadcaster: 'Hearst'
      }
    ],
    NBCU: [
      {
        id: 'nbcu-1',
        name: 'New York, NY (NBC)',
        percentage: 26,
        budget: 0,
        impression: '2.6M',
        cpm: '$13.40',
        selected: false,
        broadcaster: 'NBCU'
      },
      {
        id: 'nbcu-2',
        name: 'Los Angeles, CA (NBC)',
        percentage: 29,
        budget: 0,
        impression: '2.9M',
        cpm: '$12.70',
        selected: false,
        broadcaster: 'NBCU'
      },
      {
        id: 'nbcu-3',
        name: 'Chicago, IL (NBC)',
        percentage: 24,
        budget: 0,
        impression: '2.4M',
        cpm: '$13.90',
        selected: false,
        broadcaster: 'NBCU'
      },
      {
        id: 'nbcu-4',
        name: 'Miami, FL (NBC)',
        percentage: 21,
        budget: 0,
        impression: '1.9M',
        cpm: '$14.60',
        selected: false,
        broadcaster: 'NBCU'
      }
    ],
    'NBCU Telemundo': [
      {
        id: 'telemundo-1',
        name: 'Miami, FL (Telemundo)',
        percentage: 50,
        budget: 0,
        impression: '1.8M',
        cpm: '$7.20',
        selected: false,
        broadcaster: 'NBCU Telemundo'
      },
      {
        id: 'telemundo-2',
        name: 'Los Angeles, CA (Telemundo)',
        percentage: 35,
        budget: 0,
        impression: '2.1M',
        cpm: '$8.40',
        selected: false,
        broadcaster: 'NBCU Telemundo'
      },
      {
        id: 'telemundo-3',
        name: 'New York, NY (Telemundo)',
        percentage: 15,
        budget: 0,
        impression: '1.5M',
        cpm: '$9.80',
        selected: false,
        broadcaster: 'NBCU Telemundo'
      }
    ]
  };

  // Функция для расчета процентов и бюджета по выбранным маркетам
  const calculateBudgetAndPercentageDistribution = (availableMarkets: MarketData[], selectedMarkets: MarketData[]) => {
    if (selectedMarkets.length === 0) {
      return availableMarkets.map(market => ({ 
        ...market, 
        budget: 0,
        percentage: 0
      }));
    }

    // Равномерное распределение процентов между выбранными маркетами
    const percentagePerMarket = 100 / selectedMarkets.length;
    
    return availableMarkets.map(market => {
      if (market.selected) {
        // Рассчитываем бюджет на основе процента от общего бюджета
        const budget = (budgetData.totalBudget * percentagePerMarket) / 100;
        return {
          ...market,
          percentage: Math.round(percentagePerMarket * 100) / 100, // Округляем до 2 знаков
          budget: budget
        };
      } else {
        return {
          ...market,
          percentage: 0,
          budget: 0
        };
      }
    });
  };

  // Загружаем рынки при изменении выбранных broadcasters
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
      return;
    }

    // Собираем все рынки для выбранных broadcasters
    const allAvailableMarkets: MarketData[] = [];
    linearData.broadcasters.forEach(broadcaster => {
      if (marketsDatabase[broadcaster]) {
        allAvailableMarkets.push(...marketsDatabase[broadcaster]);
      }
    });

    // Проставляем статус selected на основе сохраненных данных
    const marketsWithSelection = allAvailableMarkets.map(market => ({
      ...market,
      selected: marketsData.selectedMarkets.includes(market.name)
    }));

    // Рассчитываем распределение процентов и бюджета
    const selectedMarkets = marketsWithSelection.filter(market => market.selected);
    const marketsWithBudgetAndPercentage = calculateBudgetAndPercentageDistribution(marketsWithSelection, selectedMarkets);
    
    setMarkets(marketsWithBudgetAndPercentage);
  }, [linearData.broadcasters, marketsData.selectedMarkets, budgetData.totalBudget]);

  const handleModeChange = (mode: 'include' | 'exclude') => {
    dispatch(updateMarketsData({ mode }));
  };

  const handleSelectAll = (checked: boolean) => {
    const updatedMarkets = markets.map(market => ({ ...market, selected: checked }));
    
    const selectedMarketNames = checked ? markets.map(market => market.name) : [];
    const selectedMarkets = updatedMarkets.filter(market => market.selected);
    const marketsWithBudgetAndPercentage = calculateBudgetAndPercentageDistribution(updatedMarkets, selectedMarkets);
    
    setMarkets(marketsWithBudgetAndPercentage);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const handleMarketSelect = (marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => 
      market.id === marketId ? { ...market, selected: checked } : market
    );
    
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    const selectedMarkets = updatedMarkets.filter(market => market.selected);
    const marketsWithBudgetAndPercentage = calculateBudgetAndPercentageDistribution(updatedMarkets, selectedMarkets);
    
    setMarkets(marketsWithBudgetAndPercentage);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  return (
    <div>
      {/* Info message and Radio buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        {/* Info message */}
        <div>
          {linearData.broadcasters.length === 0 ? (
            <Text size="sm" c="dimmed">
              Select broadcasters in Linear Details to see available markets
            </Text>
          ) : (
            <Text size="sm" c="dark">
              Markets available for selected broadcasters: {linearData.broadcasters.join(', ')}
            </Text>
          )}
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
                <Text size="xs">
                  {market.budget > 0 ? `$${market.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'}
                </Text>
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
