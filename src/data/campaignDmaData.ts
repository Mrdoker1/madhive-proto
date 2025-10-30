export interface CampaignDMAZone {
  dmaName: string;
  city: string;
  state: string;
  impressions: number;
  coordinates: [number, number]; // [longitude, latitude]
  bounds?: [[number, number], [number, number]]; // Zone bounds [[minLng, minLat], [maxLng, maxLat]]
}

export interface CampaignDMAData {
  campaignId: string;
  campaignName: string;
  zones: CampaignDMAZone[];
}

// DMA data for Ford Motor Company campaign
const fordDMAData: CampaignDMAData = {
  campaignId: 'ford-mach-e-ev',
  campaignName: 'Ford Mach-E EV Intro',
  zones: [
    {
      dmaName: 'Detroit',
      city: 'Detroit',
      state: 'MI',
      impressions: 3946902,
      coordinates: [-83.0458, 42.3314],
      bounds: [[-83.5, 42.0], [-82.5, 42.7]]
    },
    {
      dmaName: 'Chicago',
      city: 'Chicago',
      state: 'IL',
      impressions: 3206858,
      coordinates: [-87.6298, 41.8781],
      bounds: [[-88.2, 41.5], [-87.0, 42.2]]
    },
    {
      dmaName: 'Cleveland',
      city: 'Cleveland',
      state: 'OH',
      impressions: 2466814,
      coordinates: [-81.6944, 41.4993],
      bounds: [[-82.2, 41.2], [-81.2, 41.8]]
    },
    {
      dmaName: 'Toronto',
      city: 'Toronto',
      state: 'ON',
      impressions: 2220133,
      coordinates: [-79.3832, 43.6532],
      bounds: [[-79.8, 43.4], [-79.0, 43.9]]
    },
    {
      dmaName: 'Grand Rapids',
      city: 'Grand Rapids',
      state: 'MI',
      impressions: 1726770,
      coordinates: [-85.6681, 42.9634],
      bounds: [[-86.0, 42.7], [-85.3, 43.2]]
    }
  ]
};

// DMA data for Toyota campaign
const toyotaDMAData: CampaignDMAData = {
  campaignId: 'toyota-q3-brand',
  campaignName: 'Toyota Q3 Brand Push',
  zones: [
    {
      dmaName: 'Los Angeles',
      city: 'Los Angeles',
      state: 'CA',
      impressions: 4523891,
      coordinates: [-118.2437, 34.0522],
      bounds: [[-118.8, 33.7], [-117.7, 34.4]]
    },
    {
      dmaName: 'San Francisco',
      city: 'San Francisco',
      state: 'CA',
      impressions: 3847623,
      coordinates: [-122.4194, 37.7749],
      bounds: [[-122.9, 37.4], [-122.0, 38.1]]
    },
    {
      dmaName: 'Seattle',
      city: 'Seattle',
      state: 'WA',
      impressions: 2934567,
      coordinates: [-122.3321, 47.6062],
      bounds: [[-122.8, 47.3], [-122.0, 47.9]]
    },
    {
      dmaName: 'Phoenix',
      city: 'Phoenix',
      state: 'AZ',
      impressions: 2567834,
      coordinates: [-112.0740, 33.4484],
      bounds: [[-112.5, 33.1], [-111.6, 33.8]]
    },
    {
      dmaName: 'Denver',
      city: 'Denver',
      state: 'CO',
      impressions: 2123456,
      coordinates: [-104.9903, 39.7392],
      bounds: [[-105.4, 39.4], [-104.5, 40.0]]
    }
  ]
};

// DMA data for Chevy campaign
const chevyDMAData: CampaignDMAData = {
  campaignId: 'chevy-silverado',
  campaignName: 'Chevy Silverado Summer Sale',
  zones: [
    {
      dmaName: 'Dallas-Fort Worth',
      city: 'Dallas',
      state: 'TX',
      impressions: 4234789,
      coordinates: [-96.7970, 32.7767],
      bounds: [[-97.3, 32.4], [-96.3, 33.1]]
    },
    {
      dmaName: 'Houston',
      city: 'Houston',
      state: 'TX',
      impressions: 3876234,
      coordinates: [-95.3698, 29.7604],
      bounds: [[-95.9, 29.4], [-94.9, 30.1]]
    },
    {
      dmaName: 'Atlanta',
      city: 'Atlanta',
      state: 'GA',
      impressions: 3234567,
      coordinates: [-84.3880, 33.7490],
      bounds: [[-84.8, 33.4], [-83.9, 34.0]]
    },
    {
      dmaName: 'Nashville',
      city: 'Nashville',
      state: 'TN',
      impressions: 2567891,
      coordinates: [-86.7816, 36.1627],
      bounds: [[-87.2, 35.9], [-86.3, 36.4]]
    },
    {
      dmaName: 'Oklahoma City',
      city: 'Oklahoma City',
      state: 'OK',
      impressions: 1923456,
      coordinates: [-97.5164, 35.4676],
      bounds: [[-98.0, 35.2], [-97.0, 35.7]]
    }
  ]
};

