'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Text, ActionIcon, TextInput, Tooltip } from '@mantine/core';
import { IconTrash, IconCurrencyDollar } from '@tabler/icons-react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useRedux';
import { ChannelSliderProps } from './types';
import { SimpleSlider } from './SimpleSlider';
import { formatCurrency, parseNumericValue } from './utils';

export const ChannelSlider: React.FC<ChannelSliderProps> = ({ 
  allocation, 
  onBudgetChange, 
  onRemove,
  isLoading = false 
}) => {
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 390250;
  
  // Local state for input
  const [inputValue, setInputValue] = useState(formatCurrency(allocation.budget));
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Synchronize local state with external value
  useEffect(() => {
    if (!isInputFocused) {
      setInputValue(formatCurrency(allocation.budget));
    }
  }, [allocation.budget, isInputFocused]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    const numericValue = parseNumericValue(inputValue);
    onBudgetChange(allocation.id, numericValue);
    setInputValue(formatCurrency(numericValue));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    // On focus, show raw numeric value
    setInputValue(allocation.budget.toString());
  };

  const handleSliderChange = (value: number) => {
    onBudgetChange(allocation.id, value);
  };

  const handleRemove = () => {
    onRemove(allocation.id);
  };

  // Calculate budget percentage
  const budgetPercent = totalBudget > 0 ? (allocation.budget / totalBudget) * 100 : 0;
  const isLowBudget = budgetPercent < 10 && budgetPercent > 0;

  return (
    <Tooltip
      label="Think about reallocate"
      disabled={!isLowBudget}
      position="top"
      withArrow
    >
      <motion.div 
        style={{ 
          marginBottom: '32px',
          backgroundColor: isLowBudget ? '#FFF5FB' : 'transparent',
          padding: '8px',
          borderRadius: '8px',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {/* All elements in one row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'nowrap',
          minHeight: '40px' // Minimum height for alignment
        }}>
        {/* Channel icon - 32px black */}
        <Image
          src={`/assets/icons/channels/${allocation.id}.svg`}
          alt={allocation.name}
          width={32}
          height={32}
          style={{ filter: 'brightness(0)', flexShrink: 0, marginRight: '8px' }} // Makes icon black + 8px margin
        />
        
        {/* Channel name - 12px */}
        <Text size="12px" fw={500} c="#1F2937" style={{ minWidth: '80px', flexShrink: 0, marginRight: '16px' }}>
          {allocation.name}
        </Text>
        
        {/* Budget input field */}
        <TextInput
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          leftSection={<IconCurrencyDollar size={16} color="#666" />}
          w={140}
          styles={{
            input: {
              fontSize: '14px',
              padding: '12px 16px',
              paddingLeft: '40px', // Add padding for icon
              border: '1px solid var(--form-input-border)',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF'
            }
          }}
          style={{ flexShrink: 0, marginRight: '16px' }}
        />
        
        {/* Slider takes all available space */}
        <div style={{ 
          flex: 1, 
          minWidth: '200px', 
          marginRight: '16px'
        }}>
          {/* Metrics above slider */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '4px'
          }}>
            <span>
              Max Reach: {isLoading ? '...' : allocation.maxReach.toLocaleString()}
            </span>
            <span>
              Reach%: {isLoading ? '...' : `${allocation.reachPercent}%`}
            </span>
          </div>
          
          <SimpleSlider
            value={allocation.budget}
            max={totalBudget}
            step={100} // Step of 100 dollars for precise control
            color={allocation.color} // Keep original channel color
            onChange={handleSliderChange}
          />
        </div>
        
        {/* Delete button */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={handleRemove}
          style={{ flexShrink: 0 }}
        >
          <IconTrash size={16} />
        </ActionIcon>
        </div>
      </motion.div>
    </Tooltip>
  );
};
