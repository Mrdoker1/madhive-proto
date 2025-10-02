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
      spotLength: globalGeneralData.spotLength || ['60']
    });
  }, [globalGeneralData]);

  const handleInputChange = (field: string, value: string | null) => {
    const newValue = value || '';
    
    // При изменении рекламодателя сбрасываем бренд
    if (field === 'advertiser') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: newValue,
        brand: '', // Сбрасываем бренд при смене рекламодателя
        agency: '', // Сбрасываем агентство при смене рекламодателя
        spotLength: ['60'] // Сбрасываем к дефолту :60 при смене рекламодателя
      }));
      dispatch(updateGeneralData({ 
        advertiser: newValue,
        brand: '', // Сбрасываем бренд в глобальном состоянии
        agency: '', // Сбрасываем агентство в глобальном состоянии
        spotLength: ['60'] // Сбрасываем к дефолту :60 в глобальном состоянии
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: newValue
      }));

      // Обновляем глобальный стейт для всех полей
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
      
      // Сбрасываем spot length при изменении advertiser, brand или agency
      if (field === 'brand' || field === 'agency') {
        setFormData(prev => ({ ...prev, spotLength: ['60'] }));
        dispatch(updateGeneralData({ spotLength: ['60'] }));
      }
    }
  };

  // Обработчик для чекбоксов Spot Length
  const handleSpotLengthChange = (value: string) => {
    const currentSpotLengths = formData.spotLength;
    const newSpotLengths = currentSpotLengths.includes(value)
      ? currentSpotLengths.filter(v => v !== value)
      : [...currentSpotLengths, value];
    
    setFormData(prev => ({
      ...prev,
      spotLength: newSpotLengths
    }));
    
    // Обновляем глобальное состояние
    dispatch(updateGeneralData({ spotLength: newSpotLengths }));
  };

  // Получаем бренды для выбранного рекламодателя
  const availableBrandOptions = formData.advertiser ? brandOptions[formData.advertiser] || [] : [];
  
  // Получаем агентства для выбранного рекламодателя
  const availableAgencyOptions = formData.advertiser ? agencyOptions[formData.advertiser] || [] : [];

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
            placeholder={formData.advertiser ? "- Select Brand -" : "Select Advertiser first"}
            data={availableBrandOptions}
            value={formData.brand}
            onChange={(value) => handleInputChange('brand', value)}
            disabled={!formData.advertiser}
          />
        </Grid.Col>
      </Grid>

      {/* Строка с Agency и CPE Code */}
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