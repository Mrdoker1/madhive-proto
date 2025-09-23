'use client';

import React from 'react';
import { Table, TableTbody, TableTr, TableTd, Text } from '@mantine/core';

interface MarketDetailData {
  id: string;
  name: string;
  conversionRate: number;
  revenue: number;
  roi: number;
}

interface MarketDetailTableProps {
  marketName: string;
  details: MarketDetailData[];
}

const MarketDetailTable: React.FC<MarketDetailTableProps> = ({ marketName, details }) => {
  return (
    <div style={{ paddingLeft: '40px', paddingTop: '12px', paddingBottom: '12px' }}>
      <Table>
        <TableTbody>
          {/* Header row */}
          <TableTr style={{ backgroundColor: '#f8f9fa' }}>
            <TableTd style={{ paddingLeft: '16px' }}>
              <Text size="xs" fw={500} c="dimmed">{marketName}</Text>
            </TableTd>
            <TableTd style={{ width: '120px' }}>
              <Text size="xs" fw={500} c="dimmed">Conversion Rate</Text>
            </TableTd>
            <TableTd style={{ width: '100px' }}>
              <Text size="xs" fw={500} c="dimmed">Revenue</Text>
            </TableTd>
            <TableTd style={{ width: '80px' }}>
              <Text size="xs" fw={500} c="dimmed">ROI</Text>
            </TableTd>
          </TableTr>
          
          {/* Detail rows */}
          {details.map((detail) => (
            <TableTr key={detail.id}>
              <TableTd style={{ paddingLeft: '16px' }}>
                <Text size="xs">{detail.name}</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{detail.conversionRate}%</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">
                  {detail.revenue > 0 
                    ? `$${detail.revenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                    : '#'
                  }
                </Text>
              </TableTd>
              <TableTd>
                <Text size="xs">
                  {detail.roi > 0 ? `${detail.roi}%` : '#'}
                </Text>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  );
};

export default MarketDetailTable;
