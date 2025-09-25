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
      title="Percentage Allocation Warning"
      color="orange"
      style={{ marginBottom: '20px' }}
    >
      {totalPercentage > 100 && hasSubMarketOverallocation ? (
        <>
          Total percentage allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
          Additionally, some sub-markets exceed 100% allocation within their parent markets. 
          Please adjust the percentages accordingly.
        </>
      ) : totalPercentage > 100 ? (
        <>
          Total percentage allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
          Please adjust the percentages to ensure they do not exceed 100% in total.
        </>
      ) : (
        <>
          Some sub-markets exceed 100% allocation within their parent markets. 
          Please adjust the sub-market percentages to ensure they do not exceed 100% per market.
        </>
      )}
    </Alert>
  );
};

export default PercentageWarning;
