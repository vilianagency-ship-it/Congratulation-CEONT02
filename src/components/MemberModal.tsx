import React, { useEffect } from 'react';
import { BoardMember } from '../types';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { X, ChevronLeft, ChevronRight, Award, Briefcase, Mail, Phone, MessageSquareQuote, CheckCircle2, Share2, Edit3 } from './icons';
import { RibbonEmblem } from './Logos';

interface MemberModalProps {
  member: BoardMember | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
  onEditMember?: (member: BoardMember) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  member,
  onClose,
  onNext,
  onPrev,
  onUpdateAvatar,
  onEditMember
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          aria-label="Đóng chi tiết"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Portrait & Identity Tag */}
        <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full bg-slate-950 flex flex-col">
          <div className="relative h-72 md:h-full w-full">
            <ExecutiveAvatar
              member={member}
              className="w-full h-full"
              showUploadTrigger={true}
              onUpdateAvatar={(newUrl) => onUpdateAvatar?.(member.id, newUrl)}
            />
            {/* Scrim gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden" />
          </div>

          <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RibbonEmblem className="w-5 h-5 text-[#1C58A4]" />
              <span className="text-xs font-semibold text-slate-400">CEO NT02 Board</span>
            </div>
            <div className="flex items-center gap-1">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Thành viên trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Thành viên tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Full Profile & Pledge */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Order & Official Identity */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#1C58A4] tracking-wide">
              <span className="font-mono">#{String(member.order).padStart(2, '0')}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-300">Ban Cán Sự CEO NT02</span>
            </div>

            {/* Member Name & Official Role */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
              {member.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-amber-400">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{member.role}</span>
            </div>

            {/* Enterprise Role & Company */}
            <div className="mt-3 flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <Briefcase className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm">
                <span className="font-semibold text-slate-200">{member.companyRole}</span>
                <span className="block text-slate-400 font-medium">{member.company}</span>
              </div>
            </div>

            {/* Short Bio */}
            <div className="mt-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                Tiểu sử chuyên môn
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Commitment Pledge */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#1C58A4]/15 border border-[#1C58A4]/35">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1C58A4] uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#1C58A4] shrink-0" />
                <span>Cam kết hành động nhiệm kỳ</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 italic leading-relaxed">
                &ldquo;{member.pledge}&rdquo;
              </p>
            </div>

            {/* Personal Quote */}
            <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
              <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="italic">&ldquo;{member.quote}&rdquo;</span>
            </div>
          </div>

          {/* Quick Contact & Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-400">
              {member.phone && (
                <div className="flex items-center gap-1 hover:text-slate-200 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#1C58A4]" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.email && (
                <div className="flex items-center gap-1 hover:text-slate-200 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#1C58A4]" />
                  <span className="truncate max-w-[140px]">{member.email}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onEditMember && (
                <button
                  onClick={() => onEditMember(member)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium transition-colors border border-slate-700 cursor-pointer"
                  title="Chỉnh sửa họ tên, chức vụ, tiểu sử, châm ngôn..."
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sửa thông tin</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${member.name} - ${member.role} | CEONT02`,
                      text: `Chúc mừng ${member.name} nhận nhiệm vụ ${member.role} Ban Cán Sự Lớp CEO NT02!`,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Đã sao chép liên kết vào bộ nhớ tạm!');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ hồ sơ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
