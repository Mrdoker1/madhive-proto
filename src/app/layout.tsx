import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import { StoreProvider } from '@/app/StoreProvider';

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}