'use client';

import React from 'react';
import { TextInput, ActionIcon, Menu, Button } from '@mantine/core';
import { IconSearch, IconSettings, IconInfoCircle, IconChevronDown } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { resetCampaign } from '@/store/slices/campaignSlice';

const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

        {/* New Campaign Dropdown Button */}
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
      </div>
    </header>
  );
};

export default DashboardHeader;

