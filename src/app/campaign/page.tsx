'use client';

import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useRouter } from 'next/navigation';
import CampaignList from '@/components/features/campaigns/CampaignList';
import { campaignsMock } from '@/data/campaignsData';
import { Select, Pagination } from '@mantine/core';
import { useState, useMemo } from 'react';

export default function CampaignListPage() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  const handleNewCampaign = () => {
    router.push('/campaign/omnichannel/new');
  };

  const totalItems = campaignsMock.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const startIdx = (pageSafe - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);

  const currentItems = useMemo(() => campaignsMock.slice(startIdx, endIdx), [startIdx, endIdx]);

  const footer = (
    <div className="flex items-center justify-between" style={{ padding: '12px 24px', background: 'var(--header-background)', borderTop: '1px solid var(--border-color)' }}>
      <div className="flex items-center" style={{ gap: '8px' }}>
        <Select
          data={[{ value: '10', label: '10' }, { value: '20', label: '20' }, { value: '50', label: '50' }, { value: '100', label: '100' }]}
          value={String(pageSize)}
          onChange={(v) => {
            const next = Number(v ?? 20);
            setPageSize(next);
            setPage(1);
          }}
          style={{ width: '72px' }}
        />
        <span style={{ fontSize: '12px', color: '#6b7280' }}>Per Page</span>
      </div>

      <div className="flex items-center" style={{ gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{startIdx + 1} - {endIdx} of {totalItems}</span>
        <Pagination 
          total={totalPages} 
          value={pageSafe} 
          onChange={setPage} 
          siblings={1} 
          boundaries={1} 
          size="sm"
          color="#291036"
          radius="md"
          variant="filled"
          styles={{
            control: {
              borderColor: 'var(--border-color)',
              color: '#291036',
            },
          }}
        />
      </div>
    </div>
  );

  return (
    <PageLayout 
      title="Campaign"
      headerShowRightButton
      headerRightButtonText="New Campaign"
      headerRightButtonActive
      onHeaderRightButtonClick={handleNewCampaign}
      footerContent={footer}
    >
      <div style={{ padding: '24px' }}>
        <CampaignList items={currentItems} />
      </div>
    </PageLayout>
  );
}


