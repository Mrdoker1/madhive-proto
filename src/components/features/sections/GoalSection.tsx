'use client';

import React, { useState, useEffect } from 'react';
import { Textarea, Select } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGoalData } from '@/store/slices/campaignSlice';

interface GoalSectionProps {
  className?: string;
}

const GoalSection: React.FC<GoalSectionProps> = ({
  className = ''
}) => {
  const dispatch = useAppDispatch();
  const globalGoalData = useAppSelector((state) => state.campaign.goal);
  
  const [goal, setGoal] = useState('');
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    setSelectedObjective(globalGoalData.goalType || null);
    setGoal(globalGoalData.goalMetric || ''); // используем goalMetric для текстового описания
  }, [globalGoalData]);

  const campaignObjectives = [
    { value: 'brand-awareness', label: 'Brand Awareness' },
    { value: 'maximize-reach', label: 'Maximize Reach' },
    { value: 'achieve-grp-goal', label: 'Achieve GRP Goal' }
  ];

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newGoal = event.target.value;
    setGoal(newGoal);
    dispatch(updateGoalData({ goalMetric: newGoal }));
  };

  const handleObjectiveChange = (value: string | null) => {
    setSelectedObjective(value);
    dispatch(updateGoalData({ goalType: value || '' }));
  };

  return (
    <div className={className}>
      {/* Campaign Objectives Select */}
      <Select
        label="Campaign Objectives"
        placeholder="- Select campaign objective -"
        data={campaignObjectives}
        value={selectedObjective}
        onChange={handleObjectiveChange}
        mb="lg"
      />

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