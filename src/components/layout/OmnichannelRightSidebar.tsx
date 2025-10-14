'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  display: '#FFA100',
  social: '#8B5CF6',
  search: '#F59E0B',
  email: '#EF4444'
};

type ChannelType = 'total' | 'ctv' | 'preroll' | 'audio' | 'social' | 'search' | 'email';

interface OmnichannelRightSidebarProps {
  className?: string;
  selectedChannels?: string[]; // Массив выбранных каналов (preroll, ctv, audio, etc.)
}

const OmnichannelRightSidebar: React.FC<OmnichannelRightSidebarProps> = ({ 
  className = '',
  selectedChannels = [] 
}) => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('total');
  const [audienceSize, setAudienceSize] = useState<'Small' | 'Good' | 'Strong'>('Strong');

  const allChannelPills: ChannelPill[] = [
    { id: 'total', label: 'Total' },
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];
  
  // Фильтруем pills: Total всегда показываем + выбранные каналы
  const channelPills = useMemo(() => {
    if (selectedChannels.length === 0) {
      return allChannelPills; // Если ничего не выбрано, показываем все
    }
    
    return allChannelPills.filter(pill => 
      pill.id === 'total' || selectedChannels.includes(pill.id)
    );
  }, [selectedChannels]);
  
  // Если активный канал не в списке доступных, переключаемся на Total
  useEffect(() => {
    const isActiveChannelAvailable = channelPills.some(pill => pill.id === activeChannel);
    if (!isActiveChannelAvailable) {
      setActiveChannel('total');
    }
  }, [channelPills, activeChannel]);

  // Процентное соотношение каналов
  const channelPercentages: Record<string, number> = {
    linear: 50,
    ctv: 25,
    preroll: 10,
    audio: 15,
    display: 10,
    social: 10,
    search: 5,
    email: 5
  };

  // Функция для определения цвета легенды
  const getLegendColor = (channelId: string): string => {
    if (activeChannel === 'total') {
      return CHANNEL_COLORS[channelId] || '#CCCCCC';
    }
    // Если выбран конкретный канал, только он цветной, остальные серые
    return activeChannel === channelId ? CHANNEL_COLORS[channelId] : '#CCCCCC';
  };

  return (
    <div 
      className={`w-80 flex-shrink-0 ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '24px',
        marginLeft: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: 'calc(100vh - 48px)'
      }}
    >
      {/* Sticky Header with Pills */}
      <div style={{ 
        position: 'sticky',
        top: 0,
        backgroundColor: '#F3F2EB',
        zIndex: 10,
        paddingTop: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }}>
        <ChannelPills
          channels={channelPills}
          activeChannel={activeChannel}
          onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
        />
        {/* Divider */}
        <div style={{ 
          width: 'calc(100% + 48px)', 
          height: '1px', 
          backgroundColor: '#D1D5DB', 
          marginLeft: '-24px',
          marginTop: '16px'
        }} />
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px',
        gap: '16px',
        overflowY: 'auto',
        flex: 1
      }}>
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
              of $ 390,250.00 in 6 Channels
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
            {activeChannel === 'total' ? (
              <>
                <div style={{ width: '40%', backgroundColor: CHANNEL_COLORS.ctv }} />
                <div style={{ width: '30%', backgroundColor: CHANNEL_COLORS.audio }} />
                <div style={{ width: '20%', backgroundColor: CHANNEL_COLORS.preroll }} />
                <div style={{ width: '10%', backgroundColor: CHANNEL_COLORS.social }} />
              </>
            ) : (
              <>
                <div style={{ width: `${channelPercentages[activeChannel] || 0}%`, backgroundColor: CHANNEL_COLORS[activeChannel] }} />
                <div style={{ width: `${100 - (channelPercentages[activeChannel] || 0)}%`, backgroundColor: '#E5E5E5' }} />
              </>
            )}
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 4px',
            fontSize: '11px',
            color: '#666',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('ctv') }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('preroll') }} />
              <span>Preroll</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('audio') }} />
              <span>Audio</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('social') }} />
              <span>Social</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('search') }} />
              <span>Search</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('email') }} />
              <span>Email</span>
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
              of -- in 6 Channels
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
            {activeChannel === 'total' ? (
              <>
                <div style={{ width: '40%', backgroundColor: CHANNEL_COLORS.ctv }} />
                <div style={{ width: '30%', backgroundColor: CHANNEL_COLORS.audio }} />
                <div style={{ width: '20%', backgroundColor: CHANNEL_COLORS.preroll }} />
                <div style={{ width: '10%', backgroundColor: CHANNEL_COLORS.social }} />
              </>
            ) : (
              <>
                <div style={{ width: `${channelPercentages[activeChannel] || 0}%`, backgroundColor: CHANNEL_COLORS[activeChannel] }} />
                <div style={{ width: `${100 - (channelPercentages[activeChannel] || 0)}%`, backgroundColor: '#E5E5E5' }} />
              </>
            )}
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 4px',
            fontSize: '11px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('ctv') }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('preroll') }} />
              <span>Preroll</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('audio') }} />
              <span>Audio</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('social') }} />
              <span>Social</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('search') }} />
              <span>Search</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('email') }} />
              <span>Email</span>
            </div>
          </div>
          
          <Text size="sm" fw={500} mb="xs" mt="lg">Your Audience size is: {audienceSize}</Text>
          <Group gap="xs" mb="md">
            <div 
              onClick={() => setAudienceSize('Small')}
              style={{ 
                flex: 1, 
                padding: '2px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Small' ? '#B46565' : '#EBE6EC',
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
                padding: '2px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Good' ? '#AFB465' : '#EBE6EC',
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
                padding: '2px', 
                textAlign: 'center', 
                backgroundColor: audienceSize === 'Strong' ? '#65B48C' : '#EBE6EC',
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
              of -- in 6 Channels
            </Text>
          )}
          
          {/* Progress Bar - empty/gray for no data */}
          <div style={{ 
            display: 'flex',
            height: '8px', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            {activeChannel === 'total' ? (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E5E5' }} />
            ) : (
              <>
                <div style={{ width: `${channelPercentages[activeChannel] || 0}%`, backgroundColor: CHANNEL_COLORS[activeChannel], opacity: 0.3 }} />
                <div style={{ width: `${100 - (channelPercentages[activeChannel] || 0)}%`, backgroundColor: '#E5E5E5' }} />
              </>
            )}
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 4px',
            fontSize: '11px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('ctv') }} />
              <span>CTV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('preroll') }} />
              <span>Preroll</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('audio') }} />
              <span>Audio</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('social') }} />
              <span>Social</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('search') }} />
              <span>Search</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor('email') }} />
              <span>Email</span>
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
              position: 'relative',
              overflow: 'visible',
              minHeight: 'auto',
              height: 'auto',
              marginBottom: '100px'
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

