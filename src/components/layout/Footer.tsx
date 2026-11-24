import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070708] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-white">PN.</span>
            <span className="text-white font-semibold text-sm">{PERSONAL_INFO.name}</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            {PERSONAL_INFO.title} · {PERSONAL_INFO.location}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <span className="text-zinc-700">|</span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <span className="text-zinc-700">|</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span>&copy; 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
