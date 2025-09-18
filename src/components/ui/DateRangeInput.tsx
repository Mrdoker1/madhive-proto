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
  // Новые пропсы для ограничений и внешнего управления значениями
  minDate?: Date;
  maxDate?: Date;
  selectedStartDate?: string;
  selectedEndDate?: string;
  key?: string; // Для принудительного ре-рендера компонента
  // Для подсветки hiatus дат в Active режиме
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  isActiveMode?: boolean;
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
  isActiveMode = false
}) => {
  const [startDate, setStartDate] = useState(selectedStartDate || '');
  const [endDate, setEndDate] = useState(selectedEndDate || '');
  const [focused, setFocused] = useState(false);
  
  // Функция для парсинга даты из строки
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  // Состояние для react-date-range
  const [dateRange, setDateRange] = useState([
    {
      startDate: selectedStartDate ? (parseDate(selectedStartDate) || new Date()) : new Date(),
      endDate: selectedEndDate ? (parseDate(selectedEndDate) || new Date()) : new Date(),
      key: 'selection'
    }
  ]);
  
  // Обновляем локальное состояние при изменении внешних пропсов
  React.useEffect(() => {
    if (selectedStartDate !== undefined) {
      setStartDate(selectedStartDate);
    }
    if (selectedEndDate !== undefined) {
      setEndDate(selectedEndDate);
    }
    
    // Обновляем dateRange для календаря
    setDateRange([{
      startDate: selectedStartDate ? (parseDate(selectedStartDate) || new Date()) : new Date(),
      endDate: selectedEndDate ? (parseDate(selectedEndDate) || new Date()) : new Date(),
      key: 'selection'
    }]);
  }, [selectedStartDate, selectedEndDate]);


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
        <style jsx>{`
          :global(.rdrNextPrevButton) {
            background: rgba(41, 16, 54, 0.1) !important;
          }
          :global(.rdrNextPrevButton:hover) {
            background: rgba(41, 16, 54, 0.2) !important;
          }
          
          
          /* Переопределяем цвет текста для всех дней календаря */
          :global(.rdrDayNumber) {
            color: #000000 !important;
          }
          
          /* Цвет текста для выбранных дат остается темным */
          :global(.rdrDayStartOfRange .rdrDayNumber),
          :global(.rdrDayEndOfRange .rdrDayNumber),
          :global(.rdrDayInRange .rdrDayNumber) {
            color: #FFFFFF !important;
          }
        `}</style>
        
        {/* Переопределение точного стиля сегодняшнего дня */}
        <style jsx global>{`
          /* Точное переопределение псевдоэлемента :after для сегодняшнего дня */
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
        `}</style>
        <DateRange
          ranges={dateRange}
          onChange={handleDateRangeChange}
          months={2}
          direction="horizontal"
          moveRangeOnFirstSelection={false}
          rangeColors={['#291036']}
          showDateDisplay={false}
          minDate={minDate}
          maxDate={maxDate}
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