'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

type ChannelType = 'preroll' | 'ctv' | 'audio' | 'social' | 'search' | 'email';

export default function OmnichannelDetailsPage() {
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<ChannelType>('ctv');

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

  // Pills для переключения каналов (все из Select Channels кроме Linear TV)
  const channelPills: ChannelPill[] = [
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Pre Roll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];

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
        title="Channel Details (4)"
        showRightSidebar={true}
        rightSidebarContent={<OmnichannelRightSidebar />}
        headerActions={
          <ChannelPills
            channels={channelPills}
            activeChannel={activeChannel}
            onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
          />
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
