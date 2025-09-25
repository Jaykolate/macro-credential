import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation & Header
    'nav.credentialVault': 'CredentialVault',
    'nav.microCredentialAggregator': 'Micro-Credential Aggregator',
    'nav.signIn': 'Sign In',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.learner': 'Learner Dashboard',
    'dashboard.employer': 'Employer Dashboard',
    'dashboard.manageCertificates': 'Manage and verify your certificates',
    'dashboard.searchVerify': 'Search and verify candidate credentials',
    'dashboard.welcomeBack': 'Welcome back',
    'dashboard.learnerAccount': 'Learner Account',
    'dashboard.employerAccount': 'Employer Account',
    
    // Certificates
    'certificates.myCertificates': 'My Certificates',
    'certificates.manageCertificates': 'Manage and track your micro-credentials',
    'certificates.uploadCertificate': 'Upload Certificate',
    'certificates.editCertificate': 'Edit Certificate',
    'certificates.deleteCertificate': 'Delete Certificate',
    'certificates.title': 'Certificate Title',
    'certificates.issuer': 'Issuer',
    'certificates.dateIssued': 'Date Issued',
    'certificates.expiryDate': 'Expiry Date',
    'certificates.nsqfLevel': 'NSQF Level',
    'certificates.verificationStatus': 'Verification Status',
    'certificates.aiScore': 'AI Credibility Score',
    'certificates.viewPDF': 'View PDF',
    'certificates.viewCertificate': 'View Certificate',
    'certificates.verified': 'Verified',
    'certificates.aiScored': 'AI-scored',
    'certificates.needsReview': 'Needs Review',
    'certificates.pending': 'Pending',
    'certificates.expiringIn': 'Expiring in',
    'certificates.days': 'days',
    'certificates.expired': 'Expired',
    'certificates.expiringWarning': 'Certificate expiring soon!',
    'certificates.expiredWarning': 'Certificate has expired!',
    
    // Forms
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.delete': 'Delete',
    'form.edit': 'Edit',
    'form.upload': 'Upload',
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.selectLevel': 'Select level',
    'form.enterTitle': 'Enter certificate title',
    'form.enterIssuer': 'Enter issuer name',
    'form.chooseFile': 'Choose file',
    'form.enterUrl': 'Enter certificate URL',
    
    // Status & Filters
    'status.all': 'All',
    'status.verified': 'Verified',
    'status.aiScored': 'AI-Scored',
    'status.needsReview': 'Needs Review',
    'status.pending': 'Pending',
    'status.total': 'Total',
    'filter.status': 'Status',
    'filter.nsqfLevel': 'NSQF Level',
    'filter.allLevels': 'All Levels',
    'filter.level': 'Level',
    'search.certificates': 'Search certificates...',
    'search.learners': 'Search by name or email...',
    
    // Messages
    'message.certificateUpdated': 'Certificate updated successfully!',
    'message.certificateDeleted': 'Certificate deleted successfully!',
    'message.certificateUploaded': 'Certificate uploaded and verification started!',
    'message.fillAllFields': 'Please fill in all required fields',
    'message.confirmDelete': 'Are you sure you want to delete this certificate?',
    'message.deleteWarning': 'This action cannot be undone.',
    'message.noCertificates': 'No certificates found',
    'message.uploadFirst': 'Upload your first certificate to get started',
    'message.adjustFilters': 'Try adjusting your search or filter criteria',
    
    // Employer
    'employer.searchLearners': 'Search Learners',
    'employer.searchResults': 'Search Results',
    'employer.viewCertificates': 'View Certificates',
    'employer.certificatesFor': 'certificates for',
    'employer.noLearners': 'No learners found matching',
    'employer.enterSearch': 'Enter at least 2 characters to search for learners by name or email',
    
    // Auth
    'auth.createAccount': 'Create Account',
    'auth.welcomeBack': 'Welcome Back',
    'auth.joinCredentialVault': 'Join CredentialVault to manage and verify your micro-credentials',
    'auth.signInAccess': 'Sign in to access your dashboard and manage certificates',
    'auth.learner': 'Learner',
    'auth.employer': 'Employer',
    'auth.joinAsLearner': 'Join as a Learner',
    'auth.learnerSignIn': 'Learner Sign In',
    'auth.uploadManage': 'Upload and manage your certificates',
    'auth.accessDashboard': 'Access your certificate dashboard',
    'auth.joinAsEmployer': 'Join as an Employer',
    'auth.employerSignIn': 'Employer Sign In',
    'auth.verifyCandidates': 'Verify candidate credentials',
    'auth.accessEmployerDashboard': 'Access your employer dashboard',
    'auth.fullName': 'Full Name',
    'auth.emailAddress': 'Email Address',
    'auth.organization': 'Organization',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.enterFullName': 'Enter your full name',
    'auth.enterEmail': 'Enter your email',
    'auth.enterOrganization': 'Enter your organization name',
    'auth.choosePassword': 'Choose a strong password',
    'auth.confirmYourPassword': 'Confirm your password',
    'auth.enterPassword': 'Enter your password',
    'auth.passwordLength': 'Must be at least 8 characters long',
    'auth.creatingAccount': 'Creating Account...',
    'auth.signingIn': 'Signing In...',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.signUp': 'Sign Up',
    'auth.organizationRequired': 'Organization name is required for employers',
    'auth.accountCreated': 'Account created successfully!',
    'auth.authFailed': 'Authentication failed. Please try again.',
    'auth.passwordsNotMatch': 'Passwords do not match',
    
    // Features
    'features.aiPowered': 'AI-Powered Verification Engine',
    'features.qrVerification': 'QR Code Verification',
    'features.instantCheck': 'Instant authenticity check through embedded QR codes',
    'features.blockchainSecurity': 'Blockchain Security',
    'features.immutableRecords': 'Immutable certificate records stored on blockchain',
    'features.apiVerification': 'API Verification',
    'features.directValidation': 'Direct validation with issuing institutions',
    'features.aiScoring': 'AI Credibility Scoring',
    'features.mlAssessment': 'Machine learning assessment of certificate authenticity',
    'features.verificationAccuracy': 'Verification Accuracy',
    'features.averageTime': 'Average Verification Time',
    'features.supportedInstitutions': 'Supported Institutions',
    
    // Landing Page
    'landing.verifyAggregate': 'Verify & Aggregate',
    'landing.microCredentials': 'Micro-Credentials',
    'landing.secureAiPowered': 'Secure, AI-powered platform for learners to manage certificates and employers to verify credentials instantly. Built with blockchain technology and NSQF compliance.',
    'landing.getStartedLearner': 'Get Started as Learner',
    'landing.joinAsEmployer': 'Join as Employer',
    'landing.completeVerification': 'Complete Verification Solution',
    'landing.aiPoweredEngine': 'Our AI-powered engine provides comprehensive certificate verification through multiple validation layers',
    'landing.builtForEveryone': 'Built for Everyone',
    'landing.advancingCareer': 'Whether you\'re advancing your career or hiring top talent',
    'landing.forLearners': 'For Learners',
    'landing.manageShowcase': 'Manage and showcase your credentials',
    'landing.forEmployers': 'For Employers',
    'landing.verifyInstantly': 'Verify candidate credentials instantly',
    'landing.readyTransform': 'Ready to Transform Credential Verification?',
    'landing.joinThousands': 'Join thousands of learners and employers already using CredentialVault',
    'landing.startAsLearner': 'Start as Learner',
    'landing.hackathonPrototype': 'Hackathon Prototype 2024',
    'landing.mernStack': 'MERN Stack',
    'landing.nsqfCompliant': 'NSQF Compliant',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.close': 'Close',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
  },
  hi: {
    // Navigation & Header
    'nav.credentialVault': 'क्रेडेंशियल वॉल्ट',
    'nav.microCredentialAggregator': 'माइक्रो-क्रेडेंशियल एग्रीगेटर',
    'nav.signIn': 'साइन इन',
    'nav.logout': 'लॉग आउट',
    
    // Dashboard
    'dashboard.learner': 'शिक्षार्थी डैशबोर्ड',
    'dashboard.employer': 'नियोक्ता डैशबोर्ड',
    'dashboard.manageCertificates': 'अपने प्रमाणपत्रों का प्रबंधन और सत्यापन करें',
    'dashboard.searchVerify': 'उम्मीदवार की साख खोजें और सत्यापित करें',
    'dashboard.welcomeBack': 'वापसी पर स्वागत है',
    'dashboard.learnerAccount': 'शिक्षार्थी खाता',
    'dashboard.employerAccount': 'नियोक्ता खाता',
    
    // Certificates
    'certificates.myCertificates': 'मेरे प्रमाणपत्र',
    'certificates.manageCertificates': 'अपने माइक्रो-क्रेडेंशियल्स का प्रबंधन और ट्रैकिंग करें',
    'certificates.uploadCertificate': 'प्रमाणपत्र अपलोड करें',
    'certificates.editCertificate': 'प्रमाणपत्र संपादित करें',
    'certificates.deleteCertificate': 'प्रमाणपत्र हटाएं',
    'certificates.title': 'प्रमाणपत्र शीर्षक',
    'certificates.issuer': 'जारीकर्ता',
    'certificates.dateIssued': 'जारी करने की तारीख',
    'certificates.expiryDate': 'समाप्ति तिथि',
    'certificates.nsqfLevel': 'NSQF स्तर',
    'certificates.verificationStatus': 'सत्यापन स्थिति',
    'certificates.aiScore': 'AI विश्वसनीयता स्कोर',
    'certificates.viewPDF': 'PDF देखें',
    'certificates.viewCertificate': 'प्रमाणपत्र देखें',
    'certificates.verified': 'सत्यापित',
    'certificates.aiScored': 'AI-स्कोर्ड',
    'certificates.needsReview': 'समीक्षा आवश्यक',
    'certificates.pending': 'लंबित',
    'certificates.expiringIn': 'समाप्त हो रहा है',
    'certificates.days': 'दिनों में',
    'certificates.expired': 'समाप्त',
    'certificates.expiringWarning': 'प्रमाणपत्र जल्द समाप्त हो रहा है!',
    'certificates.expiredWarning': 'प्रमाणपत्र समाप्त हो गया है!',
    
    // Forms
    'form.save': 'सेव करें',
    'form.cancel': 'रद्द करें',
    'form.delete': 'हटाएं',
    'form.edit': 'संपादित करें',
    'form.upload': 'अपलोड करें',
    'form.required': 'आवश्यक',
    'form.optional': 'वैकल्पिक',
    'form.selectLevel': 'स्तर चुनें',
    'form.enterTitle': 'प्रमाणपत्र शीर्षक दर्ज करें',
    'form.enterIssuer': 'जारीकर्ता का नाम दर्ज करें',
    'form.chooseFile': 'फ़ाइल चुनें',
    'form.enterUrl': 'प्रमाणपत्र URL दर्ज करें',
    
    // Status & Filters
    'status.all': 'सभी',
    'status.verified': 'सत्यापित',
    'status.aiScored': 'AI-स्कोर्ड',
    'status.needsReview': 'समीक्षा आवश्यक',
    'status.pending': 'लंबित',
    'status.total': 'कुल',
    'filter.status': 'स्थिति',
    'filter.nsqfLevel': 'NSQF स्तर',
    'filter.allLevels': 'सभी स्तर',
    'filter.level': 'स्तर',
    'search.certificates': 'प्रमाणपत्र खोजें...',
    'search.learners': 'नाम या ईमेल से खोजें...',
    
    // Messages
    'message.certificateUpdated': 'प्रमाणपत्र सफलतापूर्वक अपडेट किया गया!',
    'message.certificateDeleted': 'प्रमाणपत्र सफलतापूर्वक हटाया गया!',
    'message.certificateUploaded': 'प्रमाणपत्र अपलोड किया गया और सत्यापन शुरू हुआ!',
    'message.fillAllFields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
    'message.confirmDelete': 'क्या आप वाकई इस प्रमाणपत्र को हटाना चाहते हैं?',
    'message.deleteWarning': 'यह क्रिया पूर्ववत नहीं की जा सकती।',
    'message.noCertificates': 'कोई प्रमाणपत्र नहीं मिला',
    'message.uploadFirst': 'शुरुआत करने के लिए अपना पहला प्रमाणपत्र अपलोड करें',
    'message.adjustFilters': 'अपनी खोज या फ़िल्टर मानदंड समायोजित करने का प्रयास करें',
    
    // Employer
    'employer.searchLearners': 'शिक्षार्थी खोजें',
    'employer.searchResults': 'खोज परिणाम',
    'employer.viewCertificates': 'प्रमाणपत्र देखें',
    'employer.certificatesFor': 'के लिए प्रमाणपत्र',
    'employer.noLearners': 'कोई शिक्षार्थी नहीं मिला',
    'employer.enterSearch': 'नाम या ईमेल से शिक्षार्थियों को खोजने के लिए कम से कम 2 अक्षर दर्ज करें',
    
    // Auth
    'auth.createAccount': 'खाता बनाएं',
    'auth.welcomeBack': 'वापसी पर स्वागत है',
    'auth.joinCredentialVault': 'अपने माइक्रो-क्रेडेंशियल्स का प्रबंधन और सत्यापन करने के लिए क्रेडेंशियल वॉल्ट में शामिल हों',
    'auth.signInAccess': 'अपने डैशबोर्ड तक पहुंचने और प्रमाणपत्रों का प्रबंधन करने के लिए साइन इन करें',
    'auth.learner': 'शिक्षार्थी',
    'auth.employer': 'नियोक्ता',
    'auth.joinAsLearner': 'शिक्षार्थी के रूप में शामिल हों',
    'auth.learnerSignIn': 'शिक्षार्थी साइन इन',
    'auth.uploadManage': 'अपने प्रमाणपत्र अपलोड और प्रबंधित करें',
    'auth.accessDashboard': 'अपने प्रमाणपत्र डैशबोर्ड तक पहुंचें',
    'auth.joinAsEmployer': 'नियोक्ता के रूप में शामिल हों',
    'auth.employerSignIn': 'नियोक्ता साइन इन',
    'auth.verifyCandidates': 'उम्मीदवार की साख सत्यापित करें',
    'auth.accessEmployerDashboard': 'अपने नियोक्ता डैशबोर्ड तक पहुंचें',
    'auth.fullName': 'पूरा नाम',
    'auth.emailAddress': 'ईमेल पता',
    'auth.organization': 'संगठन',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.enterFullName': 'अपना पूरा नाम दर्ज करें',
    'auth.enterEmail': 'अपना ईमेल दर्ज करें',
    'auth.enterOrganization': 'अपने संगठन का नाम दर्ज करें',
    'auth.choosePassword': 'एक मजबूत पासवर्ड चुनें',
    'auth.confirmYourPassword': 'अपने पासवर्ड की पुष्टि करें',
    'auth.enterPassword': 'अपना पासवर्ड दर्ज करें',
    'auth.passwordLength': 'कम से कम 8 अक्षर लंबा होना चाहिए',
    'auth.creatingAccount': 'खाता बनाया जा रहा है...',
    'auth.signingIn': 'साइन इन हो रहे हैं...',
    'auth.alreadyHaveAccount': 'पहले से खाता है?',
    'auth.dontHaveAccount': 'खाता नहीं है?',
    'auth.signUp': 'साइन अप',
    'auth.organizationRequired': 'नियोक्ताओं के लिए संगठन का नाम आवश्यक है',
    'auth.accountCreated': 'खाता सफलतापूर्वक बनाया गया!',
    'auth.authFailed': 'प्रमाणीकरण विफल। कृपया पुनः प्रयास करें।',
    'auth.passwordsNotMatch': 'पासवर्ड मेल नहीं खाते',
    
    // Features
    'features.aiPowered': 'AI-संचालित सत्यापन इंजन',
    'features.qrVerification': 'QR कोड सत्यापन',
    'features.instantCheck': 'एम्बेडेड QR कोड के माध्यम से तत्काल प्रामाणिकता जांच',
    'features.blockchainSecurity': 'ब्लॉकचेन सुरक्षा',
    'features.immutableRecords': 'ब्लॉकचेन पर संग्रहीत अपरिवर्तनीय प्रमाणपत्र रिकॉर्ड',
    'features.apiVerification': 'API सत्यापन',
    'features.directValidation': 'जारी करने वाली संस्थानों के साथ प्रत्यक्ष सत्यापन',
    'features.aiScoring': 'AI विश्वसनीयता स्कोरिंग',
    'features.mlAssessment': 'प्रमाणपत्र प्रामाणिकता का मशीन लर्निंग मूल्यांकन',
    'features.verificationAccuracy': 'सत्यापन सटीकता',
    'features.averageTime': 'औसत सत्यापन समय',
    'features.supportedInstitutions': 'समर्थित संस्थान',
    
    // Landing Page
    'landing.verifyAggregate': 'सत्यापित और एकत्रित करें',
    'landing.microCredentials': 'माइक्रो-क्रेडेंशियल्स',
    'landing.secureAiPowered': 'शिक्षार्थियों के लिए प्रमाणपत्र प्रबंधित करने और नियोक्ताओं के लिए तुरंत साख सत्यापित करने के लिए सुरक्षित, AI-संचालित प्लेटफॉर्म। ब्लॉकचेन तकनीक और NSQF अनुपालन के साथ निर्मित।',
    'landing.getStartedLearner': 'शिक्षार्थी के रूप में शुरुआत करें',
    'landing.joinAsEmployer': 'नियोक्ता के रूप में शामिल हों',
    'landing.completeVerification': 'पूर्ण सत्यापन समाधान',
    'landing.aiPoweredEngine': 'हमारा AI-संचालित इंजन कई सत्यापन परतों के माध्यम से व्यापक प्रमाणपत्र सत्यापन प्रदान करता है',
    'landing.builtForEveryone': 'सभी के लिए निर्मित',
    'landing.advancingCareer': 'चाहे आप अपने करियर को आगे बढ़ा रहे हों या शीर्ष प्रतिभा को नियुक्त कर रहे हों',
    'landing.forLearners': 'शिक्षार्थियों के लिए',
    'landing.manageShowcase': 'अपनी साख का प्रबंधन और प्रदर्शन करें',
    'landing.forEmployers': 'नियोक्ताओं के लिए',
    'landing.verifyInstantly': 'उम्मीदवार की साख तुरंत सत्यापित करें',
    'landing.readyTransform': 'क्रेडेंशियल सत्यापन को बदलने के लिए तैयार हैं?',
    'landing.joinThousands': 'पहले से ही क्रेडेंशियल वॉल्ट का उपयोग कर रहे हजारों शिक्षार्थियों और नियोक्ताओं में शामिल हों',
    'landing.startAsLearner': 'शिक्षार्थी के रूप में शुरुआत करें',
    'landing.hackathonPrototype': 'हैकाथॉन प्रोटोटाइप 2024',
    'landing.mernStack': 'MERN स्टैक',
    'landing.nsqfCompliant': 'NSQF अनुपालित',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    'common.close': 'बंद करें',
    'common.yes': 'हां',
    'common.no': 'नहीं',
    'common.ok': 'ठीक है',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};