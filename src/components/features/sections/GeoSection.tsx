'use client';

import { useState, useRef, useEffect } from 'react';
import { Select, Checkbox, MultiSelect, Button, Group, Text } from '@mantine/core';
import { zipCodesData } from '@/data/zipCodesData';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelSectionData, setCarryOverMode } from '@/store/slices/campaignSlice';

interface GeoSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

const GeoSection = ({ channel, isFirstChannel = true }: GeoSectionProps) => {
  const dispatch = useAppDispatch();
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
  // Получаем данные для текущего канала
  const geoData = channel 
    ? (channelData[channel]?.geo || { selectedZipCodes: [], country: 'United States', targetNationally: true })
    : { selectedZipCodes: [], country: 'United States', targetNationally: true };
  
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>(geoData.selectedZipCodes);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Синхронизируем локальный стейт с Redux когда меняется канал
  useEffect(() => {
    setSelectedZipCodes(geoData.selectedZipCodes);
  }, [channel, geoData.selectedZipCodes]);

  const handleZipCodesChange = (values: string[]) => {
    // Если это omnichannel и мы НЕ на первой вкладке, отключаем carry over режим
    if (channel && !isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }
    
    setSelectedZipCodes(values);
    
    // Обновляем данные в Redux
    if (channel) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'geo',
        data: { selectedZipCodes: values }
      }));
      
      // Если carry over режим активен, копируем данные на все каналы
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'geo',
              data: { selectedZipCodes: values }
            }));
          }
        });
      }
    }
  };

  const handleReset = () => {
    handleZipCodesChange([]);
  };

  const handleAddGeo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Файл загружен, но ничего не делаем с ним
      console.log('File selected:', file.name);
    }
  };

  return (
    <div>
      <Text size="sm" c="dimmed" mb="lg">
        Geographic selection allows you to target nationwide or specific locations within a country.
      </Text>

      {/* Country Select and Checkbox */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <Select
            label="Country"
            value="United States"
            data={['United States']}
            disabled
          />
        </div>
        <Checkbox
          label="Target Nationally"
          checked={true}
          disabled
          styles={{
            root: {
              marginBottom: '4px'
            },
            label: {
              fontSize: '14px',
              fontWeight: 400
            }
          }}
        />
      </div>

      {/* Zip Codes MultiSelect */}
      <MultiSelect
        label="Zip Codes"
        placeholder="Select zip codes"
        data={zipCodesData}
        value={selectedZipCodes}
        onChange={handleZipCodesChange}
        searchable
        clearable
        maxDropdownHeight={200}
        mb="lg"
      />

      {/* Buttons */}
      <Group justify="flex-end" gap="4px">
        <Button variant="outline" onClick={handleAddGeo}>
          Add Geo
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".csv,.xlsx,.xls"
      />
    </div>
  );
};

export default GeoSection;

