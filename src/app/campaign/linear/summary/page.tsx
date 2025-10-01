'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import CampaignSummarySection from "@/components/features/sections/CampaignSummarySection";
import { useAppDispatch } from '@/hooks/useRedux';
import { saveCampaign, resetCampaign } from '@/store/slices/campaignSlice';

export default function SummaryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Бредкрамбсы для страницы Summary - все предыдущие шаги выполнены
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
      status: 'completed' // выполнен
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      status: 'current' // текущий шаг
    }
  ];

  const handleNextClick = () => {
    console.log('Создание кампании завершено!');
    // Сохраняем кампанию в Redux
    dispatch(saveCampaign());
    // Сбрасываем форму для новой кампании
    dispatch(resetCampaign());
    // Переходим на страницу со списком кампаний
    router.push('/campaign');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channel Details');
    router.push('/campaign/linear/details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Summary"
        footerContent={
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Create Campaign"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', paddingTop: '32px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
            {/* Основной контент без левой навигации */}
            <div style={{ width: '100%', maxWidth: '960px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Campaign Review Section */}
              <SectionWrapper 
                id="campaign-review" 
                title="Almost done. Please carefully review campaign information."
              >
                <CampaignSummarySection />
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
