import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      author: 'Артём & Полина',
      role: 'Подарок на годовщину',
      text: 'Искал подарок девушке, все цветочные открытки казались шаблонными. Взял с цветущей сакурой — когда она открыла створку, из нее буквально распахнулось живое дерево! Стоит теперь на самом видном месте на тумбочке.',
      rating: 5,
      date: '3 дня назад',
      verified: true,
      cardTitle: 'Цветущая Сакура и Белые Журавли',
    },
    {
      id: 2,
      author: 'Марина Соколова',
      role: 'Подарок маме на 55 лет',
      text: 'Главный мой страх при заказе объемных вещей через интернет — замятые углы (уже был горький опыт). Но здесь упаковка реально бронебойная, с жестким микрокартоном. Каллиграф аккуратно вписал все наши теплые слова. Мама плакала от счастья!',
      rating: 5,
      date: 'Неделю назад',
      verified: true,
      cardTitle: 'Лесная Сказка и Грибная Поляна',
    },
    {
      id: 3,
      author: 'София & Даниил',
      role: 'Свадебный тираж (18 приглашений)',
      text: 'Обычные типографии требовали тираж от 50 шт, а нам нужно было ровно 18 для самых близких. Мастерская PopCraft согласилась сделать индивидуальный тираж с нашими именами и датой. Доставили за 4 дня в красивых конвертах с золотым сургучом!',
      rating: 5,
      date: '2 недели назад',
      verified: true,
      cardTitle: 'Изумрудная Свадебная Арка Эвкалипта',
    },
  ];

  return (
    <section id="reviews-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraft-100 text-kraft-900 text-xs font-semibold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
          <span>Живые эмоции получателей</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-paper-dark">
          Истории тех, кто подарил вау-эффект
        </h2>
        <p className="text-sm sm:text-base text-amber-900/70">
          98.4% наших клиентов отмечают, что открытку не убирают в ящик, а оставляют как украшение интерьера.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-8 border border-kraft-200/80 shadow-paper hover:shadow-paper-lg transition-all flex flex-col justify-between relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-kraft-500 font-mono">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-paper-dark leading-relaxed font-sans italic">
                «{rev.text}»
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-kraft-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-paper-dark flex items-center gap-1.5">
                  <span>{rev.author}</span>
                  {rev.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Подтвержденный заказ" />
                  )}
                </h4>
                <p className="text-[11px] text-kraft-600">{rev.role}</p>
                <p className="text-[10px] text-terracotta-700 font-medium mt-0.5">
                  {rev.cardTitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
