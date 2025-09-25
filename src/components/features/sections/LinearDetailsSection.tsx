import { MultiSelect, Select } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData } from '@/store/slices/campaignSlice';
import { broadcasterOptions, measurementProviderOptions } from '@/data/linearDetailsData';

const LinearDetailsSection = () => {
  const dispatch = useAppDispatch();
  const linearData = useAppSelector((state) => state.campaign.linear);


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
        data={broadcasterOptions}
        value={linearData.broadcasters}
        onChange={handleBroadcastersChange}
        clearable
        searchable
        mb="lg"
      />
      
      <Select
        label="Measurement Providers"
        placeholder="Select measurement provider"
        data={measurementProviderOptions}
        value={linearData.measurementProvider}
        onChange={handleMeasurementProviderChange}
      />
    </div>
  );
};

export default LinearDetailsSection;
