'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, Card, Tooltip } from '@mantine/core';
import { IconCurrencyDollar, IconInfoCircle } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData, updateEstimations } from '@/store/slices/campaignSlice';
import AISuggestionCard from '@/components/ui/AISuggestionCard';

interface RightSidebarProps {
  className?: string;
  isOmnichannel?: boolean; // Flag to determine campaign type
  pageKey?: string; // Page key for AI suggestions
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className = '', isOmnichannel = false, pageKey = 'default' }) => {
  const dispatch = useAppDispatch();
  
  // Get campaign data from global state
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const linearAudienceEstimation = useAppSelector((state) => state.campaign.estimations.audienceEstimation);
  const linearMarketEstimation = useAppSelector((state) => state.campaign.estimations.marketEstimation);
  const audienceData = useAppSelector((state) => state.campaign.audience);
  
  // For omnichannel get data from channels
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  const selectedChannels = useAppSelector((state) => state.campaign.channels.selectedChannels);
  
  // For Linear: get data about markets, broadcasters and stations
  const marketsDetails = useAppSelector((state) => state.campaign.markets.marketsDetails);
  const broadcasters = useAppSelector((state) => state.campaign.linear.broadcasters);
  const broadcastersWithStations = useAppSelector((state) => state.campaign.linear.broadcastersWithStations);
  
  // Calculate total estimations for omnichannel (only for selected channels)
  // First calculate market estimation to use it for limiting audience
  const omnichannelMarketEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    
    const filteredChannels = selectedChannels.filter(ch => ch !== 'linear_tv');
    const marketValues = filteredChannels.map(ch => channelData[ch]?.estimations?.marketEstimation || 0);
    
    if (marketValues.length === 0) return 0;
    if (marketValues.length === 1) return marketValues[0];
    
    // Check if specific zip codes are used for targeting
    const hasGeoTargeting = filteredChannels.some(ch => {
      const geoData = channelData[ch]?.geo;
      return geoData?.selectedZipCodes && geoData.selectedZipCodes.length > 0;
    });
    
    if (hasGeoTargeting) {
      // With geo-targeting, sum market estimation with overlap coefficient 0.85
      const totalSum = marketValues.reduce((sum, val) => sum + val, 0);
      return Math.round(totalSum * 0.85);
    } else {
      // With nationwide targeting, take maximum - it's the same US market
      return Math.max(...marketValues);
    }
  }, [isOmnichannel, channelData, selectedChannels]);
  
  const omnichannelAudienceEstimation = useMemo(() => {
    if (!isOmnichannel) return 0;
    // For omnichannel - sum all channels with overlap consideration
    // Simple logic: ~30% of people see ads in multiple channels
    const audienceValues = selectedChannels
      .filter(ch => ch !== 'linear_tv')
      .map(ch => channelData[ch]?.estimations?.audienceEstimation || 0);
    
    if (audienceValues.length === 0) return 0;
    if (audienceValues.length === 1) return audienceValues[0];
    
    // Sum and apply fixed coefficient 0.7
    const totalSum = audienceValues.reduce((sum, val) => sum + val, 0);
    const totalAudience = Math.round(totalSum * 0.7);
    
    // IMPORTANT: Audience cannot exceed Market Estimation
    return Math.min(totalAudience, omnichannelMarketEstimation);
  }, [isOmnichannel, channelData, selectedChannels, omnichannelMarketEstimation]);
  
  // Use correct values depending on campaign type
  const audienceEstimation = isOmnichannel ? omnichannelAudienceEstimation : linearAudienceEstimation;
  const marketEstimation = isOmnichannel ? omnichannelMarketEstimation : linearMarketEstimation;
  
  // Calculate details for Linear Market Estimation
  const linearMarketDetails = useMemo(() => {
    if (isOmnichannel) return null;
    
    const selectedMarketsCount = marketsDetails?.filter(m => m.selected).length || 0;
    const selectedBroadcastersCount = broadcasters?.length || 0;
    
    // Count selected stations
    let totalStations = 0;
    let totalImpressions = 0;
    let totalCPM = 0;
    let stationCount = 0;
    
    if (broadcastersWithStations && broadcastersWithStations.length > 0) {
      broadcastersWithStations.forEach(broadcaster => {
        broadcaster.stations.forEach(station => {
          if (station.selected) {
            totalStations++;
            
            // Calculate impressions: (budget / CPM) * 1000
            if (station.budget > 0 && station.cpm) {
              const cpmValue = parseFloat(station.cpm.replace('$', ''));
              if (cpmValue > 0) {
                totalImpressions += (station.budget / cpmValue) * 1000;
                totalCPM += cpmValue;
                stationCount++;
              }
            }
          }
        });
      });
    }
    
    const averageCPM = stationCount > 0 ? totalCPM / stationCount : 0;
    
    return {
      marketsCount: selectedMarketsCount,
      broadcastersCount: selectedBroadcastersCount,
      programsCount: totalStations,
      totalImpressions,
      averageCPM
    };
  }, [isOmnichannel, marketsDetails, broadcasters, broadcastersWithStations]);
  
  // Local state for budget editing
  const [budgetInput, setBudgetInput] = useState('');

  // Function to format number with separators
  const formatNumber = (value: string): string => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Synchronize local state with global state on load
  useEffect(() => {
    if (totalBudget > 0) {
      setBudgetInput(formatNumber(totalBudget.toString()));
    }
  }, [totalBudget]);

  // Format budget for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Audience mapping to number of people (memoized)
  const audienceMapping = useMemo(() => ({
    gender: {
      'Male': 1247832,
      'Female': 1363571
    },
    age: {
      'Under 18': 734291,
      '18 - 24': 982145,
      '25 - 34': 1458367,
      '35 - 44': 1203794,
      '45 - 54': 967523,
      '55 - 64': 845192,
      '65 and over': 623847
    },
    income: {
      'Under $50k': 1567239,
      '$50k - $100k': 1892156,
      '$100k - $150k': 834672,
      '$150k - $200k': 456283,
      '$200k - $250k': 187394,
      'Over $250k': 89156
    },
    education: {
      'High school diploma': 1623948,
      "Associate's degree": 743821,
      "Bachelor's degree": 1256347,
      "Master's degree": 478392
    },
    householdSize: {
      'One child': 892734,
      'Two children': 1034567,
      '>2 children': 523189
    }
  }), []); // Empty dependency array as data is static

  // Function to calculate total audience (memoized)
  const calculateAudienceEstimation = useCallback(() => {
    // Use correct market estimation value for linear
    const currentMarketEstimation = isOmnichannel ? omnichannelMarketEstimation : linearMarketEstimation;
    
    // If no Market Estimation, then Audience Estimation should also be 0
    if (currentMarketEstimation === 0) {
      return 0;
    }
    
    const totalPopulation = currentMarketEstimation;
    
    // If nothing selected in audience - return full market audience
    const hasSelections = Object.values(audienceData).some(arr => Array.isArray(arr) && arr.length > 0);
    if (!hasSelections) {
      return totalPopulation;
    }
    
    // Calculate narrowing percentage for each category
    let audienceMultiplier = 1.0;
    
    Object.entries(audienceData).forEach(([category, selectedOptions]) => {
      if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        // Get total sum for this category
        const categoryMapping = audienceMapping[category as keyof typeof audienceMapping];
        if (categoryMapping) {
          const categoryTotal = Object.values(categoryMapping).reduce((sum, value) => sum + value, 0);
          const selectedTotal = selectedOptions.reduce((sum, option) => {
            const optionValue = categoryMapping[option as keyof typeof categoryMapping] || 0;
            return sum + optionValue;
          }, 0);
          
          // Percentage of total category
          const categoryPercent = selectedTotal / categoryTotal;
          audienceMultiplier *= categoryPercent;
        }
      }
    });
    
    return Math.round(totalPopulation * audienceMultiplier);
  }, [isOmnichannel, omnichannelMarketEstimation, linearMarketEstimation, audienceData, audienceMapping]);

  // Automatically update Audience Estimation when selected audience or market estimation changes
  // Only for linear campaigns (not for omnichannel)
  useEffect(() => {
    if (!isOmnichannel) {
      const calculatedAudience = calculateAudienceEstimation();
      if (calculatedAudience !== linearAudienceEstimation) {
        dispatch(updateEstimations({ audienceEstimation: calculatedAudience }));
      }
    }
  }, [audienceData, linearAudienceEstimation, linearMarketEstimation, dispatch, calculateAudienceEstimation, isOmnichannel]);

  // Budget change handler
  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Remove commas for validation
    const cleanValue = value.replace(/,/g, '');
    
    // Allow only digits and dot for decimal numbers
    if (/^\d*\.?\d*$/.test(cleanValue)) {
      setBudgetInput(formatNumber(cleanValue));
      
      // Update global state
      const numericValue = parseFloat(cleanValue) || 0;
      dispatch(updateBudgetData({ totalBudget: numericValue }));
    }
  };

  return (
    <div 
      className={`w-80 flex-shrink-0 h-full overflow-auto ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '100px',
        marginLeft: '24px'
      }}
    >
      <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: '16px' }}>
        {/* Budget Estimate */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Budget Estimate
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconCurrencyDollar size={18} color="#666" />
              <input
                type="text"
                value={budgetInput}
                onChange={handleBudgetChange}
                placeholder="Enter budget"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Audience Estimate */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)' }}>
              Audience Estimate
            </Text>
            <Tooltip
              label={isOmnichannel 
                ? "Dynamic estimate of your audience size based on selected channels, budget allocation, and targeting. This correlates with the Total Reach shown in the allocation chart."
                : "Estimated audience size based on your budget, targeting criteria, and market conditions."
              }
              position="right"
              withArrow
              multiline
              w={280}
            >
              <IconInfoCircle size={14} color="#666" style={{ cursor: 'help' }} />
            </Tooltip>
          </div>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            <Text size="md" fw={600} ta="left">
              {audienceEstimation > 0 ? audienceEstimation.toLocaleString('en-US') : '--'}
            </Text>
          </div>
        </div>

        {/* Market Estimate */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Market Estimate
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            {!isOmnichannel && linearMarketDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Markets */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.marketsCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Markets
                  </Text>
                </div>
                
                {/* Broadcasters */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.broadcastersCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Broadcasters
                  </Text>
                </div>
                
                {/* Stations */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>
                    {linearMarketDetails.programsCount}
                  </Text>
                  <Text size="sm" style={{ color: '#666' }}>
                    Stations
                  </Text>
                </div>
              </div>
            ) : (
              <Text size="md" fw={600} ta="left">
                {marketEstimation > 0 ? marketEstimation.toLocaleString('en-US') : '--'}
              </Text>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        <AISuggestionCard pageKey={pageKey} />
      </div>
    </div>
  );
};

export default RightSidebar;
