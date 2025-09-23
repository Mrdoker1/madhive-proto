'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Select, Grid } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

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
    spotLength: ''
  });

  // Синхронизируем локальное состояние с глобальным при загрузке
  useEffect(() => {
    setFormData({
      campaignName: globalGeneralData.campaignName || '',
      advertiser: globalGeneralData.advertiser || '',
      brand: globalGeneralData.brand || '',
      agency: globalGeneralData.agency || '',
      cpeCode: globalGeneralData.cpeCode || '',
      campaignOwner: globalGeneralData.campaignOwner || '',
      campaignApprover: globalGeneralData.campaignApprover || '',
      spotLength: globalGeneralData.spotLength || ''
    });
  }, [globalGeneralData]);

  const handleInputChange = (field: string, value: string | null) => {
    const newValue = value || '';
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));

    // Обновляем глобальный стейт для всех полей
    if (field === 'campaignName') {
      dispatch(updateGeneralData({ campaignName: newValue }));
    } else if (field === 'advertiser') {
      dispatch(updateGeneralData({ advertiser: newValue }));
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
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Brand"
            placeholder="- Select Brand -"
            data={brandOptions}
            value={formData.brand}
            onChange={(value) => handleInputChange('brand', value)}
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
          />
        </Grid.Col>
      </Grid>

      {/* Строка с Campaign Owner и Campaign Approver */}
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

      {/* Строка с Spot Length */}
      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Spot Length"
            placeholder="- Select Spot Length -"
            data={[
              { value: '15', label: '15 sec' },
              { value: '30', label: '30 sec' },
              { value: '60', label: '60 sec' }
            ]}
            value={formData.spotLength}
            onChange={(value) => handleInputChange('spotLength', value)}
            required
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GeneralDetailsSection;