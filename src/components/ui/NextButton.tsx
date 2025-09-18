'use client';

import React from 'react';
import { Button } from '@mantine/core';

interface NextButtonProps {
  /**
   * Whether the Next button is active/enabled
   */
  active: boolean;
  /**
   * Click handler for the Next button
   */
  onClick?: () => void;
  /**
   * Custom text for the Next button (defaults to "Next")
   */
  text?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show the Back button (defaults to false)
   * When true, shows Back button on the left side
   */
  showBack?: boolean;
  /**
   * Click handler for the Back button
   */
  onBackClick?: () => void;
  /**
   * Custom text for the Back button (defaults to "Back")
   */
  backText?: string;
  /**
   * Whether the Back button is enabled (defaults to true)
   */
  backEnabled?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({
  active,
  onClick,
  text = 'Next',
  className = '',
  showBack = false,
  onBackClick,
  backText = 'Back',
  backEnabled = true
}) => {
  return (
    <div className={`
      w-full 
      flex items-center ${showBack ? 'justify-end' : 'justify-end'}
      border-t
      bg-[var(--header-background)]
      ${className}
    `}
    style={{ 
      borderTopColor: 'var(--border-color)',
      height: '64px'
    }}
    >
      {/* Container for buttons with gap */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Back Button */}
        {showBack && (
          <Button
            onClick={backEnabled ? onBackClick : undefined}
            disabled={!backEnabled}
            variant="outline"
            size="sm"
            className="text-[var(--active-color)] border-[var(--active-color)] hover:bg-[var(--active-color)]/10 hover:border-[var(--active-color)] text-xs transition-colors"
            styles={{
              root: {
                height: '32px',
                fontSize: '12px',
                borderColor: 'var(--active-color)',
                color: 'var(--active-color)',
                '&:hover': {
                  backgroundColor: 'rgba(42, 16, 55, 0.1)',
                  borderColor: 'var(--active-color)',
                  color: 'var(--active-color)'
                }
              }
            }}
          >
            {backText}
          </Button>
        )}

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
    </div>
  );
};

export default NextButton;