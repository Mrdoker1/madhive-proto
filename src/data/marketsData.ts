export interface MarketDetailData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  impression: string;
  cpm: string;
  selected: boolean;
}

export interface MarketData {
  id: string;
  name: string;
  percentage: number;
  budget: number;
  impression: string;
  cpm: string;
  selected: boolean;
  broadcaster: string;
  details: MarketDetailData[];
}

export const marketsDatabase: Record<string, MarketData[]> = {
  ABC: [
    {
      id: 'abc-1',
      name: 'New York, NY (ABC)',
      percentage: 25,
      budget: 0,
      impression: '2.5M',
      cpm: '$12.50',
      selected: false,
      broadcaster: 'ABC',
      details: [
        { id: 'abc-1-1', name: 'Good Morning America', percentage: 0, budget: 0, impression: '800K', cpm: '$12.80', selected: false },
        { id: 'abc-1-2', name: 'World News Tonight', percentage: 0, budget: 0, impression: '900K', cpm: '$12.20', selected: false },
        { id: 'abc-1-3', name: 'The View', percentage: 0, budget: 0, impression: '600K', cpm: '$13.10', selected: false },
        { id: 'abc-1-4', name: 'General Hospital', percentage: 0, budget: 0, impression: '450K', cpm: '$12.90', selected: false }
      ]
    },
    {
      id: 'abc-2',
      name: 'Los Angeles, CA (ABC)',
      percentage: 30,
      budget: 0,
      impression: '3.0M',
      cpm: '$11.80',
      selected: false,
      broadcaster: 'ABC',
      details: [
        { id: 'abc-2-1', name: 'Good Morning America', percentage: 0, budget: 0, impression: '850K', cpm: '$11.90', selected: false },
        { id: 'abc-2-2', name: 'The Bachelor', percentage: 0, budget: 0, impression: '950K', cpm: '$11.70', selected: false },
        { id: 'abc-2-3', name: 'Dancing with the Stars', percentage: 0, budget: 0, impression: '750K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'abc-3',
      name: 'Chicago, IL (ABC)',
      percentage: 20,
      budget: 0,
      impression: '2.0M',
      cpm: '$13.20',
      selected: false,
      broadcaster: 'ABC',
      details: []
    },
    {
      id: 'abc-4',
      name: 'Dallas-Ft. Worth, TX (ABC)',
      percentage: 25,
      budget: 0,
      impression: '2.2M',
      cpm: '$12.90',
      selected: false,
      broadcaster: 'ABC',
      details: []
    }
  ],
  CBS: [
    {
      id: 'cbs-1',
      name: 'New York, NY (CBS)',
      percentage: 28,
      budget: 0,
      impression: '2.8M',
      cpm: '$13.10',
      selected: false,
      broadcaster: 'CBS',
      details: [
        { id: 'cbs-1-1', name: 'CBS Evening News', percentage: 31, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-1-2', name: 'NCIS', percentage: 29, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-1-3', name: 'The Price is Right', percentage: 26, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'cbs-2',
      name: 'Los Angeles, CA (CBS)',
      percentage: 32,
      budget: 0,
      impression: '3.2M',
      cpm: '$12.40',
      selected: false,
      broadcaster: 'CBS',
      details: [
        { id: 'cbs-2-1', name: 'Young and the Restless', percentage: 33, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-2-2', name: 'Survivor', percentage: 35, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-2-3', name: 'Blue Bloods', percentage: 28, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'cbs-3',
      name: 'Chicago, IL (CBS)',
      percentage: 22,
      budget: 0,
      impression: '2.1M',
      cpm: '$13.80',
      selected: false,
      broadcaster: 'CBS',
      details: [
        { id: 'cbs-3-1', name: 'Chicago Fire', percentage: 24, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-3-2', name: 'CSI: Vegas', percentage: 21, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'cbs-4',
      name: 'Houston, TX (CBS)',
      percentage: 18,
      budget: 0,
      impression: '1.8M',
      cpm: '$14.20',
      selected: false,
      broadcaster: 'CBS',
      details: [
        { id: 'cbs-4-1', name: 'Local News at 6', percentage: 19, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cbs-4-2', name: 'Sports Update', percentage: 17, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    }
  ],
  CW: [
    {
      id: 'cw-1',
      name: 'New York, NY (CW)',
      percentage: 15,
      budget: 0,
      impression: '1.2M',
      cpm: '$8.50',
      selected: false,
      broadcaster: 'CW',
      details: [
        { id: 'cw-1-1', name: 'Riverdale', percentage: 16, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cw-1-2', name: 'The Flash', percentage: 14, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'cw-2',
      name: 'Los Angeles, CA (CW)',
      percentage: 18,
      budget: 0,
      impression: '1.4M',
      cpm: '$8.90',
      selected: false,
      broadcaster: 'CW',
      details: [
        { id: 'cw-2-1', name: 'Superman & Lois', percentage: 19, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cw-2-2', name: 'All American', percentage: 17, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    },
    {
      id: 'cw-3',
      name: 'Atlanta, GA (CW)',
      percentage: 20,
      budget: 0,
      impression: '1.1M',
      cpm: '$9.20',
      selected: false,
      broadcaster: 'CW',
      details: [
        { id: 'cw-3-1', name: 'Walker', percentage: 21, budget: 0, impression: '500K', cpm: '$12.00', selected: false },
        { id: 'cw-3-2', name: 'Local Programming', percentage: 19, budget: 0, impression: '500K', cpm: '$12.00', selected: false }
      ]
    }
  ],
  FOX: [
    {
      id: 'fox-1',
      name: 'New York, NY (FOX)',
      percentage: 24,
      budget: 0,
      impression: '2.4M',
      cpm: '$12.20',
      selected: false,
      broadcaster: 'FOX',
      details: [{ id: 'fox-1-1', name: 'FOX News at 6', percentage: 25, budget: 0, impression: '500K', cpm: '$12.00', selected: false }]
    },
    {
      id: 'fox-2',
      name: 'Los Angeles, CA (FOX)',
      percentage: 26,
      budget: 0,
      impression: '2.6M',
      cpm: '$11.90',
      selected: false,
      broadcaster: 'FOX',
      details: [{ id: 'fox-2-1', name: 'The Simpsons', percentage: 27, budget: 0, impression: '500K', cpm: '$12.00', selected: false }]
    },
    {
      id: 'fox-3',
      name: 'Chicago, IL (FOX)',
      percentage: 22,
      budget: 0,
      impression: '2.2M',
      cpm: '$12.80',
      selected: false,
      broadcaster: 'FOX',
      details: [{ id: 'fox-3-1', name: 'Chicago Bears Game', percentage: 23, budget: 0, impression: '500K', cpm: '$12.00', selected: false }]
    },
    {
      id: 'fox-4',
      name: 'Philadelphia, PA (FOX)',
      percentage: 28,
      budget: 0,
      impression: '2.0M',
      cpm: '$13.50',
      selected: false,
      broadcaster: 'FOX',
      details: [{ id: 'fox-4-1', name: 'Local Sports', percentage: 29, budget: 0, impression: '500K', cpm: '$12.00', selected: false }]
    }
  ],
  'Graham Media': [
    {
      id: 'graham-1',
      name: 'Detroit, MI (Graham)',
      percentage: 35,
      budget: 0,
      impression: '1.5M',
      cpm: '$10.20',
      selected: false,
      broadcaster: 'Graham Media',
      details: []
    },
    {
      id: 'graham-2',
      name: 'Orlando, FL (Graham)',
      percentage: 40,
      budget: 0,
      impression: '1.2M',
      cpm: '$9.80',
      selected: false,
      broadcaster: 'Graham Media',
      details: []
    },
    {
      id: 'graham-3',
      name: 'San Antonio, TX (Graham)',
      percentage: 25,
      budget: 0,
      impression: '1.0M',
      cpm: '$11.50',
      selected: false,
      broadcaster: 'Graham Media',
      details: []
    }
  ],
  Gray: [
    {
      id: 'gray-1',
      name: 'Atlanta, GA (Gray)',
      percentage: 30,
      budget: 0,
      impression: '1.3M',
      cpm: '$9.90',
      selected: false,
      broadcaster: 'Gray',
      details: []
    },
    {
      id: 'gray-2',
      name: 'Birmingham, AL (Gray)',
      percentage: 45,
      budget: 0,
      impression: '0.8M',
      cpm: '$8.70',
      selected: false,
      broadcaster: 'Gray',
      details: []
    },
    {
      id: 'gray-3',
      name: 'Cleveland, OH (Gray)',
      percentage: 25,
      budget: 0,
      impression: '1.1M',
      cpm: '$10.50',
      selected: false,
      broadcaster: 'Gray',
      details: []
    }
  ],
  Hearst: [
    {
      id: 'hearst-1',
      name: 'Boston, MA (Hearst)',
      percentage: 32,
      budget: 0,
      impression: '1.4M',
      cpm: '$11.20',
      selected: false,
      broadcaster: 'Hearst',
      details: []
    },
    {
      id: 'hearst-2',
      name: 'Seattle, WA (Hearst)',
      percentage: 28,
      budget: 0,
      impression: '1.2M',
      cpm: '$10.80',
      selected: false,
      broadcaster: 'Hearst',
      details: []
    },
    {
      id: 'hearst-3',
      name: 'Pittsburgh, PA (Hearst)',
      percentage: 40,
      budget: 0,
      impression: '0.9M',
      cpm: '$9.60',
      selected: false,
      broadcaster: 'Hearst',
      details: []
    }
  ],
  NBCU: [
    {
      id: 'nbcu-1',
      name: 'New York, NY (NBC)',
      percentage: 26,
      budget: 0,
      impression: '2.6M',
      cpm: '$13.40',
      selected: false,
      broadcaster: 'NBCU',
      details: []
    },
    {
      id: 'nbcu-2',
      name: 'Los Angeles, CA (NBC)',
      percentage: 29,
      budget: 0,
      impression: '2.9M',
      cpm: '$12.70',
      selected: false,
      broadcaster: 'NBCU',
      details: []
    },
    {
      id: 'nbcu-3',
      name: 'Chicago, IL (NBC)',
      percentage: 24,
      budget: 0,
      impression: '2.4M',
      cpm: '$13.90',
      selected: false,
      broadcaster: 'NBCU',
      details: []
    },
    {
      id: 'nbcu-4',
      name: 'Miami, FL (NBC)',
      percentage: 21,
      budget: 0,
      impression: '1.9M',
      cpm: '$14.60',
      selected: false,
      broadcaster: 'NBCU',
      details: []
    }
  ],
  'NBCU Telemundo': [
    {
      id: 'telemundo-1',
      name: 'Miami, FL (Telemundo)',
      percentage: 50,
      budget: 0,
      impression: '1.8M',
      cpm: '$7.20',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      details: []
    },
    {
      id: 'telemundo-2',
      name: 'Los Angeles, CA (Telemundo)',
      percentage: 35,
      budget: 0,
      impression: '2.1M',
      cpm: '$8.40',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      details: []
    },
    {
      id: 'telemundo-3',
      name: 'New York, NY (Telemundo)',
      percentage: 15,
      budget: 0,
      impression: '1.5M',
      cpm: '$9.80',
      selected: false,
      broadcaster: 'NBCU Telemundo',
      details: []
    }
  ]
};
