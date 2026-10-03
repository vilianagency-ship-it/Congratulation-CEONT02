export type MemberDepartment = 'executive' | 'academic' | 'network' | 'operations';

export interface BoardMember {
  id: string;
  order: number;
  name: string;
  role: string;
  roleShort: string;
  department?: MemberDepartment;
  company: string;
  companyRole: string;
  bio: string;
  pledge: string;
  quote: string;
  avatar: string;
  avatarBg: string;
  experience?: string;
  industry?: string;
  email?: string;
  phone?: string;
  zalo?: string;
}

export type PosterTheme = 'white' | 'royal' | 'capsule' | 'editorial';

export interface CongratulationWish {
  id: string;
  senderName: string;
  senderTitle: string;
  company: string;
  team?: string;
  classCourse?: string;
  message: string;
  timestamp: string;
  badge?: string;
  likes: number;
}
