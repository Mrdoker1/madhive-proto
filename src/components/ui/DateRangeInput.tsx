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
  disabled?: boolean;
  // Для Hiatus режима с множественными диапазонами
  isHiatusMode?: boolean;
  onHiatusRangesChange?: (ranges: HiatusRange[]) => void;
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
  onHiatusRangesChange
}) => {
  const [startDate, setStartDate] = useState(selectedStartDate || '');
  const [endDate, setEndDate] = useState(selectedEndDate || '');
  
  // Локальное состояние для множественных hiatus диапазонов
  const [hiatusRanges, setHiatusRanges] = useState<HiatusRange[]>([]);
  
  // Для принудительного ре-рендера календаря
  const [calendarKey, setCalendarKey] = useState(0);
  
  // Счетчик для генерации уникальных ID (избегаем Date.now() для SSR)
  const [idCounter, setIdCounter] = useState(0);
  
  // Флаг для определения что компонент смонтирован на клиенте
  const [isMounted, setIsMounted] = useState(false);
  
  // Инициализируем компонент только на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Уведомляем родительский компонент об изменениях hiatus ranges
  useEffect(() => {
    if (isMounted && onHiatusRangesChange) {
      onHiatusRangesChange(hiatusRanges);
    }
  }, [hiatusRanges, onHiatusRangesChange, isMounted]);
  
  // Инициализируем календарь в hiatus режиме
  useEffect(() => {
    if (isMounted && isHiatusMode) {
      // Используем конкретную дату чтобы избежать проблем с SSR
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Нормализуем время
      setDateRange([{
        startDate: today,
        endDate: today,
        key: 'selection'
      }]);
    }
  }, [isMounted, isHiatusMode]);
  
  // Сбрасываем dateRange при изменении calendarKey в hiatus режиме
  useEffect(() => {
    if (isMounted && isHiatusMode && calendarKey > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Нормализуем время
      setDateRange([{
        startDate: today,
        endDate: today,
        key: 'selection'
      }]);
    }
  }, [isMounted, calendarKey, isHiatusMode]);
  
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
    // В hiatus режиме не синхронизируем автоматически, чтобы не мешать сбросу
    if (isHiatusMode) return;
    
    if (selectedStartDate !== undefined && selectedStartDate !== startDate) {
      setStartDate(selectedStartDate);
    }
    if (selectedEndDate !== undefined && selectedEndDate !== endDate) {
      setEndDate(selectedEndDate);
    }
    
    // Обновляем dateRange для календаря только если даты действительно изменились
    const newStartDate = selectedStartDate ? (parseDate(selectedStartDate) || new Date()) : new Date();
    const newEndDate = selectedEndDate ? (parseDate(selectedEndDate) || new Date()) : new Date();
    
    setDateRange(prevRange => {
      const currentStart = prevRange[0]?.startDate;
      const currentEnd = prevRange[0]?.endDate;
      
      // Проверяем, изменились ли даты
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

  // Создаем массив заблокированных дат
  const getDisabledDates = (): Date[] => {
    const disabledDates: Date[] = [];

    // В Active режиме блокируем старые hiatus даты (для обратной совместимости)
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

    // В Hiatus режиме показываем уже выбранные диапазоны как disabled (серые)
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

    // В режиме Hiatus добавляем новый диапазон если выбран полный диапазон
    if (isHiatusMode && formattedStartDate && formattedEndDate && formattedStartDate !== formattedEndDate) {
      // Проверяем, не пересекается ли новый диапазон с уже существующими
      const isOverlapping = hiatusRanges.some(range => {
        const rangeStart = parseDate(range.start);
        const rangeEnd = parseDate(range.end);
        const newStart = parseDate(formattedStartDate);
        const newEnd = parseDate(formattedEndDate);

        if (!rangeStart || !rangeEnd || !newStart || !newEnd) return false;

        // Проверяем пересечение диапазонов
        return !(newEnd < rangeStart || newStart > rangeEnd);
      });

      if (!isOverlapping) {
        const newRange: HiatusRange = {
          id: `hiatus-${idCounter}`,
          start: formattedStartDate,
          end: formattedEndDate
        };
        
        // Увеличиваем счетчик для следующего ID
        setIdCounter(prev => prev + 1);

        // Добавляем новый диапазон в локальное состояние
        setHiatusRanges(prev => {
          const newRanges = [...prev, newRange];
          return newRanges;
        });
        
        // Сбрасываем состояние сразу
        setStartDate('');
        setEndDate('');
        
        // Принудительно обновляем календарь
        setCalendarKey(prev => prev + 1);
      }

      return;
    }

    // Обычный режим (Active) или промежуточное состояние выбора
    if (formattedStartDate !== startDate || formattedEndDate !== endDate) {
      setDateRange([selection]);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      if (!isHiatusMode && onChange) {
        onChange(formattedStartDate, formattedEndDate);
      }
    }
  };

  // Функция для удаления hiatus диапазона
  const removeHiatusRange = (id: string) => {
    setHiatusRanges(prev => {
      const newRanges = prev.filter(range => range.id !== id);
      return newRanges;
    });
    // Принудительно обновляем календарь
    setCalendarKey(prev => prev + 1);
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
          minHeight: '42px' // Стандартная высота Mantine input
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
          
          
          /* Переопределяем цвет текста для всех дней календаря */
          :global(.rdrDayNumber) {
            color: #000000 !important;
          }
          
          /* Цвет текста для выбранных дат */
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
          
          /* В режиме Hiatus показываем disabled даты (уже выбранные hiatus) точно как обычные disabled */
          ${isHiatusMode ? `
            .rdrDayDisabled .rdrDayNumber {
              color: #999 !important;
              background-color: transparent !important;
            }
          ` : ''}
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
      {isHiatusMode && hiatusRanges.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
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