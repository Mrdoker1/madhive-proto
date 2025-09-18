import { Select } from '@mantine/core';

const AudiencesSection = () => {
  const audienceOptions = [
    'Adults 18-34',
    'Adults 25-54', 
    'Adults 35-64',
    'Adults 55+',
    'Women 18-34',
    'Women 25-54',
    'Men 18-34',
    'Men 25-54'
  ];

  return (
    <div>
      <Select
        label="Target Audience"
        placeholder="Select target audience"
        data={audienceOptions}
        defaultValue="Adults 25-54"
        clearable
      />
    </div>
  );
};

export default AudiencesSection;
