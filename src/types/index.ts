export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'employer';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Certificate {
  id: string;
  learnerId: string;
  title: string;
  issuer: string;
  dateIssued: string;
  expiryDate?: string;
  fileUrl?: string;
  linkUrl?: string;
  verificationStatus: 'verified' | 'ai-scored' | 'needs-review' | 'pending';
  aiScore?: number;
  nsqfLevel: number;
  hasQRCode: boolean;
  blockchainHash?: string;
  metadata: {
    fileType?: string;
    uploadDate: string;
    verificationSteps: {
      qrCheck: boolean;
      blockchainVerification: boolean;
      apiVerification: boolean;
      aiScoring: boolean;
    };
  };
}

export interface VerificationRequest {
  id: string;
  certificateId: string;
  employerId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}