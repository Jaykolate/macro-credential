import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { GraduationCap, Building2, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
  role: 'learner' | 'employer';
  onSwitchType: (type: 'login' | 'signup') => void;
  onSwitchRole: (role: 'learner' | 'employer') => void;
  onAuthSuccess?: (user: { id: string; name: string; email: string; role: 'learner' | 'employer' }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  type,
  role,
  onSwitchType,
  onSwitchRole,
  onAuthSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup') {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }

      if (role === 'employer' && !formData.organization) {
        toast.error('Organization name is required for employers');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.error('Please enter your email and password');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const user = {
        id: Date.now().toString(),
        name: formData.name || `${role === 'learner' ? 'Learner' : 'Employer'} User`,
        email: formData.email,
        role: role
      };

      toast.success(type === 'signup' ? 'Account created successfully!' : 'Welcome back!');
      
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
      
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: ''
      });
      
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSwitch = (newRole: 'learner' | 'employer') => {
    onSwitchRole(newRole);
    // Clear organization field when switching from employer to learner
    if (newRole === 'learner') {
      setFormData({ ...formData, organization: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {type === 'signup' ? 'Create Account' : 'Welcome Back'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {type === 'signup' 
              ? 'Join CredentialVault to manage and verify your micro-credentials'
              : 'Sign in to access your dashboard and manage certificates'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Role Selection */}
        <Tabs value={role} onValueChange={handleRoleSwitch} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learner" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Learner
            </TabsTrigger>
            <TabsTrigger value="employer" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Employer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learner" className="mt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold">
                {type === 'signup' ? 'Join as a Learner' : 'Learner Sign In'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {type === 'signup' 
                  ? 'Upload and manage your certificates'
                  : 'Access your certificate dashboard'
                }
              </p>
            </div>
          </TabsContent>

          <TabsContent value="employer" className="mt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold">
                {type === 'signup' ? 'Join as an Employer' : 'Employer Sign In'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {type === 'signup' 
                  ? 'Verify candidate credentials'
                  : 'Access your employer dashboard'
                }
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          {type === 'signup' && role === 'employer' && (
            <div>
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Enter your organization name"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={type === 'signup' ? 'Choose a strong password' : 'Enter your password'}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {type === 'signup' && (
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters long
              </p>
            )}
          </div>

          {type === 'signup' && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {type === 'signup' ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              type === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </Button>
        </form>

        <Separator />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => onSwitchType(type === 'signup' ? 'login' : 'signup')}
          >
            {type === 'signup' ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>

        {type === 'signup' && (
          <div className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            This is a hackathon prototype for demonstration purposes.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};