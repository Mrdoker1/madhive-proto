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
      label: 'Create Campaign', 
      status: 'completed' // completed
    },
    { 
      id: 'channel-details', 
      label: 'Media Outlets', 
      status: 'completed' // completed
    },
    { 
      id: 'generate-proposal', 
      label: 'Guidelines', 
      status: 'completed' // completed
    },
    { 
      id: 'summary', 
      label: 'Review', 
      status: 'current' // current step
    }
  ];

  const handleSubmitClick = () => {
    console.log('Campaign submitted to approver!');
    // Save campaign to Redux
    dispatch(saveCampaign());
    // Navigate to campaigns list page
    router.push('/campaign');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Guidelines');
    router.push('/campaign/linear/proposal');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Review"
        footerContent={
          <NextButton 
            active={true}
            onClick={handleSubmitClick}
            text="Submit to Approver"
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
              
              {/* Campaign Summary */}
              <CampaignSummarySection />
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
