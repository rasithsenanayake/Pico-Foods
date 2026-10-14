export function animateBowl(source: HTMLImageElement | null, target: () => HTMLElement | null) {
  if (!source || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const origin = source.getBoundingClientRect();
  const image = source.cloneNode() as HTMLImageElement;
  requestAnimationFrame(() => {
    const cart = target();
    if (!cart) return;
    const destination = cart.getBoundingClientRect();
    const x = origin.left + origin.width / 2 - 40;
    const y = Math.max(16, Math.min(window.innerHeight - 96, origin.top + origin.height / 2 - 40));
    const dx = destination.left + destination.width / 2 - 40 - x;
    const dy = destination.top + destination.height / 2 - 40 - y;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:80px;height:80px;object-fit:cover;border-radius:50%;pointer-events:none;z-index:60;box-shadow:0 12px 28px #17241b33`;
    document.body.append(image);
    const flight = image.animate([
      { transform: 'translate(0, 0) scale(0.8)', opacity: 0 },
      { transform: 'translate(0, -32px) scale(1.1) rotate(-8deg)', opacity: 1, offset: 0.25 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2) rotate(12deg)`, opacity: 0 },
    ], { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
    flight.finished.then(() => {
      image.remove();
      if (cart.isConnected) cart.animate([
        { transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' },
      ], { duration: 240 });
    }, () => image.remove());
  });
}
