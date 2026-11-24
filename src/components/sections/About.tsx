import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
          <span>PROFILE</span>
          <span className="text-zinc-600">/</span>
          <span>BACKGROUND</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          A Little About Me
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Narrative (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 sm:p-8 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Engineering with pragmatism, clean logic, and modern tools.
            </h3>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              I&apos;m a developer who enjoys turning complex problems into practical digital solutions. I enjoy working across the MERN stack, exploring modern development technologies, and building applications that solve real-world problems.
            </p>

            <blockquote className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-[#10b981] text-zinc-300 italic text-sm sm:text-base">
              &quot;I believe good software is not just about writing code. It&apos;s about creating reliable systems, solving problems efficiently, and delivering meaningful user experiences.&quot;
            </blockquote>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Based in Ahmedabad, Gujarat, India, I combine classic full-stack architecture principles (relational integrity in PostgreSQL, clean Express routing, modular React state) with modern AI development tooling (Cursor, Antigravity, LLMs) to write better code faster with high testability.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Education & Fast Facts (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Education Card */}
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h4 className="font-semibold text-white text-base">
                Education & Training
              </h4>
            </div>

            <div className="space-y-4">
              {PERSONAL_INFO.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="font-semibold text-sm text-zinc-200">{edu.degree}</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics / Location Card */}
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <MapPin className="w-5 h-5 text-[#10b981]" />
              <h4 className="font-semibold text-white text-base">
                Location & Availability
              </h4>
            </div>

            <div className="space-y-3 text-xs font-mono text-zinc-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-zinc-400">Current Base</span>
                <span className="text-white">Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-zinc-400">Status</span>
                <span className="text-emerald-400">Open for Freelance & Teams</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-zinc-400">Timezone</span>
                <span className="text-white">IST (UTC +5:30)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
