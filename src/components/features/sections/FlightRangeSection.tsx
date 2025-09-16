'use client';

import React, { useState } from 'react';
import { Radio, Button, Group } from '@mantine/core';
import DualCalendar from '@/components/ui/DateRangeInput';
import FlightByWeek from './FlightByWeek';

interface FlightRangeSectionProps {
  className?: string;
  totalBudget?: number;
}

const FlightRangeSection: React.FC<FlightRangeSectionProps> = ({
  className = '',
  totalBudget = 0
}) => {
  const [flightStatus, setFlightStatus] = useState('active');
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');

  const handleExtendCampaign = () => {
    console.log('Extend Campaign clicked');
    // Логика для расширения кампании
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log('Date range changed:', startDate, endDate);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    // Логика для обработки изменения диапазона дат
  };

  const handleWeeklyBudgetChange = (weeklyBudgets: any[]) => {
    console.log('Weekly budgets changed:', weeklyBudgets);
    // Логика для обработки изменения недельных бюджетов
  };

  return (
    <div className={`${className}`}>
      {/* Radio buttons and Extend Campaign button */}
      <div className="flex items-center justify-between">
        <Radio.Group value={flightStatus} onChange={setFlightStatus}>
          <Group gap="16px">
            <Radio 
              value="active" 
              label="Active" 
              color="#291036"
              styles={{
                label: { fontSize: '14px', color: '#000000' }
              }}
            />
            <Radio 
              value="hiatus" 
              label="Hiatus" 
              color="#291036"
              styles={{
                label: { fontSize: '14px', color: '#000000' }
              }}
            />
          </Group>
        </Radio.Group>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExtendCampaign}
          styles={{
            root: {
              fontSize: '12px',
              height: '32px',
              padding: '0 16px',
              borderColor: '#C2B9C6',
              color: '#000000',
              '&:hover': {
                borderColor: '#C2B9C6',
                backgroundColor: 'rgba(194, 185, 198, 0.1)'
              }
            }
          }}
        >
          Extend Campaign
        </Button>
      </div>

      {/* Отступ 16px между радиокнопками и датапикером */}
      <div style={{ marginTop: '16px' }}>
        <DualCalendar
          size="md"
          required={true}
          onChange={handleDateRangeChange}
        />
      </div>

      {/* Flight by Week Component */}
      <div style={{ marginTop: '24px' }}>
        <FlightByWeek
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          totalBudget={totalBudget}
          onChange={handleWeeklyBudgetChange}
        />
      </div>
    </div>
  );
};

export default FlightRangeSection;