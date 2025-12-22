'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Select, Grid, Text, Button, Tooltip } from '@mantine/core';
import { IconUpload, IconInfoCircle } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';
import { advertiserOptions, brandOptions } from '@/data/generalDetailsData';

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
    cpeClient: '',
    cpeProduct: '',
    cpeEstimate: '',
    campaignOwner: '',
    campaignApprover: ''
  });

  // Synchronize local state with global on load
  useEffect(() => {
    // Parse CPE code into parts (format: "client-product-estimate")
    const cpeParts = (globalGeneralData.cpeCode || '').split('-');
    setFormData({
      campaignName: globalGeneralData.campaignName || '',
      advertiser: globalGeneralData.advertiser || '',
      brand: globalGeneralData.brand || '',
      cpeClient: cpeParts[0] || '',
      cpeProduct: cpeParts[1] || '',
      cpeEstimate: cpeParts[2] || '',
      campaignOwner: globalGeneralData.campaignOwner || '',
      campaignApprover: globalGeneralData.campaignApprover || ''
    });
  }, [globalGeneralData]);

  const handleInputChange = (field: string, value: string | null) => {
    const newValue = value || '';
    
    // Reset brand when advertiser changes
    if (field === 'advertiser') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: newValue,
        brand: '' // Reset brand when advertiser changes
      }));
      dispatch(updateGeneralData({ 
        advertiser: newValue,
        brand: '' // Reset brand in global state
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
      } else if (field === 'cpeClient' || field === 'cpeProduct' || field === 'cpeEstimate') {
        // Combine CPE fields into single code
        const updatedFormData = { ...formData, [field]: newValue };
        const cpeCode = `${updatedFormData.cpeClient}-${updatedFormData.cpeProduct}-${updatedFormData.cpeEstimate}`;
        dispatch(updateGeneralData({ cpeCode }));
      } else if (field === 'campaignOwner') {
        dispatch(updateGeneralData({ campaignOwner: newValue }));
      } else if (field === 'campaignApprover') {
        dispatch(updateGeneralData({ campaignApprover: newValue }));
      }
      
      }
  };

// Get brands for selected advertiser
  const availableBrandOptions = formData.advertiser ? brandOptions[formData.advertiser] || [] : [];

  return (
    <div className={className}>
      {/* Upload Planning Brief and Info */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Button
          variant="outline"
          size="xs"
          leftSection={<IconUpload size={14} />}
          disabled
          style={{ 
            color: '#9CA3AF',
            borderColor: '#D1D5DB',
            cursor: 'not-allowed'
          }}
        >
          Upload Planning Brief
        </Button>
        <Tooltip
          label="Fill in the campaign details below or upload a planning brief to auto-populate fields."
          position="left"
          withArrow
          multiline
          w={250}
        >
          <IconInfoCircle size={18} color="#9CA3AF" style={{ cursor: 'help' }} />
        </Tooltip>
      </div>

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

      {/* Row with CPE codes and Campaign Owner */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Text size="sm" fw={500} mb={8}>
            CPE Code <span style={{ color: 'red' }}>*</span>
          </Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <TextInput
              placeholder="Client"
              value={formData.cpeClient}
              onChange={(event) => handleInputChange('cpeClient', event.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <TextInput
              placeholder="Product"
              value={formData.cpeProduct}
              onChange={(event) => handleInputChange('cpeProduct', event.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <TextInput
              placeholder="Estimate"
              value={formData.cpeEstimate}
              onChange={(event) => handleInputChange('cpeEstimate', event.currentTarget.value)}
              style={{ flex: 1 }}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Campaign Owner"
            placeholder="Enter campaign owner"
            value={formData.campaignOwner}
            onChange={(event) => handleInputChange('campaignOwner', event.currentTarget.value)}
            required
          />
        </Grid.Col>
      </Grid>

      {/* Row with Location and Email (auto-populated from user login) */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <TextInput
            label="Location"
            value="New York, NY"
            readOnly
            styles={{
              input: {
                backgroundColor: '#F9FAFB',
                color: '#6B7280',
                cursor: 'default'
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            value="demo@programmatic.tv"
            readOnly
            styles={{
              input: {
                backgroundColor: '#F9FAFB',
                color: '#6B7280',
                cursor: 'default'
              }
            }}
          />
        </Grid.Col>
      </Grid>

      {/* Row with Campaign Approver */}
      <Grid mb="lg">
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
    </div>
  );
};

export default GeneralDetailsSection;