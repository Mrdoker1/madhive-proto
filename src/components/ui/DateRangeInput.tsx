'use client';

import React, { useState } from 'react';
import { IconCalendar, IconArrowRight } from '@tabler/icons-react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangeInputProps {
  label?: string;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  required?: boolean;
  error?: string;
  className?: string;
  onChange?: (startDate: string, endDate: string) => void;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  label,
  placeholder = 'Select date range',
  size = 'md',
  required = false,
  error,
  className = '',
  onChange
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [focused, setFocused] = useState(false);
  
  // Состояние для react-date-range
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // Состояние для независимых календарей
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

  const handleDateRangeChange = (ranges: any) => {
    const selection = ranges.selection;
    setDateRange([selection]);
    
    const formattedStartDate = formatDateFromObj(selection.startDate);
    const formattedEndDate = formatDateFromObj(selection.endDate);
    
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    
    if (onChange) {
      onChange(formattedStartDate, formattedEndDate);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'xs': return { height: '30px', fontSize: '12px', padding: '6px 12px' };
      case 'sm': return { height: '36px', fontSize: '13px', padding: '8px 14px' };
      case 'md': return { height: '42px', fontSize: '14px', padding: '10px 16px' };
      case 'lg': return { height: '50px', fontSize: '16px', padding: '12px 18px' };
      case 'xl': return { height: '60px', fontSize: '18px', padding: '16px 20px' };
      default: return { height: '42px', fontSize: '14px', padding: '10px 16px' };
    }
  };

  const sizeStyles = getSizeStyles();
  const hasError = !!error;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className="block text-sm font-medium mb-1"
          style={{ 
            color: hasError ? '#FA5252' : 'var(--foreground)',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}
        >
          {label}
          {required && <span style={{ color: '#FA5252' }}> *</span>}
        </label>
      )}

      {/* Input Container */}
      <div 
        className={`
          flex items-center bg-white border transition-all duration-200
          ${focused 
            ? (hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-blue-500 ring-1 ring-blue-500') 
            : (hasError ? 'border-red-300' : '')
          }
          ${hasError ? 'border-red-300' : ''}
        `}
        style={{ 
          minHeight: sizeStyles.height,
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          borderColor: focused 
            ? (hasError ? '#FA5252' : '#339AF0') 
            : (hasError ? '#FA5252' : 'var(--mantine-color-gray-4)')
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {/* Calendar Icon */}
        <div 
          className="flex items-center justify-center"
          style={{ 
            paddingLeft: '12px', 
            paddingRight: '8px',
            height: '100%'
          }}
        >
          <IconCalendar 
            size={18} 
            style={{ color: '#9CA3AF' }}
          />
        </div>
        
        {/* Start Date Input */}
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          value={startDate}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 border-none outline-none bg-transparent"
          style={{ 
            fontSize: sizeStyles.fontSize,
            padding: '0 4px',
            color: '#000000',
            textAlign: 'left'
          }}
        />
        
        {/* Arrow Separator */}
        <div style={{ padding: '0 8px' }}>
          <IconArrowRight 
            size={14} 
            style={{ color: '#9CA3AF' }}
          />
        </div>
        
        {/* End Date Input */}
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          value={endDate}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 border-none outline-none bg-transparent"
          style={{ 
            fontSize: sizeStyles.fontSize,
            padding: '0 4px',
            color: '#000000',
            paddingRight: '12px',
            textAlign: 'left'
          }}
        />
      </div>

      {/* React Date Range Calendar */}
      <div className="mt-4 w-full">
        <DateRange
          ranges={dateRange}
          onChange={handleDateRangeChange}
          months={2}
          direction="horizontal"
          moveRangeOnFirstSelection={false}
          rangeColors={['#291036']}
          showDateDisplay={false}
        />
      </div>

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