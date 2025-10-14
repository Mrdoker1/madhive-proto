'use client';

import React, { useState, useEffect } from 'react';
import { Button, Grid, Text, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelsData } from '@/store/slices/campaignSlice';

interface Channel {
  id: string;
  name: string;
  icon: string;
}

const channels: Channel[] = [
  { id: 'display', name: 'Pre Roll', icon: '/assets/icons/channels/display.svg' },
  { id: 'ctv', name: 'CTV', icon: '/assets/icons/channels/ctv.svg' },
  { id: 'audio', name: 'Audio', icon: '/assets/icons/channels/audio.svg' },
  { id: 'social', name: 'Social', icon: '/assets/icons/channels/social.svg' },
  { id: 'search', name: 'Search', icon: '/assets/icons/channels/search.svg' },
  { id: 'email', name: 'Email', icon: '/assets/icons/channels/email.svg' }
];

interface SelectChannelsSectionProps {
  onSelectionChange?: (selectedChannels: string[]) => void;
  initialSelection?: string[];
}

export const SelectChannelsSection: React.FC<SelectChannelsSectionProps> = ({ 
  onSelectionChange
}) => {
  const dispatch = useAppDispatch();
  const channelsData = useAppSelector((state) => state.campaign.channels);
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(
    new Set(channelsData.selectedChannels)
  );

  // Синхронизируем локальное состояние с Redux при изменении store
  useEffect(() => {
    setSelectedChannels(new Set(channelsData.selectedChannels));
  }, [channelsData.selectedChannels]);

  const handleChannelToggle = (channelId: string) => {
    const newSelection = new Set(selectedChannels);
    if (newSelection.has(channelId)) {
      newSelection.delete(channelId);
    } else {
      newSelection.add(channelId);
    }
    const newChannelsList = Array.from(newSelection);
    setSelectedChannels(newSelection);
    
    // Обновляем Redux store
    dispatch(updateChannelsData({ selectedChannels: newChannelsList }));
    onSelectionChange?.(newChannelsList);
  };

  const handleSelectAll = () => {
    const allChannelIds = channels.map(channel => channel.id);
    const allChannelsSet = new Set(allChannelIds);
    setSelectedChannels(allChannelsSet);
    
    // Обновляем Redux store
    dispatch(updateChannelsData({ selectedChannels: allChannelIds }));
    onSelectionChange?.(allChannelIds);
  };

  const handleReset = () => {
    setSelectedChannels(new Set());
    
    // Обновляем Redux store
    dispatch(updateChannelsData({ selectedChannels: [] }));
    onSelectionChange?.([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Сетка каналов */}
      <Grid gutter="md">
        {channels.map((channel) => {
          const isSelected = selectedChannels.has(channel.id);
          
          return (
            <Grid.Col key={channel.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <div
                style={{
                  backgroundColor: isSelected ? '#645C70' : '#F3F2EB',
                  cursor: 'pointer',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'all 0.2s ease',
                  boxShadow: 'none'
                }}
                onClick={() => handleChannelToggle(channel.id)}
              >
                {/* Иконка канала */}
                <div>
                  <Image
                    src={channel.icon}
                    alt={`${channel.name} icon`}
                    width={48}
                    height={48}
                    style={{
                      filter: isSelected ? 'invert(0)' : 'invert(1)'
                    }}
                  />
                </div>

                {/* Название канала */}
                <Text
                  size="md"
                  fw={500}
                  ta="center"
                  style={{
                    color: isSelected ? '#ffffff' : '#1a1a1a'
                  }}
                >
                  {channel.name}
                </Text>

                {/* Чекмарк */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconCheck size={14} color="white" stroke={3} />
                  </div>
                )}
              </div>
            </Grid.Col>
          );
        })}
      </Grid>

      {/* Кнопки управления */}
      <Group justify="flex-end" mt="lg" gap="4px">
        <Button variant="outline" onClick={handleSelectAll}>
          Select All
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>
    </div>
  );
};

export default SelectChannelsSection;
