import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Share2, Heart, AlertCircle } from 'lucide-react';


export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewerCount, setViewerCount] = useState(42);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !event || event.error) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center w-full">
        <div className="w-12 h-12 border-4 border-white/10 border-t-accentCyan rounded-full animate-spin mb-4"></div>
        {event?.error && <p className="text-red-500 font-mono">Error: {event.error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Parallax */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Live Pulse */}
        <div className="absolute top-32 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <motion.div 
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2.5 h-2.5 rounded-full bg-red-500" 
          />
          <span className="text-xs font-mono text-white">{viewerCount} viewing now</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-background via-background/80 to-transparent pt-32 pb-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accentViolet/20 border border-accentViolet/50 text-accentViolet rounded-full text-xs font-bold tracking-wider uppercase">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold tracking-wider uppercase">
                  {event.mood}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-4 leading-tight">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-textSecondary font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accentCyan" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-accentCyan" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-accentCyan" />
                  <span>{event.venue}, {event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto hide-scrollbar">
            {['overview', 'schedule', 'speakers', 'venue'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold uppercase tracking-wider relative whitespace-nowrap transition-colors ${activeTab === tab ? 'text-white' : 'text-textSecondary hover:text-white/80'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accentCyan" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">About this Event</h3>
                  <p className="text-textSecondary leading-relaxed text-lg font-light">{event.description}</p>
                  <p className="text-textSecondary leading-relaxed text-lg font-light mt-4">
                    Join us for an unforgettable experience curated by {event.organizer}. Prepare to immerse yourself in an atmosphere of innovation, connection, and inspiration. Your ticket includes VIP access to all primary areas and an exclusive networking reception.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-surface border border-white/5 text-sm text-textSecondary">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-accentViolet/10 to-accentCyan/10 border border-white/10 flex items-start gap-4">
                  <AlertCircle size={24} className="text-accentCyan shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Smart Conflict Detected</h4>
                    <p className="text-sm text-textSecondary">You have another saved event ("Design Summit 2026") that overlaps with this time. Plan carefully!</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'speakers' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map(speaker => (
                  <div key={speaker.id} className="relative h-64 [perspective:1000px] group">
                    <div className="absolute inset-0 transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden bg-surface border border-white/10 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                        <img src={speaker.image} alt={speaker.name} className="w-full h-48 object-cover opacity-80 mix-blend-luminosity" />
                        <div className="p-4 bg-surface absolute bottom-0 w-full border-t border-white/5">
                          <h4 className="font-bold text-white">{speaker.name}</h4>
                          <p className="text-xs text-accentCyan font-mono">{speaker.role}</p>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 bg-surfaceHighlight border border-white/20 rounded-2xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                        <h4 className="font-bold text-white mb-2">{speaker.name}</h4>
                        <p className="text-sm text-textSecondary">A visionary in their field, presenting revolutionary concepts that bridge technology and art.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-2xl font-heading font-bold mb-4">Event Schedule</h3>
                <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
                  {[
                    { time: '09:00 AM', title: 'Registration & Welcome', desc: 'Check-in, grab your badge, and enjoy some morning refreshments.' },
                    { time: '10:30 AM', title: 'Opening Keynote', desc: 'A visionary look into the future of our industry.' },
                    { time: '12:00 PM', title: 'Networking Lunch', desc: 'Connect with peers over a curated culinary experience.' },
                    { time: '02:00 PM', title: 'Breakout Sessions', desc: 'Choose from 4 different tracks of hands-on workshops.' },
                    { time: '05:00 PM', title: 'Closing Ceremony & Afterparty', desc: 'Live music, drinks, and celebration.' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accentCyan shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                      <span className="text-sm font-mono text-accentViolet mb-1 block">{item.time}</span>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-textSecondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'venue' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-2xl font-heading font-bold mb-4">{event.venue}</h3>
                <div className="flex items-start gap-4 text-textSecondary mb-6">
                  <MapPin className="text-accentCyan shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-white">{event.location}</p>
                    <p className="text-sm mt-1">Conveniently located in the heart of the city, easily accessible via public transit and major highways.</p>
                  </div>
                </div>
                <div className="h-64 rounded-2xl bg-surface border border-white/10 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Map" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="w-12 h-12 rounded-full bg-accentViolet/20 border-2 border-accentViolet flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.6)] backdrop-blur-sm">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-accentViolet mt-2 blur-sm" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-surface/50 border border-white/5">
                    <h4 className="font-bold text-sm text-white mb-1">Parking</h4>
                    <p className="text-xs text-textSecondary">Valet and self-parking available on-site.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface/50 border border-white/5">
                    <h4 className="font-bold text-sm text-white mb-1">Accessibility</h4>
                    <p className="text-xs text-textSecondary">Fully ADA compliant with ramp access.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar / Ticket Card */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 glass-card rounded-3xl p-8 border border-white/10 animate-fade-in-up">
            <h3 className="text-3xl font-heading font-bold mb-2">Tickets</h3>
            <p className="text-textSecondary mb-6">Select your tier to secure a spot.</p>

            <div className="space-y-4 mb-8">
              {['Standard', 'VIP'].map((tier, i) => (
                <label key={tier} className="relative block group">
                  <input type="radio" name="ticket_tier" className="peer sr-only" defaultChecked={i === 0} />
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 peer-checked:border-accentCyan peer-checked:bg-accentCyan/5 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">{tier} Pass</span>
                      <span className="font-mono text-white">${tier === 'VIP' ? event.price * 2 : event.price}</span>
                    </div>
                    <p className="text-xs text-textSecondary">{tier === 'VIP' ? 'Front row, backstage + drinks' : 'General admission'}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-white/30 peer-checked:border-accentCyan peer-checked:border-[4px] transition-all" />
                </label>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-textSecondary">Availability</span>
                <span className="text-red-400 font-bold flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Only 12 left!
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-accentGold w-[95%]" />
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Get Tickets
            </button>

            {/* Social Squad Teaser */}
            <div className="mt-6 text-center pt-6 border-t border-white/5">
              <p className="text-sm font-medium text-white mb-3">Bring your squad, get 20% off!</p>
              <div className="flex justify-center -space-x-3 mb-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a24] bg-white/10 flex items-center justify-center overflow-hidden">
                    <Users size={12} className="text-white/50" />
                  </div>
                ))}
              </div>
              <button className="text-xs text-accentCyan hover:underline">Invite Friends</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
