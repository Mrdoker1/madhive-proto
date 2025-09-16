'use client';

import React, { useState } from 'react';
import { TextInput, Select, Grid } from '@mantine/core';

interface GeneralDetailsSectionProps {
  className?: string;
}

const GeneralDetailsSection: React.FC<GeneralDetailsSectionProps> = ({
  className = ''
}) => {
  const [formData, setFormData] = useState({
    campaignName: '',
    advertiser: '',
    brand: '',
    agency: '',
    cpeCode: '',
    campaignOwner: '',
    campaignApprover: ''
  });

  const handleInputChange = (field: string, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || ''
    }));
  };

  const advertiserOptions = [
    { value: 'advertiser1', label: 'Advertiser 1' },
    { value: 'advertiser2', label: 'Advertiser 2' },
  ];

  const brandOptions = [
    { value: 'brand1', label: 'Brand 1' },
    { value: 'brand2', label: 'Brand 2' },
  ];

  const agencyOptions = [
    { value: 'agency1', label: 'Agency 1' },
    { value: 'agency2', label: 'Agency 2' },
  ];

  const cpeCodeOptions = [
    { value: 'cpe1', label: 'CPE001' },
    { value: 'cpe2', label: 'CPE002' },
  ];

  const approverOptions = [
    { value: 'approver1', label: 'John Smith' },
    { value: 'approver2', label: 'Jane Doe' },
  ];

  return (
    <div className={className}>
      {/* Campaign Name - полная ширина */}
      <TextInput
        label="Campaign Name"
        placeholder="Enter campaign name"
        value={formData.campaignName}
        onChange={(event) => handleInputChange('campaignName', event.currentTarget.value)}
        required
        mb="lg"
        styles={{
          label: {
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px'
          }
        }}
      />

      {/* Строка с Advertiser и Brand */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Select
            label="Advertiser"
            placeholder="- Select Advertiser -"
            data={advertiserOptions}
            value={formData.advertiser}
            onChange={(value) => handleInputChange('advertiser', value)}
            required
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Brand"
            placeholder="- Select Brand -"
            data={brandOptions}
            value={formData.brand}
            onChange={(value) => handleInputChange('brand', value)}
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
      </Grid>

      {/* Строка с Agency и CPE Code */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Select
            label="Agency"
            placeholder="- Select Agency -"
            data={agencyOptions}
            value={formData.agency}
            onChange={(value) => handleInputChange('agency', value)}
            required
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="CPE Code"
            placeholder="- Select CPE Code -"
            data={cpeCodeOptions}
            value={formData.cpeCode}
            onChange={(value) => handleInputChange('cpeCode', value)}
            required
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
      </Grid>

      {/* Строка с Campaign Owner и Campaign Approver */}
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Campaign Owner"
            placeholder="Enter campaign owner"
            value={formData.campaignOwner}
            onChange={(event) => handleInputChange('campaignOwner', event.currentTarget.value)}
            required
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Campaign Approver"
            placeholder="Select Campaign Approver -"
            data={approverOptions}
            value={formData.campaignApprover}
            onChange={(value) => handleInputChange('campaignApprover', value)}
            required
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px'
              }
            }}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GeneralDetailsSection;