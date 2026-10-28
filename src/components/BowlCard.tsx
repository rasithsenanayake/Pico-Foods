'use client';

import { Flame, Dumbbell, Minus, Plus, ArrowUpRight } from 'lucide-react';
import { MenuPhoto } from './MenuPhoto';
import { formatRs } from '../utils/order';
import type { MenuItem, MenuOption } from '../types/menu';

interface BowlCardProps {
  item: MenuItem;
  selected: MenuOption;
  quantity: number;
  orderQuantity?: number;
  onOptionChange: (id: MenuOption['id']) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToOrder: () => void;
  onPreview: () => void;
}

export function BowlCard({
  item, selected, quantity, orderQuantity, onOptionChange,
  onQuantityChange, onAddToOrder, onPreview
}: BowlCardProps) {
  const inOrder = orderQuantity !== undefined;
  const unchanged = inOrder && orderQuantity === quantity;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e8ebe5] bg-white shadow-[0_8px_34px_-20px_rgba(27,51,30,0.24)]">
      <button
        type="button"
        onClick={onPreview}
        aria-label={`View details for ${item.name}`}
        className="group relative aspect-[1.28] w-full overflow-hidden bg-[#fbfaf8] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <MenuPhoto item={item} sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 370px" />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-brand shadow-sm">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-sans text-lg font-bold leading-tight tracking-tight text-ink">{item.name}</h4>
        <p className="mt-1 text-sm font-medium text-ink-muted">{item.subtitle}</p>
        <p className="mt-3 line-clamp-3 min-h-[60px] text-[13px] leading-[1.55] text-ink-muted">{item.description}</p>

        {item.options.length > 1 ? (
          <fieldset className="mt-4">
            <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Choose your size</legend>
            <div className="grid grid-cols-2 gap-2">
              {item.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border px-3 transition-colors ${selected.id === option.id ? 'border-brand bg-brand-soft' : 'border-line bg-white hover:border-brand/40'}`}
                >
                  <input
                    type="radio"
                    name={`size-${item.id}`}
                    value={option.id}
                    checked={selected.id === option.id}
                    onChange={() => onOptionChange(option.id)}
                    className="sr-only"
                  />
                  <span className="text-[11px] text-ink-muted">{option.label}</span>
                  <span className="text-sm font-bold tabular-nums text-brand">{formatRs(option.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="mt-4 font-sans text-lg font-bold text-brand">{formatRs(selected.price)}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            {selected.calories} kcal <span className="sr-only">estimated</span>
          </span>
          {selected.protein && (
            <span className="inline-flex items-center gap-1.5">
              <Dumbbell className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              {selected.protein} g protein
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <div className="flex h-11 shrink-0 items-center rounded-full border border-line">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="grid h-11 w-9 place-items-center rounded-l-full text-ink focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-30"
            ><Minus className="h-4 w-4" /></button>
            <span className="w-5 text-center text-sm font-semibold tabular-nums" aria-live="polite">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(20, quantity + 1))}
              disabled={quantity >= 20}
              aria-label={`Increase quantity of ${item.name}`}
              className="grid h-11 w-9 place-items-center rounded-r-full text-ink focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-30"
            ><Plus className="h-4 w-4" /></button>
          </div>
          <button
            type="button"
            onClick={onAddToOrder}
            disabled={unchanged}
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full bg-brand px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-65 sm:text-sm"
          >{!inOrder ? 'Add to order' : unchanged ? 'Added' : 'Update order'}</button>
        </div>
      </div>
    </article>
  );
}
