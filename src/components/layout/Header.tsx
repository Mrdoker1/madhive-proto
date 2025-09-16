'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="w-full h-16 border-b" style={{ backgroundColor: 'var(--header-background)', borderBottomColor: 'var(--border-color)' }}>
      <div className="h-full max-w-full mx-auto flex items-center justify-between px-4 lg:px-6">
        {/* Left - Burger Menu */}
        <div className="flex items-center justify-center shrink-0" style={{ width: '64px', height: '64px' }}>
          <Image
            src="/assets/icons/header/burger.svg"
            alt="Menu"
            width={24}
            height={24}
            className="w-6 h-6 text-gray-700"
          />
        </div>

        {/* Center - Logo */}
        <div className="flex items-center justify-center flex-1 px-4">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/icons/header/logo.svg"
              alt="Logo"
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