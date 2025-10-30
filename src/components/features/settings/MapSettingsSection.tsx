'use client';

import React, { useState, useEffect } from 'react';
import { PasswordInput, Button, Alert } from '@mantine/core';
import { IconKey, IconCheck, IconAlertCircle } from '@tabler/icons-react';

const MapSettingsSection: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load current API key
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setApiKey(data.mapboxApiKey || '');
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
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
        body: JSON.stringify({ mapboxApiKey: apiKey }),
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
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
        Map Settings
      </h2>

      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>
            Mapbox API Key
          </label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <PasswordInput
              placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
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
          Get a free API key at{' '}
          <a
            href="https://account.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#291036', textDecoration: 'underline' }}
          >
            mapbox.com
          </a>
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
            Settings saved successfully! Refresh the Dashboard page to apply changes.
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

export default MapSettingsSection;

