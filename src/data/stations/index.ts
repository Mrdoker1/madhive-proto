import { abcStations } from './abc_stations';
import { cbsStations } from './cbs_stations';
import { nbcStations } from './nbc_stations';
import { grayStations } from './gray_stations';
import { hearstStations } from './hearst_stations';
import { tegnaStations } from './tegna_stations';
import { scrippsStations } from './scripps_stations';
import { morgan_murphyStations } from './morgan_murphy_stations';
import { univisionStations } from './univision_stations';
import { entravisionStations } from './entravision_stations';
import { hubbard_broadcastingStations } from './hubbard_broadcasting_stations';
import { news_press_gazzetteStations } from './news_press_gazzette_stations';

export interface StationInfo {
  rank?: number;
  station: string;
  status?: string;
  market?: string;
  associatedDma?: string;
  affiliation?: string[];
  website?: string;
  city?: string;
  state?: string;
}

export interface BroadcasterStations {
  broadcasterId: string;
  broadcasterName: string;
  stations: StationInfo[];
}

export const allBroadcasterStations: BroadcasterStations[] = [
  {
    broadcasterId: 'abc',
    broadcasterName: 'ABC',
    stations: abcStations
  },
  {
    broadcasterId: 'cbs',
    broadcasterName: 'CBS',
    stations: cbsStations
  },
  {
    broadcasterId: 'nbc',
    broadcasterName: 'NBC',
    stations: nbcStations
  },
  {
    broadcasterId: 'gray',
    broadcasterName: 'Gray',
    stations: grayStations
  },
  {
    broadcasterId: 'hearst',
    broadcasterName: 'Hearst',
    stations: hearstStations
  },
  {
    broadcasterId: 'tegna',
    broadcasterName: 'TEGNA',
    stations: tegnaStations
  },
  {
    broadcasterId: 'scripps',
    broadcasterName: 'Scripps',
    stations: scrippsStations
  },
  {
    broadcasterId: 'morgan-murphy',
    broadcasterName: 'Morgan Murphy',
    stations: morgan_murphyStations
  },
  {
    broadcasterId: 'univision',
    broadcasterName: 'Univision',
    stations: univisionStations
  },
  {
    broadcasterId: 'entravision',
    broadcasterName: 'Entravision',
    stations: entravisionStations
  },
  {
    broadcasterId: 'hubbard-broadcasting',
    broadcasterName: 'Hubbard Broadcasting',
    stations: hubbard_broadcastingStations
  },
  {
    broadcasterId: 'news-press-gazette',
    broadcasterName: 'News Press Gazette',
    stations: news_press_gazzetteStations
  }
];

// Helper functions
export const getAllStations = (): StationInfo[] => {
  return allBroadcasterStations.flatMap(b => b.stations);
};

export const getStationsByBroadcaster = (broadcasterId: string): StationInfo[] => {
  const broadcaster = allBroadcasterStations.find(b => b.broadcasterId === broadcasterId);
  return broadcaster?.stations || [];
};

export const getAllUniqueDMAs = (): string[] => {
  const dmas = new Set<string>();
  allBroadcasterStations.forEach(broadcaster => {
    broadcaster.stations.forEach(station => {
      if (station.associatedDma) {
        dmas.add(station.associatedDma);
      }
    });
  });
  return Array.from(dmas).sort();
};

export const getStationsByDMA = (dma: string): { broadcasterId: string; station: StationInfo }[] => {
  const results: { broadcasterId: string; station: StationInfo }[] = [];
  
  allBroadcasterStations.forEach(broadcaster => {
    broadcaster.stations.forEach(station => {
      if (station.associatedDma === dma) {
        results.push({
          broadcasterId: broadcaster.broadcasterId,
          station
        });
      }
    });
  });
  
  return results;
};

export const getBroadcastersByDMA = (dma: string): string[] => {
  const broadcasters = new Set<string>();
  
  allBroadcasterStations.forEach(broadcaster => {
    const hasStationInDMA = broadcaster.stations.some(station => station.associatedDma === dma);
    if (hasStationInDMA) {
      broadcasters.add(broadcaster.broadcasterId);
    }
  });
  
  return Array.from(broadcasters);
};

