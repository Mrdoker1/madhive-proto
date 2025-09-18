'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";

export default function SummaryPage() {
  const router = useRouter();

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
    // Здесь можно добавить логику создания кампании или перехода на dashboard
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - Channel Details');
    router.push('/channel-details');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Summary"
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
                <div style={{ 
                  padding: '24px', 
                  border: '1px dashed #ddd', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Campaign summary content will be here
                </div>
              </SectionWrapper>
              
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: '0', zIndex: 1000, left: '104px', right: '40px' }}>
          <NextButton 
            active={true}
            onClick={handleNextClick}
            text="Create Campaign"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        </div>
      </PageLayout>
    </>
  );
}
