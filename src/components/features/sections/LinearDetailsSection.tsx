import { MultiSelect, Select } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData } from '@/store/slices/campaignSlice';

const LinearDetailsSection = () => {
  const dispatch = useAppDispatch();
  const linearData = useAppSelector((state) => state.campaign.linear);

  const channelOptions = [
    'ABC',
    'CBS', 
    'NBC',
    'Gray',
    'Nexstar',
    'Hearst',
    'TEGNA',
    'Scripps',
    'News Press Gazette', 
    'Morgan Murphy',
    'Hubbard Broadcasting',   
    'Univision',
    'Entravision',
  ];

  const measurementProviders = [
    'Nielsen',
    'Comscore',
  ];

  const handleBroadcastersChange = (value: string[]) => {
    dispatch(updateLinearData({ broadcasters: value }));
  };

  const handleMeasurementProviderChange = (value: string | null) => {
    dispatch(updateLinearData({ measurementProvider: value || '' }));
  };

  return (
    <div>
      <MultiSelect
        label="Broadcasters"
        placeholder="Select channels"
        data={channelOptions}
        value={linearData.broadcasters}
        onChange={handleBroadcastersChange}
        clearable
        searchable
        mb="lg"
      />
      
      <Select
        label="Measurement Providers"
        placeholder="Select measurement provider"
        data={measurementProviders}
        value={linearData.measurementProvider}
        onChange={handleMeasurementProviderChange}
      />
    </div>
  );
};

export default LinearDetailsSection;
