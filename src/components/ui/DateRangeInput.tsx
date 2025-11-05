'use client';

import React, { useState, useEffect } from 'react';
import { IconCalendar, IconArrowRight, IconX } from '@tabler/icons-react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export interface HiatusRange {
  id: string;
  start: string;
  end: string;
}

interface DateRangeInputProps {
  label?: string;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  required?: boolean;
  error?: string;
  className?: string;
  onChange?: (startDate: string, endDate: string) => void;
  // New props for constraints and external value management
  minDate?: Date;
  maxDate?: Date;
  selectedStartDate?: string;
  selectedEndDate?: string;
  key?: string; // For forced component re-render
  // For highlighting hiatus dates in Active mode
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  isActiveMode?: boolean;
  disabled?: boolean;
  // For Hiatus mode with multiple ranges
  isHiatusMode?: boolean;
  onHiatusRangesChange?: (ranges: HiatusRange[]) => void;
  // External hiatus ranges for synchronization
  hiatusRanges?: HiatusRange[];
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  label,
  placeholder = 'Select date range',
  size = 'md',
  required = false,
  error,
  className = '',
  onChange,
  minDate,
  maxDate,
  selectedStartDate,
  selectedEndDate,
  hiatusStartDate,
  hiatusEndDate,
  isActiveMode,
  disabled = false,
  isHiatusMode = false,
  onHiatusRangesChange,
  hiatusRanges: externalHiatusRanges
}) => {
  const [startDate, setStartDate] = useState(selectedStartDate || '');
  const [endDate, setEndDate] = useState(selectedEndDate || '');
  
  // Local state for multiple hiatus ranges
  const [hiatusRanges, setHiatusRanges] = useState<HiatusRange[]>([]);
  
  // For forced calendar re-render
  const [calendarKey, setCalendarKey] = useState(0);
  
  // Counter for generating unique IDs (avoid Date.now() for SSR)
  const [idCounter, setIdCounter] = useState(0);
  
  // Flag to determine that component is mounted on client
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize component only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Initialize calendar in hiatus mode
  useEffect(() => {
    if (isMounted && isHiatusMode) {
      // Use specific date to avoid SSR issues
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize time
      setDateRange([{
        startDate: today,
        endDate: today,
        key: 'selection'
      }]);
    }
  }, [isMounted, isHiatusMode]);
  
  // Reset dateRange when calendarKey changes in hiatus mode
  useEffect(() => {
    if (isMounted && isHiatusMode && calendarKey > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize time
      setDateRange([{
        startDate: today,
        endDate: today,
        key: 'selection'
      }]);
    }
  }, [isMounted, calendarKey, isHiatusMode]);
  
  // Notify parent component when hiatus ranges change
  useEffect(() => {
    if (isHiatusMode && onHiatusRangesChange && isMounted) {
      onHiatusRangesChange(hiatusRanges);
    }
  }, [hiatusRanges, isHiatusMode, onHiatusRangesChange, isMounted]);
  
  // Synchronize external hiatus ranges with internal state
  useEffect(() => {
    if (externalHiatusRanges !== undefined) {
      setHiatusRanges(externalHiatusRanges);
    }
  }, [externalHiatusRanges]);
  
  // Function to parse date from string
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  // State for react-date-range
  const [dateRange, setDateRange] = useState([
    {
      startDate: selectedStartDate ? (parseDate(selectedStartDate) || new Date()) : new Date(),
      endDate: selectedEndDate ? (parseDate(selectedEndDate) || new Date()) : new Date(),
      key: 'selection'
    }
  ]);
  
  // Update local state when external props change
  React.useEffect(() => {
    // In hiatus mode don't sync automatically to not interfere with reset
    if (isHiatusMode) return;
    
    if (selectedStartDate !== undefined && selectedStartDate !== startDate) {
      setStartDate(selectedStartDate);
    }
    if (selectedEndDate !== undefined && selectedEndDate !== endDate) {
      setEndDate(selectedEndDate);
    }
    
    // Update dateRange for calendar only if dates actually changed
    const newStartDate = selectedStartDate ? (parseDate(selectedStartDate) || new Date()) : new Date();
    const newEndDate = selectedEndDate ? (parseDate(selectedEndDate) || new Date()) : new Date();
    
    setDateRange(prevRange => {
      const currentStart = prevRange[0]?.startDate;
      const currentEnd = prevRange[0]?.endDate;
      
      // Check if dates have changed
      if (currentStart?.getTime() !== newStartDate.getTime() || 
          currentEnd?.getTime() !== newEndDate.getTime()) {
        return [{
          startDate: newStartDate,
          endDate: newEndDate,
          key: 'selection'
        }];
      }
      return prevRange;
    });
  }, [selectedStartDate, selectedEndDate, startDate, endDate, isHiatusMode]);


  // State for independent calendars
  const [leftCalendarDate, setLeftCalendarDate] = useState(new Date());
  const [rightCalendarDate, setRightCalendarDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const formatDateFromObj = (date: Date | null) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Create array of disabled dates
  const getDisabledDates = (): Date[] => {
    const disabledDates: Date[] = [];

    // In Active mode block old hiatus dates (for backward compatibility)
    if (isActiveMode && hiatusStartDate && hiatusEndDate) {
      const hiatusStart = parseDate(hiatusStartDate);
      const hiatusEnd = parseDate(hiatusEndDate);

      if (hiatusStart && hiatusEnd) {
        const currentDate = new Date(hiatusStart);
        while (currentDate <= hiatusEnd) {
          disabledDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }

    // In Hiatus mode show already selected ranges as disabled (gray)
    if (isHiatusMode) {
      hiatusRanges.forEach(range => {
        const rangeStart = parseDate(range.start);
        const rangeEnd = parseDate(range.end);

        if (rangeStart && rangeEnd) {
          const currentDate = new Date(rangeStart);
          while (currentDate <= rangeEnd) {
            disabledDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
    }

    return disabledDates;
  };

  const handleDateRangeChange = (ranges: any) => {
    const selection = ranges.selection;

    const formattedStartDate = formatDateFromObj(selection.startDate);
    const formattedEndDate = formatDateFromObj(selection.endDate);

    // In Hiatus mode add new range if full range is selected
    if (isHiatusMode && formattedStartDate && formattedEndDate && formattedStartDate !== formattedEndDate) {
      // Check if new range doesn't overlap with existing ones
      const isOverlapping = hiatusRanges.some(range => {
        const rangeStart = parseDate(range.start);
        const rangeEnd = parseDate(range.end);
        const newStart = parseDate(formattedStartDate);
        const newEnd = parseDate(formattedEndDate);

        if (!rangeStart || !rangeEnd || !newStart || !newEnd) return false;

        // Check range overlap
        return !(newEnd < rangeStart || newStart > rangeEnd);
      });

      if (!isOverlapping) {
        const newRange: HiatusRange = {
          id: `hiatus-${idCounter}`,
          start: formattedStartDate,
          end: formattedEndDate
        };
        
        // Increment counter for next ID
        setIdCounter(prev => prev + 1);

        // Add new range to local state
        setHiatusRanges(prev => [...prev, newRange]);
        
        // Reset state immediately
        setStartDate('');
        setEndDate('');
        
        // Force calendar update
        setCalendarKey(prev => prev + 1);
      }

      return;
    }

    // Normal mode (Active) or intermediate selection state
    if (formattedStartDate !== startDate || formattedEndDate !== endDate) {
      setDateRange([selection]);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      if (!isHiatusMode && onChange) {
        onChange(formattedStartDate, formattedEndDate);
      }
    }
  };

  // Function to remove hiatus range
  const removeHiatusRange = (id: string) => {
    setHiatusRanges(prev => prev.filter(range => range.id !== id));
    // Force calendar update
    setCalendarKey(prev => prev + 1);
  };

  // Check if date is in hiatus range
  const isDateInHiatus = (date: Date): boolean => {
    if (!hiatusRanges || hiatusRanges.length === 0) return false;
    
    return hiatusRanges.some(range => {
      const rangeStart = parseDate(range.start);
      const rangeEnd = parseDate(range.end);
      
      if (!rangeStart || !rangeEnd) return false;
      
      // Normalize dates for comparison
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      rangeStart.setHours(0, 0, 0, 0);
      rangeEnd.setHours(0, 0, 0, 0);
      
      return checkDate >= rangeStart && checkDate <= rangeEnd;
    });
  };

  // Custom day content renderer
  const dayContentRenderer = (day: Date) => {
    const isHiatusDay = isDateInHiatus(day);
    
    return (
      <span 
        className={isActiveMode && isHiatusDay ? 'hiatus-day-marker' : ''}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        {day.getDate()}
      </span>
    );
  };

  const hasError = !!error;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label 
          style={{ 
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--form-label-color)',
            marginBottom: '8px'
          }}
        >
          {label}
          {required && <span style={{ color: '#FA5252' }}> *</span>}
        </label>
      )}

      {/* Input Container */}
      <div 
        className="flex items-center"
        style={{ 
          fontSize: '14px',
          padding: '0',
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          border: `1px solid ${hasError ? '#FA5252' : 'var(--form-input-border)'}`,
          minHeight: '42px' // Standard Mantine input height
        }}
      >
        {/* Calendar Icon */}
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '16px', 
            paddingRight: '8px'
          }}
        >
          <IconCalendar 
            size={16} 
            style={{ color: 'var(--form-placeholder)' }}
          />
        </div>
        
        {/* Start Date Input */}
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          value={startDate}
          readOnly
          style={{ 
            fontSize: '14px',
            padding: '0 8px',
            color: '#000000',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flex: 1,
            lineHeight: '20px'
          }}
          className="placeholder-color"
        />
        
        {/* Arrow Separator */}
        <div style={{ padding: '0 8px' }}>
          <IconArrowRight 
            size={12} 
            style={{ color: 'var(--form-placeholder)' }}
          />
        </div>
        
        {/* End Date Input */}
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          value={endDate}
          readOnly
          style={{ 
            fontSize: '14px',
            padding: '0 8px',
            paddingRight: '16px',
            color: '#000000',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flex: 1,
            lineHeight: '20px'
          }}
          className="placeholder-color"
        />
      </div>

      {/* React Date Range Calendar */}
      <div className="mt-4 w-full">
        <style jsx>{`
          :global(.placeholder-color::placeholder) {
            color: var(--form-placeholder) !important;
          }
          :global(.rdrNextPrevButton) {
            background: rgba(41, 16, 54, 0.1) !important;
          }
          :global(.rdrNextPrevButton:hover) {
            background: rgba(41, 16, 54, 0.2) !important;
          }
          
          
          /* Override text color for all calendar days */
          :global(.rdrDayNumber) {
            color: #000000 !important;
          }
          
          /* Text color for selected dates */
          :global(.rdrDayStartOfRange .rdrDayNumber),
          :global(.rdrDayEndOfRange .rdrDayNumber),
          :global(.rdrDayInRange .rdrDayNumber) {
            color: #FFFFFF !important;
          }
          `}</style>
        
        {/* Override exact style for today's date */}
        <style jsx global>{`
          /* Exact override of :after pseudo-element for today's date */
          .rdrDayToday .rdrDayNumber:after,
          .rdrDayToday .rdrDayNumber::after,
          .rdrDay.rdrDayToday .rdrDayNumber:after,
          .rdrDay.rdrDayToday .rdrDayNumber::after {
            content: '' !important;
            position: absolute !important;
            bottom: 4px !important;
            left: 50% !important;
            transform: translate(-50%, 0) !important;
            width: 18px !important;
            height: 2px !important;
            border-radius: 2px !important;
            background: #FF9BD3 !important;
            background-color: #FF9BD3 !important;
          }
          
          /* In Hiatus mode show disabled dates (already selected hiatus) exactly like regular disabled */
          ${isHiatusMode ? `
            .rdrDayDisabled .rdrDayNumber {
              color: #999999 !important;
              background-color: transparent !important;
            }
          ` : ''}
          
          /* Hiatus days styling in Active mode */
          .rdrDay:has(.hiatus-day-marker) .rdrDayNumber {
            background-color: rgba(255, 255, 255, 0.15) !important;
          }
          
          /* Hiatus days in selected range - darker background */
          .rdrDayInRange:has(.hiatus-day-marker) .rdrDayNumber,
          .rdrDayStartOfRange:has(.hiatus-day-marker) .rdrDayNumber,
          .rdrDayEndOfRange:has(.hiatus-day-marker) .rdrDayNumber {
            background-color: rgba(255, 0, 208, 0.4) !important;
          }
        `}</style>
        
        <div style={{ 
          position: 'relative',
          ...(disabled && {
            pointerEvents: 'none',
            opacity: 0.5
          })
        }}>
          <DateRange
            key={`${calendarKey}-${isHiatusMode}`}
            ranges={dateRange}
            onChange={handleDateRangeChange}
            months={2}
            direction="horizontal"
            moveRangeOnFirstSelection={false}
            rangeColors={['var(--primary-color)']}
            showDateDisplay={false}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={getDisabledDates()}
            dayContentRenderer={dayContentRenderer}
          />
          {disabled && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(248, 249, 250, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#6c757d',
              fontWeight: 500,
              zIndex: 10
            }}>
              Select a date range in Active mode first
            </div>
          )}
        </div>
      </div>

      {/* Hiatus Ranges Display */}
      {hiatusRanges.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
            Selected Hiatus Periods:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {hiatusRanges.map((range) => (
              <div
                key={range.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '13px',
                  gap: '8px',
                  color: '#495057'
                }}
              >
                <span>{range.start} - {range.end}</span>
                <IconX
                  size={16}
                  style={{ 
                    cursor: 'pointer', 
                    color: '#6c757d',
                    flexShrink: 0
                  }}
                  onClick={() => removeHiatusRange(range.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div 
          className="mt-1 text-sm"
          style={{ color: '#FA5252' }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;