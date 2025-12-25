'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Pages that should not show header/sidebar (auth pages)
const AUTH_PAGES = ['/login', '/signup', '/forgot-password', '/reset-password'];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Check if current page is an auth page
  const isAuthPage = AUTH_PAGES.some(page => pathname?.startsWith(page));

  // For auth pages, render without header/sidebar
  if (isAuthPage) {
    return (
      <div className="h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main content area with sidebar and content portal */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Portal */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;