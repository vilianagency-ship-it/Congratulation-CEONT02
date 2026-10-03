import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoGroupQuanTri, LogoCEONT02, RibbonEmblem } from './Logos';
import { Award, Sparkles, Users, Building2, ChevronDown, Share2 } from './icons';
import { launchOpeningFireworks } from '../utils/fireworks';
import { FloatingReactionOverlay, FloatingItem } from './FloatingReactionOverlay';

interface HeroSectionProps {
  onScrollToMembers: () => void;
  onScrollToWishes: () => void;
  theme?: 'dark' | 'light';
  onUploadBg?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToMembers,
  onScrollToWishes,
  theme = 'dark',
  onUploadBg
}) => {
  const isLight = theme === 'light';

  // 1. Bộ đếm lượt bắn pháo hoa - Khởi tạo từ 0
  const [fireworksCount, setFireworksCount] = useState<number>(() => {
    const saved = localStorage.getItem('ceont02_fireworks_count_v0');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showPlusOneFirework, setShowPlusOneFirework] = useState(false);

  // 2. Bộ đếm Thả Tim Cổ Vũ - Khởi tạo từ 0
  const [heartsCount, setHeartsCount] = useState<number>(() => {
    const saved = localStorage.getItem('ceont02_hearts_count_v0');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showPlusOneHeart, setShowPlusOneHeart] = useState(false);

  // 3. Bộ đếm Tặng Hoa Chúc Mừng - Khởi tạo từ 0
  const [flowersCount, setFlowersCount] = useState<number>(() => {
    const saved = localStorage.getItem('ceont02_flowers_count_v0');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showPlusOneFlower, setShowPlusOneFlower] = useState(false);

  // Mảng hiệu ứng bay nổi biểu cảm
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  const handleRemoveFloatingItem = (id: string) => {
    setFloatingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const spawnFloatingReactions = (
    e: React.MouseEvent<HTMLButtonElement>,
    emojis: string[]
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top;

    const newItems: FloatingItem[] = Array.from({ length: 8 }).map((_, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random()}`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      startX: originX + (Math.random() - 0.5) * 40,
      startY: originY,
      deltaX: (Math.random() - 0.5) * 160,
      deltaY: Math.random() * 220 + 160,
      rotate: (Math.random() - 0.5) * 60,
      scale: Math.random() * 0.4 + 0.9,
      duration: Math.random() * 0.4 + 1.1,
    }));

    setFloatingItems((prev) => [...prev, ...newItems]);
  };

  const handleFireworkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    launchOpeningFireworks();
    setFireworksCount(prev => {
      const next = prev + 1;
      localStorage.setItem('ceont02_fireworks_count_v0', String(next));
      localStorage.setItem('ceont02_fireworks_count', String(next));
      return next;
    });
    setShowPlusOneFirework(true);
    setTimeout(() => setShowPlusOneFirework(false), 800);
  };

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnFloatingReactions(e, ['❤️', '💖', '💝', '💕', '✨', '🔥']);
    setHeartsCount(prev => {
      const next = prev + 1;
      localStorage.setItem('ceont02_hearts_count_v0', String(next));
      localStorage.setItem('ceont02_hearts_count', String(next));
      return next;
    });
    setShowPlusOneHeart(true);
    setTimeout(() => setShowPlusOneHeart(false), 800);
  };

  const handleFlowerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnFloatingReactions(e, ['💐', '🌸', '🌺', '🌷', '🌻', '🌹', '✨']);
    setFlowersCount(prev => {
      const next = prev + 1;
      localStorage.setItem('ceont02_flowers_count_v0', String(next));
      localStorage.setItem('ceont02_flowers_count', String(next));
      return next;
    });
    setShowPlusOneFlower(true);
    setTimeout(() => setShowPlusOneFlower(false), 800);
  };

  const triggerConfetti = () => {
    launchOpeningFireworks();
  };

  return (
    <section className="relative pt-0 pb-6 md:pb-10 overflow-hidden w-full">
      <div className="relative w-full px-1 sm:px-2 md:px-4">
        {/* Top Header with 2 Logos - Hoàn toàn không khung, trắng sáng bừng trên nền tối */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-1 sm:mb-2 w-full pt-1 px-1 sm:px-3"
        >
          {/* Logo 1: Group Quản Trị & Khởi Nghiệp - Bản Trắng Sáng Bừng, To Lớn, Không Bị Cắt Chữ */}
          <div className="flex items-center">
            <LogoGroupQuanTri theme={isLight ? 'light' : 'dark'} size="xl" variant="white" />
          </div>

          {/* Logo 2: CEONT02 - Bản Trắng Sáng Bừng, Vừa Vặn Tinh Tế */}
          <div className="flex items-center">
            <LogoCEONT02 theme={isLight ? 'light' : 'dark'} size="md" variant="white" />
          </div>
        </motion.div>

        {/* Main Banner Lockup - Đẩy hàng chúc mừng lên cao */}
        <div className="text-center w-full max-w-7xl mx-auto mt-0 sm:mt-1 px-1 sm:px-2">
          {/* Main Title - Cực kỳ to, uy quyền, tráng lệ & rực rỡ không khí chúc mừng */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="w-full text-center relative"
          >
            {/* Vùng hào quang chúc mừng ấm áp chiếu sáng rực rỡ từ tâm */}
            <div
              className="absolute left-1/2 -top-6 -translate-x-1/2 w-[340px] sm:w-[650px] h-[160px] sm:h-[240px] bg-gradient-to-r from-amber-400/25 via-amber-200/40 to-amber-400/25 rounded-full blur-3xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Huy hiệu vinh danh chúc mừng chính thức */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/30 to-amber-500/25 border border-amber-400/60 shadow-[0_0_24px_rgba(245,158,11,0.45)] text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>LỄ RA MẮT &amp; VINH DANH CHÍNH THỨC</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>

            {/* Handwriting calligraphy 'Chúc mừng' tỏa sáng rực rỡ sắc vàng kim champagne & trắng */}
            <span className="block mb-0.5 sm:mb-1">
              <span
                className="font-handwriting font-bold normal-case text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[7.5rem] inline-block transform -rotate-2 select-none tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-50 to-amber-200 drop-shadow-[0_0_30px_rgba(255,235,160,0.85)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight whitespace-nowrap"
              >
                Chúc mừng
              </span>
            </span>

            {/* Chữ BAN CÁN SỰ LỚP CEO NT02 màu vàng chuyển sắc - CÙNG 1 HÀNG TO ĐỈNH CAO */}
            <span className="block uppercase tracking-tight font-black leading-tight sm:leading-none py-1 sm:py-2 whitespace-nowrap text-[clamp(1.35rem,5.1vw,5.6rem)]">
              <span className="gold-gradient-text drop-shadow-[0_0_35px_rgba(245,158,11,0.65)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] inline-block whitespace-nowrap">
                BAN CÁN SỰ LỚP CEO NT02
              </span>
            </span>

            {/* Chữ Chính thức nhận nhiệm vụ màu trắng với dải tia vàng hai bên */}
            <span className="inline-flex items-center justify-center gap-3 mt-2 sm:mt-3 text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider sm:tracking-widest text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] whitespace-nowrap">
              <span className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-amber-400 hidden sm:inline-block" aria-hidden="true" />
              <span>Chính thức nhận nhiệm vụ</span>
              <span className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-amber-400 hidden sm:inline-block" aria-hidden="true" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`mt-3 sm:mt-4 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-white font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
            }`}
          >
            <span className="block">
              Đội ngũ 10 nhà lãnh đạo tiêu biểu đại diện cho trí tuệ, tinh thần phụng sự và ngọn lửa tiên phong của tập thể doanh nhân
            </span>
            <strong className="block mt-1 font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              CEO NT02 — Group Quản Trị &amp; Khởi Nghiệp.
            </strong>
          </motion.p>

          {/* Motto / Slogan pill-less clean text - Chuyển toàn bộ xám sang TRẮNG RÕ RÀNG */}
          <div className={`mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-wider uppercase ${
            isLight ? 'text-slate-700' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
          }`}>
            <span>Sẻ chia Tri thức</span>
            <span aria-hidden="true" className={isLight ? 'text-slate-400' : 'text-amber-400 font-bold'}>·</span>
            <span>Nâng tầm Quản trị</span>
            <span aria-hidden="true" className={isLight ? 'text-slate-400' : 'text-amber-400 font-bold'}>·</span>
            <span>Kiến tạo Tương lai</span>
          </div>

          {/* Action CTAs & Celebratory Interaction Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4"
          >
            {/* Row 1: Các nút điều hướng chính */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onScrollToMembers}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Xem Danh Sách 10 Lãnh Đạo</span>
              </button>

              <button
                onClick={() => {
                  triggerConfetti();
                  onScrollToWishes();
                }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Gửi Lời Chúc Mừng</span>
              </button>
            </div>

            {/* Row 2: Thanh Tương Tác Chúc Mừng Hân Hoan: Thả Tim - Tặng Hoa - Bắn Pháo Hoa */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1">
              {/* Nút 1: ❤️ Thả Tim Cổ Vũ */}
              <button
                onClick={handleHeartClick}
                className="relative px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 select-none bg-gradient-to-r from-rose-500/25 via-pink-500/25 to-rose-500/25 hover:from-rose-500/40 hover:to-pink-500/40 text-rose-200 hover:text-white border border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.3)] backdrop-blur-md"
                title="Thả tim yêu thương cổ vũ tân Ban Cán Sự"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-base animate-pulse">❤️</span>
                  <span>Thả Tim</span>
                </span>
                <span className="ml-0.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm">
                  {heartsCount.toLocaleString()}
                </span>

                <AnimatePresence>
                  {showPlusOneHeart && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -28, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="absolute -top-4 right-2 text-xs font-black text-rose-300 bg-slate-900/95 border border-rose-400/80 px-2 py-0.5 rounded-full pointer-events-none shadow-xl z-30"
                    >
                      +1 ❤️
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Nút 2: 💐 Tặng Hoa Chúc Mừng */}
              <button
                onClick={handleFlowerClick}
                className="relative px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 select-none bg-gradient-to-r from-emerald-500/25 via-teal-500/25 to-emerald-500/25 hover:from-emerald-500/40 hover:to-teal-500/40 text-emerald-200 hover:text-white border border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md"
                title="Tặng lẵng hoa tươi chúc mừng tân Ban Cán Sự"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-base animate-bounce">💐</span>
                  <span>Tặng Hoa</span>
                </span>
                <span className="ml-0.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-sm">
                  {flowersCount.toLocaleString()}
                </span>

                <AnimatePresence>
                  {showPlusOneFlower && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -28, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="absolute -top-4 right-2 text-xs font-black text-emerald-300 bg-slate-900/95 border border-emerald-400/80 px-2 py-0.5 rounded-full pointer-events-none shadow-xl z-30"
                    >
                      +1 💐
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Nút 3: 🎆 Bắn Pháo Hoa Ăn Mừng */}
              <button
                onClick={handleFireworkClick}
                className="relative px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 select-none bg-gradient-to-r from-amber-500/25 via-yellow-500/25 to-amber-500/25 hover:from-amber-500/40 hover:to-yellow-500/40 text-amber-200 hover:text-white border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md"
                title="Bắn pháo hoa ăn mừng chiến thắng và chúc mừng tân ban cán sự"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-base animate-pulse">🎆</span>
                  <span>Pháo Hoa</span>
                </span>
                <span className="ml-0.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-sm">
                  {fireworksCount.toLocaleString()}
                </span>

                <AnimatePresence>
                  {showPlusOneFirework && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -28, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="absolute -top-4 right-2 text-xs font-black text-amber-300 bg-slate-900/95 border border-amber-400/80 px-2 py-0.5 rounded-full pointer-events-none shadow-xl z-30"
                    >
                      +1 🎆
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hiệu ứng biểu cảm bay nổi toàn màn hình (Hearts & Flowers) */}
      <FloatingReactionOverlay
        items={floatingItems}
        onRemoveItem={handleRemoveFloatingItem}
      />
    </section>
  );
};
