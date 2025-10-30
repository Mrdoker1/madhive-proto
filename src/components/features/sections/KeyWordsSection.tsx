'use client';

import { useState, useEffect } from 'react';
import { MultiSelect, Button, Group, Text, Select, TextInput } from '@mantine/core';
import { keyWordsData, categoryOptions, keywordsByAdvertiser } from '@/data/keyWordsData';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelSectionData } from '@/store/slices/campaignSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyWordsSectionProps {
  channel?: string;
}

const KeyWordsSection = ({ channel = 'search' }: KeyWordsSectionProps) => {
  const dispatch = useAppDispatch();
  const advertiserFromRedux = useAppSelector((state) => state.campaign.general.advertiser);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
  const [advertiser, setAdvertiser] = useState<string>('');
  const [selectedKeyWords, setSelectedKeyWords] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('SUVs');
  const [generatedKeyWords, setGeneratedKeyWords] = useState<string[]>([]);
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [customKeyword, setCustomKeyword] = useState<string>('');

  // Load keywords from Redux on mount
  useEffect(() => {
    if (channel && channelData[channel]?.keywords) {
      setSelectedKeyWords(channelData[channel].keywords || []);
    }
  }, [channel, channelData]);

  // Synchronize advertiser with Redux and update data
  useEffect(() => {
    if (advertiserFromRedux) {
      setAdvertiser(advertiserFromRedux);
      
      // Get data for specific advertiser
      const advertiserData = keywordsByAdvertiser[advertiserFromRedux];
      if (advertiserData) {
        // Current Keywords empty by default
        setGeneratedKeyWords(advertiserData.generatedKeywords);
        setCategory(advertiserData.defaultCategory);
      }
    }
  }, [advertiserFromRedux]);

  // Save keywords to Redux on change
  useEffect(() => {
    if (channel && selectedKeyWords.length >= 0) {
      dispatch(updateChannelSectionData({
        channel,
        section: 'keywords',
        data: selectedKeyWords
      }));
    }
  }, [selectedKeyWords, channel, dispatch]);

  const handleReset = () => {
    setSelectedKeyWords([]);
  };

  const handleGenerateKeyWords = () => {
    setShowGenerator(!showGenerator);
  };

  const handleAddCustomKeyword = () => {
    if (customKeyword.trim()) {
      setSelectedKeyWords([...selectedKeyWords, customKeyword.trim()]);
      setCustomKeyword('');
    }
  };

  const handleResetGenerated = () => {
    setGeneratedKeyWords([]);
  };

  const handleAddToKeyWords = () => {
    // Add generated keywords to main keywords
    const uniqueKeyWords = [...new Set([...selectedKeyWords, ...generatedKeyWords])];
    setSelectedKeyWords(uniqueKeyWords);
  };

  return (
    <div>
      <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--form-label-color)' }}>
        Include
      </Text>
      
      {/* Add Custom Keyword */}
      <Group gap="xs" mb="md">
        <TextInput
          placeholder="Enter custom keyword"
          value={customKeyword}
          onChange={(e) => setCustomKeyword(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddCustomKeyword();
            }
          }}
          style={{ flex: 1 }}
        />
        <Button 
          variant="outline" 
          onClick={handleAddCustomKeyword}
          disabled={!customKeyword.trim()}
        >
          Add Keyword
        </Button>
      </Group>

      {/* Current Keywords MultiSelect */}
      <MultiSelect
        label="Current Keywords"
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
          {showGenerator ? 'Hide Generator' : 'Generate Key Words'}
        </Button>
        <Button variant="subtle" onClick={handleReset}>
          Reset
        </Button>
      </Group>

      {/* Generator Container */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            key="generator"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ overflow: 'hidden' }}
          >
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
                  placeholder="No advertiser selected"
                  data={advertiser ? [advertiser] : []}
                  value={advertiser}
                  onChange={(value) => setAdvertiser(value || '')}
                  disabled
                  styles={{
                    root: { flex: 1 }
                  }}
                />
                <Select
                  label="Category"
                  placeholder="Select category"
                  data={categoryOptions}
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
                placeholder=""
                data={generatedKeyWords.map((kw, idx) => ({ value: `${kw}-${idx}`, label: kw }))}
                value={generatedKeyWords.map((kw, idx) => `${kw}-${idx}`)}
                onChange={() => {}}
                readOnly
                searchable={false}
                clearable={false}
                maxDropdownHeight={200}
                mb="lg"
                styles={{
                  input: {
                    cursor: 'default'
                  },
                  pill: {
                    borderRadius: '4px'
                  }
                }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyWordsSection;

