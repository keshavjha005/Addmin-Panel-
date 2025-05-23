
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Key, Sparkles } from "lucide-react";

const securityQuestion = "In which city were you born?";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "reset";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { login, resetPassword } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    setPasswordError("");
    setIsSubmitting(true);
    
    try {
      // Modified to pass the new password and security answer
      await resetPassword(email, newPassword, securityAnswer);
      setActiveTab("login");
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="cosmic-glass max-w-md w-full p-6 animate-fade-in relative overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-10 animate-pulse"></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-star">
                <Sparkles className="w-8 h-8 text-cosmic-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="animate-float">
                <div className="h-16 w-16 rounded-full bg-cosmic-accent/20 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cosmic-light via-cosmic-accent to-cosmic-light bg-clip-text text-transparent">
              Cosmic Access Portal
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "reset")} className="relative z-10 w-full mt-4">
          <TabsList className="grid grid-cols-2 w-full bg-cosmic-dark/50">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light transition-all duration-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="reset" 
              className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light transition-all duration-300"
            >
              Reset Password
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cosmic-light">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astral.com"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-cosmic-light">Password</Label>
                  <button 
                    type="button" 
                    className="text-cosmic-accent text-xs hover:text-cosmic-light transition-colors"
                    onClick={() => setActiveTab("reset")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic-accent hover:bg-cosmic hover:scale-[1.02] active:scale-[0.98] text-cosmic-dark font-semibold transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
                    Connecting...
                  </span>
                ) : (
                  'Enter the Cosmos'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="reset" className="space-y-4 mt-4">
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-cosmic-light">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astral.com"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security-q" className="text-cosmic-light">{securityQuestion}</Label>
                <div className="relative group">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="security-q"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-cosmic-light">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-cosmic-light">Confirm New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4 transition-colors group-hover:text-cosmic-accent" />
                  <Input 
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent transition-all duration-300 hover:bg-cosmic-dark/40"
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-red-400 text-sm">{passwordError}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic-accent hover:bg-cosmic hover:scale-[1.02] active:scale-[0.98] text-cosmic-dark font-semibold transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-cosmic-light hover:bg-cosmic-dark/30 transition-all duration-300"
                onClick={() => setActiveTab("login")}
              >
                Back to Login
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
