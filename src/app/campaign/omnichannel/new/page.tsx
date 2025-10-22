'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData, updateGeneralData, updateChannelsData } from '@/store/slices/campaignSlice';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import GeneralDetailsSection from "@/components/features/sections/GeneralDetailsSection";
import TotalBudgetSection from "@/components/features/sections/TotalBudgetSection";
import GoalSection from "@/components/features/sections/GoalSection";
import FlightRangeSection from "@/components/features/sections/FlightRangeSection";
import NextButton from "@/components/ui/NextButton";
import { 
  validateGeneralDetails, 
  validateTotalBudget, 
  validateGoal, 
  validateFlightRange
} from '@/utils/validation';

export default function OmnichannelNewCampaignPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Получаем данные из глобального стейта
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const generalData = useAppSelector((state) => state.campaign.general);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const goalData = useAppSelector((state) => state.campaign.goal);
  const flightData = useAppSelector((state) => state.campaign.flight);
  
  // При загрузке страницы устанавливаем тип кампании как Omnichannel и сбрасываем выбранные каналы
  useEffect(() => {
    dispatch(updateGeneralData({ campaignType: 'Omnichannel' }));
    dispatch(updateChannelsData({ selectedChannels: [] }));
  }, [dispatch]);
  
  // Бредкрамбсы для страницы Omnichannel Campaign
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

  // Проверяем валидность формы
  const isFormValid = useMemo(() => {
    const errors = [
      ...validateGeneralDetails(generalData),
      ...validateTotalBudget(budgetData),
      ...validateGoal(goalData),
      ...validateFlightRange(flightData)
    ];
    return errors.length === 0;
  }, [generalData, budgetData, goalData, flightData]);

  // Сообщение об ошибке
  const errorMessage = useMemo(() => {
    if (isFormValid) return '';
    return 'Please fill in all required fields to continue';
  }, [isFormValid]);

  const handleNextClick = () => {
    if (!isFormValid) return;
    
    console.log('Переход к следующему шагу - Channels');
    router.push('/campaign/omnichannel/channels');
  };

  const handleTotalBudgetChange = (budget: number) => {
    dispatch(updateBudgetData({ totalBudget: budget }));
  };

  return (
    <>
      <PageLayout
        breadcrumbs={breadcrumbSteps} 
        title="Campaign Information"
        footerContent={
          <NextButton 
            active={isFormValid}
            onClick={handleNextClick}
            text="Next"
            errorMessage={errorMessage}
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
              title="Total Budget"
              required
            >
              <TotalBudgetSection onChange={handleTotalBudgetChange} />
            </SectionWrapper>

            {/* Goal Section */}
            <SectionWrapper 
              id="goal" 
              title="Goal"
              required
            >
              <GoalSection />
            </SectionWrapper>

            {/* Flight Range Section */}
            <SectionWrapper 
              id="flight-range" 
              title="Flight Range"
              required
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
