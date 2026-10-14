import type { ReactElement } from 'react';
import { CarrotIcon, DropletIcon, DrumstickIcon, EggIcon, LeafyGreenIcon, NutIcon, SaladIcon } from 'lucide-react';
import {
  AvocadoGlyph,
  CabbageGlyph,
  CornGlyph,
  CucumberGlyph,
  GarlicGlyph,
  GherkinGlyph,
  PotatoGlyph,
  RiceGlyph,
  SweetPotatoGlyph,
  TomatoGlyph } from
'./IngredientGlyphs';
import type { IngredientKey } from '../types/menu';

type IconComponent = (props: {className?: string;}) => ReactElement;

const icons: Record<IngredientKey, IconComponent> = {
  rice: RiceGlyph,
  chicken: ({ className }) => <DrumstickIcon className={className} strokeWidth={1.75} />,
  egg: ({ className }) => <EggIcon className={className} strokeWidth={1.75} />,
  salad: ({ className }) => <SaladIcon className={className} strokeWidth={1.75} />,
  nuts: ({ className }) => <NutIcon className={className} strokeWidth={1.75} />,
  sauce: ({ className }) => <DropletIcon className={className} strokeWidth={1.75} />,
  carrot: ({ className }) => <CarrotIcon className={className} strokeWidth={1.75} />,
  greens: ({ className }) => <LeafyGreenIcon className={className} strokeWidth={1.75} />,
  veggies: ({ className }) => <SaladIcon className={className} strokeWidth={1.75} />,
  corn: CornGlyph,
  avocado: AvocadoGlyph,
  sweetPotato: SweetPotatoGlyph,
  potato: PotatoGlyph,
  cabbage: CabbageGlyph,
  gherkin: GherkinGlyph,
  cucumber: CucumberGlyph,
  tomato: TomatoGlyph,
  garlic: GarlicGlyph,
  herbs: ({ className }) => <LeafyGreenIcon className={className} strokeWidth={1.75} />
};

const iconColors: Record<IngredientKey, string> = {
  rice: 'text-amber-800',
  chicken: 'text-orange-900',
  egg: 'text-yellow-800',
  salad: 'text-emerald-800',
  corn: 'text-yellow-700',
  avocado: 'text-lime-800',
  nuts: 'text-stone-700',
  sauce: 'text-red-800',
  sweetPotato: 'text-orange-700',
  potato: 'text-amber-700',
  carrot: 'text-orange-800',
  cabbage: 'text-fuchsia-800',
  gherkin: 'text-green-800',
  greens: 'text-green-700',
  cucumber: 'text-teal-800',
  tomato: 'text-red-700',
  garlic: 'text-stone-600',
  herbs: 'text-lime-700',
  veggies: 'text-emerald-700'
};

interface IngredientIconProps {
  ingredient: IngredientKey;
  className?: string;
}

export function IngredientIcon({ ingredient, className }: IngredientIconProps) {
  const Icon = icons[ingredient];
  return <Icon className={className ? `${className} ${iconColors[ingredient]}` : iconColors[ingredient]} />;
}
