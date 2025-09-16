'use client';

import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import GeneralDetailsSection from "@/components/features/sections/GeneralDetailsSection";
import NextButton from "@/components/ui/NextButton";

export default function NewCampaignPage() {
  // Бредкрамбсы для страницы New Campaign
  const breadcrumbSteps: BreadcrumbStep[] = [
    { id: 'new-campaign', label: 'New Campaign', status: 'completed', isSection: true },
    { id: 'general', label: 'General', status: 'current' },
    { id: 'channels', label: 'Channels', status: 'pending' },
    { id: 'channel-details', label: 'Channel Details', status: 'pending' },
    { id: 'summary', label: 'Summary', status: 'pending' }
  ];

  // Якоря для навигации по странице
  const anchorItems: AnchorItem[] = [
    { id: 'general-details', label: 'General', anchor: '#general-details' },
    { id: 'total-budget', label: 'Total Budget', anchor: '#total-budget' },
    { id: 'goal', label: 'Goal', anchor: '#goal' },
    { id: 'flight-range', label: 'Flight Range', anchor: '#flight-range' }
  ];

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Channels');
    // Здесь можно добавить логику перехода на следующий шаг
  };

  return (
    <>
      <PageLayout breadcrumbs={breadcrumbSteps} title="Campaign Information">
      <div style={{ backgroundColor: '#FDFCFA', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
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
          <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '960px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* General Details Section */}
            <SectionWrapper 
              id="general-details" 
              title="General Details"
            >
              <GeneralDetailsSection />
            </SectionWrapper>

            {/* Total Budget Section */}
            <SectionWrapper 
              id="total-budget" 
              title="Total Budget *"
            >
              <div>Контент секции Total Budget</div>
            </SectionWrapper>

            {/* Goal Section */}
            <SectionWrapper 
              id="goal" 
              title="Goal *"
            >
              <div>Контент секции Goal</div>
            </SectionWrapper>

            {/* Flight Range Section */}
            <SectionWrapper 
              id="flight-range" 
              title="Flight Range *"
            >
              <div>Контент секции Flight Range</div>
            </SectionWrapper>
            
            </div>
          </div>
        </div>
      </div>
      <div>
        <NextButton 
          active={true}
          onClick={handleNextClick}
          text="Next"
        />
      </div>
      </PageLayout>
    </>
  );
}