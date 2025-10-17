import { Checkbox, Text, Grid } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateAudienceData, updateChannelSectionData, setCarryOverMode } from '@/store/slices/campaignSlice';
import { audienceCategories } from '@/data/audienceData';

interface AudiencesSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

const AudiencesSection = ({ channel, isFirstChannel = true }: AudiencesSectionProps) => {
  const dispatch = useAppDispatch();
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const linearAudienceData = useAppSelector((state) => state.campaign.audience);
  
  // Если это omnichannel кампания и есть канал, используем данные для конкретного канала
  // В режиме carry over используем данные первого канала для всех
  const audienceData = channel 
    ? (channelData[channel]?.audience || { gender: [], age: [], income: [], education: [], householdSize: [] })
    : linearAudienceData;

  const handleCheckboxChange = (category: keyof typeof audienceData, value: string, checked: boolean) => {
    const currentValues = audienceData[category] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    
    // Если это omnichannel и мы НЕ на первой вкладке, отключаем carry over режим
    if (channel && !isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }
    
    // Обновляем данные
    if (channel) {
      // Omnichannel: обновляем данные для конкретного канала
      dispatch(updateChannelSectionData({
        channel,
        section: 'audience',
        data: { [category]: newValues }
      }));
      
      // Если carry over режим активен, копируем данные на все каналы
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'audience',
              data: { [category]: newValues }
            }));
          }
        });
      }
    } else {
      // Linear: используем старую логику
      dispatch(updateAudienceData({ [category]: newValues }));
    }
  };


  return (
    <Grid>
      {audienceCategories.map((category) => (
        <Grid.Col key={category.key} span={2.4}>
          <div>
            <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--form-label-color)' }}>
              {category.title}
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {category.options.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  size="sm"
                  checked={audienceData[category.key as keyof typeof audienceData]?.includes(option) || false}
                  onChange={(event) => 
                    handleCheckboxChange(category.key as keyof typeof audienceData, option, event.currentTarget.checked)
                  }
                />
              ))}
            </div>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default AudiencesSection;
