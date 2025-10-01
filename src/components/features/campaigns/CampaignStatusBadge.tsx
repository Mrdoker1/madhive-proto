'use client';

import React from 'react';
import { Badge } from '@mantine/core';
import type { CampaignStatus } from '@/data/campaignsData';
import { statusColor } from '@/data/campaignsData';

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  const color = statusColor[status];
  return (
    <Badge
      variant="filled"
      styles={{
        root: {
          backgroundColor: color,
          color: '#FFFFFF',
          borderRadius: '6px',
          fontSize: '12px',
          padding: '8px 6px',
          fontWeight: 700,
        },
      }}
    >
      {status}
    </Badge>
  );
}

export default CampaignStatusBadge;


