'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardFilterContextType {
  campaignType: string | null;
  dateRange: string | null;
  advertiser: string | null;
  campaign: string | null;
  setCampaignType: (value: string | null) => void;
  setDateRange: (value: string | null) => void;
  setAdvertiser: (value: string | null) => void;
  setCampaign: (value: string | null) => void;
  resetFilters: () => void;
}

const DashboardFilterContext = createContext<DashboardFilterContextType | undefined>(undefined);

export const DashboardFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaignType, setCampaignType] = useState<string | null>('linear');
  const [dateRange, setDateRange] = useState<string | null>('last_30_days');
  const [advertiser, setAdvertiser] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string | null>(null);

  const resetFilters = () => {
    setCampaignType('linear');
    setDateRange('last_30_days');
    setAdvertiser(null);
    setCampaign(null);
  };

  return (
    <DashboardFilterContext.Provider
      value={{
        campaignType,
        dateRange,
        advertiser,
        campaign,
        setCampaignType,
        setDateRange,
        setAdvertiser,
        setCampaign,
        resetFilters
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  );
};

export const useDashboardFilters = () => {
  const context = useContext(DashboardFilterContext);
  if (context === undefined) {
    throw new Error('useDashboardFilters must be used within a DashboardFilterProvider');
  }
  return context;
};

