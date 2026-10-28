'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { MenuItem } from '../types/menu';

interface MenuPhotoProps {
  item: MenuItem;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function MenuPhoto({ item, sizes, priority = false, className = '' }: MenuPhotoProps) {
  const [source, setSource] = useState(item.image);
  useEffect(() => setSource(item.image), [item.image]);

  return (
    <Image
      src={source}
      alt={item.imageAlt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (source !== item.fallbackImage) setSource(item.fallbackImage);
      }}
      className={`object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] ${className}`}
    />
  );
}
