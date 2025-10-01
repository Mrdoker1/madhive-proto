'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardFilters from '@/components/features/dashboard/DashboardFilters';

export default function DashboardPage() {
  return (
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
        <div style={{ padding: '32px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: '16px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              color: '#000000',
              margin: 0
            }}>
              Dashboard Content
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6B7280',
              fontStyle: 'italic',
              margin: 0
            }}>
              TBD: Placeholder for Dashboard metrics, charts, and widgets
            </p>
          </div>
        </div>
      </motion.main>
    </motion.div>
  );
}

