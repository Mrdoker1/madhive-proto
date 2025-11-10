'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import CampaignSummarySection from "@/components/features/sections/CampaignSummarySection";
import { useAppDispatch } from '@/hooks/useRedux';
import { saveCampaign } from '@/store/slices/campaignSlice';

export default function SummaryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Breadcrumbs for Summary page - all previous steps completed
  const breadcrumbSteps: BreadcrumbStep[] = [
    { 
      id: 'new-campaign', 
      label: 'New Campaign', 
      status: 'completed', 
      isSection: true 
    },
    { 
      id: 'general', 
      label: 'General', 
      status: 'completed' // completed
    },
    { 
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'completed' // completed
    },
    { 
      id: 'generate-proposal', 
      label: 'Select Programs', 
      status: 'completed' // completed
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'current' // current step
    }
  ];

  const handleNextClick = () => {
    console.log('Campaign creation completed!');
    // Save campaign to Redux
    dispatch(saveCampaign());
    // Navigate to campaigns list page
    router.push('/campaign');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Select Programs');
    router.push('/campaign/linear/proposal');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Summary"
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
                <CampaignSummarySection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
