'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardFilters from '@/components/features/dashboard/DashboardFilters';
import DashboardContent from '@/components/features/dashboard/DashboardContent';
import { DashboardFilterProvider } from '@/contexts/DashboardFilterContext';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  
  return (
    <DashboardFilterProvider initialCampaignId={campaignId}>
      <motion.div 
        className="flex flex-col h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <DashboardHeader />
        </motion.div>

        {/* Dashboard Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <DashboardFilters />
        </motion.div>

        {/* Dashboard Content */}
        <motion.main 
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ backgroundColor: 'var(--page-background)' }}
        >
          <DashboardContent />
        </motion.main>
      </motion.div>
    </DashboardFilterProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
}

