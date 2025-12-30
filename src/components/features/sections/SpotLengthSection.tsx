'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Text, NumberInput, Tooltip } from '@mantine/core';
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
    thirty: spotLengthMix?.thirty || 100,
    sixty: spotLengthMix?.sixty || 0
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

  const handleChange = (field: keyof typeof values, value: string | number) => {
    const numValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
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
      {/* Description */}
      <Text size="sm" c="dimmed" mb="md">
      Allocate budget across spot durations.
      </Text>

      {/* Spot Length Inputs */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        {/* :15 */}
        <div style={{ flex: 1, maxWidth: '120px' }}>
          <Tooltip label=":15 = 60% of :30 rate" position="top" withArrow>
            <Text size="sm" fw={500} mb={8} style={{ cursor: 'help' }}>
              :15
            </Text>
          </Tooltip>
          <NumberInput
            value={values.fifteen}
            onChange={(value) => handleChange('fifteen', value)}
            placeholder="0"
            min={0}
            max={100}
            step={1}
            suffix="%"
            allowNegative={false}
            clampBehavior="strict"
            styles={{
              input: {
                textAlign: 'center'
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
          <NumberInput
            value={values.thirty}
            onChange={(value) => handleChange('thirty', value)}
            placeholder="0"
            min={0}
            max={100}
            step={1}
            suffix="%"
            allowNegative={false}
            clampBehavior="strict"
            styles={{
              input: {
                textAlign: 'center'
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
          <NumberInput
            value={values.sixty}
            onChange={(value) => handleChange('sixty', value)}
            placeholder="0"
            min={0}
            max={100}
            step={1}
            suffix="%"
            allowNegative={false}
            clampBehavior="strict"
            styles={{
              input: {
                textAlign: 'center'
              }
            }}
          />
        </div>

        {/* Total */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ height: '22px' }}></div>
          <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
            <Text size="sm" fw={500}>
              = {total}%
            </Text>
          </div>
        </div>

        </div>

      {/* Hint message */}
      {total !== 100 && (
        <Text size="xs" c="red" mt="sm">
          Total must equal 100% (currently {total}%)
        </Text>
      )}
    </div>
  );
};

export default SpotLengthSection;

