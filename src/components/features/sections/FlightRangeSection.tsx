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


// Styles for Extend Campaign button
const extendButtonStyles = {  
  root: {
    fontSize: '13px',
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
  
  // State for data from FlightByWeek
  const [weekData, setWeekData] = useState<any[]>([]);
  const [weeklyValidation, setWeeklyValidation] = useState<{
    isOverBudget: boolean;
    totalAllocated: number;
    showWarning: boolean;
  }>({ isOverBudget: false, totalAllocated: 0, showWarning: false });
  
  // State for FlightByDay data (generated from weekData)
  const [dayWeeks, setDayWeeks] = useState<any[]>([]);
  const [dayHiatusBlocks, setDayHiatusBlocks] = useState<any[]>([]);

  // Synchronize local state with global on load
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
  
  // Computed values for current display
  const currentDateRange = flightStatus === 'active' ? activeDateRange : hiatusDates;
  
  // Helper functions for date constraints
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
    // Logic for extending campaign
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log('Date range changed:', startDate, endDate);
    
    if (flightStatus === 'active') {
      // Check if active range actually changed
      const rangeChanged = activeDateRange.start !== startDate || activeDateRange.end !== endDate;
      
      setActiveDateRange({ start: startDate, end: endDate });
      // Update global state
      dispatch(updateFlightData({ 
        startDate: startDate, 
        endDate: endDate 
      }));
      
      // Clear hiatus dates ONLY when active range changes
      if (rangeChanged && (activeDateRange.start || activeDateRange.end)) {
        setHiatusDates({ start: '', end: '' });
        setCurrentHiatusRanges([]);
        dispatch(updateFlightData({ 
          hiatusStartDate: '',
          hiatusEndDate: ''
        }));
      }
    }
    // In hiatus mode calendar manages ranges itself
  };
  
  const handleFlightStatusChange = (value: string) => {
    const newStatus = value as 'active' | 'hiatus';
    setFlightStatus(newStatus);
    // Update global state
    dispatch(updateFlightData({ flightStatus: newStatus }));
  };

  const handleWeeklyBudgetChange = useCallback((weeklyBudgets: any[]) => {
    console.log('Weekly budgets changed:', weeklyBudgets);
    // Logic for handling weekly budget changes
  }, []);

  const handleHiatusRangesChange = useCallback((ranges: Array<{id: string, start: string, end: string}>) => {
    console.log('Hiatus ranges changed:', ranges);
    setCurrentHiatusRanges(ranges);
  }, []);

  // Handler for data from FlightByWeek
  const handleWeekDataChange = useCallback((weeks: any[]) => {
    setWeekData(prevWeekData => {
      // Check if data changed by length and ID
      if (prevWeekData.length !== weeks.length || 
          !prevWeekData.every((prev, index) => prev.id === weeks[index]?.id)) {
        return weeks;
      }
      return prevWeekData;
    });
  }, []);

  // Validation handler from FlightByWeek
  const handleValidationChange = useCallback((validation: {
    isOverBudget: boolean;
    totalAllocated: number;
    showWarning: boolean;
  }) => {
    setWeeklyValidation(prevValidation => {
      // Check if key validation fields changed
      if (prevValidation.isOverBudget !== validation.isOverBudget ||
          prevValidation.totalAllocated !== validation.totalAllocated ||
          prevValidation.showWarning !== validation.showWarning) {
        return validation;
      }
      return prevValidation;
    });
  }, []);

  // Convert week data for FlightByDay
  useEffect(() => {
    if (weekData.length > 0) {
      // Function to check if day is in hiatus
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

      // Convert week data to format for FlightByDay
      const convertedWeeks = weekData.map((week, index) => {
        // Get campaign boundaries
        const campaignStart = new Date(activeDateRange.start);
        const campaignEnd = new Date(activeDateRange.end);
        
        // Constrain week by campaign boundaries
        const actualStart = week.startDate < campaignStart ? campaignStart : week.startDate;
        const actualEnd = week.endDate > campaignEnd ? campaignEnd : week.endDate;
        
        const totalDays = Math.floor((actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        // Correctly count active days considering hiatus ranges and campaign boundaries
        let activeDays = 0;
        let tempDate = new Date(actualStart);
        
        while (tempDate <= actualEnd) {
          if (!isDayInHiatus(new Date(tempDate))) {
            activeDays++;
          }
          tempDate.setDate(tempDate.getDate() + 1);
        }


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

      // Generate hiatus blocks
      const hiatusBlocks: any[] = [];
      if (currentHiatusRanges && currentHiatusRanges.length > 0) {
        currentHiatusRanges.forEach((range, rangeIndex) => {
          const hiatusStart = new Date(range.start);
          const hiatusEnd = new Date(range.end);

          // Find after which week to show hiatus text
          let insertAfterWeek = -1;

          convertedWeeks.forEach((week, index) => {
            // If hiatus starts in this week or after
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
  }, [weekData, currentHiatusRanges, activeDateRange.start, activeDateRange.end]);

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
              fontSize: '13px',
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

      {/* 16px spacing between radio buttons and datepicker */}
      <div style={{ marginTop: '16px' }}>
        <DualCalendar
          size="md"
          required={true}
          onChange={handleDateRangeChange}
          selectedStartDate={currentDateRange.start}
          selectedEndDate={currentDateRange.end}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          // Pass hiatus dates for functionality (but without visual display)
          hiatusStartDate={hiatusDates.start}
          hiatusEndDate={hiatusDates.end}
          isActiveMode={flightStatus === 'active'}
          isHiatusMode={flightStatus === 'hiatus'}
          onHiatusRangesChange={handleHiatusRangesChange}
          // Block calendar in Hiatus mode if dates not selected in Active
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
              startDate={activeDateRange.start} // Always use active range for generating weeks
              endDate={activeDateRange.end}
              totalBudget={globalBudget}
              onChange={handleWeekDataChange}
              onValidationChange={handleValidationChange}
              hiatusStartDate={hiatusDates.start} // Pass excluded dates
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