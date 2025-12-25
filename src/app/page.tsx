'use client';

import Link from "next/link";
import { Text, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Checkbox } from '@mantine/core';
import PageLayout from "@/components/layout/PageLayout";
import MapSettingsSection from '@/components/features/settings/MapSettingsSection';
import AISettingsSection from '@/components/features/settings/AISettingsSection';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setShowNavigationAnchors, setShowFlightByDay, setShowDaypartsSelector } from '@/store/slices/uiSettingsSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const showNavigationAnchors = useAppSelector((state) => state.uiSettings.showNavigationAnchors);
  const showFlightByDay = useAppSelector((state) => state.uiSettings.showFlightByDay);
  const showDaypartsSelector = useAppSelector((state) => state.uiSettings.showDaypartsSelector);

  const handleNavigationToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowNavigationAnchors(event.currentTarget.checked));
  };

  const handleFlightByDayToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowFlightByDay(event.currentTarget.checked));
  };

  const handleDaypartsSelectorToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowDaypartsSelector(event.currentTarget.checked));
  };

  return (
    <PageLayout>
      <div style={{ backgroundColor: 'var(--page-background)' }} className="h-full">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-full" style={{ paddingTop: '64px' }}>
          <h2 style={{ color: 'black', paddingBottom: '8px'}} >Madhive Proto</h2>
          <p style={{ color: 'black', paddingBottom: '32px', fontSize: '12px' }}>Campaign management prototype with linear and omnichannel advertising workflows</p>
          
          <div className="mt-8 w-full max-w-6xl flex justify-center">
            <Table style={{ tableLayout: 'fixed', width: '100%', maxWidth: '800px' }}>
              <TableThead>
                <TableTr>
                  <TableTh>
                    <Text c="grey" size="xs" fw={500}>Page</Text>
                  </TableTh>
                  <TableTh>
                    <Text c="grey" size="xs" fw={500}>Linear Campaign</Text>
                  </TableTh>
                  <TableTh>
                    <Text c="grey" size="xs" fw={500}>Omnichannel Campaign</Text>
                  </TableTh>
                  <TableTh>
                    <Text c="grey" size="xs" fw={500}>Description</Text>
                  </TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {[
                  {
                    title: 'Login',
                    description: 'User authentication screen with username and password',
                    linearHref: '/login',
                    omnichannelHref: '/login'
                  },
                  {
                    title: 'Dashboard',
                    description: 'Main dashboard with metrics, charts, and campaign overview',
                    linearHref: '/dashboard',
                    omnichannelHref: '/dashboard'
                  },
                  {
                    title: 'Campaign List',
                    description: 'View all campaigns with filtering and pagination',
                    linearHref: '/campaign',
                    omnichannelHref: '/campaign'
                  },
                  {
                    title: 'New Campaign',
                    description: 'General campaign information, budget settings, goals, and flight range configuration',
                    linearHref: '/campaign/linear/new',
                    omnichannelHref: '/campaign/omnichannel/new'
                  },
                  {
                    title: 'Channels',
                    description: 'Select advertising channels for omnichannel campaigns',
                    linearHref: null,
                    omnichannelHref: '/campaign/omnichannel/channels'
                  },
                  {
                    title: 'Media Outlets',
                    description: 'Configure channel-specific settings, audience targeting, market selection, and dayparts',
                    linearHref: '/campaign/linear/details',
                    omnichannelHref: '/campaign/omnichannel/details'
                  },
                  {
                    title: 'Guidelines',
                    description: 'Generate and review campaign proposal',
                    linearHref: '/campaign/linear/proposal',
                    omnichannelHref: null
                  },
                  {
                    title: 'Review',
                    description: 'Final review of all campaign settings before creation and launch',
                    linearHref: '/campaign/linear/summary',
                    omnichannelHref: '/campaign/omnichannel/summary'
                  }
                ].map((page, index) => (
                  <TableTr key={index}>
                    <TableTd>
                      <Text c="black" size="xs" fw={500}>
                        {page.title}
                      </Text>
                    </TableTd>
                    <TableTd>
                      {page.linearHref ? (
                        <Link href={page.linearHref}>
                          <Text c="blue" size="xs" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            View Page
                          </Text>
                        </Link>
                      ) : (
                        <Text c="grey" size="xs">
                          N/A
                        </Text>
                      )}
                    </TableTd>
                    <TableTd>
                      {page.omnichannelHref ? (
                        <Link href={page.omnichannelHref}>
                          <Text c="blue" size="xs" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            View Page
                          </Text>
                        </Link>
                      ) : (
                        <Text c="grey" size="xs">
                          N/A
                        </Text>
                      )}
                    </TableTd>
                    <TableTd>
                      <Text c="black" size="xs">
                        {page.description}
                      </Text>
                    </TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </Table>
          </div>

          {/* Divider */}
          <div className="w-full max-w-6xl flex justify-center" style={{ marginTop: '32px', marginBottom: '32px' }}>
            <div style={{ height: '1px', backgroundColor: '#E5E7EB', width: '100%', maxWidth: '800px' }} />
          </div>

          {/* Settings sections in one row */}
          <div className="w-full max-w-6xl flex justify-center" style={{ paddingBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '32px', width: '100%', maxWidth: '800px' }}>
              <div style={{ flex: 1 }}>
                <MapSettingsSection />
              </div>
              <div style={{ flex: 1 }}>
                <AISettingsSection />
              </div>
            </div>
          </div>

          {/* UI Settings */}
          <div className="w-full max-w-6xl flex justify-center" style={{ paddingBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '32px', width: '100%', maxWidth: '800px' }}>
              {/* Navigation Settings */}
              <div style={{ 
                flex: 1,
                padding: '20px', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <Text size="sm" fw={600} mb="md" c="black">Navigation Settings</Text>
                <Checkbox
                  label="Show page sections navigator"
                  description="Display navigation anchors on the left side of campaign pages"
                  checked={showNavigationAnchors}
                  onChange={handleNavigationToggle}
                  size="sm"
                />
              </div>

              {/* Flight Settings */}
              <div style={{ 
                flex: 1,
                padding: '20px', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <Text size="sm" fw={600} mb="md" c="black">Flight Settings</Text>
                <Checkbox
                  label="Show Flight by Day chart"
                  description="Display the visual day/week breakdown chart in the Flight Range section"
                  checked={showFlightByDay}
                  onChange={handleFlightByDayToggle}
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Dayparts Settings */}
          <div className="w-full max-w-6xl flex justify-center" style={{ paddingBottom: '40px' }}>
            <div style={{ 
              width: '100%', 
              maxWidth: '800px', 
              padding: '20px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <Text size="sm" fw={600} mb="md" c="black">Dayparts Settings</Text>
              <Checkbox
                label="Show dayparts hour selector"
                description="Display the hour-by-hour selection grid in the Dayparts section (advanced mode)"
                checked={showDaypartsSelector}
                onChange={handleDaypartsSelectorToggle}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
