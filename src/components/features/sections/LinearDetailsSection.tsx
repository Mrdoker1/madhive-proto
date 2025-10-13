import { MultiSelect, Select, Button, Group, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateLinearData } from '@/store/slices/campaignSlice';
import { broadcastersData } from '@/data/broadcastersData';

const LinearDetailsSection = () => {
  const dispatch = useAppDispatch();
  const linearData = useAppSelector((state) => state.campaign.linear);


  const handleBroadcastersChange = (value: string[]) => {
    dispatch(updateLinearData({ broadcasters: value }));
  };

  // Обработчик для Select All
  const handleSelectAllBroadcasters = () => {
    const allBroadcasters = broadcastersData.map(broadcaster => broadcaster.name);
    dispatch(updateLinearData({ broadcasters: allBroadcasters }));
  };

  // Обработчик для Reset  
  const handleReset = () => {
    dispatch(updateLinearData({ broadcasters: [] }));
  };

  const handleMeasurementProviderChange = (value: string | null) => {
    dispatch(updateLinearData({ measurementProvider: value || '' }));
  };

  return (
    <div>
      <MultiSelect
        label="Broadcasters"
        placeholder="Select Broadcasters"
        data={broadcastersData.map(broadcaster => broadcaster.name)}
        value={linearData.broadcasters}
        onChange={handleBroadcastersChange}
        clearable
        searchable
        mb="lg"
      />

      {/* Кнопки управления */}
      <Group justify="flex-end" mt="lg" gap="4px">
        <Button variant="outline" onClick={handleSelectAllBroadcasters}>
          Select All
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>
      
      <Select
        label="Measurement Providers"
        placeholder="Select measurement provider"
        data={['Nielsen', 'Comscore']}
        value={linearData.measurementProvider}
        onChange={handleMeasurementProviderChange}
      />
    </div>
  );
};

export default LinearDetailsSection;
