import { Text, Button, Group, NumberInput, Checkbox } from '@mantine/core';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateDaypartsData, updateChannelSectionData, setCarryOverMode, DaypartPercentages } from '@/store/slices/campaignSlice';

interface DaypartsState {
  [day: string]: { [hour: number]: boolean };
}

interface DaypartsSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

// Dayparts definition with colors
// Ordered as requested: Early Morning -> Daytime -> Early Fringe -> Early News -> Prime Access -> Prime Time -> Late News -> Late Fringe -> Overnight
const daypartDefinitions = [
  { name: 'Early Morning', color: '#FFB74D', hours: [6, 7, 8, 9] }, // Warm orange - sunrise
  { name: 'Daytime', color: '#4FC3F7', hours: [10, 11, 12, 13, 14, 15] }, // Sky blue - daytime
  { name: 'Early Fringe', color: '#FFD54F', hours: [16, 17] },     // Golden yellow - afternoon
  { name: 'Early News', color: '#FFA726', hours: [18] },           // Orange - early evening news
  { name: 'Prime Access', color: '#9575CD', hours: [19] },         // Purple - prime start
  { name: 'Prime Time', color: '#7E57C2', hours: [20, 21, 22] },   // Deeper purple - prime
  { name: 'Late News', color: '#5C6BC0', hours: [23] },            // Indigo - late night
  { name: 'Late Fringe', color: '#5C6BC0', hours: [0, 1] },        // Indigo - late night
  { name: 'Overnight', color: '#3F51B5', hours: [2, 3, 4, 5] }     // Deep blue - night
];

// Get daypart info for a specific hour
const getDaypartForHour = (hour: number) => {
  return daypartDefinitions.find(dp => dp.hours.includes(hour));
};

