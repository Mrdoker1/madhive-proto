'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Select, Grid, Checkbox, Text, Group } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';
import { advertiserOptions, brandOptions, agencyOptions } from '@/data/generalDetailsData';

interface GeneralDetailsSectionProps {
  className?: string;
}

const GeneralDetailsSection: React.FC<GeneralDetailsSectionProps> = ({
  className = ''
}) => {
  const dispatch = useAppDispatch();
  const globalGeneralData = useAppSelector((state) => state.campaign.general);
  
  const [formData, setFormData] = useState({
    campaignName: '',
    advertiser: '',
    brand: '',
    agency: '',
    cpeCode: '',
    campaignOwner: '',
    campaignApprover: '',
    spotLength: ['60']
  });

  // Synchronize local state with global on load
  useEffect(() => {
    setFormData({
      campaignName: globalGeneralData.campaignName || '',
      advertiser: globalGeneralData.advertiser || '',
      brand: globalGeneralData.brand || '',
      agency: globalGeneralData.agency || '',
      cpeCode: globalGeneralData.cpeCode || '',
      campaignOwner: globalGeneralData.campaignOwner || '',
      campaignApprover: globalGeneralData.campaignApprover || '',
      spotLength: globalGeneralData.spotLength || ['60']
    });
  }, [globalGeneralData]);

  const handleInputChange = (field: string, value: string | null) => {
    const newValue = value || '';
    
    // Reset brand when advertiser changes
    if (field === 'advertiser') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: newValue,
        brand: '', // Reset brand when advertiser changes
        agency: '', // Reset agency when advertiser changes
        spotLength: ['60'] // Reset to default :60 when advertiser changes
      }));
      dispatch(updateGeneralData({ 
        advertiser: newValue,
        brand: '', // Reset brand in global state
        agency: '', // Reset agency in global state
        spotLength: ['60'] // Reset to default :60 in global state
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: newValue
      }));

      // Update global state for all fields
      if (field === 'campaignName') {
        dispatch(updateGeneralData({ campaignName: newValue }));
      } else if (field === 'brand') {
        dispatch(updateGeneralData({ brand: newValue }));
      } else if (field === 'agency') {
        dispatch(updateGeneralData({ agency: newValue }));
      } else if (field === 'cpeCode') {
        dispatch(updateGeneralData({ cpeCode: newValue }));
      } else if (field === 'campaignOwner') {
        dispatch(updateGeneralData({ campaignOwner: newValue }));
      } else if (field === 'campaignApprover') {
        dispatch(updateGeneralData({ campaignApprover: newValue }));
      }
      
      // Reset spot length when advertiser, brand or agency changes
      if (field === 'brand' || field === 'agency') {
        setFormData(prev => ({ ...prev, spotLength: ['60'] }));
        dispatch(updateGeneralData({ spotLength: ['60'] }));
      }
    }
  };

  // Handler for Spot Length checkboxes
  const handleSpotLengthChange = (value: string) => {
    const currentSpotLengths = formData.spotLength;
    const newSpotLengths = currentSpotLengths.includes(value)
      ? currentSpotLengths.filter(v => v !== value)
      : [...currentSpotLengths, value];
    
    setFormData(prev => ({
      ...prev,
      spotLength: newSpotLengths
    }));
    
    // Update global state
    dispatch(updateGeneralData({ spotLength: newSpotLengths }));
  };

  // Get brands for selected advertiser
  const availableBrandOptions = formData.advertiser ? brandOptions[formData.advertiser] || [] : [];
  
  // Get agencies for selected advertiser
  const availableAgencyOptions = formData.advertiser ? agencyOptions[formData.advertiser] || [] : [];

  return (
    <div className={className}>
      {/* Campaign Name - full width */}
      <TextInput
        label="Campaign Name"
        placeholder="Enter campaign name"
        value={formData.campaignName}
        onChange={(event) => handleInputChange('campaignName', event.currentTarget.value)}
        required
        mb="lg"
      />

      {/* Row with Advertiser and Brand */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Select
            label="Advertiser"
            placeholder="- Select Advertiser -"
            data={advertiserOptions}
            value={formData.advertiser}
            onChange={(value) => handleInputChange('advertiser', value)}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Brand"
            placeholder={formData.advertiser ? "- Select Brand -" : "Select Advertiser first"}
            data={availableBrandOptions}
            value={formData.brand}
            onChange={(value) => handleInputChange('brand', value)}
            disabled={!formData.advertiser}
          />
        </Grid.Col>
      </Grid>

      {/* Row with Agency and CPE Code */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Select
            label="Agency"
            placeholder={formData.advertiser ? "- Select Agency -" : "Select Advertiser first"}
            data={availableAgencyOptions}
            value={formData.agency}
            onChange={(value) => handleInputChange('agency', value)}
            disabled={!formData.advertiser}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="CPE Code"
            placeholder="Enter CPE Code"
            value={formData.cpeCode}
            onChange={(event) => handleInputChange('cpeCode', event.currentTarget.value)}
            required
          />
        </Grid.Col>
      </Grid>

      {/* Row with Campaign Owner and Campaign Approver */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <TextInput
            label="Campaign Owner"
            placeholder="Enter campaign owner"
            value={formData.campaignOwner}
            onChange={(event) => handleInputChange('campaignOwner', event.currentTarget.value)}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Campaign Approver"
            placeholder="Enter Campaign Approver"
            value={formData.campaignApprover}
            onChange={(event) => handleInputChange('campaignApprover', event.currentTarget.value)}
            required
          />
        </Grid.Col>
      </Grid>

      {/* Spot Length */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <div>
            <Text size="sm" fw={500} mb={8}>
              Spot Length <span style={{ color: 'red' }}>*</span>
            </Text>
            <Group gap="md">
              <Checkbox
                label=":15"
                checked={formData.spotLength.includes('15')}
                onChange={() => handleSpotLengthChange('15')}
              />
              <Checkbox
                label=":30"
                checked={formData.spotLength.includes('30')}
                onChange={() => handleSpotLengthChange('30')}
              />
              <Checkbox
                label=":60"
                checked={formData.spotLength.includes('60')}
                onChange={() => handleSpotLengthChange('60')}
              />
            </Group>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GeneralDetailsSection;