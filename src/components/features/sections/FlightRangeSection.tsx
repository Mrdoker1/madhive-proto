'use client';

import React, { useState } from 'react';
import { Radio, Button, Group } from '@mantine/core';
import DateRangeInput from '@/components/ui/DateRangeInput';

interface FlightRangeSectionProps {
  className?: string;
}

const FlightRangeSection: React.FC<FlightRangeSectionProps> = ({
  className = ''
}) => {
  const [flightStatus, setFlightStatus] = useState('active');

  const handleExtendCampaign = () => {
    console.log('Extend Campaign clicked');
    // Логика для расширения кампании
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log('Date range changed:', startDate, endDate);
    // Логика для обработки изменения диапазона дат
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
        <DateRangeInput
          size="md"
          required={true}
          onChange={handleDateRangeChange}
        />
      </div>
    </div>
  );
};

export default FlightRangeSection;