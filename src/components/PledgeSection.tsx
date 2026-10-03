import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RibbonEmblem } from './Logos';
import { ShieldCheck, HeartHandshake, Award, Sparkles, Check } from './icons';

export const PledgeSection: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [pledgeSigned, setPledgeSigned] = useState(false);
  const [supporterCount, setSupporterCount] = useState(128);

  const handleSupport = () => {
    if (!pledgeSigned) {
      setPledgeSigned(true);
      setSupporterCount(prev => prev + 1);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <section className="py-6 md:py-10 relative w-full">
      <div className="w-full px-1 sm:px-2 md:px-4">
        <div className="relative w-full">
          {!isLight && (
            <div className="absolute -inset-4 sm:-inset-6 bg-slate-950/70 rounded-3xl backdrop-blur-md border border-slate-800/80 -z-10 shadow-2xl pointer-events-none" />
          )}

          {/* Section Header */}
          <div className="text-center w-full mx-auto mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight sm:whitespace-nowrap ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Lời Cam Kết Của Ban Cán Sự <span className={`inline-block whitespace-nowrap ${isLight ? '' : 'text-amber-400'}`}>
                {isLight ? (
                  <>
                    <span className="text-[#AC3034]">CEO</span> <span className="text-[#1C58A4]">NT02</span>
                  </>
                ) : (
                  'CEO NT02'
                )}
              </span>
            </h2>
            <p className={`text-sm sm:text-base md:text-lg mt-2 font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
              Cam kết đồng lòng phụng sự, kiến tạo giá trị và kết nối bền vững
            </p>
          </div>

          {/* 4 Pillars of Pledge - Khung trắng ngọc trai hoặc tối tương phản cao */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className={`p-5 sm:p-6 md:p-7 rounded-2xl flex items-start gap-4 transition-all ${
              isLight
                ? 'bg-white/95 hover:bg-white backdrop-blur-md border border-slate-100 shadow-[0_16px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 shadow-black/80 hover:border-slate-500'
            }`}>
              <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                isLight ? 'bg-blue-50 text-[#1C58A4] border border-blue-200/80 shadow-xs' : 'bg-slate-900 border border-slate-700/80 text-blue-400'
              }`}>
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  01. Phụng Sự Tập Thể
                </h3>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  Đặt sự tiến bộ và lợi ích của tập thể thành viên CEO NT02 làm trọng tâm cao nhất trong mọi quyết sách.
                </p>
              </div>
            </div>

            <div className={`p-5 sm:p-6 md:p-7 rounded-2xl flex items-start gap-4 transition-all ${
              isLight
                ? 'bg-white/95 hover:bg-white backdrop-blur-md border border-slate-100 shadow-[0_16px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 shadow-black/80 hover:border-slate-500'
            }`}>
              <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                isLight ? 'bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs' : 'bg-slate-900 border border-slate-700/80 text-amber-400'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  02. Nâng Tầm Tri Thức
                </h3>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  Đẩy mạnh các diễn đàn chia sẻ thực chiến, thảo luận case-study chiều sâu và tối ưu năng lực quản trị doanh nghiệp.
                </p>
              </div>
            </div>

            <div className={`p-5 sm:p-6 md:p-7 rounded-2xl flex items-start gap-4 transition-all ${
              isLight
                ? 'bg-white/95 hover:bg-white backdrop-blur-md border border-slate-100 shadow-[0_16px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 shadow-black/80 hover:border-slate-500'
            }`}>
              <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                isLight ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs' : 'bg-slate-900 border border-slate-700/80 text-emerald-400'
              }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  03. Minh Bạch &amp; Kỷ Luật
                </h3>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  Quản lý quỹ lớp minh bạch, xây dựng nề nếp văn hóa chuyên nghiệp, tôn trọng sự khác biệt và công bằng.
                </p>
              </div>
            </div>

            <div className={`p-5 sm:p-6 md:p-7 rounded-2xl flex items-start gap-4 transition-all ${
              isLight
                ? 'bg-white/95 hover:bg-white backdrop-blur-md border border-slate-100 shadow-[0_16px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 shadow-black/80 hover:border-slate-500'
            }`}>
              <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                isLight ? 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-xs' : 'bg-slate-900 border border-slate-700/80 text-purple-400'
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  04. Gắn Kết &amp; Giao Thương
                </h3>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  Tạo môi trường tin cậy xúc tiến thương mại nội bộ, tương trợ kinh doanh và duy trì tình bạn keo sơn dài lâu.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Supporter Badge: Button on Left, Companion content immediately to the right */}
          <div className={`mt-8 sm:mt-10 pt-6 border-t flex flex-wrap items-center gap-4 sm:gap-6 ${
            isLight ? 'border-slate-300/60' : 'border-slate-800'
          }`}>
            {/* The Support Button on the Left */}
            <button
              onClick={handleSupport}
              disabled={pledgeSigned}
              className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center gap-2.5 cursor-pointer shadow-md shrink-0 ${
                pledgeSigned
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:shadow-lg'
              }`}
            >
              {pledgeSigned ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Đã Gửi Sự Đồng Lòng!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Bấm Ủng Hộ &amp; Đồng Lòng</span>
                </>
              )}
            </button>

            {/* Companion content placed immediately to the right of the button */}
            <div className="flex items-center gap-3">
              <RibbonEmblem className="w-8 h-8 sm:w-9 sm:h-9 text-[#1C58A4] shrink-0" />
              <div className="text-left">
                <span className={`text-sm sm:text-base font-bold block ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  Đồng hành cùng Ban Cán Sự CEO NT02
                </span>
                <span className={`text-xs sm:text-sm ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                  <strong className={`font-mono font-bold ${isLight ? 'text-[#1C58A4]' : 'text-white'}`}>{supporterCount}</strong> học viên &amp; đối tác đã bấm ủng hộ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
