'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface WeekData {
  id: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  activeDays: number; // Дни не в hiatus
  weekNumber: number;
}

interface HiatusBlock {
  id: string;
  startDate: Date;
  endDate: Date;
  insertAfterWeek: number; // После какой недели вставить текст
}

interface FlightByDayProps {
  startDate?: string;
  endDate?: string;
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  className?: string;
}

const FlightByDay: React.FC<FlightByDayProps> = ({
  startDate,
  endDate,
  hiatusStartDate,
  hiatusEndDate,
  className = ''
}) => {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [hiatusBlocks, setHiatusBlocks] = useState<HiatusBlock[]>([]);

  // Функция для проверки, находится ли день в hiatus периоде
  const isDayInHiatus = (date: Date): boolean => {
    if (!hiatusStartDate || !hiatusEndDate) return false;
    
    const hiatusStart = new Date(hiatusStartDate);
    const hiatusEnd = new Date(hiatusEndDate);
    
    return date >= hiatusStart && date <= hiatusEnd;
  };

  // Функция для генерации недель из диапазона дат
  const generateWeeks = useCallback((start: string, end: string): WeekData[] => {
    if (!start || !end) return [];

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const weeksArray: WeekData[] = [];

    // Начинаем с понедельника недели начальной даты
    const weekStart = new Date(startDateObj);
    const dayOfWeek = weekStart.getDay();
    const diff = weekStart.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    weekStart.setDate(diff);

    let currentWeekStart = new Date(weekStart);
    let weekCounter = 1;

    while (currentWeekStart <= endDateObj) {
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

      // Не выходим за пределы выбранного диапазона
      const actualStart = currentWeekStart < startDateObj ? startDateObj : currentWeekStart;
      const actualEnd = currentWeekEnd > endDateObj ? endDateObj : currentWeekEnd;

      // Подсчитываем дни в неделе
      let totalDays = 0;
      let activeDays = 0;
      let tempDate = new Date(actualStart);

      while (tempDate <= actualEnd) {
        totalDays++;
        if (!isDayInHiatus(new Date(tempDate))) {
          activeDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }

      weeksArray.push({
        id: `week-${weekCounter}`,
        startDate: new Date(actualStart),
        endDate: new Date(actualEnd),
        totalDays,
        activeDays,
        weekNumber: weekCounter
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekCounter++;
    }

    return weeksArray;
  }, [isDayInHiatus]);

  // Функция для генерации hiatus блоков
  const generateHiatusBlocks = useCallback((weeks: WeekData[]): HiatusBlock[] => {
    if (!hiatusStartDate || !hiatusEndDate || weeks.length === 0) return [];

    const hiatusStart = new Date(hiatusStartDate);
    const hiatusEnd = new Date(hiatusEndDate);

    // Найти после какой недели нужно показать hiatus текст
    let insertAfterWeek = -1;

    weeks.forEach((week, index) => {
      // Если hiatus начинается в этой неделе или после неё
      if (week.endDate >= hiatusStart && insertAfterWeek === -1) {
        insertAfterWeek = index;
      }
    });

    if (insertAfterWeek !== -1) {
      return [{
        id: 'hiatus-1',
        startDate: hiatusStart,
        endDate: hiatusEnd,
        insertAfterWeek
      }];
    }

    return [];
  }, [hiatusStartDate, hiatusEndDate]);

  // Создаем единый массив элементов для отображения
  const createDisplayItems = (weeks: WeekData[], hiatusBlocks: HiatusBlock[]) => {
    const items: Array<{ type: 'week' | 'hiatus', data: WeekData | HiatusBlock, order: number }> = [];
    
    // Добавляем недели
    weeks.forEach((week, index) => {
      if (week.activeDays > 0) { // Только недели с активными днями
        items.push({ type: 'week', data: week, order: index });
      }
    });
    
    // Добавляем hiatus блоки в правильной позиции
    hiatusBlocks.forEach((hiatus) => {
      items.push({ type: 'hiatus', data: hiatus, order: hiatus.insertAfterWeek + 0.5 });
    });
    
    // Сортируем по порядку
    return items.sort((a, b) => a.order - b.order);
  };

  // Генерируем недели при изменении дат
  useEffect(() => {
    if (startDate && endDate) {
      const newWeeks = generateWeeks(startDate, endDate);
      setWeeks(newWeeks);
      
      const newHiatusBlocks = generateHiatusBlocks(newWeeks);
      setHiatusBlocks(newHiatusBlocks);
    } else {
      setWeeks([]);
      setHiatusBlocks([]);
    }
  }, [startDate, endDate, hiatusStartDate, hiatusEndDate, generateWeeks, generateHiatusBlocks]);

  // Форматирование даты для отображения
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  if (weeks.length === 0) {
    return null; // Не показываем компонент, если нет данных
  }

  // Получаем максимальное количество дней для масштабирования
  const maxDays = Math.max(...weeks.map(week => week.activeDays), 1);
  
  // Создаем массив элементов для отображения
  const displayItems = createDisplayItems(weeks, hiatusBlocks);

  return (
    <div className={`${className}`}>
      {/* Container with dashed border */}
      <div style={{
        backgroundColor: '#F9F7F9',
        outline: '1px dashed #C4B5C7',
        borderRadius: '8px',
        padding: '24px',
        minHeight: '200px',
        position: 'relative'
      }}>
        {/* Total days counter */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          fontSize: '12px',
          color: '#999',
          fontWeight: 500
        }}>
          {weeks.reduce((total, week) => total + week.totalDays, 0)} days total
        </div>
        
        {/* Mixed visualization - weeks and hiatus in sequence */}
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'end',
            height: '180px',
            gap: '8px',
            position: 'relative',
            marginTop: '24px'
          }}
        >
          {displayItems.map((item, index) => {
            if (item.type === 'week') {
              const week = item.data as WeekData;
              // Высота столбика зависит от количества активных дней, максимум 160px
              const heightPercentage = maxDays > 0 ? (week.activeDays / maxDays) * 100 : 0;
              const calculatedHeight = (heightPercentage / 100) * 160; // Максимум 160px
              const height = Math.max(calculatedHeight, 15);
              
              return (
                <div 
                  key={week.id}
                  style={{ 
                    flex: 1,
                    height: `${height}px`,
                    backgroundColor: '#D7CEDA',
                    borderRadius: '8px 8px 0 0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#666',
                    minHeight: '30px'
                  }}
                  title={`Week ${week.weekNumber}: ${formatDate(week.startDate)} - ${formatDate(week.endDate)}`}
                >
                  {`${week.activeDays}d`}
                </div>
              );
            } else {
              // Hiatus block
              const hiatus = item.data as HiatusBlock;
              return (
                <div
                  key={hiatus.id}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#666',
                    fontWeight: 500,
                    backgroundColor: 'transparent'
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '2px' }}>Hiatus</div>
                    <div style={{ fontSize: '9px' }}>
                      {formatDate(hiatus.startDate)} - {formatDate(hiatus.endDate)}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FlightByDay;
