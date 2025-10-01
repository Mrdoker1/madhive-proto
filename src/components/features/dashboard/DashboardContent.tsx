'use client';

import React from 'react';

const DashboardContent: React.FC = () => {
  return (
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
  );
};

export default DashboardContent;

