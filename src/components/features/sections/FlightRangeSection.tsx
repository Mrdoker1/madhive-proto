'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Button, Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateFlightData } from '@/store/slices/campaignSlice';
import DualCalendar from '@/components/ui/DateRangeInput';
import FlightByWeek from './FlightByWeek';
import FlightByDay from './FlightByDay';

interface FlightRangeSectionProps {
  className?: string;
  totalBudget?: number;
}

type DateRange = { start: string; end: string };


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
    },
    '&:disabled': {
      borderColor: '#E5E5E5 !important',
      color: '#999999 !important',
      backgroundColor: 'transparent !important',
      opacity: '0.6 !important'
    }
  }
};

const FlightRangeSection: React.FC<FlightRangeSectionProps> = ({
  className = '',
  totalBudget = 0
}) => {
  const dispatch = useAppDispatch();
  const globalFlightData = useAppSelector((state) => state.campaign.flight);
  const globalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  
  const [flightStatus, setFlightStatus] = useState<'active' | 'hiatus'>('active');
  const [activeDateRange, setActiveDateRange] = useState<DateRange>({ start: '', end: '' });
  const [hiatusDates, setHiatusDates] = useState<DateRange>({ start: '', end: '' });

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    setFlightStatus(globalFlightData.flightStatus || 'active');
    setActiveDateRange({
      start: globalFlightData.startDate || '',
      end: globalFlightData.endDate || ''
    });
    setHiatusDates({
      start: globalFlightData.hiatusStartDate || '',
      end: globalFlightData.hiatusEndDate || ''
    });
  }, [globalFlightData]);
  
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
      // Обновляем глобальный стейт
      dispatch(updateFlightData({ 
        startDate: startDate, 
        endDate: endDate 
      }));
      // Очищаем hiatus даты при изменении активного диапазона
      setHiatusDates({ start: '', end: '' });
      dispatch(updateFlightData({ 
        hiatusStartDate: '',
        hiatusEndDate: ''
      }));
    } else {
      setHiatusDates({ start: startDate, end: endDate });
      // Обновляем глобальный стейт для hiatus дат
      dispatch(updateFlightData({ 
        hiatusStartDate: startDate,
        hiatusEndDate: endDate
      }));
    }
  };
  
  const handleFlightStatusChange = (value: string) => {
    const newStatus = value as 'active' | 'hiatus';
    setFlightStatus(newStatus);
    // Обновляем глобальный стейт
    dispatch(updateFlightData({ flightStatus: newStatus }));
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
            />
            <Radio 
              value="hiatus" 
              label="Hiatus" 
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
              borderColor: '#E5E5E5',
              color: '#999999',
              backgroundColor: 'transparent',
              opacity: 0,
              cursor: 'auto'
            }
          }}
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
          // Блокируем календарь в режиме Hiatus, если не выбраны даты в Active
          disabled={flightStatus === 'hiatus' && (!activeDateRange.start || !activeDateRange.end)}
        />
      </div>

      {/* Show components only if dates are selected, otherwise show message */}
      {activeDateRange.start && activeDateRange.end ? (
        <>
          {/* Flight by Day Component */}
          <div style={{ marginTop: '24px' }}>
            <FlightByDay
              startDate={activeDateRange.start}
              endDate={activeDateRange.end}
              hiatusStartDate={hiatusDates.start}
              hiatusEndDate={hiatusDates.end}
            />
          </div>

          {/* Flight by Week Component */}
          <div style={{ marginTop: '24px' }}>
            <FlightByWeek
              startDate={activeDateRange.start} // Используем всегда активный диапазон для генерации недель
              endDate={activeDateRange.end}
              totalBudget={globalBudget}
              onChange={handleWeeklyBudgetChange}
              hiatusStartDate={hiatusDates.start} // Передаем исключенные даты
              hiatusEndDate={hiatusDates.end}
            />
          </div>
        </>
      ) : (
        <div style={{ 
          marginTop: '24px',
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px',
          padding: '40px 20px'
        }}>
          Select a date range to see weekly flight view & budget allocation
        </div>
      )}
    </div>
  );
};

export default FlightRangeSection;