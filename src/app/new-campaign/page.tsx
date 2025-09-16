import PageLayout from "@/components/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/NavigationAnchors";
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
        <div className="flex">
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
          <div className="flex-1" style={{ paddingLeft: '20px' }}>
            <div className="max-w-4xl space-y-12">
            
            {/* General Details Section */}
            <section id="general-details" className="scroll-mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  General Details
                </h2>
              </div>
            </section>

            {/* Total Budget Section */}
            <section id="total-budget" className="scroll-mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Total Budget *
                </h2>
              </div>
            </section>

            {/* Goal Section */}
            <section id="goal" className="scroll-mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Goal *
                </h2>
              </div>
            </section>

            {/* Flight Range Section */}
            <section id="flight-range" className="scroll-mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Flight Range *
                </h2>
              </div>
            </section>
            
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}