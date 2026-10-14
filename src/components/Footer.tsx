import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';
import { contact } from '../data/contact';

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo className="w-28" />
          <p className="mt-2 text-sm text-ink-muted">Healthy bowls, made fresh in Homagama.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-brand" aria-hidden="true" />
            {contact.location}
          </span>
          <a href={`tel:${contact.phoneTel}`} className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-brand">
            <PhoneIcon className="h-4 w-4 text-brand" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <SocialLinks />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-muted sm:px-6">
          © {new Date().getFullYear()} Pico Foods. Delivery available in the Homagama area only.
          <span className="mt-1 block">
            Powered by{' '}
            <a
              href="https://www.thewebxagency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline underline-offset-2 transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              WebX Agency
            </a>
          </span>
        </p>
      </div>
    </footer>);

}
