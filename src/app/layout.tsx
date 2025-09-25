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
            color: 'var(--form-label-color)',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid var(--form-input-border)',
            borderRadius: '6px'
          },
          dropdown: {
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--form-input-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          option: {
            color: '#374151',
            fontSize: '14px',
            backgroundColor: '#FFFFFF',
            padding: '8px 12px'
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
            color: 'var(--form-label-color)',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid var(--form-input-border)',
            borderRadius: '6px',
            '&::placeholder': {
              color: 'var(--form-placeholder)'
            }
          }
        }
      }
    },
    Textarea: {
      defaultProps: {
        styles: {
          label: {
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--form-label-color)',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid var(--form-input-border)',
            borderRadius: '6px',
            lineHeight: '1.5',
            '&::placeholder': {
              color: 'var(--form-placeholder)'
            }
          }
        }
      }
    },
    Button: {
      defaultProps: {
        color: 'var(--primary-color)',
        styles: {
          root: {
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '6px',
            height: '32px'
          }
        }
      }
    },
    Card: {
      defaultProps: {
        styles: {
          root: {
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }
        }
      }
    },
    Alert: {
      defaultProps: {
        styles: {
          root: {
            borderRadius: '6px'
          },
          title: {
            fontSize: '14px',
            fontWeight: 600
          },
          message: {
            fontSize: '14px'
          }
        }
      }
    },
    MultiSelect: {
      defaultProps: {
        styles: {
          label: {
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--form-label-color)',
            marginBottom: '8px'
          },
          input: {
            fontSize: '14px',
            border: '1px solid var(--form-input-border)',
            borderRadius: '4px'
          },
          dropdown: {
            backgroundColor: '#FFFFFF',
          },
          option: {
            color: '#374151',
            fontSize: '14px',
            padding: '4px',
            '&:hover': {
              backgroundColor: '#D4C5D9'
            }
          },
          pill: {
            backgroundColor: '#EBE6EC',
            color: '#374151',
            borderRadius: '4px',
            fontSize: '12px'
          }
        }
      }
    },
    Checkbox: {
      defaultProps: {
        color: 'var(--primary-color)',
        radius: 'xs',
        styles: {
          label: {
            fontSize: '12px',
            color: '#000000',
            fontWeight: 400
          }
        }
      }
    },
    Radio: {
      defaultProps: {
        color: 'var(--primary-color)',
        styles: {
          label: {
            fontSize: '14px',
            color: '#000000'
          }
        }
      }
    }
  }
});

export const metadata: Metadata = {
  title: "Madhive Proto",
  description: "Next.js project with Redux, Recharts, Mantine, and Framer Motion",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#291036",
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