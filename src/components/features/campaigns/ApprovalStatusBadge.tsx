'use client';

import React from 'react';
import { Badge } from '@mantine/core';
import type { ApprovalStatus } from '@/data/campaignsData';
import { approvalStatusColor } from '@/data/campaignsData';

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const color = approvalStatusColor[status];
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

export default ApprovalStatusBadge;
