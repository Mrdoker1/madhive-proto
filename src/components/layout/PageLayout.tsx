'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs, { BreadcrumbStep } from '../ui/Breadcrumbs';
import PageHeader from '../ui/PageHeader';
import RightSidebar from './RightSidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbStep[];
  title?: string;
  showProgress?: boolean; // Показывать прогресс в breadcrumbs
  onBreadcrumbClick?: (step: BreadcrumbStep) => void; // Обработчик клика на breadcrumb
  showRightSidebar?: boolean; // Показывать правый сайдбар
  footerContent?: React.ReactNode; // Контент который будет зафиксирован внизу
  // Опции правой кнопки в PageHeader
  headerShowRightButton?: boolean;
  headerRightButtonText?: string;
  headerRightButtonActive?: boolean;
  onHeaderRightButtonClick?: () => void;
  // Дополнительные действия/контент в заголовке (справа от title)
  headerActions?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  breadcrumbs = [], 
  title, 
  showProgress = false,
  onBreadcrumbClick,
  showRightSidebar = false,
  footerContent,
  headerShowRightButton = false,
  headerRightButtonText = 'Next',
  headerRightButtonActive = true,
  onHeaderRightButtonClick,
  headerActions
}) => {
  return (
    <motion.div 
      className="flex flex-col h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breadcrumbs - только если переданы */}
      <AnimatePresence>
        {breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Breadcrumbs 
              steps={breadcrumbs} 
              showProgress={showProgress}
              onStepClick={onBreadcrumbClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Layout Container - от PageHeader до конца */}
      <motion.div 
        className="flex flex-1 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {/* Left Side - PageHeader + Content */}
        <motion.div 
          className="flex flex-col flex-1 overflow-hidden relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {/* Page Header - только если передан title */}
          <AnimatePresence>
            {title && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <PageHeader 
                  title={title}
                  showRightButton={headerShowRightButton}
                  rightButtonText={headerRightButtonText}
                  rightButtonActive={headerRightButtonActive}
                  onRightButtonClick={onHeaderRightButtonClick}
                  actions={headerActions}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Page Content */}
          <motion.main 
            className="flex-1 overflow-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{ paddingBottom: footerContent ? '80px' : '0' }} // Добавляем отступ снизу если есть footer
          >
            {children}
          </motion.main>
          
          {/* Fixed Footer Content - зафиксирован внизу левой части */}
          <AnimatePresence>
            {footerContent && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  width: '100%'
                }}
              >
                {footerContent}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Right Sidebar - от уровня PageHeader до конца страницы */}
        <AnimatePresence>
          {showRightSidebar && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4, 
                ease: "easeOut",
                scale: { duration: 0.3 }
              }}
            >
              <RightSidebar />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default PageLayout;