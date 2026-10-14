'use client';

import { DeliveryNotice } from './components/DeliveryNotice';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { HowToOrder } from './components/HowToOrder';
import { Footer } from './components/Footer';
import { MobileOrderBar } from './components/MobileOrderBar';

export function App() {
  return (
    <div className="min-h-screen w-full bg-cream pb-[76px] font-sans text-ink md:pb-0">
      <DeliveryNotice />
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <HowToOrder />
      </main>
      <Footer />
      <MobileOrderBar />
    </div>);

}
