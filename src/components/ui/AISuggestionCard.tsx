'use client';

import React, { useState, useEffect } from 'react';
import { Card, Text, Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAISuggestion } from '@/hooks/useAISuggestion';

interface AISuggestionCardProps {
  pageKey?: string;
  className?: string;
}

// Component for typing effect (with Framer Motion)
const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
    </motion.span>
  );
};

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ 
  pageKey = 'default',
  className = '' 
}) => {
  // Get AI suggestions for current page
  const { suggestion, isLoading: aiLoading } = useAISuggestion(pageKey);
  
  // Get current AI provider from settings
  const [aiProvider, setAiProvider] = useState<string>('DeepSeek');
  
  useEffect(() => {
    // Load AI provider settings
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '30px' }}>
          <Loader size="sm" type="dots" color="var(--primary-color)" />
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5 }}>
            Analyzing your campaign
          </Text>
        </div>
      ) : (
        <>
          <Text size="xs" style={{ color: '#666', lineHeight: 1.5, paddingRight: '30px' }}>
            {suggestion ? (
              <TypingText text={suggestion} />
            ) : (
              'Configure your campaign settings to receive AI-powered recommendations and insights...'
            )}
          </Text>
          <div style={{ 
            marginTop: '12px', 
            paddingTop: '8px', 
            borderTop: '1px solid #E9ECEF',
            paddingRight: '30px'
          }}>
            <Text size="10px" style={{ color: 'grey', lineHeight: 1.3, }}>
            AI responses may be inaccurate or incomplete. Powered by {aiProvider}.
            </Text>
          </div>
        </>
      )}
    </Card>
  );
};

export default AISuggestionCard;

