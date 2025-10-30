'use client';

import React, { useState, useEffect } from 'react';
import { Button, Grid, Text, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelsData, initializeChannelData, updateChannelEstimations, removeChannelData } from '@/store/slices/campaignSlice';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

interface Channel {
  id: string;
  name: string;
  icon: string;
}

const channels: Channel[] = [
  { id: 'preroll', name: 'Pre Roll', icon: '/assets/icons/channels/preroll.svg' },
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
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation); // ✅ channels, not budget!
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 0;
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(
    new Set(channelsData.selectedChannels)
  );

  // MIGRATION: on load check for old 'display' key and rename to 'preroll'
  useEffect(() => {
    let needsUpdate = false;
    const updates: any = {};
    
    // Migrate budgetAllocation: display → preroll
    if (budgetAllocation && budgetAllocation['display'] !== undefined) {
      const migratedAllocation = { ...budgetAllocation };
      migratedAllocation['preroll'] = migratedAllocation['display'];
      delete migratedAllocation['display'];
      updates.budgetAllocation = migratedAllocation;
      needsUpdate = true;
    }
    
    // Migrate selectedChannels: display → preroll
    if (channelsData.selectedChannels.includes('display')) {
      const migratedChannels = channelsData.selectedChannels.map(ch => 
        ch === 'display' ? 'preroll' : ch
      );
      updates.selectedChannels = migratedChannels;
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      dispatch(updateChannelsData(updates));
    }
  }, []); // Executes only once on mount

  // Synchronize local state with Redux when store changes
  useEffect(() => {
    setSelectedChannels(new Set(channelsData.selectedChannels));
  }, [channelsData.selectedChannels]);

  // Recalculate estimations when budgetAllocation changes
  useEffect(() => {
    // Don't calculate estimations if totalBudget = 0
    if (budgetAllocation && channelsData.selectedChannels.length > 0 && totalBudget > 0) {
      channelsData.selectedChannels.forEach(ch => {
        const channelBudget = budgetAllocation[ch] || 0;
        // Use base values (empty filters)
        const baseAudienceData = { gender: [], age: [], income: [], education: [], householdSize: [] };
        const interests: string[] = [];
        const geoData = { selectedZipCodes: [] };
        
        const audienceEstimation = calculateAudienceEstimation(baseAudienceData, interests, channelBudget, ch, geoData.selectedZipCodes);
        const marketEstimation = calculateMarketEstimation(geoData.selectedZipCodes, channelBudget, ch);
        
        dispatch(updateChannelEstimations({
          channel: ch,
          audienceEstimation,
          marketEstimation
        }));
      });
    }
  }, [budgetAllocation, channelsData.selectedChannels, totalBudget, dispatch]); // ✅ Added totalBudget to dependencies

  // Function to initialize and recalculate estimations for channels
  const updateChannelEstimationsForChannels = (channels: string[]) => {
    // Initialize data for new channels
    dispatch(initializeChannelData(channels));
    
    // Don't calculate estimations if totalBudget = 0
    if (totalBudget === 0) {
      return;
    }
    
    // Recalculate estimations for all channels right after initialization
    // Use setTimeout to give Redux time to update store
    setTimeout(() => {
      channels.forEach(ch => {
        const channelBudget = budgetAllocation?.[ch] || 0;
        const baseAudienceData = { gender: [], age: [], income: [], education: [], householdSize: [] };
        const interests: string[] = [];
        const geoData = { selectedZipCodes: [] };
        
        const audienceEstimation = calculateAudienceEstimation(baseAudienceData, interests, channelBudget, ch, geoData.selectedZipCodes);
        const marketEstimation = calculateMarketEstimation(geoData.selectedZipCodes, channelBudget, ch);
        
        dispatch(updateChannelEstimations({
          channel: ch,
          audienceEstimation,
          marketEstimation
        }));
      });
    }, 0);
  };

  const handleChannelToggle = (channelId: string) => {
    const newSelection = new Set(selectedChannels);
    const isRemoving = newSelection.has(channelId);
    
    if (isRemoving) {
      newSelection.delete(channelId);
      // Remove data for disabled channel
      dispatch(removeChannelData(channelId));
    } else {
      newSelection.add(channelId);
    }
    const newChannelsList = Array.from(newSelection);
    setSelectedChannels(newSelection);
    
    // Update Redux store
    dispatch(updateChannelsData({ selectedChannels: newChannelsList }));
    
    // Recalculate estimations only for active channels
    if (!isRemoving) {
      updateChannelEstimationsForChannels(newChannelsList);
    }
    
    onSelectionChange?.(newChannelsList);
  };

  const handleSelectAll = () => {
    const allChannelIds = channels.map(channel => channel.id);
    const allChannelsSet = new Set(allChannelIds);
    setSelectedChannels(allChannelsSet);
    
    // Update Redux store
    dispatch(updateChannelsData({ selectedChannels: allChannelIds }));
    
    // Recalculate estimations
    updateChannelEstimationsForChannels(allChannelIds);
    
    onSelectionChange?.(allChannelIds);
  };

  const handleReset = () => {
    // Remove data for all disabled channels
    selectedChannels.forEach(channelId => {
      dispatch(removeChannelData(channelId));
    });
    
    setSelectedChannels(new Set());
    
    // Update Redux store
    dispatch(updateChannelsData({ selectedChannels: [] }));
    
    onSelectionChange?.([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Channel grid */}
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
                {/* Channel icon */}
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

                {/* Channel name */}
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

                {/* Checkmark */}
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

      {/* Control buttons */}
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
