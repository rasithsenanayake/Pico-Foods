export type IngredientKey =
'rice' |
'chicken' |
'egg' |
'salad' |
'corn' |
'avocado' |
'nuts' |
'sauce' |
'sweetPotato' |
'potato' |
'carrot' |
'cabbage' |
'gherkin' |
'greens' |
'cucumber' |
'tomato' |
'garlic' |
'herbs' |
'veggies';

export type MenuCategory = 'rice' | 'sweet-potato' | 'salad';

export interface MenuItem {
  id: string;
  number: string;
  name: string;
  price: number;
  category: MenuCategory;
  description: string;
  ingredients: IngredientKey[];
  image: string;
  imageAlt: string;
}

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
}

export type FoodKind =
'broccoli' |
'drumstick' |
'avocado' |
'egg' |
'corn' |
'tomato' |
'leaf';

export interface Floater {
  kind: FoodKind;
  className: string;
  delay?: number;
  duration?: number;
  rotate?: number;
}
