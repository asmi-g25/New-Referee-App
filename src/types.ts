export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface User {
  id: string;
  role: 'client' | 'provider' | null;
  agreed: boolean;
}

export interface Document {
  id: string;
  name: string;
  content: string;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  approvals: string[]; // User IDs
  rejections: string[]; // User IDs
  timestamp: string;
}

export interface Dispute {
  id: string;
  text: string;
  submittedBy: string;
  status: 'pending' | 'accepted' | 'rejected';
  approvals: string[];
  rejections: string[];
  timestamp: string;
}

export interface AIResult {
  ruling: string;
  explanation: string;
  references: string[];
  nextSteps: string[];
}

export interface SessionState {
  sessionId: string;
  users: User[];
  documents: Document[];
  dispute: Dispute | null;
  aiResult: AIResult | null;
  isProcessing: boolean;
}

export interface PastSession {
  id: string;
  title: string;
  date: string;
  status: 'resolved' | 'pending' | 'rejected';
  participants: string[];
  aiRuling?: string;
}

export interface PastDocument {
  id: string;
  name: string;
  sessionId: string;
  sessionTitle: string;
  date: string;
  type: string;
}
