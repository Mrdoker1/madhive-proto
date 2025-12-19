import { Select } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData } from '@/store/slices/campaignSlice';

const LinearDetailsSection = () => {
  const dispatch = useAppDispatch();
  const linearData = useAppSelector((state) => state.campaign.linear);

  const handleMeasurementProviderChange = (value: string | null) => {
    dispatch(updateLinearData({ measurementProvider: value || '' }));
  };

  return (
    <div>
      <Select
        label="Measurement Providers"
        placeholder="Select measurement provider"
        data={['Nielsen HH C3', 'Comscore HH C3', 'Videoamp HH C3']}
        value={linearData.measurementProvider}
        onChange={handleMeasurementProviderChange}
        required
      />
    </div>
  );
};

export default LinearDetailsSection;
