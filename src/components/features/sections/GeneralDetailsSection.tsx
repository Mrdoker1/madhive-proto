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
    
    // При изменении рекламодателя сбрасываем бренд
    if (field === 'advertiser') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: newValue,
        brand: '' // Сбрасываем бренд при смене рекламодателя
      }));
      dispatch(updateGeneralData({ 
        advertiser: newValue,
        brand: '' // Сбрасываем бренд в глобальном состоянии
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

  const advertiserOptions = [
    { value: 'Ford Motor Company', label: 'Ford Motor Company' },
    { value: 'Stellantis', label: 'Stellantis' },   
    { value: 'Toyota Motor Corp', label: 'Toyota Motor Corp' },
  ];

  // Бренды зависят от выбранного рекламодателя
  const allBrandOptions: Record<string, Array<{value: string, label: string}>> = {
    'Ford Motor Company': [
      { value: 'ford-f150', label: 'Ford F-150' },
      { value: 'ford-mustang', label: 'Ford Mustang' },
      { value: 'ford-explorer', label: 'Ford Explorer' },
      { value: 'lincoln', label: 'Lincoln' },
    ],
    'Stellantis': [
      { value: 'jeep', label: 'Jeep' },
      { value: 'ram', label: 'Ram' },
      { value: 'dodge', label: 'Dodge' },
      { value: 'chrysler', label: 'Chrysler' },
      { value: 'fiat', label: 'Fiat' },
    ],
    'Toyota Motor Corp': [
      { value: 'toyota-camry', label: 'Toyota Camry' },
      { value: 'toyota-corolla', label: 'Toyota Corolla' },
      { value: 'toyota-prius', label: 'Toyota Prius' },
      { value: 'lexus', label: 'Lexus' },
      { value: 'scion', label: 'Scion' },
    ],
  };

  // Получаем бренды для выбранного рекламодателя
  const brandOptions = formData.advertiser ? allBrandOptions[formData.advertiser] || [] : [];

  const agencyOptions = [
    { value: 'GROUPM / GLOBAL TEAM BLUE', label: 'GROUPM / GLOBAL TEAM BLUE' },
    { value: 'agency2', label: 'Agency 2' },
  ];

  const cpeCodeOptions = [
    { value: 'Y3W / H&T / 121', label: 'Y3W / H&T / 121' },
    { value: 'WNK / JEP / 115', label: 'WNK / JEP / 115' },
    { value: 'T2S / PUS / 310', label: 'T2S / PUS / 310' },
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
            placeholder={formData.advertiser ? "- Select Brand -" : "Select Advertiser first"}
            data={brandOptions}
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