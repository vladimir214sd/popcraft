import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, Sliders, Type, Mail } from 'lucide-react';
import Card3DVisual from './Card3DVisual';

export default function CustomizerModal({ card, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !card) return null;

  const [recipient, setRecipient] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedEnvelope, setSelectedEnvelope] = useState('Классический крафт');
  const [waxSealColor, setWaxSealColor] = useState('Золото');
  const [openPercent, setOpenPercent] = useState(85);

  const ENVELOPE_OPTIONS = [
    { name: 'Классический крафт', color: '#BA9570', bgClass: 'bg-[#BA9570]' },
    { name: 'Глубокий изумруд', color: '#2D5A27', bgClass: 'bg-[#2D5A27]' },
    { name: 'Пудровый розовый', color: '#E8A598', bgClass: 'bg-[#E8A598]' },
    { name: 'Ночной сапфир', color: '#1B263B', bgClass: 'bg-[#1B263B]' },
  ];

  const WAX_OPTIONS = [
    { name: 'Золото', color: '#D4AF37' },
    { name: 'Винный бордо', color: '#800020' },
    { name: 'Хвойный изумруд', color: '#1B4332' },
  ];

  const handleSaveAndAdd = () => {
    onAddToCart({
      ...card,
      quantity: 1,
      recipient: recipient.trim(),
      customText: customMessage.trim(),
      envelopeColor: selectedEnvelope,
      waxSealColor: waxSealColor,
      isCustomized: Boolean(recipient || customMessage),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full border border-kraft-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-kraft-200 flex items-center justify-between bg-kraft-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-terracotta-100 text-terracotta-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-paper-dark">
                Персонализация: {card.title}
              </h3>
              <p className="text-xs text-amber-900/60">
                Создайте уникальное поздравление — каллиграф бережно нанесет его вручную
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-kraft-700 hover:bg-kraft-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto p-6 gap-8">
          
          {/* Left Column: Live 3D Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-kraft-50/60 rounded-2xl p-6 border border-kraft-200">
            <div className="w-full flex justify-between items-center mb-4 text-xs text-kraft-800">
              <span className="font-medium">Живой предпросмотр внутри:</span>
              <span className="font-mono text-terracotta-600 font-semibold">{Math.round((openPercent / 100) * 110)}°</span>
            </div>

            <div className="py-6 flex items-center justify-center min-h-[220px]">
              <Card3DVisual
                card={card}
                openPercent={openPercent}
                customRecipient={recipient}
                customText={customMessage}
                size="normal"
              />
            </div>

            {/* Slider to test opening */}
            <div className="w-full pt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={openPercent}
                onChange={(e) => setOpenPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
              />
              <div className="flex justify-between text-[10px] text-amber-800/60 mt-1">
                <span>Закрыть</span>
                <span>Раскрыть 3D</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-kraft-200 w-full text-xs space-y-1 text-amber-900/80">
              <div className="flex justify-between">
                <span>Конверт:</span>
                <span className="font-medium text-paper-dark">{selectedEnvelope}</span>
              </div>
              <div className="flex justify-between">
                <span>Сургучная печать:</span>
                <span className="font-medium text-paper-dark">{waxSealColor}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-5">
            {/* Recipient Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kraft-900 mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-terracotta-600" />
                Имя адресата (появится внутри)
              </label>
              <input
                type="text"
                placeholder="Например: Любимая мама, Для тебя, С праздником..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                maxLength={40}
                className="w-full px-4 py-2.5 rounded-xl border border-kraft-300 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200"
              />
            </div>

            {/* Personal Message */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-kraft-900">
                  Текст пожелания (рукописный шрифт)
                </label>
                <span className="text-[11px] text-kraft-600 font-mono">
                  {customMessage.length}/140
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Напишите искренние слова, которые мы аккуратно впишем каллиграфическим почерком..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                maxLength={140}
                className="w-full px-4 py-2.5 rounded-xl border border-kraft-300 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 resize-none font-serif"
              />
            </div>

            {/* Envelope Choice */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kraft-900 mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-terracotta-600" />
                Цвет дизайнерского конверта
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ENVELOPE_OPTIONS.map((env) => (
                  <button
                    key={env.name}
                    type="button"
                    onClick={() => setSelectedEnvelope(env.name)}
                    className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2.5 transition-all ${
                      selectedEnvelope === env.name
                        ? 'border-terracotta-600 bg-terracotta-50/50 font-semibold'
                        : 'border-kraft-200 hover:border-kraft-300 bg-white'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0" 
                      style={{ backgroundColor: env.color }}
                    />
                    <span className="truncate">{env.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wax Seal Choice */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kraft-900 mb-2">
                Цвет сургучной печати мастерской
              </label>
              <div className="flex gap-2">
                {WAX_OPTIONS.map((wax) => (
                  <button
                    key={wax.name}
                    type="button"
                    onClick={() => setWaxSealColor(wax.name)}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                      waxSealColor === wax.name
                        ? 'border-terracotta-600 bg-terracotta-50 font-semibold text-terracotta-900'
                        : 'border-kraft-200 hover:border-kraft-300 bg-white text-kraft-800'
                    }`}
                  >
                    {wax.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-kraft-50 border-t border-kraft-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-kraft-600">Итого за открытку с оформлением:</span>
            <span className="text-2xl font-serif font-bold text-paper-dark">{card.price} ₽</span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-kraft-300 text-xs font-medium text-kraft-800 hover:bg-kraft-100"
            >
              Отмена
            </button>
            <button
              onClick={handleSaveAndAdd}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Сохранить и в корзину</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
