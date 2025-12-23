'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import MarketsSection from "@/components/features/sections/markets";
import MarketStationsSection from "@/components/features/sections/MarketStationsSection";
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store/store';
import { validateMarkets, validateBroadcastersAndPrograms, scrollToFirstError } from '@/utils/validation';

export default function ChannelDetailsPage() {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  
  // Get data from Redux for validation
  const selectedMarkets = useAppSelector((state) => state.campaign.markets.selectedMarkets);
  const broadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations);
  const showNavigationAnchors = useAppSelector((state: RootState) => state.uiSettings.showNavigationAnchors);
  // Breadcrumbs for Media Outlets page - updated statuses
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
      status: 'current' // current step
    },
    { 
      id: 'generate-proposal', 
      label: 'Guidelines', 
      status: 'pending' // pending
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'pending' // pending
    }
  ];

  // Anchors for page navigation
  const anchorItems: AnchorItem[] = [
    { id: 'markets', label: 'Market/Weight', anchor: '#markets' },
    { id: 'broadcasters', label: 'Market Stations', anchor: '#broadcasters' }
  ];

  // Get all validation errors
  const validationErrors = useMemo(() => {
    return [
      ...validateMarkets(selectedMarkets),
      ...validateBroadcastersAndPrograms(broadcasters, broadcastersWithStations)
    ];
  }, [selectedMarkets, broadcasters, broadcastersWithStations]);

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
    
    console.log('Moving to next step - Guidelines');
    router.push('/campaign/linear/proposal');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - General');
    router.push('/campaign/linear/new');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Media Outlets"
        showRightSidebar={true}
        rightSidebarPageKey="linear-details"
        footerContent={
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Next"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
            errorMessage={errorMessage}
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Left column with navigation */}
            {showNavigationAnchors && (
              <div className="w-64" style={{ paddingRight: '20px', position: 'sticky', top: '32px', height: 'fit-content' }}>
                <NavigationAnchors 
                  items={anchorItems}
                  orientation="vertical"
                  activeColor="#2A1037"
                  textColor="#666666"
                  className="space-y-6"
                />
              </div>
            )}
            {/* Main content */}
            <div style={{ paddingLeft: showNavigationAnchors ? '20px' : '0', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Markets Section */}
              <SectionWrapper 
                id="markets" 
                title="Market/Weight"
                required
              >
                <MarketsSection />
              </SectionWrapper>

              {/* Market Stations Section */}
              <SectionWrapper 
                id="broadcasters" 
                title="Market Stations"
                required
              >
                <MarketStationsSection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
