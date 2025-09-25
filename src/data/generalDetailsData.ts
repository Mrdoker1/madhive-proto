export interface SelectOption {
  value: string;
  label: string;
}

export interface SpotLengthOption {
  value: string;
  label: string;
}

// Опции рекламодателей
export const advertiserOptions: SelectOption[] = [
  { value: 'Ford Motor Company', label: 'Ford Motor Company' },
  { value: 'Stellantis', label: 'Stellantis' },   
  { value: 'Toyota Motor Corp', label: 'Toyota Motor Corp' },
];

// Бренды по рекламодателям
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

// Агентства по рекламодателям
export const agencyOptions: Record<string, SelectOption[]> = {
  'Ford Motor Company': [
    { value: 'GROUPM / GLOBAL TEAM BLUE', label: 'GROUPM / GLOBAL TEAM BLUE' },
    { value: 'Wieden+Kennedy', label: 'Wieden+Kennedy' },
    { value: 'BBDO Detroit', label: 'BBDO Detroit' },
  ],
  'Stellantis': [
    { value: 'Publicis Groupe', label: 'Publicis Groupe' },
    { value: 'FCB Global', label: 'FCB Global' },
    { value: 'DDB Worldwide', label: 'DDB Worldwide' },
  ],
  'Toyota Motor Corp': [
    { value: 'Saatchi & Saatchi', label: 'Saatchi & Saatchi' },
    { value: 'Burrell Communications', label: 'Burrell Communications' },
    { value: 'Intertrend Communications', label: 'Intertrend Communications' },
  ],
};

// Опции длительности роликов
export const spotLengthOptions: SpotLengthOption[] = [
  { value: '15', label: '15 sec' },
  { value: '30', label: '30 sec' },
  { value: '60', label: '60 sec' }
];
