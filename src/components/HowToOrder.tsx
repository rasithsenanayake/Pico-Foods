import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { FloatingIngredients } from './FloatingIngredients';
import { WhatsAppIcon } from './WhatsAppIcon';
import { contact } from '../data/contact';
import { generalOrderLink } from '../utils/order';
import type { Floater } from '../types/menu';

const steps = [
{ title: 'Pick your bowl', text: 'Choose from rice, sweet potato or fresh salad bowls.' },
{ title: 'Message us on WhatsApp', text: 'Tap order — your bowl and quantity are filled in for you.' },
{ title: 'We deliver around Homagama', text: 'Made fresh and brought to your door within the Homagama area.' }];


const floaters: Floater[] = [
{ kind: 'broccoli', className: 'right-[4%] top-8 h-14 w-14 sm:h-20 sm:w-20', rotate: 12, duration: 7 },
{ kind: 'leaf', className: 'left-[3%] bottom-10 h-12 w-12 opacity-80 sm:h-16 sm:w-16', rotate: -30, duration: 8, delay: 0.8 },
{ kind: 'avocado', className: 'right-[42%] bottom-6 hidden h-14 w-14 lg:block', rotate: -14, duration: 6.5, delay: 0.4 }];


export function HowToOrder() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="relative overflow-hidden bg-brand-soft py-16 sm:py-24">
      <FloatingIngredients items={floaters} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            Homagama delivery only
          </p>
          <h2 id="delivery-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.1]">
            Delivered fresh around Homagama
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
            We keep our delivery area small so every bowl arrives as fresh as it left our kitchen.
          </p>

          <div id="contact" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={generalOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">

              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand ring-1 ring-line transition-colors duration-150 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">

              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>

        <ol className="relative space-y-8">
          {steps.map((step, index) =>
          <li key={step.title} className="relative flex gap-5">
              {index < steps.length - 1 &&
            <span aria-hidden="true" className="absolute left-5 top-11 h-[calc(100%-1rem)] w-px bg-brand/20" />
            }
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white font-display text-lg font-semibold text-brand ring-1 ring-brand/20">
                {index + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
