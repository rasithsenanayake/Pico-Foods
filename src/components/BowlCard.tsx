import Image from 'next/image';
import { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { IngredientIcon } from './IngredientIcon';
import { ingredientLabels } from '../data/ingredients';
import { formatRs, itemOrderLink } from '../utils/order';
import type { MenuItem } from '../types/menu';

interface BowlCardProps {
  item: MenuItem;
  categoryLabel: string;
}

export function BowlCard({ item, categoryLabel }: BowlCardProps) {
  const [qty, setQty] = useState(1);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(23,36,27,0.04),0_12px_32px_-16px_rgba(23,36,27,0.18)] ring-1 ring-line">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-brand">
          {item.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium text-brand">{categoryLabel}</p>
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">{item.name}</h3>
          <p className="shrink-0 whitespace-nowrap font-display text-xl font-semibold text-brand">
            {formatRs(item.price)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-semibold text-ink">What's inside</p>
          <ul className="mt-3 grid grid-cols-4 gap-x-1 gap-y-3">
            {item.ingredients.map((ingredient) =>
            <li key={ingredient} className="flex flex-col items-center gap-1.5 text-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand">
                  <IngredientIcon ingredient={ingredient} className="h-5 w-5" />
                </span>
                <span className="text-[11px] leading-tight text-ink-muted">{ingredientLabels[ingredient]}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <div className="flex h-11 shrink-0 items-center rounded-full ring-1 ring-line">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty === 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="grid h-11 w-10 place-items-center rounded-l-full text-ink transition-colors duration-150 hover:text-brand disabled:text-ink-muted/40">

              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums text-ink" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              aria-label={`Increase quantity of ${item.name}`}
              className="grid h-11 w-10 place-items-center rounded-r-full text-ink transition-colors duration-150 hover:text-brand">

              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <a
            href={itemOrderLink(item.name, qty, item.price)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-brand px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">

            Order · {formatRs(item.price * qty)}
          </a>
        </div>
      </div>
    </article>);

}
