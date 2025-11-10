'use client';

import React, { useMemo } from 'react';
import { Select, Button } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useDashboardFilters } from '@/contexts/DashboardFilterContext';
import { campaignTableData } from '@/data/DashboardData';

const DashboardFilters: React.FC = () => {
  const {
    campaignType,
    dateRange,
    advertiser,
    campaign,
    setCampaignType,
    setDateRange,
    setAdvertiser,
    setCampaign,
    resetFilters
  } = useDashboardFilters();

  // Get unique advertisers from data
  const advertiserOptions = useMemo(() => {
    const uniqueAdvertisers = Array.from(new Set(campaignTableData.map(row => row.advertiser)));
    return uniqueAdvertisers.map(adv => ({
      value: adv,
      label: adv
    }));
  }, []);

  // Get campaigns for selected advertiser
  const campaignOptions = useMemo(() => {
    if (!advertiser) return [];
    const filteredCampaigns = campaignTableData.filter(row => row.advertiser === advertiser);
    return filteredCampaigns.map(row => ({
      value: row.id,
      label: row.campaign
    }));
  }, [advertiser]);

  return (
    <div 
      style={{
        backgroundColor: 'var(--header-background)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      {/* Filters Label */}
      <div style={{
        fontSize: '14px',
        color: '#000000',
        fontWeight: 600,
        marginRight: '8px'
      }}>
        Filters
      </div>

      {/* Campaign Type Filter */}
      <Select
        value={campaignType}
        onChange={setCampaignType}
        data={[
          { value: 'linear', label: 'Linear' },
          { value: 'omnichannel', label: 'Omnichannel' }
        ]}
        placeholder="Campaign Type"
        styles={{
          input: {
            width: '160px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000'
          }
        }}
      />

      {/* Vertical Divider */}
      <div style={{
        width: '1px',
        height: '32px',
        backgroundColor: 'var(--border-color)'
      }} />

      {/* Date Range Filter */}
      <Select
        value={dateRange}
        onChange={setDateRange}
        data={[
          { value: 'last_7_days', label: 'Last 7 Days' },
          { value: 'last_30_days', label: 'Last 30 Days' },
          { value: 'last_90_days', label: 'Last 90 Days' },
          { value: 'this_month', label: 'This Month' },
          { value: 'last_month', label: 'Last Month' },
          { value: 'this_year', label: 'This Year' },
          { value: 'custom', label: 'Custom Range' }
        ]}
        placeholder="Date Range"
        disabled
        styles={{
          input: {
            width: '180px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000',
            opacity: 0.6
          }
        }}
      />

      {/* Advertiser Filter */}
      <Select
        value={advertiser}
        onChange={(value) => {
          setAdvertiser(value);
          // Reset campaign when advertiser changes
          if (value !== advertiser) {
            setCampaign(null);
          }
        }}
        data={advertiserOptions}
        placeholder="Advertiser"
        clearable
        styles={{
          input: {
            width: '220px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000'
          }
        }}
      />

      {/* Campaign Filter */}
      <Select
        value={campaign}
        onChange={setCampaign}
        data={campaignOptions}
        placeholder="Campaign"
        clearable
        disabled={!advertiser}
        styles={{
          input: {
            width: '280px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000',
            opacity: !advertiser ? 0.6 : 1
          }
        }}
      />

      {/* Reset Button */}
      <Button
        variant="subtle"
        onClick={resetFilters}
        leftSection={<IconRefresh size={16} />}
        styles={{
          root: {
            height: '40px',
            padding: '0 16px',
            color: '#000000',
            fontSize: '14px',
            fontWeight: 500
          }
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default DashboardFilters;

