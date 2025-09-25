import { Certificate, User, VerificationRequest } from '../types';

// Mock data
export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'learner' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'learner' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'learner' },
  { id: '4', name: 'Tech Corp HR', email: 'hr@techcorp.com', role: 'employer' },
  { id: '5',  name: "Durvesh patil",email:'durveshpatil2005@gamol.com',role:'learner'},
  { id: '6',  name: "jay kolate",email:'jaykolate2005@gamol.com',role:'learner'},
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    learnerId: '1',
    title: 'Full Stack Development Certification',
    issuer: 'TechEd Institute',
    dateIssued: '2024-08-15',
    fileUrl: '/certificates/cert1.pdf',
    verificationStatus: 'verified',
    aiScore: 95,
    nsqfLevel: 6,
    hasQRCode: true,
    blockchainHash: '0x1234567890abcdef',
    metadata: {
      fileType: 'PDF',
      uploadDate: '2024-09-01',
      verificationSteps: {
        qrCheck: true,
        blockchainVerification: true,
        apiVerification: true,
        aiScoring: true,
      },
    },
  },
  {
    id: '2',
    learnerId: '1',
    title: 'React.js Professional Certificate',
    issuer: 'Meta',
    dateIssued: '2024-07-20',
    linkUrl: 'https://coursera.org/verify/cert123',
    verificationStatus: 'ai-scored',
    aiScore: 87,
    nsqfLevel: 5,
    hasQRCode: false,
    metadata: {
      uploadDate: '2024-09-05',
      verificationSteps: {
        qrCheck: false,
        blockchainVerification: false,
        apiVerification: true,
        aiScoring: true,
      },
    },
  },
  {
    id: '3',
    learnerId: '2',
    title: 'Data Science Fundamentals',
    issuer: 'DataCamp',
    dateIssued: '2024-06-10',
    fileUrl: '/certificates/cert3.pdf',
    verificationStatus: 'needs-review',
    nsqfLevel: 4,
    hasQRCode: false,
    metadata: {
      fileType: 'PDF',
      uploadDate: '2024-09-10',
      verificationSteps: {
        qrCheck: false,
        blockchainVerification: false,
        apiVerification: false,
        aiScoring: false,
      },
    },
  },
];

// Simulated API functions
export const uploadCertificate = async (certificate: Omit<Certificate, 'id' | 'verificationStatus' | 'metadata'>): Promise<Certificate> => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload delay
  
  const newCertificate: Certificate = {
    ...certificate,
    id: Date.now().toString(),
    verificationStatus: 'pending',
    metadata: {
      fileType: certificate.fileUrl ? 'PDF' : undefined,
      uploadDate: new Date().toISOString(),
      verificationSteps: {
        qrCheck: false,
        blockchainVerification: false,
        apiVerification: false,
        aiScoring: false,
      },
    },
  };

  // Simulate verification process
  const verified = await verifyCertificate(newCertificate.id);
  return { ...newCertificate, ...verified };
};

export const getCertificates = async (learnerId: string): Promise<Certificate[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCertificates.filter(cert => cert.learnerId === learnerId);
};

export const getAllCertificates = async (): Promise<Certificate[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCertificates;
};

export const searchLearners = async (query: string): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockUsers.filter(user => 
    user.role === 'learner' && 
    (user.name.toLowerCase().includes(query.toLowerCase()) || 
     user.email.toLowerCase().includes(query.toLowerCase()))
  );
};

// Verification Engine Simulation
export const verifyCertificate = async (certificateId: string): Promise<Partial<Certificate>> => {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate verification delay
  
  // Step 1: Check QR Code
  const hasQR = Math.random() > 0.5;
  
  // Step 2: Blockchain verification
  const blockchainVerified = hasQR && Math.random() > 0.3;
  
  // Step 3: API verification
  const apiVerified = Math.random() > 0.4;
  
  // Step 4: AI Credibility scoring
  const aiScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
  
  let verificationStatus: Certificate['verificationStatus'];
  
  if (blockchainVerified && apiVerified && aiScore >= 90) {
    verificationStatus = 'verified';
  } else if ((apiVerified || blockchainVerified) && aiScore >= 75) {
    verificationStatus = 'ai-scored';
  } else {
    verificationStatus = 'needs-review';
  }

  return {
    verificationStatus,
    aiScore,
    hasQRCode: hasQR,
    blockchainHash: blockchainVerified ? `0x${Math.random().toString(16).substr(2, 16)}` : undefined,
    metadata: {
      verificationSteps: {
        qrCheck: hasQR,
        blockchainVerification: blockchainVerified,
        apiVerification: apiVerified,
        aiScoring: true,
      },
    },
  };
};

export const requestManualVerification = async (certificateId: string, employerId: string): Promise<VerificationRequest> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    certificateId,
    employerId,
    status: 'pending',
    requestDate: new Date().toISOString(),
  };
};