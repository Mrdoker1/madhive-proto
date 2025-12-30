'use client';

import { useState, useEffect } from 'react';
import { TagsInput, Text, Group, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateGeneralData } from '@/store/slices/campaignSlice';

interface ProgramExclusionSectionProps {
  className?: string;
}

const ProgramExclusionSection: React.FC<ProgramExclusionSectionProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const excludedPrograms = useAppSelector((state) => state.campaign.general.excludedPrograms);
  
  // Local state
  const [programs, setPrograms] = useState<string[]>(excludedPrograms || []);

  // Sync with Redux on mount
  useEffect(() => {
    if (excludedPrograms) {
      setPrograms(excludedPrograms);
    }
  }, [excludedPrograms]);

  // Save to Redux when programs change
  const handleProgramsChange = (value: string[]) => {
    setPrograms(value);
    dispatch(updateGeneralData({ excludedPrograms: value }));
  };

  return (
    <div className={className}>
      <Group gap="xs" mb="md">
        <Text size="sm" c="dimmed">
          Excluded program titles containing the following text:
        </Text>
        <Tooltip 
          label="Type a program title and press Enter to add it. Click the × to remove."
          position="top"
          withArrow
          multiline
          w={280}
        >
          <IconInfoCircle size={16} style={{ color: '#999', cursor: 'help' }} />
        </Tooltip>
      </Group>

      <TagsInput
        placeholder="Type the program name and hit enter."
        value={programs}
        onChange={handleProgramsChange}
        clearable
        splitChars={[',']}
        maxTags={50}
        styles={{
          input: {
            fontSize: '14px',
            minHeight: '42px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '4px',
            paddingTop: '8px',
            paddingBottom: '8px'
          },
          pill: {
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            color: '#dc3545',
            fontWeight: 400
          }
        }}
      />

      {programs.length > 0 && (
        <Text size="xs" c="dimmed" mt="sm">
          {programs.length} program{programs.length > 1 ? 's' : ''} will be excluded from your campaign.
        </Text>
      )}
    </div>
  );
};

export default ProgramExclusionSection;

