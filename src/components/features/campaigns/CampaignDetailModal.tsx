'use client';

import React from 'react';
import { Modal, Text, Group, Badge, Progress, SimpleGrid, Divider, ActionIcon, Tooltip } from '@mantine/core';
import { IconX, IconEdit, IconDownload } from '@tabler/icons-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ReferenceLine, 
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Area
} from 'recharts';
import type { CampaignSummary } from '@/data/campaignsData';
import { CampaignStatusBadge } from './CampaignStatusBadge';

// Mock extended data for campaigns (since CampaignSummary doesn't have all fields)
// In real app, this would come from API/store
interface ExtendedCampaignData {
  advertiser: string;
  brand: string;
  cpeCode: string;
  contact: string;
  approver: string;
  spotLengthMix: { fifteen: number; thirty: number; sixty: number };
  language: string;
  fluidity: number;
  dayparts: string;
  genres: string;
  exclusions: number;
  markets: { name: string; budget: number; stations: string[] }[];
  audience: string;
}

// Generate mock extended data based on campaign ID
const getExtendedData = (campaignId: string): ExtendedCampaignData => {
  // Use campaign ID to generate somewhat consistent mock data
  const seed = campaignId.charCodeAt(0) + (campaignId.charCodeAt(campaignId.length - 1) || 0);
  
  const advertisers = ['Ford Motor Company', 'Toyota USA', 'Chevrolet', 'Hyundai Motors', 'Honda America', 'Nissan USA'];
  const brands = ['F-150', 'Camry', 'Silverado', 'Sonata', 'Accord', 'Altima'];
  const contacts = ['John Smith', 'Sarah Johnson', 'Mike Williams', 'Emily Brown', 'David Lee'];
  const approvers = ['Director Marketing', 'VP Sales', 'CMO', 'Brand Manager'];
  
  const markets = [
    { name: 'New York', budget: 45000, stations: ['WABC', 'WNBC', 'WCBS'] },
    { name: 'Los Angeles', budget: 38000, stations: ['KABC', 'KNBC'] },
    { name: 'Chicago', budget: 22000, stations: ['WLS', 'WMAQ'] },
    { name: 'Philadelphia', budget: 15000, stations: ['WPVI', 'KYW'] },
  ];

  return {
    advertiser: advertisers[seed % advertisers.length],
    brand: brands[seed % brands.length],
    cpeCode: `CPE-${2024}${String(seed).padStart(4, '0')}`,
    contact: contacts[seed % contacts.length],
    approver: approvers[seed % approvers.length],
    spotLengthMix: { 
      fifteen: 20 + (seed % 20), 
      thirty: 50 + (seed % 20), 
      sixty: 30 - (seed % 20) 
    },
    language: seed % 3 === 0 ? 'Spanish' : 'English',
    fluidity: seed % 6,
    dayparts: 'Prime Time 35%, Early Fringe 25%, Daytime 20%',
    genres: seed % 2 === 0 ? 'News, Sports, Drama' : 'All genres',
    exclusions: seed % 5,
    markets: markets.slice(0, 2 + (seed % 3)),
    audience: seed % 2 === 0 ? 'A 25-54' : 'A 18-49'
  };
};

interface CampaignDetailModalProps {
  campaign: CampaignSummary | null;
  opened: boolean;
  onClose: () => void;
}

// Format helpers
const formatNumber = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toLocaleString('en-US');
};

const formatCurrency = (n: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

// Summary item component
const SummaryItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
  <div style={{ marginBottom: '8px' }}>
    <Text size="xs" c="dimmed" mb={2}>{label}</Text>
    <Text component="div" size="sm" fw={500}>{value}</Text>
  </div>
);

