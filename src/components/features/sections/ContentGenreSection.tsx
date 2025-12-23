'use client';

import { useState, useEffect } from 'react';
import { Select, Checkbox, Group, Text, Stack } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

// Top local TV genres for American broadcast advertising
const CONTENT_GENRES = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'drama', label: 'Drama' },
  { value: 'news', label: 'News & Information' },
  { value: 'reality', label: 'Reality TV' },
  { value: 'scifi', label: 'Sci-fi & Fantasy' },
  { value: 'sports', label: 'Sports' },
];

interface ContentGenreSectionProps {
  className?: string;
}

const ContentGenreSection: React.FC<ContentGenreSectionProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const contentGenreData = useAppSelector((state) => state.campaign.general.contentGenre);
  
  // Local state
  const [mode, setMode] = useState<'include' | 'exclude'>(contentGenreData?.mode || 'include');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(contentGenreData?.genres || []);

  // Sync with Redux on mount
  useEffect(() => {
    if (contentGenreData) {
      setMode(contentGenreData.mode || 'include');
      setSelectedGenres(contentGenreData.genres || []);
    }
  }, [contentGenreData]);

  // Save to Redux when values change
  const saveToRedux = (newMode: 'include' | 'exclude', newGenres: string[]) => {
    dispatch(updateGeneralData({
      contentGenre: {
        mode: newMode,
        genres: newGenres
      }
    }));
  };

  const handleModeChange = (value: string | null) => {
    const newMode = (value as 'include' | 'exclude') || 'include';
    setMode(newMode);
    saveToRedux(newMode, selectedGenres);
  };

  const handleGenreToggle = (genreValue: string) => {
    const newGenres = selectedGenres.includes(genreValue)
      ? selectedGenres.filter(g => g !== genreValue)
      : [...selectedGenres, genreValue];
    
    setSelectedGenres(newGenres);
    saveToRedux(mode, newGenres);
  };

  const handleSelectAll = () => {
    const allGenres = CONTENT_GENRES.map(g => g.value);
    setSelectedGenres(allGenres);
    saveToRedux(mode, allGenres);
  };

  const handleClearAll = () => {
    setSelectedGenres([]);
    saveToRedux(mode, []);
  };

  const allSelected = selectedGenres.length === CONTENT_GENRES.length;
  const someSelected = selectedGenres.length > 0 && selectedGenres.length < CONTENT_GENRES.length;

  return (
    <div className={className}>
      <Text size="sm" c="dimmed" mb="md">
        Target or exclude specific content genres to align your ads with appropriate programming content.
      </Text>

      {/* Mode selector */}
      <Group mb="lg" align="center">
        <Select
          value={mode}
          onChange={handleModeChange}
          data={[
            { value: 'include', label: 'Include' },
            { value: 'exclude', label: 'Exclude' }
          ]}
          w={120}
          size="sm"
          styles={{
            input: {
              fontWeight: 500
            }
          }}
        />
        <Text size="sm" c="dimmed">
          {mode === 'include' 
            ? 'Only show ads on selected genres' 
            : 'Do not show ads on selected genres'}
        </Text>
      </Group>

      {/* Select All / Clear All controls */}
      <Group mb="md" gap="xs">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={() => allSelected ? handleClearAll() : handleSelectAll()}
          label={
            <Text size="sm" fw={500}>
              {allSelected ? 'Deselect All' : 'Select All'}
            </Text>
          }
          size="sm"
        />
        <Text size="xs" c="dimmed" ml="md">
          {selectedGenres.length} of {CONTENT_GENRES.length} selected
        </Text>
      </Group>

      {/* Genre checkboxes in a grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px',
        marginTop: '8px'
      }}>
        {CONTENT_GENRES.map((genre) => (
          <Checkbox
            key={genre.value}
            checked={selectedGenres.includes(genre.value)}
            onChange={() => handleGenreToggle(genre.value)}
            label={genre.label}
            size="sm"
            styles={{
              label: {
                fontSize: '14px'
              }
            }}
          />
        ))}
      </div>

      {/* Summary message */}
      {selectedGenres.length > 0 && (
        <Text size="xs" c="dimmed" mt="lg">
          {mode === 'include' 
            ? `Ads will only appear on ${selectedGenres.length} genre${selectedGenres.length > 1 ? 's' : ''}: ${selectedGenres.map(g => CONTENT_GENRES.find(cg => cg.value === g)?.label).join(', ')}`
            : `Ads will be excluded from ${selectedGenres.length} genre${selectedGenres.length > 1 ? 's' : ''}: ${selectedGenres.map(g => CONTENT_GENRES.find(cg => cg.value === g)?.label).join(', ')}`
          }
        </Text>
      )}
    </div>
  );
};

export default ContentGenreSection;

