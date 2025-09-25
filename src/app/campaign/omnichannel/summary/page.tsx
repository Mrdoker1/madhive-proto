'use client';

import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import { Text } from '@mantine/core';

export default function OmnichannelSummaryPage() {
  const router = useRouter();
  
  // Бредкрамбсы для страницы Summary
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

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channel Details');
    router.push('/campaign/omnichannel/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Summary"
        showRightSidebar={true}
        footerContent={
          <NextButton 
            active={true}
            text="Create Omnichannel Campaign"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Основной контент */}
            <div style={{ width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Campaign Overview Section */}
              <SectionWrapper 
                id="campaign-overview" 
                title="Campaign Overview"
              >
                <Text size="sm" c="dimmed">
                  General campaign information and settings overview.
                </Text>
              </SectionWrapper>

              {/* Channel Summary Section */}
              <SectionWrapper 
                id="channel-summary" 
                title="Channel Summary"
              >
                <Text size="sm" c="dimmed">
                  Summary of selected advertising channels and their configurations.
                </Text>
              </SectionWrapper>

              {/* Budget Summary Section */}
              <SectionWrapper 
                id="budget-summary" 
                title="Budget Summary"
              >
                <Text size="sm" c="dimmed">
                  Budget allocation and spending summary across channels.
                </Text>
              </SectionWrapper>

              {/* Audience Summary Section */}
              <SectionWrapper 
                id="audience-summary" 
                title="Audience Summary"
              >
                <Text size="sm" c="dimmed">
                  Target audience settings and reach estimations.
                </Text>
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
