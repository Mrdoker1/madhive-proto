'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Tooltip } from '@mantine/core';
import { IconCurrencyDollar, IconLock, IconLockOpen, IconInfoCircle } from '@tabler/icons-react';

interface WeekData {
  id: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  isLocked?: boolean; // Добавляем поле для блокировки
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
  // Новые пропсы для поддержки hiatus режима
  hiatusStartDate?: string;
  hiatusEndDate?: string;
}

const FlightByWeek: React.FC<FlightByWeekProps> = ({
  startDate,
  endDate,
  totalBudget = 0,
  className = '',
  onChange,
  onValidationChange,
  hiatusStartDate,
  hiatusEndDate
}) => {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [dragState, setDragState] = useState<{[key: string]: number}>({});
  const [isDragging, setIsDragging] = useState(false);
  const [showBudgetTooltip, setShowBudgetTooltip] = useState(false);

  // Функция для переключения блокировки недели
  const toggleWeekLock = (weekId: string) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => 
        week.id === weekId 
          ? { ...week, isLocked: !week.isLocked }
          : week
      )
    );
  };

  // Функция для проверки, полностью ли неделя находится в hiatus диапазоне
  const isWeekInHiatus = (weekStart: Date, weekEnd: Date): boolean => {
    if (!hiatusStartDate || !hiatusEndDate) return false;
    
    const hiatusStart = new Date(hiatusStartDate);
    const hiatusEnd = new Date(hiatusEndDate);
    
    // Неделя блокируется только если она ПОЛНОСТЬЮ находится внутри hiatus диапазона
    // Начало недели >= начала hiatus И конец недели <= конца hiatus
    return weekStart >= hiatusStart && weekEnd <= hiatusEnd;
  };

  // Функция для генерации недель из диапазона дат
  const generateWeeks = (start: string, end: string): WeekData[] => {
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
      const actualEnd = currentWeekEnd > endDateObj ? endDateObj : currentWeekEnd;
      
      // Проверяем, попадает ли неделя в hiatus диапазон
      const isHiatusWeek = isWeekInHiatus(new Date(currentWeekStart), actualEnd);

      weeksArray.push({
        id: `week-${weekCounter}`,
        startDate: new Date(currentWeekStart),
        endDate: actualEnd,
        budget: isHiatusWeek ? 0 : 0, // Если неделя в hiatus, бюджет 0
        isLocked: isHiatusWeek // Блокируем недели в hiatus
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekCounter++;
    }

    return weeksArray;
  };

  // Генерируем недели при изменении дат
  useEffect(() => {
    if (startDate && endDate) {
      const newWeeks = generateWeeks(startDate, endDate);
      
      // Равномерно распределяем бюджет между неделями, исключая hiatus недели
      if (newWeeks.length > 0) {
        const activeWeeks = newWeeks.filter(week => !week.isLocked); // Недели не в hiatus
        const budgetPerWeek = activeWeeks.length > 0 ? totalBudget / activeWeeks.length : 0;
        
        const weeksWithBudget = newWeeks.map(week => ({
          ...week,
          budget: week.isLocked ? 0 : budgetPerWeek // Hiatus недели имеют бюджет 0
        }));
        setWeeks(weeksWithBudget);
      } else {
        setWeeks(newWeeks);
      }
    } else {
      setWeeks([]);
    }
  }, [startDate, endDate, totalBudget, hiatusStartDate, hiatusEndDate]);

  // Подсчитываем общую сумму при изменении бюджетов
  useEffect(() => {
    const total = weeks.reduce((sum, week) => sum + week.budget, 0);
    setTotalAllocated(total);
  }, [weeks]);

  // Уведомляем родительский компонент о изменениях
  useEffect(() => {
    if (onChange) {
      onChange(weeks);
    }
  }, [weeks, onChange]);

  // Отправляем валидацию в родительский компонент
  useEffect(() => {
    if (onValidationChange) {
      const isOverBudget = totalAllocated > totalBudget;
      onValidationChange({
        isOverBudget,
        totalAllocated,
        showWarning: !isDragging && isOverBudget // Показываем только когда не идет drag
      });
    }
  }, [totalAllocated, totalBudget, isDragging, onValidationChange]);

  // Обновление бюджета конкретной недели
  const updateWeekBudget = (weekId: string, budget: number) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => 
        week.id === weekId 
          ? { ...week, budget: Math.max(0, budget) }
          : week
      )
    );
  };

  // Форматирование даты
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  // Получение максимального бюджета для масштабирования баров
  const maxBudget = Math.max(...weeks.map(week => week.budget), 1);

  // Проверка превышения бюджета
  const isOverBudget = totalAllocated > totalBudget;

  if (weeks.length === 0) {
    return (
      <div className={`${className}`}>
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px'
        }}>
          Select a date range to see weekly budget allocation
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: '#000000',
          marginBottom: '8px'
        }}>
          Flight by Week
        </h3>
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
              color: '#291036',
              fontWeight: 500
            }}>
              ${totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Bars */}
      <div 
        className="flex items-end p-4rounded-lg"
        style={{ 
          borderColor: '#E6E3E8', 
          height: '200px',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {weeks.map((week, index) => {
          // Используем dragState если активен, иначе обычный budget  
          const currentBudget = dragState[week.id] !== undefined ? dragState[week.id] : week.budget;
          
          // Рассчитываем процент от общего бюджета
          const percentage = totalBudget > 0 ? (currentBudget / totalBudget) * 100 : 0;
          const containerHeight = Math.min(Math.max(percentage * 2, 15), 120);
          
          // Проверяем, является ли неделя hiatus
          const isHiatusWeek = week.isLocked && currentBudget === 0;
          
          return (
            <div 
              key={week.id}
              className="flex flex-col items-center"
              style={{ 
                flex: 1,
                minWidth: '20px'
              }}
            >
              {/* Budget Display with Lock */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '10px', 
                color: isHiatusWeek ? '#9CA3AF' : '#291036',
                fontWeight: 500,
                marginBottom: '4px',
                height: '15px',
                textAlign: 'center'
              }}>
                {/* Lock/Unlock Button - только для недель не в hiatus */}
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
                      <IconLock size={12} />
                    ) : (
                      <IconLockOpen size={12} />
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
                onMouseDown={(e) => {
                  // Запрещаем drag для заблокированных недель
                  if (week.isLocked) {
                    return;
                  }

                  // Проверяем, есть ли бюджет
                  if (totalBudget === 0) {
                    // Показываем тултип на 2 секунды
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
                  
                  // Начинаем drag операцию
                  setIsDragging(true);
                  
                  // Инициализируем dragState со всеми текущими значениями
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
                    
                    // Перераспределяем остальной бюджет между другими неделями
                    const otherWeeks = weeks.filter(w => w.id !== week.id);
                    const unlockedWeeks = otherWeeks.filter(w => !w.isLocked);
                    const lockedWeeks = otherWeeks.filter(w => w.isLocked); // Включает hiatus недели
                    
                    // Вычисляем сумму заблокированных недель
                    const lockedBudgetSum = lockedWeeks.reduce((sum, w) => sum + w.budget, 0);
                    const remainingBudget = totalBudget - newBudget - lockedBudgetSum;
                    
                    if (remainingBudget >= 0 && unlockedWeeks.length > 0) {
                      // Равномерно распределяем остальной бюджет только между незаблокированными неделями
                      const equalShare = remainingBudget / unlockedWeeks.length;
                      
                      // Обновляем dragState для всех недель
                      setDragState(prevState => {
                        const newState = { ...prevState };
                        newState[week.id] = newBudget;
                        // Обновляем только незаблокированные недели
                        unlockedWeeks.forEach(otherWeek => {
                          newState[otherWeek.id] = equalShare;
                        });
                        // Заблокированные недели остаются без изменений
                        lockedWeeks.forEach(lockedWeek => {
                          newState[lockedWeek.id] = lockedWeek.budget;
                        });
                        return newState;
                      });
                      
                      // Также обновляем реальные значения для корректной валидации
                      updateWeekBudget(week.id, newBudget);
                      unlockedWeeks.forEach(otherWeek => {
                        updateWeekBudget(otherWeek.id, equalShare);
                      });
                      // Заблокированные недели не обновляем
                    }
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                    
                    // Завершаем drag операцию
                    setIsDragging(false);
                    
                    // Очищаем состояние перетаскивания
                    setDragState({});
                  };
                  
                  document.body.style.cursor = 'ns-resize';
                  document.body.style.userSelect = 'none';
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                {/* Actual Bar - заполняет весь контейнер */}
                <div
                  className="absolute bottom-0 left-0 right-0 w-full h-full transition-none"
                  style={{
                    backgroundColor: isHiatusWeek ? '#E5E5E5' : (week.isLocked ? '#9CA3AF' : '#291036'),
                    borderRadius: '4px 4px 0 0'
                  }}
                />
                
                {/* Drag Handle - теперь сверху контейнера */}
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
              
              {/* Week Label */}
              <div style={{ 
                fontSize: '10px', 
                color: '#666',
                marginTop: '8px',
                textAlign: 'center'
              }}>
                W{index + 1}
              </div>
              
              {/* Percentage */}
              <div style={{ 
                fontSize: '9px', 
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

      {/* Summary */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center" style={{ fontSize: '12px', color: '#666' }}>
          Drag bars up and down to redistribute budget across weeks
        </div>
      </div>
    </div>
  );
};

export default FlightByWeek;