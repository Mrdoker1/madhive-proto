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

export const morgan_murphyStations: StationInfo[] = [
  {
    station: "KXLY-TV",
    associatedDma: "Spokane, WA",
    affiliation: ["ABC"],
    city: "Spokane",
    state: "WA",
  },
  {
    station: "KXMN-LD",
    associatedDma: "Spokane, WA",
    affiliation: ["MeTV"],
    city: "Spokane",
    state: "WA",
  },
  {
    station: "KAPP",
    associatedDma: "Yakima-Pasco-Richland-Kennewick, WA",
    affiliation: ["ABC"],
    city: "Yakima",
    state: "WA",
  },
  {
    station: "KVEW",
    associatedDma: "Yakima-Pasco-Richland-Kennewick, WA",
    affiliation: ["ABC"],
    city: "Kennewick",
    state: "WA",
  },
  {
    station: "WISC-TV",
    associatedDma: "Madison, WI",
    affiliation: ["CBS"],
    city: "Madison",
    state: "WI",
  },
  {
    station: "WKBT-DT",
    associatedDma: "La Crosse-Eau Claire, WI",
    affiliation: ["CBS", "MyNetworkTV"],
    city: "La Crosse",
    state: "WI",
  },
  {
    station: "KOAM-TV",
    associatedDma: "Joplin, MO-Pittsburg, KS",
    affiliation: ["CBS"],
    city: "Pittsburg",
    state: "KS",
  },
  {
    station: "KFJX",
    associatedDma: "Joplin, MO-Pittsburg, KS",
    affiliation: ["FOX", "The CW Plus"],
    city: "Pittsburg",
    state: "KS",
  },
  {
    station: "WBUP",
    associatedDma: "Marquette, MI",
    affiliation: ["ABC"],
    city: "Ishpeming",
    state: "MI",
  },
  {
    station: "WBKP",
    associatedDma: "Marquette, MI",
    affiliation: ["The CW Plus"],
    city: "Calumet",
    state: "MI",
  },
  {
    station: "WJMN-TV",
    associatedDma: "Marquette, MI",
    affiliation: ["ABC", "The CW Plus", "MyNetworkTV"],
    city: "Escanaba",
    state: "MI",
  },
  {
    station: "KAVU-TV",
    associatedDma: "Victoria, TX",
    affiliation: ["ABC"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KMOL-LD",
    associatedDma: "Victoria, TX",
    affiliation: ["NBC"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KXTS-LD",
    associatedDma: "Victoria, TX",
    affiliation: ["CBS"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KUNU-LD",
    associatedDma: "Victoria, TX",
    affiliation: ["Univision"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KVTX-LD",
    associatedDma: "Victoria, TX",
    affiliation: ["Telemundo"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KQZY-LD",
    associatedDma: "Victoria, TX",
    affiliation: ["Cozi TV"],
    city: "Victoria",
    state: "TX",
  },
  {
    station: "KVCT",
    associatedDma: "Victoria, TX",
    affiliation: ["FOX"],
    city: "Victoria",
    state: "TX",
  },
];
