import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BowlCard } from './BowlCard';
import { categories, menuItems } from '../data/menu';
import { formatRs, orderItemsLink } from '../utils/order';
import type { MenuCategory } from '../types/menu';

type Filter = 'all' | MenuCategory;

const ease = [0.23, 1, 0.32, 1] as const;

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [order, setOrder] = useState<Record<string, number>>({});

  const tabs: Array<{id: Filter;label: string;}> = [{ id: 'all', label: 'All bowls' }, ...categories];
  const visible = filter === 'all' ? menuItems : menuItems.filter((item) => item.category === filter);
  const labelFor = (id: MenuCategory) => categories.find((c) => c.id === id)?.label ?? '';
  const orderItems = menuItems
    .filter((item) => order[item.id] > 0)
    .map((item) => ({ ...item, quantity: order[item.id] }));
  const orderTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

        {orderItems.length > 0 &&
        <section aria-labelledby="menu-order-title" className="mt-8 rounded-2xl bg-brand-soft p-4 ring-1 ring-line sm:p-5">
          <h3 id="menu-order-title" className="font-display text-xl font-semibold text-ink">Your order</h3>
          <ul className="mt-3 divide-y divide-line">
            {orderItems.map((item) =>
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0">
              <span className="min-w-0 flex-1 text-sm text-ink">{item.quantity} × {item.name}</span>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-medium tabular-nums text-ink">{formatRs(item.price * item.quantity)}</span>
                <button
                  type="button"
                  onClick={() => setOrder((current) => {
                    const next = { ...current };
                    delete next[item.id];
                    return next;
                  })}
                  aria-label={`Remove ${item.name} from your order`}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink-muted transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  Remove
                </button>
              </div>
            </li>
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-ink">Total <span className="ml-2 tabular-nums">{formatRs(orderTotal)}</span></p>
            <a
              href={orderItemsLink(orderItems)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto">
              Order on WhatsApp
            </a>
          </div>
        </section>
        }

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) =>
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease }}>

                <BowlCard
                  item={item}
                  categoryLabel={labelFor(item.category)}
                  quantity={quantities[item.id] ?? order[item.id] ?? 1}
                  orderQuantity={order[item.id]}
                  onQuantityChange={(quantity) => setQuantities((current) => ({ ...current, [item.id]: quantity }))}
                  onAddToOrder={() => setOrder((current) => ({ ...current, [item.id]: quantities[item.id] ?? current[item.id] ?? 1 }))} />
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>);

}
