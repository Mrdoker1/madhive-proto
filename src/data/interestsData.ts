export interface InterestCategory {
  id: string;
  title: string;
  interests: string[];
  maxVisible?: number;
}

export const interestCategories: InterestCategory[] = [
  {
    id: 'arts',
    title: 'Art',
    interests: [
      'Arts & Entertainment',
      'Celebrities & Entertainment News',
      'Comic',
      'Film & TV Industry',
      'Music & Audio',
      'Visual Arts & Design'
    ],
    maxVisible: 3
  },
  {
    id: 'auto',
    title: 'Auto',
    interests: [
      'Auto, Cars and Trucks',
      'Car Parts & Accessories',
      'Cars',
      'Motorcycles',
      'Electric Vehicles',
      'Auto Insurance'
    ],
    maxVisible: 3
  },
  {
    id: 'beauty',
    title: 'Beauty & Style',
    interests: ['Makeup', 'Haircare', 'Skincare', 'Fragrance', 'Fashion', 'Cosmetics'],
    maxVisible: 3
  },
  {
    id: 'books',
    title: 'Book & Literature',
    interests: ['Book', 'Novel', 'Short Story', 'Comic', 'Biography', 'Poetry', 'Magazine'],
    maxVisible: 3
  },
  {
    id: 'charity',
    title: 'Charity',
    interests: ['Charity Org', 'Non-Profit Initiative', 'Community Support Group', 'Fundraising', 'Volunteer Work'],
    maxVisible: 3
  }
];

