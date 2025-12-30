'use client';

import React, { useRef } from 'react';
import { Modal, Text, Group, Button, Divider } from '@mantine/core';
import { IconDownload, IconPrinter, IconCheck } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CampaignSummary } from '@/data/campaignsData';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import { ApprovalStatusBadge } from './ApprovalStatusBadge';
import CampaignDetailView, { type CampaignDetailData } from './CampaignDetailView';

// Mock extended data for campaigns (since CampaignSummary doesn't have all fields)
// In real app, this would come from API/store
interface ExtendedCampaignData {
  advertiser: string;
  brand: string;
  cpeCode: string;
  contact: string;
  approver: string;
  spotLengthMix: { fifteen: number; thirty: number; sixty: number };
  language: string;
  fluidity: number;
  dayparts: string;
  genres: string;
  exclusions: number;
  markets: { name: string; budget: number; stations: string[] }[];
  audience: string;
}

// Generate mock extended data based on campaign ID
const getExtendedData = (campaignId: string): ExtendedCampaignData => {
  // Use campaign ID to generate somewhat consistent mock data
  const seed = campaignId.charCodeAt(0) + (campaignId.charCodeAt(campaignId.length - 1) || 0);
  
  const advertisers = ['Ford Motor Company', 'Toyota USA', 'Chevrolet', 'Hyundai Motors', 'Honda America', 'Nissan USA'];
  const brands = ['F-150', 'Camry', 'Silverado', 'Sonata', 'Accord', 'Altima'];
  const contacts = ['John Smith', 'Sarah Johnson', 'Mike Williams', 'Emily Brown', 'David Lee'];
  const approvers = ['Director Marketing', 'VP Sales', 'CMO', 'Brand Manager'];
  
  const markets = [
    { name: 'New York', budget: 45000, stations: ['WABC', 'WNBC', 'WCBS'] },
    { name: 'Los Angeles', budget: 38000, stations: ['KABC', 'KNBC'] },
    { name: 'Chicago', budget: 22000, stations: ['WLS', 'WMAQ'] },
    { name: 'Philadelphia', budget: 15000, stations: ['WPVI', 'KYW'] },
  ];

  return {
    advertiser: advertisers[seed % advertisers.length],
    brand: brands[seed % brands.length],
    cpeCode: `CPE-${2024}${String(seed).padStart(4, '0')}`,
    contact: contacts[seed % contacts.length],
    approver: approvers[seed % approvers.length],
    spotLengthMix: { 
      fifteen: 20 + (seed % 20), 
      thirty: 50 + (seed % 20), 
      sixty: 30 - (seed % 20) 
    },
    language: seed % 3 === 0 ? 'Spanish' : 'English',
    fluidity: seed % 6,
    dayparts: 'Prime Time 35%, Early Fringe 25%, Daytime 20%',
    genres: seed % 2 === 0 ? 'News, Sports, Drama' : 'All genres',
    exclusions: seed % 5,
    markets: markets.slice(0, 2 + (seed % 3)),
    audience: seed % 2 === 0 ? 'A 25-54' : 'A 18-49'
  };
};

interface CampaignDetailModalProps {
  campaign: CampaignSummary | null;
  opened: boolean;
  onClose: () => void;
  onApproveCampaign?: (campaignId: string) => void;
}


const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({ campaign, opened, onClose, onApproveCampaign }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!campaign) return null;

  // Get extended mock data for this campaign
  const extData = getExtendedData(campaign.id);
  
  // Check if campaign can be approved (Not Started status)
  const canApprove = campaign.status === 'Not Started' && campaign.approvalStatus === 'Pending';

  // Calculate flight dates (mock based on campaign name)
  const getFlightDates = () => {
    // Extract dates from campaign name if possible
    const match = campaign.name.match(/(\d{2})\.(\d{2})\s*-\s*(\d{2})\.(\d{2})/);
    if (match) {
      return `${match[1]}/${match[2]} - ${match[3]}/${match[4]}`;
    }
    return '01/15/25 - 02/28/25';
  };

  // Calculate budget info
  const totalBudget = campaign.remainingBudget + campaign.deliveredSpend;
  const avgCPM = campaign.deliveredImpressions > 0 
    ? (campaign.deliveredSpend / campaign.deliveredImpressions) * 1000 
    : 17.2;

  // Prepare data for CampaignDetailView
  const detailData: CampaignDetailData = {
    name: campaign.name,
    approvalStatus: campaign.approvalStatus,
    status: campaign.status,
    advertiser: extData.advertiser,
    brand: extData.brand,
    cpeCode: extData.cpeCode,
    contact: extData.contact,
    approver: extData.approver,
    goal: 'Maximum Impressions',
    totalBudget,
    estImpressions: campaign.progressGoal,
    avgCPM,
    progressPercent: campaign.progressPercent,
    pacingPercent: campaign.pacingPercent,
    channels: campaign.channels,
    markets: extData.markets,
    flight: getFlightDates(),
    audience: extData.audience,
    spotLengthMix: extData.spotLengthMix,
    language: extData.language,
    dayparts: extData.dayparts,
    genres: extData.genres,
    fluidity: extData.fluidity,
    exclusions: extData.exclusions,
    progressGoal: campaign.progressGoal,
    deliveredImpressions: campaign.deliveredImpressions,
    deliveredSpend: campaign.deliveredSpend,
    remainingImpression: campaign.remainingImpression,
    remainingBudget: campaign.remainingBudget,
    sparkline: campaign.sparkline,
  };

  const handlePrintClick = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2,
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
        yOffset = (pdfHeight - imgHeight) / 2;
      } else {
        // Image is taller - fit to height
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspectRatio;
        xOffset = (pdfWidth - imgWidth) / 2;
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
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="90%"
      title={
        <Group gap="md">
          <Text size="lg" fw={600}>{campaign.name}</Text>
          <ApprovalStatusBadge status={campaign.approvalStatus} />
          <CampaignStatusBadge status={campaign.status} />
        </Group>
      }
      styles={{
        header: { borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' },
        body: { padding: '24px' }
      }}
    >
      <div ref={printRef} style={{ padding: '40px' }}>
        <CampaignDetailView 
          data={detailData} 
          showApprovalBadges={true}
          showSparkline={true}
        />
      </div>

      {/* Bottom Section - Actions */}
      <Divider mb="md" />
      <Group justify="space-between">
        <Button 
          variant="light" 
          leftSection={<IconDownload size={18} />}
          onClick={() => {
            // Simulate download
            alert(`Downloading reports for campaign: ${campaign.name}`);
          }}
        >
          Download Reports
        </Button>
        
        <Group gap="sm">
          <Button 
            variant="light" 
            leftSection={<IconPrinter size={18} />}
            onClick={handlePrintClick}
          >
            Print
          </Button>
          
          {canApprove && (
            <Button 
              color="green"
              leftSection={<IconCheck size={18} />}
              onClick={() => {
                onApproveCampaign?.(campaign.id);
                onClose();
              }}
            >
              Approve Campaign
            </Button>
          )}
        </Group>
      </Group>
    </Modal>
  );
};

export default CampaignDetailModal;

