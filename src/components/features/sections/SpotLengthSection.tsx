'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Text, TextInput, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

interface SpotLengthSectionProps {
  className?: string;
}

const SpotLengthSection: React.FC<SpotLengthSectionProps> = ({
  className = ''
}) => {
  const dispatch = useAppDispatch();
  const spotLengthMix = useAppSelector((state) => state.campaign.general.spotLengthMix);
  
  const [values, setValues] = useState({
    fifteen: spotLengthMix?.fifteen || 0,
    thirty: spotLengthMix?.thirty || 0,
    sixty: spotLengthMix?.sixty || 100
  });

  // Sync with Redux on mount
  useEffect(() => {
    if (spotLengthMix) {
      setValues({
        fifteen: spotLengthMix.fifteen,
        thirty: spotLengthMix.thirty,
        sixty: spotLengthMix.sixty
      });
    }
  }, [spotLengthMix]);

  // Calculate total percentage
  const total = values.fifteen + values.thirty + values.sixty;

  // Validate and save to Redux
  const saveToRedux = useCallback((newValues: typeof values) => {
    dispatch(updateGeneralData({ 
      spotLengthMix: newValues,
      spotLength: [
        ...(newValues.fifteen > 0 ? ['15'] : []),
        ...(newValues.thirty > 0 ? ['30'] : []),
        ...(newValues.sixty > 0 ? ['60'] : [])
      ]
    }));
  }, [dispatch]);

  const handleChange = (field: keyof typeof values, value: string) => {
    const numValue = parseFloat(value) || 0;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    
    const newValues = {
      ...values,
      [field]: clampedValue
    };
    
    setValues(newValues);
    saveToRedux(newValues);
  };

  return (
    <div className={className}>
      {/* Spot Length Inputs */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        {/* :15 */}
        <div style={{ flex: 1, maxWidth: '120px' }}>
          <Tooltip label=":15 = 60% of :30 rate" position="top" withArrow>
            <Text size="sm" fw={500} mb={8} style={{ cursor: 'help' }}>
              :15
            </Text>
          </Tooltip>
          <TextInput
            value={values.fifteen.toString()}
            onChange={(e) => handleChange('fifteen', e.currentTarget.value)}
            placeholder="0"
            type="number"
            min={0}
            max={100}
            rightSection={<Text size="sm" c="dimmed">%</Text>}
            styles={{
              input: {
                textAlign: 'center',
                paddingRight: '32px'
              }
            }}
          />
        </div>

        {/* :30 */}
        <div style={{ flex: 1, maxWidth: '120px' }}>
          <Tooltip label=":30 = standard rate" position="top" withArrow>
            <Text size="sm" fw={500} mb={8} style={{ cursor: 'help' }}>
              :30
            </Text>
          </Tooltip>
          <TextInput
            value={values.thirty.toString()}
            onChange={(e) => handleChange('thirty', e.currentTarget.value)}
            placeholder="0"
            type="number"
            min={0}
            max={100}
            rightSection={<Text size="sm" c="dimmed">%</Text>}
            styles={{
              input: {
                textAlign: 'center',
                paddingRight: '32px'
              }
            }}
          />
        </div>

        {/* :60 */}
        <div style={{ flex: 1, maxWidth: '120px' }}>
          <Tooltip label=":60 = 200% of :30 rate" position="top" withArrow>
            <Text size="sm" fw={500} mb={8} style={{ cursor: 'help' }}>
              :60
            </Text>
          </Tooltip>
          <TextInput
            value={values.sixty.toString()}
            onChange={(e) => handleChange('sixty', e.currentTarget.value)}
            placeholder="0"
            type="number"
            min={0}
            max={100}
            rightSection={<Text size="sm" c="dimmed">%</Text>}
            styles={{
              input: {
                textAlign: 'center',
                paddingRight: '32px'
              }
            }}
          />
        </div>

        {/* Total */}
        <Tooltip 
          label="Total must equal 100%" 
          position="top" 
          withArrow
          color={total === 100 ? 'green' : 'red'}
        >
          <Text 
            size="sm" 
            fw={600} 
            c={total === 100 ? 'green' : 'red'}
            style={{ 
              paddingBottom: '10px',
              cursor: 'help'
            }}
          >
            = {total}%
          </Text>
        </Tooltip>

        {/* Info icon */}
        <Tooltip 
          label=":30 is the standard rate. :15 = 60% of :30, :60 = 200% of :30" 
          position="top" 
          withArrow
          multiline
          w={220}
        >
          <IconInfoCircle 
            size={18} 
            color="#999" 
            style={{ marginBottom: '10px', cursor: 'help' }} 
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SpotLengthSection;