// Pacing Chart component
const PacingChart: React.FC<{ 
  title: string; 
  maxValue: number; 
  currentValue: number;
  formatValue: (val: number) => string;
  unit?: string;
  progressPercent: number;
}> = ({ title, maxValue, currentValue, formatValue, unit, progressPercent }) => {
  // Generate chart data based on progress
  const totalPoints = 10;
  const currentPoint = Math.round(totalPoints * (progressPercent / 100));
  
  const chartData = [];
  for (let i = 0; i <= totalPoints; i++) {
    const progress = i / totalPoints;
    const planned = progress * maxValue;
    
    // Add some variation to make it look realistic
    const variation = Math.sin(i * 0.8) * 0.03;
    const actual = i <= currentPoint 
      ? (progress + variation) * (currentValue / (progressPercent / 100 || 1)) 
      : undefined;
    
    chartData.push({
      index: i,
      planned: Math.max(0, planned),
      actual: actual !== undefined ? Math.max(0, actual) : undefined,
    });
  }

  return (
    <div style={{ 
      padding: '12px', 
      backgroundColor: '#f9fafb', 
      borderRadius: '8px',
      marginBottom: '12px'
    }}>
      <Text size="xs" fw={600} mb="xs">{title}</Text>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis hide />
          <YAxis hide domain={[0, maxValue]} />
          <ReferenceLine x={currentPoint} stroke="#999" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="planned" stroke="#666" strokeWidth={1.5} dot={false} name="Planned" />
          <Line type="monotone" dataKey="actual" stroke="#E91E8A" strokeWidth={2} dot={false} name="Actual" connectNulls={false} />
          <Legend 
            verticalAlign="bottom"
            height={20}
            iconType="plainline"
            iconSize={10}
            formatter={(value) => <span style={{ color: '#666', fontSize: '10px' }}>{value}</span>}
          />
        </LineChart>
      </ResponsiveContainer>
      <Group justify="space-between" mt="xs">
        <Text size="xs" c="dimmed">{unit === '$' ? '$0' : '0'}</Text>
        <Text size="xs" c="dimmed">{formatValue(maxValue)}</Text>
      </Group>
    </div>
  );
};

