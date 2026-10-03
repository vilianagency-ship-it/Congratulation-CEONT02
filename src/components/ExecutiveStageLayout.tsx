import React from 'react';
import { motion } from 'motion/react';
import { BoardMember } from '../types';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { ArrowUpRight, Sparkles, Briefcase, Building } from './icons';

interface ExecutiveStageLayoutProps {
  members: BoardMember[];
  onSelectMember: (member: BoardMember) => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
}

export const ExecutiveStageLayout: React.FC<ExecutiveStageLayoutProps> = ({
  members,
  onSelectMember,
  onUpdateAvatar
}) => {
  return (
    <div className="relative w-full">
      {/* Background Stage Atmosphere */}
      <div className="absolute inset-0 -top-24 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Grid of 10 Leaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 relative z-10">
        {members.map((member, index) => {
          const isPresident = member.order === 1;

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
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => onSelectMember(member)}
              className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                isPresident
                  ? 'bg-gradient-to-b from-blue-900/60 via-slate-900/90 to-slate-950 border-amber-400/40 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30'
                  : 'bg-gradient-to-b from-slate-900/80 via-slate-900/95 to-slate-950 border-slate-800/80 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
              }`}
            >
              {/* Special Header Badge - Chức danh lớp cụ thể ở trên cùng */}
              <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-center z-10">
                <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border shadow-xs ${
                  isPresident
                    ? 'text-amber-300 bg-amber-500/20 border-amber-400/40 ring-1 ring-amber-400/30'
                    : 'text-blue-200 bg-blue-500/20 border-blue-400/40'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isPresident ? 'text-amber-300' : 'text-blue-300'}`} />
                  <span>{member.roleShort}</span>
                </span>
              </div>

              {/* Portrait Container with Hover Zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                <ExecutiveAvatar
                  member={member}
                  className="w-full h-full"
                  showUploadTrigger={true}
                  onUpdateAvatar={(newUrl) => onUpdateAvatar?.(member.id, newUrl)}
                />

                {/* Scrim Gradient for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Hover Reveal Button */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-20">
                  <span className="text-sm font-bold text-white px-3 py-1.5 rounded-lg bg-blue-600/95 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                    Xem hồ sơ <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Leader Credentials - Font chữ to, đậm nét, siêu dễ đọc */}
              <div className="p-3.5 sm:p-4.5 flex flex-col justify-between flex-1 relative z-10 bg-slate-950/95 border-t border-slate-700/80">
                <div>
                  <h3 className="uppercase text-base sm:text-lg lg:text-base xl:text-lg font-black text-white group-hover:text-blue-300 transition-colors tracking-tight leading-snug min-h-[2.75rem] flex items-center">
                    {member.name}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-white line-clamp-2 font-bold flex items-center gap-1.5 leading-snug">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{member.companyRole}</span>
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-100 line-clamp-2 mt-1 flex items-center gap-1.5 font-medium leading-relaxed">
                    <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{member.company}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-xs text-white">
                  <span className="italic truncate max-w-full text-slate-200 font-medium">&ldquo;{member.quote}&rdquo;</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
