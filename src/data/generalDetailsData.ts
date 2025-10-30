export interface SelectOption {
  value: string;
  label: string;
}

export interface SpotLengthOption {
  value: string;
  label: string;
}

// Advertiser options
export const advertiserOptions: SelectOption[] = [
  { value: 'Ford Motor Company', label: 'Ford Motor Company' },
  { value: 'Stellantis', label: 'Stellantis' },   
  { value: 'Toyota Motor Corp', label: 'Toyota Motor Corp' },
];

// Brands by advertiser
export const brandOptions: Record<string, SelectOption[]> = {
  'Ford Motor Company': [
    { value: 'ford-f150', label: 'Ford F-150' },
    { value: 'ford-mustang', label: 'Ford Mustang' },
    { value: 'ford-explorer', label: 'Ford Explorer' },
    { value: 'lincoln', label: 'Lincoln' },
  ],
  'Stellantis': [
    { value: 'jeep', label: 'Jeep' },
    { value: 'ram', label: 'Ram' },
    { value: 'dodge', label: 'Dodge' },
    { value: 'chrysler', label: 'Chrysler' },
    { value: 'fiat', label: 'Fiat' },
  ],
  'Toyota Motor Corp': [
    { value: 'toyota-camry', label: 'Toyota Camry' },
    { value: 'toyota-corolla', label: 'Toyota Corolla' },
    { value: 'toyota-prius', label: 'Toyota Prius' },
    { value: 'lexus', label: 'Lexus' },
    { value: 'scion', label: 'Scion' },
  ],
};

// "No Agency" option available for all advertisers
export const noAgencyOption: SelectOption = { value: 'No Agency', label: 'No Agency' };

// Agencies by advertiser
export const agencyOptions: Record<string, SelectOption[]> = {
  'Ford Motor Company': [
    noAgencyOption,
    { value: 'GROUPM / GLOBAL TEAM BLUE', label: 'GROUPM / GLOBAL TEAM BLUE' },
    { value: 'Wieden+Kennedy', label: 'Wieden+Kennedy' },
    { value: 'BBDO Detroit', label: 'BBDO Detroit' },
  ],
  'Stellantis': [
    noAgencyOption,
    { value: 'Publicis Groupe', label: 'Publicis Groupe' },
    { value: 'FCB Global', label: 'FCB Global' },
    { value: 'DDB Worldwide', label: 'DDB Worldwide' },
  ],
  'Toyota Motor Corp': [
    noAgencyOption,
    { value: 'Saatchi & Saatchi', label: 'Saatchi & Saatchi' },
    { value: 'Burrell Communications', label: 'Burrell Communications' },
    { value: 'Intertrend Communications', label: 'Intertrend Communications' },
  ],
};

// Spot length options by advertiser, brand and agency
export const spotLengthOptions: Record<string, Record<string, Record<string, SpotLengthOption[]>>> = {
  'Ford Motor Company': {
    'ford-f150': {
      'GROUPM / GLOBAL TEAM BLUE': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'Wieden+Kennedy': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'BBDO Detroit': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'ford-mustang': {
      'GROUPM / GLOBAL TEAM BLUE': [
        { value: '30', label: '30 sec' }
      ],
      'Wieden+Kennedy': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'BBDO Detroit': [
        { value: '60', label: '60 sec' }
      ],
      'No Agency': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ]
    },
    'ford-explorer': {
      'GROUPM / GLOBAL TEAM BLUE': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'Wieden+Kennedy': [
        { value: '30', label: '30 sec' }
      ],
      'BBDO Detroit': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'lincoln': {
      'GROUPM / GLOBAL TEAM BLUE': [
        { value: '60', label: '60 sec' }
      ],
      'Wieden+Kennedy': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'BBDO Detroit': [
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ]
    }
  },
  'Stellantis': {
    'jeep': {
      'Publicis Groupe': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'FCB Global': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'DDB Worldwide': [
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ]
    },
    'ram': {
      'Publicis Groupe': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'FCB Global': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'DDB Worldwide': [
        { value: '60', label: '60 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'dodge': {
      'Publicis Groupe': [
        { value: '15', label: '15 sec' }
      ],
      'FCB Global': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'DDB Worldwide': [
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'chrysler': {
      'Publicis Groupe': [
        { value: '30', label: '30 sec' }
      ],
      'FCB Global': [
        { value: '60', label: '60 sec' }
      ],
      'DDB Worldwide': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'fiat': {
      'Publicis Groupe': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'FCB Global': [
        { value: '30', label: '30 sec' }
      ],
      'DDB Worldwide': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'No Agency': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ]
    }
  },
  'Toyota Motor Corp': {
    'toyota-camry': {
      'Saatchi & Saatchi': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'Burrell Communications': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'Intertrend Communications': [
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'toyota-corolla': {
      'Saatchi & Saatchi': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'Burrell Communications': [
        { value: '30', label: '30 sec' }
      ],
      'Intertrend Communications': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'No Agency': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ]
    },
    'toyota-prius': {
      'Saatchi & Saatchi': [
        { value: '30', label: '30 sec' }
      ],
      'Burrell Communications': [
        { value: '60', label: '60 sec' }
      ],
      'Intertrend Communications': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' }
      ]
    },
    'lexus': {
      'Saatchi & Saatchi': [
        { value: '60', label: '60 sec' }
      ],
      'Burrell Communications': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ],
      'Intertrend Communications': [
        { value: '30', label: '30 sec' }
      ],
      'No Agency': [
        { value: '30', label: '30 sec' },
        { value: '60', label: '60 sec' }
      ]
    },
    'scion': {
      'Saatchi & Saatchi': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ],
      'Burrell Communications': [
        { value: '30', label: '30 sec' }
      ],
      'Intertrend Communications': [
        { value: '15', label: '15 sec' }
      ],
      'No Agency': [
        { value: '15', label: '15 sec' },
        { value: '30', label: '30 sec' }
      ]
    }
  }
};
