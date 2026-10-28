'use client';

import { useEffect, useRef } from 'react';
import { Flame, Dumbbell, X } from 'lucide-react';
import { MenuPhoto } from './MenuPhoto';
import { formatRs } from '../utils/order';
import type { MenuItem } from '../types/menu';

interface BowlPreviewProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function BowlPreview({ item, onClose }: BowlPreviewProps) {
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
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-auto max-h-[94dvh] w-[min(94vw,540px)] overflow-y-auto rounded-[28px] border-0 bg-white p-0 text-ink shadow-2xl backdrop:bg-[#17241b]/60"
    >
      {item && (
        <article>
          <div className="group relative aspect-[1.45] overflow-hidden bg-white">
            <MenuPhoto item={item} sizes="(max-width: 600px) 94vw, 540px" />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close details"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-brand shadow-sm focus-visible:ring-2 focus-visible:ring-brand"
            ><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="p-6 pb-8">
            <h2 id="bowl-preview-title" className="font-sans text-2xl font-bold tracking-tight">{item.name}</h2>
            <p className="mt-1 text-sm text-ink-muted">{item.subtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            <h3 className="mt-6 border-t border-line pt-5 text-base font-semibold">Portions & nutrition</h3>
            <div className="mt-3 space-y-2">
              {item.options.map((option) => (
                <div key={option.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-brand-soft px-3 py-3 text-sm">
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {option.calories} kcal</span>
                      {option.protein && <span className="inline-flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> {option.protein} g protein</span>}
                    </p>
                  </div>
                  <strong className="tabular-nums text-brand">{formatRs(option.price)}</strong>
                </div>
              ))}
            </div>
            <h3 className="mt-6 border-t border-line pt-5 text-base font-semibold">What’s inside</h3>
            <ul className="mt-3 divide-y divide-line">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex items-start justify-between gap-4 py-2.5 text-sm">
                  <span className="text-ink-muted">{ingredient.name}</span>
                  {ingredient.amount && <span className="shrink-0 font-medium tabular-nums">{ingredient.amount}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Nutrition values are estimates. Raw and cooked weights are identified where applicable.
            </p>
          </div>
        </article>
      )}
    </dialog>
  );
}
