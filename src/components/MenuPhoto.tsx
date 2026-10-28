'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import type { MenuItem } from '../types/menu';

interface MenuPhotoProps {
  item: MenuItem;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function MenuPhoto({ item, sizes, priority = false, className = '' }: MenuPhotoProps) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [item.image]);

  if (failed) return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f9faf6] p-6">
      <Logo className="w-24 opacity-85" />
      <span className="text-xs font-medium text-ink-muted">Food photo coming soon</span>
    </div>
  );

  return (
    <Image
      src={item.image}
      alt={item.imageAlt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] ${className}`}
    />
  );
}
