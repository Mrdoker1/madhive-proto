'use client';

import { useState, useRef } from 'react';
import { Select, Checkbox, MultiSelect, Button, Group, Text } from '@mantine/core';
import { zipCodesData } from '@/data/zipCodesData';

const GeoSection = () => {
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setSelectedZipCodes([]);
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
        onChange={setSelectedZipCodes}
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

