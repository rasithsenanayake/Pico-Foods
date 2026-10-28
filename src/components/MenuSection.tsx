'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BowlCard } from './BowlCard';
import { BowlPreview } from './BowlPreview';
import { Logo } from './Logo';
import { cartKey, menuItems, menuSections } from '../data/menu';
import { formatRs, orderItemsLink } from '../utils/order';
import type { MenuItem, MenuOption } from '../types/menu';

export function MenuSection() {
  const reduceMotion = useReducedMotion();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, MenuOption['id']>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [order, setOrder] = useState<Record<string, number>>({});
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const [notification, setNotification] = useState('');
  const notificationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollers = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => () => {
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
  }, []);

  function notify(message: string) {
    setNotification(message);
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => setNotification(''), 2600);
  }

  function scrollCollection(id: string, direction: -1 | 1) {
    const el = scrollers.current[id];
    if (el) el.scrollBy({
      left: direction * Math.max(280, el.clientWidth * 0.8),
      behavior: reduceMotion ? 'instant' : 'smooth'
    });
  }

  const orderItems = menuItems.flatMap((item) =>
    item.options.flatMap((option) => {
      const id = cartKey(item.id, option.id);
      const quantity = order[id] ?? 0;
      return quantity > 0 ? [{
        id, name: item.name, optionLabel: item.options.length > 1 ? option.label : undefined,
        price: option.price, quantity
      }] : [];
    })
  );

  const orderTotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const orderCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-4 border-b border-line pb-8 sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">Fresh food, better days</p>
            <h2 id="menu-title" className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">Explore the menu</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              Discover your favourites, lighter choices, and meals for your goals.
            </p>
          </div>
          <Logo className="ml-auto w-24 sm:w-32" />
        </div>

        {menuSections.map((section) => (
          <div key={section.id} className="mt-12 sm:mt-16">
            <div className="mb-7">
              <h3 className="font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{section.title}</h3>
              {section.subtitle && <p className="mt-1 text-sm text-ink-muted">{section.subtitle}</p>}
            </div>

            <div className={section.id === 'everyday' ? 'grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2' : 'space-y-12'}>
              {section.collections.map((collection) => {
                const dishes = menuItems.filter((item) => item.category === collection.id);
                return (
                  <section key={collection.id} aria-labelledby={`collection-${collection.id}`} className={section.id === 'everyday' && collection.id === 'chicken' ? 'md:col-span-2' : ''}>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h4 id={`collection-${collection.id}`} className="font-sans text-lg font-bold tracking-tight text-brand sm:text-xl">
                        {collection.label}
                      </h4>
                      {dishes.length > 1 && (
                        <div className="flex items-center gap-2 sm:hidden">
                          <button type="button" onClick={() => scrollCollection(collection.id, -1)}
                            aria-label={`Scroll ${collection.label} backwards`}
                            className="grid h-10 w-10 place-items-center rounded-full border border-line text-brand focus-visible:ring-2 focus-visible:ring-brand">
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => scrollCollection(collection.id, 1)}
                            aria-label={`Scroll ${collection.label} forwards`}
                            className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white focus-visible:ring-2 focus-visible:ring-brand">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div
                      ref={(element) => { scrollers.current[collection.id] = element; }}
                      aria-label={`${collection.label} dishes`}
                      className={`-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-6 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 ${section.id === 'everyday' && collection.id !== 'chicken' ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
                    >
                      {dishes.map((item) => {
                        const selected = item.options.find((option) => option.id === selectedOptions[item.id]) ?? item.options[0];
                        const key = cartKey(item.id, selected.id);
                        const quantity = quantities[key] ?? order[key] ?? 1;
                        return (
                          <div key={item.id} className="w-[min(84vw,345px)] shrink-0 snap-start sm:w-auto">
                            <BowlCard
                              item={item}
                              selected={selected}
                              quantity={quantity}
                              orderQuantity={order[key]}
                              onOptionChange={(id) => setSelectedOptions((current) => ({ ...current, [item.id]: id }))}
                              onQuantityChange={(next) => setQuantities((current) => ({ ...current, [key]: next }))}
                              onPreview={() => setPreviewItem(item)}
                              onAddToOrder={() => {
                                setOrder((current) => ({ ...current, [key]: quantity }));
                                notify(`${item.name} (${selected.label}) added to your order`);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {dishes.length > 1 && <p className="mt-1 text-xs text-ink-muted sm:hidden">Swipe to discover more dishes</p>}
                  </section>
                );
              })}
            </div>
          </div>
        ))}

        {orderItems.length > 0 && (
          <button type="button" onClick={() => document.getElementById('menu-order')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
            aria-label={`View your order with ${orderCount} items`}
            className="fixed bottom-24 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-xl md:bottom-6">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            View order
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold tabular-nums text-brand">{orderCount}</span>
          </button>
        )}

        <AnimatePresence>
          {notification && (
            <motion.p key={notification} role="status"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-40 left-4 right-4 z-50 rounded-xl bg-ink px-5 py-3 text-center text-sm font-medium text-white shadow-xl md:bottom-6 md:left-6 md:right-auto">
              {notification}
            </motion.p>
          )}
        </AnimatePresence>

        {orderItems.length > 0 && (
          <section id="menu-order" aria-labelledby="menu-order-title" className="mt-16 scroll-mt-24 rounded-[26px] border border-line bg-brand-soft p-5 sm:p-8">
            <h3 id="menu-order-title" className="flex items-center gap-2 font-sans text-xl font-bold text-ink">
              <ShoppingBag className="h-5 w-5 text-brand" aria-hidden="true" />
              Your order <span className="text-sm font-medium text-ink-muted">({orderCount})</span>
            </h3>
            <ul className="mt-4 divide-y divide-line">
              {orderItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{item.quantity} × {item.name}</p>
                    {item.optionLabel && <p className="mt-0.5 text-xs text-ink-muted">{item.optionLabel}</p>}
                  </div>
                  <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-ink">{formatRs(item.quantity * item.price)}</span>
                  <button type="button" aria-label={`Remove ${item.name}${item.optionLabel ? ` ${item.optionLabel}` : ''}`}
                    onClick={() => setOrder((current) => { const next = { ...current }; delete next[item.id]; return next; })}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-white hover:text-brand focus-visible:ring-2 focus-visible:ring-brand">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-line pt-4">
              <p className="flex items-center justify-between text-base font-bold">
                <span>Total</span><span className="tabular-nums text-brand">{formatRs(orderTotal)}</span>
              </p>
              <label htmlFor="delivery-address" className="mt-5 block text-sm font-semibold">Delivery address</label>
              <input id="delivery-address" value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)}
                maxLength={200} autoComplete="street-address" placeholder="House number, street, area"
                className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand" />
              <p className="mt-2 text-xs text-ink-muted">Required to place your WhatsApp order.</p>
              <a
                href={deliveryAddress.trim() ? orderItemsLink(orderItems, deliveryAddress.trim()) : undefined}
                target="_blank" rel="noopener noreferrer"
                aria-disabled={!deliveryAddress.trim()}
                tabIndex={deliveryAddress.trim() ? 0 : -1}
                className={`mt-4 inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white sm:w-auto ${deliveryAddress.trim() ? 'bg-brand hover:bg-brand-dark' : 'cursor-not-allowed bg-brand/50'}`}
              >Order on WhatsApp</a>
            </div>
          </section>
        )}
      </div>
      <BowlPreview item={previewItem} onClose={() => setPreviewItem(null)} />
    </section>
  );
}
