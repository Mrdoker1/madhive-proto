'use client';

import React from 'react';
import { Button } from '@mantine/core';

interface NextButtonProps {
  /**
   * Whether the button is active/enabled
   */
  active: boolean;
  /**
   * Click handler for the Next button
   */
  onClick?: () => void;
  /**
   * Custom text for the button (defaults to "Next")
   */
  text?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const NextButton: React.FC<NextButtonProps> = ({
  active,
  onClick,
  text = 'Next',
  className = '',
}) => {
  return (
    <div className={`
      w-full 
      flex items-center justify-end
      border-t
      bg-[var(--header-background)]
      ${className}
    `}
    style={{ 
      borderTopColor: 'var(--border-color)',
      height: '64px'
    }}
    >
      {/* Next Button */}
      <Button
        onClick={active ? onClick : undefined}
        disabled={!active}
        variant={active ? 'filled' : 'outline'}
        size="sm"
        className={active ? 'bg-[var(--active-color)] hover:bg-[var(--active-color)]/90 text-white text-xs transition-colors' : 'text-gray-400 text-xs'}
        styles={{
          root: {
            height: '32px',
            fontSize: '12px'
          }
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default NextButton;