// Create hours array starting from 6 AM (broadcast day) with daypart info
const createHoursData = () => {
  const hours = [];
  // Start from 6 AM (hour 6) and go through to 5 AM next day (hour 5)
  for (let i = 0; i < 24; i++) {
    const hour = (i + 6) % 24; // Start at 6, wrap around after 23
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
  const showDaypartsSelector = useAppSelector((state) => state.uiSettings.showDaypartsSelector);
  
  // Get data for current channel or use common data for linear
  const daypartsData = channel 
    ? (channelData[channel]?.dayparts || { selectedSlots: {} })
    : linearDaypartsData;
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ day: string; hour: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ day: string; hour: number } | null>(null);
  const [originalCellState, setOriginalCellState] = useState<boolean | null>(null);
  
  // State for disabled days and dayparts in the allocation table
  const [disabledDays, setDisabledDays] = useState<Set<string>>(new Set());
  const [disabledDayparts, setDisabledDayparts] = useState<Set<string>>(new Set());

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

  // Get selected dayparts (dayparts that have at least one hour selected on any day)
  const selectedDayparts = useMemo(() => {
    const selected: string[] = [];
    
    daypartDefinitions.forEach(daypart => {
      const hasSelection = days.some(day => 
        daypart.hours.some(hour => daypartsData.selectedSlots[day]?.[hour])
      );
      if (hasSelection) {
        selected.push(daypart.name);
      }
    });
    
    return selected;
  }, [daypartsData.selectedSlots]);

  // Track previous selected dayparts count to detect changes
  const prevSelectedCountRef = useRef(selectedDayparts.length);

  // Auto-redistribute when dayparts selection changes
  useEffect(() => {
    if (selectedDayparts.length !== prevSelectedCountRef.current && selectedDayparts.length > 0) {
      // Selection changed, auto-redistribute
      const equalPct = Math.floor(100 / selectedDayparts.length);
      const remainder = 100 - (equalPct * selectedDayparts.length);
      
      const newPercentages: DaypartPercentages = {};
      selectedDayparts.forEach((daypartName, index) => {
        newPercentages[daypartName] = {};
        days.forEach(day => {
          newPercentages[daypartName][day] = equalPct + (index === 0 ? remainder : 0);
        });
      });
      
      if (channel) {
        dispatch(updateChannelSectionData({
          channel,
          section: 'dayparts',
          data: { 
            selectedSlots: daypartsData.selectedSlots,
            daypartPercentages: newPercentages 
          }
        }));
      } else {
        dispatch(updateDaypartsData({ 
          selectedSlots: daypartsData.selectedSlots,
          daypartPercentages: newPercentages 
        }));
      }
    }
    prevSelectedCountRef.current = selectedDayparts.length;
  }, [selectedDayparts, daypartsData.selectedSlots, channel, dispatch]);

  // Get current percentages from Redux
  const daypartPercentages = useMemo(() => {
    const existing = daypartsData.daypartPercentages || {};
    const result: DaypartPercentages = {};
    
    selectedDayparts.forEach(daypartName => {
      if (existing[daypartName]) {
        result[daypartName] = { ...existing[daypartName] };
      } else {
        // Initialize with equal distribution for new dayparts
        const equalPct = selectedDayparts.length > 0 ? Math.floor(100 / selectedDayparts.length) : 0;
        const remainder = 100 - (equalPct * selectedDayparts.length);
        const index = selectedDayparts.indexOf(daypartName);
        result[daypartName] = {};
        days.forEach(day => {
          result[daypartName][day] = equalPct + (index === 0 ? remainder : 0);
        });
      }
    });
    
    return result;
  }, [selectedDayparts, daypartsData.daypartPercentages]);

  // Calculate totals per day
  const dayTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    days.forEach(day => {
      totals[day] = selectedDayparts.reduce((sum, dp) => {
        return sum + (daypartPercentages[dp]?.[day] || 0);
      }, 0);
    });
    return totals;
  }, [daypartPercentages, selectedDayparts]);

  // Update percentage for a daypart/day
  const updatePercentage = useCallback((daypartName: string, day: string, value: string | number) => {
    const numValue = typeof value === 'number' ? value : (parseInt(value) || 0);
    const clampedValue = Math.max(0, Math.min(100, numValue));
    
    const newPercentages: DaypartPercentages = { ...daypartPercentages };
    if (!newPercentages[daypartName]) {
      newPercentages[daypartName] = {};
    }
    newPercentages[daypartName] = { ...newPercentages[daypartName], [day]: clampedValue };
    
    if (channel) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'dayparts',
        data: { 
          selectedSlots: daypartsData.selectedSlots,
          daypartPercentages: newPercentages 
        }
      }));
    } else {
      dispatch(updateDaypartsData({ 
        selectedSlots: daypartsData.selectedSlots,
        daypartPercentages: newPercentages 
      }));
    }
  }, [daypartPercentages, daypartsData.selectedSlots, channel, dispatch]);

  // Auto-distribute percentages equally (considering disabled days and dayparts)
  const autoDistribute = useCallback(() => {
    if (selectedDayparts.length === 0) return;
    
    // Filter out disabled dayparts
    const enabledDayparts = selectedDayparts.filter(dp => !disabledDayparts.has(dp));
    
    const newPercentages: DaypartPercentages = {};
    
    // For each day, distribute among enabled dayparts
    days.forEach(day => {
      const isDayDisabled = disabledDays.has(day);
      
      if (isDayDisabled) {
        // Set all dayparts to 0 for disabled days
        selectedDayparts.forEach(daypartName => {
          if (!newPercentages[daypartName]) newPercentages[daypartName] = {};
          newPercentages[daypartName][day] = 0;
        });
      } else {
        // Distribute among enabled dayparts only - use decimal precision
        const daypartsForThisDay = enabledDayparts.length;
        const equalPct = daypartsForThisDay > 0 ? parseFloat((100 / daypartsForThisDay).toFixed(2)) : 0;
        
        selectedDayparts.forEach(daypartName => {
          if (!newPercentages[daypartName]) newPercentages[daypartName] = {};
          
          if (disabledDayparts.has(daypartName)) {
            newPercentages[daypartName][day] = 0;
          } else {
            newPercentages[daypartName][day] = equalPct;
          }
        });
      }
    });
    
    if (channel) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'dayparts',
        data: { 
          selectedSlots: daypartsData.selectedSlots,
          daypartPercentages: newPercentages 
        }
      }));
    } else {
      dispatch(updateDaypartsData({ 
        selectedSlots: daypartsData.selectedSlots,
        daypartPercentages: newPercentages 
      }));
    }
  }, [selectedDayparts, daypartsData.selectedSlots, channel, dispatch, disabledDays, disabledDayparts]);

  // Toggle day enabled/disabled
  const toggleDay = useCallback((day: string) => {
    setDisabledDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  }, []);

  // Toggle daypart enabled/disabled
  const toggleDaypart = useCallback((daypartName: string) => {
    setDisabledDayparts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(daypartName)) {
        newSet.delete(daypartName);
      } else {
        newSet.add(daypartName);
      }
      return newSet;
    });
  }, []);

  // Auto-redistribute when days or dayparts are toggled
  useEffect(() => {
    if (selectedDayparts.length > 0) {
      autoDistribute();
    }
  }, [disabledDays, disabledDayparts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* Description and control buttons - only show when selector is enabled */}
      {showDaypartsSelector && (
        <>
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
                    width: '28px',
                    height: '24px',
                    fontSize: '11px',
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
                  height: '28px',
                  fontSize: '12px',
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
                            height: '32px',
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
                    fontSize: '11px',
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
                      width: '28px',
                      height: '28px',
                      backgroundColor,
                      cursor: 'pointer',
                      borderRadius: '3px',
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
        </>
      )}

      {/* Percentage allocation table - appears when dayparts are selected */}
      {selectedDayparts.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <Group justify="space-between" align="center" mb="xs">
            <Text size="sm" fw={500}>Daypart Budget Allocation</Text>
            <Button size="xs" variant="subtle" onClick={autoDistribute}>
              Auto-distribute
            </Button>
          </Group>
          
          {/* Subtitle */}
          <Text size="sm" c="dimmed" mb="md">
            Allocate budget across days of week and standard local dayparts.
          </Text>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E6E3E8' }}>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '8px 12px',
                    fontWeight: 500,
                    width: '160px'
                  }}>Daypart</th>
                  {days.map(day => (
                    <th key={day} style={{ 
                      textAlign: 'center', 
                      padding: '8px 4px',
                      fontWeight: 500,
                      width: '75px'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <Checkbox
                          checked={!disabledDays.has(day)}
                          onChange={() => toggleDay(day)}
                          size="xs"
                          styles={{ input: { cursor: 'pointer' } }}
                        />
                        <span style={{ opacity: disabledDays.has(day) ? 0.4 : 1 }}>{day}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedDayparts.map(daypartName => {
                  const daypart = daypartDefinitions.find(dp => dp.name === daypartName);
                  const isDaypartDisabled = disabledDayparts.has(daypartName);
                  const daypartColor = daypart?.color || '#999';
                  return (
                    <tr key={daypartName} style={{ borderBottom: '1px solid #F0F0F0', opacity: isDaypartDisabled ? 0.4 : 1 }}>
                      <td style={{ 
                        textAlign: 'left', 
                        padding: '6px 12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Checkbox
                            checked={!isDaypartDisabled}
                            onChange={() => toggleDaypart(daypartName)}
                            size="xs"
                            color={daypartColor}
                            styles={{ 
                              input: { 
                                cursor: 'pointer',
                                backgroundColor: isDaypartDisabled ? undefined : daypartColor,
                                borderColor: daypartColor
                              } 
                            }}
                          />
                          <span>{daypartName}</span>
                        </div>
                      </td>
                      {days.map(day => {
                        const isDayDisabled = disabledDays.has(day);
                        const isDisabled = isDaypartDisabled || isDayDisabled;
                        return (
                          <td key={day} style={{ padding: '4px 4px', textAlign: 'center' }}>
                            <NumberInput
                              value={daypartPercentages[daypartName]?.[day] || 0}
                              onChange={(value) => updatePercentage(daypartName, day, value)}
                              placeholder="0"
                              min={0}
                              max={100}
                              step={0.01}
                              size="xs"
                              disabled={isDisabled}
                              suffix="%"
                              allowNegative={false}
                              allowDecimal={true}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              clampBehavior="strict"
                              hideControls
                              styles={{
                                root: { width: '65px', margin: '0 auto' },
                                input: {
                                  textAlign: 'center',
                                  fontSize: '13px',
                                  backgroundColor: isDisabled ? '#f5f5f5' : undefined
                                }
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Total row */}
                <tr style={{ borderTop: '1px solid #E6E3E8' }}>
                  <td style={{ 
                    textAlign: 'left', 
                    padding: '8px 12px',
                    fontWeight: 500
                  }}>Total</td>
                  {days.map(day => {
                    const total = dayTotals[day];
                    const isDayDisabled = disabledDays.has(day);
                    return (
                      <td key={day} style={{ 
                        padding: '8px 4px', 
                        textAlign: 'center',
                        opacity: isDayDisabled ? 0.4 : 1
                      }}>
                        <span>{Math.round(total)}%</span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaypartsSection;