'use client';

import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import SelectChannelsSection from "@/components/features/sections/SelectChannelsSection";

export default function OmnichannelChannelsPage() {
  const router = useRouter();

  // Бредкрамбсы для страницы Channels
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

  // Якоря для навигации по странице
  const anchorItems: AnchorItem[] = [
    { id: 'select-channels', label: 'Select Channels', anchor: '#select-channels' },
    { id: 'allocation', label: 'Allocation', anchor: '#allocation' }
  ];

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Channel Details');
    router.push('/campaign/omnichannel/details');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - General');
    router.push('/campaign/omnichannel/new');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Channels"
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
              
              {/* Select Channels Section */}
              <SectionWrapper 
                id="select-channels" 
                title="Select Channels"
              >
                <SelectChannelsSection 
                  onSelectionChange={(channels) => {
                    console.log('Selected channels:', channels);
                  }}
                  initialSelection={['linear_tv']}
                />
              </SectionWrapper>

              {/* Allocation Section */}
              <SectionWrapper 
                id="allocation" 
                title="Allocation"
              >
                <Text size="sm" c="dimmed">
                  Allocate budget and resources across selected channels.
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
