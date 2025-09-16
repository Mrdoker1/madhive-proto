'use client';

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main content area with sidebar and content portal */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Portal */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;