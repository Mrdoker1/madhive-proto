'use client';

import React, { useState, useMemo } from 'react';
import CampaignListItem from './CampaignListItem';
import type { CampaignSummary } from '@/data/campaignsData';
import { IconFilter, IconX } from '@tabler/icons-react';
import { Popover, TextInput, Checkbox, NumberInput, Button, Text, Stack, Group } from '@mantine/core';

type SortField = 'status' | 'name' | 'progressPercent' | 'pacingPercent' | 'deliveredImpressions' | 'deliveredSpend' | 'remainingImpression' | 'remainingBudget';
type SortDirection = 'asc' | 'desc';

// All possible statuses
const ALL_STATUSES = ['Not Started', 'On Target', 'Over Pace', 'Way Over Pace', 'Under Pace', 'Way Under Pace', 'Completed'] as const;

// All possible approval statuses
const ALL_APPROVAL_STATUSES = ['Pending', 'Approved'] as const;

// All possible channels
const ALL_CHANNELS = ['Linear TV', 'CTV', 'Social', 'Display', 'Audio', 'Email', 'Search', 'Preroll'] as const;

interface Filters {
  advertiser: string;
  name: string;
  approvalStatuses: string[];
  statuses: string[];
  channels: string[];
  progressMin: number | null;
  progressMax: number | null;
  pacingMin: number | null;
  pacingMax: number | null;
  deliveredImpressionsMin: number | null;
  deliveredImpressionsMax: number | null;
  deliveredSpendMin: number | null;
  deliveredSpendMax: number | null;
  remainingImpressionMin: number | null;
  remainingImpressionMax: number | null;
  remainingBudgetMin: number | null;
  remainingBudgetMax: number | null;
}

const defaultFilters: Filters = {
  advertiser: '',
  name: '',
  approvalStatuses: [],
  statuses: [],
  channels: [],
  progressMin: null,
  progressMax: null,
  pacingMin: null,
  pacingMax: null,
  deliveredImpressionsMin: null,
  deliveredImpressionsMax: null,
  deliveredSpendMin: null,
  deliveredSpendMax: null,
  remainingImpressionMin: null,
  remainingImpressionMax: null,
  remainingBudgetMin: null,
  remainingBudgetMax: null,
};

interface CampaignListProps {
  items: CampaignSummary[];
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSort?: (field: SortField) => void;
  onDeleteCampaign?: (campaignId: string) => void;
  onCancelCampaign?: (campaignId: string) => void;
  onApproveCampaign?: (campaignId: string) => void;
}

