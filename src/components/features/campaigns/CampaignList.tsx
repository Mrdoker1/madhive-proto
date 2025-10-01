'use client';

import React from 'react';
import CampaignListItem from './CampaignListItem';
import type { CampaignSummary } from '@/data/campaignsData';

export default function CampaignList({ items }: { items: CampaignSummary[] }) {
  const nameColWidth = 260; // px
  const statusColWidth = 160; // px
  const dividerLeft = 16 + nameColWidth + statusColWidth; // padding-left + widths
  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', fontSize: '12px', position: 'relative', overflowX: 'auto' }}>
      {/* Vertical divider across the whole table */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${dividerLeft}px`, width: '1px', background: 'var(--border-color)', pointerEvents: 'none' }} />

      {/* Header Row */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `${nameColWidth}px ${statusColWidth}px 160px 240px 360px 220px 180px`,
          height: '44px',
          paddingLeft: '16px',
          paddingRight: '16px',
          backgroundColor: 'var(--header-background)',
          color: '#6b7280',
          fontSize: '12px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ position: 'sticky', left: '16px', zIndex: 2, background: 'var(--header-background)' }}>Name</div>
        <div style={{ position: 'sticky', left: `${16 + nameColWidth}px`, zIndex: 2, background: 'var(--header-background)', paddingRight: '12px' }}>Pacing Status</div>
        <div style={{ paddingLeft: '20px' }}>Delivered by Days</div>
        <div style={{ paddingLeft: '20px' }}>Channels</div>
        <div style={{ paddingLeft: '20px' }}>Progress (Total Delivered/Goal)</div>
        <div>Pacing% (Delivered/Pacing Target)</div>
        <div style={{ textAlign: 'right' }}>Delivered Impression</div>
      </div>

      {/* Items */}
      {items.map((c) => (
        <CampaignListItem key={c.id} c={c} />
      ))}
    </div>
  );
}


