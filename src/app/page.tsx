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
          
          <div className="mt-8 w-full max-w-4xl flex justify-center">
            <Table style={{ tableLayout: 'fixed', width: '100%', maxWidth: '400px' }}>
              <TableThead>
                <TableTr>
                  <TableTh>
                    <Text c="grey" size="xs" fw={500}>Linear Flow Pages</Text>
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
                    href: '/new-campaign'
                  },
                  {
                    title: 'Channel Details',
                    description: 'Linear details, audience targeting, market selection, and daypart configuration',
                    href: '/channel-details'
                  },
                  {
                    title: 'Summary',
                    description: 'Final review of all campaign settings before creation and launch',
                    href: '/summary'
                  }
                ].map((page, index) => (
                  <TableTr key={index}>
                    <TableTd>
                      <Link href={page.href}>
                        <Text c="black" size="xs" style={{ cursor: 'pointer' }}>
                          {page.title}
                        </Text>
                      </Link>
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
