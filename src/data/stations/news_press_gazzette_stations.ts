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

export const news_press_gazzetteStations: StationInfo[] = [
  {
    station: "KION-TV",
    associatedDma: "Monterey-Salinas, CA",
    affiliation: ["CBS"],
    website: "kion546.com",
    city: "Monterey",
    state: "CA",
  },
  {
    station: "KESQ-TV",
    associatedDma: "Palm Springs, CA",
    affiliation: ["ABC"],
    website: "kesq.com",
    city: "Palm Springs",
    state: "CA",
  },
  {
    station: "KEYT-TV",
    associatedDma: "Santa Barbara-Santa Maria-San Luis Obispo, CA",
    affiliation: ["ABC"],
    website: "keyt.com",
    city: "Santa Barbara",
    state: "CA",
  },
  {
    station: "KRDO-TV",
    associatedDma: "Colorado Springs-Pueblo, CO",
    affiliation: ["ABC"],
    website: "krdo.com",
    city: "Colorado Springs",
    state: "CO",
  },
  {
    station: "KIFI-TV",
    associatedDma: "Idaho Falls-Pocatello (Jackson, WY), ID-WY",
    affiliation: ["ABC", "CBS", "The CW", "Telemundo"],
    website: "localnews8.com",
    city: "Idaho Falls",
    state: "ID",
  },
  {
    station: "KMIZ-TV",
    associatedDma: "Columbia-Jefferson City, MO",
    affiliation: ["ABC"],
    website: "abc17news.com",
    city: "Columbia",
    state: "MO",
  },
  {
    station: "KTVZ",
    associatedDma: "Bend, OR",
    affiliation: ["NBC", "The CW", "Fox"],
    website: "ktvz.com",
    city: "Bend",
    state: "OR",
  },
  {
    station: "KVIA-TV",
    associatedDma: "El Paso (Las Cruces), TX-NM",
    affiliation: ["ABC"],
    website: "kvia.com",
    city: "El Paso",
    state: "TX",
  },
];
