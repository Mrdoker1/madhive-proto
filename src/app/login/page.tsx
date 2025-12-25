'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Button, Text, Paper, Group, Checkbox, Anchor, Divider } from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For prototype, accept any credentials
    setIsLoading(false);
    router.push('/linear-dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FDFCFA 0%, #F3F2EB 50%, #E6E3E8 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41, 16, 54, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-15%',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 102, 188, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <Paper
        radius="lg"
        p="xl"
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '24px',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'white'
        }}
      >
        {/* Logo and Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '8px',
            position: 'relative'
          }}>
            <Image
              src="/assets/icons/header/logo.svg"
              alt="MadHive Logo"
              width={160}
              height={42}
              priority
            />
            <span style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '90px', 
              fontSize: '11px', 
              color: '#291036', 
              fontWeight: 600, 
              letterSpacing: '0.5px',
              backgroundColor: '#F3F2EB',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              Proto
            </span>
          </div>
          
          <Text size="lg" fw={600} c="#291036" mt="md">
            Linear Campaign Manager
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Sign in to manage your advertising campaigns
          </Text>
        </div>

        <Divider mb="lg" color="var(--border-color)" />

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="your.email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftSection={<IconMail size={18} stroke={1.5} />}
            size="md"
            styles={{
              label: { marginBottom: '6px', fontWeight: 500, color: '#374151' },
              input: { 
                borderColor: 'var(--form-input-border)',
                '&:focus': { borderColor: 'var(--primary-color)' }
              }
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftSection={<IconLock size={18} stroke={1.5} />}
            size="md"
            mt="md"
            styles={{
              label: { marginBottom: '6px', fontWeight: 500, color: '#374151' },
              input: { 
                borderColor: 'var(--form-input-border)',
                '&:focus': { borderColor: 'var(--primary-color)' }
              }
            }}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
              size="sm"
              styles={{
                label: { color: '#666', fontSize: '13px' }
              }}
            />
            <Anchor 
              component="button" 
              type="button" 
              size="sm" 
              c="#291036"
              style={{ fontWeight: 500 }}
            >
              Forgot password?
            </Anchor>
          </Group>

          {error && (
            <Text size="sm" c="red" mt="md" ta="center">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            fullWidth
            size="md"
            mt="xl"
            loading={isLoading}
            style={{
              backgroundColor: 'var(--primary-color)',
              height: '44px',
              fontWeight: 600
            }}
          >
            Sign In
          </Button>
        </form>

        <Divider my="lg" label="or" labelPosition="center" color="var(--border-color)" />

        <Text size="xs" c="dimmed" ta="center">
          Need an account?{' '}
          <Anchor 
            component="button" 
            type="button" 
            size="xs" 
            c="#291036"
            style={{ fontWeight: 600 }}
          >
            Contact your administrator
          </Anchor>
        </Text>

        {/* Footer info */}
        <div style={{ 
          marginTop: '32px', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <Text size="xs" c="dimmed">
            © 2025 MadHive. All rights reserved.
          </Text>
          <Group justify="center" gap="xs" mt={8}>
            <Anchor size="xs" c="dimmed">Privacy Policy</Anchor>
            <Text size="xs" c="dimmed">•</Text>
            <Anchor size="xs" c="dimmed">Terms of Service</Anchor>
          </Group>
        </div>
      </Paper>
    </div>
  );
}

