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
        p={0}
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '24px',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'white',
          overflow: 'hidden'
        }}
      >
        {/* Logo and Branding */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '24px 24px 0 24px'
        }}>
          <div style={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Image
              src="/assets/icons/header/logo.svg"
              alt="MadHive Logo"
              width={120}
              height={32}
              priority
              style={{ 
                objectFit: 'contain', 
                boxSizing: 'content-box',
                height: 'fit-content',
                width: '64px'
              }}
            />
            <span style={{ 
              position: 'absolute', 
              top: '-6px', 
              right: '-24px', 
              fontSize: '10px', 
              color: '#291036', 
              fontWeight: 600, 
              letterSpacing: '0.5px',
              backgroundColor: '#F3F2EB',
              padding: '2px 5px',
              borderRadius: '3px'
            }}>
              Beta
            </span>
          </div>
          
          <Image
            src="/assets/icons/header/programmatic-tv-logo.png"
            alt="Programmatic Television"
            width={140}
            height={56}
            priority
            style={{ 
              objectFit: 'contain', 
              marginLeft: '0px', 
              marginRight: '0px',
              boxSizing: 'content-box',
              height: '40px',
              width: '132px'
            }}
          />
        </div>

        <Divider mb="lg" color="var(--border-color)" />

        <form onSubmit={handleSubmit} style={{ padding: '0 24px' }}>
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

        <Divider 
          my="lg" 
          label="or" 
          labelPosition="center" 
          color="var(--border-color)" 
          style={{ margin: '0 24px' }}
          styles={{
            label: {
              gap: '0px',
              marginTop: '12px',
              marginBottom: '12px'
            }
          }}
        />

        <Text size="xs" c="dimmed" ta="center" style={{ padding: '0 24px 24px 24px' }}>
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
      </Paper>
    </div>
  );
}