// Sparkline component for 7-day delivery
const DeliverySparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const chartData = data.map((v, i) => ({ i, v }));
  
  return (
    <div style={{ width: '100%', height: '60px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
          <defs>
            <linearGradient id="modalSparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="none" fill="url(#modalSparkGradient)" />
          <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({ campaign, opened, onClose }) => {
  if (!campaign) return null;

  // Get extended mock data for this campaign
  const extData = getExtendedData(campaign.id);

  // Calculate flight dates (mock based on campaign name)
  const getFlightDates = () => {
    // Extract dates from campaign name if possible
    const match = campaign.name.match(/(\d{2})\.(\d{2})\s*-\s*(\d{2})\.(\d{2})/);
    if (match) {
      return `${match[1]}/${match[2]} - ${match[3]}/${match[4]}`;
    }
    return '01/15/25 - 02/28/25';
  };

  // Calculate budget info
  const totalBudget = campaign.remainingBudget + campaign.deliveredSpend;
  const budgetProgress = totalBudget > 0 ? (campaign.deliveredSpend / totalBudget) * 100 : 0;
  const avgCPM = campaign.deliveredImpressions > 0 
    ? (campaign.deliveredSpend / campaign.deliveredImpressions) * 1000 
    : 17.2;

  // Spot length display
  const spotLengthDisplay = `:15 ${extData.spotLengthMix.fifteen}%  :30 ${extData.spotLengthMix.thirty}%  :60 ${extData.spotLengthMix.sixty}%`;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="90%"
      title={
        <Group gap="md">
          <Text size="lg" fw={600}>{campaign.name}</Text>
          <CampaignStatusBadge status={campaign.status} />
        </Group>
      }
      styles={{
        header: { borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' },
        body: { padding: '24px' }
      }}
    >
      {/* Top Row - Campaign Details, Goals/Budget, Status */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mb="lg">
        {/* Campaign Details */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">CAMPAIGN DETAILS</Text>
          <SummaryItem label="Advertiser" value={extData.advertiser} />
          <SummaryItem label="Brand" value={extData.brand} />
          <SummaryItem label="CPE Code" value={extData.cpeCode} />
          <SummaryItem label="Contact" value={extData.contact} />
          <SummaryItem label="Approver" value={extData.approver} />
        </div>

        {/* Goals & Budget */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">GOALS & BUDGET</Text>
          <SummaryItem label="Goal" value="Maximum Impressions" />
          <SummaryItem label="Total Budget" value={formatCurrency(totalBudget)} />
          <SummaryItem label="Est. Impressions" value={formatNumber(campaign.progressGoal)} />
          <SummaryItem label="Avg CPM" value={`$${avgCPM.toFixed(2)}`} />
        </div>

        {/* Campaign Status */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">CAMPAIGN STATUS</Text>
          <SummaryItem 
            label="Status" 
            value={<CampaignStatusBadge status={campaign.status} />} 
          />
          <SummaryItem label="Progress" value={`${campaign.progressPercent.toFixed(1)}%`} />
          <SummaryItem 
            label="Pacing" 
            value={campaign.pacingPercent !== null ? `${campaign.pacingPercent.toFixed(1)}%` : '—'} 
          />
          <SummaryItem 
            label="Channels" 
            value={
              <Group gap={4} mt={2}>
                {campaign.channels.map(ch => (
                  <Badge key={ch} size="xs" variant="light" color="pink">{ch}</Badge>
                ))}
              </Group>
            } 
          />
        </div>
      </SimpleGrid>

      {/* Second Row - Pacing Charts | Markets & Guidelines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '16px' }}>
        {/* Left - Pacing Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PacingChart 
            title="Pacing: Impressions"
            maxValue={campaign.progressGoal}
            currentValue={campaign.deliveredImpressions}
            formatValue={formatNumber}
            progressPercent={campaign.progressPercent}
          />
          <PacingChart 
            title="Pacing: Budget"
            maxValue={totalBudget}
            currentValue={campaign.deliveredSpend}
            formatValue={formatCurrency}
            unit="$"
            progressPercent={budgetProgress}
          />
        </div>

        {/* Right - Markets & Guidelines stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Markets & Stations */}
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <Text size="xs" fw={600} c="dimmed" mb="sm">MARKETS & STATIONS</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {extData.markets.map((market, idx) => (
                <div key={idx}>
                  <Group justify="space-between">
                    <Text size="sm" fw={500} style={{ textDecoration: 'underline' }}>{market.name}</Text>
                    <Text size="sm" c="dimmed">{formatCurrency(market.budget)}</Text>
                  </Group>
                  <Text size="xs" c="dimmed" ml="md">{market.stations.join(', ')}</Text>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <Text size="xs" fw={600} c="dimmed" mb="sm">GUIDELINES</Text>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div>
                <Text size="xs" c="dimmed">Flight</Text>
                <Text size="sm">{getFlightDates()}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Audience</Text>
                <Text size="sm">{extData.audience}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Spot Length</Text>
                <Text size="sm">{spotLengthDisplay}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Language</Text>
                <Text size="sm">{extData.language}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Dayparts</Text>
                <Text size="sm">{extData.dayparts}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Genres</Text>
                <Text size="sm">{extData.genres}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Fluidity</Text>
                <Text size="sm">Max {extData.fluidity}%</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Exclusions</Text>
                <Text size="sm">{extData.exclusions > 0 ? `${extData.exclusions} program(s)` : 'None'}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivered Metrics Row */}
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '16px' }}>
        <Group justify="space-between" mb="sm">
          <Text size="xs" fw={600} c="dimmed">DELIVERY METRICS</Text>
          <div style={{ width: '200px' }}>
            <DeliverySparkline data={campaign.sparkline.slice(-7)} />
          </div>
        </Group>
        <SimpleGrid cols={4} spacing="md">
          <SummaryItem label="Delivered Impressions" value={formatNumber(campaign.deliveredImpressions)} />
          <SummaryItem label="Delivered Spend" value={formatCurrency(campaign.deliveredSpend)} />
          <SummaryItem label="Remaining Impressions" value={formatNumber(campaign.remainingImpression)} />
          <SummaryItem label="Remaining Budget" value={formatCurrency(campaign.remainingBudget)} />
        </SimpleGrid>
      </div>

      {/* Bottom Section - Actions */}
      <Divider mb="md" />
      <Group justify="space-between">
        <Group gap="md">
          <Tooltip label="Download Agency Order">
            <ActionIcon variant="light" size="lg">
              <IconDownload size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download Broadcaster Orders">
            <ActionIcon variant="light" size="lg">
              <IconDownload size={18} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">Download reports</Text>
        </Group>
        
        <Tooltip label="Edit Campaign">
          <ActionIcon variant="light" size="lg" color="blue">
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Modal>
  );
};

export default CampaignDetailModal;

