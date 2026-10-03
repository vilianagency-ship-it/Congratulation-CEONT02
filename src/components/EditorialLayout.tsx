import React from 'react';
import { motion } from 'motion/react';
import { BoardMember } from '../types';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { ArrowUpRight, Quote } from './icons';

interface EditorialLayoutProps {
  members: BoardMember[];
  onSelectMember: (member: BoardMember) => void;
  onUpdateAvatar?: (memberId: string, newUrl: string) => void;
}

export const EditorialLayout: React.FC<EditorialLayoutProps> = ({
  members,
  onSelectMember,
  onUpdateAvatar
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Magazine Editorial Masthead */}
      <div className="border-b-2 border-slate-700/80 pb-6 mb-8 text-center">
        <span className="text-xs uppercase font-serif tracking-[0.3em] text-slate-400 block mb-2">
          Special Edition · Group Quản Trị &amp; Khởi Nghiệp
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-white uppercase">
          THE LEADERS
        </h2>
        <p className="text-sm font-serif italic text-slate-400 mt-2 max-w-xl mx-auto">
          &ldquo;Khởi nguồn từ niềm tin sẻ chia, lớn mạnh bởi sự đồng lòng kiên định, và kiêu hãnh vươn mình bởi những nhà lãnh đạo được tôi rèn trên hành trình tri thức.&rdquo;
        </p>
      </div>

      {/* Grid of Editorial Portraits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {members.map((member, index) => {
          return (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
              transition={{
                duration: 0.6,
                delay: (index % 5) * 0.08 + Math.floor(index / 5) * 0.14,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectMember(member)}
              className="group cursor-pointer flex flex-col bg-slate-900/90 border border-slate-800 p-3 rounded-lg hover:border-slate-500 transition-all duration-300"
            >
              {/* Photo Box with Classic Editorial Border */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 border border-slate-800/80">
                <ExecutiveAvatar
                  member={member}
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  showUploadTrigger={true}
                  onUpdateAvatar={(newUrl) => onUpdateAvatar?.(member.id, newUrl)}
                />

                <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/70 px-1.5 py-0.5 text-white/90">
                  {String(member.order).padStart(2, '0')}
                </div>

                <div className="absolute bottom-2 right-2 p-1.5 bg-white text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Editorial Typography */}
              <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-serif italic text-amber-300 mt-0.5 line-clamp-1">
                    {member.roleShort}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {member.companyRole}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {member.company}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic line-clamp-2">
                  &ldquo;{member.quote}&rdquo;
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Editorial Footer Quote - Adapted from The Makers */}
      <div className="mt-12 p-6 md:p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
        <Quote className="w-6 h-6 text-amber-400/80 mx-auto mb-3" />
        <p className="text-base md:text-lg font-serif italic text-slate-200 max-w-3xl mx-auto leading-relaxed">
          &ldquo;It started with people who believed, grew with those who stayed, and today stands strong because of the leaders it shaped along the way.&rdquo;
        </p>
        <span className="block mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          — Ban Cán Sự Lớp CEO NT02 · Group Quản Trị &amp; Khởi Nghiệp
        </span>
      </div>
    </div>
  );
};
