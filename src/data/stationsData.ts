export interface StationData {
  id: string;
  name: string;
  marketId: string;
  broadcasterId: string;
  cpm: string;
  marketShare: number; // доля рынка в процентах
  audienceSize: number; // размер аудитории
}

// Станции, распределенные по маркетам и бродкастерам
export const stationsData: StationData[] = [
  // New York, NY станции
  {
    id: 'abc-wabc-ny',
    name: 'WABC-TV (ABC New York)',
    marketId: 'new-york-ny',
    broadcasterId: 'abc',
    cpm: '$22.50',
    marketShare: 25,
    audienceSize: 2100000
  },
  {
    id: 'cbs-wcbs-ny',
    name: 'WCBS-TV (CBS New York)',
    marketId: 'new-york-ny',
    broadcasterId: 'cbs',
    cpm: '$23.10',
    marketShare: 28,
    audienceSize: 2350000
  },
  {
    id: 'nbc-wnbc-ny',
    name: 'WNBC (NBC New York)',
    marketId: 'new-york-ny',
    broadcasterId: 'nbc',
    cpm: '$23.40',
    marketShare: 26,
    audienceSize: 2180000
  },
  {
    id: 'tegna-wgrz-ny',
    name: 'WGRZ (TEGNA New York)',
    marketId: 'new-york-ny',
    broadcasterId: 'tegna',
    cpm: '$21.80',
    marketShare: 21,
    audienceSize: 1760000
  },

  // Los Angeles, CA станции
  {
    id: 'abc-kabc-la',
    name: 'KABC-TV (ABC Los Angeles)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'abc',
    cpm: '$21.80',
    marketShare: 30,
    audienceSize: 3960000
  },
  {
    id: 'cbs-kcbs-la',
    name: 'KCBS-TV (CBS Los Angeles)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'cbs',
    cpm: '$22.40',
    marketShare: 32,
    audienceSize: 4224000
  },
  {
    id: 'nbc-knbc-la',
    name: 'KNBC (NBC Los Angeles)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'nbc',
    cpm: '$22.70',
    marketShare: 29,
    audienceSize: 3828000
  },
  {
    id: 'univision-kmex-la',
    name: 'KMEX (Univision Los Angeles)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'univision',
    cpm: '$18.40',
    marketShare: 35,
    audienceSize: 4620000
  },

  // Chicago, IL станции
  {
    id: 'abc-wls-chi',
    name: 'WLS-TV (ABC Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'abc',
    cpm: '$23.20',
    marketShare: 20,
    audienceSize: 1920000
  },
  {
    id: 'cbs-wbbm-chi',
    name: 'WBBM-TV (CBS Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'cbs',
    cpm: '$23.80',
    marketShare: 22,
    audienceSize: 2112000
  },
  {
    id: 'nbc-wmaq-chi',
    name: 'WMAQ-TV (NBC Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'nbc',
    cpm: '$23.90',
    marketShare: 24,
    audienceSize: 2304000
  },
  {
    id: 'nexstar-wgn-chi',
    name: 'WGN-TV (Nexstar Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'nexstar',
    cpm: '$22.60',
    marketShare: 34,
    audienceSize: 3264000
  },

  // Dallas-Ft. Worth, TX станции
  {
    id: 'abc-wfaa-dal',
    name: 'WFAA (ABC Dallas)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'abc',
    cpm: '$22.90',
    marketShare: 25,
    audienceSize: 1900000
  },
  {
    id: 'cbs-ktvt-dal',
    name: 'KTVT (CBS Dallas)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'cbs',
    cpm: '$23.50',
    marketShare: 27,
    audienceSize: 2052000
  },
  {
    id: 'tegna-wfaa-dal',
    name: 'WFAA (TEGNA Dallas)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'tegna',
    cpm: '$22.30',
    marketShare: 29,
    audienceSize: 2204000
  },
  {
    id: 'univision-kuvn-dal',
    name: 'KUVN (Univision Dallas)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'univision',
    cpm: '$19.80',
    marketShare: 19,
    audienceSize: 1444000
  },

  // Philadelphia, PA станции
  {
    id: 'abc-wpvi-phi',
    name: 'WPVI-TV (ABC Philadelphia)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'abc',
    cpm: '$23.50',
    marketShare: 28,
    audienceSize: 1736000
  },
  {
    id: 'cbs-kyw-phi',
    name: 'KYW-TV (CBS Philadelphia)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'cbs',
    cpm: '$24.10',
    marketShare: 26,
    audienceSize: 1612000
  },
  {
    id: 'nbc-wcau-phi',
    name: 'WCAU (NBC Philadelphia)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'nbc',
    cpm: '$24.30',
    marketShare: 24,
    audienceSize: 1488000
  },
  {
    id: 'nexstar-wtxf-phi',
    name: 'WTXF-TV (Nexstar Philadelphia)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'nexstar',
    cpm: '$23.20',
    marketShare: 22,
    audienceSize: 1364000
  },

  // Houston, TX станции
  {
    id: 'abc-ktrk-hou',
    name: 'KTRK-TV (ABC Houston)',
    marketId: 'houston-tx',
    broadcasterId: 'abc',
    cpm: '$23.80',
    marketShare: 23,
    audienceSize: 1633000
  },
  {
    id: 'cbs-khou-hou',
    name: 'KHOU-TV (CBS Houston)',
    marketId: 'houston-tx',
    broadcasterId: 'cbs',
    cpm: '$24.20',
    marketShare: 18,
    audienceSize: 1278000
  },
  {
    id: 'nbc-kprc-hou',
    name: 'KPRC-TV (NBC Houston)',
    marketId: 'houston-tx',
    broadcasterId: 'nbc',
    cpm: '$24.40',
    marketShare: 25,
    audienceSize: 1775000
  },
  {
    id: 'gray-kbtx-hou',
    name: 'KBTX (Gray Houston)',
    marketId: 'houston-tx',
    broadcasterId: 'gray',
    cpm: '$22.80',
    marketShare: 34,
    audienceSize: 2414000
  },

  // Atlanta, GA станции
  {
    id: 'abc-wsb-atl',
    name: 'WSB-TV (ABC Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'abc',
    cpm: '$22.40',
    marketShare: 26,
    audienceSize: 1586000
  },
  {
    id: 'cbs-wgcl-atl',
    name: 'WGCL-TV (CBS Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'cbs',
    cpm: '$23.10',
    marketShare: 24,
    audienceSize: 1464000
  },
  {
    id: 'nbc-wxia-atl',
    name: 'WXIA-TV (NBC Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'nbc',
    cpm: '$23.30',
    marketShare: 22,
    audienceSize: 1342000
  },
  {
    id: 'gray-wsb-atl',
    name: 'WSB-TV (Gray Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'gray',
    cpm: '$19.90',
    marketShare: 30,
    audienceSize: 1830000
  },

  // Washington, DC станции
  {
    id: 'abc-wjla-dc',
    name: 'WJLA-TV (ABC Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'abc',
    cpm: '$24.50',
    marketShare: 25,
    audienceSize: 1575000
  },
  {
    id: 'cbs-wusa-dc',
    name: 'WUSA (CBS Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'cbs',
    cpm: '$25.10',
    marketShare: 27,
    audienceSize: 1701000
  },
  {
    id: 'nbc-wrc-dc',
    name: 'WRC-TV (NBC Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'nbc',
    cpm: '$25.30',
    marketShare: 26,
    audienceSize: 1638000
  },
  {
    id: 'tegna-wusa-dc',
    name: 'WUSA (TEGNA Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'tegna',
    cpm: '$24.20',
    marketShare: 22,
    audienceSize: 1386000
  },

  // Boston, MA станции
  {
    id: 'abc-wcvb-bos',
    name: 'WCVB-TV (ABC Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'abc',
    cpm: '$23.60',
    marketShare: 28,
    audienceSize: 1372000
  },
  {
    id: 'cbs-wbz-bos',
    name: 'WBZ-TV (CBS Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'cbs',
    cpm: '$24.20',
    marketShare: 26,
    audienceSize: 1274000
  },
  {
    id: 'nbc-wbts-bos',
    name: 'WBTS-LD (NBC Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'nbc',
    cpm: '$24.40',
    marketShare: 24,
    audienceSize: 1176000
  },
  {
    id: 'hearst-wcvb-bos',
    name: 'WCVB (Hearst Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'hearst',
    cpm: '$21.20',
    marketShare: 32,
    audienceSize: 1568000
  },

  // San Francisco-Oakland-San Jose, CA станции
  {
    id: 'abc-kgo-sf',
    name: 'KGO-TV (ABC San Francisco)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'abc',
    cpm: '$25.40',
    marketShare: 27,
    audienceSize: 2106000
  },
  {
    id: 'cbs-kpix-sf',
    name: 'KPIX-TV (CBS San Francisco)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'cbs',
    cpm: '$26.10',
    marketShare: 29,
    audienceSize: 2262000
  },
  {
    id: 'nbc-kntv-sf',
    name: 'KNTV (NBC San Francisco)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'nbc',
    cpm: '$26.30',
    marketShare: 25,
    audienceSize: 1950000
  },
  {
    id: 'univision-kdtv-sf',
    name: 'KDTV (Univision San Francisco)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'univision',
    cpm: '$22.80',
    marketShare: 19,
    audienceSize: 1482000
  },

  // Tampa-St. Petersburg, FL станции
  {
    id: 'abc-wfts-tb',
    name: 'WFTS-TV (ABC Tampa)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'abc',
    cpm: '$21.80',
    marketShare: 26,
    audienceSize: 832000
  },
  {
    id: 'cbs-wtsp-tb',
    name: 'WTSP (CBS Tampa)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'cbs',
    cpm: '$22.40',
    marketShare: 28,
    audienceSize: 896000
  },
  {
    id: 'nbc-wfla-tb',
    name: 'WFLA-TV (NBC Tampa)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'nbc',
    cpm: '$22.60',
    marketShare: 24,
    audienceSize: 768000
  },
  {
    id: 'nexstar-wfla-tb',
    name: 'WFLA (Nexstar Tampa)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'nexstar',
    cpm: '$21.20',
    marketShare: 22,
    audienceSize: 704000
  },

  // Phoenix, AZ станции
  {
    id: 'abc-knxv-phx',
    name: 'KNXV-TV (ABC Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'abc',
    cpm: '$22.90',
    marketShare: 25,
    audienceSize: 1250000
  },
  {
    id: 'cbs-kpho-phx',
    name: 'KPHO-TV (CBS Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'cbs',
    cpm: '$23.50',
    marketShare: 27,
    audienceSize: 1350000
  },
  {
    id: 'nbc-kpnx-phx',
    name: 'KPNX (NBC Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'nbc',
    cpm: '$23.70',
    marketShare: 26,
    audienceSize: 1300000
  },
  {
    id: 'gray-kpho-phx',
    name: 'KPHO (Gray Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'gray',
    cpm: '$22.10',
    marketShare: 22,
    audienceSize: 1100000
  }
];

// Функции для работы со станциями

// Получить все станции для конкретного маркета
export const getStationsByMarket = (marketId: string): StationData[] => {
  return stationsData.filter(station => station.marketId === marketId);
};

// Получить все станции для конкретного бродкастера
export const getStationsByBroadcaster = (broadcasterId: string): StationData[] => {
  return stationsData.filter(station => station.broadcasterId === broadcasterId);
};

// Получить станции для конкретного маркета и бродкастера
export const getStationsByMarketAndBroadcaster = (marketId: string, broadcasterId: string): StationData[] => {
  return stationsData.filter(station => 
    station.marketId === marketId && station.broadcasterId === broadcasterId
  );
};

// Получить станцию по ID
export const getStationById = (id: string): StationData | undefined => {
  return stationsData.find(station => station.id === id);
};

// Получить уникальные маркеты для выбранных бродкастеров
export const getAvailableMarkets = (broadcasterIds: string[]): string[] => {
  const marketIds = new Set<string>();
  
  stationsData.forEach(station => {
    if (broadcasterIds.includes(station.broadcasterId)) {
      marketIds.add(station.marketId);
    }
  });
  
  return Array.from(marketIds);
};
