// Mock data for Search channel keywords

// Categories for keyword generation
export const categoryOptions = [
  { value: 'SUVs', label: 'SUVs' },
  { value: 'Trucks', label: 'Trucks' },
  { value: 'Offroad Vehicles', label: 'Offroad Vehicles' },
  { value: 'Hybrid Vehicles', label: 'Hybrid Vehicles' },
  { value: 'Electric Vehicles', label: 'Electric Vehicles' },
  { value: 'Sedans', label: 'Sedans' },
  { value: 'Sports Cars', label: 'Sports Cars' },
];

// Data sets for different advertisers
export const keywordsByAdvertiser: Record<string, {
  currentKeywords: string[];
  generatedKeywords: string[];
  defaultCategory: string;
}> = {
  'Ford Motor Company': {
    currentKeywords: [
      'Ford F-150',
      'new Ford trucks',
      'Ford Mustang Mach-E',
      'Ford dealership near me',
      'Ford Explorer lease',
      'Ford service center',
      'Ford Bronco Sport',
      'Ford electric vehicles',
      'Ford financing offers',
    ],
    generatedKeywords: [
      'Ford Explorer for sale',
      'buy Ford Escape',
      'Ford Bronco price',
      'family SUV Ford',
      'Ford Expedition MAX',
      'hybrid SUV Ford',
      'Ford Edge deals',
      'best Ford SUV',
    ],
    defaultCategory: 'SUVs'
  },
  'Stellantis': {
    currentKeywords: [
      'Jeep Wrangler',
      'Jeep Grand Cherokee L',
      '4x4 off-road vehicles',
      'Jeep dealership',
      'Jeep lease deals',
      'buy a new Jeep',
      'Jeep 4xe hybrid',
      'Jeep Gladiator price',
      'Jeep Compass review',
    ],
    generatedKeywords: [
      'Jeep Wrangler Rubicon',
      'Jeep Trailhawk models',
      'Custom Jeep parts',
      'Jeep adventure',
      'off-road SUV',
      'Rock crawling Jeep',
      'Jeep Gladiator Mojave',
      'best 4x4 SUV',
    ],
    defaultCategory: 'Offroad Vehicles'
  },
  'Toyota Motor Corp': {
    currentKeywords: [
      'Toyota Camry',
      'Toyota RAV4 Hybrid',
      'local Toyota dealer',
      'Toyota Tacoma TRD',
      'Toyota Sienna minivan',
      'Toyota certified pre-owned',
      'Toyota financing',
      'Reliable cars Toyota',
      'Toyota Highlander',
    ],
    generatedKeywords: [
      'Toyota Prius prime',
      'RAV4 hybrid for sale',
      'Toyota Corolla hybrid',
      'Highlander hybrid price',
      'best hybrid cars',
      'Toyota Venza hybrid',
      'Toyota hybrid SUV',
      'Camry hybrid lease',
    ],
    defaultCategory: 'Hybrid Vehicles'
  }
};

// Default fallback data
export const keyWordsData = [
  { value: 'Ford F-150', label: 'Ford F-150' },
  { value: 'new Ford trucks', label: 'new Ford trucks' },
  { value: 'Ford dealership', label: 'Ford dealership' },
  { value: 'Ford Mustang Mach-E', label: 'Ford Mustang Mach-E' },
  { value: 'Ford Explorer', label: 'Ford Explorer' },
  { value: 'Ford Bronco Sport', label: 'Ford Bronco Sport' },
];

export const selectedKeyWordsMock = keywordsByAdvertiser['Ford Motor Company'].currentKeywords;
export const generatedKeyWordsMock = keywordsByAdvertiser['Ford Motor Company'].generatedKeywords;

