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

export const univisionStations: StationInfo[] = [
  {
    station: "WXTV",
    associatedDma: "New York, NY",
    affiliation: ["Univision"],
    website: "univision.com/local/nueva-york-wxtv",
    city: "Paterson",
    state: "NJ",
  },
  {
    station: "KMEX",
    associatedDma: "Los Angeles, CA",
    affiliation: ["Univision"],
    website: "univision.com/local/los-angeles-kmex",
    city: "Los Angeles",
    state: "CA",
  },
  {
    station: "KDTV",
    associatedDma: "San Francisco-Oakland-San Jose, CA",
    affiliation: ["Univision"],
    website: "univision.com/local/san-francisco-kdtv",
    city: "San Francisco",
    state: "CA",
  },
  {
    station: "KUVS",
    associatedDma: "Sacramento-Stockton-Modesto, CA",
    affiliation: ["Univision"],
    website: "univision.com/local/sacramento-kuvs",
    city: "Modesto",
    state: "CA",
  },
  {
    station: "KFTV",
    associatedDma: "Fresno-Visalia, CA",
    affiliation: ["Univision"],
    website: "tvstationsnearme.com/station/CA/KFTV",
    city: "Hanford",
    state: "CA",
  },
  {
    station: "KXLN",
    associatedDma: "Houston, TX",
    affiliation: ["Univision"],
    website: "univision.com/local/houston-kxln",
    city: "Rosenberg",
    state: "TX",
  },
  {
    station: "KUVN",
    associatedDma: "Dallas-Ft. Worth, TX",
    affiliation: ["Univision"],
    website: "univision.com/local/dallas-kuvn",
    city: "Garland",
    state: "TX",
  },
  {
    station: "KWEX",
    associatedDma: "San Antonio, TX",
    affiliation: ["Univision"],
    website: "univision.com/local/san-antonio-kwex",
    city: "San Antonio",
    state: "TX",
  },
  {
    station: "WLTV",
    associatedDma: "Miami-Ft. Lauderdale, FL",
    affiliation: ["Univision"],
    website: "univision.com/local/miami-wltv",
    city: "Miami",
    state: "FL",
  },
  {
    station: "WUVG",
    associatedDma: "Atlanta, GA",
    affiliation: ["Univision"],
    website: "univision.com/local/atlanta-wuvg",
    city: "Athens",
    state: "GA",
  },
  {
    station: "WUNI",
    associatedDma: "Boston, MA (Manchester, NH)",
    affiliation: ["Univision"],
    website: "univision.com/local/boston-wuni",
    city: "Worcester",
    state: "MA",
  },
  {
    station: "WFDC",
    associatedDma: "Washington, DC (Hagerstown, MD)",
    affiliation: ["Univision"],
    website: "univision.com/local/washington-dc-wfdc",
    city: "Arlington",
    state: "VA",
  },
  {
    station: "WUVP",
    associatedDma: "Philadelphia, PA",
    affiliation: ["Univision"],
    website: "univision.com/local/philadelphia-wuvp",
    city: "Vineland",
    state: "NJ",
  },
  {
    station: "WVEA",
    associatedDma: "Tampa-St. Petersburg (Sarasota), FL",
    affiliation: ["Univision"],
    website: "univision.com/local/tampa-wvea",
    city: "Tampa",
    state: "FL",
  },
  {
    station: "WUVF",
    associatedDma: "Ft. Myers-Naples, FL",
    affiliation: ["Univision"],
    website: "univision.com/local/fort-myers-wuvf",
    city: "Naples",
    state: "FL",
  },
  {
    station: "WUTH",
    associatedDma: "Hartford & New Haven, CT",
    affiliation: ["Univision"],
    website: "univision.com/local/hartford-wuth",
    city: "Hartford",
    state: "CT",
  },
  {
    station: "WUVN",
    associatedDma: "Hartford & New Haven, CT",
    affiliation: ["Univision"],
    website: "univision.com/local/hartford-wuvn",
    city: "Hartford",
    state: "CT",
  },
  {
    station: "KTVW",
    associatedDma: "Phoenix (Prescott), AZ",
    affiliation: ["Univision"],
    website: "univision.com/local/phoenix-ktvw",
    city: "Phoenix",
    state: "AZ",
  },
  {
    station: "KUTH",
    associatedDma: "Salt Lake City, UT",
    affiliation: ["Univision"],
    website: "univision.com/local/salt-lake-city-kuth",
    city: "Provo",
    state: "UT",
  },
];
