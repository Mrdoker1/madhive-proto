'use client';

import React from 'react';
import { Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import type { ValidationState } from '../types';

interface PercentageWarningProps {
  validation: ValidationState;
}

const PercentageWarning: React.FC<PercentageWarningProps> = ({ validation }) => {
  const { totalPercentage, hasSubMarketOverallocation, isOverHundredPercent } = validation;

  if (!isOverHundredPercent) return null;

  return (
    <Alert 
      icon={<IconAlertTriangle size={16} />}
      title="Budget Allocation Warning"
      color="orange"
      style={{ marginBottom: '20px' }}
    >
      {totalPercentage > 100 && hasSubMarketOverallocation ? (
        <>
          Total budget allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
          Additionally, some stations exceed 100% budget allocation within their parent markets. 
          Please adjust both main market and station percentages to resolve this issue.
        </>
      ) : totalPercentage > 100 ? (
        <>
          Total budget allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
          Please reduce the main market percentages to ensure they total 100% or less.
        </>
      ) : (
        <>
          Some stations exceed 100% budget allocation within their parent markets. 
          Please adjust the station percentages to ensure they do not exceed 100% per market.
        </>
      )}
    </Alert>
  );
};

export default PercentageWarning;
