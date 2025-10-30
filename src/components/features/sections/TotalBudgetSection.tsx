'use client';

import React, { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';

interface TotalBudgetSectionProps {
  className?: string;
  onChange?: (budget: number) => void;
}

const TotalBudgetSection: React.FC<TotalBudgetSectionProps> = ({
  className = '',
  onChange
}) => {
  const dispatch = useAppDispatch();
  const globalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const [totalBudget, setTotalBudget] = useState('');

  // Function to format number with separators
  const formatNumber = (value: string): string => {
    // Remove all non-digit characters except dot
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    // Format integer part with separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Function to parse formatted number
  const parseFormattedNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  // Synchronize local state with global state on load
  useEffect(() => {
    if (globalBudget > 0) {
      setTotalBudget(formatNumber(globalBudget.toString()));
    }
  }, [globalBudget]);

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Remove commas for validation
    const cleanValue = value.replace(/,/g, '');
    
    // Allow only digits and dot for decimal numbers
    if (/^\d*\.?\d*$/.test(cleanValue)) {
      // Save with formatting
      setTotalBudget(formatNumber(cleanValue));
      
      // Update global state
      const numericValue = parseFloat(cleanValue) || 0;
      dispatch(updateBudgetData({ totalBudget: numericValue }));
      
      // Call onChange for backward compatibility
      if (onChange) {
        onChange(numericValue);
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="w-full">
        <TextInput
          placeholder="Enter total budget amount"
          value={totalBudget}
          onChange={handleBudgetChange}
          leftSection={
            <IconCurrencyDollar 
              size={18} 
              style={{ color: '#9CA3AF' }} // Dim gray color
            />
          }
          styles={{
            root: {
              width: '100%'
            },
            input: {
              paddingLeft: '44px', // Additional left padding for icon
            }
          }}
        />
      </div>
    </div>
  );
};

export default TotalBudgetSection;