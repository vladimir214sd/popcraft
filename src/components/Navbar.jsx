import React from 'react';
import { ShoppingBag, Sparkles, Box, Phone, Heart } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenCustomizerWithDefault,
}) {
  return (
    <header className="sticky top-0 z-40 bg-paper-cream/90 backdrop-blur-md border-b border-amber-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-terracotta-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-terracotta-700/20 group-hover:scale-105 transition-transform">
                <Box className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-paper-dark leading-none">
                  PopCraft
                </span>
                <span className="text-[10px] uppercase tracking-widest text-kraft-700 font-medium">
                  3D Pop-Up Studio
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-kraft-800 tracking-wide">
            <a href="#catalog-section" className="hover:text-terracotta-600 transition-colors">
              Каталог открыток
            </a>
            <a href="#bulk-calculator" className="hover:text-terracotta-600 transition-colors">
              Свадебные тиражи & B2B
            </a>
            <a href="#packaging-section" className="hover:text-terracotta-600 transition-colors">
              Краш-тест упаковки
            </a>
            <a href="#reviews-section" className="hover:text-terracotta-600 transition-colors">
              Отзывы гостей
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Customizer Quick Button */}
            <button
              onClick={onOpenCustomizerWithDefault}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-kraft-100 hover:bg-kraft-200 text-kraft-900 text-xs font-semibold border border-kraft-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Персонализировать</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-xs shadow-md shadow-terracotta-700/20 flex items-center gap-2 transition-all"
              aria-label="Корзина"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-terracotta-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
