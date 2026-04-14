import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Map as MapIcon, Calendar, Heart, Eye } from 'lucide-react';
import { categories } from '../data/mockData';

export default function EventsDiscovery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error fetching events:", err);
        setEvents([]);
        setLoading(false);
      });
  }, []);
  
  const filteredEvents = Array.isArray(events) ? events.filter(e => {
    const matchCategory = activeCategory === 'All' || e?.category === activeCategory;
    const matchSearch = (e?.title || '').toLowerCase().includes(search.toLowerCase()) || 
                        (e?.location || '').toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  }) : [];

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6">
      {/* Header & Filter Bar */}
      <div className="mb-12">
        <h1 className="text-5xl font-heading font-bold mb-8">Discover</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
          {/* Categories */}
          <div className="flex overflow-x-auto w-full md:w-auto hide-scrollbar custom-scroll gap-2 p-2">
            <FilterPill 
              label="All" 
              active={activeCategory === 'All'} 
              onClick={() => setActiveCategory('All')} 
            />
            {categories.map(cat => (
              <FilterPill 
                key={cat} 
                label={cat} 
                active={activeCategory === cat} 
                onClick={() => setActiveCategory(cat)} 
              />
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto p-2">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search events or cities..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-full px-5 py-2.5 text-sm text-white focus:outline-none focus:border-accentViolet/50 transition-colors"
              />
            </div>
            <button className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors">
              <Filter size={18} />
            </button>
            <button className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors flex items-center gap-2">
              <MapIcon size={18} />
              <span className="text-sm font-medium hidden lg:block pr-2">Map View</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center w-full min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-white/10 border-t-accentCyan rounded-full animate-spin"></div>
        </div>
      ) : (
        <React.Fragment>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredEvents.length === 0 && (
            <div className="py-20 text-center w-full min-h-[40vh]">
              <p className="text-textSecondary text-xl">No events found matching your criteria.</p>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        active 
          ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
          : 'bg-white/5 text-textSecondary hover:bg-white/10 hover:text-white border border-white/5'
      }`}
    >
      {label}
    </button>
  );
}

function EventCard({ event }) {
  const [interested, setInterested] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <Link to={`/events/${event.id}`}>
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur border border-white/10 rounded-full text-accentCyan">
            {event.category}
          </span>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); setInterested(!interested); }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur transition-all border ${interested ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-black/40 border-white/10 text-white hover:bg-black/60'}`}
        >
          <Heart size={18} fill={interested ? 'currentColor' : 'none'} />
        </button>
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Link to={`/events/${event.id}`} className="px-6 py-2 rounded-full bg-white text-black font-semibold flex items-center gap-2 pointer-events-auto hover:bg-gray-200 transition-colors">
            <Eye size={18} /> Quick View
          </Link>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/events/${event.id}`} className="hover:text-accentCyan transition-colors">
          <h3 className="text-2xl font-heading font-bold mb-2">{event.title}</h3>
        </Link>
        
        <div className="flex flex-col gap-2 mb-6 mt-2">
          <div className="flex items-center gap-2 text-sm text-textSecondary font-mono">
            <Calendar size={14} className="text-accentViolet" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-textSecondary font-mono">
            <MapIcon size={14} className="text-accentViolet" />
            <span>{event.venue}, {event.location}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-surface z-20"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-surface z-10"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-surface z-0 flex items-center justify-center text-[10px] font-bold text-white bg-accentViolet">+{event.attendees % 100}</div>
            </div>
            <span className="text-xs text-textSecondary">{event.attendees.toLocaleString()} attending</span>
          </div>
          <span className="font-heading font-bold text-lg">${event.price}</span>
        </div>
      </div>
    </motion.div>
  );
}
