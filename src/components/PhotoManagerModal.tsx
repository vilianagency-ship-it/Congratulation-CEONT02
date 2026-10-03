import React, { useRef } from 'react';
import { BoardMember } from '../types';
import { X, Upload, RotateCcw, FolderOpen, CheckCircle, ImageIcon, Camera, Edit3 } from './icons';
import { INITIAL_BOARD_MEMBERS } from '../data/members';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: BoardMember[];
  onUpdateAvatar: (memberId: string, newUrl: string) => void;
  onResetAllAvatars: () => void;
  onEditMember?: (member: BoardMember) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  members,
  onUpdateAvatar,
  onResetAllAvatars,
  onEditMember
}) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  if (!isOpen) return null;

  const handleFileChange = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUpdateAvatar(memberId, uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1C58A4] uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4" />
            <span>Quản Lý &amp; Cập Nhật Ảnh Ban Cán Sự</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Hướng Dẫn &amp; Tải Lên Ảnh 10 Thành Viên
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Anh có thể tải ảnh trực tiếp từ máy tính/điện thoại ngay tại bảng này hoặc bỏ file ảnh vào thư mục của dự án.
          </p>
        </div>

        {/* Instruction Banner Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#1C58A4]/15 border border-[#1C58A4]/35">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1C58A4] uppercase mb-1">
              <Upload className="w-4 h-4 text-[#1C58A4]" />
              <span>Cách 1: Tải trực tiếp tại đây (Nhanh nhất)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bấm nút <strong>&ldquo;Chọn ảnh...&rdquo;</strong> ở từng thành viên bên dưới để chọn ảnh từ máy tính/điện thoại. Ảnh sẽ hiển thị và lưu ngay lập tức!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase mb-1">
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span>Cách 2: Đưa file vào thư mục code</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chép 10 file ảnh vào thư mục <code className="text-amber-200 bg-slate-950 px-1.5 py-0.5 rounded font-mono">/public/members/</code> đặt tên là <code className="text-amber-200 font-mono">member-1.jpg</code> đến <code className="text-amber-200 font-mono">member-10.jpg</code>.
            </p>
          </div>
        </div>

        {/* 10 Members List */}
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              {/* Member Preview & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-0.5 left-0.5 text-[9px] font-mono font-bold bg-black/70 px-1 rounded text-white">
                    #{member.order}
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-medium truncate">
                    {member.roleShort}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {member.companyRole} · {member.company}
                  </p>
                </div>
              </div>

              {/* Actions: Edit Info & Upload Photo */}
              <div className="shrink-0 flex items-center gap-2">
                {onEditMember && (
                  <button
                    type="button"
                    onClick={() => onEditMember(member)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                    title="Sửa họ tên, chức danh, doanh nghiệp..."
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sửa chữ</span>
                  </button>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => { fileInputRefs.current[member.id] = el; }}
                  className="hidden"
                  onChange={(e) => handleFileChange(member.id, e)}
                />

                <button
                  type="button"
                  onClick={() => fileInputRefs.current[member.id]?.click()}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Chọn ảnh...</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onResetAllAvatars}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục toàn bộ ảnh mẫu ban đầu</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Hoàn tất &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
