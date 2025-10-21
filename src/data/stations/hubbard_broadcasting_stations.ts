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

export const hubbard_broadcastingStations: StationInfo[] = [
  {
    station: "KSTP-TV",
    associatedDma: "Minneapolis-St. Paul, MN",
    affiliation: ["ABC"],
    website: "kstp.com",
    city: "Saint Paul",
    state: "MN",
  },
  {
    station: "KSTC-TV",
    associatedDma: "Minneapolis-St. Paul, MN",
    affiliation: ["Independent"],
    website: "kstp.com",
    city: "Minneapolis",
    state: "MN",
  },
  {
    station: "WDIO-DT",
    associatedDma: "Duluth, MN-Superior, WI",
    affiliation: ["ABC"],
    website: "wdio.com",
    city: "Duluth",
    state: "MN",
  },
  {
    station: "WIRT-DT",
    associatedDma: "Duluth, MN-Superior, WI",
    affiliation: ["ABC"],
    website: "wdio.com",
    city: "Hibbing",
    state: "MN",
  },
  {
    station: "KAAL-TV",
    associatedDma: "Rochester, MN-Mason City, IA-Austin, MN",
    affiliation: ["ABC"],
    website: "kaaltv.com",
    city: "Austin",
    state: "MN",
  },
  {
    station: "KOB",
    associatedDma: "Albuquerque-Santa Fe, NM",
    affiliation: ["NBC"],
    website: "kob.com",
    city: "Albuquerque",
    state: "NM",
  },
  {
    station: "KOBR",
    associatedDma: "Albuquerque-Santa Fe, NM",
    affiliation: ["NBC"],
    website: "kob.com",
    city: "Roswell",
    state: "NM",
  },
  {
    station: "KOBF",
    associatedDma: "Farmington, NM",
    affiliation: ["NBC"],
    website: "kob.com",
    city: "Farmington",
    state: "NM",
  },
  {
    station: "WHEC-TV",
    associatedDma: "Rochester, NY",
    affiliation: ["NBC"],
    website: "whec.com",
    city: "Rochester",
    state: "NY",
  },
  {
    station: "WNYT",
    associatedDma: "Albany-Schenectady-Troy, NY",
    affiliation: ["NBC"],
    website: "wnyt.com",
    city: "Albany",
    state: "NY",
  },
];
