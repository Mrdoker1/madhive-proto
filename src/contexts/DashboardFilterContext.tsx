'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { campaignTableData } from '@/data/DashboardData';

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

interface DashboardFilterProviderProps {
  children: ReactNode;
  initialCampaignId?: string | null;
}

export const DashboardFilterProvider: React.FC<DashboardFilterProviderProps> = ({ children, initialCampaignId }) => {
  // Get first advertiser and campaign for default selection
  const firstCampaign = campaignTableData[0];
  const defaultAdvertiser = firstCampaign?.advertiser || null;
  const defaultCampaign = firstCampaign?.id || null;

  const [campaignType, setCampaignType] = useState<string | null>('linear');
  const [dateRange, setDateRange] = useState<string | null>('last_30_days');
  const [advertiser, setAdvertiser] = useState<string | null>(initialCampaignId ? null : defaultAdvertiser);
  const [campaign, setCampaign] = useState<string | null>(initialCampaignId || defaultCampaign);

  // Auto-select advertiser when initialCampaignId is provided
  useEffect(() => {
    if (initialCampaignId) {
      const campaignData = campaignTableData.find(row => row.id === initialCampaignId);
      if (campaignData) {
        setAdvertiser(campaignData.advertiser);
        setCampaign(initialCampaignId);
      }
    }
  }, [initialCampaignId]);

  const resetFilters = () => {
    setCampaignType('linear');
    setDateRange('last_30_days');
    setAdvertiser(defaultAdvertiser);
    setCampaign(defaultCampaign);
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

