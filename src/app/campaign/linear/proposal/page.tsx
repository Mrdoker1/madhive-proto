'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import RightSidebar from "@/components/layout/RightSidebar";
import ProposalSection from "@/components/features/sections/ProposalSection";
import { validateProgramSelection, validateProgramBudget } from '@/utils/validation';

export default function GenerateProposalPage() {
  const router = useRouter();
  
  // Состояние для данных валидации
  const [programSelections, setProgramSelections] = useState<any>({});
  const [stationPrograms, setStationPrograms] = useState<any>({});
  const [stationBudgets, setStationBudgets] = useState<Record<string, number>>({});
  
  // Бредкрамбсы для страницы Generate Proposal
  const breadcrumbSteps: BreadcrumbStep[] = [
    { 
      id: 'new-campaign', 
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
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'completed'
    },
    { 
      id: 'generate-proposal', 
      label: 'Generate Proposal', 
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
    { id: 'proposal', label: 'Proposal', anchor: '#proposal' }
  ];

  // Callback для получения данных валидации из ProposalSection
  const handleValidationChange = useCallback((
    isValid: boolean, 
    selections: any, 
    programs: any, 
    budgets: Record<string, number>
  ) => {
    setProgramSelections(selections);
    setStationPrograms(programs);
    setStationBudgets(budgets);
  }, []);

  // Проверяем валидность формы
  const isFormValid = useMemo(() => {
    const selectionErrors = validateProgramSelection(programSelections);
    const budgetErrors = validateProgramBudget(programSelections, stationPrograms, stationBudgets);
    return selectionErrors.length === 0 && budgetErrors.length === 0;
  }, [programSelections, stationPrograms, stationBudgets]);

  // Сообщение об ошибке
  const errorMessage = useMemo(() => {
    if (isFormValid) return '';
    
    // Проверяем каждую валидацию отдельно для более точного сообщения
    const selectionErrors = validateProgramSelection(programSelections);
    if (selectionErrors.length > 0) {
      return selectionErrors[0].message;
    }
    
    const budgetErrors = validateProgramBudget(programSelections, stationPrograms, stationBudgets);
    if (budgetErrors.length > 0) {
      return budgetErrors[0].message;
    }
    
    return 'Please fill in all required fields to continue';
  }, [isFormValid, programSelections, stationPrograms, stationBudgets]);

  const handleNextClick = () => {
    if (!isFormValid) return;
    
    console.log('Переход к следующему шагу - Summary');
    router.push('/campaign/linear/summary');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channel Details');
    router.push('/campaign/linear/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Generate Proposal"
        showRightSidebar={true}
        rightSidebarContent={<RightSidebar pageKey="linear-proposal" />}
        footerContent={
          <NextButton 
            active={isFormValid}
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
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '1200px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Proposal Section */}
              <SectionWrapper 
                id="proposal" 
                title="Proposal"
                required
              >
                <ProposalSection onValidationChange={handleValidationChange} />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

