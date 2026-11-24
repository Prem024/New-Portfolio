import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambience: Subtle radial glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Small introductory text / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="tracking-widest uppercase text-[11px]">
              MERN STACK DEVELOPER · BUILDING DIGITAL PRODUCTS · AHMEDABAD, INDIA
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
        >
          Building digital experiences with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 underline decoration-white/20 underline-offset-8">
            clean code
          </span>{' '}
          and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-300">
            intelligent development
          </span>
          .
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed font-normal"
        >
          I&apos;m <span className="text-white font-medium">Prem Nanda</span>, an{' '}
          <span className="text-zinc-200 font-medium">AI-Enhanced MERN Stack Developer</span>{' '}
          focused on building scalable web applications, powerful backend systems, and modern user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-subtle group"
          >
            <span>Explore My Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.resumeUrl || '/Prem_Nanda_Resume.pdf'}
            download="Prem_Nanda_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white font-medium text-sm hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <Download className="w-4 h-4 text-[#10b981] group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Status Indicators / Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Current Role</span>
              <span className="text-xs font-medium text-zinc-200">
                {PERSONAL_INFO.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Location Base</span>
              <span className="text-xs font-medium text-zinc-200">
                {PERSONAL_INFO.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Collaboration</span>
              <span className="text-xs font-medium text-zinc-200">
                {PERSONAL_INFO.availability}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subtle Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 flex items-center justify-center"
        >
          <a
            href="#work"
            aria-label="Scroll to Selected Work"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-white/70"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
