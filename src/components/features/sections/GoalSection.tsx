'use client';

import React, { useState } from 'react';
import { Textarea } from '@mantine/core';

interface GoalSectionProps {
  className?: string;
}

const GoalSection: React.FC<GoalSectionProps> = ({
  className = ''
}) => {
  const [goal, setGoal] = useState('');

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="w-full">
        <Textarea
          placeholder="Describe the main goal and objectives of this campaign..."
          value={goal}
          onChange={handleGoalChange}
          minRows={4}
          maxRows={8}
          autosize
          styles={{
            root: {
              width: '100%'
            },
            input: {
              resize: 'vertical'
            }
          }}
        />
      </div>
    </div>
  );
};

export default GoalSection;