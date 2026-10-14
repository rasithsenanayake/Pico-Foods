import { contact } from '../data/contact';

export function formatRs(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US')}`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export function itemOrderLink(name: string, qty: number, price: number, deliveryAddress: string): string {
  return orderItemsLink([{ name, quantity: qty, price }], deliveryAddress);
}

export function orderItemsLink(items: OrderItem[], deliveryAddress: string): string {
  const formattedItems = items.map(({ name, quantity, price }) =>
    `${quantity} × ${name} — ${formatRs(price * quantity)}`
  );
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return whatsappLink(
    `Hi Pico! I'd like to place an order.\n\nOrder:\n${formattedItems.map((item) => `• ${item}`).join('\n')}\n\nTotal: ${formatRs(total)}\n\nDelivery address:\n${deliveryAddress}`
  );
}

export const generalOrderLink = whatsappLink(
  "Hi Pico!\n\nI'd like to place an order for delivery in Homagama.\n\nDelivery address:\n"
);
