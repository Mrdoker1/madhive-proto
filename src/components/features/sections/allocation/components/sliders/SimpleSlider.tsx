'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SimpleSliderProps } from './types';

export const SimpleSlider: React.FC<SimpleSliderProps> = ({ value, max, step = 100, color = '#EC4899', showChannelColors = false, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Use primary color if showChannelColors is false, otherwise use channel color
  const PRIMARY_COLOR = 'var(--primary-color)';
  const labelColor = showChannelColors ? color : PRIMARY_COLOR;
  
  // Synchronize with external value when not dragging
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
    
    let currentDragValue = localValue; // Track current value
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = Math.round((newPercent / 100) * max / step) * step;
      
      currentDragValue = newValue; // Update local variable
      setLocalValue(newValue);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(currentDragValue); // Use current value
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
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        right: 0,
        height: '20px',
        backgroundColor: '#EBE6EC',
        borderRadius: '4px'
      }} />
      
      {/* Fill */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: 0,
        width: `${percent}%`,
        height: '20px',
        backgroundColor: 'var(--primary-color)',
        borderRadius: percent > 0 ? '4px 0 0 4px' : '4px'
      }} />
      
      {/* Vertical line from slider to label */}
      <div style={{
        position: 'absolute',
        left: `${percent}%`,
        top: '5px',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '27px',
        backgroundColor: labelColor
      }} />
      
      {/* Marker */}
      <div
        onMouseDown={handleMarkerMouseDown}
        style={{
          position: 'absolute',
          left: `${percent}%`,
          top: '28px',
          transform: 'translateX(-50%)',
          backgroundColor: labelColor,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '13px',
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
