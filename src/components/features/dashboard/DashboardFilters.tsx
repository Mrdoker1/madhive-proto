'use client';

import React, { useState } from 'react';
import { Select } from '@mantine/core';

const DashboardFilters: React.FC = () => {
  const [campaignType, setCampaignType] = useState<string | null>('linear');
  const [dateRange, setDateRange] = useState<string | null>('last_30_days');
  const [advertiser, setAdvertiser] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string | null>(null);

  const handleReset = () => {
    setCampaignType('linear');
    setDateRange('last_30_days');
    setAdvertiser(null);
    setCampaign(null);
  };

  return (
    <div 
      style={{
        backgroundColor: 'var(--header-background)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 24px',
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
          { value: 'omnichannel', label: 'Omnichannel' },
          { value: 'ctv', label: 'CTV' },
          { value: 'display', label: 'Display' }
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
        styles={{
          input: {
            width: '180px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000'
          }
        }}
      />

      {/* Advertiser Filter */}
      <Select
        value={advertiser}
        onChange={setAdvertiser}
        data={[
          { value: 'advertiser_1', label: 'Advertiser A' },
          { value: 'advertiser_2', label: 'Advertiser B' },
          { value: 'advertiser_3', label: 'Advertiser C' },
          { value: 'advertiser_4', label: 'Advertiser D' }
        ]}
        placeholder="Advertiser"
        clearable
        styles={{
          input: {
            width: '180px',
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
        data={[
          { value: 'campaign_1', label: 'Campaign 1' },
          { value: 'campaign_2', label: 'Campaign 2' },
          { value: 'campaign_3', label: 'Campaign 3' },
          { value: 'campaign_4', label: 'Campaign 4' }
        ]}
        placeholder="Campaign"
        clearable
        styles={{
          input: {
            width: '180px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#000000'
          }
        }}
      />

      {/* Reset Button */}
      <button
        onClick={handleReset}
        style={{
          height: '40px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#000000',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginLeft: 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover-background)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C9.29167 14 10.4917 13.5833 11.4667 12.8667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Reset
      </button>
    </div>
  );
};

export default DashboardFilters;

