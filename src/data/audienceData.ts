export interface AudienceCategory {
  key: string;
  title: string;
  options: string[];
}

export const audienceCategories: AudienceCategory[] = [
  {
    key: 'gender',
    title: 'Gender',
    options: ['Male', 'Female']
  },
  {
    key: 'age', 
    title: 'Age',
    options: ['Under 18', '18 - 24', '25 - 34', '35 - 44', '45 - 54', '55 - 64', '65 and over']
  },
  {
    key: 'income',
    title: 'Household Income', 
    options: ['Under $50k', '$50k - $100k', '$100k - $150k', '$150k - $200k', '$200k - $250k', 'Over $250k']
  },
  {
    key: 'education',
    title: 'Education Level',
    options: ['High school diploma', "Associate's degree", "Bachelor's degree", "Master's degree"]
  },
  {
    key: 'householdSize',
    title: 'Household Size',
    options: ['One child', 'Two children', '>2 children']
  }
];
