'use client';

import React from 'react';
import { Button, Group } from '@mantine/core';

export interface ChannelPill {
  id: string;
  label: string;
}

interface ChannelPillsProps {
  channels: ChannelPill[];
  activeChannel: string;
  onChange: (channelId: string) => void;
}

const ChannelPills: React.FC<ChannelPillsProps> = ({
  channels,
  activeChannel,
  onChange
}) => {
  return (
    <Group gap="8px">
      {channels.map((channel) => (
        <Button
          key={channel.id}
          onClick={() => onChange(channel.id)}
          variant="outline"
          styles={{
            root: {
              height: '28px',
              padding: '0 12px',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '18px',
              border: `1px solid ${activeChannel === channel.id ? '#2A1037' : '#E5E5E5'}`,
              backgroundColor: 'transparent',
              color: activeChannel === channel.id ? '#2A1037' : '#9C84A1',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#F5F5F5',
                borderColor: activeChannel === channel.id ? '#2A1037' : '#9C84A1'
              }
            }
          }}
        >
          {channel.label}
        </Button>
      ))}
    </Group>
  );
};

export default ChannelPills;

