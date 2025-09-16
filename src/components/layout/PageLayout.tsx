'use client';

import React from 'react';
import Breadcrumbs, { BreadcrumbStep } from '../ui/Breadcrumbs';
import PageHeader from '../ui/PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbStep[];
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, breadcrumbs = [], title }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Breadcrumbs - только если переданы */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs steps={breadcrumbs} />
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