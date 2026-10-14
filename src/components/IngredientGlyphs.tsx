import React from 'react';

type GlyphProps = {className?: string;};

function Glyph({ className, children }: GlyphProps & {children: React.ReactNode;}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true">

      {children}
    </svg>);

}

export function CornGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M12 3c2.3 0 3.7 3 3.7 7.5S14.3 19 12 19s-3.7-4-3.7-8.5S9.7 3 12 3z" />
      <path d="M8.6 8.5h6.8M8.4 12h7.2M8.8 15.5h6.4M12 3v16" />
      <path d="M8.5 14C6 15 5 18 5 21c3 0 5-1 7-2M15.5 14c2.5 1 3.5 4 3.5 7-3 0-5-1-7-2" />
    </Glyph>);

}

export function RiceGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <ellipse cx="7" cy="7" rx="1.4" ry="2.8" transform="rotate(-25 7 7)" />
      <ellipse cx="12" cy="5.5" rx="1.4" ry="2.8" transform="rotate(15 12 5.5)" />
      <ellipse cx="17" cy="7" rx="1.4" ry="2.8" transform="rotate(30 17 7)" />
      <path d="M4 13h16l-2 7H6l-2-7z" />
      <path d="M4.5 13c1 1.5 2.5 2.2 7.5 2.2s6.5-.7 7.5-2.2" />
    </Glyph>);
}

export function AvocadoGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M12 2.5c-3 0-4.5 4-5.3 7.5C5 12.5 4 14.5 4 16.5c0 3 3.5 5 8 5s8-2 8-5c0-2-1-4-2.7-6.5C16.5 6.5 15 2.5 12 2.5z" />
      <circle cx="12" cy="15.5" r="3" />
    </Glyph>);

}

export function PotatoGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M5 9c1.5-4 7-5.5 11-3.5s5 6 3 9.5-7 5.5-11 3.5S3.5 13 5 9z" />
      <path d="M9.5 10h.01M14 12.5h.01M10.5 15h.01" strokeWidth="2.5" />
    </Glyph>);

}

export function SweetPotatoGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M3.5 15c.5-4 5.5-8.5 11-9.5 4-.7 6.5.8 6 3.3-.6 3.4-4 6.7-8.5 8.5-5 2-9 1.2-8.5-2.3z" />
      <path d="M9 13h.01M13 11h.01M15.5 9h.01" strokeWidth="2.5" />
    </Glyph>);

}

export function TomatoGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 6V3M8.5 6.5 12 8l3.5-1.5" />
    </Glyph>);

}

export function CucumberGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 9.8h.01M14.2 12h.01M9.8 12h.01M12 14.2h.01" strokeWidth="2.2" />
    </Glyph>);

}

export function CabbageGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12.5" r="8.5" />
      <path d="M12 4c-3.2 3-3.2 14 0 17M12 4c3.2 3 3.2 14 0 17M4.3 10c3.5 1.6 11.9 1.6 15.4 0" />
    </Glyph>);

}

export function GherkinGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M5.5 17.5c-2-2 0-6 4-9.5s8-5 9.5-3.5.3 6-3.6 9.5-7.9 5.5-9.9 3.5z" />
      <path d="M9 13h.01M12 10.5h.01M15 8h.01M12.5 13.5h.01" strokeWidth="2.4" />
    </Glyph>);

}

export function GarlicGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M12 3v3" />
      <path d="M12 6c-4 2-7 5-7 9 0 3.3 3.1 6 7 6s7-2.7 7-6c0-4-3-7-7-9z" />
      <path d="M12 6c-1.6 3-2.2 8-1 15M12 6c1.6 3 2.2 8 1 15" />
    </Glyph>);

}
