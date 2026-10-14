import type { MenuCategoryInfo, MenuItem } from '../types/menu';

export const categories: MenuCategoryInfo[] = [
{ id: 'rice', label: 'Rice bowl' },
{ id: 'sweet-potato', label: 'Sweet potato bowl' },
{ id: 'salad', label: 'Fresh salad bowls' }];


export const menuItems: MenuItem[] = [
{
  id: 'chicken-power-bowl',
  number: '01',
  name: 'Chicken Power Bowl',
  price: 950,
  category: 'rice',
  description:
  'Rice, chicken, egg, fresh salad, sweet corn, avocado, nuts & our signature sauce.',
  ingredients: ['rice', 'chicken', 'egg', 'salad', 'corn', 'avocado', 'nuts', 'sauce'],
  image: "/99b601dc-0a13-49f5-a6e0-1caa8e36a310.jpg",

  imageAlt: 'Chicken Power Bowl with rice, grilled chicken, egg, corn, avocado and greens'
},
{
  id: 'chicken-sweet-potato-bowl',
  number: '02',
  name: 'Chicken Sweet Potato Bowl',
  price: 950,
  category: 'sweet-potato',
  description:
  'Air-fried sweet potato, chicken, egg, fresh salad, sweet corn, avocado, nuts & our signature sauce.',
  ingredients: ['sweetPotato', 'chicken', 'egg', 'salad', 'corn', 'avocado', 'nuts', 'sauce'],
  image: "/1a4f1504-7189-4213-9f20-745a5af666e5.jpg",

  imageAlt: 'Chicken Sweet Potato Bowl with air-fried sweet potato, chicken, egg and avocado'
},
{
  id: 'creamy-potato-egg-chicken-salad',
  number: '03',
  name: 'Creamy Potato & Egg Chicken Salad',
  price: 750,
  category: 'salad',
  description: 'Creamy potato egg salad, chicken & our signature sauce.',
  ingredients: ['potato', 'egg', 'chicken', 'sauce'],
  image: "/953281d1-6a4a-4dbc-9ded-39dee4ca4c41.jpg",

  imageAlt: 'Creamy potato and egg salad with chicken'
},
{
  id: 'rainbow-avocado-salad',
  number: '04',
  name: 'Rainbow Avocado Salad',
  price: 750,
  category: 'salad',
  description: 'Fresh carrot, red cabbage, gherkins, avocado & our signature sauce.',
  ingredients: ['carrot', 'cabbage', 'gherkin', 'avocado', 'sauce'],
  image: "/378b7f7e-443d-481b-9197-b64c2c0409a7.jpg",

  imageAlt: 'Rainbow salad with carrot, red cabbage, gherkins and avocado'
},
{
  id: 'avocado-chicken-garden-salad',
  number: '05',
  name: 'Avocado Chicken Garden Salad',
  price: 850,
  category: 'salad',
  description:
  'Grilled chicken, avocado, fresh greens, carrot, cucumber, tomatoes & our signature sauce.',
  ingredients: ['chicken', 'avocado', 'greens', 'carrot', 'cucumber', 'tomato', 'sauce'],
  image: "/a261b686-a843-4382-b968-0bef415d2e7a.jpg",

  imageAlt: 'Garden salad with grilled chicken, avocado, cucumber and tomatoes'
},
{
  id: 'garlic-herb-chicken-potato-bowl',
  number: '06',
  name: 'Garlic Herb Chicken & Potato Bowl',
  price: 850,
  category: 'salad',
  description:
  'Air-fried potatoes, garlic-seasoned chicken, fresh vegetables & our signature sauce.',
  ingredients: ['potato', 'chicken', 'garlic', 'herbs', 'veggies', 'sauce'],
  image: "/4d4e921e-cccb-439d-b293-294ae7e679f9.jpg",

  imageAlt: 'Garlic herb chicken with air-fried potatoes and roasted vegetables'
}];
