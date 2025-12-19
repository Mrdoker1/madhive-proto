'use client';

import React, { useState, useEffect } from 'react';
import { Textarea, Text, Radio, Stack } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGoalData } from '@/store/slices/campaignSlice';

interface GoalSectionProps {
  className?: string;
}

interface GoalOption {
  value: string;
  label: string;
  description: string;
  disabled: boolean;
}

const GoalSection: React.FC<GoalSectionProps> = ({
  className = ''
}) => {
  const dispatch = useAppDispatch();
  const globalGoalData = useAppSelector((state) => state.campaign.goal);
  
  const [goal, setGoal] = useState('');
  const [selectedObjective, setSelectedObjective] = useState<string>('maximize-impressions');

  // Synchronize local state with global on load
  useEffect(() => {
    setSelectedObjective(globalGoalData.goalType || 'maximize-impressions');
    setGoal(globalGoalData.goalMetric || '');
  }, [globalGoalData]);

  // Set default objective on mount if not already set
  useEffect(() => {
    if (!globalGoalData.goalType) {
      dispatch(updateGoalData({ goalType: 'maximize-impressions' }));
    }
  }, []);

  const goalOptions: GoalOption[] = [
    { 
      value: 'maximize-impressions', 
      label: 'Maximize Impressions', 
      description: 'Deliver your campaign impressions using the most efficient units from each supplier within the parameters you set.',
      disabled: false
    },
    { 
      value: 'maximize-reach', 
      label: 'Maximize Reach', 
      description: 'Deliver your campaign to the most local viewers to create awareness.',
      disabled: true
    },
    { 
      value: 'maximize-conversions', 
      label: 'Maximize Conversions', 
      description: 'Drive performance by adding a pixel to your website.',
      disabled: true
    }
  ];

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newGoal = event.target.value;
    setGoal(newGoal);
    dispatch(updateGoalData({ goalMetric: newGoal }));
  };

  const handleObjectiveChange = (value: string) => {
    // Only allow selection of enabled options
    const option = goalOptions.find(o => o.value === value);
    if (option && !option.disabled) {
      setSelectedObjective(value);
      dispatch(updateGoalData({ goalType: value }));
    }
  };

  return (
    <div className={className}>
      {/* Campaign Objectives */}
      <div style={{ marginBottom: '24px' }}>
        <Text size="sm" fw={500} mb="md">
          Campaign Objective <span style={{ color: 'red' }}>*</span>
        </Text>
        <Radio.Group
          value={selectedObjective}
          onChange={handleObjectiveChange}
        >
          <Stack gap="md">
            {goalOptions.map((option) => (
              <div 
                key={option.value}
                style={{ 
                  padding: '16px',
                  borderRadius: '8px',
                  border: `1px solid ${selectedObjective === option.value ? '#E879A9' : '#E5E7EB'}`,
                  backgroundColor: option.disabled ? '#F9FAFB' : (selectedObjective === option.value ? '#FDF2F8' : '#FFFFFF'),
                  opacity: option.disabled ? 0.6 : 1,
                  cursor: option.disabled ? 'not-allowed' : 'pointer'
                }}
                onClick={() => !option.disabled && handleObjectiveChange(option.value)}
              >
                <Radio
                  value={option.value}
                  label={
                    <div>
                      <Text size="sm" fw={500} style={{ color: option.disabled ? '#9CA3AF' : '#000' }}>
                        {option.label}
                        {option.disabled && <Text component="span" size="xs" c="dimmed" ml="xs">(Coming Soon)</Text>}
                      </Text>
                      <Text size="xs" c={option.disabled ? 'dimmed' : 'gray'} mt={4}>
                        {option.description}
                      </Text>
                    </div>
                  }
                  disabled={option.disabled}
                  styles={{
                    radio: {
                      cursor: option.disabled ? 'not-allowed' : 'pointer'
                    }
                  }}
                />
              </div>
            ))}
          </Stack>
        </Radio.Group>
      </div>

      {/* Goal Textarea */}
      <Textarea
        label="Campaign Goal"
        placeholder="Describe the main goal and objectives of this campaign..."
        value={goal}
        onChange={handleGoalChange}
        minRows={4}
        maxRows={8}
        autosize
      />
    </div>
  );
};

export default GoalSection;