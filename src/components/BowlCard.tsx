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
  onPreview: () => void;
}

export function BowlCard({ item, categoryLabel, quantity, orderQuantity, onQuantityChange, onAddToOrder, onPreview }: BowlCardProps) {
  const isInOrder = orderQuantity !== undefined;
  const isUpToDate = orderQuantity === quantity;

  return (
    <article
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('button')) return;
        onPreview();
      }}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(23,36,27,0.04),0_12px_32px_-16px_rgba(23,36,27,0.18)] ring-1 ring-line">
      <button
        type="button"
        onClick={onPreview}
        aria-label={`View details for ${item.name}`}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-brand-soft text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand xl:aspect-video">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 639px) calc(50vw - 26px), (max-width: 1279px) calc(50vw - 36px), 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold tabular-nums text-brand sm:left-4 sm:top-4 sm:px-2.5 sm:text-xs">
          {item.number}
        </span>
        <span className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-brand sm:bottom-3 sm:right-3 sm:text-xs">
          View details
        </span>
      </button>

      <div className="flex flex-1 flex-col p-2 sm:p-4 lg:p-6 xl:p-3">
        <p className="text-xs font-medium text-brand">{categoryLabel}</p>
        <div className="mt-1.5 flex flex-col gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <h3 className="font-display text-base font-semibold leading-snug text-ink sm:text-lg lg:text-xl xl:min-h-[44px] xl:text-lg">
            <button type="button" onClick={onPreview} className="text-left focus:outline-none focus-visible:underline">
              {item.name}
            </button>
          </h3>
          <p className="shrink-0 whitespace-nowrap font-display text-base font-semibold text-brand sm:text-lg lg:text-xl xl:text-lg">
            {formatRs(item.price)}
          </p>
        </div>
        <div className="mt-4 border-t border-line pt-3 sm:mt-5 sm:pt-4 xl:mt-2 xl:pt-2">
          <p className="text-[11px] font-semibold text-ink sm:text-xs">What's inside</p>
          <ul className="mt-2 flex flex-nowrap items-center justify-between gap-0 min-[480px]:gap-0.5 sm:gap-1 md:gap-0.5 lg:gap-1 xl:mt-1">
            {item.ingredients.map((ingredient) =>
            <li key={ingredient} className="flex min-w-0 flex-1 justify-center">
                <span role="img" aria-label={ingredientLabels[ingredient]} title={ingredientLabels[ingredient]} className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand min-[480px]:h-5 min-[480px]:w-5 sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5">
                  <IngredientIcon ingredient={ingredient} className="h-2.5 w-2.5 min-[480px]:h-3 min-[480px]:w-3 sm:h-4 sm:w-4 md:h-3 md:w-3 lg:h-4 lg:w-4 xl:h-3.5 xl:w-3.5" />
                </span>
              </li>
            )}
          </ul>
          <p className="mt-2 line-clamp-3 min-h-14 text-xs leading-relaxed text-ink-muted sm:text-sm">{item.description}</p>
        </div>

        <div className="mt-auto flex flex-col items-stretch gap-3 pt-5 sm:flex-row sm:items-center sm:pt-6 xl:pt-2">
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
            className="inline-flex h-12 min-h-12 w-full shrink-0 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-brand px-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-75">
            {!isInOrder ? 'Add to order' : isUpToDate ? 'Added' : 'Update order'}
          </button>
        </div>
      </div>
    </article>);

}
