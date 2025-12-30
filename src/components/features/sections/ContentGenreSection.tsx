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
  
  // Default to all genres selected
  const allGenreValues = CONTENT_GENRES.map(g => g.value);
  
  // Local state - default to all genres included
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    contentGenreData?.genres && contentGenreData.genres.length > 0 
      ? contentGenreData.genres 
      : allGenreValues
  );

  // Sync with Redux on mount
  useEffect(() => {
    if (contentGenreData && contentGenreData.genres && contentGenreData.genres.length > 0) {
      setSelectedGenres(contentGenreData.genres);
    } else {
      // If no data in Redux, initialize with all genres
      setSelectedGenres(allGenreValues);
      saveToRedux(allGenreValues);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to Redux when values change - always in 'include' mode
  const saveToRedux = (newGenres: string[]) => {
    dispatch(updateGeneralData({
      contentGenre: {
        mode: 'include',
        genres: newGenres
      }
    }));
  };

  const handleGenreToggle = (genreValue: string) => {
    const newGenres = selectedGenres.includes(genreValue)
      ? selectedGenres.filter(g => g !== genreValue)
      : [...selectedGenres, genreValue];
    
    setSelectedGenres(newGenres);
    saveToRedux(newGenres);
  };

  const handleSelectAll = () => {
    setSelectedGenres(allGenreValues);
    saveToRedux(allGenreValues);
  };

  const handleClearAll = () => {
    setSelectedGenres([]);
    saveToRedux([]);
  };

  const allSelected = selectedGenres.length === CONTENT_GENRES.length;
  const someSelected = selectedGenres.length > 0 && selectedGenres.length < CONTENT_GENRES.length;

  return (
    <div className={className}>
      <Text size="sm" c="dimmed" mb="md">
        Included programming categories for audience targeting.
      </Text>

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
      {selectedGenres.length > 0 && selectedGenres.length < CONTENT_GENRES.length && (
        <Text size="xs" c="dimmed" mt="lg">
          Ads will appear on {selectedGenres.length} categor{selectedGenres.length > 1 ? 'ies' : 'y'}: {selectedGenres.map(g => CONTENT_GENRES.find(cg => cg.value === g)?.label).join(', ')}
        </Text>
      )}
      {selectedGenres.length === CONTENT_GENRES.length && (
        <Text size="xs" c="dimmed" mt="lg">
          Ads will appear on all programming categories
        </Text>
      )}
    </div>
  );
};

export default ContentGenreSection;

