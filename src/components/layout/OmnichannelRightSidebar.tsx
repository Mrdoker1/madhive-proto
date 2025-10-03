'use client';

import React, { useState } from 'react';
import { Text, Card, Group } from '@mantine/core';
import Image from 'next/image';
import ChannelPills, { ChannelPill } from '@/components/ui/ChannelPills';

// Цвета каналов из allocation
const CHANNEL_COLORS: Record<string, string> = {
  total: '#000000',
  linear: '#6633CC',
  ctv: '#FF0099', 
  preroll: '#10B981', // Зеленый для Preroll
  audio: '#33CCCC',
  display: '#FFA100'
};

type ChannelType = 'total' | 'linear' | 'ctv' | 'preroll' | 'audio';

interface OmnichannelRightSidebarProps {
  className?: string;
}

const OmnichannelRightSidebar: React.FC<OmnichannelRightSidebarProps> = ({ className = '' }) => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('total');
  const [audienceSize, setAudienceSize] = useState<'Small' | 'Good' | 'Strong'>('Strong');

  const channelPills: ChannelPill[] = [
    { id: 'total', label: 'Total' },
    { id: 'linear', label: 'Linear' },
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' }
  ];

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
        {/* Channel Pills */}
        <div>
          <ChannelPills
            channels={channelPills}
            activeChannel={activeChannel}
            onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
          />
        </div>

        {/* Budget Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Budget Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '8px'
          }}>
            <Text size="xl" fw={600} ta="center">$ 390,250</Text>
          </div>
          
          {activeChannel === 'total' && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              of $ 390,250.00 in 4 Channels
            </Text>
          )}
          
          {/* Progress Bar */}
          <div style={{ 
            display: 'flex', 
            height: '8px', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            <div style={{ width: '10%', backgroundColor: CHANNEL_COLORS.display }} />
            <div style={{ width: '15%', backgroundColor: CHANNEL_COLORS.audio }} />
            <div style={{ width: '25%', backgroundColor: CHANNEL_COLORS.ctv }} />
            <div style={{ width: '50%', backgroundColor: CHANNEL_COLORS.linear }} />
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            fontSize: '11px',
            color: '#666',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.linear }} />
              <span>Linear TV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.ctv }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.display }} />
              <span>Display</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.audio }} />
              <span>Audio</span>
            </div>
          </div>
        </div>

        {/* Audience Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Audience Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '8px'
          }}>
            <Text size="xl" fw={600} ta="center">889,998,000</Text>
          </div>
          
          {activeChannel === 'total' && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              of -- in 4 Channels
            </Text>
          )}
          
          {/* Progress Bar */}
          <div style={{ 
            display: 'flex', 
            height: '8px', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            <div style={{ width: '10%', backgroundColor: CHANNEL_COLORS.display }} />
            <div style={{ width: '15%', backgroundColor: CHANNEL_COLORS.audio }} />
            <div style={{ width: '25%', backgroundColor: CHANNEL_COLORS.ctv }} />
            <div style={{ width: '50%', backgroundColor: CHANNEL_COLORS.linear }} />
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            fontSize: '11px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.linear }} />
              <span>Linear TV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.ctv }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.display }} />
              <span>Display</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.audio }} />
              <span>Audio</span>
            </div>
          </div>
          
          <Text size="sm" fw={500} mb="xs" mt="lg">Your Audience size is: {audienceSize}</Text>
          <Group gap="xs" mb="md">
            <div 
              onClick={() => setAudienceSize('Small')}
              style={{ 
                flex: 1, 
                padding: '8px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Small' ? '#2A1037' : '#F0F0F0',
                color: audienceSize === 'Small' ? '#FFFFFF' : '#000000',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Small</div>
            <div 
              onClick={() => setAudienceSize('Good')}
              style={{ 
                flex: 1, 
                padding: '8px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Good' ? '#2A1037' : '#F0F0F0',
                color: audienceSize === 'Good' ? '#FFFFFF' : '#000000',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Good</div>
            <div 
              onClick={() => setAudienceSize('Strong')}
              style={{ 
                flex: 1, 
                padding: '8px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Strong' ? '#4ADE80' : '#F0F0F0',
                color: audienceSize === 'Strong' ? '#FFFFFF' : '#000000',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Strong</div>
          </Group>
        </div>

        {/* Market Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Market Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '8px'
          }}>
            <Text size="xl" fw={600} ta="center">--</Text>
          </div>
          
          {activeChannel === 'total' && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              of -- in 4 Channels
            </Text>
          )}
          
          {/* Progress Bar - empty/gray for no data */}
          <div style={{ 
            height: '8px', 
            borderRadius: '4px',
            backgroundColor: '#E5E5E5',
            marginBottom: '12px'
          }} />
          
          {/* Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            fontSize: '11px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.linear }} />
              <span>Linear TV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.ctv }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.display }} />
              <span>Display</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CHANNEL_COLORS.audio }} />
              <span>Audio</span>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <Card
          padding="lg"
          radius="md"
          styles={{
            root: {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              position: 'relative'
            }
          }}
        >
          {/* Spark Icon in top right corner */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px'
          }}>
            <Image
              src="/assets/icons/other/spark.svg"
              alt="AI Spark"
              width={20}
              height={20}
              className={className}
            />
          </div>
          
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5, paddingRight: '30px' }}>
            We suggest you : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
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

export default OmnichannelRightSidebar;

