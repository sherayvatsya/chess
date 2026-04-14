import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import EventsDiscovery from './pages/EventsDiscovery';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import AIAssistant from './components/features/AIAssistant';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsDiscovery />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </BrowserRouter>
  );
}

export default App;
