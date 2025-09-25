'use client';

import React from 'react';
import { Table, TableTbody, TableTr, TableTd, TableTh, Checkbox, TextInput, Text, Collapse } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import type { MarketData } from '../types';

interface MarketDetailTableProps {
  market: MarketData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDetailSelect: (detailId: string, checked: boolean) => void;
  onDetailSelectAll: (checked: boolean) => void;
  onDetailPercentageChange: (detailId: string, value: string) => void;
}

const MarketDetailTable: React.FC<MarketDetailTableProps> = ({ 
  market, 
  isExpanded, 
  onToggleExpand, 
  onDetailSelect, 
  onDetailSelectAll,
  onDetailPercentageChange 
}) => {
  const totalDetailBudget = market.details.reduce((sum, detail) => sum + detail.budget, 0);
  const totalDetailPercentage = market.details.reduce((sum, detail) => sum + detail.percentage, 0);
  const allDetailsSelected = market.details.length > 0 && market.details.every(detail => detail.selected);
  const someDetailsSelected = market.details.some(detail => detail.selected);

  const handleSelectAllDetails = (checked: boolean) => {
    console.log(`Select All clicked for ${market.name}: ${checked}`);
    onDetailSelectAll(checked);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    console.log('Toggle clicked for market:', market.name, 'current expanded:', isExpanded);
    onToggleExpand();
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Header с информацией о рынке и кнопкой коллапса */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '12px 16px',
          marginBottom: '8px',
          cursor: 'pointer'
        }}
        onClick={handleToggleClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#291036', display: 'flex', alignItems: 'center' }}>
            {isExpanded ? 
              <IconChevronDown size={16} /> : 
              <IconChevronRight size={16} />
            }
          </div>
          <Text fw={500} size="sm">{market.name} ({market.details.length})</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Text size="xs" c="dimmed">
            Total Budget: ${totalDetailBudget.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </Text>
          <Text size="xs" c="dimmed">
            Total %: {totalDetailPercentage.toFixed(1)}%
          </Text>
        </div>
      </div>

      {/* Детальная таблица */}
      <Collapse in={isExpanded}>
        <Table>
          <TableTbody>
            {/* Header row для детальной таблицы */}
            <TableTr style={{ height: '48px' }}>
              <TableTh style={{ width: '40px', textAlign: 'center' }}>
                <Checkbox
                  checked={allDetailsSelected}
                  indeterminate={someDetailsSelected && !allDetailsSelected}
                  onChange={(event) => handleSelectAllDetails(event.currentTarget.checked)}
                />
              </TableTh>
              <TableTh>
                <Text size="xs" fw={500}>Market Details</Text>
              </TableTh>
              <TableTh style={{ width: '120px' }}>
                <Text size="xs" fw={500}>% of Budget</Text>
              </TableTh>
              <TableTh style={{ width: '120px' }}>
                <Text size="xs" fw={500}>Budget</Text>
              </TableTh>
              <TableTh style={{ width: '100px' }}>
                <Text size="xs" fw={500}>Impression</Text>
              </TableTh>
              <TableTh style={{ width: '80px' }}>
                <Text size="xs" fw={500}>CPM</Text>
              </TableTh>
            </TableTr>
            
            {/* Detail rows */}
            {market.details.map((detail) => (
              <TableTr key={detail.id} style={{ height: '48px' }}>
                <TableTd>
                  <Checkbox
                    checked={detail.selected}
                    onChange={(event) => onDetailSelect(detail.id, event.currentTarget.checked)}
                  />
                </TableTd>
                <TableTd>
                  <Text size="xs">{detail.name}</Text>
                </TableTd>
                <TableTd>
                  <TextInput
                    value={detail.percentage > 0 ? detail.percentage.toString() : ''}
                    onChange={(event) => onDetailPercentageChange(detail.id, event.target.value)}
                    placeholder="0"
                    size="xs"
                    disabled={!detail.selected}
                    styles={{
                      input: {
                        textAlign: 'center',
                        padding: '4px 20px 4px 0',
                        height: '28px'
                      },
                      section: {
                        width: '32px'
                      }
                    }}
                    rightSection={<Text size="xs" c="dimmed">%</Text>}
                  />
                </TableTd>
                <TableTd>
                  <Text size="xs">
                    {detail.budget > 0 
                      ? `$${detail.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                      : '#'
                    }
                  </Text>
                </TableTd>
                <TableTd>
                  <Text size="xs">{detail.impression}</Text>
                </TableTd>
                <TableTd>
                  <Text size="xs">{detail.cpm}</Text>
                </TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Collapse>
    </div>
  );
};

export default MarketDetailTable;
