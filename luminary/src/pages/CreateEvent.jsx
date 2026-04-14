import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Check, Sparkles, UploadCloud, MapPin, Calendar, Clock } from 'lucide-react';

const STEPS = ['Basic Info', 'Date & Location', 'Tickets', 'Agenda', 'Preview'];

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');

  const generateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDescription("A truly transformative experience that redefines the boundaries of modern networking. Join industry leaders and visionaries for a day of deep insights, powerful connections, and groundbreaking discussions. Expect immersive sessions, interactive workshops, and an exclusive after-party designed to foster collaboration.");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Create Event</h1>
        
        {/* Progress Indicator */}
        <div className="relative mt-8">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-accentCyan -translate-y-1/2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 z-10 ${
                  index < currentStep ? 'bg-accentCyan text-black' : 
                  index === currentStep ? 'bg-background border-2 border-accentCyan text-accentCyan shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 
                  'bg-surface border border-white/20 text-textSecondary'
                }`}>
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
                <span className={`text-xs font-medium hidden md:block ${index <= currentStep ? 'text-white' : 'text-textSecondary'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        {/* Auto save indicator */}
        <div className="absolute top-6 right-8 flex items-center gap-2 text-xs text-textSecondary font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-accentCyan animate-pulse-fast" />
          Auto-saving...
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Basic Information</h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-textSecondary">Event Title</label>
                  <input type="text" placeholder="e.g. Neon Nights Festival" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accentViolet/50 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-textSecondary">Category</label>
                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accentViolet/50 transition-colors appearance-none">
                      <option>Music</option>
                      <option>Tech</option>
                      <option>Art</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-textSecondary">Mood</label>
                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accentViolet/50 transition-colors appearance-none">
                      <option>Celebratory</option>
                      <option>Focused</option>
                      <option>Chill</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-textSecondary">Description</label>
                    <button 
                      onClick={generateAI}
                      className="text-xs text-accentGold flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <Sparkles size={12} /> Suggest with AI
                    </button>
                  </div>
                  <div className="relative">
                    <textarea 
                      rows="4" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your extraordinary event..." 
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accentViolet/50 transition-colors" 
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-sm font-mono text-accentGold flex items-center gap-2">
                          <Sparkles size={16} className="animate-spin-slow" /> Generating Brilliance...
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-textSecondary">Cover Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white/30 transition-colors bg-surface/50">
                    <UploadCloud size={32} className="text-textSecondary mb-3" />
                    <p className="text-sm text-white font-medium mb-1">Click or drag image to upload</p>
                    <p className="text-xs text-textSecondary">High-res (1920x1080) recommended</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Date & Location</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-textSecondary">Date</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input type="date" className="w-full bg-background border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accentViolet/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-textSecondary">Time</label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input type="time" className="w-full bg-background border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accentViolet/50" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <div className="space-y-2">
                      <label className="text-sm font-medium text-textSecondary">Venue Location</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input type="text" placeholder="Search address..." className="w-full bg-background border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accentViolet/50" />
                      </div>
                    </div>
                    <div className="h-32 rounded-xl bg-surface border border-white/10 overflow-hidden relative">
                      {/* Fake Map */}
                      <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" alt="Map" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-accentViolet/20 border border-accentViolet flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep > 1 && currentStep < 4 && (
              <div className="flex-1 flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Sparkles className="text-accentCyan" />
                </div>
                <h3 className="text-xl font-bold mb-2">Step {currentStep + 1}: {STEPS[currentStep]}</h3>
                <p className="text-textSecondary">This section would contain advanced builders for {STEPS[currentStep].toLowerCase()}.</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accentViolet to-accentCyan flex items-center justify-center shadow-[0_0_30px_rgba(138,43,226,0.3)] mx-auto">
                  <Check size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-2">Ready to Publish</h2>
                  <p className="text-textSecondary max-w-md mx-auto">Your event looks extraordinary. It will be live on Luminary and available for ticket sales immediately.</p>
                </div>
                <div className="w-full max-w-sm aspect-video rounded-xl border border-white/10 overflow-hidden relative group mt-4">
                   <img src="https://images.unsplash.com/photo-1540039155732-6761b54cbaca?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Preview" />
                   <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-left">
                     <span className="text-xs font-bold text-accentViolet uppercase">Preview</span>
                     <h4 className="font-heading font-bold text-lg text-white">Neon Nights Festival</h4>
                   </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center bg-surface/50 -mx-8 -mb-8 px-8 pb-8 !pt-6">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-textSecondary hover:text-white bg-white/5 hover:bg-white/10'}`}
          >
            Back
          </button>
          
          <button 
            onClick={() => {
              if (currentStep === STEPS.length - 1) {
                fetch('/api/events', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: 'Neon Nights Festival (New)',
                    category: 'Music',
                    mood: 'Celebratory',
                    description: description
                  })
                })
                .then(res => res.json())
                .then(data => alert("Event Published Successfully! ID: " + data.id))
                .catch(err => alert("Failed to publish event"));
              } else {
                setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1));
              }
            }}
            className="px-8 py-2.5 rounded-full font-medium transition-all bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            {currentStep === STEPS.length - 1 ? 'Publish Event' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
