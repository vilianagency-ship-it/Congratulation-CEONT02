/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BoardMember, PosterTheme } from './types';
import { INITIAL_BOARD_MEMBERS } from './data/members';
import { HeroSection } from './components/HeroSection';
import { ExecutiveStageLayout } from './components/ExecutiveStageLayout';
import { PillLayout } from './components/PillLayout';
import { EditorialLayout } from './components/EditorialLayout';
import { WhitePosterLayout } from './components/WhitePosterLayout';
import { GrandHallBackdrop, DongSonDrumSVG } from './components/GrandHallBackdrop';
import { GoldenSparkleDust } from './components/GoldenSparkleDust';
import { PledgeSection } from './components/PledgeSection';
import { GuestbookSection } from './components/GuestbookSection';
import { AboutSection } from './components/AboutSection';
import { MemberModal } from './components/MemberModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { EditMemberModal } from './components/EditMemberModal';
import { Users, Volume2, VolumeX, Sparkles } from './components/icons';
import { launchOpeningFireworks, launchMemberCelebrationFireworks } from './utils/fireworks';

export default function App() {
  const [members, setMembers] = useState<BoardMember[]>(() => {
    const saved = localStorage.getItem('ceont02_members_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length === 10 && parsed[0]?.name === 'Đinh Quý Trọng Nhân') {
          return parsed;
        }
      } catch {
        // fallback to pristine INITIAL_BOARD_MEMBERS
      }
    }
    // Clean old caches and load verified 10 members photos & titles
    try {
      localStorage.removeItem('ceont02_members');
      localStorage.removeItem('ceont02_members_v4');
      localStorage.setItem('ceont02_members_v5', JSON.stringify(INITIAL_BOARD_MEMBERS));
    } catch {
      // ignore
    }
    return INITIAL_BOARD_MEMBERS;
  });

  const [customBgUrl, setCustomBgUrl] = useState<string | null>(() => {
    return localStorage.getItem('ceont02_custom_bg') || '/members/bg%201.jfif';
  });

  // Default theme is 'white' as requested: Nền trắng hoàn toàn nằm trên nền sân khấu
  const [currentTheme, setCurrentTheme] = useState<PosterTheme>('white');
  const [glassOpacity, setGlassOpacity] = useState<'crystal' | 'medium' | 'milky'>(() => {
    return (localStorage.getItem('ceont02_glass') as 'crystal' | 'medium' | 'milky') || 'medium';
  });
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);

  const handleUploadCustomBg = (url: string) => {
    setCustomBgUrl(url);
    localStorage.setItem('ceont02_custom_bg', url);
  };

  const handleGlassChange = (level: 'crystal' | 'medium' | 'milky') => {
    setGlassOpacity(level);
    localStorage.setItem('ceont02_glass', level);
  };

  const handleResetBg = () => {
    setCustomBgUrl(null);
    localStorage.removeItem('ceont02_custom_bg');
  };

  // Launch opening celebratory fireworks on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      launchOpeningFireworks();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Play pleasant celebratory synth chime via Web Audio API (no external asset needed)
  const playCelebratoryChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumphant chord
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.08);
        osc.stop(audioCtx.currentTime + idx * 0.08 + 1.3);
      });
    } catch {
      // AudioContext not allowed before user interaction
    }
  };

  const handleSelectMember = (member: BoardMember) => {
    setSelectedMember(member);
    playCelebratoryChime();
    launchMemberCelebrationFireworks(0.5, 0.45);
  };

  const handleUpdateAvatar = (memberId: string, newUrl: string) => {
    const updated = members.map(m => m.id === memberId ? { ...m, avatar: newUrl } : m);
    setMembers(updated);
    localStorage.setItem('ceont02_members_v5', JSON.stringify(updated));
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember(prev => prev ? { ...prev, avatar: newUrl } : null);
    }
  };

  const handleResetAllAvatars = () => {
    setMembers(INITIAL_BOARD_MEMBERS);
    localStorage.removeItem('ceont02_members_v5');
  };

  const handleSaveMember = (updatedMember: BoardMember) => {
    const updated = members.map(m => m.id === updatedMember.id ? updatedMember : m);
    setMembers(updated);
    localStorage.setItem('ceont02_members_v5', JSON.stringify(updated));
    if (selectedMember && selectedMember.id === updatedMember.id) {
      setSelectedMember(updatedMember);
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Next and Previous member modal navigation
  const currentIndex = selectedMember ? members.findIndex(m => m.id === selectedMember.id) : -1;
  const handleNextMember = () => {
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % members.length;
      setSelectedMember(members[nextIndex]);
      playCelebratoryChime();
      launchMemberCelebrationFireworks(0.5, 0.45);
    }
  };
  const handlePrevMember = () => {
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + members.length) % members.length;
      setSelectedMember(members[prevIndex]);
      playCelebratoryChime();
      launchMemberCelebrationFireworks(0.5, 0.45);
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Background Sân Khấu Vinh Danh Grand Hall (bg 1) */}
      <GrandHallBackdrop customBgUrl={customBgUrl} />

      {/* Hiệu ứng hạt bụi vàng kim lung linh (Golden Bokeh / Sparkle Dust) */}
      <GoldenSparkleDust />

      {/* MAIN POSTER CANVAS: 10 BẢNG VINH DANH TRẮNG NGỌC TRAI TRÀN VIỀN TRÊN SÂN KHẤU */}
      {currentTheme === 'white' ? (
        <main className="relative z-10 py-4 sm:py-6 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
          {/* Lớp ánh sáng hội trường chúc mừng rực rỡ từ trên cao */}
          <div
            className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-blue-600/10 to-transparent pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Hero Banner Chúc Mừng Rực Rỡ */}
          <HeroSection
            theme="dark"
            onScrollToMembers={() => handleScrollToSection('members')}
            onScrollToWishes={() => handleScrollToSection('guestbook')}
          />

          {/* Members Showcase Section */}
          <section id="members" className="py-6 md:py-10 relative scroll-mt-14 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 pb-4 border-b border-slate-800 w-full text-center sm:text-left"
            >
              <h2 className="flex items-center justify-center sm:justify-start gap-2.5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
                <span>
                  DANH SÁCH 10 THÀNH VIÊN BAN CÁN SỰ LỚP <span className="text-amber-400 font-black">CEO NT02</span>
                </span>
              </h2>
            </motion.div>

            {/* 10 White Pearl Plaques floating on the grand stage */}
            <WhitePosterLayout
              members={members}
              onSelectMember={handleSelectMember}
              onUpdateAvatar={handleUpdateAvatar}
            />
          </section>

          {/* Oath / Pledge Section */}
          <div id="pledge" className="scroll-mt-14 w-full">
            <PledgeSection theme="dark" />
          </div>

          {/* Interactive Guestbook */}
          <div className="w-full">
            <GuestbookSection theme="dark" />
          </div>

          {/* Ceremonial Dong Son Seal at bottom */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center p-2 mb-3 shadow-inner">
              <DongSonDrumSVG className="w-full h-full text-amber-400" />
            </div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-300">
              Ban Cán Sự Lớp CEO NT02 · Group Quản Trị &amp; Khởi Nghiệp
            </span>
            <p className="text-xs text-slate-300 mt-1 italic">
              Sẻ chia Tri thức — Nâng tầm Quản trị — Vững bước Vươn xa
            </p>
          </div>
        </main>
      ) : (
        /* Alternate Dark Stage Themes: Royal, Capsule, or Editorial */
        <main className="relative z-10 py-4 sm:py-6 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
          <HeroSection
            theme="dark"
            onScrollToMembers={() => handleScrollToSection('members')}
            onScrollToWishes={() => handleScrollToSection('guestbook')}
          />

          <section id="members" className="py-6 md:py-10 relative scroll-mt-14 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 pb-4 border-b border-slate-800 w-full text-center sm:text-left"
            >
              <h2 className="flex items-center justify-center sm:justify-start gap-2.5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
                <span>
                  DANH SÁCH 10 THÀNH VIÊN BAN CÁN SỰ LỚP <span className="text-amber-400 font-black">CEO NT02</span>
                </span>
              </h2>
            </motion.div>

            {currentTheme === 'royal' && (
              <ExecutiveStageLayout
                members={members}
                onSelectMember={handleSelectMember}
                onUpdateAvatar={handleUpdateAvatar}
              />
            )}

            {currentTheme === 'capsule' && (
              <PillLayout
                members={members}
                onSelectMember={handleSelectMember}
                onUpdateAvatar={handleUpdateAvatar}
              />
            )}

            {currentTheme === 'editorial' && (
              <EditorialLayout
                members={members}
                onSelectMember={handleSelectMember}
                onUpdateAvatar={handleUpdateAvatar}
              />
            )}
          </section>

          <div id="pledge" className="scroll-mt-14 w-full">
            <PledgeSection theme="dark" />
          </div>

          <div className="w-full">
            <GuestbookSection theme="dark" />
          </div>

          {/* Ceremonial Dong Son Seal at bottom of Dark Stage */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center p-2 mb-3 shadow-inner">
              <DongSonDrumSVG className="w-full h-full text-amber-400" />
            </div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-300">
              Ban Cán Sự Lớp CEO NT02 · Group Quản Trị &amp; Khởi Nghiệp
            </span>
            <p className="text-xs text-slate-300 mt-1 italic">
              Sẻ chia Tri thức — Nâng tầm Quản trị — Vững bước Vươn xa
            </p>
          </div>
        </main>
      )}

      {/* About and Footer Section */}
      <AboutSection />

      {/* Member Full Detail Modal */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onNext={handleNextMember}
        onPrev={handlePrevMember}
        onUpdateAvatar={handleUpdateAvatar}
        onEditMember={(m) => setEditingMember(m)}
      />

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        members={members}
        onUpdateAvatar={handleUpdateAvatar}
        onResetAllAvatars={handleResetAllAvatars}
        onEditMember={(m) => setEditingMember(m)}
      />

      {/* Visual Member Profile Editor Modal */}
      <EditMemberModal
        member={editingMember}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleSaveMember}
      />

      {/* Sound Toggle Floating Button */}
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md shadow-xl transition-all cursor-pointer"
        title={soundEnabled ? "Tắt âm thanh hiệu ứng" : "Bật âm thanh hiệu ứng"}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
      </button>
    </div>
  );
}
