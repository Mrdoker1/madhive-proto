'use client';

import React from 'react';
import { TextInput, Text, Card } from '@mantine/core';

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className = '' }) => {
  return (
    <div 
      className={`w-80 flex-shrink-0 h-full overflow-auto ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '100px',
        marginLeft: '24px'
      }}
    >
      <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: '16px' }}>
        {/* Budget Estimation */}
        <div>
          <TextInput
            label="Budget Estimation"
            placeholder="Enter budget estimation"
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* Audience Estimation */}
        <div>
          <TextInput
            label="Audience Estimation"
            placeholder="Enter audience estimation"
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* Market Estimation */}
        <div>
          <TextInput
            label="Market Estimation"
            placeholder="Enter market estimation"
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--form-label-color)',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid var(--form-input-border)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </div>

        {/* AI Suggestions */}
        <Card
          padding="lg"
          radius="md"
          styles={{
            root: {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
            }
          }}
        >
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;
