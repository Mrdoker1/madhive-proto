'use client';

import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import OmnichannelCampaignSummarySection from "@/components/features/sections/OmnichannelCampaignSummarySection";
import { useAppDispatch } from '@/hooks/useRedux';
import { saveCampaign } from '@/store/slices/campaignSlice';

export default function OmnichannelSummaryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
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
      status: 'completed'
    },
    { 
      id: 'summary', 
      label: 'Review', 
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
    console.log('Returning to previous step - Media Outlets');
    router.push('/campaign/omnichannel/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Review"
        showRightSidebar={false}
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
