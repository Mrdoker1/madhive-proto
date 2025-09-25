'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import GeneralDetailsSection from "@/components/features/sections/GeneralDetailsSection";
import TotalBudgetSection from "@/components/features/sections/TotalBudgetSection";
import GoalSection from "@/components/features/sections/GoalSection";
import FlightRangeSection from "@/components/features/sections/FlightRangeSection";
import NextButton from "@/components/ui/NextButton";

export default function OmnichannelNewCampaignPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Получаем данные из глобального стейта
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  
  // Бредкрамбсы для страницы Omnichannel Campaign
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
      status: 'current'
    },
    { 
      id: 'channels', 
      label: 'Channels', 
      status: 'pending'
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
    { id: 'general-details', label: 'General', anchor: '#general-details' },
    { id: 'total-budget', label: 'Total Budget', anchor: '#total-budget' },
    { id: 'goal', label: 'Goal', anchor: '#goal' },
    { id: 'flight-range', label: 'Flight Range', anchor: '#flight-range' }
  ];

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Channels');
    // Переходим на страницу channels
    router.push('/campaign/omnichannel/channels');
  };

  const handleTotalBudgetChange = (budget: number) => {
    dispatch(updateBudgetData({ totalBudget: budget }));
    console.log('Total budget changed:', budget);
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Omnichannel Campaign Information"
        footerContent={
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Next"
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
              <TotalBudgetSection onChange={handleTotalBudgetChange} />
            </SectionWrapper>

            {/* Goal Section */}
            <SectionWrapper 
              id="goal" 
              title="Goal *"
            >
              <GoalSection />
            </SectionWrapper>

            {/* Flight Range Section */}
            <SectionWrapper 
              id="flight-range" 
              title="Flight Range *"
            >
              <FlightRangeSection totalBudget={totalBudget} />
            </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
