'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Select, Pagination, Menu, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardFilters from '@/components/features/dashboard/DashboardFilters';
import MetricsSection from '@/components/features/dashboard/MetricsSection';
import GeoPerformanceMap from '@/components/features/dashboard/GeoPerformanceMap';
import CampaignList from '@/components/features/campaigns/CampaignList';
import { DashboardFilterProvider } from '@/contexts/DashboardFilterContext';
import { campaignsMock, CampaignSummary } from '@/data/campaignsData';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { resetCampaign } from '@/store/slices/campaignSlice';
import type { SavedCampaign } from '@/store/slices/campaignSlice';

// Function to convert SavedCampaign to CampaignSummary
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

type SortField = 'status' | 'name' | 'progressPercent' | 'pacingPercent' | 'deliveredImpressions' | 'deliveredSpend' | 'remainingImpression' | 'remainingBudget';
type SortDirection = 'asc' | 'desc';

function LinearDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const campaignId = searchParams.get('campaignId');
  
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>('status');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const savedCampaigns = useAppSelector((state) => state.campaign.savedCampaigns);

  const handleNewLinearCampaign = () => {
    dispatch(resetCampaign());
    router.push('/campaign/linear/new');
  };

  const handleNewOmnichannelCampaign = () => {
    dispatch(resetCampaign());
    router.push('/campaign/omnichannel/new');
  };

  // Function to determine status priority (for sorting)
  const getStatusPriority = (status: string): number => {
    const priorities: Record<string, number> = {
      'Not Started': 1,
      'On Target': 2,
      'Over Pace': 3,
      'Way Over Pace': 4,
      'Under Pace': 5,
      'Way Under Pace': 6,
      'Completed': 7
    };
    return priorities[status] || 99;
  };

  // Sorting function
  const sortCampaigns = (campaigns: CampaignSummary[]): CampaignSummary[] => {
    return [...campaigns].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'status':
          comparison = getStatusPriority(a.status) - getStatusPriority(b.status);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'progressPercent':
          comparison = a.progressPercent - b.progressPercent;
          break;
        case 'pacingPercent':
          const aPacing = a.pacingPercent ?? -1;
          const bPacing = b.pacingPercent ?? -1;
          comparison = aPacing - bPacing;
          break;
        case 'deliveredImpressions':
          comparison = a.deliveredImpressions - b.deliveredImpressions;
          break;
        case 'deliveredSpend':
          comparison = a.deliveredSpend - b.deliveredSpend;
          break;
        case 'remainingImpression':
          comparison = a.remainingImpression - b.remainingImpression;
          break;
        case 'remainingBudget':
          comparison = a.remainingBudget - b.remainingBudget;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  // Sort change handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  // Combine saved campaigns with mock data
  const allCampaigns = useMemo(() => {
    const converted = savedCampaigns.map(convertToCampaignSummary);
    return [...converted, ...campaignsMock];
  }, [savedCampaigns]);

  // Apply sorting
  const sortedCampaigns = useMemo(() => {
    return sortCampaigns(allCampaigns);
  }, [allCampaigns, sortField, sortDirection]);

  const totalItems = sortedCampaigns.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const startIdx = (pageSafe - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);

  const currentItems = useMemo(() => sortedCampaigns.slice(startIdx, endIdx), [sortedCampaigns, startIdx, endIdx]);

  return (
    <DashboardFilterProvider initialCampaignId={campaignId}>
      <motion.div 
        className="flex flex-col h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <DashboardHeader />
        </motion.div>

        {/* Dashboard Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <DashboardFilters />
        </motion.div>

        {/* Main Content */}
        <motion.main 
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ backgroundColor: 'var(--page-background)' }}
        >
          <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '32px', paddingBottom: '32px' }}>
            {/* Metrics Section */}
            <MetricsSection />

            {/* Geo Performance Map */}
            <div style={{ marginTop: '32px' }}>
              <GeoPerformanceMap />
            </div>

            {/* Campaign List Section */}
            <div style={{ marginTop: '32px' }}>
              {/* Section Header with New Campaign Button */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>Campaigns</h3>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button
                      variant="filled"
                      size="sm"
                      rightSection={<IconChevronDown size={14} />}
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
              </div>

              {/* Campaign List Table */}
              <CampaignList 
                items={currentItems} 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />

              {/* Pagination Footer */}
              <div 
                className="flex items-center justify-between" 
                style={{ 
                  padding: '16px 0', 
                  marginTop: '16px',
                  borderTop: '1px solid var(--border-color)' 
                }}
              >
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Select
                    data={[
                      { value: '10', label: '10' }, 
                      { value: '20', label: '20' }, 
                      { value: '50', label: '50' }, 
                      { value: '100', label: '100' }
                    ]}
                    value={String(pageSize)}
                    onChange={(v) => {
                      const next = Number(v ?? 20);
                      setPageSize(next);
                      setPage(1);
                    }}
                    style={{ width: '72px' }}
                    size="xs"
                  />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Per Page</span>
                </div>

                <div className="flex items-center" style={{ gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    {startIdx + 1} - {endIdx} of {totalItems}
                  </span>
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
            </div>
          </div>
        </motion.main>
      </motion.div>
    </DashboardFilterProvider>
  );
}

export default function LinearDashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '32px' }}>Loading...</div>}>
      <LinearDashboardContent />
    </Suspense>
  );
}
