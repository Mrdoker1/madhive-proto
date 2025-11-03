'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Select, Checkbox, MultiSelect, Button, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { zipCodesData } from '@/data/zipCodesData';
import { dmasData, statesData, districtsData, geoTypeOptions, type GeoType } from '@/data/geoTypesData';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelSectionData, setCarryOverMode, updateChannelEstimations } from '@/store/slices/campaignSlice';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

interface GeoSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

const GeoSection = ({ channel, isFirstChannel = true }: GeoSectionProps) => {
  const dispatch = useAppDispatch();
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  
  // Get data for current channel
  const geoData = channel 
    ? (channelData[channel]?.geo || { selectedZipCodes: [], geoType: 'zip_codes', country: 'United States', targetNationally: true })
    : { selectedZipCodes: [], geoType: 'zip_codes', country: 'United States', targetNationally: true };
  
  const [geoType, setGeoType] = useState<GeoType>((geoData.geoType as GeoType) || 'zip_codes');
  const [selectedItems, setSelectedItems] = useState<string[]>(geoData.selectedZipCodes);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get data based on geo type
  const geoDataOptions = useMemo(() => {
    switch (geoType) {
      case 'dmas':
        return dmasData;
      case 'states':
        return statesData;
      case 'districts':
        return districtsData;
      case 'zip_codes':
      default:
        return zipCodesData;
    }
  }, [geoType]);

  // Get label for MultiSelect
  const geoLabel = useMemo(() => {
    switch (geoType) {
      case 'dmas':
        return 'DMAs';
      case 'states':
        return 'States';
      case 'districts':
        return 'Districts';
      case 'zip_codes':
      default:
        return 'Zip Codes';
    }
  }, [geoType]);

  // Synchronize local state with Redux when channel changes
  useEffect(() => {
    setSelectedItems(geoData.selectedZipCodes);
    setGeoType((geoData.geoType as GeoType) || 'zip_codes');
  }, [channel, geoData.selectedZipCodes, geoData.geoType]);

  const handleGeoTypeChange = (value: string | null) => {
    if (!value) return;
    
    const newGeoType = value as GeoType;
    setGeoType(newGeoType);
    // Reset selected items when type changes
    setSelectedItems([]);
    
    // Update data in Redux
    if (channel) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'geo',
        data: { selectedZipCodes: [], geoType: newGeoType }
      }));
      
      // Recalculate estimations with empty selection
      const audienceData = channelData[channel]?.audience || {
        gender: [], age: [], income: [], education: [], householdSize: []
      };
      const interests = channelData[channel]?.interests || [];
      const channelBudget = budgetAllocation?.[channel] || 0;
      
      const audienceEstimation = calculateAudienceEstimation(audienceData, interests, channelBudget, channel, []);
      const newMarketEstimation = calculateMarketEstimation([], channelBudget, channel);
      
      dispatch(updateChannelEstimations({
        channel,
        audienceEstimation,
        marketEstimation: newMarketEstimation
      }));
      
      // If carry over mode is active, copy data to all channels
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'geo',
              data: { selectedZipCodes: [], geoType: newGeoType }
            }));
            
            // Update estimations for other channels too
            const chAudienceData = channelData[ch]?.audience || {
              gender: [], age: [], income: [], education: [], householdSize: []
            };
            const chInterests = channelData[ch]?.interests || [];
            const chChannelBudget = budgetAllocation?.[ch] || 0;
            const chAudienceEstimation = calculateAudienceEstimation(chAudienceData, chInterests, chChannelBudget, ch, []);
            const chMarketEstimation = calculateMarketEstimation([], chChannelBudget, ch);
            
            dispatch(updateChannelEstimations({
              channel: ch,
              audienceEstimation: chAudienceEstimation,
              marketEstimation: chMarketEstimation
            }));
          }
        });
      }
    }
  };

  const handleGeoItemsChange = (values: string[]) => {
    // If this is omnichannel and we're NOT on first tab, disable carry over mode
    if (channel && !isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }
    
    setSelectedItems(values);
    
    // Update data in Redux
    if (channel) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'geo',
        data: { selectedZipCodes: values, geoType }
      }));
      
      // Recalculate estimations for channel
      const audienceData = channelData[channel]?.audience || {
        gender: [], age: [], income: [], education: [], householdSize: []
      };
      const interests = channelData[channel]?.interests || [];
      const channelBudget = budgetAllocation?.[channel] || 0;
      
      const audienceEstimation = calculateAudienceEstimation(audienceData, interests, channelBudget, channel, values);
      const newMarketEstimation = calculateMarketEstimation(values, channelBudget, channel);
      
      dispatch(updateChannelEstimations({
        channel,
        audienceEstimation,
        marketEstimation: newMarketEstimation
      }));
      
      // If carry over mode is active, copy data to all channels
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'geo',
              data: { selectedZipCodes: values, geoType }
            }));
            
            // Update estimations for other channels too
            const chAudienceData = channelData[ch]?.audience || {
              gender: [], age: [], income: [], education: [], householdSize: []
            };
            const chInterests = channelData[ch]?.interests || [];
            const chChannelBudget = budgetAllocation?.[ch] || 0;
            const chAudienceEstimation = calculateAudienceEstimation(chAudienceData, chInterests, chChannelBudget, ch, values);
            const chMarketEstimation = calculateMarketEstimation(values, chChannelBudget, ch);
            
            dispatch(updateChannelEstimations({
              channel: ch,
              audienceEstimation: chAudienceEstimation,
              marketEstimation: chMarketEstimation
            }));
          }
        });
      }
    }
  };

  const handleReset = () => {
    handleGeoItemsChange([]);
  };

  const handleSelectAll = () => {
    const allValues = geoDataOptions.map(option => 
      typeof option === 'string' ? option : option.value
    );
    handleGeoItemsChange(allValues);
  };

  const handleAddGeo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // File uploaded, but we don't do anything with it
      console.log('File selected:', file.name);
    }
  };

  return (
    <div>
      <Text size="sm" c="dimmed" mb="lg">
        Geographic selection allows you to target nationwide or specific locations within a country.
      </Text>

      {/* Type, Country Select and Checkbox */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <Select
            label="Type"
            value={geoType}
            data={geoTypeOptions}
            onChange={handleGeoTypeChange}
          />
        </div>
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

      {/* Dynamic MultiSelect based on Type */}
      <MultiSelect
        label={geoLabel}
        placeholder={`Select ${geoLabel.toLowerCase()}`}
        data={geoDataOptions}
        value={selectedItems}
        onChange={handleGeoItemsChange}
        searchable
        clearable
        maxDropdownHeight={200}
        mb="md"
      />

      {/* Add Geo button on the left */}
      <Button 
        variant="subtle"
        onClick={handleAddGeo}
        leftSection={<IconPlus size={16} />}
        styles={{
          root: {
            fontSize: '14px'
          }
        }}
      >
        Add Geo
      </Button>

      {/* Buttons on the right */}
      <Group justify="flex-end" gap="4px">
        <Button variant="outline" onClick={handleSelectAll}>
          Select All
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

