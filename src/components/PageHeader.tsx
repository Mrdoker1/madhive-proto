'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div 
      className="w-full border-b flex items-center"
      style={{ 
        height: '64px',
        backgroundColor: 'var(--header-background)',
        borderBottomColor: 'var(--border-color)',
        paddingLeft: '40px'
      }}
    >
      <h1 
        style={{ 
          fontSize: '24px',
          fontWeight: 500,
          margin: 0,
          color: '#000000'
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;