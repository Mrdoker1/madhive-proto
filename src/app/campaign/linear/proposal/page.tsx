'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import RightSidebar from "@/components/layout/RightSidebar";
import ProposalSection from "@/components/features/sections/ProposalSection";
import SpotLengthSection from "@/components/features/sections/SpotLengthSection";
import DaypartsSection from "@/components/features/sections/DaypartsSection";
import ContentGenreSection from "@/components/features/sections/ContentGenreSection";
import LanguageSection from "@/components/features/sections/LanguageSection";
import FluiditySection from "@/components/features/sections/FluiditySection";
import ProgramExclusionSection from "@/components/features/sections/ProgramExclusionSection";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import { validateSpotLengthMix, scrollToFirstError } from '@/utils/validation';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store/store';

export default function GenerateProposalPage() {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  
  // Get spot length mix from Redux for validation
  const spotLengthMix = useAppSelector((state) => state.campaign.general.spotLengthMix);
  const showNavigationAnchors = useAppSelector((state: RootState) => state.uiSettings.showNavigationAnchors);

  // Anchors for page navigation
  const anchorItems: AnchorItem[] = [
    { id: 'spot-length', label: 'Spot Length', anchor: '#spot-length' },
    { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' },
    { id: 'content-genre', label: 'Content Genre', anchor: '#content-genre' },
    { id: 'language', label: 'Language', anchor: '#language' },
    { id: 'fluidity', label: 'Fluidity', anchor: '#fluidity' },
    { id: 'program-exclusion', label: 'Program Exclusion', anchor: '#program-exclusion' }
  ];
  
  // State for validation data (kept for future use when Program Selector is enabled)
  // const [programSelections, setProgramSelections] = useState<any>({});
  // const [stationPrograms, setStationPrograms] = useState<any>({});
  // const [stationBudgets, setStationBudgets] = useState<Record<string, number>>({});
  
  // Breadcrumbs for Guidelines page
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
      status: 'completed'
    },
    { 
      id: 'channel-details', 
      label: 'Media Outlets', 
      status: 'completed'
    },
    { 
      id: 'generate-proposal', 
      label: 'Guidelines', 
      status: 'current'
    },
    { 
      id: 'summary', 
      label: 'Review', 
      status: 'pending'
    }
  ];

  // Callback to get validation data from ProposalSection (kept for future use)
  // const handleValidationChange = useCallback((
  //   isValid: boolean, 
  //   selections: any, 
  //   programs: any, 
  //   budgets: Record<string, number>
  // ) => {
  //   setProgramSelections(selections);
  //   setStationPrograms(programs);
  //   setStationBudgets(budgets);
  // }, []);

  // Get all validation errors
  const validationErrors = useMemo(() => {
    return [
      ...validateSpotLengthMix(spotLengthMix)
      // Program validation disabled while Program Selector is hidden
      // ...validateProgramSelection(programSelections),
      // ...validateProgramBudget(programSelections, stationPrograms, stationBudgets)
    ];
  }, [spotLengthMix]);

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
    
    console.log('Moving to next step - Summary');
    router.push('/campaign/linear/summary');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Media Outlets');
    router.push('/campaign/linear/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Guidelines"
        showRightSidebar={true}
        rightSidebarContent={<RightSidebar pageKey="linear-proposal" />}
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
              {/* Spot Length Section */}
              <SectionWrapper 
                id="spot-length" 
                title="Spot Length"
                required
              >
                <SpotLengthSection />
              </SectionWrapper>

              {/* Dayparts Section */}
              <SectionWrapper 
                id="dayparts" 
                title="Dayparts"
              >
                <DaypartsSection />
              </SectionWrapper>

              {/* Content Genre Section */}
              <SectionWrapper 
                id="content-genre" 
                title="Content Genre"
              >
                <ContentGenreSection />
              </SectionWrapper>

              {/* Language Section */}
              <SectionWrapper 
                id="language" 
                title="Language"
              >
                <LanguageSection />
              </SectionWrapper>

              {/* Fluidity Section */}
              <SectionWrapper 
                id="fluidity" 
                title="Fluidity"
              >
                <FluiditySection />
              </SectionWrapper>

              {/* Program Exclusion Section */}
              <SectionWrapper 
                id="program-exclusion" 
                title="Exclude Specific Programs"
              >
                <ProgramExclusionSection />
              </SectionWrapper>

              {/* Program Selector is hidden - uncomment to enable */}
              {/* <ProposalSection onValidationChange={handleValidationChange} /> */}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

