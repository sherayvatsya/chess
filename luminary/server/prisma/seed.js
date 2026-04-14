const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const events = [
  {
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
    tags: 'EDM, Nightlife, Interactive Art',
    description: 'Experience a cybernetic wonderland where music meets interactive neon art installations.',
    speakers: {
      create: [
        { name: 'DJ Zedd', role: 'Headliner', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80' },
        { name: 'Illusionist', role: 'Visual Arts', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' }
      ]
    }
  },
  {
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
    tags: 'AI, Web3, Quantum',
    description: 'The definitive gathering for deep tech founders, investors, and visionaries shaping the next decade.',
    speakers: {
      create: [
        { name: 'Dr. Elena Rostova', role: 'AI Ethics Lead', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80' },
        { name: 'Marcus Chen', role: 'Quantum Researcher', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' }
      ]
    }
  },
  {
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
    tags: 'Contemporary, Exhibition, Gala',
    description: 'An exclusive evening of immersive contemporary art, high fashion, and culinary excellence.',
    speakers: {
      create: [
        { name: 'Sophie Laurent', role: 'Curator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80' }
      ]
    }
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Create dashboard stats
  await prisma.dashboardStat.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      revenue: 124500,
      revenueChange: 14.5,
      ticketsSold: 843,
      ticketsChange: 8.2,
      checkIns: 156,
      checkInsChange: -2.4,
      conversionRate: 12.8,
      conversionChange: 1.1
    }
  });

  // Create events
  for (const eventData of events) {
    const event = await prisma.event.create({
      data: eventData
    });
    console.log(`Created event with id: ${event.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
