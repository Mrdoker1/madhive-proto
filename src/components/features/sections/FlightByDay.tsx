'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface WeekData {
  id: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  activeDays: number; // Days not in hiatus
  weekNumber: number;
}

interface HiatusBlock {
  id: string;
  startDate: Date;
  endDate: Date;
  insertAfterWeek: number; // After which week to insert text
}

interface HiatusRange {
  id: string;
  start: string;
  end: string;
}

interface FlightByDayProps {
  startDate?: string;
  endDate?: string;
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  hiatusRanges?: HiatusRange[];
  className?: string;
  // New props to receive ready data from FlightByWeek
  weeks?: WeekData[];
  hiatusBlocks?: HiatusBlock[];
}

const FlightByDay: React.FC<FlightByDayProps> = ({
  startDate,
  endDate,
  hiatusStartDate,
  hiatusEndDate,
  hiatusRanges = [],
  className = '',
  weeks: propsWeeks,
  hiatusBlocks: propsHiatusBlocks
}) => {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [hiatusBlocks, setHiatusBlocks] = useState<HiatusBlock[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Check that component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize hiatusRanges for dependency stability
  const stableHiatusRanges = useMemo(() => hiatusRanges || [], [hiatusRanges]);

  // Use passed data if available, otherwise generate our own
  const finalWeeks = propsWeeks || weeks;
  const finalHiatusBlocks = propsHiatusBlocks || hiatusBlocks;

  // Memoize maximum number of days for scaling
  const maxDays = useMemo(() => {
    return Math.max(...finalWeeks.map(week => week.activeDays), 1);
  }, [finalWeeks]);

  // Memoize total number of days
  const totalDays = useMemo(() => {
    return finalWeeks.reduce((total, week) => total + week.totalDays, 0);
  }, [finalWeeks]);

  // Function to generate weeks from date range
  const generateWeeks = useCallback((start: string, end: string): WeekData[] => {
    if (!start || !end) return [];

    // Local function to check if day is in hiatus
    const isDayInHiatus = (date: Date): boolean => {
      // Check new multiple ranges
      if (stableHiatusRanges && stableHiatusRanges.length > 0) {
        const isInMultipleRanges = stableHiatusRanges.some(range => {
          const rangeStart = new Date(range.start);
          const rangeEnd = new Date(range.end);
          return date >= rangeStart && date <= rangeEnd;
        });
        if (isInMultipleRanges) return true;
      }
      
      // Backward compatibility with old API
      if (hiatusStartDate && hiatusEndDate) {
        const hiatusStart = new Date(hiatusStartDate);
        const hiatusEnd = new Date(hiatusEndDate);
        return date >= hiatusStart && date <= hiatusEnd;
      }
      
      return false;
    };

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const weeksArray: WeekData[] = [];

    // Start with Monday of the start date's week
    const weekStart = new Date(startDateObj);
    const dayOfWeek = weekStart.getDay();
    const diff = weekStart.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    weekStart.setDate(diff);

    let currentWeekStart = new Date(weekStart);
    let weekCounter = 1;

    while (currentWeekStart <= endDateObj) {
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

      // Don't go beyond selected range
      const actualStart = currentWeekStart < startDateObj ? startDateObj : currentWeekStart;
      const actualEnd = currentWeekEnd > endDateObj ? endDateObj : currentWeekEnd;

      // Count days in week
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
  }, [hiatusStartDate, hiatusEndDate, stableHiatusRanges]);

  // Function to generate hiatus blocks
  const generateHiatusBlocks = useCallback((weeks: WeekData[]): HiatusBlock[] => {
    if (weeks.length === 0) return [];

    const hiatusBlocks: HiatusBlock[] = [];

    // Process new multiple ranges
    if (stableHiatusRanges && stableHiatusRanges.length > 0) {
      stableHiatusRanges.forEach((range, rangeIndex) => {
        const hiatusStart = new Date(range.start);
        const hiatusEnd = new Date(range.end);

        // Find after which week to show hiatus text
        let insertAfterWeek = -1;

        weeks.forEach((week, index) => {
          // If hiatus starts in this week or after
          if (week.endDate >= hiatusStart && insertAfterWeek === -1) {
            insertAfterWeek = index;
          }
        });

        if (insertAfterWeek !== -1) {
          hiatusBlocks.push({
            id: `hiatus-${rangeIndex + 1}`,
            startDate: hiatusStart,
            endDate: hiatusEnd,
            insertAfterWeek
          });
        }
      });
    }

    // Backward compatibility with old API
    if (hiatusStartDate && hiatusEndDate && hiatusBlocks.length === 0) {
      const hiatusStart = new Date(hiatusStartDate);
      const hiatusEnd = new Date(hiatusEndDate);

      // Find after which week to show hiatus text
      let insertAfterWeek = -1;

      weeks.forEach((week, index) => {
        // If hiatus starts in this week or after
        if (week.endDate >= hiatusStart && insertAfterWeek === -1) {
          insertAfterWeek = index;
        }
      });

      if (insertAfterWeek !== -1) {
        hiatusBlocks.push({
          id: 'hiatus-legacy',
          startDate: hiatusStart,
          endDate: hiatusEnd,
          insertAfterWeek
        });
      }
    }

    return hiatusBlocks;
  }, [hiatusStartDate, hiatusEndDate, stableHiatusRanges]);

  // Memoize creation of single array of display items
  const createDisplayItems = useCallback((weeks: WeekData[], hiatusBlocks: HiatusBlock[]) => {
    const items: Array<{ type: 'week' | 'hiatus', data: WeekData | HiatusBlock, order: number }> = [];
    
    // Process weeks accounting for hiatus periods
    weeks.forEach((week, index) => {
      if (week.activeDays > 0) {
        // Check if there are hiatus blocks that overlap with this week
        const overlappingHiatus = hiatusBlocks.find(hiatus => {
          return week.startDate <= hiatus.endDate && week.endDate >= hiatus.startDate;
        });
        
        if (overlappingHiatus) {
          // If there's overlap with hiatus, need to determine order
          const hiatusStart = overlappingHiatus.startDate;
          const hiatusEnd = overlappingHiatus.endDate;
          
          // Check if active days of week are before or after hiatus
          if (week.endDate <= hiatusStart) {
            // Active days before hiatus
            items.push({ type: 'week', data: week, order: index });
          } else if (week.startDate >= hiatusEnd) {
            // Active days after hiatus
            items.push({ type: 'week', data: week, order: index + 1 });
          } else {
            // Week overlaps with hiatus - need to determine where most active days are
            const weekMiddle = new Date((week.startDate.getTime() + week.endDate.getTime()) / 2);
            if (weekMiddle < hiatusStart || weekMiddle > hiatusEnd) {
              // Week center outside hiatus
              if (weekMiddle < hiatusStart) {
                items.push({ type: 'week', data: week, order: index });
              } else {
                items.push({ type: 'week', data: week, order: index + 1 });
              }
            } else {
              // Active days after hiatus (default)
              items.push({ type: 'week', data: week, order: index + 1 });
            }
          }
        } else {
          // No overlap with hiatus
          items.push({ type: 'week', data: week, order: index });
        }
      }
    });
    
    // Add hiatus blocks in correct position
    hiatusBlocks.forEach((hiatus) => {
      items.push({ type: 'hiatus', data: hiatus, order: hiatus.insertAfterWeek + 0.5 });
    });
    
    // Sort by order
    return items.sort((a, b) => a.order - b.order);
  }, []);

  // Memoize array of display items
  const displayItems = useMemo(() => {
    return createDisplayItems(finalWeeks, finalHiatusBlocks);
  }, [finalWeeks, finalHiatusBlocks, createDisplayItems]);

  // Generate weeks on date change only if ready data not passed
  useEffect(() => {
    if (!propsWeeks && !propsHiatusBlocks) {
      if (startDate && endDate) {
        const newWeeks = generateWeeks(startDate, endDate);
        setWeeks(newWeeks);
        
        const newHiatusBlocks = generateHiatusBlocks(newWeeks);
        setHiatusBlocks(newHiatusBlocks);
      } else {
        setWeeks([]);
        setHiatusBlocks([]);
      }
    }
  }, [startDate, endDate, hiatusStartDate, hiatusEndDate, stableHiatusRanges, generateWeeks, generateHiatusBlocks, propsWeeks, propsHiatusBlocks]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  // Don't render on server to avoid hydration
  if (!isMounted) {
    return null;
  }

  if (finalWeeks.length === 0) {
    return null; // Don't show component if no data
  }

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
          fontSize: '14px',
          color: '#999',
          fontWeight: 500
        }}>
          {totalDays} days total
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
              
              // If week has no active days, don't show bar
              if (week.activeDays === 0) {
                return null;
              }
              
              // Bar height depends on number of active days, maximum 160px
              const heightPercentage = maxDays > 0 ? (week.activeDays / maxDays) * 100 : 0;
              const calculatedHeight = (heightPercentage / 100) * 160; // Maximum 160px
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
                    fontSize: '12px',
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

export default React.memo(FlightByDay);
