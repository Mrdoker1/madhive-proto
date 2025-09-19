import { Text, Radio, Button, Group } from '@mantine/core';
import { useState, useRef, useCallback } from 'react';

interface DaypartsState {
  [day: string]: { [hour: number]: boolean };
}

const DaypartsSection = () => {
  const [mode, setMode] = useState<'include' | 'exclude'>('include');
  const [selectedSlots, setSelectedSlots] = useState<DaypartsState>({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<{ day: string; hour: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 часы

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12am';
    if (hour < 12) return `${hour}am`;
    if (hour === 12) return '12pm';
    return `${hour - 12}pm`;
  };

  const isCellSelected = (day: string, hour: number): boolean => {
    return selectedSlots[day]?.[hour] || false;
  };

  const toggleCell = (day: string, hour: number) => {
    setSelectedSlots(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: !isCellSelected(day, hour)
      }
    }));
  };

  const handleMouseDown = (day: string, hour: number) => {
    setIsDragging(true);
    setDragStartCell({ day, hour });
    toggleCell(day, hour);
  };

  const handleMouseEnter = (day: string, hour: number) => {
    if (isDragging && dragStartCell) {
      // При перетаскивании выбираем все ячейки в прямоугольнике
      const dayStart = days.indexOf(dragStartCell.day);
      const dayEnd = days.indexOf(day);
      const hourStart = dragStartCell.hour;
      const hourEnd = hour;

      const minDay = Math.min(dayStart, dayEnd);
      const maxDay = Math.max(dayStart, dayEnd);
      const minHour = Math.min(hourStart, hourEnd);
      const maxHour = Math.max(hourStart, hourEnd);

      const newSelectedSlots = { ...selectedSlots };
      
      for (let d = minDay; d <= maxDay; d++) {
        const dayName = days[d];
        if (!newSelectedSlots[dayName]) newSelectedSlots[dayName] = {};
        
        for (let h = minHour; h <= maxHour; h++) {
          newSelectedSlots[dayName][h] = true;
        }
      }
      
      setSelectedSlots(newSelectedSlots);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartCell(null);
  };

  const selectAll = () => {
    const newSelectedSlots: DaypartsState = {};
    days.forEach(day => {
      newSelectedSlots[day] = {};
      hours.forEach(hour => {
        newSelectedSlots[day][hour] = true;
      });
    });
    setSelectedSlots(newSelectedSlots);
  };

  const reset = () => {
    setSelectedSlots({});
  };

  return (
    <div>
      {/* Описание */}
      <Text size="sm" c="dimmed" mb="lg">
        Daypart allows you to specify precisely when an ad will run throughout the week.
      </Text>

      {/* Радиокнопки Include/Exclude */}
      <Radio.Group value={mode} onChange={(value) => setMode(value as 'include' | 'exclude')} mb="xl">
        <Group gap="16px">
          <Radio value="include" label="Include" />
          <Radio value="exclude" label="Exclude" />
        </Group>
      </Radio.Group>

      {/* Таблица времени */}
      <div 
        ref={gridRef}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
            {hours.map(hour => (
              <div
                key={`${day}-${hour}`}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: isCellSelected(day, hour) ? '#291036' : '#EBE6EC',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'background-color 0.1s ease',
                  flexShrink: 0
                }}
                onMouseDown={() => handleMouseDown(day, hour)}
                onMouseEnter={() => handleMouseEnter(day, hour)}
              />
            ))}
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