import { contact } from '../data/contact';

export function formatRs(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US')}`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function itemOrderLink(name: string, qty: number, price: number): string {
  return whatsappLink(
    `Hi Pico! I'd like to order ${qty} × ${name} (${formatRs(price * qty)}). Delivery area: Homagama.`
  );
}

export const generalOrderLink = whatsappLink(
  "Hi Pico! I'd like to place an order for delivery in Homagama."
);