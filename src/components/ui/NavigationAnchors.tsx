'use client';

import React, { useState, useEffect } from 'react';

export interface AnchorItem {
  id: string;
  label: string;
  anchor: string; // element selector or ID
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

  // Function for smooth scroll to anchor
  const scrollToAnchor = (anchor: string, itemId: string) => {
    const element = document.querySelector(anchor);
    const scrollContainer = document.querySelector('main.overflow-auto');
    
    if (element) {
      if (scrollContainer) {
        // Scroll inside main container
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = elementRect.top - containerRect.top + scrollContainer.scrollTop - 20; // 20px offset
        
        // Check smooth scroll support
        if ('scrollBehavior' in document.documentElement.style) {
          scrollContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        } else {
          // Fallback for older browsers
          scrollContainer.scrollTop = scrollTop;
        }
      } else {
        // Regular scroll for window
        if ('scrollBehavior' in document.documentElement.style) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback for older browsers
          element.scrollIntoView(true);
        }
      }
    }
  };

  // Track active anchor on scroll
  useEffect(() => {
    const handleScroll = (event?: Event) => {
      // Determine scroll container - either main with overflow-auto or window
      const scrollContainer = document.querySelector('main.overflow-auto') || document.documentElement;
      const scrollPosition = (scrollContainer === document.documentElement ? window.scrollY : scrollContainer.scrollTop) + 100;

      for (const item of items) {
        const element = document.querySelector(item.anchor) as HTMLElement;
        if (element) {
          // Use getBoundingClientRect for more accurate positioning
          const rect = element.getBoundingClientRect();
          const containerRect = scrollContainer === document.documentElement 
            ? { top: 0 } 
            : (scrollContainer as HTMLElement).getBoundingClientRect();
          
          const elementTop = rect.top + (scrollContainer === document.documentElement ? window.scrollY : scrollContainer.scrollTop) - containerRect.top;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveAnchor(item.id);
            break;
          }
        }
      }
    };

    // Add listeners for both window and main container
    const scrollContainer = document.querySelector('main.overflow-auto');
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    
    handleScroll(); // Call immediately to set initial state

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
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
            fontSize: '14px',
            color: activeAnchor === item.id ? activeColor : textColor,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span className="relative inline-block">
            {item.label}
            {/* Underline for active element */}
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