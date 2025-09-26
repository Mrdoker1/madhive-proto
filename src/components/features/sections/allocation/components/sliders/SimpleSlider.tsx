'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SimpleSliderProps } from './types';

export const SimpleSlider: React.FC<SimpleSliderProps> = ({ value, max, step = 100, color = '#EC4899', onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Синхронизируем с внешним value когда не перетаскиваем
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);
  
  const percent = max > 0 ? (localValue / max) * 100 : 0;
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((newPercent / 100) * max / step) * step;
    
    setLocalValue(newValue);
    onChange(newValue);
  };
  
  const handleMarkerMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    
    let currentDragValue = localValue; // Отслеживаем актуальное значение
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = Math.round((newPercent / 100) * max / step) * step;
      
      currentDragValue = newValue; // Обновляем локальную переменную
      setLocalValue(newValue);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(currentDragValue); // Используем актуальное значение
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div 
      ref={sliderRef}
      data-slider
      onClick={handleSliderClick}
      style={{ 
        position: 'relative', 
        height: '30px',
        marginBottom: '12px',
        cursor: 'pointer',
      }}
    >
      {/* Фон */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        right: 0,
        height: '20px',
        backgroundColor: '#EBE6EC',
        borderRadius: '4px'
      }} />
      
      {/* Заливка */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        width: `${percent}%`,
        height: '20px',
        backgroundColor: '#4B5563',
        borderRadius: percent > 0 ? '4px 0 0 4px' : '4px'
      }} />
      
      {/* Вертикальная линия от слайдера до ярлычка */}
      <div style={{
        position: 'absolute',
        left: `${percent}%`,
        top: '5px',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '27px',
        backgroundColor: color
      }} />
      
      {/* Маркер */}
      <div
        onMouseDown={handleMarkerMouseDown}
        style={{
          position: 'absolute',
          left: `${percent}%`,
          top: '28px',
          transform: 'translateX(-50%)',
          backgroundColor: color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'grab',
          userSelect: 'none',
          zIndex: 10,
          minWidth: '40px',
          textAlign: 'center'
        }}
      >
        {localValue >= 1000 ? `$${Math.round(localValue / 1000)}K` : `$${localValue}`}
      </div>
    </div>
  );
};
