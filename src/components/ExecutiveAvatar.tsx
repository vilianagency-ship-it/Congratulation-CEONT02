import React, { useState } from 'react';
import { BoardMember } from '../types';
import { Camera, User } from './icons';

interface ExecutiveAvatarProps {
  member: BoardMember;
  className?: string;
  onUpdateAvatar?: (newUrl: string) => void;
  showUploadTrigger?: boolean;
}

export const ExecutiveAvatar: React.FC<ExecutiveAvatarProps> = ({
  member,
  className = "w-full h-full",
  onUpdateAvatar,
  showUploadTrigger = false
}) => {
  const [retryStep, setRetryStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset fallback steps whenever member.avatar or member.id changes
  React.useEffect(() => {
    setHasError(false);
    setRetryStep(0);
    setIsLoading(true);
  }, [member.avatar, member.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUpdateAvatar(uploadEvent.target.result as string);
          setHasError(false);
          setRetryStep(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Multiple fallback candidate chain
  const currentSrc = React.useMemo(() => {
    if (retryStep === 0) return member.avatar;
    if (retryStep === 1) return `/members/ban-than-v2-${member.order}.png`;
    if (retryStep === 2) return `/members/ban-than-${member.order}.png`;
    if (retryStep === 3) return `/members/member-${member.order}.jpg`;
    if (retryStep === 4) return `/members/member-${member.order}.jfif`;
    return member.avatar;
  }, [retryStep, member.avatar, member.order]);

  const handleImageError = () => {
    if (retryStep < 4) {
      setRetryStep(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  // Generate initials
  const initials = member.name
    .split(' ')
    .slice(-2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`relative overflow-hidden group/avatar select-none ${className}`}>
      {!hasError ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`Chân dung ${member.name} - ${member.role}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/avatar:scale-105"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
      ) : null}

      {/* Styled Executive Fallback Container if image fails or before load */}
      {hasError && (
        <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b ${member.avatarBg} text-white relative`}>
          <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-black/40" />
          
          {/* Executive Silhouette Icon */}
          <div className="relative z-10 w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl mb-2">
            <span className="text-2xl font-bold tracking-wider text-amber-200">
              {initials}
            </span>
          </div>

          <div className="relative z-10 text-center px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 block truncate">
              {member.roleShort}
            </span>
            <span className="text-sm font-bold text-white block mt-0.5 truncate max-w-[160px]">
              {member.name}
            </span>
          </div>

          {/* Decorative business lapel pin */}
          <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-amber-400/80 blur-[2px]" />
        </div>
      )}

      {/* Optional Upload Trigger for Customization */}
      {showUploadTrigger && (
        <label
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/90 hover:bg-black/90 hover:text-white cursor-pointer backdrop-blur-sm opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20 title='Thay đổi ảnh'"
          title="Thay ảnh chân dung thật"
        >
          <Camera className="w-3.5 h-3.5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};
