'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import LinearDetailsSection from "@/components/features/sections/LinearDetailsSection";
import AudiencesSection from "@/components/features/sections/AudiencesSection";
import MarketsSection from "@/components/features/sections/markets";
import BroadcastersAndProgramsSection from "@/components/features/sections/BroadcastersAndProgramsSection";
import DaypartsSection from "@/components/features/sections/DaypartsSection";
import { useAppSelector } from '@/hooks/useRedux';
import { validateMarkets, validateBroadcastersAndPrograms } from '@/utils/validation';

export default function ChannelDetailsPage() {
  const router = useRouter();
  
  // Получаем данные из Redux для валидации
  const selectedMarkets = useAppSelector((state) => state.campaign.markets.selectedMarkets);
  const broadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations);
  // Бредкрамбсы для страницы Channel Details - обновленные статусы
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
      status: 'completed' // выполнен
    },
    { 
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'current' // текущий шаг
    },
    { 
      id: 'generate-proposal', 
      label: 'Generate Proposal', 
      status: 'pending' // ожидает
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'pending' // ожидает
    }
  ];

  // Якоря для навигации по странице
  const anchorItems: AnchorItem[] = [
    { id: 'linear-details', label: 'Linear Details', anchor: '#linear-details' },
    { id: 'audiences', label: 'Audiences', anchor: '#audiences' },
    { id: 'markets', label: 'Market/Weight', anchor: '#markets' },
    { id: 'broadcasters', label: 'Broadcasters/Programs', anchor: '#broadcasters' },
    { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
  ];

  // Проверяем валидность формы
  const isFormValid = useMemo(() => {
    const errors = [
      ...validateMarkets(selectedMarkets),
      ...validateBroadcastersAndPrograms(broadcasters, broadcastersWithStations)
    ];
    return errors.length === 0;
  }, [selectedMarkets, broadcasters, broadcastersWithStations]);

  // Сообщение об ошибке
  const errorMessage = useMemo(() => {
    if (isFormValid) return '';
    
    // Проверяем каждую валидацию отдельно для более точного сообщения
    const marketErrors = validateMarkets(selectedMarkets);
    if (marketErrors.length > 0) {
      return marketErrors[0].message;
    }
    
    const broadcasterErrors = validateBroadcastersAndPrograms(broadcasters, broadcastersWithStations);
    if (broadcasterErrors.length > 0) {
      return broadcasterErrors[0].message;
    }
    
    return 'Please fill in all required fields to continue';
  }, [isFormValid, selectedMarkets, broadcasters, broadcastersWithStations]);

  const handleNextClick = () => {
    if (!isFormValid) return;
    
    console.log('Переход к следующему шагу - Generate Proposal');
    // Переходим на страницу proposal
    router.push('/campaign/linear/proposal');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - General');
    router.push('/campaign/linear/new');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Channel Details"
        showRightSidebar={true}
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
            <div style={{ paddingLeft: '20px', width: '100%', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Linear Details Section */}
              <SectionWrapper 
                id="linear-details" 
                title="Linear Details"
              >
                <LinearDetailsSection />
              </SectionWrapper>

              {/* Audiences Section */}
              <SectionWrapper 
                id="audiences" 
                title="Audiences"
              >
                <AudiencesSection />
              </SectionWrapper>

              {/* Markets Section */}
              <SectionWrapper 
                id="markets" 
                title="Market/Weight"
                required
              >
                <MarketsSection />
              </SectionWrapper>

              {/* Broadcasters and Programs Section */}
              <SectionWrapper 
                id="broadcasters" 
                title="Broadcasters/Programs"
                required
              >
                <BroadcastersAndProgramsSection />
              </SectionWrapper>

              {/* Dayparts Section */}
              <SectionWrapper 
                id="dayparts" 
                title="Dayparts"
              >
                <DaypartsSection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
