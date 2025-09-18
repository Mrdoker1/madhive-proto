import { Select } from '@mantine/core';

const DaypartsSection = () => {
  const daypartOptions = [
    'Prime Time (8PM-11PM)',
    'Early Morning (6AM-9AM)',
    'Daytime (9AM-4PM)', 
    'Early Fringe (4PM-6PM)',
    'Access (6PM-8PM)',
    'Late Night (11PM-2AM)',
    'Overnight (2AM-6AM)'
  ];

  return (
    <div>
      <Select
        label="Daypart"
        placeholder="Select daypart"
        data={daypartOptions}
        defaultValue="Prime Time (8PM-11PM)"
        clearable
      />
    </div>
  );
};

export default DaypartsSection;
