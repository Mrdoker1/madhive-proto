'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarItem {
  id: string;
  icon: string;
  alt: string;
  href?: string;
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
  const pathname = usePathname();

  // Базовые элементы сайдбара
  const defaultItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: '/assets/icons/sidebar/dashboard.svg',
      alt: 'Dashboard',
      href: '/dashboard'
    },
    {
      id: 'campaign',
      icon: '/assets/icons/sidebar/horn.svg',
      alt: 'Campaigns',
      href: '/campaign'
    }
  ];

  // Объединяем базовые элементы с переданными
  const allItems = [...defaultItems, ...items];

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
  };

  // Определяем активный элемент на основе текущего пути
  const isItemActive = (item: SidebarItem) => {
    if (!item.href) return false;
    return pathname === item.href || pathname?.startsWith(item.href + '/');
  };

  return (
    <aside 
      className="flex flex-col border-r h-full" 
      style={{ 
        width: '64px', 
        backgroundColor: 'var(--sidebar-background)', 
        borderRightColor: 'var(--border-color)'
      }}
    >
      {/* Элементы меню */}
      <div className="flex flex-col">
        {allItems.map((item) => {
          const isActive = isItemActive(item);
          
          const itemContent = (
            <>
              {/* Левая линия для активного элемента */}
              {isActive && (
                <div
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{
                    left: '0px',
                    width: '2px',
                    height: '56px',
                    backgroundColor: 'var(--primary-color)'
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
                  filter: isActive 
                    ? 'brightness(0) saturate(100%) invert(8%) sepia(45%) saturate(2285%) hue-rotate(264deg) brightness(98%) contrast(98%)'
                    : 'brightness(0) saturate(100%) invert(44%) sepia(8%) saturate(878%) hue-rotate(314deg) brightness(91%) contrast(86%)'
                }}
              />
            </>
          );

          const itemStyles = {
            width: '64px', 
            height: '64px',
            backgroundColor: isActive 
              ? 'var(--active-background)' 
              : 'transparent'
          };

          const itemHandlers = {
            onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'var(--hover-background)';
              }
            },
            onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            },
            onClick: () => handleItemClick(item.id)
          };

          return item.href ? (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={itemStyles}
              {...itemHandlers}
            >
              {itemContent}
            </Link>
          ) : (
            <div
              key={item.id}
              className="relative flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={itemStyles}
              {...itemHandlers}
            >
              {itemContent}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;