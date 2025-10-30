'use client';

import React, { useState, useRef } from 'react';
import { Table, TableTbody, TableTr, TableTd, TableTh, Checkbox, TextInput, Text, Collapse, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import type { MarketWithStationsData } from '../types';
import { calculateStationImpressions } from '../utils/marketCalculations';

// Function to format percentages (maximum 2 decimal places)
const formatPercentage = (value: number): string => {
  return Number(value.toFixed(2)).toString();
};

interface MarketDetailTableProps {
  market: MarketWithStationsData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDetailSelect: (stationId: string, checked: boolean) => void;
  onDetailSelectAll: (checked: boolean) => void;
  onDetailPercentageChange: (stationId: string, value: string) => void;
}

const MarketDetailTable: React.FC<MarketDetailTableProps> = ({
  market,
  isExpanded,
  onToggleExpand,
  onDetailSelect,
  onDetailSelectAll,
  onDetailPercentageChange
}) => {
  // State for station validation
  const [previousStationValues, setPreviousStationValues] = useState<Record<string, number>>({});
  const [stationErrorTooltips, setStationErrorTooltips] = useState<Record<string, boolean>>({});
  const stationInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Focus handler for stations
  const handleStationPercentageFocus = (stationId: string, currentValue: number) => {
    setPreviousStationValues(prev => ({
      ...prev,
      [stationId]: currentValue
    }));
  };

  // Blur handler for stations - validation
  const handleStationPercentageBlur = (stationId: string, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;
    const currentStation = market.stations.find(s => s.id === stationId);
    
    if (!currentStation) return;

    // Calculate total percentage of stations in this market if we were to apply new value
    const otherStationsTotal = market.stations.reduce((total, station) => {
      if (station.id === stationId || !station.selected) return total;
      return total + station.percentage;
    }, 0);
    
    const wouldBeTotal = otherStationsTotal + numericValue;
    
    // If exceeds 100%, show error and revert to previous value
    if (wouldBeTotal > 100) {
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: true
      }));
      
      // Revert to previous value
      const previousValue = previousStationValues[stationId] || currentStation.percentage;
      onDetailPercentageChange(stationId, previousValue.toString());
      
      // Hide tooltip after 3 seconds
      setTimeout(() => {
        setStationErrorTooltips(prev => ({
          ...prev,
          [stationId]: false
        }));
      }, 3000);
    } else {
      // Remove error if it was present
      setStationErrorTooltips(prev => ({
        ...prev,
        [stationId]: false
      }));
    }
  };
  const totalStationBudget = market.stations.reduce((sum, station) => sum + station.budget, 0);
  const totalStationPercentage = market.stations.reduce((sum, station) => sum + station.percentage, 0);
  const allStationsSelected = market.stations.length > 0 && market.stations.every(station => station.selected);
  const someStationsSelected = market.stations.some(station => station.selected);

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
      {/* Header with market info and collapse button */}
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
          <Text fw={500} size="sm">{market.name} ({market.stations.length})</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Text size="xs" c="dimmed">
            Total Budget: ${totalStationBudget.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </Text>
          <Text size="xs" c="dimmed">
            Total %: {totalStationPercentage.toFixed(1)}%
          </Text>
        </div>
      </div>

      {/* Detail table */}
      <Collapse in={isExpanded}>
        <Table>
          <TableTbody>
            {/* Header row for detail table */}
            <TableTr style={{ height: '48px' }}>
              <TableTh style={{ width: '40px', textAlign: 'center' }}>
                <Checkbox
                  checked={allStationsSelected}
                  indeterminate={someStationsSelected && !allStationsSelected}
                  onChange={(event) => handleSelectAllDetails(event.currentTarget.checked)}
                />
              </TableTh>
              <TableTh>
                <Text size="xs" fw={500}>TV Stations</Text>
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
            
            {/* Station rows */}
            {market.stations.map((station) => (
              <TableTr key={station.id} style={{ height: '48px' }}>
                <TableTd>
                  <Checkbox
                    checked={station.selected}
                    onChange={(event) => onDetailSelect(station.id, event.currentTarget.checked)}
                  />
                </TableTd>
                <TableTd>
                  <Text size="xs">{station.name}</Text>
                </TableTd>
                <TableTd>
                  <Tooltip
                    label="You have exceeded the maximum budget value"
                    opened={stationErrorTooltips[station.id] || false}
                    color="red"
                    position="top"
                    withArrow
                  >
                    <TextInput
                      ref={(el) => { stationInputRefs.current[station.id] = el; }}
                      value={station.percentage > 0 ? formatPercentage(station.percentage) : ''}
                      onChange={(event) => onDetailPercentageChange(station.id, event.target.value)}
                      onFocus={() => handleStationPercentageFocus(station.id, station.percentage)}
                      onBlur={(event) => handleStationPercentageBlur(station.id, event.target.value)}
                      placeholder="0"
                      size="xs"
                      disabled={!station.selected}
                      styles={{
                        input: {
                          textAlign: 'center',
                          padding: '4px 20px 4px 0',
                          height: '28px',
                          borderColor: stationErrorTooltips[station.id] ? '#fa5252' : undefined
                        },
                        section: {
                          width: '32px'
                        }
                      }}
                      rightSection={<Text size="xs" c="dimmed">%</Text>}
                    />
                  </Tooltip>
                </TableTd>
                <TableTd>
                  <Text size="xs">
                    {station.budget > 0 
                      ? `$${station.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                      : '$0'
                    }
                  </Text>
                </TableTd>
                <TableTd>
                  <Text size="xs">{calculateStationImpressions(station.budget, station.cpm)}</Text>
                </TableTd>
                <TableTd>
                  <Text size="xs">{station.cpm}</Text>
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
