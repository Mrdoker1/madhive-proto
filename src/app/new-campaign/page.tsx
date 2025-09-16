import PageLayout from "@/components/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/NavigationAnchors";
import SectionWrapper from "@/components/SectionWrapper";
import { BreadcrumbStep } from "@/components/Breadcrumbs";

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

  return (
    <PageLayout breadcrumbs={breadcrumbSteps} title="Campaign Information">
      <div style={{ backgroundColor: '#FDFCFA', paddingTop: '32px', paddingBottom: '32px', paddingLeft: '32px', paddingRight: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Левая колонка с навигацией */}
          <div className="w-64" style={{ paddingRight: '20px' }}>
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
              <div>Контент секции General Details</div>
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
    </PageLayout>
  );
}