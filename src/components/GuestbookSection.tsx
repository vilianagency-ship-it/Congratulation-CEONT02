import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CongratulationWish } from '../types';
import { INITIAL_WISHES } from '../data/members';
import { Send, Heart, MessageSquare, Sparkles, Building, UserCheck } from './icons';

export const GuestbookSection: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [wishes, setWishes] = useState<CongratulationWish[]>(() => {
    // Dọn dẹp các tin mẫu cũ, chỉ giữ lại tin của Nguyễn Hoàng Vinh
    const saved = localStorage.getItem('ceont02_wishes_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    localStorage.setItem('ceont02_wishes_v3', JSON.stringify(INITIAL_WISHES));
    localStorage.setItem('ceont02_wishes', JSON.stringify(INITIAL_WISHES));
    return INITIAL_WISHES;
  });

  const [senderName, setSenderName] = useState('');
  const [senderTitle, setSenderTitle] = useState('');
  const [company, setCompany] = useState('');
  const [team, setTeam] = useState('');
  const [classCourse, setClassCourse] = useState('CEO NT02');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const newWish: CongratulationWish = {
      id: `wish-${Date.now()}`,
      senderName: senderName.trim(),
      senderTitle: senderTitle.trim() || 'Học viên CEO NT02',
      company: company.trim() || 'Thành viên Group Quản Trị & Khởi Nghiệp',
      team: team.trim(),
      classCourse: classCourse.trim() || 'CEO NT02',
      message: message.trim(),
      timestamp: 'Vừa xong',
      badge: 'Chúc mừng mới',
      likes: 1
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('ceont02_wishes_v3', JSON.stringify(updated));
    localStorage.setItem('ceont02_wishes', JSON.stringify(updated));

    // Reset inputs
    setSenderName('');
    setSenderTitle('');
    setCompany('');
    setTeam('');
    setClassCourse('CEO NT02');
    setMessage('');

    // Trigger celebration confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap(prev => ({ ...prev, [id]: true }));
    setWishes(prev => {
      const next = prev.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w);
      localStorage.setItem('ceont02_wishes', JSON.stringify(next));
      return next;
    });
  };

  return (
    <section id="guestbook" className="py-6 md:py-12 relative w-full">
      <div className="w-full px-1 sm:px-2 md:px-4">
        {/* Header */}
        <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 px-2">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]'}`}>
            Gửi Lời Chúc Mừng Ban Cán Sự
          </h2>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg mt-2.5 whitespace-normal md:whitespace-nowrap ${isLight ? 'text-slate-700 font-medium' : 'text-slate-200 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'}`}>
            Hãy để lại những lời chúc ý nghĩa, lời động viên và kỳ vọng của bạn dành cho 10 anh chị Ban Cán Sự lớp CEO NT02
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
          {/* Left: Input Form */}
          <div className={`lg:col-span-5 xl:col-span-4 rounded-2xl p-6 sm:p-7 shadow-xl ${
            isLight ? 'bg-white/70 backdrop-blur-xl border border-white/80' : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 shadow-2xl'
          }`}>
            <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 mb-4 ${isLight ? 'text-slate-950' : 'text-white'}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Gửi lời chúc của bạn</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Họ và tên <span className="text-[#AC3034]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Minh Trí"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors ${
                    isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Chức vụ
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Giám đốc"
                    value={senderTitle}
                    onChange={(e) => setSenderTitle(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors ${
                      isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Doanh nghiệp
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: An Thịnh Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors ${
                      isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Thêm 2 khung nhập: Thuộc team nào & Lớp nào */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Thuộc team nào
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Team 1 - Bứt Phá"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors ${
                      isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Lớp nào
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: CEO NT02"
                    value={classCourse}
                    onChange={(e) => setClassCourse(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors ${
                      isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Lời chúc mừng &amp; Thông điệp <span className="text-[#AC3034]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Chia sẻ lời chúc mừng nồng nhiệt nhất tới Ban Cán Sự CEO NT02..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#1C58A4] transition-colors resize-none ${
                    isLight ? 'bg-white/70 backdrop-blur-sm border-white/80 text-slate-900 placeholder:text-slate-500' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1C58A4] hover:bg-[#184D90] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Lời Chúc Mừng</span>
              </button>
            </form>
          </div>

          {/* Right: List of Wishes */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {wishes.map((wish) => {
              const isLiked = likedMap[wish.id];

              return (
                <div
                  key={wish.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isLight ? 'bg-white/60 backdrop-blur-md border-white/80 text-slate-800 shadow-sm' : 'bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 text-slate-100 shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#1C58A4]/10 border border-[#1C58A4]/30 flex items-center justify-center text-[#1C58A4] font-bold text-xs">
                        {wish.senderName.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {wish.senderName}
                          </h4>
                          {wish.badge && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                              {wish.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {wish.senderTitle} · {wish.company}
                        </p>
                        {(wish.team || wish.classCourse) && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            {wish.team && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-md shadow-xs">
                                🎯 {wish.team}
                              </span>
                            )}
                            {wish.classCourse && (
                              <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-500/40 px-2 py-0.5 rounded-md shadow-xs">
                                🎓 {wish.classCourse}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className={`text-[11px] shrink-0 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      {wish.timestamp}
                    </span>
                  </div>

                  <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {wish.message}
                  </p>

                  <div className={`mt-3 pt-2.5 border-t flex items-center justify-between ${
                    isLight ? 'border-slate-100' : 'border-slate-800/80'
                  }`}>
                    <span className={`text-[11px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      CEO NT02 Community
                    </span>

                    <button
                      onClick={() => handleLike(wish.id)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isLiked
                          ? 'text-rose-600 bg-rose-50'
                          : isLight ? 'text-slate-500 hover:text-rose-600 hover:bg-slate-100' : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="font-mono tabular-nums">{wish.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
