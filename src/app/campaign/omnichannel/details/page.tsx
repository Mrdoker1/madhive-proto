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

type ChannelType = 'linear' | 'ctv' | 'preroll' | 'audio';

export default function OmnichannelDetailsPage() {
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<ChannelType>('linear');

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

  // Pills для переключения каналов
  const channelPills: ChannelPill[] = [
    { id: 'linear', label: 'Linear' },
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' }
  ];

  // Якоря для навигации по странице - меняются в зависимости от канала
  const getAnchorItems = (): AnchorItem[] => {
    switch (activeChannel) {
      case 'linear':
        return [
          { id: 'linear-details', label: 'Linear Details', anchor: '#linear-details' },
          { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
          { id: 'markets', label: 'Markets', anchor: '#markets' },
          { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
        ];
      case 'ctv':
        return [
          { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
          { id: 'interests', label: 'Interests', anchor: '#interests' },
          { id: 'geo', label: 'Geo', anchor: '#geo' },
          { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
        ];
      case 'preroll':
        return [
          { id: 'preroll-details', label: 'Preroll Details', anchor: '#preroll-details' },
          { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
          { id: 'targeting', label: 'Targeting', anchor: '#targeting' }
        ];
      case 'audio':
        return [
          { id: 'audio-details', label: 'Audio Details', anchor: '#audio-details' },
          { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
          { id: 'platforms', label: 'Platforms', anchor: '#platforms' }
        ];
      default:
        return [];
    }
  };

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Summary');
    router.push('/campaign/omnichannel/summary');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channels');
    router.push('/campaign/omnichannel/channels');
  };


  // Рендер контента в зависимости от выбранного канала
  const renderChannelContent = () => {
    switch (activeChannel) {
      case 'linear':
        return (
          <>
            <SectionWrapper id="linear-details" title="Linear Details">
              <Text size="sm" c="dimmed">
                Configure linear TV advertising settings.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="audiences" title="Audiences">
              <Text size="sm" c="dimmed">
                Define target audiences for linear campaign.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="markets" title="Markets">
              <Text size="sm" c="dimmed">
                Select markets for linear campaign.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="dayparts" title="Dayparts">
              <Text size="sm" c="dimmed">
                Configure timing preferences for linear campaign.
              </Text>
            </SectionWrapper>
          </>
        );

      case 'ctv':
        return (
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

      case 'preroll':
        return (
          <>
            <SectionWrapper id="preroll-details" title="Preroll Details">
              <Text size="sm" c="dimmed">
                Configure preroll video advertising settings.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="audiences" title="Audiences">
              <Text size="sm" c="dimmed">
                Define target audiences for preroll campaign.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="targeting" title="Targeting">
              <Text size="sm" c="dimmed">
                Configure targeting options for preroll campaign.
              </Text>
            </SectionWrapper>
          </>
        );

      case 'audio':
        return (
          <>
            <SectionWrapper id="audio-details" title="Audio Details">
              <Text size="sm" c="dimmed">
                Configure audio advertising settings.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="audiences" title="Audiences">
              <Text size="sm" c="dimmed">
                Define target audiences for audio campaign.
              </Text>
            </SectionWrapper>

            <SectionWrapper id="platforms" title="Platforms">
              <Text size="sm" c="dimmed">
                Select audio platforms for campaign.
              </Text>
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
