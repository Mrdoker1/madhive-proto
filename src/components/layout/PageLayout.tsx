'use client';

import React from 'react';
import Breadcrumbs, { BreadcrumbStep } from '../ui/Breadcrumbs';
import PageHeader from '../ui/PageHeader';
import RightSidebar from './RightSidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbStep[];
  title?: string;
  showProgress?: boolean; // Показывать прогресс в breadcrumbs
  onBreadcrumbClick?: (step: BreadcrumbStep) => void; // Обработчик клика на breadcrumb
  showRightSidebar?: boolean; // Показывать правый сайдбар
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  breadcrumbs = [], 
  title, 
  showProgress = false,
  onBreadcrumbClick,
  showRightSidebar = false
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Breadcrumbs - только если переданы */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs 
          steps={breadcrumbs} 
          showProgress={showProgress}
          onStepClick={onBreadcrumbClick}
        />
      )}
      
      {/* Main Layout Container - от PageHeader до конца */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - PageHeader + Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Page Header - только если передан title */}
          {title && (
            <PageHeader title={title} />
          )}
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
        
        {/* Right Sidebar - от уровня PageHeader до конца страницы */}
        {showRightSidebar && (
          <RightSidebar />
        )}
      </div>
    </div>
  );
};

export default PageLayout;