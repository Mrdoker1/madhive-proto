'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="w-full h-16 border-b" style={{ backgroundColor: 'var(--header-background)', borderBottomColor: 'var(--border-color)' }}>
      <div className="h-full max-w-full mx-auto flex items-center justify-between px-4 lg:px-6 relative">
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
            unoptimized
          />
        </div>

        {/* Center - MadHive Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <div style={{ position: 'relative' }}>
            <Image
              src="/assets/icons/header/logo.svg"
              alt="MadHive Logo"
              width={120}
              height={32}
              className="h-8 w-auto max-w-[120px]"
              priority
            />
            <span style={{ 
              position: 'absolute', 
              top: '-2px', 
              right: '-32px', 
              fontSize: '10px', 
              color: '#000', 
              fontWeight: 500, 
              letterSpacing: '0.5px' 
            }}>
              Proto
            </span>
          </div>
        </div>

        {/* Right - Notifications, Help and User */}
        <div className="flex items-center shrink-0 gap-4" style={{ paddingRight: '16px' }}>
          <div className="flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
            <Image
              src="/assets/icons/header/help.svg"
              alt="Help & Support"
              width={24}
              height={24}
              className="w-6 h-6"
              unoptimized
            />
          </div>

          <div className="flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
            <Image
              src="/assets/icons/header/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
              <Image
                src="/assets/icons/header/user.svg"
                alt="User"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="font-medium" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
              DemoUserAccount
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;