'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tabs, 
  Button, 
  TextInput, 
  Select, 
  Table, 
  Modal, 
  Group, 
  Badge,
  ActionIcon,
  MultiSelect,
  Text
} from '@mantine/core';
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconUsers, 
  IconShieldCheck, 
  IconUser,
  IconSearch
} from '@tabler/icons-react';
import PageHeader from '@/components/ui/PageHeader';

// Types
interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

interface Role {
  id: string;
  name: 'Buyer' | 'Approver' | 'Executive';
  description: string;
  permissions: string[];
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  teamId: string;
  roleId: string;
  locations: string[];
  status: 'Active' | 'Inactive';
}

// Mock data
const mockTeams: Team[] = [
  { id: '1', name: 'East Coast Team', description: 'Handles all East Coast operations', memberCount: 12, createdAt: '2024-01-15' },
  { id: '2', name: 'West Coast Team', description: 'Manages West Coast campaigns', memberCount: 8, createdAt: '2024-02-20' },
  { id: '3', name: 'Central Team', description: 'Central region operations', memberCount: 10, createdAt: '2024-03-10' },
];

const mockRoles: Role[] = [
  { 
    id: '1', 
    name: 'Buyer', 
    description: 'Can create and manage campaigns',
    permissions: ['create_campaign', 'edit_campaign', 'view_reports']
  },
  { 
    id: '2', 
    name: 'Approver', 
    description: 'Can approve and reject campaigns',
    permissions: ['approve_campaign', 'reject_campaign', 'view_reports', 'edit_campaign']
  },
  { 
    id: '3', 
    name: 'Executive', 
    description: 'Full access to all features',
    permissions: ['full_access', 'manage_users', 'manage_teams', 'view_analytics']
  },
];

const mockContacts: Contact[] = [
  { 
    id: '1', 
    firstName: 'John', 
    lastName: 'Smith', 
    email: 'john.smith@agency.com', 
    phone: '+1 (555) 123-4567',
    teamId: '1', 
    roleId: '1', 
    locations: ['New York', 'Boston'],
    status: 'Active'
  },
  { 
    id: '2', 
    firstName: 'Sarah', 
    lastName: 'Johnson', 
    email: 'sarah.j@agency.com', 
    phone: '+1 (555) 234-5678',
    teamId: '1', 
    roleId: '2', 
    locations: ['New York'],
    status: 'Active'
  },
  { 
    id: '3', 
    firstName: 'Michael', 
    lastName: 'Brown', 
    email: 'mbrown@agency.com', 
    phone: '+1 (555) 345-6789',
    teamId: '2', 
    roleId: '3', 
    locations: ['Los Angeles', 'San Francisco'],
    status: 'Active'
  },
];

