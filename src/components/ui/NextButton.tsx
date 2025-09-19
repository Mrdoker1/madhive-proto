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
  /**
   * Whether this button is used as a footer (removes padding)
   */
  isFooter?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({
  active,
  onClick,
  text = 'Next',
  className = '',
  showBack = false,
  onBackClick,
  backText = 'Back',
  backEnabled = true,
  isFooter = false
}) => {
  return (
    <div style={{ 
      paddingLeft: isFooter ? '0' : '40px', 
      paddingRight: isFooter ? '0' : '40px', 
      backgroundColor: 'var(--header-background)',
      width: '100%'
    }}>
      <div className={`
        w-full 
        flex items-center justify-end
        border-t
        ${className}
      `}
      style={{ 
        borderTopColor: 'var(--border-color)',
        height: '64px',
        paddingLeft: isFooter ? '40px' : '0',
        paddingRight: isFooter ? '40px' : '0'
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
            >
              {backText}
            </Button>
          )}

          {/* Next Button */}
          <Button
            onClick={active ? onClick : undefined}
            disabled={!active}
            variant={active ? 'filled' : 'outline'}
          >
            {text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextButton;