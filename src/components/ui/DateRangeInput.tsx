'use client';

import React, { useState } from 'react';
import { IconCalendar, IconArrowRight } from '@tabler/icons-react';

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

  const formatDateInput = (value: string) => {
    const cleaned = value.replace(/[^\d/]/g, '');
    
    if (cleaned.length >= 2 && cleaned.length <= 4) {
      return cleaned.replace(/(\d{2})(\d)/, '$1/$2');
    }
    if (cleaned.length >= 5) {
      return cleaned.replace(/(\d{2})(\d{2})(\d)/, '$1/$2/$3');
    }
    return cleaned;
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(event.target.value);
    if (formatted.length <= 10) {
      setStartDate(formatted);
      if (onChange) {
        onChange(formatted, endDate);
      }
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(event.target.value);
    if (formatted.length <= 10) {
      setEndDate(formatted);
      if (onChange) {
        onChange(startDate, formatted);
      }
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
          onChange={handleStartDateChange}
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
          onChange={handleEndDateChange}
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