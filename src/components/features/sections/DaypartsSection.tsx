import { Text, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateDaypartsData } from '@/store/slices/campaignSlice';

interface DaypartsState {
  [day: string]: { [hour: number]: boolean };
}

const DaypartsSection = () => {
  const dispatch = useAppDispatch();
  const daypartsData = useAppSelector((state) => state.campaign.dayparts);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ day: string; daypart: string } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ day: string; daypart: string } | null>(null);
  const [originalCellState, setOriginalCellState] = useState<boolean | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Dayparts definition with time ranges
  const dayparts = [
    { name: 'Early Morning', hours: [6, 7, 8] },
    { name: 'Daytime', hours: [9, 10, 11, 12, 13, 14, 15] },
    { name: 'Early Fringe', hours: [16, 17, 18] },
    { name: 'Prime Time', hours: [19, 20, 21, 22] },
    { name: 'Late Night', hours: [23, 0, 1] },
    { name: 'Overnight', hours: [2, 3, 4, 5] }
  ];

  // Вспомогательная функция для глубокого копирования selectedSlots
  const deepCopySelectedSlots = (slots: Record<string, Record<number, boolean>>): DaypartsState => {
    return structuredClone(slots);
  };

  const isCellSelected = (day: string, hour: number): boolean => {
    return daypartsData.selectedSlots[day]?.[hour] || false;
  };

  // Check if cell is in preview area
  const isCellInPreview = (day: string, daypartName: string): boolean => {
    if (!isSelecting || !selectionStart || !selectionEnd) return false;
    
    const dayStart = days.indexOf(selectionStart.day);
    const dayEnd = days.indexOf(selectionEnd.day);
    const daypartStart = dayparts.findIndex(d => d.name === selectionStart.daypart);
    const daypartEnd = dayparts.findIndex(d => d.name === selectionEnd.daypart);
    const currentDay = days.indexOf(day);
    const currentDaypart = dayparts.findIndex(d => d.name === daypartName);

    const minDay = Math.min(dayStart, dayEnd);
    const maxDay = Math.max(dayStart, dayEnd);
    const minDaypart = Math.min(daypartStart, daypartEnd);
    const maxDaypart = Math.max(daypartStart, daypartEnd);

    return currentDay >= minDay && currentDay <= maxDay && 
           currentDaypart >= minDaypart && currentDaypart <= maxDaypart;
  };

  // Handle mouse enter for bulk selection preview
  const handleMouseEnter = (day: string, daypartName: string) => {
    if (isSelecting && selectionStart) {
      setSelectionEnd({ day, daypart: daypartName });
    }
  };

  // Apply bulk selection
  const applyBulkSelection = () => {
    if (!selectionStart || !selectionEnd || originalCellState === null) return;
    
    const dayStart = days.indexOf(selectionStart.day);
    const dayEnd = days.indexOf(selectionEnd.day);
    const daypartStart = dayparts.findIndex(d => d.name === selectionStart.daypart);
    const daypartEnd = dayparts.findIndex(d => d.name === selectionEnd.daypart);

    const minDay = Math.min(dayStart, dayEnd);
    const maxDay = Math.max(dayStart, dayEnd);
    const minDaypart = Math.min(daypartStart, daypartEnd);
    const maxDaypart = Math.max(daypartStart, daypartEnd);

    const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
    const actionToApply = !originalCellState;
    
    for (let d = minDay; d <= maxDay; d++) {
      const dayName = days[d];
      if (!newSelectedSlots[dayName]) newSelectedSlots[dayName] = {};
      
      for (let dp = minDaypart; dp <= maxDaypart; dp++) {
        const daypart = dayparts[dp];
        daypart.hours.forEach(hour => {
          newSelectedSlots[dayName][hour] = actionToApply;
        });
      }
    }
    
    dispatch(updateDaypartsData({ selectedSlots: newSelectedSlots }));
  };

  // Handle cell click with bulk selection support
  const handleCellClick = (day: string, daypartName: string, allHoursSelected: boolean) => {
    const daypart = dayparts.find(d => d.name === daypartName);
    if (!daypart) return;

    if (!isSelecting) {
      // First click: start selection
      setIsSelecting(true);
      setSelectionStart({ day, daypart: daypartName });
      setSelectionEnd({ day, daypart: daypartName });
      setOriginalCellState(allHoursSelected);
      
      // Apply toggle for single cell
      const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = {};
      }
      const newState = !allHoursSelected;
      daypart.hours.forEach(hour => {
        newSelectedSlots[day][hour] = newState;
      });
      dispatch(updateDaypartsData({ selectedSlots: newSelectedSlots }));
    } else {
      // Second click: finish selection
      setSelectionEnd({ day, daypart: daypartName });
      applyBulkSelection();
      
      // Reset selection state
      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
      setOriginalCellState(null);
    }
  };

  const selectAll = () => {
    const newSelectedSlots: DaypartsState = {};
    days.forEach(day => {
      newSelectedSlots[day] = {};
      dayparts.forEach(daypart => {
        daypart.hours.forEach(hour => {
          newSelectedSlots[day][hour] = true;
        });
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
      <Text size="sm" c="dimmed" mb="xl">
        Daypart allows you to specify precisely when an ad will run throughout the week
        <br />
        Click empty slots to add time, click filled slots to remove time
      </Text>

      {/* Таблица времени */}
      <div 
        style={{ 
          userSelect: 'none', 
          width: '100%'
        }}
      >
          {/* Заголовок с днями */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '8px', 
            gap: '4px'
          }}>
            <div style={{ width: '120px', flexShrink: 0 }}></div> {/* Пустое место для колонки dayparts */}
            {days.map(day => (
              <div
                key={day}
                style={{
                  width: '24px',
                  height: '20px',
                  fontSize: '10px',
                  fontWeight: '500',
                  textAlign: 'center',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Строки dayparts */}
          {dayparts.map(daypart => (
            <div key={daypart.name} style={{ 
              display: 'flex', 
              marginBottom: '4px',
              gap: '4px'
            }}>
              {/* Название daypart */}
              <div
                style={{
                  width: '120px',
                  height: '24px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#333',
                  flexShrink: 0,
                  paddingRight: '8px'
                }}
              >
                {daypart.name}
              </div>

              {/* Ячейки для каждого дня */}
              {days.map(day => {
                // Check if all hours in this daypart are selected for this day
                const allHoursSelected = daypart.hours.every(hour => isCellSelected(day, hour));
                const someHoursSelected = daypart.hours.some(hour => isCellSelected(day, hour));
                const isInPreview = isCellInPreview(day, daypart.name);
                
                let backgroundColor = '#EBE6EC'; // default
                
                if (isInPreview) {
                  backgroundColor = 'rgba(41, 16, 54, 0.3)'; // preview
                } else if (allHoursSelected) {
                  backgroundColor = '#291036'; // all selected
                } else if (someHoursSelected) {
                  backgroundColor = 'rgba(41, 16, 54, 0.5)'; // partially selected
                }
                
                return (
                  <div
                    key={`${day}-${daypart.name}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor,
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'background-color 0.1s ease',
                      flexShrink: 0
                    }}
                    onClick={() => handleCellClick(day, daypart.name, allHoursSelected)}
                    onMouseEnter={() => handleMouseEnter(day, daypart.name)}
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