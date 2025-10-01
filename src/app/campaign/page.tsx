'use client';

import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useRouter } from 'next/navigation';
import CampaignList from '@/components/features/campaigns/CampaignList';
import { campaignsMock } from '@/data/campaignsData';

export default function CampaignListPage() {
  const router = useRouter();

  const handleNewCampaign = () => {
    router.push('/campaign/omnichannel/new');
  };

  return (
    <PageLayout 
      title="Campaign"
      headerShowRightButton
      headerRightButtonText="New Campaign"
      headerRightButtonActive
      onHeaderRightButtonClick={handleNewCampaign}
    >
      <div style={{ padding: '24px' }}>
        <CampaignList items={campaignsMock} />
      </div>
    </PageLayout>
  );
}


