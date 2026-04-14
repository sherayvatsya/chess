import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Calendar, MapPin } from 'lucide-react';
import { events, moods } from '../data/mockData';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Featured events
  const featured = events.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-mesh-glow opacity-60 z-0"></div>
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(138,43,226,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,255,255,0.15) 0%, transparent 40%)',
            backgroundSize: '200% 200%'
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-accentCyan text-sm font-medium mb-6">
              Welcome to the New Standard
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-6 leading-tight"
          >
            EXPERIENCE THE <br/>
            <span className="text-gradient">EXTRAORDINARY</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-textSecondary mb-10 max-w-2xl mx-auto font-light"
          >
            Discover, create, and manage ultra-premium events worldwide. Step into a cinematic world of unparalleled experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/events" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-iridescent-gradient animate-spin-slow"></span>
              <div className="relative bg-background px-8 py-4 rounded-full flex items-center gap-2 group-hover:bg-opacity-0 transition-all duration-300">
                <span className="font-semibold group-hover:text-black transition-colors">Explore Events</span>
                <ArrowRight size={18} className="group-hover:text-black transition-colors" />
              </div>
            </Link>
            
            <Link to="/create" className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-medium hover:bg-white/5 transition-all">
              Host an Event
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 border-y border-white/5 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {[
            { label: 'Events Hosted', value: '12K+', icon: Calendar },
            { label: 'Happy Attendees', value: '2.5M', icon: Users },
            { label: 'Global Cities', value: '140', icon: Globe },
            { label: 'Top Organizers', value: '850+', icon: MapPin },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center px-4"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4 text-accentCyan">
                <stat.icon size={20} />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-textSecondary text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Events Parallax */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Vanguard Events</h2>
              <p className="text-textSecondary text-lg font-subheading">Curated experiences defying expectations.</p>
            </div>
            <Link to="/events" className="text-accentCyan hover:text-white flex items-center gap-2 transition-colors pb-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((event, i) => (
              <motion.div
                key={event.id}
                style={{ y: i % 2 === 0 ? y1 : y2 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-96 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-accentGold">
                    {event.date}
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-accentViolet font-semibold text-sm tracking-wider uppercase mb-2 block">{event.category}</span>
                    <h3 className="font-heading font-bold text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-iridescent-gradient transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Discovery */}
      <section className="py-32 bg-surface/30 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">How are you feeling?</h2>
          <p className="text-textSecondary text-lg mb-16 font-subheading">Let your mood dictate your next experience.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {moods.map((mood, i) => (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border border-white/10 glass-card text-white hover:border-accentViolet transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10 font-medium">{mood}</span>
                <div className="absolute inset-0 bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Marquee */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="flex space-x-8 animate-marquee whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-500">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="inline-flex items-center gap-4">
              <span className="font-heading text-4xl lg:text-6xl text-white font-bold tracking-tighter">"Absolutely unreal experience."</span>
              <div className="w-4 h-4 bg-accentCyan rounded-full mx-4"></div>
            </div>
          ))}
        </div>
        <div className="flex space-x-8 animate-marquee whitespace-nowrap opacity-40 mt-8" style={{ animationDirection: 'reverse' }}>
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="inline-flex items-center gap-4">
              <span className="font-heading text-4xl lg:text-6xl text-transparent bg-clip-text font-bold tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>"The platform of the future."</span>
              <div className="w-4 h-4 bg-accentViolet rounded-full mx-4"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
