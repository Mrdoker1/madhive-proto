'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
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
import KeyWordsSection from "@/components/features/sections/KeyWordsSection";
import OmnichannelRightSidebar from "@/components/layout/OmnichannelRightSidebar";
import CarryOverNotification from "@/components/ui/CarryOverNotification";
import { Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setCarryOverMode, initializeChannelData, updateChannelEstimations } from '@/store/slices/campaignSlice';
import { AnimatePresence } from 'framer-motion';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

type ChannelType = 'preroll' | 'ctv' | 'audio' | 'social' | 'search' | 'email';

export default function OmnichannelDetailsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedChannelsFromRedux = useAppSelector((state) => state.campaign.channels.selectedChannels);
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
  // Фильтруем выбранные каналы (исключаем linear_tv, он не показывается на этой странице)
  const availableChannels = useMemo(() => {
    return selectedChannelsFromRedux.filter(channelId => channelId !== 'linear_tv') as ChannelType[];
  }, [selectedChannelsFromRedux]);
  
  // Устанавливаем активный канал - первый из доступных
  const [activeChannel, setActiveChannel] = useState<ChannelType | null>(null);
  const firstChannelRef = useRef<ChannelType | null>(null);
  
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  
  // Инициализация данных для каждого канала при первой загрузке
  useEffect(() => {
    if (availableChannels.length > 0) {
      dispatch(initializeChannelData(availableChannels));
      
      // Инициализируем базовые estimations для всех каналов
      availableChannels.forEach(ch => {
        const channelBudget = budgetAllocation?.[ch] || 0;
        const baseAudienceData = { gender: [], age: [], income: [], education: [], householdSize: [] };
        const audienceEstimation = calculateAudienceEstimation(baseAudienceData, [], channelBudget, ch, []);
        const marketEstimation = calculateMarketEstimation([], channelBudget, ch);
        
        dispatch(updateChannelEstimations({
          channel: ch,
          audienceEstimation,
          marketEstimation
        }));
      });
      
      if (!activeChannel) {
        setActiveChannel(availableChannels[0]);
        firstChannelRef.current = availableChannels[0];
      }
    }
  }, [availableChannels, activeChannel, budgetAllocation, dispatch]);
  
  // Отслеживание смены вкладки для отключения carry over режима
  const handleChannelChange = (channelId: ChannelType) => {
    // Если пользователь переключился на другую вкладку (не первую),
    // и carry over режим еще активен
    if (carryOverMode && channelId !== firstChannelRef.current) {
      // Режим остается активным до первого изменения данных на другой вкладке
      // Отключение произойдет в секциях при изменении
    }
    setActiveChannel(channelId);
  };

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
  }, [availableChannels, allChannelPills]);

  // Якоря для навигации - разные для каждого канала
  const getAnchorItems = (): AnchorItem[] => {
    if (activeChannel === 'search') {
      return [
        { id: 'keywords', label: 'Key Words', anchor: '#keywords' },
        { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
        { id: 'geo', label: 'Geo', anchor: '#geo' },
        { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
      ];
    }
    
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
          backgroundColor: 'white',
          borderRadius: '8px'
        }}>
          <Text size="sm" c="dimmed" mb="lg">
          No Channels Selected. Please go back to the previous page and select at least one channel.
          </Text>
        </div>
      );
    }

    // Общий контент для Pre Roll, CTV, Audio, Email
    const commonContent = (
      <>
        <SectionWrapper id="audiences" title="Audiences">
          <AudiencesSection 
            channel={activeChannel || 'preroll'} 
            isFirstChannel={activeChannel === firstChannelRef.current}
          />
        </SectionWrapper>

        <SectionWrapper id="interests" title="Interests">
          <InterestsSection 
            channel={activeChannel || 'preroll'}
            isFirstChannel={activeChannel === firstChannelRef.current}
          />
        </SectionWrapper>

        <SectionWrapper id="geo" title="Geo">
          <GeoSection 
            channel={activeChannel || 'preroll'}
            isFirstChannel={activeChannel === firstChannelRef.current}
          />
        </SectionWrapper>

        <SectionWrapper id="dayparts" title="Dayparts">
          <DaypartsSection 
            channel={activeChannel || 'preroll'}
            isFirstChannel={activeChannel === firstChannelRef.current}
          />
        </SectionWrapper>
      </>
    );

    switch (activeChannel) {
      case 'preroll':
      case 'ctv':
      case 'audio':
      case 'email':
      case 'social':
        return commonContent;
      
      case 'search':
        return (
          <>
            <SectionWrapper id="keywords" title="Key Words">
              <KeyWordsSection />
            </SectionWrapper>
            <SectionWrapper id="audiences" title="Audiences">
              <AudiencesSection 
                channel={activeChannel} 
                isFirstChannel={activeChannel === firstChannelRef.current}
              />
            </SectionWrapper>
            <SectionWrapper id="geo" title="Geo">
              <GeoSection 
                channel={activeChannel}
                isFirstChannel={activeChannel === firstChannelRef.current}
              />
            </SectionWrapper>
            <SectionWrapper id="dayparts" title="Dayparts">
              <DaypartsSection 
                channel={activeChannel}
                isFirstChannel={activeChannel === firstChannelRef.current}
              />
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
        rightSidebarContent={<OmnichannelRightSidebar selectedChannels={availableChannels} readOnly={true} />}
        headerActions={
          channelPills.length > 0 ? (
            <ChannelPills
              channels={channelPills}
              activeChannel={activeChannel || channelPills[0]?.id as ChannelType}
              onChange={(channelId) => handleChannelChange(channelId as ChannelType)}
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
              {/* Нотификация carry over */}
              <AnimatePresence>
                {carryOverMode && <CarryOverNotification key="carry-over-notification" />}
              </AnimatePresence>
              
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
