import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppSelector } from './useRedux';
import { getPromptForPage } from '@/data/aiPrompts';

interface UseAISuggestionResult {
  suggestion: string;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook for getting AI suggestions based on current page context
 * Automatically updates suggestions when campaign data changes
 * @param pageKey - Page key to determine the prompt
 */
export const useAISuggestion = (pageKey: string): UseAISuggestionResult => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContextRef = useRef<string>('');

  // Get entire campaign state from Redux
  const campaignState = useAppSelector((state) => state.campaign);

  // Function to extract value by path (e.g., "linearData.selectedMarkets")
  const getValueByPath = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  // Function to build context from Redux state
  const buildContext = useCallback(() => {
    const promptConfig = getPromptForPage(pageKey);
    const context: any = {};

    // If no keys specified, use entire state
    if (promptConfig.contextKeys.length === 0) {
      return campaignState;
    }

    // Extract only needed data from state
    promptConfig.contextKeys.forEach(key => {
      const value = getValueByPath(campaignState, key);
      if (value !== undefined) {
        context[key] = value;
        // console.log(`🔑 Extracted ${key}:`, JSON.stringify(value, null, 2));
      } else {
        // console.log(`❌ Missing key: ${key}`);
      }
    });

    // console.log('📦 Built context:', JSON.stringify(context, null, 2));
    return context;
  }, [pageKey, campaignState]);

  // Function to get suggestion from AI
  const fetchSuggestion = useCallback(async (forceRefresh = false) => {
    const promptConfig = getPromptForPage(pageKey);
    const context = buildContext();

    // Serialize context for comparison
    const contextString = JSON.stringify(context);

    // If context hasn't changed and not forced refresh, skip request
    if (!forceRefresh && contextString === lastContextRef.current) {
      return;
    }

    // If context is empty, show placeholder
    if (Object.keys(context).length === 0) {
      setSuggestion('Configure your campaign settings to get AI-powered suggestions.');
      lastContextRef.current = contextString;
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: promptConfig.systemPrompt,
          context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get suggestion');
      }

      const data = await response.json();
      setSuggestion(data.suggestion);
      lastContextRef.current = contextString; // Save last context
    } catch (err) {
      console.error('Failed to fetch AI suggestion:', err);
      setError(err instanceof Error ? err.message : 'Failed to get suggestion');
      setSuggestion('Unable to generate suggestion at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [pageKey, buildContext]);

  // Function for debounced suggestion updates
  const debouncedFetchSuggestion = useCallback(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestion(false);
    }, 1500); // Wait 1.5 seconds after last change
  }, [fetchSuggestion]);

  // Track changes in campaign state and update suggestions
  useEffect(() => {
    debouncedFetchSuggestion();

    // Cleanup timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [campaignState, debouncedFetchSuggestion]);

  // Function for manual refresh (without debounce)
  const refresh = useCallback(() => {
    // Clear debounce timer if exists
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    fetchSuggestion(true);
  }, [fetchSuggestion]);

  return {
    suggestion,
    isLoading,
    error,
    refresh
  };
};

