'use client';

import React, { useState, useEffect } from 'react';
import { TextInput, Select, Grid, Checkbox, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';
import { advertiserOptions, brandOptions, agencyOptions, spotLengthOptions } from '@/data/generalDetailsData';

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
    spotLengths: [] as string[]
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
      spotLengths: globalGeneralData.spotLengths || []
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
        agency: '' // Сбрасываем агентство при смене рекламодателя
      }));
      dispatch(updateGeneralData({ 
        advertiser: newValue,
        brand: '', // Сбрасываем бренд в глобальном состоянии
        agency: '' // Сбрасываем агентство в глобальном состоянии
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
    }
  };

  // Обработчик для чекбоксов Spot Length
  const handleSpotLengthChange = (value: string, checked: boolean) => {
    let newSpotLengths: string[];
    
    if (checked) {
      // Добавляем значение
      newSpotLengths = [...formData.spotLengths, value];
    } else {
      // Убираем значение
      newSpotLengths = formData.spotLengths.filter(length => length !== value);
    }
    
    setFormData(prev => ({
      ...prev,
      spotLengths: newSpotLengths
    }));
    
    // Обновляем глобальное состояние
    dispatch(updateGeneralData({ spotLengths: newSpotLengths }));
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
            required
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

      {/* Строка с Spot Length */}
      <div style={{ marginBottom: '24px' }}>
        <Text size="sm" fw={500} mb="xs">
          Spot Length <span style={{ color: 'red' }}>*</span>
        </Text>
        <div style={{ display: 'flex', gap: '24px' }}>
          {spotLengthOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={formData.spotLengths.includes(option.value)}
              onChange={(event) => handleSpotLengthChange(option.value, event.currentTarget.checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralDetailsSection;