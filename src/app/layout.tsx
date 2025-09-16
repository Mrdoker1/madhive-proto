import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider, createTheme } from '@mantine/core';
import { StoreProvider } from '@/app/StoreProvider';
import AppLayout from '@/components/layout/AppLayout';

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  components: {
    Select: {
      defaultProps: {
        styles: {
          label: {
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px'
          },
          dropdown: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB'
          },
          option: {
            color: '#374151',
            fontSize: '14px',
            '&[data-selected]': {
              backgroundColor: '#291036',
              color: '#FFFFFF'
            },
            '&[data-hovered]': {
              backgroundColor: '#F3F4F6',
              color: '#374151'
            }
          }
        }
      }
    },
    TextInput: {
      defaultProps: {
        styles: {
          label: {
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px'
          }
        }
      }
    }
  }
});

export const metadata: Metadata = {
  title: "Madhive Proto",
  description: "Next.js project with Redux, Recharts, Mantine, and Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 p-0">
      <body className={`${inter.className} m-0 p-0`}>
        <StoreProvider>
          <MantineProvider theme={theme}>
            <AppLayout>
              {children}
            </AppLayout>
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}