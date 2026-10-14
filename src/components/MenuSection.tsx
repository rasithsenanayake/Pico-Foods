import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BowlCard } from './BowlCard';
import { categories, menuItems } from '../data/menu';
import type { MenuCategory } from '../types/menu';

type Filter = 'all' | MenuCategory;

const ease = [0.23, 1, 0.32, 1] as const;

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>('all');

  const tabs: Array<{id: Filter;label: string;}> = [{ id: 'all', label: 'All bowls' }, ...categories];
  const visible = filter === 'all' ? menuItems : menuItems.filter((item) => item.category === filter);
  const labelFor = (id: MenuCategory) => categories.find((c) => c.id === id)?.label ?? '';

  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 id="menu-title" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.1]">
              Our bowls
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Six bowls, each built around real ingredients and finished with our homemade signature sauce.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter bowls"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">

            {tabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`relative h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  active ? 'text-white' : 'bg-brand-soft text-brand hover:bg-brand-light'}`
                  }>

                  {active &&
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={{ duration: 0.25, ease }} />

                  }
                  <span className="relative">{tab.label}</span>
                </button>);

            })}
          </div>
        </div>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) =>
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease }}>

                <BowlCard item={item} categoryLabel={labelFor(item.category)} />
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>);

}
