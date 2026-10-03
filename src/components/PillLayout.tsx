import React from 'react';
import { motion } from 'motion/react';
import { BoardMember } from '../types';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { ArrowUpRight } from './icons';

interface PillLayoutProps {
  members: BoardMember[];
  onSelectMember: (member: BoardMember) => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
}

export const PillLayout: React.FC<PillLayoutProps> = ({
  members,
  onSelectMember,
  onUpdateAvatar
}) => {
  // Soft, sophisticated pastel gradient capsules inspired by Image 1
  const pillGradients = [
    'from-slate-800/90 via-indigo-950/60 to-slate-900',
    'from-slate-800/90 via-blue-950/60 to-slate-900',
    'from-slate-800/90 via-purple-950/60 to-slate-900',
    'from-slate-800/90 via-sky-950/60 to-slate-900',
    'from-slate-800/90 via-violet-950/60 to-slate-900',
  ];

  return (
    <div className="relative w-full">
      {/* Decorative vertical pillars in background */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
          Phong cách Cột Viên Thuốc (Pill Columns)
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Đội Ngũ Lãnh Đạo Tinh Anh CEONT02
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Lấy cảm hứng từ bố cục triển lãm hội nghị quốc tế hiện đại, nhấn mạnh sự nhịp nhàng và bản lĩnh của từng thành viên.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {members.map((member, index) => {
          const bgGradient = pillGradients[index % pillGradients.length];

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
              transition={{
                duration: 0.6,
                delay: (index % 5) * 0.08 + Math.floor(index / 5) * 0.14,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              onClick={() => onSelectMember(member)}
              className={`group flex flex-col rounded-[2.5rem] p-3 cursor-pointer border border-slate-700/60 bg-gradient-to-b ${bgGradient} hover:border-indigo-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15`}
            >
              {/* Top Capsule Header with Order & Mission */}
              <div className="pt-2 px-3 pb-3 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-indigo-300">
                  #{String(member.order).padStart(2, '0')}
                </span>
                <span className="font-semibold text-[11px] text-slate-300 truncate max-w-[100px]">
                  {member.roleShort}
                </span>
              </div>

              {/* Portrait inside Rounded Pill Container */}
              <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                <ExecutiveAvatar
                  member={member}
                  className="w-full h-full"
                  showUploadTrigger={true}
                  onUpdateAvatar={(newUrl) => onUpdateAvatar?.(member.id, newUrl)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-indigo-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Capsule Bottom Info */}
              <div className="pt-4 pb-3 px-3 text-center flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.25rem] flex items-center justify-center">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-medium text-amber-300/90 mt-0.5 line-clamp-1">
                    {member.companyRole}
                  </p>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {member.company}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/50">
                  <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider block">
                    {member.roleShort}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
