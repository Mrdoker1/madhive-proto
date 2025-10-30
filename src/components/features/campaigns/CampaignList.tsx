'use client';

import React from 'react';
import CampaignListItem from './CampaignListItem';
import type { CampaignSummary } from '@/data/campaignsData';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';

type SortField = 'status' | 'name' | 'progressPercent' | 'pacingPercent' | 'deliveredImpressions' | 'deliveredSpend' | 'remainingImpression' | 'remainingBudget';
type SortDirection = 'asc' | 'desc';

interface CampaignListProps {
  items: CampaignSummary[];
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSort?: (field: SortField) => void;
}

export default function CampaignList({ items, sortField, sortDirection, onSort }: CampaignListProps) {
  const nameColWidth = 220; // px
  const statusColWidth = 160; // px

  // Component for sort indicator
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' 
      ? <IconChevronUp size={14} style={{ marginLeft: '4px', display: 'inline' }} />
      : <IconChevronDown size={14} style={{ marginLeft: '4px', display: 'inline' }} />;
  };

  // Function to create clickable header
  const SortableHeader = ({ field, children, style }: { field: SortField; children: React.ReactNode; style?: React.CSSProperties }) => {
    return (
      <div 
        style={{ 
          ...style,
          cursor: 'pointer', 
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={() => onSort?.(field)}
      >
        {children}
        <SortIndicator field={field} />
      </div>
    );
  };

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', fontSize: '12px', position: 'relative', overflowX: 'auto', overflowY: 'hidden', background: 'transparent' }}>

      {/* Header Row */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `${nameColWidth}px ${statusColWidth}px 160px 240px 300px 220px 160px 160px 160px 160px`,
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
        <div style={{ position: 'sticky', left: '0', zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }}>
          <SortableHeader field="name">Name</SortableHeader>
        </div>
        <div style={{ position: 'sticky', left: `${nameColWidth}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', borderRight: '1px solid var(--border-color)' }}>
          <SortableHeader field="status">Pacing Status</SortableHeader>
        </div>
        <div style={{ paddingLeft: '20px' }}>Delivered in Last 7 days</div>
        <div style={{ paddingLeft: '20px' }}>Channels</div>
        <div style={{ paddingLeft: '20px' }}>
          <SortableHeader field="progressPercent">Progress (Delivered/Goal)</SortableHeader>
        </div>
        <div>
          <SortableHeader field="pacingPercent">Pacing% (Delivered/Pacing Target)</SortableHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <SortableHeader field="deliveredImpressions" style={{ justifyContent: 'flex-end' }}>Delivered Impression</SortableHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <SortableHeader field="deliveredSpend" style={{ justifyContent: 'flex-end' }}>Delivered Spend($)</SortableHeader>
        </div>
        <div style={{ textAlign: 'right' }}>
          <SortableHeader field="remainingImpression" style={{ justifyContent: 'flex-end' }}>Remaining Impression</SortableHeader>
        </div>
        <div style={{ textAlign: 'right', paddingRight: '16px' }}>
          <SortableHeader field="remainingBudget" style={{ justifyContent: 'flex-end' }}>Remaining Budget($)</SortableHeader>
        </div>
      </div>

      {/* Left cover no longer needed — background and high z-index on sticky columns */}

      {/* Items */}
      {items.map((c) => (
        <CampaignListItem key={c.id} c={c} />
      ))}
    </div>
  );
}


