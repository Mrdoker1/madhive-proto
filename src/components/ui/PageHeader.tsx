'use client';

import React from 'react';
import { Button } from '@mantine/core';

interface PageHeaderProps {
  title: string;
  /** Show right button */
  showRightButton?: boolean;
  /** Right button text (default "Next") */
  rightButtonText?: string;
  /** Right button active state (on/off) */
  rightButtonActive?: boolean;
  /** Right button click handler */
  onRightButtonClick?: () => void;
  /** Additional content next to title */
  actions?: React.ReactNode;
  /** Custom right button (replaces standard button) */
  rightButtonComponent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  showRightButton = false,
  rightButtonText = 'Next',
  rightButtonActive = true,
  onRightButtonClick,
  actions,
  rightButtonComponent,
}) => {
  return (
    <div 
      className="w-full border-b flex items-center justify-between"
      style={{ 
        height: '64px',
        backgroundColor: 'var(--header-background)',
        borderBottomColor: 'var(--border-color)',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <h1 
          style={{ 
            fontSize: '24px',
            fontWeight: 500,
            margin: 0,
            color: '#000000'
          }}
        >
          {title}
        </h1>
        
        {actions}
      </div>

      {/* Right button - either custom or standard */}
      {rightButtonComponent ? (
        rightButtonComponent
      ) : showRightButton ? (
        <Button
          onClick={rightButtonActive ? onRightButtonClick : undefined}
          disabled={!rightButtonActive}
          variant={rightButtonActive ? 'filled' : 'outline'}
        >
          {rightButtonText}
        </Button>
      ) : null}
    </div>
  );
};

export default PageHeader;