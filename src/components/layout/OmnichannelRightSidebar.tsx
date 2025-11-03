'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Text, Card, Group } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateBudgetData } from '@/store/slices/campaignSlice';
import AISuggestionCard from '@/components/ui/AISuggestionCard';
import ChannelPills, { ChannelPill } from '@/components/ui/ChannelPills';

// Channel colors from allocation
const CHANNEL_COLORS: Record<string, string> = {
  total: '#000000',
  ctv: '#FF9BD3', 
  preroll: '#6633CC',
  audio: '#33CCCC',
  display: '#6633CC',
  social: '#FF0099',
  search: '#00A3FF',
  email: '#FFA100'
};

type ChannelType = 'total' | 'ctv' | 'preroll' | 'audio' | 'social' | 'search' | 'email';

interface OmnichannelRightSidebarProps {
  className?: string;
  selectedChannels?: string[]; // Array of selected channels (preroll, ctv, audio, etc.)
  readOnly?: boolean; // If true, budget cannot be edited
  pageKey?: string; // Page key for AI suggestions
}

const OmnichannelRightSidebar: React.FC<OmnichannelRightSidebarProps> = ({ 
  className = '',
  selectedChannels = [],
  readOnly = false,
  pageKey = 'default'
}) => {
  const dispatch = useAppDispatch();
  const [activeChannel, setActiveChannel] = useState<ChannelType>('total');
  const [audienceSize, setAudienceSize] = useState<'Small' | 'Good' | 'Strong'>('Strong');
  
  // Get budget allocation and total budget from Redux
  const budgetAllocation = useAppSelector((state) => state.campaign.channels.budgetAllocation);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget) || 0;
  const channelData = useAppSelector((state) => state.campaign.omnichannel.channelData);
  
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

  const allChannelPills: Record<ChannelType, ChannelPill> = {
    'total': { id: 'total', label: 'Total' },
    'ctv': { id: 'ctv', label: 'CTV' },
    'preroll': { id: 'preroll', label: 'Preroll' },
    'audio': { id: 'audio', label: 'Audio' },
    'social': { id: 'social', label: 'Social' },
    'search': { id: 'search', label: 'Search' },
    'email': { id: 'email', label: 'Email' }
  };
  
  // Filter pills: always show Total + selected channels, sorted by budget (descending)
  const channelPills = useMemo(() => {
    if (selectedChannels.length === 0) {
      // If nothing selected, return all channels (not sorted)
      return Object.values(allChannelPills);
    }
    
    // Sort selected channels by budget (from highest to lowest)
    const sortedChannels = [...selectedChannels].sort((a, b) => {
      const budgetA = budgetAllocation?.[a] || 0;
      const budgetB = budgetAllocation?.[b] || 0;
      return budgetB - budgetA; // Descending order
    });
    
    // Always put Total first, then sorted channels
    return [
      allChannelPills['total'],
      ...sortedChannels.map(channelId => allChannelPills[channelId as ChannelType])
    ];
  }, [selectedChannels, budgetAllocation]);
  
  // If active channel is not in available list, switch to Total
  useEffect(() => {
    const isActiveChannelAvailable = channelPills.some(pill => pill.id === activeChannel);
    if (!isActiveChannelAvailable) {
      setActiveChannel('total');
    }
  }, [channelPills, activeChannel]);

  // List of all possible channels for legend
  const allLegendChannels = [
    { id: 'ctv', label: 'CTV' },
    { id: 'preroll', label: 'Preroll' },
    { id: 'audio', label: 'Audio' },
    { id: 'social', label: 'Social' },
    { id: 'search', label: 'Search' },
    { id: 'email', label: 'Email' }
  ];

  // Filter legend only for selected channels and sort by budget
  const visibleLegendChannels = useMemo(() => {
    const channels = selectedChannels.length > 0
      ? allLegendChannels.filter(channel => selectedChannels.includes(channel.id))
      : allLegendChannels;
    
    // Sort by budget (descending)
    return channels.sort((a, b) => {
      const budgetA = budgetAllocation?.[a.id] || 0;
      const budgetB = budgetAllocation?.[b.id] || 0;
      return budgetB - budgetA;
    });
  }, [selectedChannels, budgetAllocation]);

  // Calculate budget percentage for channel
  const getChannelBudgetPercent = (channelId: string): number => {
    if (!budgetAllocation || totalBudget === 0) return 0;
    const channelBudget = budgetAllocation[channelId] || 0;
    return (channelBudget / totalBudget) * 100;
  };

  // Get Market Estimation for channel
  const getMarketEstimation = (): number => {
    if (activeChannel === 'total') {
      const marketValues = selectedChannels.map(ch => 
        channelData[ch]?.estimations?.marketEstimation || 0
      );
      
      if (marketValues.length === 0) return 0;
      if (marketValues.length === 1) return marketValues[0];
      
      // Check if specific zip codes are used for targeting
      // If at least one channel uses geo-targeting, sum with coefficient
      const hasGeoTargeting = selectedChannels.some(ch => {
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
    } else {
      // For specific channel
      return channelData[activeChannel]?.estimations?.marketEstimation || 0;
    }
  };

  // Get Audience Estimation for channel
  const getAudienceEstimation = (): number => {
    if (activeChannel === 'total') {
      // For Total - sum all channels with overlap consideration
      // Simple logic: ~30% of people see ads in multiple channels
      const audienceValues = selectedChannels.map(ch => 
        channelData[ch]?.estimations?.audienceEstimation || 0
      );
      
      if (audienceValues.length === 0) return 0;
      if (audienceValues.length === 1) return audienceValues[0];
      
      // Sum and apply fixed coefficient 0.7
      const totalSum = audienceValues.reduce((sum, val) => sum + val, 0);
      const totalAudience = Math.round(totalSum * 0.7);
      
      // IMPORTANT: Audience cannot exceed Market Estimation
      const totalMarket = getMarketEstimation();
      
      return Math.min(totalAudience, totalMarket);
    } else {
      // For specific channel
      return channelData[activeChannel]?.estimations?.audienceEstimation || 0;
    }
  };

  // Calculate distribution for selected channels in Total mode
  const getTotalProgressBars = () => {
    if (selectedChannels.length === 0 || !budgetAllocation) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    // Calculate total allocated budget for selected channels
    const totalAllocated = selectedChannels.reduce((sum, channelId) => {
      return sum + (budgetAllocation[channelId] || 0);
    }, 0);

    // If no budget allocated, show gray bar
    if (totalAllocated === 0) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    // Sort channels by budget (descending) for consistent order
    const sortedChannels = [...selectedChannels].sort((a, b) => {
      const budgetA = budgetAllocation[a] || 0;
      const budgetB = budgetAllocation[b] || 0;
      return budgetB - budgetA;
    });

    // Calculate percentage relative to allocated budget (not total budget)
    return sortedChannels.map(channelId => {
      const channelBudget = budgetAllocation[channelId] || 0;
      const percentOfAllocated = (channelBudget / totalAllocated) * 100;
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfAllocated}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Calculate audience percentage for channel
  const getChannelAudiencePercent = (channelId: string): number => {
    if (selectedChannels.length === 0) return 0;
    
    const channelAudience = channelData[channelId]?.estimations?.audienceEstimation || 0;
    const totalAudience = selectedChannels.reduce((sum, ch) => {
      return sum + (channelData[ch]?.estimations?.audienceEstimation || 0);
    }, 0);
    
    return totalAudience > 0 ? (channelAudience / totalAudience) * 100 : 0;
  };

  // Calculate audience distribution for selected channels
  const getTotalAudienceProgressBars = () => {
    if (selectedChannels.length === 0) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    // Sort channels by budget (descending) for consistent order
    const sortedChannels = [...selectedChannels].sort((a, b) => {
      const budgetA = budgetAllocation?.[a] || 0;
      const budgetB = budgetAllocation?.[b] || 0;
      return budgetB - budgetA;
    });

    return sortedChannels.map(channelId => {
      const percentOfTotal = getChannelAudiencePercent(channelId);
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfTotal}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Calculate market estimation percentage for channel
  const getChannelMarketPercent = (channelId: string): number => {
    if (selectedChannels.length === 0) return 0;
    
    const channelMarket = channelData[channelId]?.estimations?.marketEstimation || 0;
    const totalMarket = selectedChannels.reduce((sum, ch) => {
      return sum + (channelData[ch]?.estimations?.marketEstimation || 0);
    }, 0);
    
    return totalMarket > 0 ? (channelMarket / totalMarket) * 100 : 0;
  };

  // Calculate market estimation distribution for selected channels
  const getTotalMarketProgressBars = () => {
    if (selectedChannels.length === 0) {
      return <div style={{ width: '100%', backgroundColor: '#E5E5E5' }} />;
    }

    // Sort channels by budget (descending) for consistent order
    const sortedChannels = [...selectedChannels].sort((a, b) => {
      const budgetA = budgetAllocation?.[a] || 0;
      const budgetB = budgetAllocation?.[b] || 0;
      return budgetB - budgetA;
    });

    return sortedChannels.map(channelId => {
      const percentOfTotal = getChannelMarketPercent(channelId);
      
      return (
        <div 
          key={channelId}
          style={{ 
            width: `${percentOfTotal}%`, 
            backgroundColor: CHANNEL_COLORS[channelId] || '#E5E5E5' 
          }} 
        />
      );
    });
  };

  // Function to determine legend color
  const getLegendColor = (channelId: string): string => {
    if (activeChannel === 'total') {
      return CHANNEL_COLORS[channelId] || '#CCCCCC';
    }
    // If specific channel is selected, only it is colored, rest are gray
    return activeChannel === channelId ? CHANNEL_COLORS[channelId] : '#CCCCCC';
  };

  return (
    <div 
      className={`w-80 flex-shrink-0 ${className}`}
      style={{ 
        backgroundColor: '#F3F2EB',
        maxWidth: '400px',
        borderRadius: '8px',
        marginTop: '24px',
        marginBottom: '24px',
        marginLeft: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: 'calc(100vh - 48px)'
      }}
    >
      {/* Sticky Header with Pills */}
      <div style={{ 
        position: 'sticky',
        top: 0,
        backgroundColor: '#F3F2EB',
        zIndex: 10,
        paddingTop: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }}>
        <ChannelPills
          channels={channelPills}
          activeChannel={activeChannel}
          onChange={(channelId) => setActiveChannel(channelId as ChannelType)}
        />
        {/* Divider */}
        <div style={{ 
          width: 'calc(100% + 48px)', 
          height: '1px', 
          backgroundColor: '#D1D5DB', 
          marginLeft: '-24px',
          marginTop: '16px'
        }} />
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px',
        gap: '16px',
        overflowY: 'auto',
        flex: 1
      }}>
        {/* Budget Estimation */}
        <div>
          <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
            Budget Estimation
          </Text>
          
          <div style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px 16px',
            marginBottom: '8px'
          }}>
            {activeChannel === 'total' ? (
              readOnly ? (
                // Read-only mode - show text
                <Text size="xl" fw={600} ta="center">
                  $ {totalBudget.toLocaleString('en-US')}
                </Text>
              ) : (
                // Edit mode - show input
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <IconCurrencyDollar size={20} color="#666" />
                  <input
                    type="text"
                    value={budgetInput}
                    onChange={handleBudgetChange}
                    placeholder="Enter budget"
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '24px',
                      fontWeight: 600,
                      textAlign: 'center',
                      backgroundColor: 'transparent',
                      width: '100%'
                    }}
                  />
                </div>
              )
            ) : (
              <Text size="xl" fw={600} ta="center">
                {budgetAllocation && budgetAllocation[activeChannel] ? (
                  `$ ${budgetAllocation[activeChannel].toLocaleString('en-US')}`
                ) : (
                  '$ 0'
                )}
              </Text>
            )}
          </div>
          
          {activeChannel === 'total' && selectedChannels.length > 0 && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              of $ {totalBudget.toLocaleString('en-US')} in {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
            </Text>
          )}
          
          {activeChannel !== 'total' && budgetAllocation && budgetAllocation[activeChannel] && (
            <Text size="xs" c="dimmed" ta="right" mb="md">
              {getChannelBudgetPercent(activeChannel).toFixed(1)}% of total budget
            </Text>
          )}
          
          {/* Progress Bar */}
          <div style={{ 
            display: 'flex', 
            height: '8px', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            {activeChannel === 'total' ? (
              getTotalProgressBars()
            ) : (
              <>
                <div style={{ 
                  width: `${getChannelBudgetPercent(activeChannel)}%`, 
                  backgroundColor: CHANNEL_COLORS[activeChannel] 
                }} />
                <div style={{ 
                  width: `${100 - getChannelBudgetPercent(activeChannel)}%`, 
                  backgroundColor: '#E5E5E5' 
                }} />
              </>
            )}
          </div>
          
          {/* Legend */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
            gap: '8px 4px',
            fontSize: '11px',
            color: '#666',
            marginBottom: '16px'
          }}>
            {visibleLegendChannels.map(channel => (
              <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                <span>{channel.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Estimation - show only if at least one channel is selected AND budget is entered */}
        {selectedChannels.length > 0 && totalBudget > 0 && (
          <div>
            <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
              Audience Estimation
            </Text>
            
            <div style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 16px',
              marginBottom: '8px'
            }}>
              <Text size="xl" fw={600} ta="center">
                {getAudienceEstimation().toLocaleString('en-US')}
              </Text>
            </div>
            
            {activeChannel === 'total' && selectedChannels.length > 0 && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                across {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
              </Text>
            )}
            
            {activeChannel !== 'total' && channelData[activeChannel]?.estimations?.audienceEstimation && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                {getChannelAudiencePercent(activeChannel).toFixed(1)}% of total audience
              </Text>
            )}
            
            {/* Progress Bar */}
            <div style={{ 
              display: 'flex', 
              height: '8px', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              {activeChannel === 'total' ? (
                getTotalAudienceProgressBars()
              ) : (
                <>
                  <div style={{ 
                    width: `${getChannelAudiencePercent(activeChannel)}%`, 
                    backgroundColor: CHANNEL_COLORS[activeChannel] 
                  }} />
                  <div style={{ 
                    width: `${100 - getChannelAudiencePercent(activeChannel)}%`, 
                    backgroundColor: '#E5E5E5' 
                  }} />
                </>
              )}
            </div>
            
            {/* Legend */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
              gap: '8px 4px',
              fontSize: '11px',
              color: '#666'
            }}>
              {visibleLegendChannels.map(channel => (
                <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                  <span>{channel.label}</span>
                </div>
              ))}
            </div>
            
            <Text size="sm" fw={500} mb="xs" mt="lg">Your Audience size is: {audienceSize}</Text>
            <Group gap="xs" mb="md">
              <div 
                onClick={() => setAudienceSize('Small')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Small' ? '#B46565' : '#EBE6EC',
                  color: audienceSize === 'Small' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Small</div>
              <div 
                onClick={() => setAudienceSize('Good')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Good' ? '#AFB465' : '#EBE6EC',
                  color: audienceSize === 'Good' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Good</div>
              <div 
                onClick={() => setAudienceSize('Strong')}
                style={{ 
                  flex: 1, 
                  padding: '2px', 
                  textAlign: 'center', 
                  backgroundColor: audienceSize === 'Strong' ? '#65B48C' : '#EBE6EC',
                  color: audienceSize === 'Strong' ? '#FFFFFF' : '#000000',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >Strong</div>
            </Group>
          </div>
        )}

        {/* Market Estimation - show only if at least one channel is selected AND budget is entered */}
        {selectedChannels.length > 0 && totalBudget > 0 && (
          <div>
            <Text size="sm" fw={500} style={{ color: 'var(--form-label-color)', marginBottom: '8px' }}>
              Market Estimation
            </Text>
            
            <div style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 16px',
              marginBottom: '8px'
            }}>
              <Text size="xl" fw={600} ta="center">
                {getMarketEstimation().toLocaleString('en-US')}
              </Text>
            </div>
            
            {activeChannel === 'total' && selectedChannels.length > 0 && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                across {selectedChannels.length} Channel{selectedChannels.length !== 1 ? 's' : ''}
              </Text>
            )}
            
            {activeChannel !== 'total' && channelData[activeChannel]?.estimations?.marketEstimation && (
              <Text size="xs" c="dimmed" ta="right" mb="md">
                {getChannelMarketPercent(activeChannel).toFixed(1)}% of total market
              </Text>
            )}
            
            {/* Progress Bar */}
            <div style={{ 
              display: 'flex',
              height: '8px', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              {activeChannel === 'total' ? (
                getTotalMarketProgressBars()
              ) : (
                <>
                  <div style={{ 
                    width: `${getChannelMarketPercent(activeChannel)}%`, 
                    backgroundColor: CHANNEL_COLORS[activeChannel] 
                  }} />
                  <div style={{ 
                    width: `${100 - getChannelMarketPercent(activeChannel)}%`, 
                    backgroundColor: '#E5E5E5' 
                  }} />
                </>
              )}
            </div>
            
            {/* Legend */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visibleLegendChannels.length, 3)}, 1fr)`,
              gap: '8px 4px',
              fontSize: '11px',
              color: '#666'
            }}>
              {visibleLegendChannels.map(channel => (
                <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLegendColor(channel.id) }} />
                  <span>{channel.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <div style={{ marginBottom: '100px' }}>
          <AISuggestionCard pageKey={pageKey} />
        </div>
      </div>
    </div>
  );
};

export default OmnichannelRightSidebar;

