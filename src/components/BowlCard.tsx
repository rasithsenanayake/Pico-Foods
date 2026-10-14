import Image from 'next/image';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { IngredientIcon } from './IngredientIcon';
import { ingredientLabels } from '../data/ingredients';
import { formatRs } from '../utils/order';
import type { MenuItem } from '../types/menu';

interface BowlCardProps {
  item: MenuItem;
  categoryLabel: string;
  quantity: number;
  orderQuantity?: number;
  onQuantityChange: (quantity: number) => void;
  onAddToOrder: () => void;
}

export function BowlCard({ item, categoryLabel, quantity, orderQuantity, onQuantityChange, onAddToOrder }: BowlCardProps) {
  const isInOrder = orderQuantity !== undefined;
  const isUpToDate = orderQuantity === quantity;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(23,36,27,0.04),0_12px_32px_-16px_rgba(23,36,27,0.18)] ring-1 ring-line">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-brand">
          {item.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <p className="text-xs font-medium text-brand">{categoryLabel}</p>
        <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{item.name}</h3>
          <p className="shrink-0 whitespace-nowrap font-display text-lg font-semibold text-brand sm:text-xl">
            {formatRs(item.price)}
          </p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{item.description}</p>

        <div className="mt-4 border-t border-line pt-3 sm:mt-5 sm:pt-4">
          <p className="text-[11px] font-semibold text-ink sm:text-xs">What's inside</p>
          <ul className="mt-3 grid grid-cols-4 gap-y-3 sm:gap-x-1">
            {item.ingredients.map((ingredient) =>
            <li key={ingredient} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-soft text-brand sm:h-10 sm:w-10">
                  <IngredientIcon ingredient={ingredient} className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="break-words text-[10px] leading-tight text-ink-muted sm:text-[11px]">{ingredientLabels[ingredient]}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-auto flex flex-col items-stretch gap-3 pt-5 sm:flex-row sm:items-center sm:pt-6">
          <div className="flex h-11 shrink-0 items-center self-center rounded-full ring-1 ring-line sm:self-auto">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="grid h-11 w-11 place-items-center rounded-l-full text-ink transition-colors duration-150 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:text-ink-muted/40">

              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-5 text-center text-sm font-semibold tabular-nums text-ink" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(20, quantity + 1))}
              aria-label={`Increase quantity of ${item.name}`}
              className="grid h-11 w-11 place-items-center rounded-r-full text-ink transition-colors duration-150 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">

              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onAddToOrder}
            disabled={isInOrder && isUpToDate}
            className="inline-flex h-11 w-full flex-1 items-center justify-center whitespace-nowrap rounded-full bg-brand px-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-75">
            {!isInOrder ? 'Add to order' : isUpToDate ? 'Added' : 'Update order'}
          </button>
        </div>
      </div>
    </article>);

}
