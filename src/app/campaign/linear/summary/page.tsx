'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PageLayout from "@/components/layout/PageLayout";
import { BreadcrumbStep } from "@/components/ui/Breadcrumbs";
import NextButton from "@/components/ui/NextButton";
import CampaignDetailView from "@/components/features/campaigns/CampaignDetailView";
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { saveCampaign } from '@/store/slices/campaignSlice';
import { mapCampaignStateToDetailData } from '@/utils/campaignDataMapper';

export default function SummaryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const campaignState = useAppSelector((state) => state.campaign);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Map Redux state to CampaignDetailData format
  const campaignData = mapCampaignStateToDetailData(campaignState);

  // Breadcrumbs for Summary page - all previous steps completed
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
      status: 'completed' // completed
    },
    { 
      id: 'generate-proposal', 
      label: 'Guidelines', 
      status: 'completed' // completed
    },
    { 
      id: 'summary', 
      label: 'Review', 
      status: 'current' // current step
    }
  ];

  const handleSubmitClick = () => {
    console.log('Campaign submitted to approver!');
    // Save campaign to Redux
    dispatch(saveCampaign());
    // Navigate to linear dashboard with anchor to campaigns list
    router.push('/linear-dashboard#campaigns-list');
  };

  const handleBackClick = () => {
    console.log('Returning to previous step - Guidelines');
    router.push('/campaign/linear/proposal');
  };

  const handlePrintClick = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 landscape dimensions in mm
      const pdfWidth = 297;
      const pdfHeight = 210;
      
      // Calculate image dimensions maintaining aspect ratio
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      
      let imgWidth, imgHeight, xOffset, yOffset;
      
      if (canvasAspectRatio > pdfAspectRatio) {
        // Image is wider - fit to width
        imgWidth = pdfWidth;
        imgHeight = pdfWidth / canvasAspectRatio;
        xOffset = 0;
        yOffset = (pdfHeight - imgHeight) / 2; // Center vertically
      } else {
        // Image is taller - fit to height
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspectRatio;
        xOffset = (pdfWidth - imgWidth) / 2; // Center horizontally
        yOffset = 0;
      }
      
      // Create PDF in landscape mode
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Add image to PDF, centered with proper aspect ratio
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      
      // Open print dialog
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Ошибка при создании PDF. Попробуйте еще раз.');
    }
  };

  return (
    <>
      <PageLayout 
        breadcrumbs={breadcrumbSteps} 
        title="Review"
        footerContent={
          <NextButton 
            active={true}
            onClick={handleSubmitClick}
            text="Submit to Approver"
            showBack={true}
            onBackClick={handleBackClick}
            backText="Back"
            showPrint={true}
            onPrintClick={handlePrintClick}
          />
        }
      >
        <div style={{ backgroundColor: 'var(--page-background)', padding: '32px', minHeight: '100%' }}>
          <div 
            ref={printRef}
            className="print-content"
            style={{ 
              backgroundColor: 'white', 
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            <CampaignDetailView 
              data={campaignData} 
              showApprovalBadges={false} 
              showSparkline={false}
            />
          </div>
        </div>
      </PageLayout>
    </>
  );
}
