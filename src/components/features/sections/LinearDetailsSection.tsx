import { MultiSelect, Select } from '@mantine/core';

const LinearDetailsSection = () => {
  const channelOptions = [
    'ABC',
    'CBS', 
    'CW',
    'FOX',
    'Graham Media',
    'Gray',
    'Hearst',
    'NBCU',
    'NBCU Telemundo'
  ];

  const measurementProviders = [
    'Nielsen',
    'Comscore',
    'VideoAmp',
    'iSpot.tv',
    'TVSquared'
  ];

  return (
    <div>
      <MultiSelect
        label="Broadcasters"
        placeholder="Select channels"
        data={channelOptions}
        defaultValue={['ABC', 'CBS']}
        clearable
        searchable
        mb="lg"
      />
      
      <Select
        label="Measurement Providers"
        placeholder="Select measurement provider"
        data={measurementProviders}
        defaultValue="Nielsen"
      />
    </div>
  );
};

export default LinearDetailsSection;
