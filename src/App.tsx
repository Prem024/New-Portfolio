import React, { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { About } from './components/sections/About';
import { Approach } from './components/sections/Approach';
import { Contact } from './components/sections/Contact';
import { MessagesPage } from './components/pages/MessagesPage';

function isMessagesRoute(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized === '/messages' || normalized === '/admin';
}

export const App: React.FC = () => {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setPathname(to);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  if (isMessagesRoute(pathname)) {
    return <MessagesPage onNavigateHome={() => navigate('/')} />;
  }

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
      <Footer onOpenMessages={() => navigate('/messages')} />
    </div>
  );
};

export default App;
