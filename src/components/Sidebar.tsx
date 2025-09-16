'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface SidebarItem {
  id: string;
  icon: string;
  alt: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: SidebarItem[];
  onItemClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items = [],
  onItemClick 
}) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(
    items.find(item => item.isActive)?.id || null
  );

  // Базовые элементы сайдбара
  const defaultItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: '/assets/icons/sidebar/dashboard.svg',
      alt: 'Dashboard'
    },
    {
      id: 'horn',
      icon: '/assets/icons/sidebar/horn.svg',
      alt: 'Horn'
    }
  ];

  // Объединяем базовые элементы с переданными
  const allItems = [...defaultItems, ...items];

  const handleItemClick = (itemId: string) => {
    setActiveItemId(itemId);
    onItemClick?.(itemId);
  };

  return (
    <aside 
      className="flex flex-col border-r h-full" 
      style={{ 
        width: '64px', 
        backgroundColor: '#FDFCFA', 
        borderRightColor: '#E6E3E8'
      }}
    >
      {/* Элементы меню */}
      <div className="flex flex-col">
        {allItems.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center justify-center cursor-pointer transition-colors duration-200 ${
              activeItemId === item.id 
                ? 'bg-gray-100' 
                : 'hover:bg-gray-50'
            }`}
            style={{ width: '64px', height: '64px' }}
            onClick={() => handleItemClick(item.id)}
          >
            {/* Левая линия для активного элемента */}
            {activeItemId === item.id && (
              <div
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: '0px',
                  width: '2px',
                  height: '56px',
                  backgroundColor: '#2A1037'
                }}
              />
            )}
            
            <Image
              src={item.icon}
              alt={item.alt}
              width={24}
              height={24}
              className="w-6 h-6"
              style={{
                filter: activeItemId === item.id 
                  ? 'brightness(0) saturate(100%) invert(8%) sepia(45%) saturate(2285%) hue-rotate(264deg) brightness(98%) contrast(98%)'
                  : undefined
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;