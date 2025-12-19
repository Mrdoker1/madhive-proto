'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="w-full h-16 border-b" style={{ backgroundColor: 'var(--header-background)', borderBottomColor: 'var(--border-color)' }}>
      <div className="h-full max-w-full mx-auto flex items-center justify-between px-4 lg:px-6">
        {/* Left - Burger Menu and Branding */}
        <div className="flex items-center shrink-0 gap-4">
          <div className="flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
            <Image
              src="/assets/icons/header/burger.svg"
              alt="Menu"
              width={24}
              height={24}
              className="w-6 h-6 text-gray-700"
            />
          </div>
          <Image
            src="/assets/icons/header/programmatic-tv-logo.png"
            alt="Programmatic Television"
            width={200}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </div>

        {/* Center - MadHive Logo */}
        <div className="flex items-center justify-center flex-1 px-4">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/icons/header/logo.svg"
              alt="MadHive Logo"
              width={120}
              height={32}
              className="h-8 w-auto max-w-[120px]"
              priority
            />
          </div>
        </div>

        {/* Right - Notifications and User */}
        <div className="flex items-center shrink-0" style={{ gap: '0px' }}>
          <div className="flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
            <Image
              src="/assets/icons/header/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="w-6 h-6 text-gray-700"
            />
          </div>
          
          <div className="flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
            <Image
              src="/assets/icons/header/user.svg"
              alt="User"
              width={24}
              height={24}
              className="w-6 h-6 text-gray-700"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;