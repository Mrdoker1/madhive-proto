import { Checkbox, Text, Grid } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateAudienceData, updateChannelSectionData, setCarryOverMode, updateChannelEstimations } from '@/store/slices/campaignSlice';
import { audienceCategories } from '@/data/audienceData';
import { calculateAudienceEstimation, calculateMarketEstimation } from '@/utils/estimationCalculators';

interface AudiencesSectionProps {
  channel?: string;
  isFirstChannel?: boolean;
}

const AudiencesSection = ({ channel, isFirstChannel = true }: AudiencesSectionProps) => {
  const dispatch = useAppDispatch();
  const carryOverMode = useAppSelector((state) => state.campaign.omnichannel.carryOverMode);
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const linearAudienceData = useAppSelector((state) => state.campaign.audience);
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  
  // If this is an omnichannel campaign and there's a channel, use data for specific channel
  // In carry over mode, use first channel's data for all
  const audienceData = channel 
    ? (channelData[channel]?.audience || { gender: [], age: [], income: [], education: [], householdSize: [] })
    : linearAudienceData;

  const handleCheckboxChange = (category: keyof typeof audienceData, value: string, checked: boolean) => {
    const currentValues = audienceData[category] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    
    // If this is omnichannel and we're NOT on first tab, disable carry over mode
    if (channel && !isFirstChannel && carryOverMode) {
      dispatch(setCarryOverMode(false));
    }
    
    // Update data
    if (channel) {
      // Omnichannel: update data for specific channel
      const updatedAudienceData = { ...audienceData, [category]: newValues };
      
      dispatch(updateChannelSectionData({
        channel,
        section: 'audience',
        data: { [category]: newValues }
      }));
      
      // Recalculate estimations for channel
      const interests = channelData[channel]?.interests || [];
      const geoData = channelData[channel]?.geo || { selectedZipCodes: [] };
      const channelBudget = budgetAllocation?.[channel] || 0;
      
      const newAudienceEstimation = calculateAudienceEstimation(updatedAudienceData, interests, channelBudget, channel, geoData.selectedZipCodes);
      const marketEstimation = calculateMarketEstimation(geoData.selectedZipCodes, channelBudget, channel);
      
      dispatch(updateChannelEstimations({
        channel,
        audienceEstimation: newAudienceEstimation,
        marketEstimation
      }));
      
      // If carry over mode is active, copy data to all channels
      if (carryOverMode && isFirstChannel) {
        const allChannels = Object.keys(channelData);
        allChannels.forEach(ch => {
          if (ch !== channel) {
            dispatch(updateChannelSectionData({
              channel: ch,
              section: 'audience',
              data: { [category]: newValues }
            }));
            
            // Update estimations for other channels too
            const chInterests = channelData[ch]?.interests || [];
            const chGeoData = channelData[ch]?.geo || { selectedZipCodes: [] };
            const chChannelBudget = budgetAllocation?.[ch] || 0;
            const chAudienceEstimation = calculateAudienceEstimation(updatedAudienceData, chInterests, chChannelBudget, ch, chGeoData.selectedZipCodes);
            const chMarketEstimation = calculateMarketEstimation(chGeoData.selectedZipCodes, chChannelBudget, ch);
            
            dispatch(updateChannelEstimations({
              channel: ch,
              audienceEstimation: chAudienceEstimation,
              marketEstimation: chMarketEstimation
            }));
          }
        });
      }
    } else {
      // Linear: use old logic
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
