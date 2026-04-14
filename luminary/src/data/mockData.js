export const events = [
  {
    id: '1',
    title: 'Neon Nights Festival',
    category: 'Music',
    mood: 'Celebratory',
    date: '2026-05-15',
    time: '22:00',
    location: 'Tokyo, Japan',
    venue: 'Roppongi Hills Arena',
    price: 150,
    image: 'https://images.unsplash.com/photo-1540039155732-6761b54cbaca?q=80&w=1470&auto=format&fit=crop',
    attendees: 4200,
    totalSpots: 5000,
    organizer: 'Lumina Productions',
    tags: ['EDM', 'Nightlife', 'Interactive Art'],
    description: 'Experience a cybernetic wonderland where music meets interactive neon art installations.',
    speakers: [
      { id: 1, name: 'DJ Zedd', role: 'Headliner', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 2, name: 'Illusionist', role: 'Visual Arts', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    id: '2',
    title: 'Future Tech Summit',
    category: 'Tech',
    mood: 'Focused',
    date: '2026-06-10',
    time: '09:00',
    location: 'San Francisco, CA',
    venue: 'Moscone Center',
    price: 899,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop',
    attendees: 1850,
    totalSpots: 2000,
    organizer: 'TechForward',
    tags: ['AI', 'Web3', 'Quantum'],
    description: 'The definitive gathering for deep tech founders, investors, and visionaries shaping the next decade.',
    speakers: [
      { id: 1, name: 'Dr. Elena Rostova', role: 'AI Ethics Lead', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 2, name: 'Marcus Chen', role: 'Quantum Researcher', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    id: '3',
    title: 'Avant-Garde Gala',
    category: 'Art',
    mood: 'Creative',
    date: '2026-07-22',
    time: '19:00',
    location: 'Paris, France',
    venue: 'Grand Palais',
    price: 250,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop',
    attendees: 300,
    totalSpots: 350,
    organizer: 'Maison de l\'Art',
    tags: ['Contemporary', 'Exhibition', 'Gala'],
    description: 'An exclusive evening of immersive contemporary art, high fashion, and culinary excellence.',
    speakers: [
      { id: 1, name: 'Sophie Laurent', role: 'Curator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    id: '4',
    title: 'Midnight Jazz Cruise',
    category: 'Music',
    mood: 'Chill',
    date: '2026-05-28',
    time: '23:00',
    location: 'Mumbai, India',
    venue: 'Arabian Sea',
    price: 80,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1632&auto=format&fit=crop',
    attendees: 120,
    totalSpots: 150,
    organizer: 'Blue Note Events',
    tags: ['Jazz', 'Cruise', 'Intimate'],
    description: 'Sail out onto the Arabian Sea under the stars while listening to Mumbai\'s finest jazz quintet.',
    speakers: [
      { id: 1, name: 'Arjun Das Quintet', role: 'Performers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    id: '5',
    title: 'Global Startup Pitch',
    category: 'Business',
    mood: 'Focused',
    date: '2026-08-05',
    time: '10:00',
    location: 'London, UK',
    venue: 'The Shard',
    price: 120,
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1470&auto=format&fit=crop',
    attendees: 400,
    totalSpots: 500,
    organizer: 'Venture Catalyst',
    tags: ['Startups', 'Pitch', 'Networking'],
    description: 'Watch the next unicorn startups pitch live to top-tier international venture capitalists.',
    speakers: [
      { id: 1, name: 'Sarah Jenkins', role: 'Sequoia Partner', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    id: '6',
    title: 'Extreme Bouldering Comp',
    category: 'Sports',
    mood: 'Adventurous',
    date: '2026-09-12',
    time: '08:00',
    location: 'Denver, CO',
    venue: 'Red Rocks Amphitheatre',
    price: 45,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1403&auto=format&fit=crop',
    attendees: 5000,
    totalSpots: 8000,
    organizer: 'Altitude Sports',
    tags: ['Climbing', 'Outdoors', 'Competition'],
    description: 'Top athletes from around the world compete in an adrenaline-pumping outdoor bouldering challenge.',
    speakers: [
      { id: 1, name: 'Alex Johnson', role: 'Pro Climber', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  }
];

export const moods = ['Adventurous', 'Chill', 'Social', 'Creative', 'Focused', 'Celebratory'];
export const categories = ['Music', 'Tech', 'Art', 'Sports', 'Business', 'Food'];

export const kpiData = {
  revenue: 124500,
  revenueChange: 14.5,
  ticketsSold: 843,
  ticketsChange: 8.2,
  checkIns: 156,
  checkInsChange: -2.4,
  conversionRate: 12.8,
  conversionChange: 1.1
};

export const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 8000 },
  { name: 'Fri', value: 12000 },
  { name: 'Sat', value: 18000 },
  { name: 'Sun', value: 14000 },
];

export const ticketTierData = [
  { name: 'VIP', value: 400 },
  { name: 'Standard', value: 2000 },
  { name: 'Early Bird', value: 800 },
];
