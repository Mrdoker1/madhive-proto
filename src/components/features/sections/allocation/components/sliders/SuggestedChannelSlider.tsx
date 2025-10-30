'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Text, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Image from 'next/image';

interface SuggestedChannelSliderProps {
  channelId: string;
  channelName: string;
  channelColor: string;
  roiIncrease: number;
  onAdd: (channelId: string) => void;
}

export const SuggestedChannelSlider: React.FC<SuggestedChannelSliderProps> = ({ 
  channelId,
  channelName,
  channelColor,
  roiIncrease,
  onAdd
}) => {
  const handleAdd = () => {
    onAdd(channelId);
  };

  return (
    <motion.div 
      style={{ 
        marginTop: '32px',
        marginBottom: '32px',
        padding: '24px',
        border: '2px dashed #D1D5DB',
        borderRadius: '8px'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      {/* Suggestion text */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <Text size="12px" fw={400} c="#6B7280">
          More channels to consider: Found your target audience on this channel, adding this tactic will increase your ROI by{roiIncrease}%
        </Text>
        <Image
          src="/assets/icons/other/spark.svg"
          alt="AI suggestion"
          width={16}
          height={16}
        />
      </div>

      {/* Channel slider (inactive) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexWrap: 'nowrap',
        minHeight: '40px',
        opacity: 0.7
      }}>
        {/* Channel icon - 32px black */}
        <Image
          src={`/assets/icons/channels/${channelId}.svg`}
          alt={channelName}
          width={32}
          height={32}
          style={{ filter: 'brightness(0)', flexShrink: 0, marginRight: '8px' }}
        />
        
        {/* Channel name - 12px */}
        <Text size="12px" fw={500} c="#1F2937" style={{ minWidth: '80px', flexShrink: 0, marginRight: '16px' }}>
          {channelName}
        </Text>
        
        {/* Budget placeholder */}
        <div style={{
          width: '140px',
          height: '40px',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          backgroundColor: '#F9FAFB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginRight: '16px'
        }}>
          <Text size="14px" c="#9CA3AF">Not allocated</Text>
        </div>
        
        {/* Slider placeholder */}
        <div style={{ 
          flex: 1, 
          minWidth: '200px', 
          marginRight: '16px'
        }}>
          {/* Metrics (hidden) */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            fontSize: '12px',
            color: '#D1D5DB',
            marginBottom: '4px'
          }}>
            <span>Max Reach: ---</span>
            <span>Reach%: ---%</span>
          </div>
          
          {/* Inactive slider */}
          <div style={{
            height: '6px',
            backgroundColor: '#E5E7EB',
            borderRadius: '3px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '0%',
              backgroundColor: channelColor,
              borderRadius: '3px',
              opacity: 0.3
            }} />
          </div>
        </div>
        
        {/* Add button */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={handleAdd}
          style={{ flexShrink: 0 }}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div>
    </motion.div>
  );
};

