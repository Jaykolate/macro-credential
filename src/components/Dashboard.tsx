import React from 'react';
import { LearnerDashboard } from './LearnerDashboard';
import { EmployerDashboard } from './EmployerDashboard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { GraduationCap, Building2, Shield, Brain, Eye, Zap, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'employer';
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {

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
            
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  {user.role === 'learner' ? (
                    <GraduationCap className="w-4 h-4 text-primary" />
                  ) : (
                    <Building2 className="w-4 h-4 text-primary" />
                  )}
                </div>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {user.role === 'learner' ? (
                  <GraduationCap className="w-5 h-5 text-primary" />
                ) : (
                  <Building2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {user.role === 'learner' ? 'Learner Dashboard' : 'Employer Dashboard'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user.role === 'learner' 
                    ? 'Manage and verify your certificates' 
                    : 'Search and verify candidate credentials'
                  }
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>AI-Powered Verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Instant Verification</span>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  {user.role === 'learner' ? (
                    <GraduationCap className="w-6 h-6 text-primary" />
                  ) : (
                    <Building2 className="w-6 h-6 text-primary" />
                  )}
                </div>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">
                  Welcome back, {user.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <Badge variant={user.role === 'learner' ? 'default' : 'secondary'}>
                {user.role === 'learner' ? 'Learner Account' : 'Employer Account'}
              </Badge>
            </div>
          </Card>

          {/* Dashboard Content */}
          <div className="space-y-6">
            {user.role === 'learner' ? (
              <LearnerDashboard learnerId={user.id} />
            ) : (
              <EmployerDashboard employerId={user.id} />
            )}
          </div>
        </div>

        {/* Features Overview */}
        <Card className="mt-12 p-6 bg-muted/30">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Verification Engine Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">QR Code Verification</p>
                <p className="text-muted-foreground">Instant certificate authenticity check</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Blockchain Hash</p>
                <p className="text-muted-foreground">Immutable certificate records</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">API Verification</p>
                <p className="text-muted-foreground">Direct issuer validation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">AI Credibility Scoring</p>
                <p className="text-muted-foreground">Machine learning assessment</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              CredentialVault - Built for Hackathon 2024
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>MERN Stack Prototype</span>
              <span>•</span>
              <span>AI-Powered Verification</span>
              <span>•</span>
              <span>NSQF Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};