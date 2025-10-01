'use client';

import React from 'react';
import { TextInput } from '@mantine/core';
import Image from 'next/image';

const DashboardHeader: React.FC = () => {
  return (
    <header 
      className="w-full border-b" 
      style={{ 
        backgroundColor: 'var(--header-background)', 
        borderBottomColor: 'var(--border-color)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px'
      }}
    >
      {/* Left - Title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          color: '#000000',
          margin: 0
        }}>
          Dashboard
        </h1>
      </div>

      {/* Right - Search, Settings, Info, New Campaign Button */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Search Input */}
        <TextInput
          placeholder="Search..."
          leftSection={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          styles={{
            input: {
              width: '240px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px',
              '&:focus': {
                borderColor: 'var(--primary-color)'
              }
            }
          }}
        />

        {/* Settings Icon */}
        <button 
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-background)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0301 16.0717 13.3006C16.1209 13.5711 16.2501 13.8203 16.4417 14.0167L16.4917 14.0667C16.6464 14.2213 16.7694 14.4052 16.8538 14.6077C16.9382 14.8102 16.9824 15.0272 16.9824 15.2464C16.9824 15.4656 16.9382 15.6826 16.8538 15.8851C16.7694 16.0876 16.6464 16.2715 16.4917 16.4261C16.3371 16.5808 16.1532 16.7038 15.9507 16.7882C15.7482 16.8726 15.5312 16.9168 15.312 16.9168C15.0928 16.9168 14.8758 16.8726 14.6733 16.7882C14.4708 16.7038 14.2869 16.5808 14.1323 16.4261L14.0823 16.3761C13.8859 16.1845 13.6367 16.0553 13.3662 16.0062C13.0957 15.957 12.8169 15.9901 12.5656 16.1011C12.3194 16.2069 12.1112 16.3827 11.9673 16.6063C11.8235 16.83 11.7502 17.0916 11.7567 17.3578V17.5C11.7567 17.942 11.5811 18.366 11.2686 18.6785C10.9561 18.991 10.5321 19.1667 10.09 19.1667C9.64797 19.1667 9.22405 18.991 8.91149 18.6785C8.59893 18.366 8.42333 17.942 8.42333 17.5V17.425C8.41163 17.1477 8.32553 16.8791 8.17448 16.6483C8.02344 16.4175 7.81319 16.2333 7.56583 16.1167C7.31453 16.0057 7.03571 15.9726 6.76519 16.0218C6.49467 16.0709 6.24548 16.2001 6.04917 16.3917L5.99917 16.4417C5.84454 16.5964 5.6606 16.7194 5.4581 16.8038C5.25561 16.8882 5.03862 16.9324 4.81942 16.9324C4.60021 16.9324 4.38322 16.8882 4.18073 16.8038C3.97823 16.7194 3.79429 16.5964 3.63967 16.4417C3.485 16.2871 3.36198 16.1032 3.27759 15.9007C3.1932 15.6982 3.14902 15.4812 3.14902 15.262C3.14902 15.0428 3.1932 14.8258 3.27759 14.6233C3.36198 14.4208 3.485 14.2369 3.63967 14.0823L3.68967 14.0323C3.88126 13.8359 4.01044 13.5867 4.05959 13.3162C4.10874 13.0457 4.07565 12.7669 3.96467 12.5156C3.85885 12.2694 3.68302 12.0612 3.45939 11.9173C3.23576 11.7735 2.97411 11.7002 2.70792 11.7067H2.56583C2.12381 11.7067 1.69988 11.5311 1.38732 11.2185C1.07477 10.906 0.899169 10.482 0.899169 10.04C0.899169 9.59797 1.07477 9.17405 1.38732 8.86149C1.69988 8.54893 2.12381 8.37333 2.56583 8.37333H2.64083C2.91818 8.36163 3.18675 8.27553 3.41757 8.12448C3.64838 7.97344 3.83259 7.76319 3.94917 7.51583C4.06015 7.26453 4.09324 6.98571 4.04409 6.71519C3.99494 6.44467 3.86576 6.19548 3.67417 5.99917L3.62417 5.94917C3.4695 5.79454 3.34648 5.6106 3.26209 5.4081C3.1777 5.20561 3.13352 4.98862 3.13352 4.76942C3.13352 4.55021 3.1777 4.33322 3.26209 4.13073C3.34648 3.92823 3.4695 3.74429 3.62417 3.58967C3.77879 3.435 3.96273 3.31198 4.16523 3.22759C4.36772 3.1432 4.58471 3.09902 4.80392 3.09902C5.02312 3.09902 5.24011 3.1432 5.44261 3.22759C5.6451 3.31198 5.82904 3.435 5.98367 3.58967L6.03367 3.63967C6.22998 3.83126 6.47917 3.96044 6.74969 4.00959C7.02021 4.05874 7.29903 4.02565 7.55033 3.91467H7.56583C7.81202 3.80885 8.02024 3.63302 8.16407 3.40939C8.30789 3.18576 8.38123 2.92411 8.37467 2.65792V2.5C8.37467 2.05797 8.55026 1.63405 8.86282 1.32149C9.17538 1.00893 9.59931 0.833328 10.0413 0.833328C10.4834 0.833328 10.9073 1.00893 11.2198 1.32149C11.5324 1.63405 11.708 2.05797 11.708 2.5V2.575C11.7145 2.84119 11.7879 3.10284 11.9317 3.32647C12.0755 3.5501 12.2837 3.72593 12.5299 3.83175C12.7812 3.94273 13.06 3.97582 13.3305 3.92667C13.6011 3.87752 13.8503 3.74834 14.0466 3.55675L14.0966 3.50675C14.2512 3.35208 14.4351 3.22906 14.6376 3.14467C14.8401 3.06028 15.0571 3.0161 15.2763 3.0161C15.4955 3.0161 15.7125 3.06028 15.915 3.14467C16.1175 3.22906 16.3014 3.35208 16.456 3.50675C16.6107 3.66137 16.7337 3.84531 16.8181 4.04781C16.9025 4.2503 16.9467 4.46729 16.9467 4.6865C16.9467 4.9057 16.9025 5.12269 16.8181 5.32519C16.7337 5.52768 16.6107 5.71162 16.456 5.86625L16.406 5.91625C16.2144 6.11256 16.0852 6.36175 16.0361 6.63227C15.9869 6.90279 16.02 7.18161 16.131 7.43292V7.44842C16.2368 7.6946 16.4127 7.90282 16.6363 8.04665C16.8599 8.19047 17.1216 8.26381 17.3878 8.25725H17.5078C17.9498 8.25725 18.3738 8.43285 18.6863 8.74541C18.9989 9.05797 19.1745 9.4819 19.1745 9.92392C19.1745 10.3659 18.9989 10.7899 18.6863 11.1024C18.3738 11.415 17.9498 11.5906 17.5078 11.5906H17.4328C17.1666 11.5972 16.905 11.6705 16.6813 11.8143C16.4577 11.9582 16.2819 12.1664 16.176 12.4126V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Info Icon */}
        <button 
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-background)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 13.3333V10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 6.66667H10.0083" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* New Campaign Button */}
        <button
          style={{
            height: '40px',
            padding: '0 20px',
            backgroundColor: 'var(--primary-color)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          New Campaign
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;