// DMA data for Ram campaign
const ramDMAData: CampaignDMAData = {
  campaignId: 'august-ram-truck',
  campaignName: 'August Ram Truck Month',
  zones: [
    {
      dmaName: 'Phoenix',
      city: 'Phoenix',
      state: 'AZ',
      impressions: 3824567,
      coordinates: [-112.0740, 33.4484],
      bounds: [[-112.5, 33.1], [-111.6, 33.8]]
    },
    {
      dmaName: 'Las Vegas',
      city: 'Las Vegas',
      state: 'NV',
      impressions: 3234891,
      coordinates: [-115.1398, 36.1699],
      bounds: [[-115.6, 35.9], [-114.7, 36.4]]
    },
    {
      dmaName: 'Salt Lake City',
      city: 'Salt Lake City',
      state: 'UT',
      impressions: 2567234,
      coordinates: [-111.8910, 40.7608],
      bounds: [[-112.3, 40.4], [-111.5, 41.0]]
    },
    {
      dmaName: 'Albuquerque',
      city: 'Albuquerque',
      state: 'NM',
      impressions: 2123789,
      coordinates: [-106.6504, 35.0844],
      bounds: [[-107.1, 34.8], [-106.2, 35.4]]
    },
    {
      dmaName: 'Tucson',
      city: 'Tucson',
      state: 'AZ',
      impressions: 1834567,
      coordinates: [-110.9747, 32.2226],
      bounds: [[-111.4, 31.9], [-110.5, 32.5]]
    }
  ]
};

// DMA data for Hyundai campaign
const hyundaiDMAData: CampaignDMAData = {
  campaignId: 'hyundai-sonata-sept',
  campaignName: 'Hyundai Sonata Sept Event',
  zones: [
    {
      dmaName: 'New York',
      city: 'New York',
      state: 'NY',
      impressions: 5234891,
      coordinates: [-74.0060, 40.7128],
      bounds: [[-74.5, 40.4], [-73.5, 41.0]]
    },
    {
      dmaName: 'Philadelphia',
      city: 'Philadelphia',
      state: 'PA',
      impressions: 3876234,
      coordinates: [-75.1652, 39.9526],
      bounds: [[-75.6, 39.6], [-74.7, 40.2]]
    },
    {
      dmaName: 'Boston',
      city: 'Boston',
      state: 'MA',
      impressions: 3234567,
      coordinates: [-71.0589, 42.3601],
      bounds: [[-71.5, 42.0], [-70.6, 42.7]]
    },
    {
      dmaName: 'Washington DC',
      city: 'Washington',
      state: 'DC',
      impressions: 2967891,
      coordinates: [-77.0369, 38.9072],
      bounds: [[-77.5, 38.6], [-76.6, 39.2]]
    },
    {
      dmaName: 'Baltimore',
      city: 'Baltimore',
      state: 'MD',
      impressions: 2456789,
      coordinates: [-76.6122, 39.2904],
      bounds: [[-77.0, 39.0], [-76.2, 39.6]]
    }
  ]
};

// DMA data for Lincoln campaign
const lincolnDMAData: CampaignDMAData = {
  campaignId: 'lincoln-aviator-luxury',
  campaignName: 'Lincoln Aviator Luxury',
  zones: [
    {
      dmaName: 'Miami',
      city: 'Miami',
      state: 'FL',
      impressions: 4123456,
      coordinates: [-80.1918, 25.7617],
      bounds: [[-80.6, 25.4], [-79.7, 26.0]]
    },
    {
      dmaName: 'Orlando',
      city: 'Orlando',
      state: 'FL',
      impressions: 3456789,
      coordinates: [-81.3792, 28.5383],
      bounds: [[-81.8, 28.2], [-81.0, 28.8]]
    },
    {
      dmaName: 'Tampa',
      city: 'Tampa',
      state: 'FL',
      impressions: 2987654,
      coordinates: [-82.4572, 27.9506],
      bounds: [[-82.9, 27.6], [-82.0, 28.2]]
    },
    {
      dmaName: 'Jacksonville',
      city: 'Jacksonville',
      state: 'FL',
      impressions: 2234567,
      coordinates: [-81.6557, 30.3322],
      bounds: [[-82.1, 30.0], [-81.2, 30.6]]
    },
    {
      dmaName: 'West Palm Beach',
      city: 'West Palm Beach',
      state: 'FL',
      impressions: 1876234,
      coordinates: [-80.0533, 26.7153],
      bounds: [[-80.5, 26.4], [-79.6, 27.0]]
    }
  ]
};

