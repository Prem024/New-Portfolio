import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { About } from './components/sections/About';
import { Approach } from './components/sections/Approach';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070708] text-[#f4f4f5] selection:bg-white/20 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <About />
        <Approach />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
