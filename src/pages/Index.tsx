
import { useState } from 'react';
import { Code, Palette, Layers, Download, Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import DeveloperTools from '../components/DeveloperTools';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import FloatingBottomNav from '../components/FloatingBottomNav';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tools', href: '#tools' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DeveloperTools />
        <Contact />
      </main>

      {/* Enhanced Floating Navigation */}
      <FloatingBottomNav />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 left-6 z-40 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Index;
