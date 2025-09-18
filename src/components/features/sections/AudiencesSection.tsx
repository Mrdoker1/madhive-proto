import { Checkbox, Text, Grid } from '@mantine/core';
import { useState } from 'react';

const AudiencesSection = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    gender: [],
    age: [],
    income: [],
    education: [],
    householdSize: [],
    children: []
  });

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const audienceCategories = [
    {
      key: 'gender',
      title: 'Gender',
      options: ['Male', 'Female', 'Non-binary']
    },
    {
      key: 'age', 
      title: 'Age',
      options: ['Under 18', '18 - 24', '25 - 34', '35 - 44', '45 - 54', '55 - 64', '65 and over']
    },
    {
      key: 'income',
      title: 'Household Income', 
      options: ['Under $50k', '$50k - $100k', '$100k - $150k', '$150k - $200k', '$200k - $250k', 'Over $250k']
    },
    {
      key: 'education',
      title: 'Education Level',
      options: ['No college', 'High school diploma', "Associate's degree", "Bachelor's degree", "Master's degree"]
    },
    {
      key: 'householdSize',
      title: 'Household Size',
      options: ['No children', 'One child', 'Two children', '>2 children']
    }
  ];

  return (
    <Grid>
      {audienceCategories.map((category) => (
        <Grid.Col key={category.key} span={2.4}>
          <div>
            <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--form-label-color)' }}>
              {category.title}
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {category.options.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  size="sm"
                  checked={selectedOptions[category.key].includes(option)}
                  onChange={(event) => 
                    handleCheckboxChange(category.key, option, event.currentTarget.checked)
                  }
                />
              ))}
            </div>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default AudiencesSection;
