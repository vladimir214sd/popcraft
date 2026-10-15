import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Checkout form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState('courier'); // 'courier' or 'pickup'
  const [completedOrder, setCompletedOrder] = useState(null);

  // Totals
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const deliveryFee = rawSubtotal >= 900 || deliveryType === 'pickup' ? 0 : 190;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'POPCRAFT' || code === 'PERM' || code === 'START') {
      setDiscountPercent(15);
      setPromoError('');
    } else {
      setPromoError('Промокод не найден. Попробуйте промокод POPCRAFT (-15%)');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const orderNumber = `PC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleString('ru-RU'),
      customerName,
      phone,
      deliveryType,
      deliveryAddress: deliveryType === 'courier' ? deliveryAddress : 'Самовывоз из мастерской',
      items: [...items],
      total: grandTotal,
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('popcraft_orders') || '[]');
      localStorage.setItem('popcraft_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {}

    setCompletedOrder(newOrder);
    setStep('success');
    onClearCart();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-kraft-200 relative">
          
          {/* Header */}
          <div className="p-6 border-b border-kraft-200 flex items-center justify-between bg-kraft-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-terracotta-100 text-terracotta-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-paper-dark">
                  {step === 'cart' && 'Ваша корзина'}
                  {step === 'checkout' && 'Оформление заказа'}
                  {step === 'success' && 'Заказ подтвержден!'}
                </h3>
                <p className="text-xs text-kraft-600">
                  {step === 'cart' && `${items.reduce((s, i) => s + i.quantity, 0)} товаров`}
                  {step === 'checkout' && 'Быстрое демо-оформление'}
                  {step === 'success' && 'Спасибо за доверие!'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-kraft-700 hover:bg-kraft-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART LIST */}
          {step === 'cart' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-kraft-300 mx-auto" />
                    <h4 className="font-serif font-bold text-lg text-paper-dark">Корзина пуста</h4>
                    <p className="text-xs text-kraft-600 max-w-xs mx-auto">
                      Выберите одну из наших объемных открыток в каталоге и оживите ее персональной надписью
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-kraft-100 hover:bg-kraft-200 text-kraft-900 text-xs font-semibold"
                    >
                      Перейти к открыткам
                    </button>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="p-4 rounded-2xl border border-kraft-200 bg-kraft-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                            style={{ backgroundColor: item.coverColor || '#BA9570' }}
                          >
                            3D
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-bold text-paper-dark leading-snug">
                              {item.title}
                            </h4>
                            <span className="text-xs text-kraft-700 font-semibold">
                              {item.price} ₽
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-kraft-400 hover:text-red-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details Tag */}
                      {(item.recipient || item.customText || item.envelopeColor) && (
                        <div className="p-2.5 rounded-xl bg-white border border-kraft-200 text-[11px] space-y-1 text-amber-900/80">
                          {item.recipient && (
                            <div>
                              <span className="font-medium text-paper-dark">Кому: </span>
                              <span>{item.recipient}</span>
                            </div>
                          )}
                          {item.customText && (
                            <div className="italic text-amber-800 line-clamp-1">
                              «{item.customText}»
                            </div>
                          )}
                          {item.envelopeColor && (
                            <div className="text-[10px] text-kraft-600">
                              Конверт: {item.envelopeColor}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-kraft-200 p-1">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="p-1 rounded hover:bg-kraft-100 text-kraft-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-semibold text-paper-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1 rounded hover:bg-kraft-100 text-kraft-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-serif font-bold text-sm text-paper-dark">
                          {item.price * item.quantity} ₽
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-kraft-200 bg-white space-y-4">
                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-kraft-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Промокод (напр. POPCRAFT)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-kraft-200 uppercase focus:outline-none focus:border-terracotta-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-2 bg-kraft-100 hover:bg-kraft-200 text-kraft-900 rounded-xl text-xs font-semibold"
                      >
                        Применить
                      </button>
                    </div>
                    {discountPercent > 0 && (
                      <p className="text-[11px] text-emerald-700 font-medium">
                        ✓ Промокод применен: скидка {discountPercent}%
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-600">{promoError}</p>
                    )}
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-kraft-700 pt-2 border-t border-dashed border-kraft-200">
                    <div className="flex justify-between">
                      <span>Сумма заказа:</span>
                      <span>{rawSubtotal} ₽</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Скидка по промокоду:</span>
                        <span>-{discountAmount} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Доставка по городу:</span>
                      <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-paper-dark pt-2 border-t border-kraft-200">
                      <span>К оплате:</span>
                      <span className="text-terracotta-600">{grandTotal} ₽</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full py-3.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Перейти к оформлению</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === 'checkout' && (
            <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between">
              <div className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-medium text-kraft-800 mb-1">
                    Ваше имя:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Имя получателя"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-kraft-300 text-xs focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-kraft-800 mb-1">
                    Телефон или Telegram для подтверждения:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-kraft-300 text-xs focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-xs font-medium text-kraft-800 mb-1.5">
                    Способ получения:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('courier')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        deliveryType === 'courier'
                          ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-900 font-semibold'
                          : 'border-kraft-200 bg-white'
                      }`}
                    >
                      Курьером (24ч)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-900 font-semibold'
                          : 'border-kraft-200 bg-white'
                      }`}
                    >
                      Самовывоз (0 ₽)
                    </button>
                  </div>
                </div>

                {deliveryType === 'courier' && (
                  <div>
                    <label className="block text-xs font-medium text-kraft-800 mb-1">
                      Адрес доставки:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Город, улица, дом, квартира"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-kraft-300 text-xs focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                )}

                <div className="p-3 bg-kraft-50 rounded-xl border border-kraft-200 text-[11px] text-amber-900/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Оплата при получении после проверки целостности открытки в руках</span>
                </div>
              </div>

              <div className="p-6 border-t border-kraft-200 bg-white space-y-3">
                <div className="flex justify-between text-base font-serif font-bold text-paper-dark">
                  <span>Итого к оплате:</span>
                  <span className="text-terracotta-600">{grandTotal} ₽</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-3 rounded-xl border border-kraft-300 text-xs font-semibold text-kraft-800 hover:bg-kraft-100"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Подтвердить заказ</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS SCREEN */}
          {step === 'success' && completedOrder && (
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="text-center space-y-3 pt-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <Sparkles className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-paper-dark">
                  Заказ оформлен!
                </h3>
                <p className="text-xs text-amber-900/70 max-w-xs mx-auto">
                  Номер вашего заказа: <span className="font-mono font-bold text-terracotta-700">{completedOrder.orderId}</span>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-kraft-50 p-5 rounded-2xl border border-kraft-200 text-xs space-y-3">
                <div className="flex justify-between border-b border-kraft-200 pb-2 text-kraft-700 font-medium">
                  <span>Получатель:</span>
                  <span className="text-paper-dark">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-kraft-200 pb-2 text-kraft-700 font-medium">
                  <span>Телефон:</span>
                  <span className="text-paper-dark">{completedOrder.phone}</span>
                </div>
                <div className="flex justify-between border-b border-kraft-200 pb-2 text-kraft-700 font-medium">
                  <span>Доставка:</span>
                  <span className="text-paper-dark">{completedOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between pt-1 font-serif font-bold text-base text-paper-dark">
                  <span>Сумма к оплате:</span>
                  <span className="text-terracotta-600">{completedOrder.total} ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 text-center">
                  ✨ Мастерская уже готовит дизайнерский картон и передаст открытку в сборку
                </div>

                <button
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-kraft-900 hover:bg-black text-white font-medium text-xs sm:text-sm shadow-md"
                >
                  Вернуться на сайт
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
