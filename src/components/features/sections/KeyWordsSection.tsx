'use client';

import { useState } from 'react';
import { MultiSelect, Button, Group, Text, Select } from '@mantine/core';
import { keyWordsData, selectedKeyWordsMock, generatedKeyWordsMock } from '@/data/keyWordsData';

const KeyWordsSection = () => {
  const [selectedKeyWords, setSelectedKeyWords] = useState<string[]>(selectedKeyWordsMock);
  const [advertiser, setAdvertiser] = useState<string>('WEST TEXAS FORD GTB');
  const [category, setCategory] = useState<string>('Automobile');
  const [generatedKeyWords, setGeneratedKeyWords] = useState<string[]>(generatedKeyWordsMock);

  const handleReset = () => {
    setSelectedKeyWords([]);
  };

  const handleGenerateKeyWords = () => {
    // TODO: Реализовать генерацию ключевых слов
    console.log('Generate Key Words clicked');
  };

  const handleResetGenerated = () => {
    setGeneratedKeyWords([]);
  };

  const handleAddToKeyWords = () => {
    // Добавляем сгенерированные ключевые слова к основным
    const uniqueKeyWords = [...new Set([...selectedKeyWords, ...generatedKeyWords])];
    setSelectedKeyWords(uniqueKeyWords);
  };

  return (
    <div>
      {/* Key Words MultiSelect */}
      <MultiSelect
        label="Key Words"
        placeholder="Select keywords"
        data={keyWordsData}
        value={selectedKeyWords}
        onChange={setSelectedKeyWords}
        searchable={false}
        clearable
        maxDropdownHeight={200}
        mb="lg"
      />

      {/* Buttons */}
      <Group justify="flex-end" gap="4px" mb="xl">
        <Button variant="outline" onClick={handleGenerateKeyWords}>
          Generate Key Words
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>

      {/* Generator Container */}
      <div style={{
        border: '2px dashed #D1D5DB',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#FAFAFA'
      }}>
        <Text size="12px" fw={400} mb="lg" c="#6B7280">
          Tell us more so we can generate some keywords for you
        </Text>

        {/* Advertiser and Category Selects */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Select
            label={<span>Advertiser <span style={{ color: 'red' }}>*</span></span>}
            placeholder="Select advertiser"
            data={['WEST TEXAS FORD GTB', 'Advertiser 1', 'Advertiser 2']}
            value={advertiser}
            onChange={(value) => setAdvertiser(value || '')}
            styles={{
              root: { flex: 1 }
            }}
          />
          <Select
            label="Category"
            placeholder="Select category"
            data={['Automobile', 'Technology', 'Healthcare', 'Retail']}
            value={category}
            onChange={(value) => setCategory(value || '')}
            styles={{
              root: { flex: 1 }
            }}
          />
        </div>

        {/* Generated Key Words */}
        <MultiSelect
          label="Generated Key Words"
          placeholder="Generated keywords will appear here"
          data={generatedKeyWords.map((kw, idx) => ({ value: `${kw}-${idx}`, label: kw }))}
          value={generatedKeyWords.map((kw, idx) => `${kw}-${idx}`)}
          onChange={(values) => {
            const keywords = values.map(v => v.split('-')[0]);
            setGeneratedKeyWords(keywords);
          }}
          searchable={false}
          clearable
          maxDropdownHeight={200}
          mb="lg"
        />

        {/* Generator Buttons */}
        <Group justify="flex-end" gap="4px">
          <Button variant="outline" onClick={handleAddToKeyWords}>
            Add to Key Words
          </Button>
          <Button variant="subtle" onClick={handleResetGenerated}>
            Reset
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default KeyWordsSection;

