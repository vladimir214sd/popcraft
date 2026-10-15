import React from 'react';
import { Box, Heart, MapPin, Mail, Phone, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-paper-dark text-amber-100/90 pt-16 pb-12 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-900/30">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta-600 flex items-center justify-center text-white shadow">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                PopCraft
              </span>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">
              Крафтовая мастерская объемных 3D Pop-up открыток и приглашений ручной сборки. Лазерная резка, дизайнерский картон 300 г/м² и персональная каллиграфия.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300/80">
              <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
              <span>г. Пермь • Доставка по всей России</span>
            </div>
          </div>

          {/* Catalog Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Популярные коллекции
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/70">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">🍄 Лесная поляна и грибы</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">🌸 Сакура и журавли</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">🎂 Винтажный праздничный торт</a></li>
              <li><a href="#bulk-calculator" className="hover:text-white transition-colors">💍 Свадебные приглашения (от 15 шт)</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">🐻 Авторская серия «Пермь»</a></li>
            </ul>
          </div>

          {/* Team & Project Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-4 h-4 text-terracotta-400" />
              <span>Команда проекта (РИС-23-4)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <p className="font-medium text-white">Product Management</p>
                <p className="text-[11px] text-amber-300/60">CustDev & Концепция продукта</p>
              </div>
              <div>
                <p className="font-medium text-white">Бизнес-аналитика</p>
                <p className="text-[11px] text-amber-300/60">Финмодель & Юнит-экономика</p>
              </div>
              <div>
                <p className="font-medium text-white">Frontend-разработка</p>
                <p className="text-[11px] text-amber-300/60">3D-механики & Архитектура MVP</p>
              </div>
              <div>
                <p className="font-medium text-white">Дизайн & Маркетинг</p>
                <p className="text-[11px] text-amber-300/60">Pop-up макеты & Воронка продаж</p>
              </div>
            </div>
            <p className="text-[10px] text-amber-200/50 pt-2 border-t border-white/5 font-mono">
              Прототип MVP: Веб-витрина с 3D-механикой раскрытия и каталогом кастомизации
            </p>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60 gap-4">
          <p>© 2026 PopCraft Studio. Все права защищены.</p>
          <p className="flex items-center gap-1.5">
            <span>Сделано с любовью к деталям и бумажному искусству</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-400 fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
}
