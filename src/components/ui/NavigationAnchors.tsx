'use client';

import React, { useState, useEffect } from 'react';

export interface AnchorItem {
  id: string;
  label: string;
  anchor: string; // селектор элемента или ID
}

interface NavigationAnchorsProps {
  items: AnchorItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  activeColor?: string;
  textColor?: string;
}

const NavigationAnchors: React.FC<NavigationAnchorsProps> = ({ 
  items, 
  orientation = 'horizontal',
  className = '',
  activeColor = '#2A1037',
  textColor = '#666666'
}) => {
  const [activeAnchor, setActiveAnchor] = useState<string>(items[0]?.id || '');

  // Функция для плавного скролла к якорю
  const scrollToAnchor = (anchor: string, itemId: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveAnchor(itemId);
    }
  };

  // Отслеживание активного якоря при скролле
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset для более точного определения

      for (const item of items) {
        const element = document.querySelector(item.anchor) as HTMLElement;
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveAnchor(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем сразу для установки начального состояния

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const containerClass = orientation === 'vertical' 
    ? 'flex flex-col' 
    : 'flex space-x-6';

  return (
    <nav className={`${containerClass} ${className}`} style={{ display: 'flex', gap: '16px',}}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToAnchor(item.anchor, item.id)}
          className={`relative transition-colors duration-200 hover:opacity-80 ${
            orientation === 'vertical' ? 'text-right' : 'text-center'
          } ${activeAnchor === item.id ? 'active-anchor' : ''}`}
          style={{
            fontSize: '12px',
            color: activeAnchor === item.id ? activeColor : textColor,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span className="relative inline-block">
            {item.label}
            {/* Подчеркивание для активного элемента */}
            {activeAnchor === item.id && (
              <div
                className="absolute transition-all duration-200 rounded-full"
                style={{
                  backgroundColor: activeColor,
                  width: '100%',
                  height: '3px',
                  bottom: '-4px',
                  left: '0'
                }}
              />
            )}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default NavigationAnchors;