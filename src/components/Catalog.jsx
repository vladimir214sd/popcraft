import React, { useState } from 'react';
import { Search, Sparkles, ShoppingBag, Eye, SlidersHorizontal, Check, Star } from 'lucide-react';
import { CATEGORIES, CARDS_DATA } from '../data/cards';
import Card3DVisual from './Card3DVisual';

export default function Catalog({
  onAddToCart,
  onOpenCustomizer,
  onOpenQuickView,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [openedCardId, setOpenedCardId] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  // Filter & Search
  const filteredCards = CARDS_DATA.filter((card) => {
    const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.coverTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return b.rating - a.rating;
  });

  const handleCardClickToggle = (id) => {
    setOpenedCardId(openedCardId === id ? null : id);
  };

  const handleAddToCart = (card, e) => {
    e.stopPropagation();
    onAddToCart({
      ...card,
      quantity: 1,
      recipient: '',
      customText: '',
      envelopeColor: 'Крафтовый классический',
    });
    setAddedAnimationId(card.id);
    setTimeout(() => setAddedAnimationId(null), 1400);
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraft-100 text-kraft-800 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
          <span>Каталог 3D-открыток</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-paper-dark">
          Коллекция сюжетов и механик
        </h2>
        <p className="text-amber-900/70 text-sm sm:text-base leading-relaxed">
          Нажмите на открытку или наведите курсор, чтобы увидеть эффект 3D pop-up раскрытия прямо в каталоге.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? CARDS_DATA.length
                : CARDS_DATA.filter((c) => c.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-terracotta-600 text-white shadow-md shadow-terracotta-700/20'
                    : 'bg-white hover:bg-kraft-100 text-kraft-800 border border-kraft-200'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-terracotta-700 text-white' : 'bg-kraft-100 text-kraft-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-amber-700/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по сюжету, поводу или стилю..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-kraft-200 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 shadow-sm transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-kraft-800">
            <SlidersHorizontal className="w-4 h-4 text-kraft-600" />
            <span className="text-kraft-600">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-kraft-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-terracotta-500 cursor-pointer shadow-sm"
            >
              <option value="popular">По популярности и отзывам</option>
              <option value="price-asc">Сначала доступные</option>
              <option value="price-desc">Сначала премиальные</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="bg-white/80 p-12 text-center rounded-3xl border border-kraft-200 shadow-sm max-w-md mx-auto">
          <p className="text-base font-serif font-semibold text-paper-dark mb-1">
            Ничего не найдено
          </p>
          <p className="text-xs text-amber-900/60 mb-4">
            Попробуйте изменить запрос или выберите другую категорию
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-kraft-100 hover:bg-kraft-200 text-kraft-900 rounded-xl"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card) => {
            const isHovered = hoveredCardId === card.id;
            const isOpened = openedCardId === card.id;
            const openPercent = isOpened ? 100 : isHovered ? 75 : 0;
            const isAdded = addedAnimationId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group bg-white rounded-3xl border border-kraft-200/80 shadow-paper hover:shadow-paper-lg transition-all duration-300 flex flex-col overflow-hidden relative"
              >
                {/* Top Badges */}
                <div className="p-4 flex items-center justify-between z-10">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-kraft-100 text-kraft-800 border border-kraft-200">
                    {card.categoryLabel}
                  </span>
                  {card.tag && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800">
                      {card.tag}
                    </span>
                  )}
                </div>

                {/* 3D Interactive Card Preview Area */}
                <div
                  onClick={() => handleCardClickToggle(card.id)}
                  className="px-6 py-6 flex items-center justify-center cursor-pointer bg-kraft-50/50 min-h-[220px] relative overflow-hidden"
                  title="Нажмите, чтобы открыть или закрыть 3D-открытку"
                >
                  <Card3DVisual
                    card={card}
                    openPercent={openPercent}
                    size="small"
                  />

                  {/* Hint pill on hover */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] bg-paper-dark/80 text-white backdrop-blur px-2.5 py-1 rounded-full shadow">
                      {isOpened ? 'Нажмите, чтобы закрыть' : 'Нажмите, чтобы зафиксировать 3D'}
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-paper-dark">{card.rating}</span>
                      <span className="text-amber-800/50">({card.reviewsCount} отзывов)</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-paper-dark group-hover:text-terracotta-600 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs text-amber-900/70 mt-1 line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>

                    <p className="text-[11px] text-amber-800/60 font-mono mt-2">
                      Размер: {card.dimensions}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-kraft-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-2xl font-serif font-bold text-paper-dark">
                          {card.price} ₽
                        </span>
                        {card.oldPrice && (
                          <span className="text-xs text-amber-800/50 line-through ml-2">
                            {card.oldPrice} ₽
                          </span>
                        )}
                      </div>
                      {card.tierPrice15 && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                          от 15 шт: {card.tierPrice15} ₽/шт
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCustomizer(card);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-kraft-100 hover:bg-kraft-200 text-kraft-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                        <span>Надпись & Конверт</span>
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(card, e)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>В корзине!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>В корзину</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
