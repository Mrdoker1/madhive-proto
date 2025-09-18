'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from "@/components/layout/PageLayout";
import NavigationAnchors, { AnchorItem } from "@/components/ui/NavigationAnchors";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";

export default function ChannelDetailsPage() {
  const router = useRouter();
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
      id: 'channels', 
      label: 'Channels', 
      status: 'completed' // выполнен
    },
    { 
      id: 'channel-details', 
      label: 'Channel Details', 
      status: 'current' // текущий шаг
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
    { id: 'markets', label: 'Markets', anchor: '#markets' },
    { id: 'dayparts', label: 'Dayparts', anchor: '#dayparts' }
  ];

  const handleNextClick = () => {
    console.log('Переход к следующему шагу - Summary');
    // Переходим на страницу summary
    router.push('/summary');
  };

  const handleBackClick = () => {
    console.log('Возврат к предыдущему шагу - General');
    router.push('/new-campaign');
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Channel Details"
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
              
              {/* Linear Details Section */}
              <SectionWrapper 
                id="linear-details" 
                title="Linear Details"
              >
                <div style={{ 
                  padding: '24px', 
                  border: '1px dashed #ddd', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Linear Details section content will be here
                </div>
              </SectionWrapper>

              {/* Audiences Section */}
              <SectionWrapper 
                id="audiences" 
                title="Audiences"
              >
                <div style={{ 
                  padding: '24px', 
                  border: '1px dashed #ddd', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Audiences section content will be here
                </div>
              </SectionWrapper>

              {/* Markets Section */}
              <SectionWrapper 
                id="markets" 
                title="Markets"
              >
                <div style={{ 
                  padding: '24px', 
                  border: '1px dashed #ddd', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Markets section content will be here
                </div>
              </SectionWrapper>

              {/* Dayparts Section */}
              <SectionWrapper 
                id="dayparts" 
                title="Dayparts"
              >
                <div style={{ 
                  padding: '24px', 
                  border: '1px dashed #ddd', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Dayparts section content will be here
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
            text="Next"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
          />
        </div>
      </PageLayout>
    </>
  );
}
