import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData, updateEstimations } from '@/store/slices/campaignSlice';
import { marketsData } from '@/data/marketsData';
import { getAvailableMarkets, getStationsByMarket, getStationsByMarketAndBroadcaster } from '@/data/stationsData';
import { getBroadcasterByName } from '@/data/broadcastersData';
import { calculateMarketEstimation } from '../utils/marketCalculations';
import type { MarketWithStationsData } from '../types';

export const useMarketsState = () => {
  const dispatch = useAppDispatch();
  const marketsReduxData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  
  const [markets, setMarkets] = useState<MarketWithStationsData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());

  // Derived state
  const selectedMarketsWithStations = markets.filter(market => market.selected);
  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  // Load available markets when broadcasters change
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
      return;
    }

    // Get broadcaster IDs
    const broadcasterIds = linearData.broadcasters
      .map(name => getBroadcasterByName(name)?.id)
      .filter(Boolean) as string[];

    // Get available markets for selected broadcasters
    const availableMarketIds = getAvailableMarkets(broadcasterIds);
    
    // Create markets structure with stations
    const marketsWithStations: MarketWithStationsData[] = availableMarketIds
      .map(marketId => {
        const marketInfo = marketsData.find(m => m.id === marketId);
        if (!marketInfo) return null;

        // Check if this market exists in saved Redux data
        const savedMarket = marketsReduxData.marketsDetails?.find(m => m.id === marketId);

        // Get stations for this market and selected broadcasters
        const stations = broadcasterIds.flatMap(broadcasterId => 
          getStationsByMarketAndBroadcaster(marketId, broadcasterId)
        ).map(station => {
          // Check if station was previously selected
          const savedStation = savedMarket?.stations.find(s => s.id === station.id);
          return {
            ...station,
            selected: savedStation?.selected || false,
            percentage: savedStation?.percentage || 0,
            budget: savedStation?.budget || 0
          };
        });

        return {
          id: marketInfo.id,
          name: marketInfo.name,
          displayName: marketInfo.displayName,
          rank: marketInfo.rank,
          marketSize: marketInfo.marketSize,
          percentage: savedMarket?.percentage || 0,
          budget: savedMarket?.budget || 0,
          selected: savedMarket?.selected || false, // Restore from Redux
          stations
        };
      })
      .filter(Boolean) as MarketWithStationsData[];

    // Sort by rank
    marketsWithStations.sort((a, b) => a.rank - b.rank);

    // Show all available markets, restoring selection from Redux
    setMarkets(marketsWithStations);
  }, [linearData.broadcasters]);

  // Update budgets when total budget changes
  useEffect(() => {
    if (markets.length === 0) return;

    const selectedMarkets = markets.filter(m => m.selected);
    if (selectedMarkets.length === 0) return;

    const percentagePerMarket = Math.round((100 / selectedMarkets.length) * 100) / 100;

    setMarkets(currentMarkets => 
      currentMarkets.map(market => {
        if (market.selected) {
          const marketBudget = (budgetData.totalBudget * percentagePerMarket) / 100;
          const selectedStationsCount = market.stations.filter(s => s.selected).length;
          const budgetPerStation = selectedStationsCount > 0 ? marketBudget / selectedStationsCount : 0;

          return {
            ...market,
            percentage: percentagePerMarket,
            budget: marketBudget,
            stations: market.stations.map(station => ({
              ...station,
              budget: station.selected ? budgetPerStation : 0
            }))
          };
        }
        return market;
      })
    );
  }, [budgetData.totalBudget]);

  // Update Redux when markets change
  useEffect(() => {
    // Update list of selected markets in Redux
    const selectedMarketNames = markets
      .filter(m => m.selected)
      .map(m => m.name);
    
    const marketsDetails = markets
      .filter(market => market.selected)
      .map(market => ({
        id: market.id,
        name: market.name,
        displayName: market.displayName,
        selected: market.selected,
        percentage: market.percentage,
        budget: market.budget,
        stations: market.stations
          .filter(station => station.selected)
          .map(station => ({
            id: station.id,
            name: station.name,
            selected: station.selected,
            percentage: station.percentage,
            budget: station.budget
          }))
      }));
    
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames, marketsDetails }));

    // Update estimations - calculate only if there are selected markets
    const selectedMarkets = markets.filter(m => m.selected);
    
    if (selectedMarkets.length > 0) {
      const marketEstimation = calculateMarketEstimation(markets);
      dispatch(updateEstimations({ marketEstimation }));
    } else {
      dispatch(updateEstimations({ marketEstimation: 0 }));
    }
  }, [markets, dispatch]);

  // Auto-expand detailed tables when markets are selected
  useEffect(() => {
    if (selectedMarketsWithStations.length > 0) {
      // Automatically expand all selected markets
      const newExpanded = new Set(selectedMarketsWithStations.map(m => m.id));
      setExpandedDetails(newExpanded);
    } else {
      // Collapse all if nothing is selected
      setExpandedDetails(new Set());
    }
  }, [selectedMarketsWithStations.length]);

  // Get available markets for filter (memoized) - all available markets
  const availableMarketsForFilter = useMemo(() => 
    markets.map(market => ({
      id: market.id,
      name: market.name,
      displayName: market.displayName
    })), [markets]
  );

  // Get selected market names for multiselect (memoized)
  const selectedMarketNames = useMemo(() => 
    markets
      .filter(m => m.selected)
      .map(m => m.name), 
    [markets]
  );

  return {
    // State
    markets,
    expandedDetails,
    selectedMarketsWithStations,
    allSelected,
    someSelected,
    availableMarkets: availableMarketsForFilter,
    selectedMarketNames,
    
    // Internal setters (for handlers)
    setMarkets,
    setExpandedDetails,
    
    // Redux data
    budgetData,
    dispatch
  };
};
