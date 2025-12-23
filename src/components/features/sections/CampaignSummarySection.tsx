'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';
import { Text, Group, Badge, ActionIcon, Tooltip, SimpleGrid } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ReferenceLine, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Daypart definitions for display
const daypartDefinitions = [
  { name: 'Late Fringe', color: '#5C6BC0' },
  { name: 'Overnight', color: '#3F51B5' },
  { name: 'Early Morning', color: '#FFB74D' },
  { name: 'Daytime', color: '#4FC3F7' },
  { name: 'Early Fringe', color: '#FFD54F' },
  { name: 'Prime Access', color: '#9575CD' },
  { name: 'Prime Time', color: '#7E57C2' },
  { name: 'Late News', color: '#5C6BC0' }
];

// Content genre labels
const GENRE_LABELS: Record<string, string> = {
  action: 'Action',
  comedy: 'Comedy',
  documentary: 'Documentary',
  drama: 'Drama',
  news: 'News & Information',
  reality: 'Reality TV',
  scifi: 'Sci-fi & Fantasy',
  sports: 'Sports'
};

interface SummaryCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  editRoute?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, icon, children, editRoute }) => {
  const router = useRouter();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      borderRadius: '8px',
      border: '1px solid #E5E7EB',
      height: '100%'
    }}>
      <Group justify="space-between" mb="sm">
        <Group gap="xs">
          {icon}
          <Text size="sm" fw={600}>{title}</Text>
        </Group>
        {editRoute && (
          <Tooltip label="Edit" position="left">
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={() => router.push(editRoute)}
              style={{ color: '#666' }}
            >
              <IconEdit size={14} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <div>{children}</div>
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: string | React.ReactNode;
  isEmpty?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value, isEmpty }) => (
  <div style={{ marginBottom: '8px' }}>
    <Text size="xs" c="dimmed" mb={2}>{label}</Text>
    {isEmpty ? (
      <Text size="sm" c="dimmed" fs="italic">Not specified</Text>
    ) : (
      <Text component="div" size="sm">{value}</Text>
    )}
  </div>
);

