import { Text, Radio, Button, Group } from '@mantine/core';
import { useState, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateDaypartsData } from '@/store/slices/campaignSlice';

interface DaypartsState {
  [day: string]: { [hour: number]: boolean };
}

const DaypartsSection = () => {
  const dispatch = useAppDispatch();
  const daypartsData = useAppSelector((state) => state.campaign.dayparts);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ day: string; hour: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ day: string; hour: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 часы

  // Вспомогательная функция для глубокого копирования selectedSlots
  const deepCopySelectedSlots = (slots: Record<string, Record<number, boolean>>): DaypartsState => {
    const copy: DaypartsState = {};
    Object.keys(slots).forEach(day => {
      copy[day] = { ...slots[day] };
    });
    return copy;
  };

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12am';
    if (hour < 12) return `${hour}am`;
    if (hour === 12) return '12pm';
    return `${hour - 12}pm`;
  };

  const isCellSelected = (day: string, hour: number): boolean => {
    return daypartsData.selectedSlots[day]?.[hour] || false;
  };

  const handleCellClick = (day: string, hour: number) => {
    if (!isSelecting) {
      // Одиночный клик - переключаем состояние ячейки
      const isCurrentlySelected = isCellSelected(day, hour);
      
      const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
      
      // Если день еще не существует, создаем его
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = {};
      }
      
      // Обновляем конкретную ячейку
      newSelectedSlots[day][hour] = !isCurrentlySelected;
      
      dispatch(updateDaypartsData({ selectedSlots: newSelectedSlots }));
      
      // Начинаем bulk выделение
      setIsSelecting(true);
      setSelectionStart({ day, hour });
      setSelectionEnd({ day, hour });
    } else {
      // Завершаем выделение
      setSelectionEnd({ day, hour });
      applySelection();
      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
    }
  };

  const handleMouseEnter = (day: string, hour: number) => {
    if (isSelecting && selectionStart) {
      // Обновляем конечную точку выделения
      setSelectionEnd({ day, hour });
    }
  };

  const applySelection = () => {
    if (!selectionStart || !selectionEnd) return;
    
    const dayStart = days.indexOf(selectionStart.day);
    const dayEnd = days.indexOf(selectionEnd.day);
    const hourStart = selectionStart.hour;
    const hourEnd = selectionEnd.hour;

    const minDay = Math.min(dayStart, dayEnd);
    const maxDay = Math.max(dayStart, dayEnd);
    const minHour = Math.min(hourStart, hourEnd);
    const maxHour = Math.max(hourStart, hourEnd);

    const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
    
    for (let d = minDay; d <= maxDay; d++) {
      const dayName = days[d];
      if (!newSelectedSlots[dayName]) newSelectedSlots[dayName] = {};
      
      for (let h = minHour; h <= maxHour; h++) {
        if (daypartsData.mode === 'include') {
          // Include режим - добавляем ячейки
          newSelectedSlots[dayName][h] = true;
        } else {
          // Exclude режим - убираем ячейки  
          newSelectedSlots[dayName][h] = false;
        }
      }
    }
    
    dispatch(updateDaypartsData({ selectedSlots: newSelectedSlots }));
  };

  const isCellInPreview = (day: string, hour: number): boolean => {
    if (!isSelecting || !selectionStart || !selectionEnd) return false;
    
    const dayStart = days.indexOf(selectionStart.day);
    const dayEnd = days.indexOf(selectionEnd.day);
    const hourStart = selectionStart.hour;
    const hourEnd = selectionEnd.hour;
    const currentDay = days.indexOf(day);

    const minDay = Math.min(dayStart, dayEnd);
    const maxDay = Math.max(dayStart, dayEnd);
    const minHour = Math.min(hourStart, hourEnd);
    const maxHour = Math.max(hourStart, hourEnd);

    return currentDay >= minDay && currentDay <= maxDay && 
           hour >= minHour && hour <= maxHour;
  };

  const selectAll = () => {
    const newSelectedSlots: DaypartsState = {};
    days.forEach(day => {
      newSelectedSlots[day] = {};
      hours.forEach(hour => {
        newSelectedSlots[day][hour] = true;
      });
    });
    dispatch(updateDaypartsData({ selectedSlots: newSelectedSlots }));
  };

  const reset = () => {
    dispatch(updateDaypartsData({ selectedSlots: {} }));
  };

  return (
    <div>
      {/* Описание */}
      <Text size="sm" c="dimmed" mb="lg">
        Daypart allows you to specify precisely when an ad will run throughout the week.
      </Text>

      {/* Радиокнопки Include/Exclude */}
      <Radio.Group 
        value={daypartsData.mode} 
        onChange={(value) => dispatch(updateDaypartsData({ mode: value as 'include' | 'exclude' }))} 
        mb="xl"
      >
        <Group gap="16px">
          <Radio value="include" label="Include" />
          <Radio value="exclude" label="Exclude" />
        </Group>
      </Radio.Group>

      {/* Таблица времени */}
      <div 
        ref={gridRef}
        style={{ userSelect: 'none', width: '100%', maxWidth: '740px'}}
      >
        {/* Заголовок с часами */}
        <div style={{ 
          display: 'flex', 
          marginBottom: '4px', 
          width: '100%',
          gap: 'calc((100% - 40px - (24px * 24)) / 23)' // Респонсивные отступы между ячейками
        }}>
          <div style={{ width: '40px', flexShrink: 0 }}></div> {/* Пустое место для колонки дней */}
          {hours.map(hour => (
            <div
              key={hour}
              style={{
                width: '24px',
                height: '20px',
                fontSize: '10px',
                textAlign: 'center',
                color: '#666',
                flexShrink: 0
              }}
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        {/* Строки дней */}
        {days.map(day => (
          <div key={day} style={{ 
            display: 'flex', 
            marginBottom: '4px',
            width: '100%',
            gap: 'calc((100% - 40px - (24px * 24)) / 23)' // Те же респонсивные отступы
          }}>
            {/* Название дня */}
            <div
              style={{
                width: '40px',
                height: '24px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                color: '#333',
                flexShrink: 0
              }}
            >
              {day}
            </div>

            {/* Ячейки часов */}
            {hours.map(hour => {
              const isSelected = isCellSelected(day, hour);
              const isInPreview = isCellInPreview(day, hour);
              
              let backgroundColor = '#EBE6EC'; // default
              
              if (isInPreview) {
                // Preview всегда одинаковый - полупрозрачный фиолетовый
                backgroundColor = 'rgba(41, 16, 54, 0.3)';
              } else if (isSelected) {
                backgroundColor = '#291036'; // selected
              }
              
              return (
                <div
                  key={`${day}-${hour}`}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor,
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'background-color 0.1s ease',
                    flexShrink: 0
                  }}
                  onClick={() => handleCellClick(day, hour)}
                  onMouseEnter={() => handleMouseEnter(day, hour)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Кнопки управления */}
      <Group justify="flex-end" mt="lg" gap="4px">
        <Button variant="outline" onClick={selectAll}>
          Select All
        </Button>
        <Button variant="subtle" onClick={reset}>
          Reset
        </Button>
      </Group>
    </div>
  );
};

export default DaypartsSection;