import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Rocket, User, Mail, Lock, LogOut } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      setShowAuthModal(false);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', path: '/events' },
    { name: 'Create Event', path: '/create' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-iridescent-gradient flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-shadow">
            <Rocket size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-wider text-white">LUMINARY</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accentCyan relative group ${location.pathname === link.path ? 'text-white' : 'text-textSecondary'}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accentCyan" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-textSecondary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Search size={20} />
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-accentViolet to-accentCyan p-[2px]"
                >
                  <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" alt="Profile" className="w-full h-full object-cover opacity-90" />
                  </div>
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 glass-card rounded-xl overflow-hidden py-2 border border-white/10 shadow-2xl"
                    >
                      <div className="px-4 py-2 border-b border-white/10 mb-2">
                        <p className="font-bold text-white text-sm">Alex Rossi</p>
                        <p className="text-xs text-textSecondary truncate">alex.rossi@example.com</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-textSecondary hover:text-white hover:bg-white/5 transition-colors">
                        <User size={16} /> My Tickets
                      </Link>
                      <button 
                        onClick={() => { setIsLoggedIn(false); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all hover:border-accentViolet"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium ${location.pathname === link.path ? 'text-accentCyan' : 'text-textSecondary'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex gap-4">
                {isLoggedIn ? (
                  <button onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false); }} className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-300 font-medium border border-red-500/30">Sign Out</button>
                ) : (
                  <>
                    <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); setMobileMenuOpen(false); }} className="flex-1 py-3 rounded-xl border border-white/10 text-textSecondary hover:text-white font-medium">Sign In</button>
                    <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); setMobileMenuOpen(false); }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium">Sign Up</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAuthModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accentViolet rounded-full blur-[80px] opacity-20" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accentCyan rounded-full blur-[80px] opacity-20" />

              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-textSecondary hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-iridescent-gradient flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                      <Rocket size={20} className="text-accentCyan" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-heading font-bold text-center text-white mb-2">
                  {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-center text-textSecondary mb-8 text-sm">
                  {authMode === 'login' ? 'Sign in to manage your tickets and events.' : 'Join Luminary to host and discover extraordinary events.'}
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {authMode === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2 mt-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-textSecondary" />
                          </div>
                          <input 
                            type="text" 
                            required={authMode === 'signup'}
                            className="w-full bg-surfaceHighlight border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accentCyan/50 transition-colors placeholder:text-white/20"
                            placeholder="Alex Rossi"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-textSecondary" />
                      </div>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-surfaceHighlight border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accentCyan/50 transition-colors placeholder:text-white/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={18} className="text-textSecondary" />
                      </div>
                      <input 
                        type="password" 
                        required
                        className="w-full bg-surfaceHighlight border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accentCyan/50 transition-colors placeholder:text-white/20"
                        placeholder="••••••••"
                      />
                    </div>
                    {authMode === 'login' && (
                      <div className="flex justify-end mt-2">
                        <button type="button" className="text-xs text-accentCyan hover:underline">Forgot password?</button>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoggingIn}
                    className="w-full py-3 mt-4 rounded-xl font-bold text-black border border-transparent flex justify-center relative overflow-hidden group disabled:opacity-80"
                  >
                    <div className="absolute inset-0 bg-white transition-transform group-hover:scale-[1.02]" />
                    <span className="relative flex items-center gap-2">
                      {isLoggingIn ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          {authMode === 'login' ? 'Authenticating...' : 'Creating Account...'}
                        </>
                      ) : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                    </span>
                  </button>
                </form>

                <p className="text-center text-sm text-textSecondary mt-6">
                  {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
                    className="text-white hover:text-accentCyan font-medium transition-colors"
                  >
                    {authMode === 'login' ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
