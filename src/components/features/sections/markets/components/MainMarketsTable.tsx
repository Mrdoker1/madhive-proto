'use client';

import React, { useState, useRef } from 'react';
import { Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text, TextInput, Tooltip } from '@mantine/core';
import type { MarketWithStationsData } from '../types';
import type { MarketHandlers } from '../types';
import { calculateMarketImpressions } from '../utils/marketCalculations';

interface MainMarketsTableProps {
  markets: MarketWithStationsData[];
  allSelected: boolean;
  someSelected: boolean;
  handlers: MarketHandlers;
}

const MainMarketsTable: React.FC<MainMarketsTableProps> = ({
  markets,
  allSelected,
  someSelected,
  handlers
}) => {
  // Состояние для хранения предыдущих значений процентов
  const [previousValues, setPreviousValues] = useState<Record<string, number>>({});
  // Состояние для отображения tooltip ошибок
  const [errorTooltips, setErrorTooltips] = useState<Record<string, boolean>>({});
  // Refs для работы с tooltip
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Функция для форматирования процентов (максимум 2 знака после запятой)
  const formatPercentage = (value: number): string => {
    return Number(value.toFixed(2)).toString();
  };

  // Функция для расчета общего процента всех выбранных маркетов
  const getTotalPercentage = () => {
    return markets.reduce((total, market) => {
      return market.selected ? total + market.percentage : total;
    }, 0);
  };

  // Обработчик фокуса - сохраняем текущее значение как предыдущее
  const handlePercentageFocus = (marketId: string, currentValue: number) => {
    setPreviousValues(prev => ({
      ...prev,
      [marketId]: currentValue
    }));
  };

  // Обработчик потери фокуса - валидация
  const handlePercentageBlur = (marketId: string, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;
    const currentMarket = markets.find(m => m.id === marketId);
    
    if (!currentMarket) return;

    // Рассчитываем общий процент если бы мы применили новое значение
    const otherMarketsTotal = markets.reduce((total, market) => {
      if (market.id === marketId || !market.selected) return total;
      return total + market.percentage;
    }, 0);
    
    const wouldBeTotal = otherMarketsTotal + numericValue;
    
    // Если превышает 100%, показываем ошибку и возвращаем предыдущее значение
    if (wouldBeTotal > 100) {
      setErrorTooltips(prev => ({
        ...prev,
        [marketId]: true
      }));
      
      // Возвращаем предыдущее значение
      const previousValue = previousValues[marketId] || currentMarket.percentage;
      handlers.handlePercentageChange(marketId, previousValue.toString());
      
      // Скрываем tooltip через 3 секунды
      setTimeout(() => {
        setErrorTooltips(prev => ({
          ...prev,
          [marketId]: false
        }));
      }, 3000);
    } else {
      // Убираем ошибку если она была
      setErrorTooltips(prev => ({
        ...prev,
        [marketId]: false
      }));
    }
  };
  return (
    <Table
      styles={{
        tr: {
          height: '48px'
        }
      }}
    >
      <TableThead>
        <TableTr>
          <TableTh style={{ width: '40px' }}>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={(event) => handlers.handleSelectAll(event.currentTarget.checked)}
            />
          </TableTh>
          <TableTh>
            <Text size="xs" fw={500}>Market</Text>
          </TableTh>
          <TableTh style={{ width: '120px' }}>
            <Text size="xs" fw={500}>% of Budget</Text>
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
                onChange={(event) => handlers.handleSelect(market.id, event.currentTarget.checked)}
              />
            </TableTd>
            <TableTd>
              <Text size="xs">
                {market.displayName}
              </Text>
            </TableTd>
            <TableTd>
              {market.selected ? (
                <Tooltip
                  label="You have exceeded the maximum budget value"
                  opened={errorTooltips[market.id] || false}
                  color="red"
                  position="top"
                  withArrow
                >
                  <TextInput
                    ref={(el) => { inputRefs.current[market.id] = el; }}
                    size="xs"
                    value={formatPercentage(market.percentage)}
                    onChange={(event) => handlers.handlePercentageChange(market.id, event.currentTarget.value)}
                    onFocus={() => handlePercentageFocus(market.id, market.percentage)}
                    onBlur={(event) => handlePercentageBlur(market.id, event.currentTarget.value)}
                    rightSection={<Text size="xs" c="dimmed">%</Text>}
                    styles={{
                      input: {
                        fontSize: '12px',
                        padding: '4px 20px 4px 0',
                        height: '28px',
                        textAlign: 'center',
                        borderColor: errorTooltips[market.id] ? '#fa5252' : undefined
                      },
                      section: {
                        width: '32px'
                      }
                    }}
                  />
                </Tooltip>
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
              <Text size="xs">{calculateMarketImpressions(market)}</Text>
            </TableTd>
            <TableTd>
              <Text size="xs">
                {market.stations.length > 0 ? 
                  `$${(market.stations.reduce((sum, station) => {
                    const cpmValue = parseFloat(station.cpm.replace('$', ''));
                    return sum + cpmValue;
                  }, 0) / market.stations.length).toFixed(2)}` 
                  : '-'}
              </Text>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
};

export default MainMarketsTable;
