'use client';

import React from 'react';
import Link from 'next/link';
import { Progress } from '@mantine/core';
import { Line, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import type { CampaignSummary } from '@/data/campaignsData';
import { CampaignStatusBadge } from './CampaignStatusBadge';

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export default function CampaignListItem({ c }: { c: CampaignSummary }) {
  const data = c.sparkline.map((v, i) => ({ i, v }));
  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: '260px 160px 160px 240px 360px 220px 180px',
        height: '72px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '12px'
      }}
    >
      {/* Name */}
      <div style={{ position: 'sticky', left: '16px', zIndex: 1, background: '#FFFFFF' }}>
        <Link href="#" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '12px' }}>
          {c.name}
        </Link>
      </div>

      {/* Pacing Status */}
      <div style={{ position: 'sticky', left: '276px', zIndex: 1, background: '#FFFFFF', paddingRight: '12px' }}>
        <CampaignStatusBadge status={c.status} />
      </div>

      {/* Delivered by Days */}
      <div style={{ width: '150px', height: '40px', paddingLeft: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, bottom: 0, left: 0, right: 0 }}>
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="none" fill="url(#sparkGradient)" />
            <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Channels */}
      <div className="flex flex-wrap items-center" style={{ gap: '6px', paddingLeft: '20px' }}>
        {c.channels.map((ch) => (
          <span
            key={ch}
            style={{
              background: '#F8E9F3',
              padding: '2px 6px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Progress (bar + label below) */}
      <div style={{ paddingLeft: '20px' }}>
        <div style={{ width: '200px' }}>
          <Progress 
            value={c.progressPercent} 
            size="lg" 
            radius="xl" 
            color="#5C6370" 
            styles={{ 
              root: { background: '#E5E7EB' },
            }} 
          />
        </div>
        <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '6px' }}>
          <span style={{ color: '#000000', fontWeight: 700 }}>
            {c.progressPercent.toFixed(2)}%
          </span>
          <span style={{ color: '#5C6370', fontWeight: 500 }}> ({formatNumber(c.progressDelivered)} / {formatNumber(c.progressGoal)})</span>
        </div>
      </div>

      {/* Pacing % */}
      <div>
        <div style={{ fontWeight: 600, fontSize: '12px' }}>{c.pacingPercent.toFixed(2)}%</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>({formatNumber(c.pacingDelivered)} / {formatNumber(c.pacingTarget)})</div>
      </div>

      {/* Delivered Impression */}
      <div style={{ textAlign: 'right', fontSize: '12px' }}>{formatNumber(c.deliveredImpressions)}</div>
    </div>
  );
}


