import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import { StoreProvider } from '@/app/StoreProvider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

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
    <html lang="en" className="m-0 p-0">
      <body className={`${inter.className} m-0 p-0`}>
        <StoreProvider>
          <MantineProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}