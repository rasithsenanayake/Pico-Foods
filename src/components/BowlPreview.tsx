'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { IngredientIcon } from './IngredientIcon';
import { ingredientLabels } from '../data/ingredients';
import { formatRs } from '../utils/order';
import type { MenuItem } from '../types/menu';

interface BowlPreviewProps {
  item: MenuItem | null;
  categoryLabel: string;
  onClose: () => void;
}

export function BowlPreview({ item, categoryLabel, onClose }: BowlPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (item && dialog && !dialog.open) dialog.showModal();
    if (!item && dialog?.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bowl-preview-title"
      aria-modal="true"
      onClose={onClose}
      className="fixed inset-0 m-0 h-screen max-h-[100dvh] w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-ink backdrop:bg-ink/50">
      {item &&
      <div
        className="flex min-h-full items-end justify-center sm:items-center sm:p-6"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}>
        <article className="relative max-h-[90vh] max-h-[90dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[28px] bg-white shadow-[0_-20px_60px_-20px_rgba(23,36,27,0.35)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:rounded-[28px]">
          <div className="relative aspect-[16/9] overflow-hidden bg-brand-soft">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 639px) 100vw, 512px"
              className="object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-brand">
              {item.number}
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close bowl details"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-5 pb-[max(env(safe-area-inset-bottom),20px)] sm:p-7">
            <p className="text-xs font-medium text-brand">{categoryLabel}</p>
            <div className="mt-1.5 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <h2 id="bowl-preview-title" className="min-w-0 flex-1 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {item.name}
              </h2>
              <p className="shrink-0 font-display text-xl font-semibold text-brand sm:text-2xl">
                {formatRs(item.price)}
              </p>
            </div>

            <section className="mt-5 border-t border-line pt-4" aria-labelledby="bowl-preview-inside">
              <h3 id="bowl-preview-inside" className="font-display text-lg font-semibold text-ink">What's inside</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              <ul className="mt-4 divide-y divide-line">
                {item.ingredients.map((ingredient) =>
                <li key={ingredient} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <IngredientIcon ingredient={ingredient} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-ink">{ingredientLabels[ingredient]}</span>
                </li>
                )}
              </ul>
            </section>
          </div>
        </article>
      </div>
      }
    </dialog>
  );
}
