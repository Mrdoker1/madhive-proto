'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text, ActionIcon, TextInput, Alert } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconAlertTriangle } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData } from '@/store/slices/campaignSlice';
import MarketDetailTable from './MarketDetailTable';

interface MarketDetailData {
  id: string;
  name: string;
  conversionRate: number;
  revenue: number;
  roi: number;
}

interface MarketData {
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

const MarketsSection = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set());

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
        broadcaster: 'ABC',
        details: [
          { id: 'abc-1-1', name: 'Good Morning America', conversionRate: 28, revenue: 0, roi: 0 },
          { id: 'abc-1-2', name: 'World News Tonight', conversionRate: 32, revenue: 0, roi: 0 },
          { id: 'abc-1-3', name: 'The View', conversionRate: 25, revenue: 0, roi: 0 },
          { id: 'abc-1-4', name: 'General Hospital', conversionRate: 15, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'abc-2',
        name: 'Los Angeles, CA (ABC)',
        percentage: 30,
        budget: 0,
        impression: '3.0M',
        cpm: '$11.80',
        selected: false,
        broadcaster: 'ABC',
        details: [
          { id: 'abc-2-1', name: 'Good Morning America', conversionRate: 30, revenue: 0, roi: 0 },
          { id: 'abc-2-2', name: 'The Bachelor', conversionRate: 35, revenue: 0, roi: 0 },
          { id: 'abc-2-3', name: 'Dancing with the Stars', conversionRate: 28, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'abc-3',
        name: 'Chicago, IL (ABC)',
        percentage: 20,
        budget: 0,
        impression: '2.0M',
        cpm: '$13.20',
        selected: false,
        broadcaster: 'ABC',
        details: [
          { id: 'abc-3-1', name: 'World News Tonight', conversionRate: 22, revenue: 0, roi: 0 },
          { id: 'abc-3-2', name: 'American Idol', conversionRate: 26, revenue: 0, roi: 0 },
          { id: 'abc-3-3', name: 'The Rookie', conversionRate: 18, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'abc-4',
        name: 'Dallas-Ft. Worth, TX (ABC)',
        percentage: 25,
        budget: 0,
        impression: '2.2M',
        cpm: '$12.90',
        selected: false,
        broadcaster: 'ABC',
        details: [
          { id: 'abc-4-1', name: 'Sandya Kall Show', conversionRate: 30, revenue: 0, roi: 0 },
          { id: 'abc-4-2', name: 'Local Morning News', conversionRate: 25, revenue: 0, roi: 0 },
          { id: 'abc-4-3', name: 'Evening Sports Report', conversionRate: 20, revenue: 0, roi: 0 }
        ]
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
        broadcaster: 'CBS',
        details: [
          { id: 'cbs-1-1', name: 'CBS Evening News', conversionRate: 31, revenue: 0, roi: 0 },
          { id: 'cbs-1-2', name: 'NCIS', conversionRate: 29, revenue: 0, roi: 0 },
          { id: 'cbs-1-3', name: 'The Price is Right', conversionRate: 26, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'cbs-2',
        name: 'Los Angeles, CA (CBS)',
        percentage: 32,
        budget: 0,
        impression: '3.2M',
        cpm: '$12.40',
        selected: false,
        broadcaster: 'CBS',
        details: [
          { id: 'cbs-2-1', name: 'Young and the Restless', conversionRate: 33, revenue: 0, roi: 0 },
          { id: 'cbs-2-2', name: 'Survivor', conversionRate: 35, revenue: 0, roi: 0 },
          { id: 'cbs-2-3', name: 'Blue Bloods', conversionRate: 28, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'cbs-3',
        name: 'Chicago, IL (CBS)',
        percentage: 22,
        budget: 0,
        impression: '2.1M',
        cpm: '$13.80',
        selected: false,
        broadcaster: 'CBS',
        details: [
          { id: 'cbs-3-1', name: 'Chicago Fire', conversionRate: 24, revenue: 0, roi: 0 },
          { id: 'cbs-3-2', name: 'CSI: Vegas', conversionRate: 21, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'cbs-4',
        name: 'Houston, TX (CBS)',
        percentage: 18,
        budget: 0,
        impression: '1.8M',
        cpm: '$14.20',
        selected: false,
        broadcaster: 'CBS',
        details: [
          { id: 'cbs-4-1', name: 'Local News at 6', conversionRate: 19, revenue: 0, roi: 0 },
          { id: 'cbs-4-2', name: 'Sports Update', conversionRate: 17, revenue: 0, roi: 0 }
        ]
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
        broadcaster: 'CW',
        details: [
          { id: 'cw-1-1', name: 'Riverdale', conversionRate: 16, revenue: 0, roi: 0 },
          { id: 'cw-1-2', name: 'The Flash', conversionRate: 14, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'cw-2',
        name: 'Los Angeles, CA (CW)',
        percentage: 18,
        budget: 0,
        impression: '1.4M',
        cpm: '$8.90',
        selected: false,
        broadcaster: 'CW',
        details: [
          { id: 'cw-2-1', name: 'Superman & Lois', conversionRate: 19, revenue: 0, roi: 0 },
          { id: 'cw-2-2', name: 'All American', conversionRate: 17, revenue: 0, roi: 0 }
        ]
      },
      {
        id: 'cw-3',
        name: 'Atlanta, GA (CW)',
        percentage: 20,
        budget: 0,
        impression: '1.1M',
        cpm: '$9.20',
        selected: false,
        broadcaster: 'CW',
        details: [
          { id: 'cw-3-1', name: 'Walker', conversionRate: 21, revenue: 0, roi: 0 },
          { id: 'cw-3-2', name: 'Local Programming', conversionRate: 19, revenue: 0, roi: 0 }
        ]
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
        broadcaster: 'FOX',
        details: [{ id: 'fox-1-1', name: 'FOX News at 6', conversionRate: 25, revenue: 0, roi: 0 }]
      },
      {
        id: 'fox-2',
        name: 'Los Angeles, CA (FOX)',
        percentage: 26,
        budget: 0,
        impression: '2.6M',
        cpm: '$11.90',
        selected: false,
        broadcaster: 'FOX',
        details: [{ id: 'fox-2-1', name: 'The Simpsons', conversionRate: 27, revenue: 0, roi: 0 }]
      },
      {
        id: 'fox-3',
        name: 'Chicago, IL (FOX)',
        percentage: 22,
        budget: 0,
        impression: '2.2M',
        cpm: '$12.80',
        selected: false,
        broadcaster: 'FOX',
        details: [{ id: 'fox-3-1', name: 'Chicago Bears Game', conversionRate: 23, revenue: 0, roi: 0 }]
      },
      {
        id: 'fox-4',
        name: 'Philadelphia, PA (FOX)',
        percentage: 28,
        budget: 0,
        impression: '2.0M',
        cpm: '$13.50',
        selected: false,
        broadcaster: 'FOX',
        details: [{ id: 'fox-4-1', name: 'Local Sports', conversionRate: 29, revenue: 0, roi: 0 }]
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
        broadcaster: 'Graham Media',
        details: []
      },
      {
        id: 'graham-2',
        name: 'Orlando, FL (Graham)',
        percentage: 40,
        budget: 0,
        impression: '1.2M',
        cpm: '$9.80',
        selected: false,
        broadcaster: 'Graham Media',
        details: []
      },
      {
        id: 'graham-3',
        name: 'San Antonio, TX (Graham)',
        percentage: 25,
        budget: 0,
        impression: '1.0M',
        cpm: '$11.50',
        selected: false,
        broadcaster: 'Graham Media',
        details: []
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
        broadcaster: 'Gray',
        details: []
      },
      {
        id: 'gray-2',
        name: 'Birmingham, AL (Gray)',
        percentage: 45,
        budget: 0,
        impression: '0.8M',
        cpm: '$8.70',
        selected: false,
        broadcaster: 'Gray',
        details: []
      },
      {
        id: 'gray-3',
        name: 'Cleveland, OH (Gray)',
        percentage: 25,
        budget: 0,
        impression: '1.1M',
        cpm: '$10.50',
        selected: false,
        broadcaster: 'Gray',
        details: []
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
        broadcaster: 'Hearst',
        details: []
      },
      {
        id: 'hearst-2',
        name: 'Seattle, WA (Hearst)',
        percentage: 28,
        budget: 0,
        impression: '1.2M',
        cpm: '$10.80',
        selected: false,
        broadcaster: 'Hearst',
        details: []
      },
      {
        id: 'hearst-3',
        name: 'Pittsburgh, PA (Hearst)',
        percentage: 40,
        budget: 0,
        impression: '0.9M',
        cpm: '$9.60',
        selected: false,
        broadcaster: 'Hearst',
        details: []
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
        broadcaster: 'NBCU',
        details: []
      },
      {
        id: 'nbcu-2',
        name: 'Los Angeles, CA (NBC)',
        percentage: 29,
        budget: 0,
        impression: '2.9M',
        cpm: '$12.70',
        selected: false,
        broadcaster: 'NBCU',
        details: []
      },
      {
        id: 'nbcu-3',
        name: 'Chicago, IL (NBC)',
        percentage: 24,
        budget: 0,
        impression: '2.4M',
        cpm: '$13.90',
        selected: false,
        broadcaster: 'NBCU',
        details: []
      },
      {
        id: 'nbcu-4',
        name: 'Miami, FL (NBC)',
        percentage: 21,
        budget: 0,
        impression: '1.9M',
        cpm: '$14.60',
        selected: false,
        broadcaster: 'NBCU',
        details: []
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
        broadcaster: 'NBCU Telemundo',
        details: []
      },
      {
        id: 'telemundo-2',
        name: 'Los Angeles, CA (Telemundo)',
        percentage: 35,
        budget: 0,
        impression: '2.1M',
        cpm: '$8.40',
        selected: false,
        broadcaster: 'NBCU Telemundo',
        details: []
      },
      {
        id: 'telemundo-3',
        name: 'New York, NY (Telemundo)',
        percentage: 15,
        budget: 0,
        impression: '1.5M',
        cpm: '$9.80',
        selected: false,
        broadcaster: 'NBCU Telemundo',
        details: []
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

  // Функция для обработки изменения процента для конкретного рынка
  const handlePercentageChange = (marketId: string, value: string) => {
    // Разрешаем только цифры и точку для десятичных чисел
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    const numericValue = parseFloat(value) || 0;
    
    // Ограничиваем максимальным значением 100
    if (numericValue > 100) return;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        // Пересчитываем бюджет на основе нового процента
        const budget = (budgetData.totalBudget * numericValue) / 100;
        return {
          ...market,
          percentage: numericValue,
          budget: budget
        };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
  };

  // Функция для расчета общего процента выбранных рынков
  const getTotalPercentage = () => {
    return markets
      .filter(market => market.selected)
      .reduce((total, market) => total + market.percentage, 0);
  };

  // Проверяем, превышает ли общий процент 100%
  const totalPercentage = getTotalPercentage();
  const isOverHundredPercent = totalPercentage > 100;

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

    // Сохраняем уже введенные пользователем проценты
    const marketsWithPreservedData = marketsWithSelection.map(market => {
      // Ищем существующий рынок с теми же данными, чтобы сохранить введенные проценты
      const existingMarket = markets.find(m => m.id === market.id);
      if (existingMarket) {
        // Сохраняем процент и пересчитываем бюджет
        const budget = market.selected ? (budgetData.totalBudget * existingMarket.percentage) / 100 : 0;
        return {
          ...market,
          percentage: market.selected ? existingMarket.percentage : 0,
          budget: budget
        };
      }
      // Для новых рынков - проценты в 0
      return {
        ...market,
        percentage: 0,
        budget: 0
      };
    });
    
    setMarkets(marketsWithPreservedData);
  }, [linearData.broadcasters, marketsData.selectedMarkets, budgetData.totalBudget]);


  const handleSelectAll = (checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      const newMarket = { ...market, selected: checked };
      // При снятии выделения сбрасываем процент и бюджет
      if (!checked) {
        newMarket.percentage = 0;
        newMarket.budget = 0;
      }
      // При выделении оставляем процент как есть (0), пользователь сам введет
      return newMarket;
    });
    
    const selectedMarketNames = checked ? updatedMarkets.map(market => market.name) : [];
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const handleMarketSelect = (marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const newMarket = { ...market, selected: checked };
        // При снятии выделения сбрасываем процент и бюджет
        if (!checked) {
          newMarket.percentage = 0;
          newMarket.budget = 0;
        }
        // При выделении оставляем процент как есть (0), пользователь сам введет
        return newMarket;
      }
      return market;
    });
    
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const handleToggleExpand = (marketId: string) => {
    setExpandedMarkets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
      } else {
        newSet.add(marketId);
      }
      return newSet;
    });
  };

  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  return (
    <div>
      {/* Info message */}
      <div style={{ marginBottom: '24px' }}>
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

      {/* Alert for percentage validation */}
      {isOverHundredPercent && (
        <Alert 
          icon={<IconAlertTriangle size={16} />}
          title="Percentage Allocation Warning"
          color="orange"
          style={{ marginBottom: '20px' }}
        >
          Total percentage allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
          Please adjust the percentages to ensure they do not exceed 100% in total.
        </Alert>
      )}

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
            <TableTh style={{ width: '30px' }}>
              {/* Expand/Collapse column header */}
            </TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {markets.map((market) => (
            <React.Fragment key={market.id}>
              <TableTr>
                <TableTd>
                  <Checkbox
                    checked={market.selected}
                    onChange={(event) => handleMarketSelect(market.id, event.currentTarget.checked)}
                  />
                </TableTd>
                <TableTd>
                  <Text size="xs">
                    {market.name}
                    {market.details.length > 0 && ` (${market.details.length})`}
                  </Text>
                </TableTd>
                <TableTd>
                  {market.selected ? (
                    <TextInput
                      size="xs"
                      value={market.percentage.toString()}
                      onChange={(event) => handlePercentageChange(market.id, event.currentTarget.value)}
                      rightSection={<Text size="xs" c="dimmed">%</Text>}
                      styles={{
                        input: {
                          fontSize: '12px',
                          padding: '4px 20px 4px 0',
                          height: '28px',
                          textAlign: 'center'
                        },
                        section: {
                          width: '32px'
                        }
                      }}
                    />
                  ) : (
                    <Text size="xs" c="dimmed">-</Text>
                  )}
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
                <TableTd>
                  {market.details.length > 0 && (
                    <ActionIcon
                      variant="transparent"
                      size="sm"
                      onClick={() => handleToggleExpand(market.id)}
                      title={expandedMarkets.has(market.id) ? "Collapse" : "Expand"}
                      style={{ color: 'var(--primary-color)' }}
                    >
                      {expandedMarkets.has(market.id) ? (
                        <IconChevronDown size={16} />
                      ) : (
                        <IconChevronRight size={16} />
                      )}
                    </ActionIcon>
                  )}
                </TableTd>
              </TableTr>
              {expandedMarkets.has(market.id) && market.details.length > 0 && (
                <TableTr>
                  <TableTd colSpan={7} style={{ padding: 0 }}>
                    <MarketDetailTable 
                      marketName={market.name}
                      details={market.details}
                    />
                  </TableTd>
                </TableTr>
              )}
            </React.Fragment>
          ))}
        </TableTbody>
      </Table>
    </div>
  );
};

export default MarketsSection;
