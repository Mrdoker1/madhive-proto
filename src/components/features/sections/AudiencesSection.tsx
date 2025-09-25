import { Checkbox, Text, Grid } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateAudienceData } from '@/store/slices/campaignSlice';
import { audienceCategories } from '@/data/audienceData';

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


  return (
    <Grid>
      {audienceCategories.map((category) => (
        <Grid.Col key={category.key} span={2.4}>
          <div>
            <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--form-label-color)' }}>
              {category.title}
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
