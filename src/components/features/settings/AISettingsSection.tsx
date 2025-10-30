'use client';

import React, { useState, useEffect } from 'react';
import { PasswordInput, Button, Alert, Radio, Group } from '@mantine/core';
import { IconKey, IconCheck, IconAlertCircle } from '@tabler/icons-react';

const AISettingsSection: React.FC = () => {
  const [aiProvider, setAiProvider] = useState<'deepseek' | 'openai'>('deepseek');
  const [deepseekApiKey, setDeepseekApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load current settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setAiProvider(data.aiProvider || 'deepseek');
      setDeepseekApiKey(data.deepseekApiKey || '');
      setOpenaiApiKey(data.openaiApiKey || '');
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleSave = async () => {
    const currentApiKey = aiProvider === 'deepseek' ? deepseekApiKey : openaiApiKey;
    
    if (!currentApiKey.trim()) {
      setError('API key cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aiProvider,
          deepseekApiKey,
          openaiApiKey
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        padding: '8px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>
          AI Provider
        </h2>

        <Radio.Group
          value={aiProvider}
          onChange={(value) => setAiProvider(value as 'deepseek' | 'openai')}
        >
          <Group gap="md">
            <Radio
              value="deepseek"
              label="DeepSeek"
              styles={{
                label: {
                  fontSize: '12px',
                  color: '#374151',
                  cursor: 'pointer'
                },
                radio: {
                  cursor: 'pointer'
                }
              }}
            />
            <Radio
              value="openai"
              label="OpenAI"
              styles={{
                label: {
                  fontSize: '12px',
                  color: '#374151',
                  cursor: 'pointer'
                },
                radio: {
                  cursor: 'pointer'
                }
              }}
            />
          </Group>
        </Radio.Group>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>
            {aiProvider === 'deepseek' ? 'DeepSeek API Key' : 'OpenAI API Key'}
          </label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {aiProvider === 'deepseek' ? (
              <PasswordInput
                placeholder="sk-..."
                value={deepseekApiKey}
                onChange={(e) => setDeepseekApiKey(e.target.value)}
                leftSection={<IconKey size={16} />}
                style={{ flex: 1 }}
                styles={{
                  input: {
                    fontSize: '14px',
                    padding: '10px 12px 10px 36px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }
                }}
              />
            ) : (
              <PasswordInput
                placeholder="sk-proj-..."
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                leftSection={<IconKey size={16} />}
                style={{ flex: 1 }}
                styles={{
                  input: {
                    fontSize: '14px',
                    padding: '10px 12px 10px 36px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }
                }}
              />
            )}
            <Button
              variant="outline"
              onClick={handleSave}
              loading={loading}
              styles={{
                root: {
                  borderColor: '#291036',
                  color: '#291036',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '0 20px',
                  borderRadius: '8px',
                  height: '34px',
                  flexShrink: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(41, 16, 54, 0.05)'
                  }
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px', marginBottom: '16px' }}>
          {aiProvider === 'deepseek' ? (
            <>
              Get your DeepSeek API key at{' '}
              <a
                href="https://platform.deepseek.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#291036', textDecoration: 'underline' }}
              >
                platform.deepseek.com
              </a>
            </>
          ) : (
            <>
              Get your OpenAI API key at{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#291036', textDecoration: 'underline' }}
              >
                platform.openai.com
              </a>
            </>
          )}
        </p>

        {success && (
          <Alert
            icon={<IconCheck size={16} />}
            color="green"
            styles={{
              root: {
                marginBottom: '16px'
              }
            }}
          >
            Settings saved successfully!
          </Alert>
        )}

        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            styles={{
              root: {
                marginBottom: '16px'
              }
            }}
          >
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AISettingsSection;

