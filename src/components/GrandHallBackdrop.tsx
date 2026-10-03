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
  const [bgFailed, setBgFailed] = React.useState(false);
  const activeBg = customBgUrl || '/members/bg%201.jfif';

  // Theo dõi vị trí cuộn trang để tự động lia camera xuống dưới thấy rõ mặt mọi người ở đáy trang
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (activeBg && !bgFailed) {
    // Khi ở đỉnh trang: thấy trần đèn sân khấu (0%). Khi cuộn xuống hết trang: lia xuống 92% thấy trọn vẹn mặt mọi người
    const panY = scrollProgress * 92;

    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Full-bleed high-res background photo: public/members/bg 1.jfif */}
        <img
          src={activeBg}
          alt="Sân khấu vinh danh Ban Cán Sự CEO NT02"
          className="w-full h-full object-cover transition-[object-position] duration-300 ease-out"
          style={{
            objectPosition: `center ${panY}%`,
          }}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('bg%201.jfif')) {
              target.src = '/bg-1.jfif';
            } else {
              setBgFailed(true);
            }
          }}
        />

        {/* Lớp phủ chuyển sắc thông minh: Đỉnh trang tối nhẹ để tương phản chữ, Đáy trang trong suốt sáng rõ để thấy mặt mọi người */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Lớp làm sáng nhẹ nhàng ở đáy trang */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-transparent via-slate-950/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A1224] select-none">
      {/* City Skyline at Dusk through large floor-to-ceiling windows */}
      <div className="absolute top-0 inset-x-0 h-[45%] bg-gradient-to-b from-[#0F1C3F] via-[#152754] to-[#1E3A8A]">
        {/* Sky glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-400/15 blur-[120px] rounded-full" />

        {/* Skyline buildings silhouettes */}
        <div className="absolute bottom-6 inset-x-0 flex items-end justify-between px-10 opacity-30">
          <div className="w-16 h-28 bg-slate-900 rounded-t" />
          <div className="w-24 h-40 bg-slate-900 rounded-t" />
          <div className="w-12 h-20 bg-slate-900 rounded-t" />
          {/* Illuminated Ferris wheel silhouette */}
          <div className="w-36 h-36 rounded-full border-2 border-cyan-400/40 border-dashed animate-spin [animation-duration:120s]" />
          <div className="w-20 h-48 bg-slate-900 rounded-t" />
          <div className="w-28 h-32 bg-slate-900 rounded-t" />
          <div className="w-16 h-44 bg-slate-900 rounded-t" />
        </div>
      </div>

      {/* Crystal Lotus Chandelier Hanging in top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        {/* Chandelier cord */}
        <div className="w-1 h-12 bg-gradient-to-b from-amber-200/80 to-amber-300" />
        {/* Lotus Chandelier Aura */}
        <div className="w-56 h-40 bg-gradient-to-b from-amber-100/30 via-amber-300/20 to-transparent blur-[30px] rounded-full" />
      </div>

      {/* Architectural Glass & Lateral HUD panels */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-36 border-r border-cyan-500/20 bg-gradient-to-r from-blue-950/40 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-36 border-l border-cyan-500/20 bg-gradient-to-l from-blue-950/40 to-transparent" />

      {/* Perspective Runway Floor with Floor Lights */}
      <div className="absolute bottom-0 inset-x-0 h-[65%] bg-gradient-to-t from-[#080D1A] via-[#0E1A36] to-transparent">
        {/* Central Royal Blue & Marble Runway */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] max-w-4xl h-full bg-gradient-to-t from-[#132752] to-[#1E3A8A]/50 border-x-2 border-amber-400/40 shadow-2xl">
          {/* Side Floor Neon Strip Lights */}
          <div className="absolute inset-y-0 left-0 w-1 bg-amber-300/80 shadow-[0_0_15px_#F59E0B]" />
          <div className="absolute inset-y-0 right-0 w-1 bg-amber-300/80 shadow-[0_0_15px_#F59E0B]" />

          {/* Dong Son Drum Gold Inlay on Floor */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-75 transform perspective-[800px] rotateX(45deg) scale(1.1)">
            <DongSonDrumSVG className="w-[320px] h-[320px] md:w-[420px] md:h-[420px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
