import React from 'react';

/**
 * Biểu tượng Trống Đồng Đông Sơn mạ vàng đặc trưng
 */
export const DongSonDrumSVG: React.FC<{ className?: string }> = ({ className = "w-72 h-72" }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Họa tiết Trống Đồng Đông Sơn"
    >
      <defs>
        <radialGradient id="drumGoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </radialGradient>
        <linearGradient id="drumRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Outer Rings */}
      <circle cx="200" cy="200" r="190" stroke="url(#drumRingGrad)" strokeWidth="3" opacity="0.8" />
      <circle cx="200" cy="200" r="182" stroke="url(#drumRingGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="200" cy="200" r="172" stroke="url(#drumRingGrad)" strokeWidth="4" opacity="0.85" />
      <circle cx="200" cy="200" r="150" stroke="url(#drumRingGrad)" strokeWidth="2" opacity="0.75" />

      {/* Flying Lac Birds Ring (Chim Lạc) */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const x = 200 + 160 * Math.cos(angle);
        const y = 200 + 160 * Math.sin(angle);
        const rot = i * 30 + 90;
        return (
          <path
            key={i}
            d="M-8,0 L8,0 L4,-5 L0,-10 L-4,-5 Z"
            fill="url(#drumRingGrad)"
            opacity="0.85"
            transform={`translate(${x}, ${y}) rotate(${rot}) scale(1.1)`}
          />
        );
      })}

      {/* Middle Concentric Circles */}
      <circle cx="200" cy="200" r="130" stroke="url(#drumRingGrad)" strokeWidth="2.5" opacity="0.8" />
      <circle cx="200" cy="200" r="115" stroke="url(#drumRingGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="200" cy="200" r="95" stroke="url(#drumRingGrad)" strokeWidth="3" opacity="0.8" />
      <circle cx="200" cy="200" r="70" stroke="url(#drumRingGrad)" strokeWidth="2" opacity="0.7" />

      {/* Center 14-Point Star (Ngôi sao 14 cánh) */}
      <polygon
        points={
          [...Array(28)].map((_, i) => {
            const r = i % 2 === 0 ? 55 : 22;
            const angle = (i * (360 / 28) - 90) * (Math.PI / 180);
            return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
          }).join(' ')
        }
        fill="url(#drumGoldGrad)"
        stroke="#FEF3C7"
        strokeWidth="1.5"
      />

      <circle cx="200" cy="200" r="10" fill="#FFFBEB" opacity="0.9" />
    </svg>
  );
};

interface GrandHallBackdropProps {
  customBgUrl?: string | null;
}

export const GrandHallBackdrop: React.FC<GrandHallBackdropProps> = ({ customBgUrl }) => {
  const activeBg = customBgUrl || '/3.png';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
      {/* Full-bleed high-res background locked to /3.png (public/3.png) */}
      <img
        src={activeBg}
        alt="Sân khấu vinh danh Ban Cán Sự CEO NT02"
        className="w-full h-full object-cover object-center"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.indexOf('/3.png') === -1) {
            target.src = '/3.png';
          }
        }}
      />
      {/* Deep luxurious vignette scrim to darken background and maximize card contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80 backdrop-blur-[1px]" />
    </div>
  );
};
