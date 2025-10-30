'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Text } from '@mantine/core';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import SelectChannelsSection from "@/components/features/sections/SelectChannelsSection";
import AllocationSection from "@/components/features/sections/AllocationSection";
import RightSidebar from "@/components/layout/RightSidebar";
import { useAppSelector } from '@/hooks/useRedux';
import { validateSelectChannels, validateAllocation } from '@/utils/validation';

export default function OmnichannelChannelsPage() {
  const router = useRouter();
  
  const selectedChannelsFromRedux = useAppSelector((state) => state.campaign.channels.selectedChannels);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  
  // Filter selected channels (exclude linear_tv)
  const availableChannels = useMemo(() => {
    return selectedChannelsFromRedux.filter(channelId => channelId !== 'linear_tv');
  }, [selectedChannelsFromRedux]);

  // Check form validity
  const isFormValid = useMemo(() => {
    const errors = [
      ...validateSelectChannels(availableChannels),
      ...validateAllocation(budgetAllocation, availableChannels)
    ];
    return errors.length === 0;
  }, [availableChannels, budgetAllocation]);

  // Error message
  const errorMessage = useMemo(() => {
    if (isFormValid) return '';
    
    // Check each validation separately for more precise message
    const channelErrors = validateSelectChannels(availableChannels);
    if (channelErrors.length > 0) {
      return channelErrors[0].message;
    }
    
    const allocationErrors = validateAllocation(budgetAllocation, availableChannels);
    if (allocationErrors.length > 0) {
      return allocationErrors[0].message;
    }
    
    return 'Please fill in all required fields to continue';
  }, [isFormValid, availableChannels, budgetAllocation]);

  // Breadcrumbs for Channels page
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
      status: 'current'
    },
    { 
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'pending'
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'pending'
    }
  ];

  // Anchors for page navigation
  const anchorItems: AnchorItem[] = [
    { id: 'select-channels', label: 'Select Channels', anchor: '#select-channels' },
    { id: 'allocation', label: 'Allocation', anchor: '#allocation' }
  ];

  const handleNextClick = () => {
    if (!isFormValid) return;
    
    console.log('Moving to next step - Channel Details');
    router.push('/campaign/omnichannel/details');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - General');
    router.push('/campaign/omnichannel/new');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Channels"
        showRightSidebar={true}
        rightSidebarContent={<RightSidebar isOmnichannel={true} pageKey="omnichannel-channels" />}
        footerContent={
          <NextButton 
            active={isFormValid}
            onClick={handleNextClick}
            text="Next"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
            errorMessage={errorMessage}
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            <div className="w-64" style={{ paddingRight: '20px', position: 'sticky', top: '32px', height: 'fit-content' }}>
              <NavigationAnchors 
                items={anchorItems}
                orientation="vertical"
                activeColor="#2A1037"
                textColor="#666666"
                className="space-y-6"
              />
            </div>
            {/* Main content */}
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Select Channels Section */}
              <SectionWrapper 
                id="select-channels" 
                title="Select Channels"
                required
              >
                <SelectChannelsSection 
                  onSelectionChange={(channels) => {
                    console.log('Selected channels:', channels);
                  }}
                />
              </SectionWrapper>

              {/* Allocation Section */}
              <SectionWrapper 
                id="allocation" 
                title="Allocation"
                required
              >
                <AllocationSection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
