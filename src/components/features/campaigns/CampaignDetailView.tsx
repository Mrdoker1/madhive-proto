'use client';

import React from 'react';
import { Text, Group, Badge, Progress, SimpleGrid, Divider, Button, Tooltip } from '@mantine/core';
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

// Extended campaign data interface
export interface CampaignDetailData {
  // Basic info
  name: string;
  approvalStatus: 'Pending' | 'Approved';
  status: string;
  
  // Campaign Details
  advertiser: string;
  brand: string;
  cpeCode: string;
  contact: string;
  approver: string;
  
  // Goals & Budget
  goal: string;
  totalBudget: number;
  estImpressions: number;
  avgCPM: number;
  
  // Campaign Status
  progressPercent: number;
  pacingPercent: number | null;
  channels: string[];
  
  // Markets & Stations
  markets: { name: string; budget: number; stations: string[] }[];
  
  // Guidelines
  flight: string;
  audience: string;
  spotLengthMix: { fifteen: number; thirty: number; sixty: number };
  language: string;
  dayparts: string;
  genres: string;
  fluidity: number;
  exclusions: number;
  
  // Pacing data
  progressGoal: number;
  deliveredImpressions: number;
  deliveredSpend: number;
  remainingImpression: number;
  remainingBudget: number;
  sparkline: number[];
}

interface CampaignDetailViewProps {
  data: CampaignDetailData;
  showApprovalBadges?: boolean;
  showSparkline?: boolean;
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
    <div style={{ flex: 1 }}>
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#f9fafb', 
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
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
            <linearGradient id="detailSparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="none" fill="url(#detailSparkGradient)" />
          <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({ 
  data, 
  showApprovalBadges = false,
  showSparkline = true
}) => {
  // Calculate budget info
  const budgetProgress = data.totalBudget > 0 ? (data.deliveredSpend / data.totalBudget) * 100 : 0;

  // Spot length display
  const spotLengthDisplay = `:15 ${data.spotLengthMix.fifteen}%  :30 ${data.spotLengthMix.thirty}%  :60 ${data.spotLengthMix.sixty}%`;

  return (
    <div>
      {/* Top Row - Campaign Details, Goals/Budget, Status, Markets */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={16} mb={16}>
        {/* Campaign Details */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">CAMPAIGN DETAILS</Text>
          <SummaryItem label="Advertiser" value={data.advertiser} />
          <SummaryItem label="Brand" value={data.brand} />
          <SummaryItem label="CPE Code" value={data.cpeCode} />
          <SummaryItem label="Contact" value={data.contact} />
          <SummaryItem label="Approver" value={data.approver} />
        </div>

        {/* Goals & Budget */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">GOALS & BUDGET</Text>
          <SummaryItem label="Goal" value={data.goal} />
          <SummaryItem label="Total Budget" value={formatCurrency(data.totalBudget)} />
          <SummaryItem label="Est. Impressions" value={formatNumber(data.estImpressions)} />
          <SummaryItem label="Avg CPM" value={`$${data.avgCPM.toFixed(2)}`} />
        </div>

        {/* Campaign Status */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">CAMPAIGN STATUS</Text>
          {showApprovalBadges && (
            <>
              <SummaryItem 
                label="Approval Status" 
                value={
                  <Text
                    component="span"
                    style={{
                      color: data.approvalStatus === 'Approved' ? '#22c55e' : '#f59e0b',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: data.approvalStatus === 'Approved' ? '#22c55e15' : '#f59e0b15',
                      display: 'inline-block',
                    }}
                  >
                    {data.approvalStatus}
                  </Text>
                } 
              />
              <SummaryItem 
                label="Pacing Status" 
                value={data.status} 
              />
            </>
          )}
          <SummaryItem label="Progress" value={`${data.progressPercent.toFixed(1)}%`} />
          <SummaryItem 
            label="Pacing %" 
            value={data.pacingPercent !== null ? `${data.pacingPercent.toFixed(1)}%` : '—'} 
          />
          <SummaryItem 
            label="Channels" 
            value={
              <Group gap={4} mt={2}>
                {data.channels.map(ch => (
                  <Badge key={ch} size="xs" variant="light" color="pink">{ch}</Badge>
                ))}
              </Group>
            } 
          />
        </div>

        {/* Markets & Stations */}
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <Text size="xs" fw={600} c="dimmed" mb="sm">MARKETS & STATIONS</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.markets.map((market, idx) => (
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
      </SimpleGrid>

      {/* Second Row - Pacing Charts | Guidelines & Delivery Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '16px' }}>
        {/* Left - Pacing Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PacingChart 
            title="Pacing: Impressions"
            maxValue={data.progressGoal}
            currentValue={data.deliveredImpressions}
            formatValue={formatNumber}
            progressPercent={data.progressPercent}
          />
          <PacingChart 
            title="Pacing: Budget"
            maxValue={data.totalBudget}
            currentValue={data.deliveredSpend}
            formatValue={formatCurrency}
            unit="$"
            progressPercent={budgetProgress}
          />
        </div>

        {/* Right - Guidelines & Delivery Metrics stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
          {/* Guidelines */}
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', flex: 1 }}>
            <Text size="xs" fw={600} c="dimmed" mb="sm">GUIDELINES</Text>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div>
                <Text size="xs" c="dimmed">Flight</Text>
                <Text size="sm">{data.flight}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Audience</Text>
                <Text size="sm">{data.audience}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Spot Length</Text>
                <Text size="sm">{spotLengthDisplay}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Language</Text>
                <Text size="sm">{data.language}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Dayparts</Text>
                <Text size="sm">{data.dayparts}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Genres</Text>
                <Text size="sm">{data.genres}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Fluidity</Text>
                <Text size="sm">Max {data.fluidity}%</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Exclusions</Text>
                <Text size="sm">{data.exclusions > 0 ? `${data.exclusions} program(s)` : 'None'}</Text>
              </div>
            </div>
          </div>

          {/* Delivery Metrics */}
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', flex: 1 }}>
            <Group justify="space-between" mb="sm">
              <Text size="xs" fw={600} c="dimmed">DELIVERY METRICS</Text>
              {showSparkline && (
                <div style={{ width: '200px' }}>
                  <DeliverySparkline data={data.sparkline.slice(-7)} />
                </div>
              )}
            </Group>
            <SimpleGrid cols={4} spacing="md">
              <SummaryItem label="Delivered Impressions" value={formatNumber(data.deliveredImpressions)} />
              <SummaryItem label="Delivered Spend" value={formatCurrency(data.deliveredSpend)} />
              <SummaryItem label="Remaining Impressions" value={formatNumber(data.remainingImpression)} />
              <SummaryItem label="Remaining Budget" value={formatCurrency(data.remainingBudget)} />
            </SimpleGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailView;
