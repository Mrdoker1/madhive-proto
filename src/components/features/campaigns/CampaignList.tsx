'use client';

import React from 'react';
import CampaignListItem from './CampaignListItem';
import type { CampaignSummary } from '@/data/campaignsData';

export default function CampaignList({ items }: { items: CampaignSummary[] }) {
  const nameColWidth = 220; // px
  const statusColWidth = 160; // px
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
        <div style={{ position: 'sticky', left: '0', zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }}>Name</div>
        <div style={{ position: 'sticky', left: `${nameColWidth}px`, zIndex: 1, background: 'var(--header-background)', paddingLeft: '16px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', borderRight: '1px solid var(--border-color)' }}>Pacing Status</div>
        <div style={{ paddingLeft: '20px' }}>Delivered in Last 7 days</div>
        <div style={{ paddingLeft: '20px' }}>Channels</div>
        <div style={{ paddingLeft: '20px' }}>Progress (Delivered/Goal)</div>
        <div>Pacing% (Delivered/Pacing Target)</div>
        <div style={{ textAlign: 'right' }}>Delivered Impression</div>
        <div style={{ textAlign: 'right' }}>Delivered Spend($)</div>
        <div style={{ textAlign: 'right' }}>Remaining Impression</div>
        <div style={{ textAlign: 'right', paddingRight: '16px' }}>Remaining Budget($)</div>
      </div>

      {/* Left cover больше не нужен — фон и высокий z-index на sticky колонках */}

      {/* Items */}
      {items.map((c) => (
        <CampaignListItem key={c.id} c={c} />
      ))}
    </div>
  );
}


