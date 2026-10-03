import React, { useState, useEffect } from 'react';
import { BoardMember, MemberDepartment } from '../types';
import { X, Save, Edit3, Briefcase, Award, MessageSquareQuote, CheckCircle2, RotateCcw } from './icons';

interface EditMemberModalProps {
  member: BoardMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMember: BoardMember) => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<BoardMember | null>(null);

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    }
  }, [member]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof BoardMember, value: string) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1C58A4] uppercase tracking-wider mb-1">
            <Edit3 className="w-4 h-4" />
            <span>Chỉnh Sửa Thông Tin Thành Viên #{formData.order}</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Cập Nhật Hồ Sơ: {formData.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Thay đổi họ tên, chức vụ, doanh nghiệp, tiểu sử và cam kết hành động của thành viên này.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Full Name & Short Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Họ và Tên <span className="text-[#AC3034]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#1C58A4] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Chức danh ngắn (Badge) <span className="text-[#AC3034]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.roleShort}
                onChange={(e) => handleChange('roleShort', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#1C58A4] transition-colors"
                placeholder="Ví dụ: Lớp Trưởng"
              />
            </div>
          </div>

          {/* Row 2: Full Official Role in BCS */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Chức danh Ban Cán Sự đầy đủ <span className="text-[#AC3034]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#1C58A4] transition-colors"
              placeholder="Ví dụ: Lớp Trưởng Ban Cán Sự CEO NT02"
            />
          </div>

          {/* Row 3: Company & Business Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Chức vụ tại Doanh nghiệp
              </label>
              <input
                type="text"
                value={formData.companyRole}
                onChange={(e) => handleChange('companyRole', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ví dụ: Chủ tịch HĐQT &amp; Tổng Giám Đốc"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tên Doanh nghiệp / Tổ chức
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ví dụ: TechVision Global Holdings"
              />
            </div>
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tiểu sử chuyên môn ngắn gọn
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Mô tả ngắn về quá trình lãnh đạo và đóng góp cho lớp..."
            />
          </div>

          {/* Commitment Pledge */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lời cam kết hành động nhiệm kỳ
            </label>
            <textarea
              rows={2}
              value={formData.pledge}
              onChange={(e) => handleChange('pledge', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Lời hứa phụng sự tập thể khi nhận nhiệm vụ..."
            />
          </div>

          {/* Motto / Quote */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Triết lý điều hành / Châm ngôn
            </label>
            <input
              type="text"
              value={formData.quote}
              onChange={(e) => handleChange('quote', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ví dụ: Lãnh đạo bằng sự phụng sự và hành động gương mẫu."
            />
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Số điện thoại liên hệ
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="0903.xxx.xxx"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="tuan.nguyen@company.vn"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1C58A4] hover:bg-[#184D90] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Thay Đổi Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
