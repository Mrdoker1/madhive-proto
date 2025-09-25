import Link from "next/link";
import { Text, Table, TableThead, TableTbody, TableTr, TableTh, TableTd } from '@mantine/core';
import PageLayout from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div style={{ backgroundColor: 'var(--page-background)' }} className="h-full">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-full">
          <h2 style={{ color: 'black' }} >Madhive Proto</h2>
          <p style={{ color: 'black', paddingBottom: '24px', fontSize: '12px' }}>TBD: Placeholder for Dashboard Page</p>
          
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
                    title: 'Channel Details',
                    description: 'Configure channel-specific settings, audience targeting, market selection, and dayparts',
                    linearHref: '/campaign/linear/details',
                    omnichannelHref: '/campaign/omnichannel/details'
                  },
                  {
                    title: 'Summary',
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
        </div>
      </div>
    </PageLayout>
  );
}
