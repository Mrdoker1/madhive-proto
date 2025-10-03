'use client';

import { useState } from 'react';
import { Checkbox, Text, Button, Grid, Badge, CloseButton } from '@mantine/core';
import { interestCategories, type InterestCategory } from '@/data/interestsData';

const InterestsSection = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const handleInterestToggle = (interest: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter(i => i !== interest));
  };

  const toggleCategoryExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVisibleInterests = (category: InterestCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    if (isExpanded || !category.maxVisible) {
      return category.interests;
    }
    return category.interests.slice(0, category.maxVisible);
  };

  const hasMoreInterests = (category: InterestCategory) => {
    return category.maxVisible && category.interests.length > category.maxVisible;
  };

  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      {/* Левая часть - категории с чекбоксами */}
      <div style={{ flex: 1 }}>
        <Grid gutter="xl">
          {interestCategories.map((category) => (
            <Grid.Col key={category.id} span={6}>
              <div>
                <Text size="sm" fw={600} mb="md" style={{ color: '#000000' }}>
                  {category.title}
                </Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getVisibleInterests(category).map((interest) => (
                    <Checkbox
                      key={interest}
                      label={interest}
                      size="sm"
                      checked={selectedInterests.includes(interest)}
                      onChange={(event) => handleInterestToggle(interest, event.currentTarget.checked)}
                    />
                  ))}
                  {hasMoreInterests(category) && (
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={() => toggleCategoryExpand(category.id)}
                      styles={{
                        root: {
                          backgroundColor: '#F3F2EB',
                          color: '#000000',
                          fontSize: '14px',
                          fontWeight: 400,
                          height: '32px',
                          padding: '0 16px',
                          marginTop: '4px'
                        }
                      }}
                    >
                      {expandedCategories.has(category.id) ? 'Less' : 'More'}
                    </Button>
                  )}
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </div>

      {/* Правая часть - выбранные интересы */}
      <div 
        style={{ 
          width: '320px',
          backgroundColor: '#F3F2EB',
          borderRadius: '8px',
          padding: '24px',
          alignSelf: 'flex-start'
        }}
      >
        <Text size="sm" c="dimmed" mb="lg">
          Select 3 or more interests
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {selectedInterests.map((interest) => (
            <Badge
              key={interest}
              size="lg"
              radius="xl"
              styles={{
                root: {
                  backgroundColor: '#2A1037',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 400,
                  height: '24px',
                  paddingLeft: '16px',
                  paddingRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }
              }}
              rightSection={
                <CloseButton
                  variant="transparent"
                  size="xs"
                  onClick={() => handleRemoveInterest(interest)}
                  styles={{
                    root: {
                      color: '#FFFFFF'
                    }
                  }}
                />
              }
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestsSection;

