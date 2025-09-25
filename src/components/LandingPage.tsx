import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AuthModal } from './AuthModal';
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  Brain, 
  Zap, 
  Eye, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  FileCheck,
  Lock
} from 'lucide-react';

interface LandingPageProps {
  onAuthSuccess?: (user: { id: string; name: string; email: string; role: 'learner' | 'employer' }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    type: 'login' | 'signup';
    role: 'learner' | 'employer';
  }>({
    isOpen: false,
    type: 'login',
    role: 'learner'
  });

  const openAuth = (type: 'login' | 'signup', role: 'learner' | 'employer') => {
    setAuthModal({ isOpen: true, type, role });
  };

  const closeAuth = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">CredentialVault</h1>
                <p className="text-xs text-muted-foreground">Micro-Credential Aggregator</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => openAuth('login', 'learner')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <Badge className="mb-6" variant="outline">
              🔬 AI-Powered Verification Engine
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Verify & Aggregate
              <br />
              Micro-Credentials
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Secure, AI-powered platform for learners to manage certificates and employers to verify credentials instantly. Built with blockchain technology and NSQF compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={() => openAuth('signup', 'learner')}
              >
                <GraduationCap className="w-5 h-5" />
                Get Started as Learner
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={() => openAuth('signup', 'employer')}
              >
                <Building2 className="w-5 h-5" />
                Join as Employer
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Verification Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2.5s</div>
                <div className="text-muted-foreground">Average Verification Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Supported Institutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Verification Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered engine provides comprehensive certificate verification through multiple validation layers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">QR Code Verification</h3>
              <p className="text-sm text-muted-foreground">
                Instant authenticity check through embedded QR codes
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Blockchain Security</h3>
              <p className="text-sm text-muted-foreground">
                Immutable certificate records stored on blockchain
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">API Verification</h3>
              <p className="text-sm text-muted-foreground">
                Direct validation with issuing institutions
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">AI Credibility Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Machine learning assessment of certificate authenticity
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're advancing your career or hiring top talent
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Learners */}
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">For Learners</h3>
                  <p className="text-muted-foreground">Manage and showcase your credentials</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Upload certificates from any institution</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Get instant AI-powered verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>NSQF level classification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Share verified credentials with employers</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  onClick={() => openAuth('signup', 'learner')}
                >
                  Sign Up Free
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => openAuth('login', 'learner')}
                >
                  Sign In
                </Button>
              </div>
            </Card>

            {/* Employers */}
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">For Employers</h3>
                  <p className="text-muted-foreground">Verify candidate credentials instantly</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Search and verify learner profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>View AI credibility scores</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Request manual verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>NSQF compliance reporting</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  onClick={() => openAuth('signup', 'employer')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => openAuth('login', 'employer')}
                >
                  Sign In
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Credential Verification?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Join thousands of learners and employers already using CredentialVault
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={() => openAuth('signup', 'learner')}
            >
              <GraduationCap className="w-5 h-5" />
              Start as Learner
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex items-center gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => openAuth('signup', 'employer')}
            >
              <Building2 className="w-5 h-5" />
              Join as Employer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">CredentialVault</h3>
                  <p className="text-sm text-muted-foreground">Micro-Credential Aggregator</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Secure, AI-powered platform for micro-credential verification and management. 
                Built with blockchain technology and NSQF compliance.
              </p>
              <Badge variant="outline">🚀 Hackathon Prototype 2024</Badge>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>AI Verification</p>
                <p>Blockchain Security</p>
                <p>NSQF Compliance</p>
                <p>API Integration</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tech Stack</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>React.js Frontend</p>
                <p>Node.js Backend</p>
                <p>MongoDB Database</p>
                <p>Express.js API</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 CredentialVault. Built for Hackathon.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>MERN Stack</span>
              <span>•</span>
              <span>AI-Powered</span>
              <span>•</span>
              <span>NSQF Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuth}
        type={authModal.type}
        role={authModal.role}
        onSwitchType={(newType) => setAuthModal({ ...authModal, type: newType })}
        onSwitchRole={(newRole) => setAuthModal({ ...authModal, role: newRole })}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  );
};