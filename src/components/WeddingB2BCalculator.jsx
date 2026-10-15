import React, { useState } from 'react';
import { Calculator, CheckCircle2, Clock, Sparkles, Send, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WeddingB2BCalculator({ onAddBulkOrder }) {
  const [orderType, setOrderType] = useState('wedding'); // 'wedding' or 'corporate'
  const [quantity, setQuantity] = useState(25);
  const [includeWaxSeal, setIncludeWaxSeal] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pricing formula
  const baseSinglePrice = orderType === 'wedding' ? 380 : 390;
  
  // Tier discounts (reflecting our competitive advantage of small batches from 15 pcs)
  let discountPercent = 0;
  if (quantity >= 60) discountPercent = 45;
  else if (quantity >= 30) discountPercent = 35;
  else if (quantity >= 15) discountPercent = 25;
  else discountPercent = 10;

  const unitBasePrice = Math.round(baseSinglePrice * (1 - discountPercent / 100));
  const waxSealPricePerUnit = includeWaxSeal ? 25 : 0;
  const unitFinalPrice = unitBasePrice + waxSealPricePerUnit;
  const subtotal = unitFinalPrice * quantity;
  const urgentFee = isUrgent ? Math.round(subtotal * 0.2) : 0;
  const grandTotal = subtotal + urgentFee;

  const productionDays = isUrgent ? '3 рабочих дня' : '6–8 рабочих дней';

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!clientContact.trim()) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    if (onAddBulkOrder) {
      onAddBulkOrder({
        type: orderType === 'wedding' ? 'Свадебный тираж пригласительных' : 'Корпоративный B2B заказ',
        quantity,
        unitFinalPrice,
        grandTotal,
        productionDays,
        clientName,
        clientContact,
        includeWaxSeal,
        isUrgent,
      });
    }
  };

  return (
    <section id="bulk-calculator" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-white via-kraft-50 to-white rounded-3xl border border-kraft-200 shadow-paper-lg p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Decorative Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-kraft-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Калькулятор тиражей</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-paper-dark">
              Свадебные приглашения & B2B подарки
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/70 mt-1">
              Берем тиражи от 15 штук (в отличие от типографий с планкой 50+) со скидкой до 45% и бесплатным сигнальным образцом.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-kraft-100 p-1.5 rounded-2xl border border-kraft-200 self-start sm:self-center">
            <button
              onClick={() => setOrderType('wedding')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                orderType === 'wedding'
                  ? 'bg-white text-paper-dark shadow-sm'
                  : 'text-kraft-700 hover:text-paper-dark'
              }`}
            >
              💍 Свадьбы (от 15 шт)
            </button>
            <button
              onClick={() => setOrderType('corporate')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                orderType === 'corporate'
                  ? 'bg-white text-paper-dark shadow-sm'
                  : 'text-kraft-700 hover:text-paper-dark'
              }`}
            >
              🏢 B2B & Бренды
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quantity Slider */}
            <div className="bg-white p-6 rounded-2xl border border-kraft-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-semibold text-paper-dark">
                  Количество открыток в тираже:
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-terracotta-600">{quantity}</span>
                  <span className="text-xs text-kraft-600">штук</span>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2.5 bg-kraft-200 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
              />

              <div className="flex justify-between text-[11px] text-amber-900/60 font-mono">
                <span>10 шт</span>
                <span>15 шт (скидка 25%)</span>
                <span>30 шт (скидка 35%)</span>
                <span>60+ шт (скидка 45%)</span>
              </div>
            </div>

            {/* Options Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  includeWaxSeal 
                    ? 'bg-kraft-50/80 border-terracotta-500 shadow-sm' 
                    : 'bg-white border-kraft-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeWaxSeal}
                  onChange={(e) => setIncludeWaxSeal(e.target.checked)}
                  className="mt-0.5 rounded text-terracotta-600 focus:ring-terracotta-400"
                />
                <div>
                  <h4 className="text-xs font-semibold text-paper-dark">Сургучная печать с монограммой</h4>
                  <p className="text-[11px] text-amber-900/60 mt-0.5">+25 ₽ / шт (ручной оттиск)</p>
                </div>
              </label>

              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isUrgent 
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm' 
                    : 'bg-white border-kraft-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-400"
                />
                <div>
                  <h4 className="text-xs font-semibold text-paper-dark">Экспресс-сборка за 3 дня</h4>
                  <p className="text-[11px] text-amber-900/60 mt-0.5">Вне очереди для срочных дат (+20%)</p>
                </div>
              </label>
            </div>

            {/* Extra Benefits List */}
            <div className="bg-kraft-100/50 p-4 rounded-2xl border border-kraft-200 text-xs space-y-2 text-amber-900/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Бесплатная цветопроба и тестовый образец в руки перед запуском тиража</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Индивидуальная каллиграфия имен гостей или логотипа компании</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Фирменные конверты из кальки или плотного крафта входят в стоимость</span>
              </div>
            </div>

          </div>

          {/* Summary & Form Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-kraft-200 shadow-paper space-y-6">
            
            <div className="space-y-3 pb-6 border-b border-kraft-200">
              <div className="flex justify-between items-center text-xs text-kraft-700">
                <span>Базовая розничная цена:</span>
                <span className="line-through">{baseSinglePrice} ₽/шт</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium text-emerald-700">
                <span>Оптовая скидка за объем:</span>
                <span>-{discountPercent}%</span>
              </div>
              <div className="flex justify-between items-center text-xs text-kraft-800">
                <span>Цена за 1 открытку с конвертом:</span>
                <span className="font-semibold text-paper-dark">{unitFinalPrice} ₽</span>
              </div>
              <div className="flex justify-between items-center text-xs text-kraft-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Срок изготовления тиража:
                </span>
                <span className="font-semibold text-paper-dark">{productionDays}</span>
              </div>

              <div className="pt-3 border-t border-dashed border-kraft-200 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-paper-dark">Итоговая стоимость:</span>
                <span className="text-3xl font-serif font-bold text-terracotta-600">{grandTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">Заявка успешно принята!</h4>
                <p className="text-xs text-emerald-800">
                  Менеджер свяжется с вами в течение 15 минут для согласования деталей и бесплатного тестового макета.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-emerald-700 underline font-medium"
                >
                  Рассчитать другой тираж
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-kraft-800 mb-1">
                    Ваше имя или название компании:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Свадебная пара / Студия дизайна..."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-kraft-300 text-xs focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-kraft-800 mb-1">
                    Телефон или Telegram для связи:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (999) 000-00-00 или @username"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-kraft-300 text-xs focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Получить расчет и сигнальный образец</span>
                </button>

                <p className="text-[10px] text-center text-amber-900/50">
                  Без предоплаты до согласования первого физического образца
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
