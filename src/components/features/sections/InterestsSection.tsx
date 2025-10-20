'use client';

import { useState, useEffect } from 'react';
import { Checkbox, Text, Button, Grid, Badge, CloseButton } from '@mantine/core';
import { interestCategories, type InterestCategory } from '@/data/interestsData';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelSectionData, setCarryOverMode, updateChannelEstimations } from '@/store/slices/campaignSlice';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

interface InterestsSectionProps {
  channel: string;
  isFirstChannel?: boolean;
}

const InterestsSection = ({ channel, isFirstChannel = false }: InterestsSectionProps) => {
  const dispatch = useAppDispatch();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Получаем данные из Redux для конкретного канала
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation); // ✅ channels, не budget!
  const selectedChannels = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // Убедимся что selectedInterests всегда массив
  const rawInterests = channelData[channel]?.interests;
  const selectedInterests = Array.isArray(rawInterests) ? rawInterests : [];

  const handleInterestToggle = (interest: string, checked: boolean) => {
    const newInterests = checked
      ? [...selectedInterests, interest]
      : selectedInterests.filter(i => i !== interest);

    // Если это не первый канал и carry over активен, отключаем его
    if (!isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }

    // Обновляем данные для текущего канала
    dispatch(updateChannelSectionData({
      channel,
      section: 'interests',
      data: newInterests
    }));

    // Пересчитываем estimations для канала
    const audienceData = channelData[channel]?.audience || {
      gender: [], age: [], income: [], education: [], householdSize: []
    };
    const geoData = channelData[channel]?.geo || { selectedZipCodes: [] };
    const channelBudget = budgetAllocation?.[channel] || 0;

    const newAudienceEstimation = calculateAudienceEstimation(audienceData, newInterests, channelBudget, channel);
    const marketEstimation = calculateMarketEstimation(geoData.selectedZipCodes, channelBudget, channel);

    dispatch(updateChannelEstimations({
      channel,
      audienceEstimation: newAudienceEstimation,
      marketEstimation
    }));

    // Если carry over активен и это первый канал, распространяем изменения на все каналы
    if (carryOverMode && isFirstChannel) {
      selectedChannels.forEach((ch) => {
        if (ch !== channel) {
          dispatch(updateChannelSectionData({
            channel: ch,
            section: 'interests',
            data: newInterests
          }));

          // Пересчитываем estimations для других каналов
          const otherChannelAudience = channelData[ch]?.audience || {
            gender: [], age: [], income: [], education: [], householdSize: []
          };
          const otherChannelGeo = channelData[ch]?.geo || { selectedZipCodes: [] };
          const otherChannelBudget = budgetAllocation?.[ch] || 0;

          const otherAudienceEstimation = calculateAudienceEstimation(otherChannelAudience, newInterests, otherChannelBudget, ch);
          const otherMarketEstimation = calculateMarketEstimation(otherChannelGeo.selectedZipCodes, otherChannelBudget, ch);

          dispatch(updateChannelEstimations({
            channel: ch,
            audienceEstimation: otherAudienceEstimation,
            marketEstimation: otherMarketEstimation
          }));
        }
      });
    }
  };

  const handleRemoveInterest = (interest: string) => {
    handleInterestToggle(interest, false);
  };

  const toggleCategoryExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVisibleInterests = (category: InterestCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    if (isExpanded || !category.maxVisible) {
      return category.interests;
    }
    return category.interests.slice(0, category.maxVisible);
  };

  const hasMoreInterests = (category: InterestCategory) => {
    return category.maxVisible && category.interests.length > category.maxVisible;
  };

  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      {/* Левая часть - категории с чекбоксами */}
      <div style={{ flex: 1 }}>
        <Grid gutter="xl">
          {interestCategories.map((category) => (
            <Grid.Col key={category.id} span={6}>
              <div>
                <Text size="sm" fw={600} mb="md" style={{ color: '#000000' }}>
                  {category.title}
                </Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getVisibleInterests(category).map((interest) => (
                    <Checkbox
                      key={interest}
                      label={interest}
                      size="sm"
                      checked={selectedInterests.includes(interest)}
                      onChange={(event) => handleInterestToggle(interest, event.currentTarget.checked)}
                    />
                  ))}
                  {hasMoreInterests(category) && (
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={() => toggleCategoryExpand(category.id)}
                      styles={{
                        root: {
                          backgroundColor: '#F3F2EB',
                          color: '#000000',
                          fontSize: '14px',
                          fontWeight: 400,
                          height: '32px',
                          padding: '0 16px',
                          marginTop: '4px'
                        }
                      }}
                    >
                      {expandedCategories.has(category.id) ? 'Less' : 'More'}
                    </Button>
                  )}
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </div>

      {/* Правая часть - выбранные интересы */}
      <div 
        style={{ 
          width: '320px',
          backgroundColor: '#F3F2EB',
          borderRadius: '8px',
          padding: '24px',
          alignSelf: 'flex-start'
        }}
      >
        <Text size="sm" c="dimmed" mb="lg">
          Select 3 or more interests
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {selectedInterests.map((interest) => (
            <Badge
              key={interest}
              size="lg"
              radius="xl"
              styles={{
                root: {
                  backgroundColor: '#2A1037',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 400,
                  height: '24px',
                  paddingLeft: '16px',
                  paddingRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }
              }}
              rightSection={
                <CloseButton
                  variant="transparent"
                  size="xs"
                  onClick={() => handleRemoveInterest(interest)}
                  styles={{
                    root: {
                      color: '#FFFFFF'
                    }
                  }}
                />
              }
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestsSection;

