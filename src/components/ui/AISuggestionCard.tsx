'use client';

import React, { useState, useEffect } from 'react';
import { Card, Text, Loader } from '@mantine/core';
import Image from 'next/image';
import { useAISuggestion } from '@/hooks/useAISuggestion';

interface AISuggestionCardProps {
  pageKey?: string;
  className?: string;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ 
  pageKey = 'default',
  className = '' 
}) => {
  // Получаем AI подсказки для текущей страницы
  const { suggestion, isLoading: aiLoading } = useAISuggestion(pageKey);
  
  // Получаем текущего AI провайдера из настроек
  const [aiProvider, setAiProvider] = useState<string>('DeepSeek');
  
  useEffect(() => {
    // Загружаем настройки AI провайдера
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.aiProvider) {
          setAiProvider(data.aiProvider === 'deepseek' ? 'DeepSeek' : 'OpenAI');
        }
      })
      .catch(err => console.error('Failed to load AI provider settings:', err));
  }, []);

  return (
    <Card
      padding="md"
      radius="md"
      styles={{
        root: {
          backgroundColor: '#FFFFFF',
          position: 'relative',
          paddingTop: '20px',
          boxShadow: 'none'
        }
      }}
      className={className}
    >
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px'
      }}>
        <Image
          src="/assets/icons/other/spark.svg"
          alt="AI Spark"
          width={20}
          height={20}
        />
      </div>
      
      {aiLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '30px' }}>
          <Loader size="xs" />
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5 }}>
            Generating AI suggestion...
          </Text>
        </div>
      ) : (
        <>
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5, paddingRight: '30px' }}>
            {suggestion || 'Configure your campaign settings to receive AI-powered recommendations and insights...'}
          </Text>
          <div style={{ 
            marginTop: '12px', 
            paddingTop: '8px', 
            borderTop: '1px solid #E9ECEF',
            paddingRight: '30px'
          }}>
            <Text size="10px" style={{ color: '#999', lineHeight: 1.3, marginBottom: '4px' }}>
              AI responses may be inaccurate or incomplete.
            </Text>
            <Text size="10px" style={{ color: 'grey', lineHeight: 1.3, }}>
              Powered by {aiProvider}
            </Text>
          </div>
        </>
      )}
    </Card>
  );
};

export default AISuggestionCard;

