import { Checkbox, Text, Grid } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateAudienceData } from '@/store/slices/campaignSlice';

const AudiencesSection = () => {
  const dispatch = useAppDispatch();
  const audienceData = useAppSelector((state) => state.campaign.audience);

  const handleCheckboxChange = (category: keyof typeof audienceData, value: string, checked: boolean) => {
    const currentValues = audienceData[category] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    
    dispatch(updateAudienceData({ [category]: newValues }));
  };

  const audienceCategories = [
    {
      key: 'gender',
      title: 'Gender',
      options: ['Male', 'Female']
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
      options: ['High school diploma', "Associate's degree", "Bachelor's degree", "Master's degree"]
    },
    {
      key: 'householdSize',
      title: 'Household Size',
      options: ['One child', 'Two children', '>2 children']
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
                  checked={audienceData[category.key as keyof typeof audienceData]?.includes(option) || false}
                  onChange={(event) => 
                    handleCheckboxChange(category.key as keyof typeof audienceData, option, event.currentTarget.checked)
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
