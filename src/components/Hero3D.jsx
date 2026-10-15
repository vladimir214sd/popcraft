import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Layers, Sliders, Play, RotateCcw } from 'lucide-react';
import Card3DVisual from './Card3DVisual';
import { CARDS_DATA } from '../data/cards';
import confetti from 'canvas-confetti';

export default function Hero3D({ onExploreCatalog, onOpenCustomizer, onSelectCard }) {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [openPercent, setOpenPercent] = useState(90);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);

  const demoCards = CARDS_DATA.slice(0, 4);
  const currentCard = demoCards[selectedDemoIndex];

  const handleToggleOpen = () => {
    if (openPercent < 50) {
      setOpenPercent(100);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setOpenPercent(0);
    }
  };

  const handleAnimateCycle = () => {
    setIsAutoAnimating(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      // Cycle from open to closed to open
      const p = Math.round(50 + 50 * Math.sin((step * Math.PI) / 12));
      setOpenPercent(p);
      if (step >= 24) {
        clearInterval(interval);
        setOpenPercent(95);
        setIsAutoAnimating(false);
      }
    }, 80);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-200/50">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-terracotta-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & UVP */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kraft-100 border border-kraft-300 text-kraft-900 text-xs sm:text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 text-terracotta-600" />
              <span>Крафтовая мастерская pop-up открыток и приглашений</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-paper-dark leading-[1.1] tracking-tight">
              Открытки, которые <br />
              <span className="text-terracotta-600 italic">оживают в руках</span> при раскрытии
            </h1>

            <p className="text-base sm:text-lg text-amber-900/80 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Создаем трехмерные объемные открытки и свадебные приглашения с эффектом книжки-раскладушки. 
              Лазерная микрорезка до 0.15 мм, плотный дизайнерский картон 300 г/м² и ручная сборка.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-base shadow-lg shadow-terracotta-700/20 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              >
                <span>Выбрать в каталоге</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenCustomizer(currentCard)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-kraft-50 text-kraft-900 border border-kraft-300 font-medium text-base shadow-paper transition-all hover:border-kraft-400"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Персонализировать открытку</span>
              </button>
            </div>

            {/* Trust Badges based on CustDev findings */}
            <div className="pt-6 border-t border-amber-200/60 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-paper-dark">Не помнется</h4>
                  <p className="text-[11px] sm:text-xs text-amber-900/70">Бронебойный крафт-короб</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-paper-dark">Срочно от 24ч</h4>
                  <p className="text-[11px] sm:text-xs text-amber-900/70">Для подарков «на завтра»</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-800 shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-paper-dark">Тиражи от 15 шт</h4>
                  <p className="text-[11px] sm:text-xs text-amber-900/70">Для свадеб и бизнеса</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Card Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-paper-lg relative">
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-kraft-700 bg-kraft-100 px-2.5 py-1 rounded-md">
                  Интерактивный 3D-тест
                </span>
                <button
                  onClick={handleToggleOpen}
                  className="text-xs text-terracotta-600 hover:text-terracotta-700 font-medium underline flex items-center gap-1 cursor-pointer"
                >
                  {openPercent < 50 ? 'Распахнуть открытку' : 'Прикрыть створку'}
                </button>
              </div>

              {/* 3D Physical Card Display */}
              <div className="py-6 flex justify-center items-center min-h-[250px] sm:min-h-[290px]">
                <Card3DVisual
                  card={currentCard}
                  openPercent={openPercent}
                  size="normal"
                />
              </div>

              {/* Interactive Controls */}
              <div className="space-y-4 pt-4 border-t border-amber-100">
                {/* Angle Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs text-amber-900/80 mb-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-amber-700" />
                      Угол раскрытия створок
                    </span>
                    <span className="font-mono text-terracotta-600 font-semibold">{Math.round((openPercent / 100) * 110)}° ({openPercent}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={openPercent}
                    onChange={(e) => setOpenPercent(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
                  />
                  <div className="flex justify-between text-[10px] text-amber-800/60 mt-1">
                    <span>Закрыта (0°)</span>
                    <span>Полуоткрыта (45°)</span>
                    <span>Полный 3D объём (110°)</span>
                  </div>
                </div>

                {/* Switch Demo Cards */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-amber-900/70 font-semibold mb-2">
                    Выберите сюжет для демонстрации:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {demoCards.map((demo, idx) => (
                      <button
                        key={demo.id}
                        onClick={() => setSelectedDemoIndex(idx)}
                        className={`p-2 rounded-xl text-center text-[11px] font-medium transition-all ${
                          selectedDemoIndex === idx
                            ? 'bg-kraft-200 border-2 border-kraft-600 text-kraft-900 font-semibold shadow-sm'
                            : 'bg-kraft-50 hover:bg-kraft-100 text-kraft-700 border border-kraft-200'
                        }`}
                      >
                        <div className="truncate">{demo.title.split(' ')[0]}</div>
                        <div className="text-[9px] opacity-75">{demo.price} ₽</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto animation button */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleAnimateCycle}
                    disabled={isAutoAnimating}
                    className="flex-1 py-2 px-3 text-xs bg-kraft-100 hover:bg-kraft-200 text-kraft-900 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Авто-анимация раскрытия</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCard(currentCard);
                      onOpenCustomizer(currentCard);
                    }}
                    className="py-2 px-3 text-xs bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Заказать эту</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
