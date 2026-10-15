import { MapPinIcon } from 'lucide-react';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';
import { WhatsAppIcon } from './WhatsAppIcon';
import { generalOrderLink } from '../utils/order';

const navLinks = [
{ href: '#menu', label: 'Menu' },
{ href: '#delivery', label: 'Delivery' },
{ href: '#contact', label: 'Contact' }];


export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#top" aria-label="Pico Foods home" className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <Logo className="w-[92px] sm:w-[104px]" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-ink-muted transition-colors duration-150 hover:text-brand">

              {link.label}
            </a>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand sm:inline-flex md:hidden">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Homagama
          </span>
          <SocialLinks />
          <a
            href={generalOrderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:inline-flex">

            <WhatsAppIcon className="h-4 w-4" />
            Order now
          </a>
        </div>
      </div>
    </header>);

}