const CampaignSummarySection: React.FC = () => {
  const router = useRouter();
  const campaign = useAppSelector((state) => state.campaign);
  
  // Get stations per market from linearData.broadcastersWithStations
  const stationsPerMarket = React.useMemo(() => {
    const stationsByMarket: Record<string, { name: string; budget: number }[]> = {};
    const broadcasters = campaign.linear.broadcastersWithStations || [];
    
    broadcasters.forEach(broadcaster => {
      broadcaster.stations.forEach(station => {
        if (station.selected) {
          if (!stationsByMarket[station.marketId]) {
            stationsByMarket[station.marketId] = [];
          }
          stationsByMarket[station.marketId].push({
            name: station.name,
            budget: station.budget || 0
          });
        }
      });
    });
    
    return stationsByMarket;
  }, [campaign.linear.broadcastersWithStations]);

  // Format helpers
  const formatCurrency = (amount: number) => {
    if (amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
  };

  // Get spot length mix formatted
  const getSpotLengthDisplay = () => {
    const mix = campaign.general.spotLengthMix;
    if (!mix) return 'Not configured';
    
    const parts = [];
    if (mix.sixty > 0) parts.push(`:60 ${mix.sixty}%`);
    if (mix.thirty > 0) parts.push(`:30 ${mix.thirty}%`);
    if (mix.fifteen > 0) parts.push(`:15 ${mix.fifteen}%`);
    
    return parts.length > 0 ? parts.join('  ') : 'Not configured';
  };

  // Get dayparts with percentages
  const getDaypartDisplay = () => {
    const percentages = campaign.dayparts.daypartPercentages;
    if (!percentages || Object.keys(percentages).length === 0) {
      return 'All dayparts selected';
    }

    // Calculate average percentage per daypart across all days
    const daypartAverages: { name: string; avg: number; color: string }[] = [];
    
    Object.entries(percentages).forEach(([daypartName, days]) => {
      const values = Object.values(days);
      if (values.length > 0) {
        const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        const definition = daypartDefinitions.find(d => d.name === daypartName);
        daypartAverages.push({ 
          name: daypartName, 
          avg, 
          color: definition?.color || '#999' 
        });
      }
    });

    return daypartAverages
      .filter(d => d.avg > 0)
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3)
      .map(d => `${d.name} ${d.avg}%`)
      .join(', ') || 'All dayparts selected';
  };

  // Get genres display
  const getGenresDisplay = () => {
    const genre = campaign.general.contentGenre;
    if (!genre || genre.genres.length === 0) return 'All genres';
    
    const genreNames = genre.genres.map(g => GENRE_LABELS[g] || g);
    const modeText = genre.mode === 'exclude' ? 'Excluding: ' : '';
    return modeText + genreNames.join(', ');
  };

  // Get language display
  const getLanguageDisplay = () => {
    const lang = campaign.general.language;
    if (!lang || lang === 'english') return 'English';
    if (lang === 'spanish') return 'Spanish';
    return lang;
  };

  // Get markets with stations
  const getMarketsDisplay = () => {
    const markets = campaign.markets.marketsDetails || [];
    if (markets.length === 0) return [];
    
    return markets
      .filter(m => m.selected)
      .slice(0, 5)
      .map(market => ({
        id: market.id,
        name: market.name,
        budget: market.budget || 0,
        stations: stationsPerMarket[market.id] || []
      }));
  };

  // Get audience display
  const getAudienceDisplay = () => {
    const { gender, age } = campaign.audience;
    const parts = [];
    
    if (gender.length > 0) {
      parts.push(gender.map(g => g.charAt(0)).join('/'));
    }
    if (age.length > 0) {
      parts.push(age.join(', '));
    }
    
    return parts.join(' ') || 'Not specified';
  };

  // Calculate estimated impressions (mock calculation based on budget and CPM)
  const estimatedImpressions = Math.round((campaign.budget.totalBudget / 17) * 1000);
  const avgCPM = campaign.budget.totalBudget > 0 ? 17.2 : 0;

  // Pacing chart component using Recharts
  const PacingChart: React.FC<{ 
    title: string; 
    maxValue: number; 
    formatValue: (val: number) => string;
    unit?: string;
  }> = ({ title, maxValue, formatValue, unit }) => {
    // Generate mock pacing data points
    const totalPoints = 10;
    const todayIndex = 6; // "Today" is ~60% through
    
    // Build chart data for Recharts with some variation for realistic curves
    const chartData = [];
    // Add small variations to make the curves look more natural
    const variations = [0, 0.02, -0.03, 0.04, -0.02, 0.03, -0.01, 0.02, -0.02, 0.01, 0];
    
    for (let i = 0; i <= totalPoints; i++) {
      const progress = i / totalPoints;
      const variation = variations[i] || 0;
      const planned = (progress + variation * 0.5) * maxValue;
      const actual = i <= todayIndex ? (progress * 0.85 + variation) * maxValue : undefined;
      
      // Calculate date for this point
      let dateLabel = '';
      if (i === 0) {
        dateLabel = formatDate(campaign.flight.startDate) || 'Start';
      } else if (i === totalPoints) {
        dateLabel = formatDate(campaign.flight.endDate) || 'End';
      }
      
      chartData.push({
        index: i,
        planned: Math.max(0, planned),
        actual: actual !== undefined ? Math.max(0, actual) : undefined,
        dateLabel
      });
    }

    // Calculate the x position for "today" line (60% through)
    const todayPosition = `${(todayIndex / totalPoints) * 100}%`;

    return (
      <div style={{ 
        padding: '16px', 
        backgroundColor: 'white', 
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        marginBottom: '16px',
        flex: 1
      }}>
        <Text size="sm" fw={600} mb="xs">{title}</Text>
        <div style={{ position: 'relative' }}>
          {/* Y-axis labels positioned manually */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 8, 
            fontSize: '11px', 
            color: '#666' 
          }}>
            {formatValue(maxValue)}
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: 75, 
            left: 0, 
            fontSize: '11px', 
            color: '#666' 
          }}>
            {unit === '$' ? '$0' : '0'}
          </div>
          
          <ResponsiveContainer width="100%" height={190}>
            <LineChart 
              data={chartData} 
              margin={{ top: 15, right: 10, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey="index"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#666' }}
                ticks={[0, totalPoints]}
                tickFormatter={(value) => {
                  if (value === 0) return formatDate(campaign.flight.startDate) || 'x/x/x';
                  if (value === totalPoints) return formatDate(campaign.flight.endDate) || 'x/x/x';
                  return '';
                }}
              />
              <YAxis 
                domain={[0, maxValue]}
                hide={true}
              />
              <ReferenceLine 
                x={todayIndex} 
                stroke="#999" 
                strokeDasharray="4 4" 
              />
              <Line 
                type="monotone" 
                dataKey="planned" 
                stroke="#666" 
                strokeWidth={2} 
                dot={false}
                name="Planned"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#E91E8A" 
                strokeWidth={2} 
                dot={false}
                name="Actual"
                connectNulls={false}
              />
              <Legend 
                verticalAlign="bottom"
                height={24}
                iconType="plainline"
                wrapperStyle={{ paddingTop: '4px' }}
                formatter={(value) => <span style={{ color: '#666', fontSize: '11px' }}>{value}</span>}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Row - Campaign Details, Goals/Budget, Campaign Status */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {/* Campaign Details */}
        <SummaryCard 
          title="Campaign Details" 
          editRoute="/campaign/linear/new#general-details"
        >
          <SummaryItem label="Advertiser" value={campaign.general.advertiser} isEmpty={!campaign.general.advertiser} />
          <SummaryItem label="Brand" value={campaign.general.brand} isEmpty={!campaign.general.brand} />
          <SummaryItem label="CPE Code" value={campaign.general.cpeCode} isEmpty={!campaign.general.cpeCode} />
          <SummaryItem label="Contact" value={campaign.general.campaignOwner} isEmpty={!campaign.general.campaignOwner} />
          <SummaryItem label="Approver" value={campaign.general.campaignApprover} isEmpty={!campaign.general.campaignApprover} />
        </SummaryCard>

        {/* Goals & Budget */}
        <SummaryCard 
          title="Goals & Budget" 
          editRoute="/campaign/linear/new#goal"
        >
          <SummaryItem 
            label="Goal" 
            value={campaign.goal.goalType === 'maximize-impressions' ? 'Maximum Impressions' : 'Maximum Reach'} 
          />
          <SummaryItem label="Budget" value={formatCurrency(campaign.budget.totalBudget)} />
          <SummaryItem label="Est. Impressions" value={formatNumber(estimatedImpressions)} />
          <SummaryItem label="Avg CPM" value={`$${avgCPM.toFixed(2)}`} />
        </SummaryCard>

        {/* Campaign Status (for future in-flight reporting) */}
        <SummaryCard title="Campaign Status">
          <SummaryItem 
            label="Status" 
            value={<Badge color="yellow" variant="light">Pending Approval</Badge>} 
          />
          <SummaryItem label="Delivery" value="Not started" />
          <SummaryItem label="Impression Pacing" value="—" />
          <SummaryItem label="Budget Pacing" value="—" />
        </SummaryCard>
      </SimpleGrid>

      {/* Second Row - 2 columns: Pacing Charts | Markets & Guidelines */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 1.8fr', 
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column - Pacing Charts */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PacingChart 
            title="Pacing: Impressions" 
            maxValue={estimatedImpressions || 1000000}
            formatValue={(v) => formatNumber(v)}
          />
          <PacingChart 
            title="Pacing: Budget" 
            maxValue={campaign.budget.totalBudget || 60000}
            formatValue={(v) => formatCurrency(v)}
            unit="$"
          />
        </div>

        {/* Right Column - Markets & Stations + Guidelines stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Markets & Stations */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            boxSizing: 'border-box'
          }}>
            <Group justify="space-between" mb="sm">
              <Text size="sm" fw={600}>Markets & Stations</Text>
              <Tooltip label="Edit" position="left">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={() => router.push('/campaign/linear/details#markets')}
                  style={{ color: '#666' }}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            {getMarketsDisplay().length === 0 ? (
              <Text size="sm" c="dimmed" fs="italic">No markets selected</Text>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {getMarketsDisplay().map((market) => (
                  <div key={market.id}>
                    <Group justify="space-between">
                      <Text size="sm" fw={500} style={{ textDecoration: 'underline' }}>
                        {market.name}
                      </Text>
                      <Text size="sm" c="dimmed">{formatCurrency(market.budget)}</Text>
                    </Group>
                    {market.stations.length > 0 && (
                      <Text size="sm" c="dimmed" ml="md">
                        {market.stations.map(s => s.name).join(', ')}
                      </Text>
                    )}
                  </div>
                ))}
                {(campaign.markets.marketsDetails?.filter(m => m.selected).length || 0) > 5 && (
                  <Text size="sm" c="dimmed">
                    +{(campaign.markets.marketsDetails?.filter(m => m.selected).length || 0) - 5} more markets
                  </Text>
                )}
              </div>
            )}
          </div>

          {/* Guidelines - horizontal layout */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            boxSizing: 'border-box'
          }}>
            <Text size="sm" fw={600} mb="sm">Guidelines</Text>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '16px'
            }}>
              {/* Flight */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Flight</Text>
                <Text size="sm">
                  {campaign.flight.startDate 
                    ? `${formatDate(campaign.flight.startDate)} - ${formatDate(campaign.flight.endDate)}`
                    : 'Not specified'}
                </Text>
              </div>

              {/* Audience */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Audience</Text>
                <Text size="sm">{getAudienceDisplay()}</Text>
              </div>

              {/* Spot Length */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Spot Length</Text>
                <Text size="sm">{getSpotLengthDisplay()}</Text>
              </div>

              {/* Language */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Language</Text>
                <Text size="sm">{getLanguageDisplay()}</Text>
              </div>

              {/* Dayparts */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Dayparts</Text>
                <Text size="sm">{getDaypartDisplay()}</Text>
              </div>

              {/* Genres */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Genres</Text>
                <Text size="sm">{getGenresDisplay()}</Text>
              </div>

              {/* Fluidity */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Fluidity</Text>
                <Text size="sm">Max {campaign.general.fluidityPercentage || 0}%</Text>
              </div>

              {/* Excluded Programs */}
              <div>
                <Text size="xs" c="dimmed" mb={2}>Exclusions</Text>
                <Text size="sm">
                  {campaign.general.excludedPrograms && campaign.general.excludedPrograms.length > 0
                    ? `${campaign.general.excludedPrograms.length} program(s)`
                    : 'None'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSummarySection;