const availableLocations = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Boston', 'San Francisco', 'Seattle', 'Denver', 'Miami'
];

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState<string | null>('teams');
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [teamModalOpened, setTeamModalOpened] = useState(false);
  const [contactModalOpened, setContactModalOpened] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Form states
  const [teamForm, setTeamForm] = useState({ name: '', description: '' });
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    teamId: '',
    roleId: '',
    locations: [] as string[],
    status: 'Active' as 'Active' | 'Inactive'
  });

  // Team handlers
  const handleAddTeam = () => {
    setEditingTeam(null);
    setTeamForm({ name: '', description: '' });
    setTeamModalOpened(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setTeamForm({ name: team.name, description: team.description });
    setTeamModalOpened(true);
  };

  const handleSaveTeam = () => {
    if (editingTeam) {
      setTeams(teams.map(t => t.id === editingTeam.id 
        ? { ...t, name: teamForm.name, description: teamForm.description }
        : t
      ));
    } else {
      const newTeam: Team = {
        id: String(teams.length + 1),
        name: teamForm.name,
        description: teamForm.description,
        memberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTeams([...teams, newTeam]);
    }
    setTeamModalOpened(false);
  };

  const handleDeleteTeam = (teamId: string) => {
    if (confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(t => t.id !== teamId));
      setContacts(contacts.filter(c => c.teamId !== teamId));
    }
  };

  // Contact handlers
  const handleAddContact = () => {
    setEditingContact(null);
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      teamId: '',
      roleId: '',
      locations: [],
      status: 'Active'
    });
    setContactModalOpened(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      teamId: contact.teamId,
      roleId: contact.roleId,
      locations: contact.locations,
      status: contact.status
    });
    setContactModalOpened(true);
  };

  const handleSaveContact = () => {
    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id 
        ? { ...c, ...contactForm }
        : c
      ));
    } else {
      const newContact: Contact = {
        id: String(contacts.length + 1),
        ...contactForm
      };
      setContacts([...contacts, newContact]);
      
      // Update team member count
      setTeams(teams.map(t => t.id === contactForm.teamId 
        ? { ...t, memberCount: t.memberCount + 1 }
        : t
      ));
    }
    setContactModalOpened(false);
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const contact = contacts.find(c => c.id === contactId);
      if (contact) {
        setTeams(teams.map(t => t.id === contact.teamId 
          ? { ...t, memberCount: Math.max(0, t.memberCount - 1) }
          : t
        ));
      }
      setContacts(contacts.filter(c => c.id !== contactId));
    }
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  const getTeamName = (teamId: string) => teams.find(t => t.id === teamId)?.name || 'Unknown';
  const getRoleName = (roleId: string) => mockRoles.find(r => r.id === roleId)?.name || 'Unknown';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ 
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Page Header */}
      <PageHeader title="Team Management" />

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        backgroundColor: 'var(--page-background)'
      }}>
        <div style={{ padding: '32px 40px' }}>

          {/* Tabs */}
          <Tabs 
            value={activeTab} 
            onChange={setActiveTab}
            styles={{
              root: {
                backgroundColor: 'transparent'
              },
              tab: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280'
              }
            }}
            classNames={{
              tab: 'team-management-tab'
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="teams" leftSection={<IconUsers size={16} />}>
                Teams
              </Tabs.Tab>
              <Tabs.Tab value="roles" leftSection={<IconShieldCheck size={16} />}>
                Roles & Permissions
              </Tabs.Tab>
              <Tabs.Tab value="contacts" leftSection={<IconUser size={16} />}>
                Buyer Contacts
              </Tabs.Tab>
            </Tabs.List>

            {/* Teams Tab */}
            <Tabs.Panel value="teams" pt="xl">
              <div style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                outline: 'none'
              }}>
                <div style={{ 
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>Team Structure</Text>
                  <Button 
                    leftSection={<IconPlus size={16} />}
                    onClick={handleAddTeam}
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: 'var(--primary-color)',
                        '&:hover': {
                          backgroundColor: '#1f0829'
                        }
                      }
                    }}
                  >
                    Add Team
                  </Button>
                </div>

                <Table 
                  highlightOnHover
                  styles={{
                    table: {
                      backgroundColor: '#FFFFFF'
                    },
                    th: {
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '12px 20px',
                      borderBottom: '1px solid var(--border-color)'
                    },
                    td: {
                      padding: '16px 20px',
                      fontSize: '13px',
                      borderBottom: '1px solid var(--border-color)'
                    }
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Team Name</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th style={{ width: '100px', textAlign: 'center' }}>Members</Table.Th>
                      <Table.Th style={{ width: '130px' }}>Created</Table.Th>
                      <Table.Th style={{ width: '100px', textAlign: 'center' }}>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {teams.map((team) => (
                      <Table.Tr key={team.id}>
                        <Table.Td>
                          <Text fw={500} style={{ color: '#000', fontSize: '13px' }}>{team.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" c="dimmed">{team.description}</Text>
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          <Badge 
                            size="sm"
                            variant="light" 
                            color="blue"
                            styles={{
                              root: {
                                backgroundColor: '#EBF5FF',
                                color: '#1E40AF',
                                fontWeight: 500,
                                fontSize: '12px',
                                padding: '6px 10px',
                                height: 'auto'
                              }
                            }}
                          >
                            {team.memberCount}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>{team.createdAt}</Text>
                        </Table.Td>
                        <Table.Td>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                            <ActionIcon 
                              variant="subtle" 
                              color="gray"
                              size="md"
                              onClick={() => handleEditTeam(team)}
                              styles={{
                                root: {
                                  '&:hover': {
                                    backgroundColor: 'var(--hover-background)'
                                  }
                                }
                              }}
                            >
                              <IconEdit size={16} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon 
                              variant="subtle" 
                              color="gray"
                              size="md"
                              onClick={() => handleDeleteTeam(team.id)}
                              styles={{
                                root: {
                                  '&:hover': {
                                    backgroundColor: '#FEE2E2',
                                    color: '#DC2626'
                                  }
                                }
                              }}
                            >
                              <IconTrash size={16} stroke={1.5} />
                            </ActionIcon>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Tabs.Panel>

            {/* Roles Tab */}
            <Tabs.Panel value="roles" pt="xl">
              <div style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                outline: 'none'
              }}>
                <div style={{ 
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>Roles & Permissions</Text>
                </div>

                <Table 
                  highlightOnHover
                  styles={{
                    table: {
                      backgroundColor: '#FFFFFF'
                    },
                    th: {
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '12px 20px',
                      borderBottom: '1px solid var(--border-color)'
                    },
                    td: {
                      padding: '16px 20px',
                      fontSize: '13px',
                      borderBottom: '1px solid var(--border-color)',
                      verticalAlign: 'top'
                    }
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: '150px' }}>Role</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Permissions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {mockRoles.map((role) => (
                      <Table.Tr key={role.id}>
                        <Table.Td>
                          <Badge 
                            size="sm" 
                            variant="light"
                            styles={{
                              root: {
                                backgroundColor: 
                                  role.name === 'Executive' ? '#FEE2E2' :
                                  role.name === 'Approver' ? '#FED7AA' : '#DBEAFE',
                                color: 
                                  role.name === 'Executive' ? '#991B1B' :
                                  role.name === 'Approver' ? '#9A3412' : '#1E40AF',
                                fontWeight: 500,
                                textTransform: 'none',
                                fontSize: '11px',
                                padding: '5px 10px',
                                height: 'auto'
                              }
                            }}
                          >
                            {role.name}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" style={{ color: '#6B7280', fontSize: '13px' }}>{role.description}</Text>
                        </Table.Td>
                        <Table.Td>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {role.permissions.map((permission, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                size="sm"
                                styles={{
                                  root: {
                                    borderColor: 'var(--border-color)',
                                    color: '#6B7280',
                                    textTransform: 'capitalize',
                                    fontWeight: 400,
                                    fontSize: '11px',
                                    padding: '4px 8px',
                                    height: 'auto'
                                  }
                                }}
                              >
                                {permission.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Tabs.Panel>

            {/* Contacts Tab */}
            <Tabs.Panel value="contacts" pt="xl">
              <div style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                outline: 'none'
              }}>
                <div style={{ 
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text size="md" fw={600} style={{ color: '#000' }}>Buyer Contacts</Text>
                  <Group gap="md">
                    <TextInput
                      placeholder="Search contacts..."
                      leftSection={<IconSearch size={16} stroke={1.5} />}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      styles={{
                        input: {
                          width: '280px',
                          height: '36px',
                          fontSize: '14px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          '&:focus': {
                            borderColor: 'var(--primary-color)'
                          }
                        }
                      }}
                    />
                    <Button 
                      leftSection={<IconPlus size={16} />}
                      onClick={handleAddContact}
                      size="sm"
                      styles={{
                        root: {
                          backgroundColor: 'var(--primary-color)',
                          '&:hover': {
                            backgroundColor: '#1f0829'
                          }
                        }
                      }}
                    >
                      Add Contact
                    </Button>
                  </Group>
                </div>

                <Table 
                  highlightOnHover
                  styles={{
                    table: {
                      backgroundColor: '#FFFFFF'
                    },
                    th: {
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '12px 24px',
                      borderBottom: '1px solid var(--border-color)'
                    },
                    td: {
                      padding: '16px 24px',
                      fontSize: '14px',
                      borderBottom: '1px solid var(--border-color)'
                    }
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: '140px' }}>Name</Table.Th>
                      <Table.Th style={{ width: '180px' }}>Email</Table.Th>
                      <Table.Th style={{ width: '120px' }}>Phone</Table.Th>
                      <Table.Th style={{ width: '120px' }}>Team</Table.Th>
                      <Table.Th style={{ width: '80px' }}>Role</Table.Th>
                      <Table.Th style={{ width: '140px' }}>Locations</Table.Th>
                      <Table.Th style={{ width: '90px' }}>Status</Table.Th>
                      <Table.Th style={{ width: '100px', textAlign: 'center' }}>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredContacts.map((contact) => (
                      <Table.Tr key={contact.id}>
                        <Table.Td>
                          <Text fw={500} style={{ color: '#000', fontSize: '13px' }}>
                            {contact.firstName} {contact.lastName}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">{contact.email}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">{contact.phone}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">{getTeamName(contact.teamId)}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge 
                            size="sm"
                            variant="light"
                            styles={{
                              root: {
                                backgroundColor: 
                                  getRoleName(contact.roleId) === 'Executive' ? '#FEE2E2' :
                                  getRoleName(contact.roleId) === 'Approver' ? '#FED7AA' : '#DBEAFE',
                                color: 
                                  getRoleName(contact.roleId) === 'Executive' ? '#991B1B' :
                                  getRoleName(contact.roleId) === 'Approver' ? '#9A3412' : '#1E40AF',
                                fontWeight: 500,
                                textTransform: 'none',
                                fontSize: '11px',
                                padding: '4px 8px',
                                height: 'auto'
                              }
                            }}
                          >
                            {getRoleName(contact.roleId).charAt(0)}.
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {contact.locations.slice(0, 1).map((loc, idx) => (
                              <Badge 
                                key={idx} 
                                size="xs" 
                                variant="outline"
                                styles={{
                                  root: {
                                    borderColor: 'var(--border-color)',
                                    color: '#6B7280',
                                    fontWeight: 400,
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    height: 'auto'
                                  }
                                }}
                              >
                                {loc}
                              </Badge>
                            ))}
                            {contact.locations.length > 1 && (
                              <Badge 
                                size="xs" 
                                variant="outline"
                                styles={{
                                  root: {
                                    borderColor: 'var(--border-color)',
                                    color: '#6B7280',
                                    fontWeight: 400,
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    height: 'auto'
                                  }
                                }}
                              >
                                +{contact.locations.length - 1}
                              </Badge>
                            )}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <Badge 
                            size="sm"
                            variant="light"
                            styles={{
                              root: {
                                backgroundColor: contact.status === 'Active' ? '#D1FAE5' : '#F3F4F6',
                                color: contact.status === 'Active' ? '#065F46' : '#6B7280',
                                fontWeight: 500,
                                textTransform: 'none',
                                fontSize: '11px',
                                padding: '6px 10px',
                                height: 'auto',
                                whiteSpace: 'nowrap'
                              }
                            }}
                          >
                            {contact.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                            <ActionIcon 
                              variant="subtle" 
                              color="gray"
                              size="md"
                              onClick={() => handleEditContact(contact)}
                              styles={{
                                root: {
                                  '&:hover': {
                                    backgroundColor: 'var(--hover-background)'
                                  }
                                }
                              }}
                            >
                              <IconEdit size={16} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon 
                              variant="subtle" 
                              color="gray"
                              size="md"
                              onClick={() => handleDeleteContact(contact.id)}
                              styles={{
                                root: {
                                  '&:hover': {
                                    backgroundColor: '#FEE2E2',
                                    color: '#DC2626'
                                  }
                                }
                              }}
                            >
                              <IconTrash size={16} stroke={1.5} />
                            </ActionIcon>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Tabs.Panel>
          </Tabs>

          {/* Team Modal */}
          <Modal
            opened={teamModalOpened}
            onClose={() => setTeamModalOpened(false)}
            title={editingTeam ? 'Edit Team' : 'Add New Team'}
            size="md"
            styles={{
              title: {
                fontSize: '18px',
                fontWeight: 600,
                color: '#000'
              },
              header: {
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '16px'
              },
              body: {
                paddingTop: '24px'
              }
            }}
          >
            <TextInput
              label="Team Name"
              placeholder="Enter team name"
              value={teamForm.name}
              onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
              mb="md"
              required
              styles={{
                label: {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px'
                },
                input: {
                  fontSize: '14px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  '&:focus': {
                    borderColor: 'var(--primary-color)'
                  }
                }
              }}
            />
            <TextInput
              label="Description"
              placeholder="Enter team description"
              value={teamForm.description}
              onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
              mb="xl"
              styles={{
                label: {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px'
                },
                input: {
                  fontSize: '14px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  '&:focus': {
                    borderColor: 'var(--primary-color)'
                  }
                }
              }}
            />
            <Group justify="flex-end" gap="sm">
              <Button 
                variant="subtle" 
                onClick={() => setTeamModalOpened(false)}
                styles={{
                  root: {
                    color: '#6B7280',
                    '&:hover': {
                      backgroundColor: 'var(--hover-background)'
                    }
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveTeam} 
                disabled={!teamForm.name}
                styles={{
                  root: {
                    backgroundColor: 'var(--primary-color)',
                    '&:hover': {
                      backgroundColor: '#1f0829'
                    }
                  }
                }}
              >
                {editingTeam ? 'Update' : 'Create'}
              </Button>
            </Group>
          </Modal>

          {/* Contact Modal */}
          <Modal
            opened={contactModalOpened}
            onClose={() => setContactModalOpened(false)}
            title={editingContact ? 'Edit Contact' : 'Add New Contact'}
            size="lg"
            styles={{
              title: {
                fontSize: '18px',
                fontWeight: 600,
                color: '#000'
              },
              header: {
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '16px'
              },
              body: {
                paddingTop: '24px'
              }
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                value={contactForm.firstName}
                onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                required
                styles={{
                  label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '6px'
                  },
                  input: {
                    fontSize: '14px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    '&:focus': {
                      borderColor: 'var(--primary-color)'
                    }
                  }
                }}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                value={contactForm.lastName}
                onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                required
                styles={{
                  label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '6px'
                  },
                  input: {
                    fontSize: '14px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    '&:focus': {
                      borderColor: 'var(--primary-color)'
                    }
                  }
                }}
              />
            </div>
            
            <TextInput
              label="Email"
              placeholder="email@example.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              mt="md"
              required
              styles={{
                label: {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px'
                },
                input: {
                  fontSize: '14px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  '&:focus': {
                    borderColor: 'var(--primary-color)'
                  }
                }
              }}
            />
            
            <TextInput
              label="Phone"
              placeholder="+1 (555) 123-4567"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              mt="md"
              styles={{
                label: {
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px'
                },
                input: {
                  fontSize: '14px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  '&:focus': {
                    borderColor: 'var(--primary-color)'
                  }
                }
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <Select
                label="Team"
                placeholder="Select team"
                data={teams.map(t => ({ value: t.id, label: t.name }))}
                value={contactForm.teamId}
                onChange={(value) => setContactForm({ ...contactForm, teamId: value || '' })}
                required
              />
              <Select
                label="Role"
                placeholder="Select role"
                data={mockRoles.map(r => ({ value: r.id, label: r.name }))}
                value={contactForm.roleId}
                onChange={(value) => setContactForm({ ...contactForm, roleId: value || '' })}
                required
              />
            </div>

            <MultiSelect
              label="Locations"
              placeholder="Select locations"
              data={availableLocations}
              value={contactForm.locations}
              onChange={(value) => setContactForm({ ...contactForm, locations: value })}
              mt="md"
              searchable
            />

            <Select
              label="Status"
              data={['Active', 'Inactive']}
              value={contactForm.status}
              onChange={(value) => setContactForm({ ...contactForm, status: (value || 'Active') as 'Active' | 'Inactive' })}
              mt="md"
            />

            <Group justify="flex-end" mt="xl" gap="sm">
              <Button 
                variant="subtle" 
                onClick={() => setContactModalOpened(false)}
                styles={{
                  root: {
                    color: '#6B7280',
                    '&:hover': {
                      backgroundColor: 'var(--hover-background)'
                    }
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveContact}
                disabled={!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.teamId || !contactForm.roleId}
                styles={{
                  root: {
                    backgroundColor: 'var(--primary-color)',
                    '&:hover': {
                      backgroundColor: '#1f0829'
                    }
                  }
                }}
              >
                {editingContact ? 'Update' : 'Create'}
              </Button>
            </Group>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
}
