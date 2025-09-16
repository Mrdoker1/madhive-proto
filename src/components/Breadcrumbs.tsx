'use client';

import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';

export type BreadcrumbStepStatus = 'completed' | 'current' | 'pending';

export interface BreadcrumbStep {
  id: string;
  label: string;
  status: BreadcrumbStepStatus;
  isSection?: boolean; // Флаг для названия секции (без кружка)
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ steps }) => {
  const renderStepIcon = (status: BreadcrumbStepStatus) => {
    switch (status) {
      case 'completed':
        return (
          <div
            className="rounded-full flex items-center justify-center"
            style={{ 
              width: '16px',
              height: '16px',
              backgroundColor: 'var(--breadcrumbs-completed)' 
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        );
      case 'current':
        return (
          <div
            className="rounded-full border-2 flex items-center justify-center"
            style={{ 
              width: '16px',
              height: '16px',
              borderColor: 'var(--breadcrumbs-current)',
              backgroundColor: 'var(--breadcrumbs-current)'
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        );
      case 'pending':
        return (
          <div
            className="rounded-full border-2"
            style={{ 
              width: '16px',
              height: '16px',
              borderColor: 'var(--breadcrumbs-current)',
              backgroundColor: 'transparent'
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full border-b flex items-center"
      style={{ 
        height: '48px',
        backgroundColor: 'var(--breadcrumbs-background)',
        borderBottomColor: 'var(--border-color)',
        paddingLeft: '40px'
      }}
    >
      <nav className="flex items-center" style={{ gap: '6px' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex items-center" style={{ gap: '8px' }}>
              {/* Показываем кружок только если это не секция */}
              {!step.isSection && renderStepIcon(step.status)}
              <span 
                className="font-medium"
                style={{ 
                  fontSize: '12px',
                  color: 'var(--breadcrumbs-text)'
                }}
              >
                {step.label}
              </span>
            </div>
            
            {/* Separator */}
            {index < steps.length - 1 && (
              <IconChevronRight 
                size={20} 
                style={{ 
                  color: 'var(--breadcrumbs-arrow)',
                  margin: '0 6px' 
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;