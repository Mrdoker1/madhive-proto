'use client';

import React from 'react';
import { Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text, TextInput } from '@mantine/core';
import type { MarketData } from '@/data/marketsData';
import type { MarketHandlers } from '../types';
import { calculateMarketImpressions } from '../utils/marketCalculations';

interface MainMarketsTableProps {
  markets: MarketData[];
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
                onChange={(event) => handlers.handleMarketSelect(market.id, event.currentTarget.checked)}
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
                  onChange={(event) => handlers.handlePercentageChange(market.id, event.currentTarget.value)}
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
              <Text size="xs">{calculateMarketImpressions(market)}</Text>
            </TableTd>
            <TableTd>
              <Text size="xs">{market.cpm}</Text>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
};

export default MainMarketsTable;
