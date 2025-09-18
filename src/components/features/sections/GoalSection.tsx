'use client';

import React, { useState } from 'react';
import { Textarea, Select } from '@mantine/core';

interface GoalSectionProps {
  className?: string;
}

const GoalSection: React.FC<GoalSectionProps> = ({
  className = ''
}) => {
  const [goal, setGoal] = useState('');
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

  const campaignObjectives = [
    { value: 'brand-awareness', label: 'Brand Awareness' },
    { value: 'maximize-reach', label: 'Maximize Reach' },
    { value: 'achieve-grp-goal', label: 'Achieve GRP Goal' }
  ];

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };

  return (
    <div className={className}>
      {/* Campaign Objectives Select */}
      <Select
        label="Campaign Objectives"
        placeholder="- Select campaign objective -"
        data={campaignObjectives}
        value={selectedObjective}
        onChange={setSelectedObjective}
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