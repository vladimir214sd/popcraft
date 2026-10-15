import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Catalog from './components/Catalog';
import TrustBento from './components/TrustBento';
import WeddingB2BCalculator from './components/WeddingB2BCalculator';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CustomizerModal from './components/CustomizerModal';
import { CARDS_DATA } from './data/cards';

export default function App() {
  // Local cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('popcraft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerCard, setCustomizerCard] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('popcraft_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => {
      // Check if item with identical customization exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.id === item.id &&
          i.recipient === item.recipient &&
          i.customText === item.customText &&
          i.envelopeColor === item.envelopeColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity || 1;
        return updated;
      }
      return [...prev, item];
    });

    showToast(`«${item.title}» добавлена в корзину!`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddBulkOrder = (bulkData) => {
    // Add to cart as a custom bulk line item
    const bulkItem = {
      id: `bulk-${Date.now()}`,
      title: `${bulkData.type} (${bulkData.quantity} шт)`,
      coverColor: '#283618',
      price: bulkData.grandTotal,
      quantity: 1,
      recipient: bulkData.clientName || 'Заказчик тиража',
      customText: `Срок готовности: ${bulkData.productionDays}. Контакт: ${bulkData.clientContact}`,
      envelopeColor: bulkData.includeWaxSeal ? 'Сургучная печать включена' : 'Без печати',
      isBulk: true,
    };
    handleAddToCart(bulkItem);
    setIsCartOpen(true);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-paper-cream selection:bg-terracotta-200 selection:text-terracotta-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-paper-dark text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-amber-300 hover:text-white"
          >
            В корзину
          </button>
        </div>
      )}

      {/* Top Banner for Urgent Gifting & Promo */}
      <div className="bg-gradient-to-r from-terracotta-700 via-amber-700 to-terracotta-800 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium shadow-sm">
        <span>✨ Дарите живые эмоции: промокод </span>
        <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded font-bold">POPCRAFT</span>
        <span> дарит скидку 15% на первый заказ. Отправка от 24 часов!</span>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizerWithDefault={() => setCustomizerCard(CARDS_DATA[0])}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Interactive 3D Card Stage */}
        <Hero3D
          onExploreCatalog={handleScrollToCatalog}
          onOpenCustomizer={(card) => setCustomizerCard(card)}
          onSelectCard={(card) => setCustomizerCard(card)}
        />

        {/* Catalog of 3D Cards with Filtering and Live Unfolding */}
        <Catalog
          onAddToCart={handleAddToCart}
          onOpenCustomizer={(card) => setCustomizerCard(card)}
        />

        {/* Bento Trust Section: Crash-test, Laser, Speed, Craft */}
        <section id="packaging-section">
          <TrustBento />
        </section>

        {/* Wedding Invitations & B2B Calculator (From 15 pcs) */}
        <WeddingB2BCalculator
          onAddBulkOrder={handleAddBulkOrder}
        />

        {/* Reviews Section: Customer feedback from CustDev */}
        <ReviewsSection />
      </main>

      {/* Team & Workshop Footer */}
      <Footer />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Personalization & Envelope Customizer Modal */}
      <CustomizerModal
        card={customizerCard}
        isOpen={Boolean(customizerCard)}
        onClose={() => setCustomizerCard(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
