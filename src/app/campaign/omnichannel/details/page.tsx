'use client';

import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import { Text } from '@mantine/core';

export default function OmnichannelDetailsPage() {
  const router = useRouter();

  // Бредкрамбсы для страницы Channel Details
  const breadcrumbSteps: BreadcrumbStep[] = [
    { 
      id: 'omnichannel-campaign', 
      label: 'Omnichannel Campaign', 
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

  // Якоря для навигации по странице
  const anchorItems: AnchorItem[] = [
    { id: 'linear-details', label: 'Linear Details', anchor: '#linear-details' },
    { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
    { id: 'markets', label: 'Markets', anchor: '#markets' },
    { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
  ];

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Summary');
    router.push('/campaign/omnichannel/summary');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channels');
    router.push('/campaign/omnichannel/channels');
  };


  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Omnichannel Details"
        showRightSidebar={true}
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
                items={anchorItems}
                orientation="vertical"
                activeColor="#2A1037"
                textColor="#666666"
                className="space-y-6"
              />
            </div>
            {/* Основной контент */}
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Linear Details Section */}
              <SectionWrapper 
                id="linear-details" 
                title="Linear Details"
              >
                <Text size="sm" c="dimmed">
                  Configure linear TV advertising settings.
                </Text>
              </SectionWrapper>

              {/* Audiences Section */}
              <SectionWrapper 
                id="audiences" 
                title="Audiences"
              >
                <Text size="sm" c="dimmed">
                  Define target audiences for omnichannel campaign.
                </Text>
              </SectionWrapper>

              {/* Markets Section */}
              <SectionWrapper 
                id="markets" 
                title="Markets"
              >
                <Text size="sm" c="dimmed">
                  Select markets for omnichannel campaign.
                </Text>
              </SectionWrapper>

              {/* Dayparts Section */}
              <SectionWrapper 
                id="dayparts" 
                title="Dayparts"
              >
                <Text size="sm" c="dimmed">
                  Configure timing preferences for campaign.
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
