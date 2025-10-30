'use client';

import React from 'react';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  required?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  children,
  id,
  className = '',
  required = false
}) => {
  return (
    <section id={id} className={`scroll-mt-8 ${className}`}>
      {/* Section title */}
      <h2 
        style={{ 
          fontSize: '16px',
          color: '#000000',
          marginBottom: '16px',
          fontWeight: 500
        }}
      >
        {title}
        {required && <span style={{ color: '#FA5252' }}> *</span>}
      </h2>
      
      {/* Content container */}
      <div 
        className="rounded-lg"
        style={{ 
          backgroundColor: '#FFFFFF',
          padding: '40px',
          borderRadius: '8px'
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;