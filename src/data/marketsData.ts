export interface MarketDetailData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  cpm: string;
  selected: boolean;
  marketSize: number; // размер аудитории для подстанции
}

export interface MarketData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  cpm: string;
  selected: boolean;
  broadcaster: string;
  details: MarketDetailData[];
  marketSize: number; // размер аудитории для основного рынка
}

export const marketsDatabase: Record<string, MarketData[]> = {
  ABC: [
    {
      id: 'abc-1',
      name: 'New York, NY (ABC)',
      percentage: 25,
      budget: 0,
      cpm: '$22.50',
      selected: false,
      broadcaster: 'ABC',
      marketSize: 8400000, // ~8.4M население NY metropolitan area
      details: [
        { id: 'abc-1-1', name: 'Good Morning America', percentage: 0, budget: 0, cpm: '$12.80', selected: false, marketSize: 2100000 },
        { id: 'abc-1-2', name: 'World News Tonight', percentage: 0, budget: 0, cpm: '$12.20', selected: false, marketSize: 2300000 },
        { id: 'abc-1-3', name: 'The View', percentage: 0, budget: 0, cpm: '$13.10', selected: false, marketSize: 1800000 },
        { id: 'abc-1-4', name: 'General Hospital', percentage: 0, budget: 0, cpm: '$12.90', selected: false, marketSize: 1200000 }
      ]
    },
    {
      id: 'abc-2',
      name: 'Los Angeles, CA (ABC)',
      percentage: 30,
      budget: 0,
      cpm: '$21.80',
      selected: false,
      broadcaster: 'ABC',
      marketSize: 13200000, // ~13.2M население LA metropolitan area
      details: [
        { id: 'abc-2-1', name: 'Good Morning America', percentage: 0, budget: 0, cpm: '$11.90', selected: false, marketSize: 4400000 },
        { id: 'abc-2-2', name: 'The Bachelor', percentage: 0, budget: 0, cpm: '$11.70', selected: false, marketSize: 4800000 },
        { id: 'abc-2-3', name: 'Dancing with the Stars', percentage: 0, budget: 0, cpm: '$12.00', selected: false, marketSize: 4000000 }
      ]
    },
    {
      id: 'abc-3',
      name: 'Chicago, IL (ABC)',
      percentage: 20,
      budget: 0,
      cpm: '$23.20',
      selected: false,
      broadcaster: 'ABC',
      marketSize: 9600000, // ~9.6M население Chicago metropolitan area
      details: [
        { id: 'abc-3-1', name: 'Good Morning America Chicago', percentage: 0, budget: 0, cpm: '$11.80', selected: false, marketSize: 3200000 },
        { id: 'abc-3-2', name: 'ABC 7 Chicago News', percentage: 0, budget: 0, cpm: '$12.50', selected: false, marketSize: 2800000 },
        { id: 'abc-3-3', name: 'Jimmy Kimmel Live', percentage: 0, budget: 0, cpm: '$13.20', selected: false, marketSize: 2400000 }
      ]
    },
    {
      id: 'abc-4',
      name: 'Dallas-Ft. Worth, TX (ABC)',
      percentage: 25,
      budget: 0,
      cpm: '$22.90',
      selected: false,
      broadcaster: 'ABC',
      marketSize: 7600000, // ~7.6M население Dallas-Fort Worth metropolitan area
      details: [
        { id: 'abc-4-1', name: 'Good Morning America Dallas', percentage: 0, budget: 0, cpm: '$11.60', selected: false, marketSize: 2500000 },
        { id: 'abc-4-2', name: 'WFAA 8 News', percentage: 0, budget: 0, cpm: '$12.40', selected: false, marketSize: 2200000 },
        { id: 'abc-4-3', name: 'Monday Night Football', percentage: 0, budget: 0, cpm: '$14.50', selected: false, marketSize: 1800000 }
      ]
    }
  ],
  CBS: [
    {
      id: 'cbs-1',
      name: 'New York, NY (CBS)',
      percentage: 28,
      budget: 0,
      cpm: '$23.10',
      selected: false,
      broadcaster: 'CBS',
      marketSize: 8400000,
      details: [
        { id: 'cbs-1-1', name: 'CBS Evening News', percentage: 31, budget: 0, cpm: '$12.00', selected: false, marketSize: 2600000 },
        { id: 'cbs-1-2', name: 'NCIS', percentage: 29, budget: 0, cpm: '$12.00', selected: false, marketSize: 2400000 },
        { id: 'cbs-1-3', name: 'The Price is Right', percentage: 26, budget: 0, cpm: '$12.00', selected: false, marketSize: 2200000 }
      ]
    },
    {
      id: 'cbs-2',
      name: 'Los Angeles, CA (CBS)',
      percentage: 32,
      budget: 0,
      cpm: '$22.40',
      selected: false,
      broadcaster: 'CBS',
      marketSize: 13200000,
      details: [
        { id: 'cbs-2-1', name: 'Young and the Restless', percentage: 33, budget: 0, cpm: '$12.00', selected: false, marketSize: 4400000 },
        { id: 'cbs-2-2', name: 'Survivor', percentage: 35, budget: 0, cpm: '$12.00', selected: false, marketSize: 4600000 },
        { id: 'cbs-2-3', name: 'Blue Bloods', percentage: 28, budget: 0, cpm: '$12.00', selected: false, marketSize: 3700000 }
      ]
    },
    {
      id: 'cbs-3',
      name: 'Chicago, IL (CBS)',
      percentage: 22,
      budget: 0,
      cpm: '$23.80',
      selected: false,
      broadcaster: 'CBS',
      marketSize: 9600000,
      details: [
        { id: 'cbs-3-1', name: 'Chicago Fire', percentage: 24, budget: 0, cpm: '$12.00', selected: false, marketSize: 2300000 },
        { id: 'cbs-3-2', name: 'CSI: Vegas', percentage: 21, budget: 0, cpm: '$12.00', selected: false, marketSize: 2000000 }
      ]
    },
    {
      id: 'cbs-4',
      name: 'Houston, TX (CBS)',
      percentage: 18,
      budget: 0,
      cpm: '$24.20',
      selected: false,
      broadcaster: 'CBS',
      marketSize: 7100000,
      details: [
        { id: 'cbs-4-1', name: 'Local News at 6', percentage: 19, budget: 0, cpm: '$12.00', selected: false, marketSize: 1350000 },
        { id: 'cbs-4-2', name: 'Sports Update', percentage: 17, budget: 0, cpm: '$12.00', selected: false, marketSize: 1200000 }
      ]
    }
  ],
  CW: [
    {
      id: 'cw-1',
      name: 'New York, NY (CW)',
      percentage: 15,
      budget: 0,
      cpm: '$18.50',
      selected: false,
      broadcaster: 'CW',
      marketSize: 8400000,
      details: [
        { id: 'cw-1-1', name: 'Riverdale', percentage: 16, budget: 0, cpm: '$12.00', selected: false, marketSize: 1300000 },
        { id: 'cw-1-2', name: 'The Flash', percentage: 14, budget: 0, cpm: '$12.00', selected: false, marketSize: 1200000 }
      ]
    },
    {
      id: 'cw-2',
      name: 'Los Angeles, CA (CW)',
      percentage: 18,
      budget: 0,
      cpm: '$18.90',
      selected: false,
      broadcaster: 'CW',
      marketSize: 13200000,
      details: [
        { id: 'cw-2-1', name: 'Superman & Lois', percentage: 19, budget: 0, cpm: '$12.00', selected: false, marketSize: 2500000 },
        { id: 'cw-2-2', name: 'All American', percentage: 17, budget: 0, cpm: '$12.00', selected: false, marketSize: 2200000 }
      ]
    },
    {
      id: 'cw-3',
      name: 'Atlanta, GA (CW)',
      percentage: 20,
      budget: 0,
      cpm: '$19.20',
      selected: false,
      broadcaster: 'CW',
      marketSize: 6100000,
      details: [
        { id: 'cw-3-1', name: 'Walker', percentage: 21, budget: 0, cpm: '$12.00', selected: false, marketSize: 1300000 },
        { id: 'cw-3-2', name: 'Local Programming', percentage: 19, budget: 0, cpm: '$12.00', selected: false, marketSize: 1200000 }
      ]
    }
  ],
  FOX: [
    {
      id: 'fox-1',
      name: 'New York, NY (FOX)',
      percentage: 24,
      budget: 0,
      cpm: '$22.20',
      selected: false,
      broadcaster: 'FOX',
      marketSize: 8400000,
      details: [
        { id: 'fox-1-1', name: 'FOX News at 6', percentage: 25, budget: 0, cpm: '$12.00', selected: false, marketSize: 2000000 },
        { id: 'fox-1-2', name: 'The Simpsons', percentage: 0, budget: 0, cpm: '$11.80', selected: false, marketSize: 1800000 },
        { id: 'fox-1-3', name: 'NFL on FOX', percentage: 0, budget: 0, cpm: '$15.20', selected: false, marketSize: 2200000 }
      ]
    },
    {
      id: 'fox-2',
      name: 'Los Angeles, CA (FOX)',
      percentage: 26,
      budget: 0,
      cpm: '$21.90',
      selected: false,
      broadcaster: 'FOX',
      marketSize: 13200000,
      details: [
        { id: 'fox-2-1', name: 'The Simpsons', percentage: 27, budget: 0, cpm: '$12.00', selected: false, marketSize: 3600000 },
        { id: 'fox-2-2', name: 'FOX 11 News', percentage: 0, budget: 0, cpm: '$11.50', selected: false, marketSize: 3200000 },
        { id: 'fox-2-3', name: 'Family Guy', percentage: 0, budget: 0, cpm: '$12.80', selected: false, marketSize: 2800000 }
      ]
    },
    {
      id: 'fox-3',
      name: 'Chicago, IL (FOX)',
      percentage: 22,
      budget: 0,
      cpm: '$22.80',
      selected: false,
      broadcaster: 'FOX',
      marketSize: 9600000,
      details: [
        { id: 'fox-3-1', name: 'Chicago Bears Game', percentage: 23, budget: 0, cpm: '$12.00', selected: false, marketSize: 2200000 },
        { id: 'fox-3-2', name: 'FOX 32 News', percentage: 0, budget: 0, cpm: '$11.90', selected: false, marketSize: 2000000 },
        { id: 'fox-3-3', name: 'Hell\'s Kitchen', percentage: 0, budget: 0, cpm: '$13.50', selected: false, marketSize: 1900000 }
      ]
    },
    {
      id: 'fox-4',
      name: 'Philadelphia, PA (FOX)',
      percentage: 28,
      budget: 0,
      cpm: '$23.50',
      selected: false,
      broadcaster: 'FOX',
      marketSize: 6200000,
      details: [
        { id: 'fox-4-1', name: 'Local Sports', percentage: 29, budget: 0, cpm: '$12.00', selected: false, marketSize: 1800000 },
        { id: 'fox-4-2', name: 'FOX 29 News', percentage: 0, budget: 0, cpm: '$11.70', selected: false, marketSize: 1600000 },
        { id: 'fox-4-3', name: 'The Masked Singer', percentage: 0, budget: 0, cpm: '$14.20', selected: false, marketSize: 1400000 }
      ]
    }
  ],
  'Graham Media': [
    {
      id: 'graham-1',
      name: 'Detroit, MI (Graham)',
      percentage: 35,
      budget: 0,
      cpm: '$20.20',
      selected: false,
      broadcaster: 'Graham Media',
      marketSize: 4300000,
      details: [
        { id: 'graham-1-1', name: 'WDIV Local 4 News', percentage: 0, budget: 0, cpm: '$10.80', selected: false, marketSize: 1400000 },
        { id: 'graham-1-2', name: 'Morning Show Detroit', percentage: 0, budget: 0, cpm: '$11.20', selected: false, marketSize: 1200000 },
        { id: 'graham-1-3', name: 'Detroit Lions Coverage', percentage: 0, budget: 0, cpm: '$13.40', selected: false, marketSize: 1100000 }
      ]
    },
    {
      id: 'graham-2',
      name: 'Orlando, FL (Graham)',
      percentage: 40,
      budget: 0,
      cpm: '$19.80',
      selected: false,
      broadcaster: 'Graham Media',
      marketSize: 2600000,
      details: [
        { id: 'graham-2-1', name: 'News 6 Orlando', percentage: 0, budget: 0, cpm: '$10.50', selected: false, marketSize: 900000 },
        { id: 'graham-2-2', name: 'Good Day Orlando', percentage: 0, budget: 0, cpm: '$11.10', selected: false, marketSize: 800000 },
        { id: 'graham-2-3', name: 'Local Weather Update', percentage: 0, budget: 0, cpm: '$9.80', selected: false, marketSize: 700000 }
      ]
    },
    {
      id: 'graham-3',
      name: 'San Antonio, TX (Graham)',
      percentage: 25,
      budget: 0,
      cpm: '$21.50',
      selected: false,
      broadcaster: 'Graham Media',
      marketSize: 2500000,
      details: [
        { id: 'graham-3-1', name: 'KSAT 12 News', percentage: 0, budget: 0, cpm: '$10.20', selected: false, marketSize: 850000 },
        { id: 'graham-3-2', name: 'Good Morning San Antonio', percentage: 0, budget: 0, cpm: '$10.80', selected: false, marketSize: 750000 },
        { id: 'graham-3-3', name: 'Spurs Game Coverage', percentage: 0, budget: 0, cpm: '$12.60', selected: false, marketSize: 650000 }
      ]
    }
  ],
  Gray: [
    {
      id: 'gray-1',
      name: 'Atlanta, GA (Gray)',
      percentage: 30,
      budget: 0,
      cpm: '$19.90',
      selected: false,
      broadcaster: 'Gray',
      marketSize: 6100000,
      details: [
        { id: 'gray-1-1', name: 'WSB-TV Channel 2', percentage: 0, budget: 0, cpm: '$11.40', selected: false, marketSize: 2000000 },
        { id: 'gray-1-2', name: 'Good Day Atlanta', percentage: 0, budget: 0, cpm: '$10.90', selected: false, marketSize: 1800000 },
        { id: 'gray-1-3', name: 'Atlanta Hawks Coverage', percentage: 0, budget: 0, cpm: '$13.20', selected: false, marketSize: 1600000 }
      ]
    },
    {
      id: 'gray-2',
      name: 'Birmingham, AL (Gray)',
      percentage: 45,
      budget: 0,
      cpm: '$18.70',
      selected: false,
      broadcaster: 'Gray',
      marketSize: 1200000,
      details: [
        { id: 'gray-2-1', name: 'WBRC FOX6 News', percentage: 0, budget: 0, cpm: '$9.20', selected: false, marketSize: 400000 },
        { id: 'gray-2-2', name: 'Good Day Alabama', percentage: 0, budget: 0, cpm: '$8.90', selected: false, marketSize: 350000 },
        { id: 'gray-2-3', name: 'Alabama Football', percentage: 0, budget: 0, cpm: '$11.80', selected: false, marketSize: 320000 }
      ]
    },
    {
      id: 'gray-3',
      name: 'Cleveland, OH (Gray)',
      percentage: 25,
      budget: 0,
      cpm: '$20.50',
      selected: false,
      broadcaster: 'Gray',
      marketSize: 2100000,
      details: [
        { id: 'gray-3-1', name: 'Channel 3 News', percentage: 0, budget: 0, cpm: '$10.60', selected: false, marketSize: 700000 },
        { id: 'gray-3-2', name: 'Good Morning Cleveland', percentage: 0, budget: 0, cpm: '$10.20', selected: false, marketSize: 650000 },
        { id: 'gray-3-3', name: 'Browns Game Day', percentage: 0, budget: 0, cpm: '$12.40', selected: false, marketSize: 600000 }
      ]
    }
  ],
  Hearst: [
    {
      id: 'hearst-1',
      name: 'Boston, MA (Hearst)',
      percentage: 32,
      budget: 0,
      cpm: '$21.20',
      selected: false,
      broadcaster: 'Hearst',
      marketSize: 4900000,
      details: [
        { id: 'hearst-1-1', name: 'WCVB Channel 5', percentage: 0, budget: 0, cpm: '$12.80', selected: false, marketSize: 1600000 },
        { id: 'hearst-1-2', name: 'Good Morning Boston', percentage: 0, budget: 0, cpm: '$12.20', selected: false, marketSize: 1500000 },
        { id: 'hearst-1-3', name: 'Celtics Game Night', percentage: 0, budget: 0, cpm: '$15.40', selected: false, marketSize: 1400000 }
      ]
    },
    {
      id: 'hearst-2',
      name: 'Seattle, WA (Hearst)',
      percentage: 28,
      budget: 0,
      cpm: '$20.80',
      selected: false,
      broadcaster: 'Hearst',
      marketSize: 4000000,
      details: [
        { id: 'hearst-2-1', name: 'KING 5 News', percentage: 0, budget: 0, cpm: '$11.90', selected: false, marketSize: 1300000 },
        { id: 'hearst-2-2', name: 'New Day Northwest', percentage: 0, budget: 0, cpm: '$11.40', selected: false, marketSize: 1200000 },
        { id: 'hearst-2-3', name: 'Seahawks Coverage', percentage: 0, budget: 0, cpm: '$14.20', selected: false, marketSize: 1100000 }
      ]
    },
    {
      id: 'hearst-3',
      name: 'Pittsburgh, PA (Hearst)',
      percentage: 40,
      budget: 0,
      cpm: '$19.60',
      selected: false,
      broadcaster: 'Hearst',
      marketSize: 2400000,
      details: [
        { id: 'hearst-3-1', name: 'WTAE Channel 4', percentage: 0, budget: 0, cpm: '$10.80', selected: false, marketSize: 800000 },
        { id: 'hearst-3-2', name: 'Pittsburgh Today Live', percentage: 0, budget: 0, cpm: '$10.20', selected: false, marketSize: 750000 },
        { id: 'hearst-3-3', name: 'Steelers Game Day', percentage: 0, budget: 0, cpm: '$13.60', selected: false, marketSize: 700000 }
      ]
    }
  ],
  NBCU: [
    {
      id: 'nbcu-1',
      name: 'New York, NY (NBC)',
      percentage: 26,
      budget: 0,
      cpm: '$23.40',
      selected: false,
      broadcaster: 'NBCU',
      marketSize: 8400000,
      details: [
        { id: 'nbcu-1-1', name: 'NBC Nightly News', percentage: 0, budget: 0, cpm: '$13.80', selected: false, marketSize: 2800000 },
        { id: 'nbcu-1-2', name: 'Saturday Night Live', percentage: 0, budget: 0, cpm: '$16.20', selected: false, marketSize: 2400000 },
        { id: 'nbcu-1-3', name: 'The Tonight Show', percentage: 0, budget: 0, cpm: '$14.90', selected: false, marketSize: 2200000 }
      ]
    },
    {
      id: 'nbcu-2',
      name: 'Los Angeles, CA (NBC)',
      percentage: 29,
      budget: 0,
      cpm: '$22.70',
      selected: false,
      broadcaster: 'NBCU',
      marketSize: 13200000,
      details: [
        { id: 'nbcu-2-1', name: 'Today Show LA', percentage: 0, budget: 0, cpm: '$13.20', selected: false, marketSize: 4400000 },
        { id: 'nbcu-2-2', name: 'NBC LA News', percentage: 0, budget: 0, cpm: '$12.80', selected: false, marketSize: 4200000 },
        { id: 'nbcu-2-3', name: 'Sunday Night Football', percentage: 0, budget: 0, cpm: '$18.50', selected: false, marketSize: 3800000 }
      ]
    },
    {
      id: 'nbcu-3',
      name: 'Chicago, IL (NBC)',
      percentage: 24,
      budget: 0,
      cpm: '$23.90',
      selected: false,
      broadcaster: 'NBCU',
      marketSize: 9600000,
      details: [
        { id: 'nbcu-3-1', name: 'NBC 5 Chicago', percentage: 0, budget: 0, cpm: '$13.40', selected: false, marketSize: 3200000 },
        { id: 'nbcu-3-2', name: 'Today in Chicago', percentage: 0, budget: 0, cpm: '$12.90', selected: false, marketSize: 3000000 },
        { id: 'nbcu-3-3', name: 'Chicago Fire NBC', percentage: 0, budget: 0, cpm: '$15.80', selected: false, marketSize: 2800000 }
      ]
    },
    {
      id: 'nbcu-4',
      name: 'Miami, FL (NBC)',
      percentage: 21,
      budget: 0,
      cpm: '$24.60',
      selected: false,
      broadcaster: 'NBCU',
      marketSize: 6200000,
      details: [
        { id: 'nbcu-4-1', name: 'NBC 6 South Florida', percentage: 0, budget: 0, cpm: '$12.60', selected: false, marketSize: 2000000 },
        { id: 'nbcu-4-2', name: 'Today in South Florida', percentage: 0, budget: 0, cpm: '$12.20', selected: false, marketSize: 1900000 },
        { id: 'nbcu-4-3', name: 'Miami Heat Coverage', percentage: 0, budget: 0, cpm: '$16.40', selected: false, marketSize: 1800000 }
      ]
    }
  ],
  'NBCU Telemundo': [
    {
      id: 'telemundo-1',
      name: 'Miami, FL (Telemundo)',
      percentage: 50,
      budget: 0,
      cpm: '$17.20',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      marketSize: 6200000,
      details: [
        { id: 'telemundo-1-1', name: 'Noticiero Telemundo', percentage: 0, budget: 0, cpm: '$8.40', selected: false, marketSize: 2100000 },
        { id: 'telemundo-1-2', name: 'Un Nuevo Día Miami', percentage: 0, budget: 0, cpm: '$7.80', selected: false, marketSize: 1900000 },
        { id: 'telemundo-1-3', name: 'Fútbol en Telemundo', percentage: 0, budget: 0, cpm: '$11.60', selected: false, marketSize: 1800000 }
      ]
    },
    {
      id: 'telemundo-2',
      name: 'Los Angeles, CA (Telemundo)',
      percentage: 35,
      budget: 0,
      cpm: '$18.40',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      marketSize: 13200000,
      details: [
        { id: 'telemundo-2-1', name: 'Noticias Telemundo 52', percentage: 0, budget: 0, cpm: '$9.20', selected: false, marketSize: 4400000 },
        { id: 'telemundo-2-2', name: 'Buenos Días LA', percentage: 0, budget: 0, cpm: '$8.80', selected: false, marketSize: 4200000 },
        { id: 'telemundo-2-3', name: 'La Liga en Telemundo', percentage: 0, budget: 0, cpm: '$12.40', selected: false, marketSize: 3800000 }
      ]
    },
    {
      id: 'telemundo-3',
      name: 'New York, NY (Telemundo)',
      percentage: 15,
      budget: 0,
      cpm: '$19.80',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      marketSize: 8400000,
      details: [
        { id: 'telemundo-3-1', name: 'Noticias Telemundo 47', percentage: 0, budget: 0, cpm: '$10.40', selected: false, marketSize: 2800000 },
        { id: 'telemundo-3-2', name: 'Un Nuevo Día NY', percentage: 0, budget: 0, cpm: '$9.90', selected: false, marketSize: 2600000 },
        { id: 'telemundo-3-3', name: 'Deportes Telemundo', percentage: 0, budget: 0, cpm: '$13.20', selected: false, marketSize: 2400000 }
      ]
    }
  ]
};
