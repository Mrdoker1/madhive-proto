'use client';

import { useState, useEffect } from 'react';
import { Radio, Group, Text, Stack } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

// Language options for US broadcast advertising
const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English', description: 'Target English-speaking audiences (default)' },
  { value: 'spanish', label: 'Spanish', description: 'Target Spanish-speaking audiences (Hispanic markets)' },
];

interface LanguageSectionProps {
  className?: string;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state) => state.campaign.general.language);
  
  // Local state with default to English
  const [language, setLanguage] = useState<string>(selectedLanguage || 'english');

  // Sync with Redux on mount
  useEffect(() => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  // Save to Redux when value changes
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    dispatch(updateGeneralData({ language: value }));
  };

  return (
    <div className={className}>
      <Text size="sm" c="dimmed" mb="md">
        Select creative language for ad targeting.
      </Text>

      <Radio.Group
        name="language-selection"
        value={language}
        onChange={handleLanguageChange}
      >
        <Stack gap="md">
          {LANGUAGE_OPTIONS.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={
                <div>
                  <Text size="sm" fw={500}>{option.label}</Text>
                  <Text size="xs" c="dimmed">{option.description}</Text>
                </div>
              }
              styles={{
                radio: {
                  cursor: 'pointer'
                },
                label: {
                  cursor: 'pointer'
                }
              }}
            />
          ))}
        </Stack>
      </Radio.Group>
    </div>
  );
};

export default LanguageSection;

