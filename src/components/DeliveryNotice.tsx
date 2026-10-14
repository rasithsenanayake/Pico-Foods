import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPinIcon, XIcon } from 'lucide-react';
import { FloatingIngredients } from './FloatingIngredients';
import { contact } from '../data/contact';
import type { Floater } from '../types/menu';

const STORAGE_KEY = 'pico-homagama-ack';
const ease = [0.23, 1, 0.32, 1] as const;

const floaters: Floater[] = [
{ kind: 'broccoli', className: '-left-3 -top-3 h-14 w-14', rotate: -14, duration: 6 },
{ kind: 'avocado', className: '-right-2 top-10 h-12 w-12', rotate: 18, duration: 7, delay: 0.5 }];


export function DeliveryNotice() {
  const [open, setOpen] = useState(false);
  const [outside, setOutside] = useState(false);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => primaryRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, outside]);

  function close() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {

      /* storage unavailable */}
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease }}
        onClick={close}>

          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delivery-notice-title"
          aria-describedby="delivery-notice-text"
          className="relative max-h-[90vh] max-h-[90dvh] w-full overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-[28px] bg-white px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-8 shadow-[0_-20px_60px_-20px_rgba(23,36,27,0.35)] sm:max-w-md sm:rounded-[28px] sm:p-8"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.26, ease }}
          onClick={(e) => e.stopPropagation()}>

            <FloatingIngredients items={floaters} />

            <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-brand-soft hover:text-ink">

              <XIcon className="h-5 w-5" />
            </button>

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
              <MapPinIcon className="h-7 w-7" aria-hidden="true" />
            </div>

            {!outside ?
          <div className="mt-5 text-center">
                <h2 id="delivery-notice-title" className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
                  We only deliver around Homagama
                </h2>
                <p id="delivery-notice-text" className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-ink-muted">
                  Our bowls are made fresh daily and delivered within the Homagama area only.
                </p>
                <div className="mt-7 flex flex-col gap-2.5">
                  <button
                ref={primaryRef}
                type="button"
                onClick={close}
                className="h-12 rounded-full bg-brand text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">

                    I'm in Homagama — show menu
                  </button>
                  <button
                type="button"
                onClick={() => setOutside(true)}
                className="h-12 rounded-full text-[15px] font-semibold text-brand transition-colors duration-150 hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">

                    I'm outside Homagama
                  </button>
                </div>
              </div> :

          <div className="mt-5 text-center">
                <h2 id="delivery-notice-title" className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
                  Sorry, we can't reach you yet
                </h2>
                <p id="delivery-notice-text" className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-ink-muted">
                  We're delivering in Homagama only for now. Follow us on{' '}
                  <a href={contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-brand underline">Instagram</a>,{' '}
                  <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-brand underline">Facebook</a>, or{' '}
                  <a href={contact.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-brand underline">TikTok</a> to hear when we grow.
                </p>
                <div className="mt-7 flex flex-col gap-2.5">
                  <button
                ref={primaryRef}
                type="button"
                onClick={close}
                className="h-12 rounded-full bg-brand text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">

                    Browse the menu anyway
                  </button>
                  <button
                type="button"
                onClick={() => setOutside(false)}
                className="h-12 rounded-full text-[15px] font-semibold text-brand transition-colors duration-150 hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">

                    Back
                  </button>
                </div>
              </div>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}
