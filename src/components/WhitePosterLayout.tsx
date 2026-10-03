import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoardMember } from '../types';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { ArrowUpRight, Sparkles, Building, Briefcase } from './icons';

interface WhitePosterLayoutProps {
  members: BoardMember[];
  onSelectMember: (member: BoardMember) => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
}

interface ExecutiveCardProps {
  member: BoardMember;
  index: number;
  onSelectMember: (member: BoardMember) => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
  member,
  index,
  onSelectMember,
  onUpdateAvatar,
}) => {
  const isPresident = member.order === 1;
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Interactive 3D Parallax Tilt & Mouse Spotlight
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // 2. Individual Heart Cheer Count - Khởi tạo từ 0 theo yêu cầu người dùng
  const [heartCount, setHeartCount] = useState<number>(() => {
    const saved = localStorage.getItem(`ceont02_member_heart_v0_${member.id}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showHeartPlusOne, setShowHeartPlusOne] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing between -1 and 1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Gentle 3D tilt max 4.5 degrees
    setRotateX(-yPct * 4.5);
    setRotateY(xPct * 4.5);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartCount((prev) => {
      const next = prev + 1;
      localStorage.setItem(`ceont02_member_heart_v0_${member.id}`, String(next));
      localStorage.setItem(`ceont02_member_heart_${member.id}`, String(next));
      return next;
    });
    setShowHeartPlusOne(true);
    setTimeout(() => setShowHeartPlusOne(false), 750);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.6,
        delay: (index % 5) * 0.08 + Math.floor(index / 5) * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectMember(member)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -8 : 0}px)`,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s ease-out, box-shadow 0.3s ease',
      }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer bg-white select-none ${
        isPresident
          ? 'border-2 border-amber-400 shadow-[0_20px_45px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/40 hover:shadow-[0_30px_70px_rgba(245,158,11,0.55)] hover:border-amber-300'
          : 'border border-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-black/10 hover:shadow-[0_26px_60px_rgba(245,158,11,0.35)] hover:border-amber-300'
      }`}
    >
      {/* 3D Dynamic Mouse Spotlight Glow */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(254, 240, 138, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* Gold Edge Shimmer for Lớp Trưởng */}
      {isPresident && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-amber-400/60 via-yellow-200/90 to-amber-500/60 opacity-70 animate-pulse -z-10"
        />
      )}

      {/* Card Top Header: Chức Danh + Nút Thả Tim Riêng Từng Lãnh Đạo */}
      <div className="px-3.5 sm:px-4 pt-3 pb-2.5 flex items-center justify-between bg-slate-50/95 border-b border-slate-200/80 z-20">
        <span
          className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border shadow-xs ${
            isPresident
              ? 'text-amber-950 bg-gradient-to-r from-amber-200 to-yellow-300 border-amber-400 ring-1 ring-amber-400/50 shadow-amber-300/40'
              : 'text-[#1C58A4] bg-blue-50 border-blue-200'
          }`}
        >
          {isPresident ? (
            <span className="text-xs">👑</span>
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-[#1C58A4]" />
          )}
          <span>{member.roleShort}</span>
        </span>

        {/* Nút Thả Tim Cổ Vũ Riêng Từng Người */}
        <button
          onClick={handleHeartClick}
          className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100/90 text-rose-600 border border-rose-200/80 transition-all hover:scale-108 active:scale-95 shadow-xs cursor-pointer"
          title={`Thả tim cổ vũ ${member.name}`}
        >
          <span className="text-xs transform group-hover:scale-115 transition-transform">❤️</span>
          <span className="text-xs font-black tracking-tight">{heartCount.toLocaleString()}</span>

          {/* Bay nổi +1 ❤️ trực tiếp trên thẻ */}
          <AnimatePresence>
            {showHeartPlusOne && (
              <motion.span
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -22, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute -top-3.5 right-0 text-[10px] font-black text-rose-600 bg-white border border-rose-300 px-1.5 py-0.2 rounded-full shadow-md pointer-events-none z-30"
              >
                +1 ❤️
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Portrait Frame with Holographic Glass Sheen Effect */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
          <ExecutiveAvatar
            member={member}
            className="w-full h-full"
            showUploadTrigger={true}
            onUpdateAvatar={(newUrl) => onUpdateAvatar?.(member.id, newUrl)}
          />
        </div>

        {/* Holographic Glass Sheen Sweep on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
          <div
            className={`absolute top-0 -left-[100%] h-full w-[80%] bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-25 transition-all duration-1000 ${
              isHovered ? 'left-[160%]' : '-left-[100%]'
            }`}
          />
        </div>

        {/* Subtle scrim on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Hover Reveal Button */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-20">
          <span className="text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1C58A4] to-blue-600 shadow-lg flex items-center gap-1.5">
            Xem hồ sơ <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Text Info on Clean White Canvas */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white border-t border-slate-100 z-10">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-[#1C58A4] transition-colors tracking-tight line-clamp-1">
            {member.name}
          </h3>

          <p className="mt-2 text-sm sm:text-base text-slate-950 line-clamp-2 font-bold flex items-center gap-1.5 leading-snug">
            <Briefcase className="w-4 h-4 text-[#1C58A4] shrink-0" />
            <span className="truncate">{member.companyRole}</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 mt-1.5 flex items-center gap-1.5 font-semibold leading-relaxed">
            <Building className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">{member.company}</span>
          </p>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-700 font-medium">
          <span className="italic truncate max-w-full">&ldquo;{member.quote}&rdquo;</span>
        </div>
      </div>
    </motion.div>
  );
};

export const WhitePosterLayout: React.FC<WhitePosterLayoutProps> = ({
  members,
  onSelectMember,
  onUpdateAvatar,
}) => {
  return (
    <div className="relative w-full">
      {/* 10 Members Grid on Pure White Canvas with 3D Tilt, Holographic Sheen & Individual Cheer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {members.map((member, index) => (
          <ExecutiveCard
            key={member.id}
            member={member}
            index={index}
            onSelectMember={onSelectMember}
            onUpdateAvatar={onUpdateAvatar}
          />
        ))}
      </div>
    </div>
  );
};
