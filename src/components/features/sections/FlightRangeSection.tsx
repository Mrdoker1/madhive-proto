'use client';

import React, { useState } from 'react';
import { Radio, Button, Group } from '@mantine/core';
import DualCalendar from '@/components/ui/DateRangeInput';
import FlightByWeek from './FlightByWeek';

interface FlightRangeSectionProps {
  className?: string;
  totalBudget?: number;
}

type DateRange = { start: string; end: string };

// Стили для радиокнопок
const radioStyles = {
  label: { fontSize: '14px', color: '#000000' }
};

// Стили для кнопки Extend Campaign
const extendButtonStyles = {
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
};

const FlightRangeSection: React.FC<FlightRangeSectionProps> = ({
  className = '',
  totalBudget = 0
}) => {
  
  const [flightStatus, setFlightStatus] = useState<'active' | 'hiatus'>('active');
  const [activeDateRange, setActiveDateRange] = useState<DateRange>({ start: '', end: '' });
  const [hiatusDates, setHiatusDates] = useState<DateRange>({ start: '', end: '' });
  
  // Вычисляемые значения для текущего отображения
  const currentDateRange = flightStatus === 'active' ? activeDateRange : hiatusDates;
  
  // Вспомогательные функции для ограничений дат
  const getMinDate = (): Date | undefined => {
    if (flightStatus === 'active') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return activeDateRange.start ? new Date(activeDateRange.start) : undefined;
  };
  
  const getMaxDate = (): Date | undefined => {
    return flightStatus === 'hiatus' && activeDateRange.end 
      ? new Date(activeDateRange.end) 
      : undefined;
  };

  const handleExtendCampaign = () => {
    console.log('Extend Campaign clicked');
    // Логика для расширения кампании
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log('Date range changed:', startDate, endDate);
    
    if (flightStatus === 'active') {
      setActiveDateRange({ start: startDate, end: endDate });
      // Очищаем hiatus даты при изменении активного диапазона
      setHiatusDates({ start: '', end: '' });
    } else {
      setHiatusDates({ start: startDate, end: endDate });
    }
  };
  
  const handleFlightStatusChange = (value: string) => {
    setFlightStatus(value as 'active' | 'hiatus');
  };

  const handleWeeklyBudgetChange = (weeklyBudgets: any[]) => {
    console.log('Weekly budgets changed:', weeklyBudgets);
    // Логика для обработки изменения недельных бюджетов
  };

  return (
    <div className={`${className}`}>
      {/* Radio buttons and Extend Campaign button */}
      <div className="flex items-center justify-between">
        <Radio.Group value={flightStatus} onChange={handleFlightStatusChange}>
          <Group gap="16px">
            <Radio 
              value="active" 
              label="Active" 
              color="#291036"
              styles={radioStyles}
            />
            <Radio 
              value="hiatus" 
              label="Hiatus" 
              color="#291036"
              styles={radioStyles}
            />
          </Group>
        </Radio.Group>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExtendCampaign}
          styles={extendButtonStyles}
        >
          Extend Campaign
        </Button>
      </div>

      {/* Отступ 16px между радиокнопками и датапикером */}
      <div style={{ marginTop: '16px' }}>
        <DualCalendar
          key={flightStatus} // Принудительный ре-рендер при смене режима
          size="md"
          required={true}
          onChange={handleDateRangeChange}
          selectedStartDate={currentDateRange.start}
          selectedEndDate={currentDateRange.end}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          // Передаем hiatus даты для функциональности (но без визуального отображения)
          hiatusStartDate={hiatusDates.start}
          hiatusEndDate={hiatusDates.end}
          isActiveMode={flightStatus === 'active'}
        />
      </div>

      {/* Flight by Week Component */}
      <div style={{ marginTop: '24px' }}>
        <FlightByWeek
          startDate={activeDateRange.start} // Используем всегда активный диапазон для генерации недель
          endDate={activeDateRange.end}
          totalBudget={totalBudget}
          onChange={handleWeeklyBudgetChange}
          hiatusStartDate={hiatusDates.start} // Передаем исключенные даты
          hiatusEndDate={hiatusDates.end}
        />
      </div>
    </div>
  );
};

export default FlightRangeSection;