import React from 'react';
import { PosterTheme } from '../types';
import { RibbonEmblem } from './Logos';
import { LayoutGrid, Sparkles, Share2 } from './icons';

interface NavbarProps {
  currentTheme: PosterTheme;
  onChangeTheme: (theme: PosterTheme) => void;
  onScrollToSection: (id: string) => void;
  onOpenPhotoManager: () => void;
  onUploadCustomBg?: (url: string) => void;
  customBgUrl?: string | null;
  onResetBg?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onChangeTheme,
  onScrollToSection,
  onOpenPhotoManager,
  onUploadCustomBg,
  customBgUrl,
  onResetBg
}) => {
  const bgInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadCustomBg) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUploadCustomBg(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3">
        {/* Zone 1: Single Brand Element Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
          title="Ban Cán Sự Lớp CEO NT02"
        >
          <img
            src="/logo-CEONT02-trang.svg"
            alt="Logo Lớp CEO NT02"
            className="h-8 sm:h-9 w-auto object-contain select-none filter drop-shadow-md group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.src = '/logo-CEONT02.svg';
            }}
          />
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => onScrollToSection('members')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            10 Thành Viên
          </button>
          <button
            onClick={() => onScrollToSection('pledge')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Cam Kết
          </button>
          <button
            onClick={() => onScrollToSection('guestbook')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Sổ Lưu Bút
          </button>
          <button
            onClick={() => onScrollToSection('about-group')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Group QTKH
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions (Theme selector & Photo/Bg Manager) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Segmented Control for Poster Themes */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400">
            <button
              onClick={() => onChangeTheme('white')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                currentTheme === 'white'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'hover:text-white'
              }`}
              title="Poster Nền Trắng nằm trên Sân Khấu Vinh Danh"
            >
              Nền Trắng Sân Khấu
            </button>
            <button
              onClick={() => onChangeTheme('royal')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                currentTheme === 'royal'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'hover:text-white'
              }`}
              title="Phong cách Sân khấu Hoàng gia (Lấy cảm hứng từ Ảnh 2)"
            >
              Hoàng Gia
            </button>
            <button
              onClick={() => onChangeTheme('capsule')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                currentTheme === 'capsule'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'hover:text-white'
              }`}
              title="Phong cách Cột Viên thuốc Hiện đại (Lấy cảm hứng từ Ảnh 1)"
            >
              Viên Thuốc
            </button>
            <button
              onClick={() => onChangeTheme('editorial')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                currentTheme === 'editorial'
                  ? 'bg-slate-700 text-white font-semibold shadow-sm'
                  : 'hover:text-white'
              }`}
              title="Phong cách Tạp chí The Makers (Lấy cảm hứng từ Ảnh 3)"
            >
              Tạp Chí
            </button>
          </div>

          {/* Upload Custom BG 1 Button */}
          <input
            type="file"
            accept="image/*"
            ref={bgInputRef}
            className="hidden"
            onChange={handleBgFileChange}
          />

          <button
            onClick={() => bgInputRef.current?.click()}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
            title="Tải ảnh nền sân khấu (file bg 1.jfif từ máy của anh)"
          >
            <span>🖼️ Chọn nền bg 1</span>
          </button>

          {/* Quick Photo Upload Trigger Button */}
          <button
            onClick={onOpenPhotoManager}
            className="px-2.5 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            title="Đưa ảnh thật của 10 thành viên vào poster"
          >
            <span>📷 Đổi ảnh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
