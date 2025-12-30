'use client';

import React from 'react';
import { Text } from '@mantine/core';
import type { ApprovalStatus } from '@/data/campaignsData';
import { approvalStatusColor } from '@/data/campaignsData';

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const color = approvalStatusColor[status];
  return (
    <Text
      component="span"
      style={{
        color: color,
        fontSize: '12px',
        fontWeight: 700,
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: `${color}15`, // 15 = ~8% opacity
        display: 'inline-block',
      }}
    >
      {status}
    </Text>
  );
}

export default ApprovalStatusBadge;
