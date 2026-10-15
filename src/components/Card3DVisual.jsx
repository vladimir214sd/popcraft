import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Card3DVisual({
  card,
  openPercent = 100, // 0 (closed) to 100 (fully open)
  customRecipient = '',
  customText = '',
  envelopeColor = '#BA9570',
  className = '',
  size = 'normal' // 'small', 'normal', 'large'
}) {
  // Normalize angle: 0deg when closed, up to 110deg when fully open
  const angle = (openPercent / 100) * 110;
  const isOpen = openPercent > 10;
  const popupScale = Math.min(1, Math.max(0, (openPercent - 20) / 80));

  const sizeClasses = {
    small: 'w-64 h-48',
    normal: 'w-80 h-56 sm:w-96 sm:h-64',
    large: 'w-88 h-64 sm:w-[440px] sm:h-[320px]',
  }[size] || 'w-80 h-56 sm:w-96 sm:h-64';

  const renderPopupContent = () => {
    switch (card.popupType) {
      case 'forest':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Background trees & fern silhouette */}
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-10px)` }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
                {/* Fern leaves */}
                <path d="M40 120 C 30 70, 70 40, 90 30 C 80 50, 65 80, 70 120 Z" fill="#2D5A27" opacity="0.8" />
                <path d="M180 120 C 190 70, 150 40, 130 30 C 140 50, 155 80, 150 120 Z" fill="#2D5A27" opacity="0.8" />
                
                {/* Large Boletus / King mushroom */}
                <path d="M95 125 L100 80 Q105 75 115 75 Q125 75 130 80 L135 125 Z" fill="#F4E8C1" stroke="#8E684E" strokeWidth="2" />
                <path d="M85 80 Q115 40 145 80 Q115 72 85 80 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
                
                {/* Amanita / Red Mushroom */}
                <path d="M55 125 L60 90 Q65 88 72 88 Q78 88 82 90 L85 125 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
                <path d="M45 92 Q70 55 95 92 Q70 85 45 92 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                {/* Dots on red mushroom */}
                <circle cx="60" cy="78" r="3.5" fill="#FFFFFF" />
                <circle cx="75" cy="72" r="4" fill="#FFFFFF" />
                <circle cx="85" cy="82" r="3" fill="#FFFFFF" />
                <circle cx="70" cy="85" r="2.5" fill="#FFFFFF" />

                {/* Little snail */}
                <circle cx="160" cy="115" r="10" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
                <path d="M152 122 C 165 122, 172 122, 175 118" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Pop-up foreground grass */}
            <div 
              className="absolute bottom-2 inset-x-4 flex justify-between text-emerald-800 transition-all duration-300"
              style={{ transform: `scale(${popupScale}) translateY(0px)` }}
            >
              <span className="text-xs font-serif italic bg-amber-50/90 px-2 py-0.5 rounded shadow border border-amber-200">
                🍄 Живой лесной pop-up
              </span>
            </div>
          </div>
        );

      case 'sakura':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-12px)` }}
            >
              <svg width="240" height="160" viewBox="0 0 240 160" fill="none">
                {/* Trunk */}
                <path d="M115 140 Q118 100 110 85 Q100 70 95 55" stroke="#5C3D2E" strokeWidth="6" strokeLinecap="round" />
                <path d="M110 85 Q130 75 145 65" stroke="#5C3D2E" strokeWidth="4" strokeLinecap="round" />
                <path d="M110 85 Q105 65 118 45" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
                
                {/* Sakura cloud clusters */}
                <ellipse cx="85" cy="50" rx="28" ry="20" fill="#FBCFE8" opacity="0.9" />
                <ellipse cx="120" cy="40" rx="32" ry="22" fill="#F472B6" opacity="0.85" />
                <ellipse cx="150" cy="58" rx="25" ry="18" fill="#FDA4AF" opacity="0.9" />
                <ellipse cx="105" cy="62" rx="26" ry="18" fill="#F9A8D4" opacity="0.95" />

                {/* Flying Origami Cranes */}
                <path d="M40 40 L52 46 L62 38 L54 50 Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1" />
                <path d="M185 30 L198 37 L208 28 L200 42 Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1" />
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-rose-800 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-rose-50/90 px-2 py-0.5 rounded shadow border border-rose-200">
                🌸 Нежные лепестки сакуры
              </span>
            </div>
          </div>
        );

      case 'cake':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-10px)` }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
                {/* Tier 1 (bottom) */}
                <rect x="50" y="95" width="120" height="35" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                <path d="M50 105 Q70 115 90 105 Q110 115 130 105 Q150 115 170 105" stroke="#F59E0B" strokeWidth="3" fill="none" />
                
                {/* Tier 2 (middle) */}
                <rect x="68" y="65" width="84" height="30" rx="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                <path d="M68 74 Q89 82 110 74 Q131 82 152 74" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
                
                {/* Tier 3 (top) */}
                <rect x="85" y="42" width="50" height="23" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                
                {/* Candles & Flames */}
                <line x1="97" y1="42" x2="97" y2="28" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="97" cy="23" r="4" fill="#F59E0B" className="animate-pulse" />
                
                <line x1="110" y1="42" x2="110" y2="25" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                <circle cx="110" cy="20" r="4.5" fill="#F59E0B" className="animate-pulse" />
                
                <line x1="123" y1="42" x2="123" y2="28" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                <circle cx="123" cy="23" r="4" fill="#F59E0B" className="animate-pulse" />
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-amber-900 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-amber-50/90 px-2 py-0.5 rounded shadow border border-amber-200">
                🎂 3-ярусный праздничный торт
              </span>
            </div>
          </div>
        );

      case 'wedding':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-12px)` }}
            >
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
                {/* Wedding Arch */}
                <path d="M50 140 L50 70 Q110 15 170 70 L170 140" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
                
                {/* Leaf garlands on arch */}
                <ellipse cx="60" cy="65" rx="8" ry="14" fill="#3F6212" transform="rotate(-25 60 65)" />
                <ellipse cx="80" cy="40" rx="8" ry="14" fill="#65A30D" transform="rotate(-40 80 40)" />
                <ellipse cx="110" cy="28" rx="14" ry="8" fill="#4D7C0F" />
                <ellipse cx="140" cy="40" rx="8" ry="14" fill="#65A30D" transform="rotate(40 140 40)" />
                <ellipse cx="160" cy="65" rx="8" ry="14" fill="#3F6212" transform="rotate(25 160 65)" />

                {/* White roses */}
                <circle cx="85" cy="42" r="7" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
                <circle cx="110" cy="28" r="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
                <circle cx="135" cy="42" r="7" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />

                {/* Entwined Golden Rings */}
                <circle cx="104" cy="78" r="11" stroke="#F59E0B" strokeWidth="3" fill="none" />
                <circle cx="116" cy="78" r="11" stroke="#F59E0B" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-emerald-900 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-emerald-50/90 px-2 py-0.5 rounded shadow border border-emerald-200">
                🌿 Изумрудная свадебная арка
              </span>
            </div>
          </div>
        );

      case 'balloon':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-14px)` }}
            >
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
                {/* Mountain ridges behind */}
                <polygon points="20,135 65,75 110,135" fill="#94A3B8" />
                <polygon points="90,135 140,65 190,135" fill="#64748B" />
                <polygon points="120,65 140,65 130,80" fill="#FFFFFF" />

                {/* Hot air balloon */}
                <ellipse cx="105" cy="45" rx="30" ry="36" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                <path d="M85 45 Q105 15 125 45" stroke="#F59E0B" strokeWidth="4" fill="none" />
                <path d="M92 45 Q105 25 118 45" stroke="#EF4444" strokeWidth="4" fill="none" />

                {/* Basket ropes and basket */}
                <line x1="95" y1="80" x2="98" y2="92" stroke="#78350F" strokeWidth="1.5" />
                <line x1="115" y1="80" x2="112" y2="92" stroke="#78350F" strokeWidth="1.5" />
                <rect x="96" y="92" width="18" height="12" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />

                {/* Clouds */}
                <ellipse cx="50" cy="115" rx="25" ry="12" fill="#FFFFFF" opacity="0.9" />
                <ellipse cx="165" cy="110" rx="30" ry="14" fill="#FFFFFF" opacity="0.9" />
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-sky-900 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-sky-50/90 px-2 py-0.5 rounded shadow border border-sky-200">
                🎈 Аэростат над вершинами
              </span>
            </div>
          </div>
        );

      case 'city':
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-10px)` }}
            >
              <svg width="230" height="150" viewBox="0 0 230 150" fill="none">
                {/* Perm Bear silhouette */}
                <path d="M75 110 Q85 85 105 85 Q115 85 125 90 Q135 88 140 95 L145 110 L135 110 L130 102 L110 102 L105 110 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
                {/* Red book/silver on bear back (Perm coat of arms tribute) */}
                <rect x="106" y="80" width="12" height="10" rx="2" fill="#DC2626" />
                
                {/* Kama River waves */}
                <path d="M20 125 Q50 115 80 125 T140 125 T200 125" stroke="#0284C7" strokeWidth="3" fill="none" />
                <path d="M30 135 Q60 127 90 135 T150 135 T210 135" stroke="#38BDF8" strokeWidth="2" fill="none" />
                
                {/* Famous quote sign "СЧАСТЬЕ НЕ ЗА ГОРАМИ" */}
                <rect x="40" y="45" width="150" height="24" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
                <text x="115" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="0.8">
                  СЧАСТЬЕ НЕ ЗА ГОРАМИ
                </text>
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-stone-900 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-amber-50/90 px-2 py-0.5 rounded shadow border border-amber-200">
                🐻 Пермские мотивы & Река Кама
              </span>
            </div>
          </div>
        );

      default:
        // Space / Generic Pop-up
        return (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className="absolute transition-transform duration-300 origin-bottom"
              style={{ transform: `scale(${popupScale}) translateY(-10px)` }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
                {/* Saturn Planet */}
                <circle cx="65" cy="55" r="18" fill="#FBBF24" />
                <ellipse cx="65" cy="55" rx="32" ry="8" stroke="#F59E0B" strokeWidth="3" fill="none" transform="rotate(-20 65 55)" />

                {/* Rocket */}
                <path d="M140 30 Q160 50 150 80 L130 75 Q125 50 140 30 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
                <circle cx="140" cy="52" r="5" fill="#60A5FA" stroke="#1E40AF" strokeWidth="1.5" />
                {/* Rocket fire */}
                <polygon points="128,76 138,79 130,95" fill="#F59E0B" />

                {/* Stars */}
                <polygon points="110,25 112,32 119,34 113,38 115,45 109,40 104,44 106,37 101,33 108,32" fill="#FCD34D" />
                <polygon points="180,55 181,60 186,61 182,64 183,69 179,66 175,69 176,64 172,61 177,60" fill="#FCD34D" />
              </svg>
            </div>
            <div 
              className="absolute bottom-2 text-indigo-950 transition-all duration-300"
              style={{ transform: `scale(${popupScale})` }}
            >
              <span className="text-xs font-serif italic bg-slate-900/90 text-amber-200 px-2 py-0.5 rounded shadow border border-amber-300/40">
                ✨ Космическая pop-up ракета
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative select-none perspective-1500 ${sizeClasses} ${className}`}>
      {/* Underlying shadow matching card orientation */}
      <div 
        className="absolute inset-0 rounded-2xl bg-amber-950/20 blur-xl transition-all duration-500"
        style={{
          transform: isOpen ? 'translateY(18px) scale(0.95)' : 'translateY(6px) scale(0.9)',
          opacity: 0.15 + (openPercent / 100) * 0.25
        }}
      />

      {/* Outer Card Container */}
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        {/* RIGHT / BASE FLAP (Stays flat or tilts gently) */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden border border-amber-200/60 shadow-lg transition-transform duration-500 origin-left"
          style={{
            backgroundColor: card.innerBg || '#FAF7F2',
          }}
        >
          {/* Subtle paper grid lines & fold crease in middle */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/5 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-amber-900/15 to-transparent pointer-events-none" />

          {/* Custom Inscription / Text if provided */}
          <div className="absolute bottom-3 right-4 max-w-[50%] text-right z-10 pointer-events-none">
            {customRecipient && (
              <p className="text-xs font-serif italic font-semibold text-amber-900 truncate">
                Дорогой(-ая) {customRecipient},
              </p>
            )}
            {customText ? (
              <p className="text-[11px] font-serif text-amber-800 line-clamp-2 leading-tight">
                "{customText}"
              </p>
            ) : (
              <p className="text-[10px] text-amber-700/60 font-serif italic">
                {card.coverTitle || 'PopCraft Studio'}
              </p>
            )}
          </div>

          {/* POP-UP 3D OBJECTS GROWING UP IN THE CENTER */}
          {renderPopupContent()}
        </div>

        {/* LEFT / COVER FLAP (Folds open along the spine at angle) */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden transition-transform duration-700 origin-left transform-style-3d border border-amber-900/20 shadow-xl"
          style={{
            backgroundColor: card.coverColor || '#8E684E',
            transform: `rotateY(-${angle}deg)`,
            zIndex: angle > 90 ? 1 : 20,
          }}
        >
          {/* Front of the Cover (visible when closed) */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-white backface-hidden">
            {/* Elegant foiled border */}
            <div className="absolute inset-2 border border-amber-200/40 rounded-lg pointer-events-none" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] uppercase tracking-widest text-amber-200 font-medium">
                PopCraft • 3D Edition
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 opacity-80" />
            </div>

            <div className="my-auto text-center z-10 px-2">
              <h4 className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-amber-50 drop-shadow">
                {card.title}
              </h4>
              <p className="text-xs text-amber-100/80 font-serif italic mt-1">
                {card.coverTitle}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-amber-200/90 z-10">
              <span>{card.categoryLabel}</span>
              <span className="flex items-center gap-1">
                Откройте меня ✨
              </span>
            </div>

            {/* Subtle paper grain overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Back of the cover flap (visible when card is opened beyond 90°) */}
          <div 
            className="absolute inset-0 p-4 bg-amber-50 flex flex-col justify-between text-amber-900 border-r border-amber-200"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-xs uppercase tracking-wider text-amber-700/70 font-mono">
              Ручная сборка
            </div>
            <div className="text-center font-serif italic text-sm text-amber-950 px-3">
              «Дарите не просто открытку, а живую эмоцию и воспоминание»
            </div>
            <div className="text-[10px] text-amber-600 text-right">
              PopCraft №{card.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
