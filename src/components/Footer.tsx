import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { Logo } from './Logo';
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
          <a href={contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={contact.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-muted sm:px-6">
          © {new Date().getFullYear()} Pico Foods. Delivery available in the Homagama area only.
        </p>
      </div>
    </footer>);

}
