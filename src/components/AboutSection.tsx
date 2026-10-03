import React from 'react';
import { RibbonEmblem } from './Logos';
import { ExternalLink, Award, Users, BookOpen, HeartHandshake } from './icons';

export const AboutSection: React.FC = () => {
  return (
    <footer id="about-group" className="py-12 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950 border-t border-slate-700/40 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Grid: Mission & Connection without redundant logos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Col 1: About Group Quản Trị & Khởi Nghiệp */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C58A4] inline-block"></span>
              Group Quản Trị &amp; Khởi Nghiệp
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md font-medium">
              Group Quản Trị &amp; Khởi Nghiệp là cộng đồng doanh nhân, nhà quản trị và khởi nghiệp hàng đầu tại Việt Nam, với tôn chỉ <strong className="text-white">&ldquo;Sẻ chia Tri thức — Nâng tầm Quản trị&rdquo;</strong>, tạo lập môi trường học tập thực chiến và hợp tác kinh doanh bền vững.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1C58A4]" />
                <span className="font-medium text-white">50,000+ Thành viên</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium text-white">Học tập &amp; Thực chiến</span>
              </div>
            </div>
          </div>

          {/* Col 2: About CEO NT02 */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#AC3034] inline-block"></span>
              Lớp <span className="text-[#AC3034]">CEO</span> <span className="text-[#1C58A4]">NT02</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md font-medium">
              Lớp <strong className="text-white">CEO NT02</strong> quy tụ các doanh chủ, tổng giám đốc và lãnh đạo doanh nghiệp tiên phong. Ban Cán Sự 10 thành viên được tín nhiệm để đại diện, kết nối và dẫn dắt tập thể bứt phá mạnh mẽ trong kỷ nguyên số.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#1C58A4]" />
                <span className="font-medium text-white">Nhiệm kỳ 2026 — 2027</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-white">Đồng lòng phụng sự</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-slate-800/80 mb-8" aria-hidden="true" />

        {/* Bottom Bar: Quiet Copyright & Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <RibbonEmblem className="w-4 h-4 text-[#1C58A4]" />
            <span>© 2026 Lớp CEO NT02 · Group Quản Trị &amp; Khởi Nghiệp. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#members"
              className="hover:text-slate-300 transition-colors"
            >
              Danh sách 10 Thành Viên
            </a>
            <a
              href="#pledge"
              className="hover:text-slate-300 transition-colors"
            >
              Lời Cam Kết
            </a>
            <a
              href="#guestbook"
              className="hover:text-slate-300 transition-colors"
            >
              Sổ Lưu Bút
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
