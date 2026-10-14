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

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export function orderItemsLink(items: OrderItem[]): string {
  if (items.length === 1) {
    const item = items[0];
    return itemOrderLink(item.name, item.quantity, item.price);
  }

  const formattedItems = items.map(({ name, quantity, price }) =>
    `${quantity} × ${name} (${formatRs(price * quantity)})`
  );
  const order = formattedItems.length === 2
    ? formattedItems.join(' and ')
    : `${formattedItems.slice(0, -1).join(', ')}, and ${formattedItems[formattedItems.length - 1]}`;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return whatsappLink(
    `Hi Pico! I'd like to order ${order}. Total: ${formatRs(total)}. Delivery area: Homagama.`
  );
}

export const generalOrderLink = whatsappLink(
  "Hi Pico! I'd like to place an order for delivery in Homagama."
);
