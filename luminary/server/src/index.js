const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbFile = './dev.db';
const isNewDb = !fs.existsSync(dbFile);
const db = new Database(dbFile);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS Event (
    id TEXT PRIMARY KEY,
    title TEXT,
    category TEXT,
    mood TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    venue TEXT,
    price REAL,
    image TEXT,
    attendees INTEGER DEFAULT 0,
    totalSpots INTEGER,
    organizer TEXT,
    description TEXT,
    tags TEXT
  );

  CREATE TABLE IF NOT EXISTS DashboardStat (
    id TEXT PRIMARY KEY,
    revenue REAL,
    revenueChange REAL,
    ticketsSold INTEGER,
    ticketsChange REAL,
    checkIns INTEGER,
    checkInsChange REAL,
    conversionRate REAL,
    conversionChange REAL
  );
`);

// Seed data if DB is newly created and empty
const eventCount = db.prepare('SELECT COUNT(*) as count FROM Event').get().count;
if (eventCount === 0) {
  console.log('Seeding initial database...');
  
  const insertStat = db.prepare(`
    INSERT INTO DashboardStat (id, revenue, revenueChange, ticketsSold, ticketsChange, checkIns, checkInsChange, conversionRate, conversionChange)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertStat.run('1', 124500, 14.5, 843, 8.2, 156, -2.4, 12.8, 1.1);

  const insertEvent = db.prepare(`
    INSERT INTO Event (id, title, category, mood, date, time, location, venue, price, image, attendees, totalSpots, organizer, description, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertEvent.run(
    'evt_1', 'Neon Nights Festival', 'Music', 'Celebratory', '2026-05-15', '22:00', 'Tokyo, Japan', 'Roppongi Hills Arena', 150, 
    'https://images.unsplash.com/photo-1540039155732-6761b54cbaca?q=80&w=1470&auto=format&fit=crop', 4200, 5000, 
    'Lumina Productions', 'Experience a cybernetic wonderland where music meets interactive neon art installations.', 'EDM, Nightlife, Interactive Art'
  );

  insertEvent.run(
    'evt_2', 'Future Tech Summit', 'Tech', 'Focused', '2026-06-10', '09:00', 'San Francisco, CA', 'Moscone Center', 899,
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop', 1850, 2000,
    'TechForward', 'The definitive gathering for deep tech founders, investors, and visionaries shaping the next decade.', 'AI, Web3, Quantum'
  );
}

// API Routes
app.get('/api/events', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM Event').all();
    const formattedEvents = events.map(e => ({
      ...e,
      tags: e.tags ? e.tags.split(', ') : [],
      speakers: [] // Mocked out since we simplified relation for raw SQLite
    }));
    res.json(formattedEvents);
  } catch (error) {
    console.error("GET /api/events ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event
app.get('/api/events/:id', (req, res) => {
  try {
    const event = db.prepare('SELECT * FROM Event WHERE id = ?').get(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    res.json({
      ...event,
      tags: event.tags ? event.tags.split(', ') : [],
      speakers: []
    });
  } catch (error) {
    console.error("GET /api/events/:id ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

app.post('/api/events', (req, res) => {
  try {
    const id = `evt_${Date.now()}`;
    const data = {
      title: req.body.title || 'New Draft Event',
      category: req.body.category || 'Tech',
      mood: req.body.mood || 'Focused',
      date: req.body.date || new Date().toISOString(),
      time: req.body.time || '12:00',
      location: req.body.location || 'TBA',
      venue: req.body.venue || 'Virtual',
      price: parseFloat(req.body.price) || 0,
      image: req.body.image || 'https://images.unsplash.com/photo-1540039155732-6761b54cbaca?q=80&w=1470&auto=format&fit=crop',
      attendees: 0,
      totalSpots: 100,
      organizer: 'You',
      description: req.body.description || 'Awesome new event!',
      tags: 'New, Custom'
    };

    const insert = db.prepare(`
      INSERT INTO Event (id, title, category, mood, date, time, location, venue, price, image, attendees, totalSpots, organizer, description, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, data.title, data.category, data.mood, data.date, data.time, data.location, data.venue, data.price, data.image, data.attendees, data.totalSpots, data.organizer, data.description, data.tags);

    res.json({ id, ...data, tags: data.tags.split(', '), speakers: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.get('/api/dashboard', (req, res) => {
  try {
    const stats = db.prepare('SELECT * FROM DashboardStat WHERE id = ?').get("1");
    res.json(stats);
  } catch (error) {
    console.error("GET /api/dashboard ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
