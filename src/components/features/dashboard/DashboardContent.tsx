'use client';

import React from 'react';
import MetricsSection from './MetricsSection';
import CampaignTable from './CampaignTable';

const DashboardContent: React.FC = () => {
  return (
    <div style={{ padding: '32px' }}>
      {/* Metrics Section */}
      <MetricsSection />

      {/* Campaign Table */}
      <div style={{ marginTop: '32px' }}>
        <CampaignTable />
      </div>
    </div>
  );
};

export default DashboardContent;

