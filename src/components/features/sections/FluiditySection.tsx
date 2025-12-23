'use client';

import { useState, useEffect } from 'react';
import { NumberInput, Text, Slider, Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

interface FluiditySectionProps {
  className?: string;
}

const FluiditySection: React.FC<FluiditySectionProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const fluidityPercentage = useAppSelector((state) => state.campaign.general.fluidityPercentage);
  
  // Local state with default to 0%
  const [percentage, setPercentage] = useState<number>(fluidityPercentage ?? 0);

  // Sync with Redux on mount
  useEffect(() => {
    if (fluidityPercentage !== undefined) {
      setPercentage(fluidityPercentage);
    }
  }, [fluidityPercentage]);

  // Save to Redux when value changes
  const handlePercentageChange = (value: number | string) => {
    const numValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    const clampedValue = Math.max(0, Math.min(5, numValue));
    setPercentage(clampedValue);
    dispatch(updateGeneralData({ fluidityPercentage: clampedValue }));
  };

  return (
    <div className={className}>
      <Text size="sm" c="dimmed" mb="lg">
        Fluidity allows your media supplier to partially fulfil the campaign using premium CTV and OTT inventory that also meets the linear guidelines you have input.
      </Text>

      <Group align="flex-end" gap="xl">
        <div style={{ flex: 1, maxWidth: '300px' }}>
          <Text size="sm" fw={500} mb={8}>Allowed Fluidity Percentage</Text>
          <Slider
            value={percentage}
            onChange={handlePercentageChange}
            min={0}
            max={5}
            step={0.5}
            marks={[
              { value: 0, label: '0%' },
              { value: 1, label: '1%' },
              { value: 2, label: '2%' },
              { value: 3, label: '3%' },
              { value: 4, label: '4%' },
              { value: 5, label: '5%' },
            ]}
            label={(value) => `${value}%`}
            color="var(--primary-color)"
            styles={{
              markLabel: {
                fontSize: '11px',
                marginTop: '4px'
              }
            }}
          />
        </div>

        <NumberInput
          value={percentage}
          onChange={handlePercentageChange}
          min={0}
          max={5}
          step={0.5}
          suffix="%"
          allowNegative={false}
          decimalScale={1}
          clampBehavior="strict"
          w={100}
          styles={{
            input: {
              textAlign: 'center',
              fontSize: '14px'
            }
          }}
        />
      </Group>

      {percentage > 0 && (
        <Text size="xs" c="dimmed" mt="lg">
          Up to {percentage}% of your campaign budget may be fulfilled using premium CTV/OTT inventory.
        </Text>
      )}

      {percentage === 0 && (
        <Text size="xs" c="dimmed" mt="lg">
          Your campaign will be fulfilled exclusively using traditional linear TV inventory.
        </Text>
      )}
    </div>
  );
};

export default FluiditySection;

