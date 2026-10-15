import Image from 'next/image';
import { ArrowDownIcon, MapPinIcon } from 'lucide-react';
import { FloatingIngredients } from './FloatingIngredients';
import { WhatsAppIcon } from './WhatsAppIcon';
import { generalOrderLink } from '../utils/order';
import type { Floater } from '../types/menu';

const HERO_IMAGE = "/53c1e7a0-ac85-456b-abaa-e997d90e8b38.webp";


const bowlFloaters: Floater[] = [
{ kind: 'broccoli', className: '-left-2 top-[8%] h-16 w-16 sm:h-24 sm:w-24', rotate: -12, duration: 6 },
{ kind: 'drumstick', className: 'right-0 top-[2%] h-16 w-16 sm:h-24 sm:w-24', rotate: 10, duration: 7, delay: 0.6 },
{ kind: 'avocado', className: '-right-3 bottom-[18%] h-16 w-16 sm:h-24 sm:w-24', rotate: 16, duration: 6.5, delay: 1.2 },
{ kind: 'egg', className: 'left-[4%] bottom-[6%] h-12 w-12 sm:h-16 sm:w-16', rotate: -8, duration: 5.5, delay: 0.3 },
{ kind: 'corn', className: 'left-[44%] -top-4 h-12 w-12 sm:h-16 sm:w-16', rotate: 20, duration: 7.5, delay: 0.9 }];


const backgroundFloaters: Floater[] = [
{ kind: 'leaf', className: 'left-[2%] top-[6%] hidden h-14 w-14 opacity-70 lg:block', rotate: -20, duration: 8 },
{ kind: 'tomato', className: 'left-[38%] bottom-[8%] hidden h-12 w-12 lg:block', rotate: 0, duration: 7, delay: 1.5 },
{ kind: 'leaf', className: 'right-[3%] bottom-[4%] h-10 w-10 opacity-70 sm:h-14 sm:w-14', rotate: 140, duration: 9, delay: 0.4 }];


export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      <FloatingIngredients items={backgroundFloaters} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-24 lg:pt-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            Homagama, Sri Lanka
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">

            Fresh bowls,
            <br />
            <span className="text-brand">made to fuel you.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0">
            Protein-packed rice, sweet potato and salad bowls finished with our homemade signature
            sauce — delivered fresh around Homagama.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">

              See the menu
              <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={generalOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-brand ring-1 ring-line transition-colors duration-150 hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">

              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Bowls from <span className="font-semibold text-ink">Rs. 750</span> · Made fresh daily
          </p>
        </div>

        <div className="relative order-1 mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:order-2 lg:max-w-[520px]">
          <div className="absolute inset-[6%] rounded-full bg-brand-light" />
          <div className="absolute inset-[12%] overflow-hidden rounded-full bg-white shadow-[0_30px_60px_-30px_rgba(23,36,27,0.45)]">
            <Image
              src={HERO_IMAGE}
              fill
              sizes="(max-width: 1024px) 82vw, 520px"
              preload
              alt="Chicken Power Bowl with rice, grilled chicken, egg, avocado and sweet corn"
              className="h-full w-full scale-[1.18] object-cover" />

          </div>
          <FloatingIngredients items={bowlFloaters} />
          <div className="absolute bottom-[4%] right-[14%] rounded-2xl bg-white px-4 py-2.5 shadow-[0_12px_30px_-12px_rgba(23,36,27,0.3)] ring-1 ring-line">
            <p className="text-xs text-ink-muted">Chicken Power Bowl</p>
            <p className="font-display text-lg font-semibold text-brand">Rs. 950</p>
          </div>
        </div>
      </div>
    </section>);

}
