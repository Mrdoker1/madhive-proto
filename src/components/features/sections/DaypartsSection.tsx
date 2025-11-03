import { Text, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateDaypartsData, updateChannelSectionData, setCarryOverMode } from '@/store/slices/campaignSlice';

interface DaypartsState {
  [day: string]: { [hour: number]: boolean };
}

interface DaypartsSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

// Dayparts definition with colors
// Colors follow the natural progression of the day to avoid confusion
const daypartDefinitions = [
  { name: 'Late Fringe', color: '#5C6BC0', hours: [0, 1] },        // Indigo - late night
  { name: 'Overnight', color: '#3F51B5', hours: [2, 3, 4, 5] },    // Deep blue - night
  { name: 'Early Morning', color: '#FFB74D', hours: [6, 7, 8, 9] }, // Warm orange - sunrise
  { name: 'Daytime', color: '#4FC3F7', hours: [10, 11, 12, 13, 14, 15] }, // Sky blue - daytime
  { name: 'Early Fringe', color: '#FFD54F', hours: [16, 17, 18] }, // Golden yellow - afternoon
  { name: 'Prime Access', color: '#9575CD', hours: [19] },         // Purple - prime start
  { name: 'Prime Time', color: '#7E57C2', hours: [20, 21, 22] },   // Deeper purple - prime
  { name: 'Late News', color: '#5C6BC0', hours: [23] }             // Indigo - late night
];

// Get daypart info for a specific hour
const getDaypartForHour = (hour: number) => {
  return daypartDefinitions.find(dp => dp.hours.includes(hour));
};

// Create hours array (0-23) with daypart info
const createHoursData = () => {
  const hours = [];
  for (let hour = 0; hour < 24; hour++) {
    const daypart = getDaypartForHour(hour);
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour < 12 ? 'am' : 'pm';
    hours.push({
      hour,
      display: `${displayHour}:00 ${period}`,
      daypart: daypart?.name || '',
      color: daypart?.color || '#999'
    });
  }
  return hours;
};

