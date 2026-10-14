import { Facebook, Instagram, Music2 } from 'lucide-react';
import { contact } from '../data/contact';

const socialLinks = [
  { label: 'Instagram', href: contact.socialLinks.instagram, Icon: Instagram },
  { label: 'Facebook', href: contact.socialLinks.facebook, Icon: Facebook },
  { label: 'TikTok', href: contact.socialLinks.tiktok, Icon: Music2 },
];

export function SocialLinks() {
  return (
    <div role="group" aria-label="Social media" className="flex items-center gap-1">
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-brand transition-colors hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
