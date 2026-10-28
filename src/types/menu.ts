export type IngredientKey =
  | 'rice' | 'chicken' | 'egg' | 'salad' | 'corn' | 'avocado' | 'nuts'
  | 'sauce' | 'sweetPotato' | 'potato' | 'carrot' | 'cabbage'
  | 'gherkin' | 'greens' | 'cucumber' | 'tomato' | 'garlic'
  | 'herbs' | 'veggies';

export type MenuCategory = 'chicken' | 'prawn' | 'fish' | 'light' | 'goals';

export interface MenuOption {
  id: 'medium' | 'large' | 'regular';
  label: string;
  price: number;
  calories: string;
  protein?: string;
}

export interface MenuIngredient {
  name: string;
  amount: string;
}

export interface MenuItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  category: MenuCategory;
  description: string;
  ingredients: MenuIngredient[];
  options: MenuOption[];
  image: string;
  imageAlt: string;
}

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
  description?: string;
}

export interface MenuSectionInfo {
  id: string;
  title: string;
  subtitle?: string;
  collections: MenuCategoryInfo[];
}

export type FoodKind =
  | 'broccoli' | 'drumstick' | 'avocado' | 'egg'
  | 'corn' | 'tomato' | 'leaf';

export interface Floater {
  kind: FoodKind;
  className: string;
  delay?: number;
  duration?: number;
  rotate?: number;
}
