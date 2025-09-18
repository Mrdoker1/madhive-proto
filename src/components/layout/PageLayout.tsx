'use client';

import React from 'react';
import Breadcrumbs, { BreadcrumbStep } from '../ui/Breadcrumbs';
import PageHeader from '../ui/PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbStep[];
  title?: string;
  showProgress?: boolean; // Показывать прогресс в breadcrumbs
  onBreadcrumbClick?: (step: BreadcrumbStep) => void; // Обработчик клика на breadcrumb
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  breadcrumbs = [], 
  title, 
  showProgress = false,
  onBreadcrumbClick 
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
      
      {/* Page Header - только если передан title */}
      {title && (
        <PageHeader title={title} />
      )}
      
      {/* Page Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;