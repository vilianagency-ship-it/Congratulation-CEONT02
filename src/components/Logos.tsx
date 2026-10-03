import React from 'react';

/**
 * Biểu tượng Ribbon đặc trưng của Group Quản Trị & Khởi Nghiệp và CEONT02
 */
export const RibbonEmblem: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-10",
  color = "#1D4ED8"
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Biểu trưng Group Quản Trị & Khởi Nghiệp"
    >
      <defs>
        <linearGradient id="ribbonGradient" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      {/* Dynamic ribbon 4-lobe loop */}
      <path
        d="M32 25 C45 15, 65 25, 58 45 C52 62, 25 60, 20 72 C14 85, 30 100, 48 95 C62 90, 68 70, 72 55 C78 35, 95 28, 102 40 C108 52, 98 70, 85 78 C70 88, 55 98, 62 110 C68 118, 80 115, 90 102"
        stroke="url(#ribbonGradient)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Secondary fluid accent loop */}
      <path
        d="M26 62 C16 48, 22 28, 42 28 C60 28, 62 48, 52 68 C42 85, 60 102, 75 92"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeOpacity="0.85"
        fill="none"
      />
      <circle cx="56" cy="56" r="4" fill="#3B82F6" opacity="0.9" />
    </svg>
  );
};

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

/**
 * Logo 1: Group Quản Trị & Khởi Nghiệp (Đơn vị chủ quản - To lớn, nổi bật, quyền uy)
 * Asset từ file SVG người dùng tải lên - Tràn viền không khung
 */
export const LogoGroupQuanTri: React.FC<LogoProps> = ({
  className = "",
  theme = 'light',
  size = 'xl',
  variant = 'white'
}) => {
  const heightClass = {
    sm: "h-12 sm:h-14",
    md: "h-14 sm:h-17 md:h-19",
    lg: "h-16 sm:h-20 md:h-24",
    xl: "h-16 sm:h-22 md:h-26 lg:h-32"
  }[size];

  const logoSrc = variant === 'white' ? '/logo-QTKN-trang.svg' : '/logo-QTKN.svg';

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Logo Group Quản Trị & Khởi Nghiệp"
        className={`${heightClass} w-auto max-w-[360px] sm:max-w-[520px] md:max-w-[660px] lg:max-w-[780px] object-contain select-none filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] hover:scale-102 transition-transform duration-200`}
        onError={(e) => {
          e.currentTarget.src = '/logo-QTKN-trang.svg';
        }}
      />
    </div>
  );
};

/**
 * Logo 2: CEONT02 - Group Quản Trị & Khởi Nghiệp (Logo Lớp - Nhỏ gọn hơn đơn vị chủ quản)
 * Asset từ file SVG người dùng tải lên - Tràn viền không khung, trắng tinh khiết
 */
export const LogoCEONT02: React.FC<LogoProps> = ({
  className = "",
  theme = 'light',
  size = 'md',
  variant = 'white'
}) => {
  const heightClass = {
    sm: "h-9 sm:h-10",
    md: "h-11 sm:h-14 md:h-16 lg:h-19",
    lg: "h-13 sm:h-16 md:h-19 lg:h-22",
    xl: "h-15 sm:h-18 md:h-22 lg:h-26"
  }[size];

  const logoSrc = variant === 'white' ? '/logo-CEONT02-trang.svg' : '/logo-CEONT02.svg';

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Logo Lớp CEO NT02"
        className={`${heightClass} w-auto max-w-[240px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] object-contain select-none filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] hover:scale-102 transition-transform duration-200`}
        onError={(e) => {
          e.currentTarget.src = '/logo-CEONT02-trang.svg';
        }}
      />
    </div>
  );
};

/**
 * BrandHeaderLockup: Cặp đôi hai logo chuẩn mực được phối kết hợp trang trọng
 */
export const BrandHeaderLockup: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 py-3 px-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
      <LogoGroupQuanTri theme={theme} size="md" />
      <div className="hidden md:block h-9 w-[1px] bg-slate-700/60" aria-hidden="true" />
      <LogoCEONT02 theme={theme} size="md" />
    </div>
  );
};
