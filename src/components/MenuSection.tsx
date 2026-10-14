import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ShoppingCartIcon } from 'lucide-react';
import { BowlCard } from './BowlCard';
import { BowlPreview } from './BowlPreview';
import { categories, menuItems } from '../data/menu';
import { formatRs, orderItemsLink } from '../utils/order';
import type { MenuCategory, MenuItem } from '../types/menu';

type Filter = 'all' | MenuCategory;

const ease = [0.23, 1, 0.32, 1] as const;

export function MenuSection() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [order, setOrder] = useState<Record<string, number>>({});
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const [notification, setNotification] = useState('');
  const notificationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tabs: Array<{id: Filter;label: string;}> = [{ id: 'all', label: 'All bowls' }, ...categories];
  const visible = filter === 'all' ? menuItems : menuItems.filter((item) => item.category === filter);
  const labelFor = (id: MenuCategory) => categories.find((c) => c.id === id)?.label ?? '';
  const orderItems = menuItems
    .filter((item) => order[item.id] > 0)
    .map((item) => ({ ...item, quantity: order[item.id] }));
  const orderTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const orderCount = orderItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => () => {
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
  }, []);

  const notify = (message: string) => {
    setNotification(message);
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => setNotification(''), 2400);
  };

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

        <AnimatePresence initial={false}>
        {orderItems.length > 0 &&
        <motion.section key="order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, filter: reduceMotion ? "none" : "blur(8px)" }} transition={{ duration: reduceMotion ? 0 : 0.3 }} id="menu-order" aria-labelledby="menu-order-title" className="mt-8 rounded-2xl bg-brand-soft p-4 ring-1 ring-line sm:p-5">
          <h3 id="menu-order-title" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
            <ShoppingCartIcon className="h-5 w-5 text-brand" aria-hidden="true" />
            Your order
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-2 font-sans text-xs font-semibold text-white" aria-live="polite" aria-atomic="true">{orderCount}</span>
          </h3>
          <ul className="mt-3 divide-y divide-line">
            <AnimatePresence initial={false}>
            {orderItems.map((item) =>
            <motion.li layout={!reduceMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.8, y: reduceMotion ? 0 : -12, filter: reduceMotion ? "none" : "blur(8px)" }} transition={{ duration: reduceMotion ? 0 : 0.3 }} key={item.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0">
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
            </motion.li>
            )}
            </AnimatePresence>
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-ink">Total <span className="ml-2 tabular-nums">{formatRs(orderTotal)}</span></p>
            <div className="w-full sm:max-w-sm">
              <label htmlFor="delivery-address" className="mb-1.5 block text-sm font-medium text-ink">Delivery address <span className="font-normal text-ink-muted">(required)</span></label>
              <input
                id="delivery-address"
                type="text"
                autoComplete="street-address"
                maxLength={200}
                required
                value={deliveryAddress}
                onChange={(event) => setDeliveryAddress(event.target.value)}
                placeholder="House number, street, area"
                className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              />
              <p className="mt-1 text-xs text-ink-muted">Your address is included in the WhatsApp order.</p>
            </div>
            <a
              href={deliveryAddress.trim() ? orderItemsLink(orderItems, deliveryAddress.trim()) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!deliveryAddress.trim()}
              tabIndex={deliveryAddress.trim() ? 0 : -1}
              className={`inline-flex h-11 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto ${deliveryAddress.trim() ? 'bg-brand hover:bg-brand-dark active:scale-[0.97]' : 'cursor-not-allowed bg-brand/50'}`}>
              Order on WhatsApp
            </a>
          </div>
        </motion.section>
        }
        </AnimatePresence>

        {orderItems.length > 0 &&
        <button
          type="button"
          onClick={() => document.getElementById('menu-order')?.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
          })}
          aria-controls="menu-order"
          aria-label={`View your order, ${orderCount} ${orderCount === 1 ? 'item' : 'items'}`}
          className="fixed bottom-24 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:bottom-6">
          <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
          <span>Your order</span>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand" aria-hidden="true">{orderCount}</span>
        </button>
        }

        <AnimatePresence>
          {notification &&
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-40 left-4 right-4 z-50 flex justify-center rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-white shadow-lg md:bottom-6 md:left-6 md:right-auto">
            {notification}
          </motion.p>
          }
        </AnimatePresence>

        <motion.ul layout className="mt-10 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) =>
            <motion.li
              key={item.id}
              className="h-full"
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
                  onPreview={() => setPreviewItem(item)}
                  onAddToOrder={() => {
                    const quantity = quantities[item.id] ?? order[item.id] ?? 1;
                    setOrder((current) => ({ ...current, [item.id]: quantity }));
                    notify(order[item.id] ? `Updated ${item.name} in your order` : `Added ${item.name} to your order`);
                  }} />
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>
        <BowlPreview
          item={previewItem}
          categoryLabel={previewItem ? labelFor(previewItem.category) : ''}
          onClose={() => setPreviewItem(null)} />
      </div>
    </section>);

}
