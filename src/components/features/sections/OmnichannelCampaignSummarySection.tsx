'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';
import { Table, TableTbody, TableTr, TableTd, Text, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import Image from 'next/image';

// Channel configuration
const CHANNEL_CONFIG: Record<string, { name: string; icon: string }> = {
  preroll: { name: 'Pre Roll', icon: '/assets/icons/channels/preroll.svg' },
  ctv: { name: 'CTV', icon: '/assets/icons/channels/ctv.svg' },
  audio: { name: 'Audio', icon: '/assets/icons/channels/audio.svg' },
  social: { name: 'Social', icon: '/assets/icons/channels/social.svg' },
  search: { name: 'Search', icon: '/assets/icons/channels/search.svg' },
  email: { name: 'Email', icon: '/assets/icons/channels/email.svg' }
};

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

const OmnichannelCampaignSummarySection: React.FC = () => {
  const router = useRouter();
  // Get data from Redux store
  const campaign = useAppSelector((state) => state.campaign);
  const selectedChannels = useAppSelector((state) => state.campaign.channels.selectedChannels);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);

  // Format budget
  const formatCurrency = (amount: number) => {
    if (amount === 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate campaign duration
  const getCampaignDuration = () => {
    if (!campaign.flight.startDate || !campaign.flight.endDate) return '';
    
    const start = new Date(campaign.flight.startDate);
    const end = new Date(campaign.flight.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `Campaign of ${diffDays} Days from ${formatDate(campaign.flight.startDate)} to ${formatDate(campaign.flight.endDate)}`;
  };

  // Format lists
  const formatArray = (arr: string[], limit = 3) => {
    if (!arr || arr.length === 0) return '';
    if (arr.length <= limit) {
      return arr.join(', ');
    }
    return `${arr.slice(0, limit).join(', ')} +${arr.length - limit} more`;
  };

  // Get selected channels (excluding linear_tv)
  const omnichannelChannels = selectedChannels.filter(ch => ch !== 'linear_tv');

  // Format channel audience data to string
  const formatChannelAudienceString = (channelId: string) => {
    const data = channelData[channelId];
    if (!data) return '';
    
    const parts = [];
    if (data.audience?.gender && data.audience.gender.length > 0) {
      parts.push(`Gender: ${formatArray(data.audience.gender)}`);
    }
    if (data.audience?.age && data.audience.age.length > 0) {
      parts.push(`Age: ${formatArray(data.audience.age)}`);
    }
    if (data.audience?.income && data.audience.income.length > 0) {
      parts.push(`Income: ${formatArray(data.audience.income)}`);
    }
    if (data.audience?.education && data.audience.education.length > 0) {
      parts.push(`Education: ${formatArray(data.audience.education)}`);
    }
    if (data.audience?.householdSize && data.audience.householdSize.length > 0) {
      parts.push(`Household: ${formatArray(data.audience.householdSize)}`);
    }
    return parts.length > 0 ? parts.join(', ') : '';
  };

  // Format Geo (ZIP codes) data for channel
  const formatChannelGeoString = (channelId: string) => {
    const data = channelData[channelId];
    if (!data || !data.geo?.selectedZipCodes || data.geo.selectedZipCodes.length === 0) {
      if (data?.geo?.targetNationally) {
        return 'Target Nationally';
      }
      return '';
    }
    return formatArray(data.geo.selectedZipCodes);
  };

  // Format Interests for channel
  const formatChannelInterestsString = (channelId: string) => {
    const data = channelData[channelId];
    if (!data || !data.interests || data.interests.length === 0) return '';
    return formatArray(data.interests);
  };

  // Format Keywords for channel (for search)
  const formatChannelKeywordsString = (channelId: string) => {
    const data = channelData[channelId];
    if (!data || !data.keywords || data.keywords.length === 0) return '';
    return formatArray(data.keywords);
  };

  // Format Daypart Summary for channel
  const formatChannelDaypartSummary = (channelId: string) => {
    const data = channelData[channelId];
    if (!data || !data.dayparts?.selectedSlots) return '';

    const selectedSlots = data.dayparts.selectedSlots;
    
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) return '';
    
    // Group days by time intervals
    const timeRanges: Record<string, string[]> = {};
    
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayNames = {
      'Sun': 'Sun',
      'Mon': 'Mon', 
      'Tue': 'Tue',
      'Wed': 'Wed',
      'Thu': 'Thu',
      'Fri': 'Fri',
      'Sat': 'Sat'
    };
    
    const formatHour = (hour: number): string => {
      if (hour === 0) return '12am';
      if (hour < 12) return `${hour}am`;
      if (hour === 12) return '12pm';
      return `${hour - 12}pm`;
    };
    
    dayOrder.forEach(day => {
      if (!selectedSlots[day]) return;
      
      const selectedHours = Object.entries(selectedSlots[day])
        .filter(([_, selected]) => selected)
        .map(([hour, _]) => parseInt(hour))
        .sort((a, b) => a - b);
        
      if (selectedHours.length === 0) return;
      
      let ranges: string[] = [];
      let start = selectedHours[0];
      let end = selectedHours[0];
      
      for (let i = 1; i <= selectedHours.length; i++) {
        if (i < selectedHours.length && selectedHours[i] === end + 1) {
          end = selectedHours[i];
        } else {
          let range;
          if (start === end) {
            range = formatHour(start);
          } else {
            range = `${formatHour(start)}-${formatHour(end + 1)}`;
          }
          ranges.push(range);
          
          if (i < selectedHours.length) {
            start = selectedHours[i];
            end = selectedHours[i];
          }
        }
      }
      
      const timeKey = ranges.join(', ');
      if (!timeRanges[timeKey]) {
        timeRanges[timeKey] = [];
      }
      timeRanges[timeKey].push(dayNames[day as keyof typeof dayNames]);
    });
    
    const formattedRanges = Object.entries(timeRanges).map(([timeRange, days]) => {
      const groupedDays = groupConsecutiveDays(days);
      return `${groupedDays} ${timeRange}`;
    });
    
    return formattedRanges.join(', ');
  };
  
  const groupConsecutiveDays = (days: string[]): string => {
    const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    if (sortedDays.length === 0) return '';
    if (sortedDays.length === 1) return sortedDays[0];
    
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekend = ['Sat', 'Sun'];
    
    if (weekdays.every(day => sortedDays.includes(day)) && sortedDays.length === 5) {
      return 'Mon-Fri';
    }
    
    if (weekend.every(day => sortedDays.includes(day)) && sortedDays.length === 2) {
      return 'Sat/Sun';
    }
    
    const groups: string[] = [];
    let start = 0;
    
    while (start < sortedDays.length) {
      let end = start;
      
      while (end + 1 < sortedDays.length) {
        const currentIndex = dayOrder.indexOf(sortedDays[end]);
        const nextIndex = dayOrder.indexOf(sortedDays[end + 1]);
        
        if (nextIndex === currentIndex + 1) {
          end++;
        } else {
          break;
        }
      }
      
      if (start === end) {
        groups.push(sortedDays[start]);
      } else if (end === start + 1) {
        groups.push(`${sortedDays[start]}/${sortedDays[end]}`);
      } else {
        groups.push(`${sortedDays[start]}-${sortedDays[end]}`);
      }
      
      start = end + 1;
    }
    
    return groups.join('/');
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
              editRoute="/campaign/omnichannel/new#general-details"
              isEmpty={!campaign.general.campaignName}
            />

            {/* Campaign Duration */}
            <SummaryRow
              label="Campaign Duration"
              value={getCampaignDuration()}
              editRoute="/campaign/omnichannel/new#flight-range"
              isEmpty={!campaign.flight.startDate || !campaign.flight.endDate}
            />

            {/* Advertiser */}
            <SummaryRow
              label="Advertiser"
              value={campaign.general.advertiser}
              editRoute="/campaign/omnichannel/new#general-details"
              isEmpty={!campaign.general.advertiser}
            />

            {/* Total Budget */}
            <SummaryRow
              label="Total Budget"
              value={formatCurrency(campaign.budget.totalBudget)}
              editRoute="/campaign/omnichannel/channels"
              isEmpty={campaign.budget.totalBudget === 0}
            />
          </TableTbody>
        </Table>
      </div>

      {/* Channel Details Sections */}
      {omnichannelChannels.map((channelId) => {
        const config = CHANNEL_CONFIG[channelId];
        const budget = budgetAllocation?.[channelId] || 0;
        const percentage = campaign.budget.totalBudget > 0 
          ? ((budget / campaign.budget.totalBudget) * 100).toFixed(1)
          : '0';
        
        // Check if there is data for channel
        const hasAudience = formatChannelAudienceString(channelId) !== '';
        const hasGeo = formatChannelGeoString(channelId) !== '';
        const hasInterests = formatChannelInterestsString(channelId) !== '';
        const hasKeywords = formatChannelKeywordsString(channelId) !== '';
        const hasDayparts = formatChannelDaypartSummary(channelId) !== '';

        return (
          <div key={`details-${channelId}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Image
                src={`/assets/icons/channels/${channelId}.svg`}
                alt={config?.name || channelId}
                width={32}
                height={32}
                style={{ filter: 'brightness(0)', flexShrink: 0 }}
              />
              <Text size="lg" fw={600} c="dark">{config?.name || channelId}</Text>
            </div>
            <Table>
              <TableTbody>
                {/* Budget Allocation */}
                <SummaryRow
                  label="Budget Allocation"
                  value={`${formatCurrency(budget)} (${percentage}%)`}
                  editRoute="/campaign/omnichannel/channels"
                  isEmpty={false}
                />

                {/* Audience */}
                <SummaryRow
                  label="Audience"
                  value={formatChannelAudienceString(channelId)}
                  editRoute={`/campaign/omnichannel/details#audiences-${channelId}`}
                  isEmpty={!hasAudience}
                />

                {/* Geo (ZIP Codes) */}
                <SummaryRow
                  label="Geo"
                  value={formatChannelGeoString(channelId)}
                  editRoute={`/campaign/omnichannel/details#geo-${channelId}`}
                  isEmpty={!hasGeo}
                />

                {/* Interests */}
                <SummaryRow
                  label="Interests"
                  value={formatChannelInterestsString(channelId)}
                  editRoute={`/campaign/omnichannel/details#interests-${channelId}`}
                  isEmpty={!hasInterests}
                />

                {/* Keywords (only for search) */}
                {channelId === 'search' && (
                  <SummaryRow
                    label="Keywords"
                    value={formatChannelKeywordsString(channelId)}
                    editRoute={`/campaign/omnichannel/details#keywords-${channelId}`}
                    isEmpty={!hasKeywords}
                  />
                )}

                {/* Dayparts */}
                <SummaryRow
                  label="Daypart Summary"
                  value={formatChannelDaypartSummary(channelId)}
                  editRoute={`/campaign/omnichannel/details#dayparts-${channelId}`}
                  isEmpty={!hasDayparts}
                />
              </TableTbody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default OmnichannelCampaignSummarySection;

