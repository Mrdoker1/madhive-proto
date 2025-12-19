'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TextInput, Tooltip, Modal, Button, NumberInput } from '@mantine/core';
import { IconCurrencyDollar, IconLock, IconLockOpen, IconInfoCircle } from '@tabler/icons-react';
import InfoNotification from '@/components/ui/InfoNotification';

interface WeekData {
  id: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  isLocked?: boolean; // Add field for locking
  isHiatusWeek?: boolean; // Add field to mark hiatus weeks
  activeDays?: number; // Number of active (non-hiatus) days in the week
  totalDays?: number; // Total days in the week (within campaign range)
}

interface HiatusRange {
  id: string;
  start: string;
  end: string;
}

interface FlightByWeekProps {
  startDate?: string;
  endDate?: string;
  totalBudget?: number;
  className?: string;
  onChange?: (weeklyBudgets: WeekData[]) => void;
  onValidationChange?: (validation: {
    isOverBudget: boolean;
    totalAllocated: number;
    showWarning: boolean;
  }) => void;
  // New props to support hiatus mode
  hiatusStartDate?: string;
  hiatusEndDate?: string;
  hiatusRanges?: HiatusRange[];
}

const FlightByWeek: React.FC<FlightByWeekProps> = ({
  startDate,
  endDate,
  totalBudget = 0,
  className = '',
  onChange,
  onValidationChange,
  hiatusStartDate,
  hiatusEndDate,
  hiatusRanges = []
}) => {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [dragState, setDragState] = useState<{[key: string]: number}>({});
  const [isDragging, setIsDragging] = useState(false);
  const [showBudgetTooltip, setShowBudgetTooltip] = useState(false);
  
  // Modal state for manual budget input
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingWeek, setEditingWeek] = useState<WeekData | null>(null);
  const [editBudgetValue, setEditBudgetValue] = useState<number | string>('');

  // Memoize hiatusRanges for dependency stability
  const stableHiatusRanges = useMemo(() => hiatusRanges || [], [hiatusRanges]);

  // Function to toggle week lock
  const toggleWeekLock = (weekId: string) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => 
        week.id === weekId 
          ? { ...week, isLocked: !week.isLocked }
          : week
      )
    );
  };

  // Calculate available budget for a specific week
  const calculateAvailableBudget = (weekId: string): number => {
    // Calculate sum of all locked weeks budget (excluding current week)
    const lockedWeeks = weeks.filter(w => w.isLocked && w.id !== weekId);
    const lockedBudgetSum = lockedWeeks.reduce((sum, w) => sum + w.budget, 0);
    
    // Available budget = total budget - locked budget
    return totalBudget - lockedBudgetSum;
  };

  // Handle double click to open edit modal
  const handleDoubleClick = (week: WeekData) => {
    if (week.isLocked) return; // Don't allow editing locked weeks
    
    const availableBudget = calculateAvailableBudget(week.id);
    
    setEditingWeek(week);
    setEditBudgetValue(Math.round(week.budget));
    setEditModalOpen(true);
  };

  // Handle modal budget save
  const handleSaveBudgetEdit = () => {
    if (!editingWeek) return;
    
    const newBudget = typeof editBudgetValue === 'string' ? parseFloat(editBudgetValue) : editBudgetValue;
    
    if (isNaN(newBudget) || newBudget < 0) {
      return; // Invalid input
    }
    
    // Calculate max available budget for this week
    const maxAvailableBudget = calculateAvailableBudget(editingWeek.id);
    
    // Clamp budget to available budget
    const clampedBudget = Math.min(newBudget, maxAvailableBudget);
    
    // Update the week budget
    updateWeekBudget(editingWeek.id, clampedBudget);
    
    // Redistribute remaining budget among other unlocked weeks
    const otherUnlockedWeeks = weeks.filter(w => w.id !== editingWeek.id && !w.isLocked);
    
    if (otherUnlockedWeeks.length > 0) {
      // Calculate sum of locked weeks (excluding current week)
      const lockedWeeks = weeks.filter(w => w.isLocked && w.id !== editingWeek.id);
      const lockedBudgetSum = lockedWeeks.reduce((sum, w) => sum + w.budget, 0);
      
      const remainingBudget = totalBudget - clampedBudget - lockedBudgetSum;
      const equalShare = Math.max(0, remainingBudget / otherUnlockedWeeks.length);
      
      otherUnlockedWeeks.forEach(week => {
        updateWeekBudget(week.id, equalShare);
      });
    }
    
    setEditModalOpen(false);
    setEditingWeek(null);
    setEditBudgetValue('');
  };

  // Handle modal close
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingWeek(null);
    setEditBudgetValue('');
  };

  // Function to generate weeks from date range
  const generateWeeks = useCallback((start: string, end: string): WeekData[] => {
    if (!start || !end) return [];

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    // Helper to check if a specific day is in hiatus
    const isDayInHiatus = (date: Date): boolean => {
      if (stableHiatusRanges && stableHiatusRanges.length > 0) {
        return stableHiatusRanges.some(range => {
          const rangeStart = new Date(range.start);
          const rangeEnd = new Date(range.end);
          return date >= rangeStart && date <= rangeEnd;
        });
      }
      
      if (hiatusStartDate && hiatusEndDate) {
        const hiatusStart = new Date(hiatusStartDate);
        const hiatusEnd = new Date(hiatusEndDate);
        return date >= hiatusStart && date <= hiatusEnd;
      }
      
      return false;
    };

    // Function to calculate active days in a week
    const calculateWeekDays = (weekStart: Date, weekEnd: Date): { activeDays: number; totalDays: number } => {
      // Constrain week by campaign boundaries
      const actualStart = weekStart < startDateObj ? startDateObj : weekStart;
      const actualEnd = weekEnd > endDateObj ? endDateObj : weekEnd;
      
      let activeDays = 0;
      let totalDays = 0;
      const tempDate = new Date(actualStart);
      
      while (tempDate <= actualEnd) {
        totalDays++;
        if (!isDayInHiatus(new Date(tempDate))) {
          activeDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
      
      return { activeDays, totalDays };
    };

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
      const actualEnd = currentWeekEnd > endDateObj ? endDateObj : currentWeekEnd;
      
      // Calculate active and total days for this week
      const { activeDays, totalDays } = calculateWeekDays(new Date(currentWeekStart), actualEnd);
      
      // Week is hiatus only if it has NO active days
      const isHiatusWeek = activeDays === 0;

      weeksArray.push({
        id: `week-${weekCounter}`,
        startDate: new Date(currentWeekStart),
        endDate: actualEnd,
        budget: 0, // Will be calculated in weeksWithBudget
        isLocked: isHiatusWeek, // Lock weeks in hiatus
        isHiatusWeek: isHiatusWeek, // Mark hiatus weeks
        activeDays: activeDays,
        totalDays: totalDays
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekCounter++;
    }

    return weeksArray;
  }, [hiatusStartDate, hiatusEndDate, stableHiatusRanges]);

  // Memoize generated weeks to prevent unnecessary recalculations
  const generatedWeeks = useMemo(() => {
    if (!startDate || !endDate) return [];
    return generateWeeks(startDate, endDate);
  }, [startDate, endDate, generateWeeks]);

  // Memoize weeks with budget - distributed proportionally based on active days
  const weeksWithBudget = useMemo(() => {
    if (generatedWeeks.length === 0) return [];
    
    // Calculate total active days across all weeks
    const totalActiveDays = generatedWeeks.reduce((sum, week) => sum + (week.activeDays || 0), 0);
    
    // Distribute budget proportionally based on active days
    return generatedWeeks.map(week => {
      if (week.isHiatusWeek || !week.activeDays || totalActiveDays === 0) {
        return { ...week, budget: 0 };
      }
      
      // Pro-rata budget based on proportion of active days
      const weekBudget = (week.activeDays / totalActiveDays) * totalBudget;
      return { ...week, budget: weekBudget };
    });
  }, [generatedWeeks, totalBudget]);

  // Update weeks state when memoized data changes
  useEffect(() => {
    setWeeks(weeksWithBudget);
  }, [weeksWithBudget]);

  // Memoize total budget sum
  const calculatedTotalAllocated = useMemo(() => {
    return weeks.reduce((sum, week) => sum + week.budget, 0);
  }, [weeks]);

  // Update totalAllocated state
  useEffect(() => {
    setTotalAllocated(calculatedTotalAllocated);
  }, [calculatedTotalAllocated]);

  // Notify parent component of changes
  useEffect(() => {
    if (onChange && weeks.length > 0) {
      onChange(weeks);
    }
  }, [weeks, onChange]);

  // Memoize validation object
  const validationData = useMemo(() => {
    const isOverBudget = totalAllocated > totalBudget;
    return {
      isOverBudget,
      totalAllocated,
      showWarning: !isDragging && isOverBudget
    };
  }, [totalAllocated, totalBudget, isDragging]);

  // Send validation to parent component
  useEffect(() => {
    if (onValidationChange && weeks.length > 0) {
      onValidationChange(validationData);
    }
  }, [validationData, onValidationChange, weeks.length]);

  // Update budget for specific week
  const updateWeekBudget = (weekId: string, budget: number) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => 
        week.id === weekId 
          ? { ...week, budget: Math.max(0, budget) }
          : week
      )
    );
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  // Memoize maximum budget for bar scaling
  const maxBudget = useMemo(() => {
    return Math.max(...weeks.map(week => week.budget), 1);
  }, [weeks]);

  // Memoize budget overflow check
  const isOverBudget = useMemo(() => {
    return totalAllocated > totalBudget;
  }, [totalAllocated, totalBudget]);

  if (weeks.length === 0) {
    return null; // Don't show component if no data
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: '#000000',
          marginBottom: '16px'
        }}>
          Spend by Week
        </h3>
        
        {/* Info Notification */}
        <InfoNotification 
          message="Drag bars up and down to redistribute budget across weeks, or double-click to enter exact amount. Lock weeks to preserve their budget allocation during adjustments."
        />
        
        <div className="flex justify-between items-center">
          <span style={{ fontSize: '14px', color: '#666' }}>
            {weeks.length} weeks total
          </span>
          <div style={{ fontSize: '14px' }}>
            <Tooltip
              label="Set a total budget to enable weekly distribution"
              position="bottom"
              withArrow
              opened={showBudgetTooltip}
            >
              <span style={{ color: '#666' }}>Total Budget: </span>
            </Tooltip>
            <span style={{ 
              color: 'var(--primary-color)',
              fontWeight: 500
            }}>
              ${totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Bars - with horizontal scroll */}
      <div 
        style={{ 
          overflowX: 'auto',
          marginBottom: '32px',
          paddingBottom: '8px'
        }}
      >
        <div 
          className="flex items-end"
          style={{ 
            minWidth: weeks.length > 10 ? `${weeks.length * 90}px` : '100%',
            height: '200px',
            gap: '8px',
          }}
        >
        {weeks.map((week, index) => {
          // Use dragState if active, otherwise regular budget
          const currentBudget = dragState[week.id] !== undefined ? dragState[week.id] : week.budget;
          
          // Calculate percentage of total budget
          const percentage = totalBudget > 0 ? (currentBudget / totalBudget) * 100 : 0;
          const containerHeight = Math.min(Math.max(percentage * 2, 15), 120);
          
          // Check if week is hiatus
          const isHiatusWeek = week.isHiatusWeek === true;
          
          return (
            <div 
              key={week.id}
              className="flex flex-col items-center"
              style={{ 
                flex: weeks.length > 10 ? '0 0 80px' : 1,
                minWidth: '80px'
              }}
            >
              {/* Budget Display with Lock */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '14px', 
                color: isHiatusWeek ? '#9CA3AF' : 'var(--primary-color)',
                fontWeight: 500,
                marginBottom: '4px',
                minHeight: '20px',
                textAlign: 'center'
              }}>
                {/* Lock/Unlock Button - only for weeks not in hiatus */}
                {!isHiatusWeek && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWeekLock(week.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      color: week.isLocked ? '#000000' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={week.isLocked ? 'Unlock budget' : 'Lock budget'}
                  >
                    {week.isLocked ? (
                      <IconLock size={16} />
                    ) : (
                      <IconLockOpen size={16} />
                    )}
                  </button>
                )}
                <span>
                  {isHiatusWeek ? 'HIATUS' : (
                    currentBudget >= 1000 
                      ? `$${(currentBudget / 1000).toFixed(1)}k`
                      : `$${Math.round(currentBudget)}`
                  )}
                </span>
              </div>

              {/* Draggable Bar Container */}
              <div
                className={`relative select-none outline-none focus:outline-none ${
                  week.isLocked ? 'cursor-not-allowed' : 'cursor-ns-resize'
                }`}
                style={{ 
                  width: '100%',
                  maxWidth: '60px',
                  height: `${containerHeight}px`,
                  backgroundColor: isHiatusWeek ? '#FAFAFA' : (week.isLocked ? '#F0F0F0' : '#F5F5F5'),
                  borderRadius: '4px 4px 0 0',
                  border: `1px solid ${isHiatusWeek ? '#E5E5E5' : (week.isLocked ? '#D1D5DB' : '#E6E3E8')}`,
                  minHeight: '15px',
                  opacity: isHiatusWeek ? 0.4 : (week.isLocked ? 0.6 : 1)
                }}
                tabIndex={-1}
                onDoubleClick={() => handleDoubleClick(week)}
                onMouseDown={(e) => {
                  // Prohibit drag for locked weeks
                  if (week.isLocked) {
                    return;
                  }

                  // Check if there's budget
                  if (totalBudget === 0) {
                    // Show tooltip for 2 seconds
                    setShowBudgetTooltip(true);
                    setTimeout(() => {
                      setShowBudgetTooltip(false);
                    }, 2000);
                    return;
                  }
                  
                  e.preventDefault();
                  const startContainer = e.currentTarget;
                  const startRect = startContainer.getBoundingClientRect();
                  const maxContainerHeight = 120;
                  
                  // Start drag operation
                  setIsDragging(true);
                  
                  // Initialize dragState with all current values
                  const initialDragState: {[key: string]: number} = {};
                  weeks.forEach(w => {
                    initialDragState[w.id] = w.budget;
                  });
                  setDragState(initialDragState);
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    const mouseY = e.clientY;
                    const relativeY = startRect.bottom - mouseY;
                    const clampedY = Math.max(0, Math.min(relativeY, maxContainerHeight));
                    const newPercentage = (clampedY / maxContainerHeight) * 100;
                    const newBudget = (newPercentage / 100) * totalBudget;
                    
                    // Redistribute remaining budget among other weeks
                    const otherWeeks = weeks.filter(w => w.id !== week.id);
                    const unlockedWeeks = otherWeeks.filter(w => !w.isLocked);
                    const lockedWeeks = otherWeeks.filter(w => w.isLocked); // Includes hiatus weeks
                    
                    // Calculate sum of locked weeks
                    const lockedBudgetSum = lockedWeeks.reduce((sum, w) => sum + w.budget, 0);
                    const remainingBudget = totalBudget - newBudget - lockedBudgetSum;
                    
                    if (remainingBudget >= 0 && unlockedWeeks.length > 0) {
                      // Evenly distribute remaining budget only among unlocked weeks
                      const equalShare = remainingBudget / unlockedWeeks.length;
                      
                      // Update dragState for all weeks
                      setDragState(prevState => {
                        const newState = { ...prevState };
                        newState[week.id] = newBudget;
                        // Update only unlocked weeks
                        unlockedWeeks.forEach(otherWeek => {
                          newState[otherWeek.id] = equalShare;
                        });
                        // Locked weeks remain unchanged
                        lockedWeeks.forEach(lockedWeek => {
                          newState[lockedWeek.id] = lockedWeek.budget;
                        });
                        return newState;
                      });
                      
                      // Also update actual values for correct validation
                      updateWeekBudget(week.id, newBudget);
                      unlockedWeeks.forEach(otherWeek => {
                        updateWeekBudget(otherWeek.id, equalShare);
                      });
                      // Don't update locked weeks
                    }
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                    
                    // End drag operation
                    setIsDragging(false);
                    
                    // Clear drag state
                    setDragState({});
                  };
                  
                  document.body.style.cursor = 'ns-resize';
                  document.body.style.userSelect = 'none';
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                {/* Actual Bar - fills entire container */}
                <div
                  className="absolute bottom-0 left-0 right-0 w-full h-full transition-none"
                  style={{
                    backgroundColor: isHiatusWeek ? '#E5E5E5' : (week.isLocked ? '#9CA3AF' : 'var(--primary-color)'),
                    borderRadius: '4px 4px 0 0'
                  }}
                />
                
                {/* Drag Handle - now on top of container */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 bg-gray-400 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  style={{
                    top: '-6px',
                    width: 'calc(100% - 8px)',
                    maxWidth: '24px',
                    height: '12px'
                  }}
                />
              </div>
              
              {/* Week Label with Start Date */}
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                marginTop: '8px',
                textAlign: 'center'
              }}>
                W{index + 1}&nbsp;&nbsp;{week.startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
              </div>
              
              {/* Percentage */}
              <div style={{ 
                fontSize: '12px', 
                color: '#999',
                marginTop: '2px',
                textAlign: 'center'
              }}>
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Edit Budget Modal */}
      <Modal
        opened={editModalOpen}
        onClose={handleCloseModal}
        title={editingWeek ? `Edit Budget for Week ${editingWeek.id.replace('week-', '')}` : 'Edit Budget'}
        centered
        size="sm"
      >
        {editingWeek && (() => {
          const maxAvailable = calculateAvailableBudget(editingWeek.id);
          const lockedWeeksCount = weeks.filter(w => w.isLocked).length;
          const currentValue = typeof editBudgetValue === 'string' ? parseFloat(editBudgetValue) : editBudgetValue;
          const isOverMax = !isNaN(currentValue) && currentValue > maxAvailable;
          const isInvalid = !editBudgetValue || editBudgetValue === '' || isNaN(currentValue) || currentValue < 0;
          
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                {lockedWeeksCount > 0 && (
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                    Locked Weeks Budget: ${(totalBudget - maxAvailable).toLocaleString()}
                  </div>
                )}
                <div style={{ fontSize: '12px', color: '#999' }}>
                  Maximum Available: ${Math.round(maxAvailable).toLocaleString()}
                </div>
              </div>

              <div>
                <NumberInput
                  label="Budget Amount"
                  placeholder="Enter budget"
                  value={editBudgetValue}
                  onChange={setEditBudgetValue}
                  min={0}
                  max={maxAvailable}
                  prefix="$"
                  thousandSeparator=","
                  hideControls
                  error={isOverMax ? `Maximum available budget is $${Math.round(maxAvailable).toLocaleString()}` : undefined}
                  styles={{
                    input: {
                      fontSize: '16px',
                      padding: '8px 12px'
                    }
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveBudgetEdit}
                  disabled={isInvalid || isOverMax}
                >
                  Save
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
};

export default React.memo(FlightByWeek);