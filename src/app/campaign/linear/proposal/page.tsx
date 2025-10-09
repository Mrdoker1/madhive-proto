'use client';

import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import ProposalSection from "@/components/features/sections/ProposalSection";

export default function GenerateProposalPage() {
  const router = useRouter();
  
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

  const handleNextClick = () => {
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
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Proposal Section */}
              <SectionWrapper 
                id="proposal" 
                title="Proposal"
              >
                <ProposalSection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

