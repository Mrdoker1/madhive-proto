'use client';

import React from 'react';
import { TextInput, ActionIcon, Button } from '@mantine/core';
import { IconSearch, IconSettings, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const DashboardHeader: React.FC = () => {
  const router = useRouter();

  const handleNewCampaignClick = () => {
    router.push('/campaign/omnichannel/new');
  };

  return (
    <header 
      className="w-full border-b" 
      style={{ 
        backgroundColor: 'var(--header-background)', 
        borderBottomColor: 'var(--border-color)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px'
      }}
    >
      {/* Left - Title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          color: '#000000',
          margin: 0
        }}>
          Dashboard
        </h1>
      </div>

      {/* Right - Search, Settings, Info, New Campaign Button */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Search Input */}
        <TextInput
          placeholder="Search..."
          leftSection={<IconSearch size={16} stroke={1.5} color="#6B7280" />}
          styles={{
            input: {
              width: '240px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px',
              '&:focus': {
                borderColor: 'var(--primary-color)'
              }
            }
          }}
        />

        {/* Settings Icon */}
        <ActionIcon
          variant="subtle"
          size="lg"
          color="gray"
        >
          <IconSettings size={20} stroke={1.5} />
        </ActionIcon>

        {/* Info Icon */}
        <ActionIcon
          variant="subtle"
          size="lg"
          color="gray"
        >
          <IconInfoCircle size={20} stroke={1.5} />
        </ActionIcon>

        {/* New Campaign Button */}
        <Button
          onClick={handleNewCampaignClick}
          variant="filled"
        >
          New Campaign
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;

