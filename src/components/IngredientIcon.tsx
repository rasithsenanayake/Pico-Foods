import type { ReactElement } from 'react';
import { CarrotIcon, DropletIcon, DrumstickIcon, EggIcon, LeafyGreenIcon, NutIcon, SaladIcon, WheatIcon } from 'lucide-react';
import {
  AvocadoGlyph,
  CabbageGlyph,
  CornGlyph,
  CucumberGlyph,
  GarlicGlyph,
  GherkinGlyph,
  PotatoGlyph,
  SweetPotatoGlyph,
  TomatoGlyph } from
'./IngredientGlyphs';
import type { IngredientKey } from '../types/menu';

type IconComponent = (props: {className?: string;}) => ReactElement;

const icons: Record<IngredientKey, IconComponent> = {
  rice: ({ className }) => <WheatIcon className={className} strokeWidth={1.75} />,
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
  garlic: GarlicGlyph
};

interface IngredientIconProps {
  ingredient: IngredientKey;
  className?: string;
}

export function IngredientIcon({ ingredient, className }: IngredientIconProps) {
  const Icon = icons[ingredient];
  return <Icon className={className} />;
}
