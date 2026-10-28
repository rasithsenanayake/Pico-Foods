import type { MenuItem, MenuSectionInfo } from '../types/menu';

export const menuSections: MenuSectionInfo[] = [
  {
    id: 'everyday',
    title: 'Everyday Cravings',
    subtitle: 'Your favourites, freshly made every day.',
    collections: [
      { id: 'chicken', label: 'Chicken Collection' },
      { id: 'prawn', label: 'Prawn Collection' },
      { id: 'fish', label: 'Thalapath Fish Collection' }
    ]
  },
  {
    id: 'light',
    title: 'The Light Edition',
    subtitle: 'Fresh choices. Feel-good meals.',
    collections: [{ id: 'light', label: 'Fresh & Light' }]
  },
  {
    id: 'goals',
    title: 'Goals on a Plate',
    subtitle: 'Protein-rich meals for muscle growth and weight gain.',
    collections: [{ id: 'goals', label: 'Protein & Performance' }]
  }
];

const serving = (id: 'medium' | 'large', price: number, calories: string) =>
  ({ id, label: id === 'medium' ? 'Medium' : 'Large', price, calories });

const regular = (price: number, calories: string, protein?: string) =>
  [{ id: 'regular' as const, label: 'Regular', price, calories, ...(protein ? { protein } : {}) }];

const base = (id: string) => ({ image: `/menu/${id}.webp` });

