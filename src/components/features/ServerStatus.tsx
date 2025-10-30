'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { fetchServerStatus, clearError } from '@/store/slices/serverStatusSlice';
import { Container, Card, Title, Text, Button, Group, Badge, Stack, Loader, Alert } from '@mantine/core';
import { motion } from 'framer-motion';

export default function ServerStatus() {
  const dispatch = useAppDispatch();
  const { data, loading, error, lastUpdated } = useAppSelector((state) => state.serverStatus);

  useEffect(() => {
    // Load status on component mount
    dispatch(fetchServerStatus());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchServerStatus());
  };

  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <Container size="md" style={{ marginTop: '20px' }} >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Title order={2}>Server Status</Title>
              <Button 
                onClick={handleRefresh} 
                loading={loading}
                variant="light"
                size="sm"
              >
                Refresh
              </Button>
            </Group>

            {error && (
              <Alert color="red" title="Error" onClose={() => dispatch(clearError())}>
                {error}
              </Alert>
            )}

            {loading && !data && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loader size="md" />
                <Text size="sm" c="dimmed" mt="sm">Loading server status...</Text>
              </div>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text fw={500}>Status:</Text>
                    <Badge color={getStatusColor(data.server)} variant="filled">
                      {data.server.toUpperCase()}
                    </Badge>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Version:</Text>
                    <Text>{data.version}</Text>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Environment:</Text>
                    <Badge variant="light">
                      {data.environment.toUpperCase()}
                    </Badge>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Uptime:</Text>
                    <Text>{formatUptime(data.uptime)}</Text>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Memory Usage:</Text>
                    <Text>{data.memory.used} MB / {data.memory.total} MB</Text>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Last Updated:</Text>
                    <Text size="sm" c="dimmed">
                      {lastUpdated && new Date(lastUpdated).toLocaleTimeString()}
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Text fw={500}>Server Time:</Text>
                    <Text size="sm" c="dimmed">
                      {new Date(data.timestamp).toLocaleString()}
                    </Text>
                  </Group>
                </Stack>
              </motion.div>
            )}
          </Stack>
        </div>
      </motion.div>
    </Container>
  );
}