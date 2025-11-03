'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
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
  validateFlightRange,
  scrollToFirstError
} from '@/utils/validation';

export default function OmnichannelNewCampaignPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showErrors, setShowErrors] = useState(false);
  
  // Get data from global state
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const generalData = useAppSelector((state) => state.campaign.general);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const goalData = useAppSelector((state) => state.campaign.goal);
  const flightData = useAppSelector((state) => state.campaign.flight);
  
  // On page load, set campaign type as Omnichannel and reset selected channels
  useEffect(() => {
    dispatch(updateGeneralData({ campaignType: 'Omnichannel' }));
    dispatch(updateChannelsData({ selectedChannels: [] }));
  }, [dispatch]);
  
  // Breadcrumbs for Omnichannel Campaign page
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

  // Anchors for page navigation
  const anchorItems: AnchorItem[] = [
    { id: 'general-details', label: 'General', anchor: '#general-details' },
    { id: 'total-budget', label: 'Total Budget', anchor: '#total-budget' },
    { id: 'goal', label: 'Goal', anchor: '#goal' },
    { id: 'flight-range', label: 'Flight Range', anchor: '#flight-range' }
  ];

  // Get all validation errors
  const validationErrors = useMemo(() => {
    return [
      ...validateGeneralDetails(generalData),
      ...validateTotalBudget(budgetData),
      ...validateGoal(goalData),
      ...validateFlightRange(flightData)
    ];
  }, [generalData, budgetData, goalData, flightData]);

  // Check form validity
  const isFormValid = validationErrors.length === 0;

  // Error message - show only when user tried to submit
  const errorMessage = useMemo(() => {
    if (!showErrors || isFormValid) return '';
    return validationErrors[0]?.message || 'Please fill in all required fields to continue';
  }, [showErrors, isFormValid, validationErrors]);

  const handleNextClick = () => {
    // Check validation
    if (!isFormValid) {
      setShowErrors(true);
      scrollToFirstError(validationErrors);
      return;
    }
    
    console.log('Moving to next step - Channels');
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
            active={true}
            onClick={handleNextClick}
            text="Next"
            errorMessage={errorMessage}
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Left column with navigation */}
            <div className="w-64" style={{ paddingRight: '20px', position: 'sticky', top: '32px', height: 'fit-content' }}>
              <NavigationAnchors 
                items={anchorItems}
                orientation="vertical"
                activeColor="#2A1037"
                textColor="#666666"
                className="space-y-6"
              />
            </div>
            {/* Main content */}
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
