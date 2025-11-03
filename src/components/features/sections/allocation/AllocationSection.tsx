'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, Group, Switch } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateChannelsData } from '@/store/slices/campaignSlice';
import { ChannelPoint, ChannelAllocation, ChartDimensions } from './types';
import { channelColors, channelNames, CHART_CONFIG, CHANNEL_REACH_COEFFICIENTS } from './constants';
import { DraggablePoint } from './components/DraggablePoint';
import { ChartGrid } from './components/ChartGrid';
import { ChartAxes } from './components/ChartAxes';
import { ChartLines } from './components/ChartLines';
import { 
  ChannelAllocation as SliderChannelAllocation, 
  ChannelSlider,
  SuggestedChannelSlider,
  fetchForecastMetrics
} from './components/sliders';
import { redistributeBudgetSmart } from './utils';
import { calculateReachByFormula, CHANNEL_CONFIGS, calculateDefaultBudgetAllocation } from './channelConfig';

export const AllocationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const channelsData = useAppSelector((state) => state.campaign.channels);
  const totalBudget = useAppSelector((state) => state.campaign.budget.totalBudget);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState<ChartDimensions>({ width: 600, height: 300 });
  
  const selectedChannels = channelsData.selectedChannels;
  const channelCount = selectedChannels.length;
  
  // All available channels
  const allAvailableChannels = Object.keys(CHANNEL_CONFIGS);
  // Channels that are not selected
  const unselectedChannels = allAvailableChannels.filter(ch => !selectedChannels.includes(ch));
  // Suggested channel (first unused one)
  const suggestedChannel = unselectedChannels.length > 0 ? unselectedChannels[0] : null;
  
  // Unified state for channels (contains data for chart and sliders)
  const [channelData, setChannelData] = useState<Record<string, ChannelPoint & SliderChannelAllocation>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [showChannelColors, setShowChannelColors] = useState(false); // Setting for showing colors on labels


  // Track container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const rect = chartContainerRef.current.getBoundingClientRect();
        
        setChartDimensions({
          width: rect.width - CHART_CONFIG.OFFSET_X, // Minus offset for Y-axis
          height: 300 // Fixed height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize channel data (for chart and sliders)
  useEffect(() => {
    const initializeChannelData = async () => {
      if (!totalBudget || selectedChannels.length === 0) return;
      
      // Check if there is already a saved budget allocation in Redux
      // If yes - use it, if no - calculate default
      let budgetAllocation: Record<string, number>;
      let needsSave = false; // Flag: whether to save to Redux
      
      if (channelsData.budgetAllocation && Object.keys(channelsData.budgetAllocation).length > 0) {
        // Use existing allocation from Redux
        budgetAllocation = { ...channelsData.budgetAllocation };
        
        // MIGRATION: if there's an old 'display' key, rename to 'preroll'
        if (budgetAllocation['display'] !== undefined) {
          budgetAllocation['preroll'] = budgetAllocation['display'];
          delete budgetAllocation['display'];
          needsSave = true;
        }
        
        // Check that ALL selected channels have budget
        const allChannelsHaveBudget = selectedChannels.every(ch => budgetAllocation[ch] && budgetAllocation[ch] > 0);
        
        if (!allChannelsHaveBudget) {
          // If there are channels without budget, recalculate allocation for all
          budgetAllocation = calculateDefaultBudgetAllocation(selectedChannels, totalBudget);
          needsSave = true;
        }
      } else {
        // Calculate default allocation only on first initialization
        budgetAllocation = calculateDefaultBudgetAllocation(selectedChannels, totalBudget);
        needsSave = true;
      }
      
      const newChannelData: Record<string, ChannelPoint & SliderChannelAllocation> = {};
      const loadingStates: Record<string, boolean> = {};

      for (let index = 0; index < selectedChannels.length; index++) {
        const channelId = selectedChannels[index];
        const budgetPerChannel = budgetAllocation[channelId] || 0;
        
        loadingStates[channelId] = true;
        setIsLoading(prev => ({ ...prev, [channelId]: true }));
        
        // Get metrics for sliders
        const metrics = await fetchForecastMetrics(channelId, budgetPerChannel, totalBudget);
        
        // Calculate reach by new formula considering totalBudget
        const calculatedReach = calculateReachByFormula(channelId, budgetPerChannel, totalBudget);
        
        // Get channel configuration
        const channelConfig = CHANNEL_CONFIGS[channelId];
        
        newChannelData[channelId] = {
          // Data for chart
          id: channelId,
          name: channelConfig?.name || channelNames[channelId] || channelId,
          color: channelConfig?.color || channelColors[channelId] || '#6B7280',
          budget: budgetPerChannel,
          reach: calculatedReach,
          // Data for sliders
          maxReach: metrics.maxReach, // Use absolute value from new formula
          reachPercent: metrics.reachPercent,
          isInefficient: false
        };
        
        loadingStates[channelId] = false;
      }
      
      setChannelData(newChannelData);
      setIsLoading(loadingStates);
      
      // Save budget allocation to Redux if it was changed/recalculated
      if (needsSave) {
        dispatch(updateChannelsData({ budgetAllocation }));
      }
    };

    initializeChannelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannels, totalBudget, dispatch]); // Removed channelsData.budgetAllocation from dependencies

  const points = Object.values(channelData);
  
  // Minimum budget to display chart
  const MIN_BUDGET_FOR_CHART = 1000;
  const shouldShowChart = totalBudget >= MIN_BUDGET_FOR_CHART;
  
  // Handler for point change on chart with metrics update
  const handlePointChange = useCallback(async (channelId: string, newBudget: number) => {
    // Limit budget to maximum value and round to multiple of 100
    const clampedBudget = Math.round(Math.min(Math.max(0, newBudget), totalBudget) / 100) * 100;

    // Get current budgets of all channels
    const currentBudgets: Record<string, number> = {};
    Object.keys(channelData).forEach(id => {
      currentBudgets[id] = channelData[id].budget;
    });

    // Smart redistribution considering coefficients
    const newBudgets = redistributeBudgetSmart(currentBudgets, channelId, clampedBudget, totalBudget);

    // Update loading state for all channels
    const loadingUpdates: Record<string, boolean> = {};
    Object.keys(newBudgets).forEach(id => {
      loadingUpdates[id] = true;
    });
    setIsLoading(prev => ({ ...prev, ...loadingUpdates }));

    // Update all channels with new budgets, reach and metrics
    try {
      const updatedChannelData = { ...channelData };
      
      // Update metrics for all affected channels in parallel
      const metricPromises = Object.keys(newBudgets).map(async (id) => {
        const newChannelBudget = newBudgets[id];
        const calculatedReach = calculateReachByFormula(id, newChannelBudget, totalBudget);
        const metrics = await fetchForecastMetrics(id, newChannelBudget, totalBudget);
        
        return {
          id,
          data: {
            ...updatedChannelData[id],
            budget: newChannelBudget,
            reach: calculatedReach,
            maxReach: metrics.maxReach,
            reachPercent: metrics.reachPercent,
            isInefficient: false
          }
        };
      });

      const results = await Promise.all(metricPromises);
      
      // Apply all updates simultaneously
      const finalData = { ...updatedChannelData };
      results.forEach(result => {
        finalData[result.id] = result.data;
      });
      
      setChannelData(finalData);
      
      console.log('[handleBudgetChange] ✅ Метрики обновлены!');
      
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      // Remove loading state for all channels
      const loadingClearUpdates: Record<string, boolean> = {};
      Object.keys(newBudgets).forEach(id => {
        loadingClearUpdates[id] = false;
      });
      setIsLoading(prev => ({ ...prev, ...loadingClearUpdates }));
    }
  }, [totalBudget, channelData, dispatch]);

  // Handler for budget change with smart redistribution
  const handleBudgetChange = async (channelId: string, newBudget: number) => {
    const currentData = channelData[channelId];
    if (!currentData) return;

    // Limit budget to maximum value and round to multiple of 100
    const clampedBudget = Math.round(Math.min(Math.max(0, newBudget), totalBudget) / 100) * 100;

    // Get current budgets of all channels
    const currentBudgets: Record<string, number> = {};
    Object.keys(channelData).forEach(id => {
      currentBudgets[id] = channelData[id].budget;
    });

    // Smart redistribution considering coefficients
    const newBudgets = redistributeBudgetSmart(currentBudgets, channelId, clampedBudget, totalBudget);
    
    // 🚨 CRITICAL: Save to Redux IMMEDIATELY, before async operations!
    dispatch(updateChannelsData({ budgetAllocation: newBudgets }));

    // Update loading state for all channels
    const loadingUpdates: Record<string, boolean> = {};
    Object.keys(newBudgets).forEach(id => {
      loadingUpdates[id] = true;
    });
    setIsLoading(prev => ({ ...prev, ...loadingUpdates }));

    // Update all channels with new budgets, reach and metrics
    try {
      const updatedChannelData = { ...channelData };
      
      // Update metrics for all affected channels in parallel
      const metricPromises = Object.keys(newBudgets).map(async (id) => {
        const newChannelBudget = newBudgets[id];
        const calculatedReach = calculateReachByFormula(id, newChannelBudget, totalBudget);
        const metrics = await fetchForecastMetrics(id, newChannelBudget, totalBudget);
        
        return {
          id,
          data: {
            ...updatedChannelData[id],
            budget: newChannelBudget,
            reach: calculatedReach,
            maxReach: metrics.maxReach,
            reachPercent: metrics.reachPercent,
            isInefficient: false
          }
        };
      });

      const results = await Promise.all(metricPromises);
      
      // Apply all updates simultaneously
      const finalData = { ...updatedChannelData };
      results.forEach(result => {
        finalData[result.id] = result.data;
      });
      
      setChannelData(finalData);
      
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      // Remove loading state for all channels
      const loadingClearUpdates: Record<string, boolean> = {};
      Object.keys(newBudgets).forEach(id => {
        loadingClearUpdates[id] = false;
      });
      setIsLoading(prev => ({ ...prev, ...loadingClearUpdates }));
    }
  };

  // Remove channel with budget redistribution
  const handleRemoveChannel = (channelId: string) => {
    // Remove channel from Redux selectedChannels
    const updatedSelectedChannels = selectedChannels.filter(id => id !== channelId);
    
    // Calculate new budget allocation
    const newData = { ...channelData };
    const removedChannelBudget = newData[channelId]?.budget || 0;
    delete newData[channelId];
    
    // Redistribute removed channel's budget among remaining channels
    const remainingChannels = Object.keys(newData);
    if (remainingChannels.length > 0) {
      const budgetPerChannel = removedChannelBudget / remainingChannels.length;
      remainingChannels.forEach(otherId => {
        newData[otherId] = {
          ...newData[otherId],
          budget: newData[otherId].budget + budgetPerChannel
        };
      });
    }
    
    // Update Redux with new channel list and budgets
    const updatedBudgetAllocation: Record<string, number> = {};
    Object.keys(newData).forEach(id => {
      updatedBudgetAllocation[id] = newData[id].budget;
    });
    
    dispatch(updateChannelsData({
      selectedChannels: updatedSelectedChannels,
      budgetAllocation: updatedBudgetAllocation
    }));
    
    // Update local state
    setChannelData(newData);
  };

  // Add suggested channel
  const handleAddSuggestedChannel = useCallback((channelId: string) => {
    // Add channel to Redux
    dispatch(updateChannelsData({
      selectedChannels: [...selectedChannels, channelId]
    }));
  }, [dispatch, selectedChannels]);
  
  // Calculate allocations for budget bar
  const totalAllocatedBudget = points.reduce((sum, point) => sum + point.budget, 0);
  const chartAllocations: ChannelAllocation[] = points.map(point => ({
    ...point,
    percentage: totalAllocatedBudget > 0 ? (point.budget / totalAllocatedBudget) * 100 : 0
  }));

  // All channels for sliders
  const allChannels = Object.values(channelData);

  // Use dynamic dimensions
  const chartWidth = chartDimensions.width;
  const chartHeight = chartDimensions.height;

  // Show placeholder if no channels or budget
  if (channelCount === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="14px" c="dimmed">
          Select channels to display budget distribution
        </Text>
      </div>
    );
  }

  if (!totalBudget || totalBudget === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="14px" c="dimmed">
          Set a budget to display allocation controls
        </Text>
      </div>
    );
  }

  // If budget is less than minimum for chart, show message
  if (totalBudget < MIN_BUDGET_FOR_CHART) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text size="14px" c="dimmed">
          Increase budget to $1,000 to display allocation chart
        </Text>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header with Budget and Legend */}
      <div>
        <Group justify="space-between" align="center" mb="md">
          <Text size="16px" fw={600} c="#374151">
            Budget: ${totalAllocatedBudget.toLocaleString()} in {channelCount} Channels
          </Text>
          <Group gap="lg">
            {points.map(point => (
              <Group key={point.id} gap="xs">
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: point.color
                  }}
                />
                <Text size="13px" fw={500}>{point.name}</Text>
              </Group>
            ))}
          </Group>
        </Group>

        {/* Budget Distribution Bar */}
        <div style={{ 
          display: 'flex', 
          height: '32px', 
          overflow: 'hidden'
        }}>
          {chartAllocations.map(allocation => (
            <div
              key={allocation.id}
              style={{
                backgroundColor: allocation.color,
                width: `${allocation.percentage}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: allocation.percentage > 10 ? '0' : '60px'
              }}
            >
              {allocation.percentage > 10 && (
                <Text size="xs" c="white" fw={600}>
                  ${Math.round(allocation.budget / 1000)}K
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Chart */}
      <div>
        <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="350" style={{ overflow: 'visible' }}>
            <ChartGrid 
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              offsetX={CHART_CONFIG.OFFSET_X}
              offsetY={CHART_CONFIG.OFFSET_Y}
            />
            
            <ChartAxes 
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              offsetX={CHART_CONFIG.OFFSET_X}
              offsetY={CHART_CONFIG.OFFSET_Y}
              totalBudget={totalBudget}
            />
            
            <AnimatePresence mode="popLayout">
              <ChartLines 
                points={points}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                totalBudget={totalBudget}
                offsetX={CHART_CONFIG.OFFSET_X}
                offsetY={CHART_CONFIG.OFFSET_Y}
              />
              
              {/* Draggable points */}
              {points.map(point => (
                <DraggablePoint
                  key={`point-${point.id}`}
                  point={point}
                  chartWidth={chartWidth}
                  chartHeight={chartHeight}
                  totalBudget={totalBudget}
                  onPointChange={handlePointChange}
                />
              ))}
            </AnimatePresence>
          </svg>
        </div>
      </div>

      {/* Budget Allocation Sliders */}
      {selectedChannels.length > 0 && (
        <div style={{ marginTop: '32px', maxWidth: '900px' }}>

          {/* Channel Sliders */}
          {allChannels.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Text size="13px" fw={400} c="#1F2937">
                  Budget allocation by channel:
                </Text>
                {/* <Switch
                  label="Show channel colors on labels"
                  checked={showChannelColors}
                  onChange={(event) => setShowChannelColors(event.currentTarget.checked)}
                  size="sm"
                  styles={{
                    label: {
                      fontSize: '12px',
                      color: '#6B7280'
                    }
                  }}
                /> */}
              </div>
              <AnimatePresence mode="popLayout">
                {allChannels.map(channel => (
                  <ChannelSlider 
                    key={channel.id} 
                    allocation={channel} 
                    onBudgetChange={handleBudgetChange}
                    onRemove={handleRemoveChannel}
                    isLoading={isLoading[channel.id]}
                    showChannelColors={showChannelColors}
                  />
                ))}
              </AnimatePresence>
              
              {/* Suggestion to add channel */}
              <AnimatePresence>
                {suggestedChannel && (
                  <SuggestedChannelSlider
                    channelId={suggestedChannel}
                    channelName={CHANNEL_CONFIGS[suggestedChannel].name}
                    channelColor={CHANNEL_CONFIGS[suggestedChannel].color}
                    roiIncrease={Math.floor(Math.random() * 15) + 5} // Random value 5-20%
                    onAdd={handleAddSuggestedChannel}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllocationSection;
