'use client';

import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import OmnichannelCampaignSummarySection from "@/components/features/sections/OmnichannelCampaignSummarySection";
import OmnichannelRightSidebar from "@/components/layout/OmnichannelRightSidebar";
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { saveCampaign } from '@/store/slices/campaignSlice';
import { useMemo } from 'react';

export default function OmnichannelSummaryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const selectedChannelsFromRedux = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // Filter selected channels (exclude linear_tv)
  const availableChannels = useMemo(() => {
    return selectedChannelsFromRedux.filter(channelId => channelId !== 'linear_tv');
  }, [selectedChannelsFromRedux]);
  
  // Breadcrumbs for Summary page
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
      status: 'completed'
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'current'
    }
  ];

  const handleNextClick = () => {
    console.log('Omnichannel campaign creation completed!');
    // Save campaign to Redux
    dispatch(saveCampaign());
    // Navigate to campaigns list page
    router.push('/campaign');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Channel Details');
    router.push('/campaign/omnichannel/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Summary"
        showRightSidebar={true}
        rightSidebarContent={<OmnichannelRightSidebar selectedChannels={availableChannels} readOnly={true} pageKey="omnichannel-summary" />}
        footerContent={
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Create Campaign"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Main content without left navigation */}
            <div style={{ width: '100%', maxWidth: '960px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Campaign Review Section */}
              <SectionWrapper 
                id="campaign-review" 
                title="Almost done. Please carefully review campaign information."
              >
                <OmnichannelCampaignSummarySection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
