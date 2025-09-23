'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';
import { Table, TableTbody, TableTr, TableTd, Text, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

interface SummaryRowProps {
  label: string;
  value: string | React.ReactNode;
  editRoute: string;
  isEmpty?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, editRoute, isEmpty = false }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(editRoute);
  };

  return (
    <TableTr>
      <TableTd style={{ width: '200px', paddingRight: '24px' }}>
        <Text size="xs" fw={500} c="dark">
          {label}
        </Text>
      </TableTd>
      <TableTd style={{ paddingRight: '24px' }}>
        {isEmpty ? (
          <Text size="xs" c="dimmed">
            Not specified
          </Text>
        ) : (
          <Text size="xs" c="dark">
            {value}
          </Text>
        )}
      </TableTd>
      <TableTd style={{ width: '60px', textAlign: 'right' }}>
        <ActionIcon
          variant="transparent"
          size="sm"
          onClick={handleEdit}
          title="Edit"
          style={{ color: 'var(--secondary-color)' }}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </TableTd>
    </TableTr>
  );
};

const CampaignSummarySection: React.FC = () => {
  // Получаем данные из Redux store
  const campaign = useAppSelector((state) => state.campaign);

  // Форматирование бюджета
  const formatCurrency = (amount: number) => {
    if (amount === 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Форматирование дат
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Вычисление продолжительности кампании
  const getCampaignDuration = () => {
    if (!campaign.flight.startDate || !campaign.flight.endDate) return '';
    
    const start = new Date(campaign.flight.startDate);
    const end = new Date(campaign.flight.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `Campaign of ${diffDays} Days from ${formatDate(campaign.flight.startDate)} to ${formatDate(campaign.flight.endDate)}`;
  };

  // Форматирование списков
  const formatArray = (arr: string[], limit = 3) => {
    if (arr.length === 0) return '';
    if (arr.length <= limit) {
      return arr.join(', ');
    }
    return `${arr.slice(0, limit).join(', ')} +${arr.length - limit} more`;
  };

  // Форматирование данных аудитории в строку
  const formatAudienceString = () => {
    const parts = [];
    if (campaign.audience.gender.length > 0) {
      parts.push(`Gender: ${formatArray(campaign.audience.gender)}`);
    }
    if (campaign.audience.age.length > 0) {
      parts.push(`Age: ${formatArray(campaign.audience.age)}`);
    }
    if (campaign.audience.income.length > 0) {
      parts.push(`Income: ${formatArray(campaign.audience.income)}`);
    }
    return parts.join(', ');
  };

  // Форматирование Markets данных
  const formatMarketsString = () => {
    return formatArray(campaign.markets.selectedMarkets);
  };

  // Форматирование Daypart Summary
  const formatDaypartSummary = () => {
    const selectedSlots = campaign.dayparts.selectedSlots;
    const totalSlots = Object.values(selectedSlots).reduce(
      (total, daySlots) => total + Object.values(daySlots).filter(Boolean).length, 
      0
    );
    
    if (totalSlots === 0) return '';
    
    return `${totalSlots} time slots selected`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* General Section */}
      <div>
        <Text size="lg" fw={600} mb="md" c="dark">General</Text>
        <Table>
          <TableTbody>
            {/* Campaign Name */}
            <SummaryRow
              label="Campaign Name"
              value={campaign.general.campaignName}
              editRoute="/new-campaign"
              isEmpty={!campaign.general.campaignName}
            />

            {/* Campaign Duration */}
            <SummaryRow
              label="Campaign Duration"
              value={getCampaignDuration()}
              editRoute="/new-campaign"
              isEmpty={!campaign.flight.startDate || !campaign.flight.endDate}
            />

            {/* Advertiser */}
            <SummaryRow
              label="Advertiser"
              value={campaign.general.advertiser}
              editRoute="/new-campaign"
              isEmpty={!campaign.general.advertiser}
            />

            {/* Agency */}
            <SummaryRow
              label="Agency"
              value={campaign.general.agency}
              editRoute="/new-campaign"
              isEmpty={!campaign.general.agency}
            />
          </TableTbody>
        </Table>
      </div>

      {/* Rich Section */}
      <div>
        <Text size="lg" fw={600} mb="md" c="dark">Rich</Text>
        <Table>
          <TableTbody>
            {/* Budget */}
            <SummaryRow
              label="Budget"
              value={formatCurrency(campaign.budget.totalBudget)}
              editRoute="/new-campaign"
              isEmpty={campaign.budget.totalBudget === 0}
            />

            {/* Audience */}
            <SummaryRow
              label="Audience"
              value={formatAudienceString()}
              editRoute="/channel-details"
              isEmpty={
                campaign.audience.gender.length === 0 && 
                campaign.audience.age.length === 0 && 
                campaign.audience.income.length === 0
              }
            />

            {/* Markets */}
            <SummaryRow
              label="Markets"
              value={formatMarketsString()}
              editRoute="/channel-details"
              isEmpty={campaign.markets.selectedMarkets.length === 0}
            />

            {/* Daypart Summary */}
            <SummaryRow
              label="Daypart Summary"
              value={formatDaypartSummary()}
              editRoute="/channel-details"
              isEmpty={
                Object.values(campaign.dayparts.selectedSlots).every(
                  daySlots => Object.values(daySlots).every(slot => !slot)
                )
              }
            />
          </TableTbody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignSummarySection;
