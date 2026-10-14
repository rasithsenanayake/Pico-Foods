import React from 'react';
import type { FoodKind } from '../types/menu';

type IllustrationProps = {className?: string;};

function Broccoli({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path d="M27 34 L23 58 Q32 62 41 58 L37 34 Z" fill="#A6CC72" />
      <path d="M31 40 L29 56" stroke="#8DB95B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="28" r="11" fill="#3E8838" />
      <circle cx="45" cy="28" r="11" fill="#3E8838" />
      <circle cx="32" cy="18" r="13" fill="#4C9C44" />
      <circle cx="32" cy="32" r="10" fill="#357A31" />
      <circle cx="27" cy="13" r="3" fill="#6BB55C" />
      <circle cx="15" cy="24" r="2.5" fill="#5DAA50" />
      <circle cx="47" cy="24" r="2.5" fill="#5DAA50" />
      <circle cx="36" cy="28" r="2" fill="#4C9C44" />
    </svg>);

}

function Drumstick({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g transform="rotate(-38 32 32)">
        <rect x="29" y="36" width="6" height="16" rx="3" fill="#F4EBD8" />
        <circle cx="28" cy="54" r="4.5" fill="#F4EBD8" />
        <circle cx="36" cy="54" r="4.5" fill="#F4EBD8" />
        <ellipse cx="32" cy="22" rx="15" ry="17" fill="#C2702B" />
        <ellipse cx="32" cy="24" rx="12" ry="13" fill="#D4853A" />
        <ellipse cx="27" cy="17" rx="4.5" ry="6" fill="#E9A65E" />
        <path d="M24 28 L30 25 M33 31 L39 27" stroke="#A85E22" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>);

}

function Avocado({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        d="M32 4c-8 0-12 10-14 20-4 6-8 12-8 20 0 10 10 16 22 16s22-6 22-16c0-8-4-14-8-20C44 14 40 4 32 4z"
        fill="#2E6A2B" />

      <path
        d="M32 9c-6 0-9 8-11 17-3 5-7 11-7 18 0 8 8 12 18 12s18-4 18-12c0-7-4-13-7-18C41 17 38 9 32 9z"
        fill="#D3E59E" />

      <path
        d="M32 14c-4 0-7 7-8 14-3 4-6 9-6 15 0 6 6 9 14 9s14-3 14-9c0-6-3-11-6-15-1-7-4-14-8-14z"
        fill="#E6F0BC" />

      <circle cx="32" cy="41" r="9" fill="#8A5A34" />
      <circle cx="29" cy="38" r="3" fill="#A87449" />
    </svg>);

}

function Egg({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <ellipse cx="32" cy="34" rx="20" ry="24" fill="#FFFFFF" stroke="#EDE6D6" strokeWidth="2" />
      <circle cx="32" cy="38" r="10.5" fill="#F2B23B" />
      <circle cx="28.5" cy="34.5" r="3.2" fill="#F8CF72" />
    </svg>);

}

function Corn({ className }: IllustrationProps) {
  const kernels: Array<[number, number]> = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 3; col++) {
      kernels.push([27 + col * 5, 15 + row * 5]);
    }
  }
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g transform="rotate(24 32 32)">
        <ellipse cx="32" cy="32" rx="10" ry="21" fill="#EEBD2D" />
        {kernels.map(([x, y]) =>
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="#F8D96A" />
        )}
        <path d="M19 54 Q12 32 25 14 Q21 36 31 58 Z" fill="#7DB35A" />
        <path d="M45 54 Q52 32 39 14 Q43 36 33 58 Z" fill="#5C9A44" />
      </g>
    </svg>);

}

function Tomato({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="36" r="21" fill="#E2483A" />
      <ellipse cx="24" cy="28" rx="5" ry="3.5" fill="#F07466" />
      <path
        d="M32 16 L36 21 L43 19 L39 24 L44 28 L36 27 L32 32 L28 27 L20 28 L25 24 L21 19 L28 21 Z"
        fill="#3E8838" />

      <path d="M32 16 V9" stroke="#3E8838" strokeWidth="3" strokeLinecap="round" />
    </svg>);

}

function Leaf({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path d="M10 54C10 28 28 10 56 8c-2 28-20 46-46 46z" fill="#5FA84F" />
      <path d="M12 52 C24 40 36 28 50 14" stroke="#3E8838" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M26 38 L22 28 M34 30 L32 20 M30 34 L40 34 M38 26 L46 26" stroke="#3E8838" strokeWidth="1.8" strokeLinecap="round" />
    </svg>);

}

export const foodIllustrations: Record<FoodKind, (props: IllustrationProps) => React.JSX.Element> = {
  broccoli: Broccoli,
  drumstick: Drumstick,
  avocado: Avocado,
  egg: Egg,
  corn: Corn,
  tomato: Tomato,
  leaf: Leaf
};
