'use client';

import React from 'react';
import MetricsSection from './MetricsSection';
import GeoPerformanceMap from './GeoPerformanceMap';
import CampaignTable from './CampaignTable';

const DashboardContent: React.FC = () => {
  return (
    <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '32px', paddingBottom: '32px' }}>
      {/* Metrics Section */}
      <MetricsSection />

      {/* Geo Performance Map */}
      <div style={{ marginTop: '32px' }}>
        <GeoPerformanceMap />
      </div>

      {/* Campaign Table */}
      <div style={{ marginTop: '32px' }}>
        <CampaignTable />
      </div>
    </div>
  );
};

export default DashboardContent;

