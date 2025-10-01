'use client';

import React from 'react';
import { Button } from '@mantine/core';

interface PageHeaderProps {
  title: string;
  /** Показать правую кнопку */
  showRightButton?: boolean;
  /** Текст правой кнопки (по умолчанию "Next") */
  rightButtonText?: string;
  /** Активность правой кнопки (вкл/выкл) */
  rightButtonActive?: boolean;
  /** Обработчик клика правой кнопки */
  onRightButtonClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  showRightButton = false,
  rightButtonText = 'Next',
  rightButtonActive = true,
  onRightButtonClick,
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

      {showRightButton && (
        <Button
          onClick={rightButtonActive ? onRightButtonClick : undefined}
          disabled={!rightButtonActive}
          variant={rightButtonActive ? 'filled' : 'outline'}
        >
          {rightButtonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;