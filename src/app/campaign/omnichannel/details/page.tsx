'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import ChannelPills, { ChannelPill } from "@/components/ui/ChannelPills";
import AudiencesSection from "@/components/features/sections/AudiencesSection";
import InterestsSection from "@/components/features/sections/InterestsSection";
import GeoSection from "@/components/features/sections/GeoSection";
import DaypartsSection from "@/components/features/sections/DaypartsSection";
import OmnichannelRightSidebar from "@/components/layout/OmnichannelRightSidebar";
import { Text } from '@mantine/core';
import { useAppSelector } from '@/hooks/useRedux';

type ChannelType = 'preroll' | 'ctv' | 'audio' | 'social' | 'search' | 'email';

// Маппинг между ID каналов в SelectChannelsSection и ChannelType
const CHANNEL_ID_MAP: Record<string, ChannelType> = {
  'display': 'preroll', // Display = Pre Roll
  'ctv': 'ctv',
  'audio': 'audio',
  'social': 'social',
  'search': 'search',
  'email': 'email'
};

export default function OmnichannelDetailsPage() {
  const router = useRouter();
  const selectedChannelsFromRedux = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // Фильтруем выбранные каналы (исключаем linear_tv, он не показывается на этой странице)
  const availableChannels = useMemo(() => {
    return selectedChannelsFromRedux
      .filter(channelId => channelId !== 'linear_tv' && CHANNEL_ID_MAP[channelId])
      .map(channelId => CHANNEL_ID_MAP[channelId]);
  }, [selectedChannelsFromRedux]);
  
  // Устанавливаем активный канал - первый из доступных
  const [activeChannel, setActiveChannel] = useState<ChannelType | null>(null);
  
  useEffect(() => {
    if (availableChannels.length > 0 && !activeChannel) {
      setActiveChannel(availableChannels[0]);
    }
  }, [availableChannels, activeChannel]);

  // Бредкрамбсы для страницы Channel Details
  const breadcrumbSteps: BreadcrumbStep[] = [
    { 
      id: 'omnichannel-campaign', 
      label: 'New Campaign', 
      status: 'completed', 
      isSection: true 
    },
    { 
      id: 'general', 
      label: 'General', 
      status: 'completed'
    },
    { 
      id: 'channels', 
      label: 'Channels', 
      status: 'completed'
    },
    { 
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'current'
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'pending'
    }
  ];

  // Pills для переключения каналов (только выбранные пользователем)
  const allChannelPills: ChannelPill[] = [
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Pre Roll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];
  
  // Фильтруем pills только для выбранных каналов
  const channelPills = useMemo(() => {
    return allChannelPills.filter(pill => availableChannels.includes(pill.id as ChannelType));
  }, [availableChannels]);

  // Якоря для навигации - одинаковые для всех каналов
  const getAnchorItems = (): AnchorItem[] => {
    return [
      { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
      { id: 'interests', label: 'Interests', anchor: '#interests' },
      { id: 'geo', label: 'Geo', anchor: '#geo' },
      { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
    ];
  };

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Summary');
    router.push('/campaign/omnichannel/summary');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channels');
    router.push('/campaign/omnichannel/channels');
  };


  // Рендер контента в зависимости от канала
  const renderChannelContent = () => {
    // Если нет выбранных каналов, показываем сообщение
    if (availableChannels.length === 0) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '48px 24px',
          backgroundColor: '#F3F2EB',
          borderRadius: '8px'
        }}>
          <Text size="lg" fw={500} mb="md">Каналы не выбраны</Text>
          <Text size="sm" c="dimmed" mb="lg">
            Пожалуйста, вернитесь на предыдущую страницу и выберите хотя бы один канал.
          </Text>
        </div>
      );
    }

    // Общий контент для Pre Roll, CTV, Audio, Email
    const commonContent = (
      <>
        <SectionWrapper id="audiences" title="Audiences">
          <AudiencesSection />
        </SectionWrapper>

        <SectionWrapper id="interests" title="Interests">
          <InterestsSection />
        </SectionWrapper>

        <SectionWrapper id="geo" title="Geo">
          <GeoSection />
        </SectionWrapper>

        <SectionWrapper id="dayparts" title="Dayparts">
          <DaypartsSection />
        </SectionWrapper>
      </>
    );

    switch (activeChannel) {
      case 'preroll':
      case 'ctv':
      case 'audio':
      case 'email':
        return commonContent;
      
      case 'social':
        return (
          <>
            <SectionWrapper id="audiences" title="Audiences">
              <Text size="sm" c="dimmed">Social channel audiences configuration</Text>
            </SectionWrapper>
            <SectionWrapper id="interests" title="Interests">
              <Text size="sm" c="dimmed">Social channel interests</Text>
            </SectionWrapper>
            <SectionWrapper id="geo" title="Geo">
              <Text size="sm" c="dimmed">Social channel geo targeting</Text>
            </SectionWrapper>
            <SectionWrapper id="dayparts" title="Dayparts">
              <Text size="sm" c="dimmed">Social channel dayparts</Text>
            </SectionWrapper>
          </>
        );
      
      case 'search':
        return (
          <>
            <SectionWrapper id="audiences" title="Audiences">
              <Text size="sm" c="dimmed">Search channel audiences configuration</Text>
            </SectionWrapper>
            <SectionWrapper id="interests" title="Interests">
              <Text size="sm" c="dimmed">Search channel keywords</Text>
            </SectionWrapper>
            <SectionWrapper id="geo" title="Geo">
              <Text size="sm" c="dimmed">Search channel geo targeting</Text>
            </SectionWrapper>
            <SectionWrapper id="dayparts" title="Dayparts">
              <Text size="sm" c="dimmed">Search channel dayparts</Text>
            </SectionWrapper>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title={`Channel Details (${availableChannels.length})`}
        showRightSidebar={true}
        rightSidebarContent={<OmnichannelRightSidebar selectedChannels={availableChannels} />}
        headerActions={
          channelPills.length > 0 ? (
            <ChannelPills
              channels={channelPills}
              activeChannel={activeChannel || channelPills[0]?.id as ChannelType}
              onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
            />
          ) : null
        }
        footerContent={
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Next"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Левая колонка с навигацией */}
            <div className="w-64" style={{ paddingRight: '20px', position: 'sticky', top: '32px', height: 'fit-content' }}>
              <NavigationAnchors 
                items={getAnchorItems()}
                orientation="vertical"
                activeColor="#2A1037"
                textColor="#666666"
                className="space-y-6"
              />
            </div>
            {/* Основной контент */}
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {renderChannelContent()}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
