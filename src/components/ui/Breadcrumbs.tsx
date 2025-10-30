'use client';

import React from 'react';
import { IconChevronRight, IconCheck } from '@tabler/icons-react';

export type BreadcrumbStepStatus = 'completed' | 'current' | 'pending' | 'disabled';

export interface BreadcrumbStep {
  id: string;
  label: string;
  status: BreadcrumbStepStatus;
  isSection?: boolean; // Flag for section name (without circle)
  onClick?: () => void; // Click handler for navigation
  disabled?: boolean; // Additional lock
  tooltip?: string; // Tooltip on hover
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
  showProgress?: boolean; // Show progress in percentage
  className?: string;
  onStepClick?: (step: BreadcrumbStep) => void; // Global click handler
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  steps, 
  showProgress = false, 
  className = '', 
  onStepClick 
}) => {
  // Calculate completion progress
  const completedSteps = steps.filter(step => step.status === 'completed' && !step.isSection).length;
  const totalSteps = steps.filter(step => !step.isSection).length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const handleStepClick = (step: BreadcrumbStep) => {
    if (step.disabled || step.status === 'disabled') return;
    
    if (step.onClick) {
      step.onClick();
    } else if (onStepClick) {
      onStepClick(step);
    }
  };

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
            <IconCheck size={10} color="white" />
          </div>
        );
      case 'current':
        return (
          <div
            className="rounded-full border-1 flex items-center justify-center"
            style={{ 
              width: '16px',
              height: '16px',
              borderColor: 'var(--primary-color)',
              backgroundColor: 'var(--primary-color)'
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        );
      case 'pending':
        return (
          <div
            className="rounded-full border-1"
            style={{ 
              width: '16px',
              height: '16px',
              borderColor: 'var(--primary-color)',
              backgroundColor: 'transparent'
            }}
          />
        );
      case 'disabled':
        return (
          <div
            className="rounded-full border-1"
            style={{ 
              width: '16px',
              height: '16px',
              borderColor: '#E5E5E5',
              backgroundColor: 'transparent'
            }}
          />
        );
      default:
        return null;
    }
  };

  const getStepTextColor = (step: BreadcrumbStep) => {
    // Sections (flow names) are always black
    if (step.isSection) return '#000000';
    
    if (step.disabled || step.status === 'disabled') return '#999999';
    if (step.status === 'completed') return 'var(--primary-color)';
    if (step.status === 'current') return 'var(--primary-color)';
    return 'var(--primary-color)';
  };

  const isClickable = (step: BreadcrumbStep) => {
    // Sections (flow names) are not clickable
    if (step.isSection) return false;
    
    // Steps are clickable only if onClick or onStepClick is explicitly provided
    return !step.disabled && step.status !== 'disabled' && (step.onClick || onStepClick);
  };

  return (
    <div 
      className={`w-full border-b flex items-center justify-between ${className}`}
      style={{ 
        height: '48px',
        backgroundColor: 'var(--breadcrumbs-background)',
        borderBottomColor: 'var(--border-color)',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}
    >
      <nav className="flex items-center" style={{ gap: '6px' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div 
              className={`flex items-center ${isClickable(step) ? 'cursor-pointer hover:opacity-80' : ''}`}
              style={{ gap: '8px' }}
              onClick={() => handleStepClick(step)}
              title={step.tooltip}
            >
              {/* Show circle only if it's not a section */}
              {!step.isSection && renderStepIcon(step.status)}
              <span 
                className={`transition-colors ${step.isSection ? 'font-semibold' : 'font-medium'}`}
                style={{ 
                  fontSize: '12px',
                  color: getStepTextColor(step)
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

      {/* Progress indicator */}
      {showProgress && (
        <div className="flex items-center" style={{ gap: '8px' }}>
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--primary-color)' }}
          >
            {progressPercentage}% complete
          </span>
          <div 
            className="rounded-full bg-gray-200"
            style={{ width: '60px', height: '4px' }}
          >
            <div 
              className="rounded-full transition-all duration-300"
              style={{ 
                width: `${progressPercentage}%`, 
                height: '100%',
                backgroundColor: 'var(--breadcrumbs-completed)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;