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
 * Hook для получения AI подсказок на основе контекста текущей страницы
 * Автоматически обновляет подсказки при изменении данных кампании
 * @param pageKey - Ключ страницы для определения промпта
 */
export const useAISuggestion = (pageKey: string): UseAISuggestionResult => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContextRef = useRef<string>('');

  // Получаем весь state кампании из Redux
  const campaignState = useAppSelector((state) => state.campaign);

  // Функция для извлечения значения по пути (например, "linearData.selectedMarkets")
  const getValueByPath = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  // Функция для формирования контекста из Redux state
  const buildContext = useCallback(() => {
    const promptConfig = getPromptForPage(pageKey);
    const context: any = {};

    // Если нет указанных ключей, используем весь state
    if (promptConfig.contextKeys.length === 0) {
      return campaignState;
    }

    // Извлекаем только нужные данные из state
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

  // Функция для получения подсказки от AI
  const fetchSuggestion = useCallback(async (forceRefresh = false) => {
    const promptConfig = getPromptForPage(pageKey);
    const context = buildContext();

    // Сериализуем контекст для сравнения
    const contextString = JSON.stringify(context);

    // Если контекст не изменился и это не принудительное обновление, пропускаем запрос
    if (!forceRefresh && contextString === lastContextRef.current) {
      return;
    }

    // Если контекст пустой, показываем заглушку
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
      lastContextRef.current = contextString; // Сохраняем последний контекст
    } catch (err) {
      console.error('Failed to fetch AI suggestion:', err);
      setError(err instanceof Error ? err.message : 'Failed to get suggestion');
      setSuggestion('Unable to generate suggestion at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [pageKey, buildContext]);

  // Функция для debounced обновления подсказок
  const debouncedFetchSuggestion = useCallback(() => {
    // Очищаем предыдущий таймер
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Устанавливаем новый таймер
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestion(false);
    }, 1500); // Ждем 1.5 секунды после последнего изменения
  }, [fetchSuggestion]);

  // Отслеживаем изменения в state кампании и обновляем подсказки
  useEffect(() => {
    debouncedFetchSuggestion();

    // Очистка таймера при размонтировании
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [campaignState, debouncedFetchSuggestion]);

  // Функция для ручного обновления (без debounce)
  const refresh = useCallback(() => {
    // Очищаем debounce таймер если есть
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

