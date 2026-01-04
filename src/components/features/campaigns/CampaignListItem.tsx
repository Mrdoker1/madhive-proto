'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress, Menu, ActionIcon, Modal, Button, Text, Group } from '@mantine/core';
import { Line, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import type { CampaignSummary } from '@/data/campaignsData';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import { ApprovalStatusBadge } from './ApprovalStatusBadge';
import { IconDotsVertical, IconTrash, IconX, IconEdit, IconFileText, IconFileDownload } from '@tabler/icons-react';
import CampaignDetailModal from './CampaignDetailModal';

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Function to format channel names
function formatChannelName(channel: string): string {
  const channelNames: Record<string, string> = {
    'preroll': 'Preroll',
    'ctv': 'CTV',
    'audio': 'Audio',
    'social': 'Social',
    'search': 'Search',
    'email': 'Email',
    'display': 'Display',
    'linear_tv': 'Linear TV',
    'Linear TV': 'Linear TV',
    'CTV': 'CTV'
  };
  
  return channelNames[channel] || channel.charAt(0).toUpperCase() + channel.slice(1);
}

interface CampaignListItemProps {
  c: CampaignSummary;
  onDeleteCampaign?: (campaignId: string) => void;
  onCancelCampaign?: (campaignId: string) => void;
  onApproveCampaign?: (campaignId: string) => void;
}

export default function CampaignListItem({ c, onDeleteCampaign, onCancelCampaign, onApproveCampaign }: CampaignListItemProps) {
  const router = useRouter();
  const data = c.sparkline.map((v, i) => ({ i, v }));
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [reviseModalOpen, setReviseModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  // Check if campaign can be deleted (not booked yet = Not Started status)
  const canDelete = c.status === 'Not Started';
  
  // Check if campaign can be cancelled (at least 2 days from starting - for prototype, allow if not completed)
  const canCancel = c.status !== 'Completed' && c.status !== 'Not Started';
  
  // Check if campaign can be revised (after flight has begun)
  const canRevise = c.status !== 'Not Started' && c.status !== 'Completed';
  
  const handleClick = () => {
    // Open campaign detail modal
    setDetailModalOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    onDeleteCampaign?.(c.id);
    setDeleteModalOpen(false);
  };
  
  const handleCancelConfirm = () => {
    onCancelCampaign?.(c.id);
    setCancelModalOpen(false);
  };
  
  const handleReviseConfirm = () => {
    // Navigate to edit campaign
    router.push(`/campaign/linear/new?edit=${c.id}`);
    setReviseModalOpen(false);
  };
  
  const handleViewAgencyOrder = () => {
    // Simulate download
    alert(`Downloading Agency Order for campaign: ${c.name}`);
  };
  
  const handleViewBroadcasterOrders = () => {
    // Simulate download
    alert(`Downloading Broadcaster Orders for campaign: ${c.name}`);
  };
  
  return (
    <>
      {/* Campaign Detail Modal */}
      <CampaignDetailModal
        campaign={c}
        opened={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onApproveCampaign={onApproveCampaign}
      />

      {/* Delete Confirmation Modal */}
      <Modal 
        opened={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        title="Delete Campaign"
        centered
      >
        <Text size="sm" mb="lg">
          Are you sure you want to delete this campaign? This action cannot be undone.
        </Text>
        <Text size="sm" fw={500} mb="lg" c="dimmed">
          Campaign: {c.name}
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteConfirm}>
            Delete Campaign
          </Button>
        </Group>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal 
        opened={cancelModalOpen} 
        onClose={() => setCancelModalOpen(false)} 
        title="Cancel Campaign"
        centered
      >
        <Text size="sm" mb="lg">
          Are you sure you want to cancel this campaign? The campaign will be stopped and cannot be resumed.
        </Text>
        <Text size="sm" fw={500} mb="lg" c="dimmed">
          Campaign: {c.name}
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={() => setCancelModalOpen(false)}>
            Go Back
          </Button>
          <Button color="orange" onClick={handleCancelConfirm}>
            Cancel Campaign
          </Button>
        </Group>
      </Modal>

      {/* Revise Confirmation Modal */}
      <Modal 
        opened={reviseModalOpen} 
        onClose={() => setReviseModalOpen(false)} 
        title="Revise Campaign"
        centered
      >
        <Text size="sm" mb="lg">
          Are you sure you want to revise this campaign? Media outlets will use their best efforts to implement your changes made after the campaign flight has begun.
        </Text>
        <Text size="sm" fw={500} mb="lg" c="dimmed">
          Campaign: {c.name}
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={() => setReviseModalOpen(false)}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleReviseConfirm}>
            Revise Campaign
          </Button>
        </Group>
      </Modal>

      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: '48px 160px 220px 140px 160px 160px 300px 220px 160px 160px',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTop: '1px solid var(--border-color)',
          width: 'fit-content',
          fontSize: '12px',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        {/* Actions Menu (Waffle) */}
        <div 
          style={{ 
            position: 'sticky', 
            left: '0', 
            zIndex: 1, 
            background: 'var(--page-background)', 
            paddingLeft: '8px', 
            paddingRight: '8px', 
            paddingTop: '20px', 
            paddingBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Menu shadow="md" width={240} position="bottom-start">
            <Menu.Target>
              <ActionIcon variant="subtle" size="sm" color="gray">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Campaign Actions</Menu.Label>
              
              <Menu.Item
                leftSection={<IconTrash size={14} />}
                color="red"
                disabled={!canDelete}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete Campaign
                {!canDelete && (
                  <Text size="xs" c="dimmed" mt={2}>
                    Only available for unbooked campaigns
                  </Text>
                )}
              </Menu.Item>
              
              <Menu.Item
                leftSection={<IconX size={14} />}
                color="orange"
                disabled={!canCancel}
                onClick={() => setCancelModalOpen(true)}
              >
                Cancel Campaign
                {!canCancel && (
                  <Text size="xs" c="dimmed" mt={2}>
                    Not available for this campaign
                  </Text>
                )}
              </Menu.Item>
              
              <Menu.Item
                leftSection={<IconEdit size={14} />}
                disabled={!canRevise}
                onClick={() => setReviseModalOpen(true)}
              >
                Revise Campaign
                {!canRevise && (
                  <Text size="xs" c="dimmed" mt={2}>
                    Only for in-flight campaigns
                  </Text>
                )}
              </Menu.Item>
              
              <Menu.Divider />
              
              <Menu.Label>Downloads</Menu.Label>
              
              <Menu.Item
                leftSection={<IconFileText size={14} />}
                onClick={handleViewAgencyOrder}
              >
                View Agency Order
              </Menu.Item>
              
              <Menu.Item
                leftSection={<IconFileDownload size={14} />}
                onClick={handleViewBroadcasterOrders}
              >
                View Broadcaster Orders
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        {/* Advertiser */}
        <div style={{ position: 'sticky', left: '48px', zIndex: 1, background: 'var(--page-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '20px', paddingBottom: '20px' }}>
          <span style={{ color: '#374151', fontWeight: 500, fontSize: '12px' }}>
            {c.advertiser}
          </span>
        </div>

        {/* Name */}
        <div style={{ position: 'sticky', left: '208px', zIndex: 1, background: 'var(--page-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '20px', paddingBottom: '20px' }}>
          <span style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '12px' }}>
            {c.name}
          </span>
        </div>

        {/* Approval Status */}
        <div style={{ position: 'sticky', left: '428px', zIndex: 1, background: 'var(--page-background)', paddingLeft: '16px', paddingRight: '16px', paddingTop: '20px', paddingBottom: '20px' }}>
          <ApprovalStatusBadge status={c.approvalStatus} />
        </div>

        {/* Pacing Status */}
        <div style={{ position: 'sticky', left: '568px', zIndex: 1, background: 'var(--page-background)', paddingLeft: '16px', paddingRight: '12px', paddingTop: '20px', paddingBottom: '20px', borderRight: '1px solid var(--border-color)' }}>
          <CampaignStatusBadge status={c.status} />
        </div>

      {/* Delivered by Days */}
      <div style={{ width: '150px', height: '60px', paddingLeft: '20px', paddingTop: '8px', paddingBottom: '8px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, bottom: 0, left: 0, right: 0 }}>
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="none" fill="url(#sparkGradient)" />
            <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Progress (bar + label below) */}
      <div style={{ paddingLeft: '20px', paddingTop: '8px', paddingBottom: '8px' }}>
        <div style={{ width: '200px' }}>
          <Progress 
            value={c.progressPercent} 
            size="lg" 
            radius="xl" 
            color="#5C6370" 
            styles={{ 
              root: { background: '#E5E7EB' },
            }} 
          />
        </div>
        <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '6px' }}>
          <span style={{ color: '#000000', fontWeight: 700 }}>
            {c.progressPercent.toFixed(2)}%
          </span>
          <span style={{ color: '#5C6370', fontWeight: 500 }}> ({formatNumber(c.progressDelivered)} / {formatNumber(c.progressGoal)})</span>
        </div>
      </div>

      {/* Pacing % */}
      <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        {c.pacingPercent !== null ? (
          <>
            <div style={{ width: '180px' }}>
              <Progress 
                value={c.pacingPercent} 
                size="lg" 
                radius="xl" 
                color={
                  c.pacingPercent < 95 ? '#ef4444' : // Red: behind by >5%
                  c.pacingPercent < 98 ? '#f59e0b' : // Yellow: behind 2-5%
                  '#22c55e' // Green: behind <2%
                }
                styles={{ 
                  root: { background: '#E5E7EB' },
                }} 
              />
            </div>
            <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '6px' }}>
              <span style={{ color: '#000000', fontWeight: 700 }}>
                {c.pacingPercent.toFixed(2)}%
              </span>
              <span style={{ color: '#5C6370', fontWeight: 500 }}> ({formatNumber(c.pacingDelivered)} / {formatNumber(c.pacingTarget)})</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '12px', color: '#6b7280' }}>--</div>
        )}
      </div>

      {/* Delivered Spend */}
      <div style={{ textAlign: 'right', fontSize: '12px', paddingTop: '8px', paddingBottom: '8px' }}>{formatCurrency(c.deliveredSpend)}</div>

      {/* Remaining Budget */}
      <div style={{ textAlign: 'right', fontSize: '12px', paddingTop: '8px', paddingBottom: '8px', paddingRight: '16px' }}>{formatCurrency(c.remainingBudget)}</div>
      </div>
    </>
  );
}