// DMA data for Q3 Ford F150 campaign
const fordF150DMAData: CampaignDMAData = {
  campaignId: 'q3-ford-f150',
  campaignName: 'Q3 25 Ford F150 TRISTATE',
  zones: [
    {
      dmaName: 'New York',
      city: 'New York',
      state: 'NY',
      impressions: 4567234,
      coordinates: [-74.0060, 40.7128],
      bounds: [[-74.5, 40.4], [-73.5, 41.0]]
    },
    {
      dmaName: 'Newark',
      city: 'Newark',
      state: 'NJ',
      impressions: 3234891,
      coordinates: [-74.1724, 40.7357],
      bounds: [[-74.6, 40.4], [-73.7, 41.0]]
    },
    {
      dmaName: 'Hartford',
      city: 'Hartford',
      state: 'CT',
      impressions: 2456789,
      coordinates: [-72.6851, 41.7658],
      bounds: [[-73.1, 41.4], [-72.2, 42.0]]
    },
    {
      dmaName: 'Albany',
      city: 'Albany',
      state: 'NY',
      impressions: 1987654,
      coordinates: [-73.7562, 42.6526],
      bounds: [[-74.2, 42.3], [-73.3, 42.9]]
    },
    {
      dmaName: 'Providence',
      city: 'Providence',
      state: 'RI',
      impressions: 1567891,
      coordinates: [-71.4128, 41.8240],
      bounds: [[-71.8, 41.5], [-71.0, 42.1]]
    }
  ]
};

// DMA data for JGC Holiday Pre-Launch campaign
const jgcHolidayDMAData: CampaignDMAData = {
  campaignId: 'jgc-holiday-pre',
  campaignName: 'JGC Holiday Pre-Launch',
  zones: [
    {
      dmaName: 'Los Angeles',
      city: 'Los Angeles',
      state: 'CA',
      impressions: 5123456,
      coordinates: [-118.2437, 34.0522],
      bounds: [[-118.8, 33.7], [-117.7, 34.4]]
    },
    {
      dmaName: 'San Diego',
      city: 'San Diego',
      state: 'CA',
      impressions: 3876234,
      coordinates: [-117.1611, 32.7157],
      bounds: [[-117.6, 32.4], [-116.7, 33.0]]
    },
    {
      dmaName: 'San Francisco',
      city: 'San Francisco',
      state: 'CA',
      impressions: 3456789,
      coordinates: [-122.4194, 37.7749],
      bounds: [[-122.9, 37.4], [-122.0, 38.1]]
    },
    {
      dmaName: 'Sacramento',
      city: 'Sacramento',
      state: 'CA',
      impressions: 2234567,
      coordinates: [-121.4944, 38.5816],
      bounds: [[-121.9, 38.3], [-121.0, 38.9]]
    },
    {
      dmaName: 'Fresno',
      city: 'Fresno',
      state: 'CA',
      impressions: 1567891,
      coordinates: [-119.7871, 36.7378],
      bounds: [[-120.2, 36.4], [-119.3, 37.0]]
    }
  ]
};

// Mapping of campaigns to their DMA data
export const campaignDMAMapping: Record<string, CampaignDMAData> = {
  'ford-mach-e-ev': fordDMAData,
  'toyota-q3-brand': toyotaDMAData,
  'chevy-silverado': chevyDMAData,
  'august-ram-truck': ramDMAData,
  'hyundai-sonata-sept': hyundaiDMAData,
  'lincoln-aviator-luxury': lincolnDMAData,
  'q3-ford-f150': fordF150DMAData,
  'jgc-holiday-pre': jgcHolidayDMAData
};

// Function to get DMA data by campaign ID
export const getCampaignDMAData = (campaignId: string): CampaignDMAData | null => {
  return campaignDMAMapping[campaignId] || null;
};

// Function to get all available campaigns with DMA data
export const getAvailableCampaigns = (): Array<{ id: string; name: string }> => {
  return Object.values(campaignDMAMapping).map(campaign => ({
    id: campaign.campaignId,
    name: campaign.campaignName
  }));
};