const DaypartsSection = ({ channel, isFirstChannel = true }: DaypartsSectionProps) => {
  const dispatch = useAppDispatch();
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const linearDaypartsData = useAppSelector((state) => state.campaign.dayparts);
  
  // Get data for current channel or use common data for linear
  const daypartsData = channel 
    ? (channelData[channel]?.dayparts || { selectedSlots: {} })
    : linearDaypartsData;
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ day: string; hour: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ day: string; hour: number } | null>(null);
  const [originalCellState, setOriginalCellState] = useState<boolean | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hoursData = createHoursData();

  // Helper function for deep copying selectedSlots
  const deepCopySelectedSlots = (slots: Record<string, Record<number, boolean>>): DaypartsState => {
    return structuredClone(slots);
  };

  // Function to update data with carry over support
  const updateSlots = (newSlots: DaypartsState) => {
    // If this is omnichannel and we're NOT on first tab, disable carry over mode
    if (channel && !isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }
    
    if (channel) {
      // Omnichannel: update data for specific channel
      dispatch(updateChannelSectionData({
        channel,
        section: 'dayparts',
        data: { selectedSlots: newSlots }
      }));
      
      // If carry over mode is active, copy data to all channels
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'dayparts',
              data: { selectedSlots: newSlots }
            }));
          }
        });
      }
    } else {
      // Linear: use old logic
      dispatch(updateDaypartsData({ selectedSlots: newSlots }));
    }
  };

  const isCellSelected = (day: string, hour: number): boolean => {
    return daypartsData.selectedSlots[day]?.[hour] || false;
  };

  // Check if cell is in preview area
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

  // Handle mouse enter for bulk selection preview
  const handleMouseEnter = (day: string, hour: number) => {
    if (isSelecting && selectionStart) {
      setSelectionEnd({ day, hour });
    }
  };

  // Apply bulk selection
  const applyBulkSelection = () => {
    if (!selectionStart || !selectionEnd || originalCellState === null) return;
    
    const dayStart = days.indexOf(selectionStart.day);
    const dayEnd = days.indexOf(selectionEnd.day);
    const hourStart = selectionStart.hour;
    const hourEnd = selectionEnd.hour;

    const minDay = Math.min(dayStart, dayEnd);
    const maxDay = Math.max(dayStart, dayEnd);
    const minHour = Math.min(hourStart, hourEnd);
    const maxHour = Math.max(hourStart, hourEnd);

    const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
    const actionToApply = !originalCellState;
    
    for (let d = minDay; d <= maxDay; d++) {
      const dayName = days[d];
      if (!newSelectedSlots[dayName]) newSelectedSlots[dayName] = {};
      
      for (let h = minHour; h <= maxHour; h++) {
        newSelectedSlots[dayName][h] = actionToApply;
      }
    }
    
    updateSlots(newSelectedSlots);
  };

  // Handle cell click with bulk selection support
  const handleCellClick = (day: string, hour: number) => {
    const cellSelected = isCellSelected(day, hour);

    if (!isSelecting) {
      // First click: start selection
      setIsSelecting(true);
      setSelectionStart({ day, hour });
      setSelectionEnd({ day, hour });
      setOriginalCellState(cellSelected);
      
      // Apply toggle for single cell
      const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = {};
      }
      newSelectedSlots[day][hour] = !cellSelected;
      updateSlots(newSelectedSlots);
    } else {
      // Second click: finish selection
      setSelectionEnd({ day, hour });
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
      for (let hour = 0; hour < 24; hour++) {
        newSelectedSlots[day][hour] = true;
      }
    });
    updateSlots(newSelectedSlots);
  };

  const reset = () => {
    updateSlots({});
  };

  // Quick select for a specific daypart
  const selectDaypart = (daypartName: string) => {
    const daypart = daypartDefinitions.find(dp => dp.name === daypartName);
    if (!daypart) return;

    const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
    days.forEach(day => {
      if (!newSelectedSlots[day]) newSelectedSlots[day] = {};
      daypart.hours.forEach(hour => {
        newSelectedSlots[day][hour] = true;
      });
    });
    updateSlots(newSelectedSlots);
  };

  const clearDaypart = (daypartName: string) => {
    const daypart = daypartDefinitions.find(dp => dp.name === daypartName);
    if (!daypart) return;

    const newSelectedSlots = deepCopySelectedSlots(daypartsData.selectedSlots);
    days.forEach(day => {
      if (newSelectedSlots[day]) {
        daypart.hours.forEach(hour => {
          newSelectedSlots[day][hour] = false;
        });
      }
    });
    updateSlots(newSelectedSlots);
  };

  return (
    <div>
      {/* Description and control buttons */}
      <Group justify="space-between" align="flex-start" mb="lg" wrap="nowrap">
        <Text size="sm" c="dimmed" style={{ flex: 1 }}>
          Choose ad delivery by <strong>hour</strong> across the week. Drag to select a range. Click daypart names to select entire dayparts.
        </Text>
        <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
          <Button size="xs" variant="outline" onClick={selectAll}>
            Select All
          </Button>
          <Button size="xs" variant="subtle" onClick={reset}>
            Reset
          </Button>
        </Group>
      </Group>

      {/* Time table */}
      <div 
        style={{ 
          userSelect: 'none', 
          width: '100%',
          overflowX: 'auto'
        }}
      >
        {/* Header with days */}
        <div style={{ 
          display: 'flex', 
          marginBottom: '8px', 
          gap: '4px'
        }}>
          <div style={{ width: '220px', flexShrink: 0 }}></div>
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

        {/* Hour rows */}
        {hoursData.map((hourData, index) => {
          const showDaypartLabel = index === 0 || hoursData[index - 1].daypart !== hourData.daypart;
          
          // Check if all hours of this daypart are selected
          const daypart = getDaypartForHour(hourData.hour);
          const allDaypartSelected = daypart ? days.every(day => 
            daypart.hours.every(hour => isCellSelected(day, hour))
          ) : false;
          
          return (
            <div key={hourData.hour} style={{ 
              display: 'flex', 
              marginBottom: '4px',
              gap: '4px'
            }}>
              {/* Daypart and time */}
              <div
                style={{
                  width: '220px',
                  height: '24px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#333',
                  flexShrink: 0,
                  gap: '8px'
                }}
              >
                {/* Fixed area for daypart button */}
                <div style={{ 
                  width: '130px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0
                }}>
                  {showDaypartLabel && (
                    <>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: hourData.color,
                          borderRadius: '2px',
                          flexShrink: 0
                        }}
                      />
                      <Button
                        size="xs"
                        variant={allDaypartSelected ? 'filled' : 'subtle'}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (allDaypartSelected) {
                            clearDaypart(hourData.daypart);
                          } else {
                            selectDaypart(hourData.daypart);
                          }
                        }}
                        styles={{
                          root: {
                            height: '24px',
                            fontSize: '12px',
                            padding: '0 8px'
                          }
                        }}
                      >
                        {hourData.daypart}
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Area for color bar and time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div
                    style={{
                      width: '6px',
                      height: '24px',
                      backgroundColor: hourData.color,
                      borderRadius: '1px',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ 
                    fontWeight: '400', 
                    fontSize: '10px',
                    minWidth: '55px'
                  }}>
                    {hourData.display}
                  </span>
                </div>
              </div>

              {/* Cells for each day */}
              {days.map(day => {
                const selected = isCellSelected(day, hourData.hour);
                const isInPreview = isCellInPreview(day, hourData.hour);
                
                let backgroundColor = '#EBE6EC';
                
                if (isInPreview) {
                  backgroundColor = 'rgba(41, 16, 54, 0.3)';
                } else if (selected) {
                  backgroundColor = '#291036';
                }
                
                return (
                  <div
                    key={`${day}-${hourData.hour}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor,
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'background-color 0.1s ease',
                      flexShrink: 0
                    }}
                    onClick={() => handleCellClick(day, hourData.hour)}
                    onMouseEnter={() => handleMouseEnter(day, hourData.hour)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaypartsSection;