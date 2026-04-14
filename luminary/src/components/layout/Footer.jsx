import React from 'react';
import { Rocket, MessageSquare, Camera, Briefcase, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 rounded-full bg-iridescent-gradient flex items-center justify-center">
                <Rocket size={16} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-white">LUMINARY</span>
            </Link>
            <p className="text-textSecondary mb-6 max-w-sm">
              The premier platform for discovering, creating, and managing extraordinary events worldwide. Experience the extraordinary.
            </p>
            <div className="flex gap-4">
              <SocialIcon Icon={MessageSquare} />
              <SocialIcon Icon={Camera} />
              <SocialIcon Icon={Briefcase} />
              <SocialIcon Icon={Code} />
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/events" text="Discover Events" /></li>
              <li><FooterLink href="#" text="Trending Cities" /></li>
              <li><FooterLink href="#" text="Host an Event" /></li>
              <li><FooterLink href="#" text="Pricing" /></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Stay in the Loop</h4>
            <p className="text-textSecondary text-sm mb-4">Get curated event recommendations sent right to your inbox.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-accentViolet text-white"
              />
              <button className="bg-iridescent-gradient text-white px-4 py-2 rounded-r-lg font-medium opacity-90 hover:opacity-100 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textSecondary text-sm">
            © {new Date().getFullYear()} Luminary Event Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-textSecondary">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ Icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textSecondary hover:text-white hover:bg-white/10 transition-all hover:shadow-[0_0_15px_rgba(138,43,226,0.4)]">
    <Icon size={18} />
  </a>
);

const FooterLink = ({ href, text }) => (
  <Link to={href} className="text-textSecondary hover:text-accentCyan transition-colors text-sm">
    {text}
  </Link>
);
