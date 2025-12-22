'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import ChannelPills, { ChannelPill } from "@/components/ui/ChannelPills";
import InterestsSection from "@/components/features/sections/InterestsSection";
import GeoSection from "@/components/features/sections/GeoSection";
import DaypartsSection from "@/components/features/sections/DaypartsSection";
import KeyWordsSection from "@/components/features/sections/KeyWordsSection";
import OmnichannelRightSidebar from "@/components/layout/OmnichannelRightSidebar";
import InfoNotification from "@/components/ui/InfoNotification";
import { Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setCarryOverMode, initializeChannelData, updateChannelEstimations } from '@/store/slices/campaignSlice';
import { RootState } from '@/store/store';
import { AnimatePresence } from 'framer-motion';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

type ChannelType = 'preroll' | 'ctv' | 'audio' | 'social' | 'search' | 'email';

export default function OmnichannelDetailsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedChannelsFromRedux = useAppSelector((state) => state.campaign.channels.selectedChannels);
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  const showNavigationAnchors = useAppSelector((state: RootState) => state.uiSettings.showNavigationAnchors);
  
  // Filter selected channels (exclude linear_tv, it's not shown on this page) and sort by budget (descending)
  const availableChannels = useMemo(() => {
    const filtered = selectedChannelsFromRedux.filter(channelId => channelId !== 'linear_tv') as ChannelType[];
    
    // Sort by budget (from highest to lowest)
    return filtered.sort((a, b) => {
      const budgetA = budgetAllocation?.[a] || 0;
      const budgetB = budgetAllocation?.[b] || 0;
      return budgetB - budgetA; // Descending order
    });
  }, [selectedChannelsFromRedux, budgetAllocation]);
  
  // Set active channel - first from available
  const [activeChannel, setActiveChannel] = useState<ChannelType | null>(null);
  const firstChannelRef = useRef<ChannelType | null>(null);
  
  // Initialize data for each channel on first load
  useEffect(() => {
    if (availableChannels.length > 0) {
      dispatch(initializeChannelData(availableChannels));
      
      // Initialize base estimations for all channels
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
  
  // Track tab change to disable carry over mode
  const handleChannelChange = (channelId: ChannelType) => {
    // If user switched to another tab (not the first one),
    // and carry over mode is still active
    if (carryOverMode && channelId !== firstChannelRef.current) {
      // Mode remains active until first data change on another tab
      // Disabling will happen in sections on change
    }
    setActiveChannel(channelId);
  };

  // Breadcrumbs for Media Outlets page
  const breadcrumbSteps: BreadcrumbStep[] = [
    { 
      id: 'omnichannel-campaign', 
      label: 'New Campaign', 
      status: 'completed', 
      isSection: true 
    },
    { 
      id: 'general', 
      label: 'Create Campaign', 
      status: 'completed'
    },
    { 
      id: 'channels', 
      label: 'Channels', 
      status: 'completed'
    },
    { 
      id: 'channel-details', 
      label: 'Media Outlets', 
      status: 'current'
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'pending'
    }
  ];

  // Pills for channel switching (only user-selected channels)
  const allChannelPills: Record<ChannelType, ChannelPill> = {
    'ctv': { id: 'ctv', label: 'CTV' },
    'preroll': { id: 'preroll', label: 'Pre Roll' },
    'audio': { id: 'audio', label: 'Audio' },
    'social': { id: 'social', label: 'Social' },
    'search': { id: 'search', label: 'Search' },
    'email': { id: 'email', label: 'Email' }
  };
  
  // Create pills for selected channels in the same order as availableChannels (sorted by budget)
  const channelPills = useMemo(() => {
    return availableChannels.map(channelId => allChannelPills[channelId]);
  }, [availableChannels]);

  // Navigation anchors - different for each channel
  const getAnchorItems = (): AnchorItem[] => {
    if (activeChannel === 'search') {
      return [
        { id: 'keywords', label: 'Key Words', anchor: '#keywords' },
        { id: 'geo', label: 'Geo', anchor: '#geo' },
        { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
      ];
    }
    
    return [
      { id: 'interests', label: 'Interests', anchor: '#interests' },
      { id: 'geo', label: 'Geo', anchor: '#geo' },
      { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
    ];
  };

  const handleNextClick = () => {
    console.log('Moving to next step - Summary');
    router.push('/campaign/omnichannel/summary');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Channels');
    router.push('/campaign/omnichannel/channels');
  };


  // Render content based on channel
  const renderChannelContent = () => {
    // If no channels selected, show message
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

    // Common content for Pre Roll, CTV, Audio, Email
    const commonContent = (
      <>
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
              <KeyWordsSection channel="search" />
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
        title={`Media Outlets (${availableChannels.length})`}
        showRightSidebar={true}
        rightSidebarContent={<OmnichannelRightSidebar selectedChannels={availableChannels} readOnly={true} pageKey="omnichannel-details" />}
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
            {/* Left column with navigation */}
            {showNavigationAnchors && (
              <div className="w-64" style={{ paddingRight: '20px', position: 'sticky', top: '32px', height: 'fit-content' }}>
                <NavigationAnchors 
                  items={getAnchorItems()}
                  orientation="vertical"
                  activeColor="#2A1037"
                  textColor="#666666"
                  className="space-y-6"
                />
              </div>
            )}
            {/* Main content */}
            <div style={{ paddingLeft: showNavigationAnchors ? '20px' : '0', width: '100%', maxWidth: '800px' }}>
              {/* Carry over notification */}
              <AnimatePresence>
                {carryOverMode && (
                  <InfoNotification 
                    key="carry-over-notification"
                    message="Carried over input for Audiences, Interests, Geo and Dayparts"
                  />
                )}
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
