'use client';

import React, { useState, useRef } from 'react';
import { Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text, TextInput, Tooltip } from '@mantine/core';
import type { MarketWithStationsData } from '../types';
import type { MarketHandlers } from '../types';

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
  // State to store previous percentage values
  const [previousValues, setPreviousValues] = useState<Record<string, number>>({});
  // State to display error tooltips
  const [errorTooltips, setErrorTooltips] = useState<Record<string, boolean>>({});
  // Refs for working with tooltips
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Function to format percentages (maximum 2 decimal places)
  const formatPercentage = (value: number): string => {
    return Number(value.toFixed(2)).toString();
  };

  // Function to calculate total percentage of all selected markets
  const getTotalPercentage = () => {
    return markets.reduce((total, market) => {
      return market.selected ? total + market.percentage : total;
    }, 0);
  };

  // Focus handler - save current value as previous
  const handlePercentageFocus = (marketId: string, currentValue: number) => {
    setPreviousValues(prev => ({
      ...prev,
      [marketId]: currentValue
    }));
  };

  // Blur handler - validation
  const handlePercentageBlur = (marketId: string, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;
    const currentMarket = markets.find(m => m.id === marketId);
    
    if (!currentMarket) return;

    // Calculate total percentage if we were to apply new value
    const otherMarketsTotal = markets.reduce((total, market) => {
      if (market.id === marketId || !market.selected) return total;
      return total + market.percentage;
    }, 0);
    
    const wouldBeTotal = otherMarketsTotal + numericValue;
    
    // If exceeds 100%, show error and revert to previous value
    if (wouldBeTotal > 100) {
      setErrorTooltips(prev => ({
        ...prev,
        [marketId]: true
      }));
      
      // Revert to previous value
      const previousValue = previousValues[marketId] || currentMarket.percentage;
      handlers.handlePercentageChange(marketId, previousValue.toString());
      
      // Hide tooltip after 3 seconds
      setTimeout(() => {
        setErrorTooltips(prev => ({
          ...prev,
          [marketId]: false
        }));
      }, 3000);
    } else {
      // Remove error if it was present
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
                {market.name} ({market.stations.length})
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
                        fontSize: '13px',
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
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
};

export default MainMarketsTable;
