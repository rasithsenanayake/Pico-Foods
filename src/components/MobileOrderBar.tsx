import { PhoneIcon } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { contact } from '../data/contact';
import { generalOrderLink } from '../utils/order';

export function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 backdrop-blur-md pb-[max(env(safe-area-inset-bottom),12px)] md:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${contact.phoneTel}`}
          aria-label={`Call Pico on ${contact.phoneDisplay}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand active:bg-brand-light">

          <PhoneIcon className="h-5 w-5" />
        </a>
        <a
          href={generalOrderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white active:bg-brand-dark">

          <WhatsAppIcon className="h-5 w-5" />
          Order on WhatsApp
        </a>
      </div>
    </div>);

}
