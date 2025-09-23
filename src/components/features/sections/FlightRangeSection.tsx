'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const [currentHiatusRanges, setCurrentHiatusRanges] = useState<Array<{id: string, start: string, end: string}>>([]);
  
  // Состояние для данных от FlightByWeek
  const [weekData, setWeekData] = useState<any[]>([]);
  const [weeklyValidation, setWeeklyValidation] = useState<{
    isOverBudget: boolean;
    totalAllocated: number;
    showWarning: boolean;
  }>({ isOverBudget: false, totalAllocated: 0, showWarning: false });
  
  // Состояние для данных FlightByDay (генерируется из weekData)
  const [dayWeeks, setDayWeeks] = useState<any[]>([]);
  const [dayHiatusBlocks, setDayHiatusBlocks] = useState<any[]>([]);

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
    }
    // В hiatus режиме календарь сам управляет диапазонами
  };
  
  const handleFlightStatusChange = (value: string) => {
    const newStatus = value as 'active' | 'hiatus';
    setFlightStatus(newStatus);
    // Обновляем глобальный стейт
    dispatch(updateFlightData({ flightStatus: newStatus }));
  };

  const handleWeeklyBudgetChange = useCallback((weeklyBudgets: any[]) => {
    console.log('Weekly budgets changed:', weeklyBudgets);
    // Логика для обработки изменения недельных бюджетов
  }, []);

  const handleHiatusRangesChange = useCallback((ranges: Array<{id: string, start: string, end: string}>) => {
    console.log('Hiatus ranges changed:', ranges);
    setCurrentHiatusRanges(ranges);
  }, []);

  // Обработчик данных от FlightByWeek
  const handleWeekDataChange = useCallback((weeks: any[]) => {
    setWeekData(prevWeekData => {
      // Проверяем, изменились ли данные, чтобы избежать бесконечного цикла
      if (JSON.stringify(prevWeekData) !== JSON.stringify(weeks)) {
        return weeks;
      }
      return prevWeekData;
    });
  }, []);

  // Обработчик валидации от FlightByWeek  
  const handleValidationChange = useCallback((validation: {
    isOverBudget: boolean;
    totalAllocated: number;
    showWarning: boolean;
  }) => {
    setWeeklyValidation(prevValidation => {
      // Проверяем, изменились ли данные валидации
      if (JSON.stringify(prevValidation) !== JSON.stringify(validation)) {
        return validation;
      }
      return prevValidation;
    });
  }, []);

  // Конвертируем данные недель для FlightByDay
  useEffect(() => {
    if (weekData.length > 0) {
      // Функция для проверки дня в хиатусе
      const isDayInHiatus = (date: Date): boolean => {
        if (currentHiatusRanges && currentHiatusRanges.length > 0) {
          return currentHiatusRanges.some(range => {
            const rangeStart = new Date(range.start);
            const rangeEnd = new Date(range.end);
            return date >= rangeStart && date <= rangeEnd;
          });
        }
        return false;
      };

      // Конвертируем данные недель в формат для FlightByDay
      const convertedWeeks = weekData.map((week, index) => {
        // Получаем границы кампании
        const campaignStart = new Date(activeDateRange.start);
        const campaignEnd = new Date(activeDateRange.end);
        
        // Ограничиваем неделю границами кампании
        const actualStart = week.startDate < campaignStart ? campaignStart : week.startDate;
        const actualEnd = week.endDate > campaignEnd ? campaignEnd : week.endDate;
        
        const totalDays = Math.floor((actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        // Правильно считаем активные дни с учетом хиатус диапазонов и границ кампании
        let activeDays = 0;
        let tempDate = new Date(actualStart);
        
        while (tempDate <= actualEnd) {
          if (!isDayInHiatus(new Date(tempDate))) {
            activeDays++;
          }
          tempDate.setDate(tempDate.getDate() + 1);
        }

        console.log(`Week ${index + 1}: actualStart=${actualStart.toDateString()}, actualEnd=${actualEnd.toDateString()}, totalDays=${totalDays}, activeDays=${activeDays}, hiatusCount=${currentHiatusRanges.length}`);

        return {
          id: week.id,
          startDate: actualStart,
          endDate: actualEnd,
          totalDays,
          activeDays,
          weekNumber: index + 1
        };
      });
      
      setDayWeeks(convertedWeeks);

      // Генерируем hiatus блоки
      const hiatusBlocks: any[] = [];
      if (currentHiatusRanges && currentHiatusRanges.length > 0) {
        currentHiatusRanges.forEach((range, rangeIndex) => {
          const hiatusStart = new Date(range.start);
          const hiatusEnd = new Date(range.end);

          // Найти после какой недели нужно показать hiatus текст
          let insertAfterWeek = -1;

          convertedWeeks.forEach((week, index) => {
            // Если hiatus начинается в этой неделе или после неё
            if (week.endDate >= hiatusStart && insertAfterWeek === -1) {
              insertAfterWeek = index;
            }
          });

          if (insertAfterWeek !== -1) {
            hiatusBlocks.push({
              id: `hiatus-${rangeIndex + 1}`,
              startDate: hiatusStart,
              endDate: hiatusEnd,
              insertAfterWeek
            });
          }
        });
      }
      
      setDayHiatusBlocks(hiatusBlocks);
    } else {
      setDayWeeks([]);
      setDayHiatusBlocks([]);
    }
  }, [weekData, currentHiatusRanges]);

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
          isHiatusMode={flightStatus === 'hiatus'}
          onHiatusRangesChange={handleHiatusRangesChange}
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
              hiatusRanges={currentHiatusRanges}
              weeks={dayWeeks}
              hiatusBlocks={dayHiatusBlocks}
            />
          </div>

          {/* Flight by Week Component */}
          <div style={{ marginTop: '24px' }}>
            <FlightByWeek
              startDate={activeDateRange.start} // Используем всегда активный диапазон для генерации недель
              endDate={activeDateRange.end}
              totalBudget={globalBudget}
              onChange={handleWeekDataChange}
              onValidationChange={handleValidationChange}
              hiatusStartDate={hiatusDates.start} // Передаем исключенные даты
              hiatusEndDate={hiatusDates.end}
              hiatusRanges={currentHiatusRanges}
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