export const menuItems: MenuItem[] = [
  {
    id: 'golden-crunch', number: '01', name: 'Golden Crunch',
    subtitle: 'Chicken & Rice Bowl', category: 'chicken',
    description: 'Garlic chicken, egg, fluffy rice, fresh crunchy salad, sweet corn, mixed nuts, and our signature sauce.',
    ingredients: [
      { name: 'Garlic chicken', amount: '' }, { name: 'Egg', amount: '' },
      { name: 'Fluffy rice', amount: '' }, { name: 'Fresh salad', amount: '' },
      { name: 'Sweet corn', amount: '' }, { name: 'Mixed nuts', amount: '' },
      { name: 'Signature sauce', amount: '' }
    ],
    options: [serving('medium', 950, '480–570'), serving('large', 1200, '600–750')],
    ...base('golden-crunch'),
    imageAlt: 'Golden Crunch chicken and rice with boiled egg, corn, salad and mixed nuts in a square kraft bowl'
  },
  {
    id: 'sunkissed-bowl', number: '02', name: 'Sunkissed Bowl',
    subtitle: 'Chicken & Sweet Potato Bowl', category: 'chicken',
    description: 'Tender garlic chicken, egg, roasted sweet potato, fresh salad, sweet corn, mixed nuts, and our signature sauce.',
    ingredients: [
      { name: 'Garlic chicken', amount: '' }, { name: 'Egg', amount: '' },
      { name: 'Roasted sweet potato', amount: '' }, { name: 'Fresh salad', amount: '' },
      { name: 'Sweet corn', amount: '' }, { name: 'Mixed nuts', amount: '' },
      { name: 'Signature sauce', amount: '' }
    ],
    options: [serving('medium', 950, '420–520'), serving('large', 1200, '550–680')],
    ...base('sunkissed-bowl'),
    imageAlt: 'Sunkissed chicken and roasted sweet potato bowl with egg and sweet corn'
  },
  {
    id: 'creamy-crave', number: '03', name: 'Creamy Crave',
    subtitle: 'Cheesy Chicken Pasta Bowl', category: 'chicken',
    description: 'Garlic chicken, egg, cheesy pasta, fresh crunchy salad, sweet corn, mixed nuts, and our signature sauce.',
    ingredients: [
      { name: 'Garlic chicken', amount: '' }, { name: 'Egg', amount: '' },
      { name: 'Cheesy pasta', amount: '' }, { name: 'Fresh salad', amount: '' },
      { name: 'Sweet corn', amount: '' }, { name: 'Mixed nuts', amount: '' },
      { name: 'Signature sauce', amount: '' }
    ],
    options: [serving('medium', 1450, '600–750'), serving('large', 1700, '750–950')],
    ...base('creamy-crave'),
    imageAlt: 'Creamy Crave pasta with garlic chicken, egg, salad and corn in square cardboard packaging'
  },
  {
    id: 'ocean-gold', number: '04', name: 'Ocean Gold',
    subtitle: 'Prawn & Rice Bowl', category: 'prawn',
    description: 'Juicy prawns, egg, fluffy rice, fresh crunchy salad, sweet corn, mixed nuts, and our signature sauce.',
    ingredients: [
      { name: 'Prawns', amount: '' }, { name: 'Egg', amount: '' },
      { name: 'Fluffy rice', amount: '' }, { name: 'Fresh salad', amount: '' },
      { name: 'Sweet corn', amount: '' }, { name: 'Mixed nuts', amount: '' },
      { name: 'Signature sauce', amount: '' }
    ],
    options: [serving('medium', 1100, '450–560'), serving('large', 1400, '580–730')],
    ...base('ocean-gold'),
    imageAlt: 'Ocean Gold prawn and rice bowl with egg, vegetables and sweet corn in cardboard tray'
  },
  {
    id: 'island-harvest', number: '05', name: 'Island Harvest',
    subtitle: 'Thalapath Fish & Rice Bowl', category: 'fish',
    description: 'Tender thalapath fish, egg, fluffy rice, fresh crunchy salad, sweet corn, mixed nuts, and our signature sauce.',
    ingredients: [
      { name: 'Thalapath fish', amount: '' }, { name: 'Egg', amount: '' },
      { name: 'Fluffy rice', amount: '' }, { name: 'Fresh salad', amount: '' },
      { name: 'Sweet corn', amount: '' }, { name: 'Mixed nuts', amount: '' },
      { name: 'Signature sauce', amount: '' }
    ],
    options: [serving('medium', 1100, '450–580'), serving('large', 1400, '600–760')],
    ...base('island-harvest'),
    imageAlt: 'Island Harvest thalapath fish and rice with sliced egg and corn in kraft bowl'
  },
  {
    id: 'creamy-garden-crunch', number: '06', name: 'Creamy Garden Crunch',
    subtitle: 'Creamy Egg & Potato Salad', category: 'light',
    description: "Boiled egg, tender boiled potato, fresh crunchy salad, sweet corn, mixed nuts, and Pico's signature creamy sauce.",
    ingredients: [
      { name: 'Boiled egg', amount: '1' }, { name: 'Boiled potato', amount: '100 g' },
      { name: 'Mixed salad vegetables', amount: '200 g' }, { name: 'Sweet corn', amount: '20 g' },
      { name: 'Mixed nuts', amount: '10 g' }, { name: 'Signature sauce', amount: '20 g' }
    ],
    options: regular(650, '300–400'),
    ...base('creamy-garden-crunch'),
    imageAlt: 'Creamy egg and potato salad with corn, crunchy vegetables and mixed nuts in kraft cardboard bowl'
  },
  {
    id: 'chicken-chickpea-fresh-bowl', number: '07', name: 'The Chicken & Chickpea Fresh Bowl',
    subtitle: 'Chickpea Chicken Salad', category: 'light',
    description: "Tender chicken, protein-rich chickpeas, fresh vegetables, sweet corn, mixed nuts, and Pico's signature sauce.",
    ingredients: [
      { name: 'Cooked chickpeas', amount: '150 g' }, { name: 'Chicken breast (raw weight)', amount: '100 g' },
      { name: 'Mixed salad vegetables', amount: '100 g' }, { name: 'Sweet corn', amount: '20 g' },
      { name: 'Mixed nuts', amount: '10 g' }, { name: 'Signature sauce', amount: '20 g' }
    ],
    options: regular(900, '400–550'),
    ...base('chicken-chickpea-fresh-bowl'),
    imageAlt: 'Chicken chickpea fresh salad with vegetables and corn in a square cardboard bowl'
  },
  {
    id: 'herb-harvest', number: '08', name: 'Herb & Harvest',
    subtitle: 'Herb Chicken & Potato Salad', category: 'light',
    description: "Herb-seasoned chicken, golden air-fried potatoes, boiled vegetables, fresh cucumber, sweet corn, mixed nuts, and Pico's signature sauce.",
    ingredients: [
      { name: 'Chicken breast (raw weight)', amount: '100 g' }, { name: 'Air-fried potato', amount: '100 g' },
      { name: 'Boiled vegetables', amount: '150 g' }, { name: 'Cucumber', amount: '50 g' },
      { name: 'Sweet corn', amount: '20 g' }, { name: 'Mixed nuts', amount: '10 g' },
      { name: 'Signature sauce', amount: '20 g' }
    ],
    options: regular(850, '400–600'),
    ...base('herb-harvest'),
    imageAlt: 'Herb chicken potato salad with cucumbers, vegetables and sweet corn in kraft bowl'
  },
  {
    id: 'muscle-builder', number: '09', name: 'The Muscle Builder',
    subtitle: 'Chicken & Rice Muscle Bowl', category: 'goals',
    description: 'A protein-rich chicken and rice bowl with two whole eggs, vegetables, corn, nuts and signature sauce.',
    ingredients: [
      { name: 'Chicken breast (raw weight)', amount: '200 g' }, { name: 'White rice (cooked weight)', amount: '150 g' },
      { name: 'Whole eggs', amount: '2' }, { name: 'Mixed vegetables', amount: '100 g' },
      { name: 'Sweet corn', amount: '30 g' }, { name: 'Mixed nuts', amount: '15 g' },
      { name: 'Signature sauce', amount: '25 g' }
    ],
    options: regular(1150, '800–900', '65–75'),
    ...base('muscle-builder'),
    imageAlt: 'Muscle Builder chicken rice bowl with eggs, vegetables, corn and nuts in square cardboard tray'
  },
  {
    id: 'iron-plate', number: '10', name: 'The Iron Plate',
    subtitle: 'Chicken, Potato & Egg Power Plate', category: 'goals',
    description: 'Chicken breast, cooked potatoes, two whole eggs, broccoli, corn, nuts and signature sauce.',
    ingredients: [
      { name: 'Chicken breast (raw weight)', amount: '200 g' }, { name: 'Potato (cooked weight)', amount: '300 g' },
      { name: 'Whole eggs', amount: '2' }, { name: 'Broccoli', amount: '100 g' },
      { name: 'Sweet corn', amount: '30 g' }, { name: 'Mixed nuts', amount: '15 g' },
      { name: 'Signature sauce', amount: '25 g' }
    ],
    options: regular(1250, '850–1,000', '65–75'),
    ...base('iron-plate'),
    imageAlt: 'Iron Plate with chicken, potatoes, sliced boiled eggs and broccoli in square cardboard tray'
  },
  {
    id: 'protein-crunch', number: '11', name: 'The Protein Crunch',
    subtitle: 'Chicken & Egg Salad', category: 'goals',
    description: 'Chicken breast and three whole eggs with crunchy salad, corn, mixed nuts and signature sauce.',
    ingredients: [
      { name: 'Chicken breast (raw weight)', amount: '200 g' }, { name: 'Whole eggs', amount: '3' },
      { name: 'Sweet corn', amount: '30 g' }, { name: 'Mixed salad vegetables', amount: '150 g' },
      { name: 'Mixed nuts', amount: '15 g' }, { name: 'Signature sauce', amount: '25 g' }
    ],
    options: regular(1200, '650–800', '70–80'),
    ...base('protein-crunch'),
    imageAlt: 'Protein Crunch chicken egg salad with sweet corn and vegetables in square cardboard bowl'
  },
  {
    id: 'mass-gainer', number: '12', name: 'The Mass Gainer',
    subtitle: 'Chicken, Sweet Potato & Chickpea Bowl', category: 'goals',
    description: 'A hearty bowl of chicken breast, chickpeas, sweet potato, vegetables, corn, nuts and signature sauce.',
    ingredients: [
      { name: 'Chicken breast (raw weight)', amount: '200 g' }, { name: 'Chickpeas (cooked weight)', amount: '250 g' },
      { name: 'Sweet potato (cooked weight)', amount: '100 g' }, { name: 'Mixed vegetables', amount: '100 g' },
      { name: 'Sweet corn', amount: '30 g' }, { name: 'Mixed nuts', amount: '15 g' },
      { name: 'Signature sauce', amount: '25 g' }
    ],
    options: regular(1350, '950–1,100', '75–85'),
    ...base('mass-gainer'),
    imageAlt: 'Mass Gainer chicken sweet potato chickpea bowl with vegetables, eggs-free serving in cardboard tray'
  }
];

export const menuCategories = menuSections.flatMap((section) => section.collections);
export const cartKey = (itemId: string, optionId: string) => `${itemId}:${optionId}`;
