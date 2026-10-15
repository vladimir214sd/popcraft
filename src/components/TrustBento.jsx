import React from 'react';
import { ShieldCheck, Zap, Scissors, HeartHandshake, Package, Sparkles } from 'lucide-react';

export default function TrustBento() {
  return (
    <section className="py-16 sm:py-24 bg-kraft-100/60 border-y border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraft-200/80 text-kraft-900 text-xs font-medium uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Стандарты мастерской PopCraft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-paper-dark">
            Почему наши открытки доходят в идеале и вызывают мурашки
          </h2>
          <p className="text-sm sm:text-base text-amber-900/70">
            Мы изучили сотни отзывов и учли главные страхи покупателей: замятие углов при доставке и задержки перед праздником.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1 (Large 2 cols): Packaging & Crash-test */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-kraft-200 shadow-paper hover:shadow-paper-lg transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-paper-dark">
                Бронебойная упаковка: 0% риска замятия
              </h3>

              <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
                Каждая открытка упаковывается в трехслойный твердый микрокартон с ребрами жесткости, водонепроницаемый конверт и мягкую тишью-бумагу. 
                Даже если курьер уронит посылку — открытка приедет с идеальными острыми углами.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-kraft-100 flex items-center gap-4 text-xs font-medium text-emerald-800">
              <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ✓ Гарантия целостности или замена за наш счет
              </span>
            </div>
          </div>

          {/* Card 2: Speed / Urgent Gifting */}
          <div className="bg-white rounded-3xl p-8 border border-kraft-200 shadow-paper hover:shadow-paper-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-paper-dark">
                Срочная сборка за 3 часа
              </h3>

              <p className="text-xs text-amber-900/70 leading-relaxed">
                Подарок нужен уже сегодня вечером? Склад готовых тиражей позволяет каллиграфу подписать и отправить открытку курьером в течение нескольких часов.
              </p>
            </div>

            <div className="mt-4 text-[11px] font-mono text-terracotta-700 bg-terracotta-50 p-2.5 rounded-xl border border-terracotta-100">
              ⚡ Отправка день в день при заказе до 16:00
            </div>
          </div>

          {/* Card 3: Laser Precision */}
          <div className="bg-white rounded-3xl p-8 border border-kraft-200 shadow-paper hover:shadow-paper-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-paper-dark">
                Лазерная резка 0.15 мм
              </h3>

              <p className="text-xs text-amber-900/70 leading-relaxed">
                Ювелирная филигранность узоров. До 120 микроскопических прорезей на одном листе без нагара и с идеальными краями благодаря оптике CO2-лазера.
              </p>
            </div>

            <div className="mt-4 text-[11px] text-kraft-700 font-mono bg-kraft-50 p-2.5 rounded-xl border border-kraft-200">
              Плотность картона: 300–320 г/м²
            </div>
          </div>

          {/* Card 4: Paper & Materials */}
          <div className="bg-white rounded-3xl p-8 border border-kraft-200 shadow-paper hover:shadow-paper-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-paper-dark">
                Итальянский картон Fedrigoni
              </h3>

              <p className="text-xs text-amber-900/70 leading-relaxed">
                Приятная шелковистая тактильность. Бумага не желтеет и сохраняет упругость шарнирных pop-up механизмов более 10 лет.
              </p>
            </div>

            <div className="mt-4 text-xs text-kraft-800 font-serif italic">
              «Открытку сохраняют на полке как арт-объект»
            </div>
          </div>

          {/* Card 5 (Large 3 cols): Hand Assembled with Care */}
          <div className="md:col-span-3 bg-white rounded-3xl p-8 border border-kraft-200 shadow-paper hover:shadow-paper-lg transition-all flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-terracotta-700 font-medium text-xs">
                <HeartHandshake className="w-4 h-4" />
                <span>Мастерство ручного бигования</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-paper-dark">
                100% ручная сборка каждого объемного механизма
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/70 max-w-xl">
                Робот не может аккуратно заправить крошечные клапаны и протестировать плавность раскрытия. Мастер собирает каждую открытку вручную и проверяет троекратным циклом открытия.
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="text-center bg-kraft-50 px-4 py-3 rounded-2xl border border-kraft-200">
                <div className="text-xl font-serif font-bold text-terracotta-700">10 000+</div>
                <div className="text-[10px] text-amber-900/70 uppercase">циклов открытия</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
