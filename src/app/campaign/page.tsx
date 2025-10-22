'use client';

import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useRouter } from 'next/navigation';
import CampaignList from '@/components/features/campaigns/CampaignList';
import { campaignsMock, CampaignSummary } from '@/data/campaignsData';
import { Select, Pagination, Menu, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { resetCampaign } from '@/store/slices/campaignSlice';
import type { SavedCampaign } from '@/store/slices/campaignSlice';

// Функция для конвертации SavedCampaign в CampaignSummary
function convertToCampaignSummary(saved: SavedCampaign): CampaignSummary {
  const channels = saved.channels.selectedChannels.map(ch => {
    if (ch === 'linear_tv') return 'Linear TV';
    if (ch === 'ctv') return 'CTV';
    if (ch === 'social') return 'Social';
    if (ch === 'audio') return 'Audio';
    if (ch === 'display') return 'Display';
    return ch;
  });

  const totalBudget = saved.budget.totalBudget || 0;

  return {
    id: saved.id,
    name: saved.general.campaignName || 'Untitled Campaign',
    status: 'Not Started' as const,
    sparkline: Array.from({ length: 24 }, () => 0),
    channels: channels.length > 0 ? channels : ['Linear TV'],
    progressPercent: 0,
    progressDelivered: 0,
    progressGoal: totalBudget,
    pacingPercent: null,
    pacingDelivered: 0,
    pacingTarget: 0,
    deliveredImpressions: 0,
    deliveredSpend: 0,
    remainingImpression: 0,
    remainingBudget: totalBudget
  };
}

export default function CampaignListPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  
  const savedCampaigns = useAppSelector((state) => state.campaign.savedCampaigns);

  const handleNewLinearCampaign = () => {
    // Сбрасываем данные формы перед созданием новой кампании
    dispatch(resetCampaign());
    router.push('/campaign/linear/new');
  };

  const handleNewOmnichannelCampaign = () => {
    // Сбрасываем данные формы перед созданием новой кампании
    dispatch(resetCampaign());
    router.push('/campaign/omnichannel/new');
  };

  // Объединяем сохранённые кампании с mock данными
  const allCampaigns = useMemo(() => {
    const converted = savedCampaigns.map(convertToCampaignSummary);
    return [...converted, ...campaignsMock];
  }, [savedCampaigns]);

  const totalItems = allCampaigns.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const startIdx = (pageSafe - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);

  const currentItems = useMemo(() => allCampaigns.slice(startIdx, endIdx), [allCampaigns, startIdx, endIdx]);

  // Компонент dropdown кнопки для создания кампании
  const newCampaignButton = (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="filled"
          rightSection={<IconChevronDown size={16} />}
        >
          New Campaign
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={handleNewLinearCampaign}>
          Linear Campaign
        </Menu.Item>
        <Menu.Item onClick={handleNewOmnichannelCampaign}>
          Omnichannel Campaign
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

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
          radius="md"
        />
      </div>
    </div>
  );

  return (
    <PageLayout 
      title="Campaign"
      headerRightButtonComponent={newCampaignButton}
      footerContent={footer}
    >
      <div style={{ padding: '24px' }}>
        <CampaignList items={currentItems} />
      </div>
    </PageLayout>
  );
}