export default function CampaignList({ items, sortField, sortDirection, onSort, onDeleteCampaign, onCancelCampaign, onApproveCampaign }: CampaignListProps) {
  const nameColWidth = 220; // px
  const approvalStatusColWidth = 140; // px
  const statusColWidth = 160; // px
  const actionsColWidth = 48; // px for waffle menu
  
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  // Apply filters to items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Advertiser filter (text search)
      if (filters.advertiser && !item.advertiser.toLowerCase().includes(filters.advertiser.toLowerCase())) {
        return false;
      }
      
      // Name filter (text search)
      if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      
      // Approval Status filter (checkboxes)
      if (filters.approvalStatuses.length > 0 && !filters.approvalStatuses.includes(item.approvalStatus)) {
        return false;
      }
      
      // Status filter (checkboxes)
      if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
        return false;
      }
      
      // Channels filter (checkboxes) - show if campaign has ANY of selected channels
      if (filters.channels.length > 0) {
        const hasMatchingChannel = item.channels.some(ch => filters.channels.includes(ch));
        if (!hasMatchingChannel) return false;
      }
      
      // Progress range filter
      if (filters.progressMin !== null && item.progressPercent < filters.progressMin) return false;
      if (filters.progressMax !== null && item.progressPercent > filters.progressMax) return false;
      
      // Pacing range filter
      if (filters.pacingMin !== null && (item.pacingPercent === null || item.pacingPercent < filters.pacingMin)) return false;
      if (filters.pacingMax !== null && (item.pacingPercent === null || item.pacingPercent > filters.pacingMax)) return false;
      
      // Delivered Impressions range filter
      if (filters.deliveredImpressionsMin !== null && item.deliveredImpressions < filters.deliveredImpressionsMin) return false;
      if (filters.deliveredImpressionsMax !== null && item.deliveredImpressions > filters.deliveredImpressionsMax) return false;
      
      // Delivered Spend range filter
      if (filters.deliveredSpendMin !== null && item.deliveredSpend < filters.deliveredSpendMin) return false;
      if (filters.deliveredSpendMax !== null && item.deliveredSpend > filters.deliveredSpendMax) return false;
      
      // Remaining Impression range filter
      if (filters.remainingImpressionMin !== null && item.remainingImpression < filters.remainingImpressionMin) return false;
      if (filters.remainingImpressionMax !== null && item.remainingImpression > filters.remainingImpressionMax) return false;
      
      // Remaining Budget range filter
      if (filters.remainingBudgetMin !== null && item.remainingBudget < filters.remainingBudgetMin) return false;
      if (filters.remainingBudgetMax !== null && item.remainingBudget > filters.remainingBudgetMax) return false;
      
      return true;
    });
  }, [items, filters]);

  // Check if a filter is active
  const isFilterActive = (field: SortField | 'channels' | 'advertiser' | 'approvalStatus'): boolean => {
    switch (field) {
      case 'advertiser': return filters.advertiser !== '';
      case 'name': return filters.name !== '';
      case 'approvalStatus': return filters.approvalStatuses.length > 0;
      case 'status': return filters.statuses.length > 0;
      case 'channels': return filters.channels.length > 0;
      case 'progressPercent': return filters.progressMin !== null || filters.progressMax !== null;
      case 'pacingPercent': return filters.pacingMin !== null || filters.pacingMax !== null;
      case 'deliveredImpressions': return filters.deliveredImpressionsMin !== null || filters.deliveredImpressionsMax !== null;
      case 'deliveredSpend': return filters.deliveredSpendMin !== null || filters.deliveredSpendMax !== null;
      case 'remainingImpression': return filters.remainingImpressionMin !== null || filters.remainingImpressionMax !== null;
      case 'remainingBudget': return filters.remainingBudgetMin !== null || filters.remainingBudgetMax !== null;
      default: return false;
    }
  };

  // Advertiser filter component with Apply button
  const AdvertiserFilterHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
    const active = isFilterActive('advertiser');
    const [opened, setOpened] = useState(false);
    const [localValue, setLocalValue] = useState(filters.advertiser);
    
    const handleOpen = () => {
      setLocalValue(filters.advertiser);
      setOpened(true);
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, advertiser: localValue }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalValue('');
      setFilters(prev => ({ ...prev, advertiser: '' }));
      setOpened(false);
    };
    
    return (
      <Popover width={220} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <TextInput
              placeholder="Search advertiser..."
              size="xs"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            />
            <Group grow gap="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Text filter component with Apply button
  const TextFilterHeader = ({ field, children, style }: { field: 'name'; children: React.ReactNode; style?: React.CSSProperties }) => {
    const active = isFilterActive(field);
    const [opened, setOpened] = useState(false);
    const [localValue, setLocalValue] = useState(filters.name);
    
    const handleOpen = () => {
      setLocalValue(filters.name);
      setOpened(true);
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, name: localValue }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalValue('');
      setFilters(prev => ({ ...prev, name: '' }));
      setOpened(false);
    };
    
    return (
      <Popover width={220} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <TextInput
              placeholder="Search campaign..."
              size="xs"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            />
            <Group grow gap="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Approval Status filter component (checkboxes) with Apply button
  const ApprovalStatusFilterHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
    const active = isFilterActive('approvalStatus');
    const [opened, setOpened] = useState(false);
    const [localStatuses, setLocalStatuses] = useState<string[]>(filters.approvalStatuses);
    
    const handleOpen = () => {
      setLocalStatuses(filters.approvalStatuses);
      setOpened(true);
    };
    
    const toggleStatus = (status: string) => {
      setLocalStatuses(prev => 
        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
      );
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, approvalStatuses: localStatuses }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalStatuses([]);
      setFilters(prev => ({ ...prev, approvalStatuses: [] }));
      setOpened(false);
    };
    
    return (
      <Popover width={200} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <Text size="xs" fw={500} c="dimmed">Filter by approval status</Text>
            {ALL_APPROVAL_STATUSES.map(status => (
              <Checkbox
                key={status}
                label={status}
                size="xs"
                checked={localStatuses.includes(status)}
                onChange={() => toggleStatus(status)}
              />
            ))}
            <Group grow gap="xs" mt="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Status filter component (checkboxes) with Apply button
  const StatusFilterHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
    const active = isFilterActive('status');
    const [opened, setOpened] = useState(false);
    const [localStatuses, setLocalStatuses] = useState<string[]>(filters.statuses);
    
    const handleOpen = () => {
      setLocalStatuses(filters.statuses);
      setOpened(true);
    };
    
    const toggleStatus = (status: string) => {
      setLocalStatuses(prev => 
        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
      );
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, statuses: localStatuses }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalStatuses([]);
      setFilters(prev => ({ ...prev, statuses: [] }));
      setOpened(false);
    };
    
    return (
      <Popover width={200} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <Text size="xs" fw={500} c="dimmed">Filter by status</Text>
            {ALL_STATUSES.map(status => (
              <Checkbox
                key={status}
                label={status}
                size="xs"
                checked={localStatuses.includes(status)}
                onChange={() => toggleStatus(status)}
              />
            ))}
            <Group grow gap="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Channels filter component (checkboxes) with Apply button
  const ChannelsFilterHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
    const active = isFilterActive('channels');
    const [opened, setOpened] = useState(false);
    const [localChannels, setLocalChannels] = useState<string[]>(filters.channels);
    
    const handleOpen = () => {
      setLocalChannels(filters.channels);
      setOpened(true);
    };
    
    const toggleChannel = (channel: string) => {
      setLocalChannels(prev => 
        prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
      );
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, channels: localChannels }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalChannels([]);
      setFilters(prev => ({ ...prev, channels: [] }));
      setOpened(false);
    };
    
    return (
      <Popover width={180} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <Text size="xs" fw={500} c="dimmed">Filter by channel</Text>
            {ALL_CHANNELS.map(channel => (
              <Checkbox
                key={channel}
                label={channel}
                size="xs"
                checked={localChannels.includes(channel)}
                onChange={() => toggleChannel(channel)}
              />
            ))}
            <Group grow gap="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Range filter component (min/max) with Apply button
  const RangeFilterHeader = ({ 
    field, 
    children, 
    style,
    minKey,
    maxKey,
    prefix = '',
    suffix = ''
  }: { 
    field: SortField; 
    children: React.ReactNode; 
    style?: React.CSSProperties;
    minKey: keyof Filters;
    maxKey: keyof Filters;
    prefix?: string;
    suffix?: string;
  }) => {
    const active = isFilterActive(field);
    const [opened, setOpened] = useState(false);
    const [localMin, setLocalMin] = useState<number | null>(filters[minKey] as number | null);
    const [localMax, setLocalMax] = useState<number | null>(filters[maxKey] as number | null);
    
    const handleOpen = () => {
      setLocalMin(filters[minKey] as number | null);
      setLocalMax(filters[maxKey] as number | null);
      setOpened(true);
    };
    
    const handleApply = () => {
      setFilters(prev => ({ ...prev, [minKey]: localMin, [maxKey]: localMax }));
      setOpened(false);
    };
    
    const handleClear = () => {
      setLocalMin(null);
      setLocalMax(null);
      setFilters(prev => ({ ...prev, [minKey]: null, [maxKey]: null }));
      setOpened(false);
    };
    
    return (
      <Popover width={220} position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <div 
            style={{ ...style, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleOpen}
          >
            {children}
            <IconFilter size={12} style={{ marginLeft: '4px', opacity: active ? 1 : 0.4, color: active ? 'var(--primary-color)' : 'currentColor' }} />
          </div>
        </Popover.Target>
        <Popover.Dropdown onClick={(e) => e.stopPropagation()}>
          <Stack gap="xs">
            <Text size="xs" fw={500} c="dimmed">Filter by range</Text>
            <Group grow gap="xs">
              <NumberInput
                placeholder="Min"
                size="xs"
                value={localMin ?? ''}
                onChange={(val) => setLocalMin(val === '' ? null : Number(val))}
                prefix={prefix}
                suffix={suffix}
                thousandSeparator=","
                allowNegative={false}
              />
              <NumberInput
                placeholder="Max"
                size="xs"
                value={localMax ?? ''}
                onChange={(val) => setLocalMax(val === '' ? null : Number(val))}
                prefix={prefix}
                suffix={suffix}
                thousandSeparator=","
                allowNegative={false}
              />
            </Group>
            <Group grow gap="xs">
              <Button size="xs" variant="light" onClick={handleClear}>Clear</Button>
              <Button size="xs" onClick={handleApply}>Apply</Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  };

  // Count active filters
  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof Filters];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value !== '';
    return value !== null;
  }).length;

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', fontSize: '12px', position: 'relative', overflowX: 'auto', overflowY: 'hidden', background: 'transparent' }}>

      {/* Active filters indicator */}
      {activeFiltersCount > 0 && (
        <div style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="xs" c="dimmed">
            {filteredItems.length} of {items.length} campaigns shown
          </Text>
          <Button size="xs" variant="subtle" color="red" onClick={() => setFilters(defaultFilters)}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Header Row */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `${actionsColWidth}px 160px ${nameColWidth}px ${approvalStatusColWidth}px ${statusColWidth}px 160px 300px 220px 160px 160px 160px 160px`,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: 'var(--header-background)',
          color: '#6b7280',
          fontSize: '12px',
          width: 'fit-content'
        }}
      >
        {/* Actions column header */}
        <div style={{ position: 'sticky', left: '0', zIndex: 1, background: 'var(--header-background)', paddingLeft: '8px', paddingRight: '8px', paddingTop: '8px', paddingBottom: '8px' }}>
          {/* Empty header for actions */}
        </div>
        {/* Advertiser column */}
        <div style={{ position: 'sticky', left: `${actionsColWidth}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }}>
          <AdvertiserFilterHeader>Advertiser</AdvertiserFilterHeader>
        </div>
        {/* Campaign name column */}
        <div style={{ position: 'sticky', left: `${actionsColWidth + 160}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }}>
          <TextFilterHeader field="name">Campaign</TextFilterHeader>
        </div>
        {/* Approval Status column */}
        <div style={{ position: 'sticky', left: `${actionsColWidth + 160 + nameColWidth}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }}>
          <ApprovalStatusFilterHeader>Approval Status</ApprovalStatusFilterHeader>
        </div>
        {/* Pacing Status column */}
        <div style={{ position: 'sticky', left: `${actionsColWidth + 160 + nameColWidth + approvalStatusColWidth}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', borderRight: '1px solid var(--border-color)' }}>
          <StatusFilterHeader>Pacing Status</StatusFilterHeader>
        </div>
        <div style={{ paddingLeft: '20px' }}>Delivered in Last 7 days</div>
        <div style={{ paddingLeft: '20px' }}>
          <RangeFilterHeader field="progressPercent" minKey="progressMin" maxKey="progressMax" suffix="%">
            Progress (Delivered/Goal)
          </RangeFilterHeader>
        </div>
        <div>
          <RangeFilterHeader field="pacingPercent" minKey="pacingMin" maxKey="pacingMax" suffix="%">
            Pacing% (Delivered/Pacing Target)
          </RangeFilterHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <RangeFilterHeader field="deliveredImpressions" minKey="deliveredImpressionsMin" maxKey="deliveredImpressionsMax" style={{ justifyContent: 'flex-end' }}>
            Delivered Impression
          </RangeFilterHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <RangeFilterHeader field="deliveredSpend" minKey="deliveredSpendMin" maxKey="deliveredSpendMax" prefix="$" style={{ justifyContent: 'flex-end' }}>
            Delivered Spend($)
          </RangeFilterHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <RangeFilterHeader field="remainingImpression" minKey="remainingImpressionMin" maxKey="remainingImpressionMax" style={{ justifyContent: 'flex-end' }}>
            Remaining Impression
          </RangeFilterHeader>
        </div>
        <div style={{ textAlign: 'right', paddingRight: '16px' }}>
          <RangeFilterHeader field="remainingBudget" minKey="remainingBudgetMin" maxKey="remainingBudgetMax" prefix="$" style={{ justifyContent: 'flex-end' }}>
            Remaining Budget($)
          </RangeFilterHeader>
        </div>
      </div>

      {/* Items */}
      {filteredItems.map((c) => (
        <CampaignListItem 
          key={c.id} 
          c={c} 
          onDeleteCampaign={onDeleteCampaign}
          onCancelCampaign={onCancelCampaign}
          onApproveCampaign={onApproveCampaign}
        />
      ))}

      {/* No results message */}
      {filteredItems.length === 0 && items.length > 0 && (
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <Text size="sm" c="dimmed">No campaigns match the current filters</Text>
          <Button size="xs" variant="subtle" mt="sm" onClick={() => setFilters(defaultFilters)}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}


