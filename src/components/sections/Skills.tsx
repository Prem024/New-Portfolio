import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Wrench, Cloud, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend Development':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-[#10b981]" />;
      case 'Database Systems':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Development Tools & AI':
        return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'Deployment & DevOps':
        return <Cloud className="w-4 h-4 text-blue-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
          <span>CAPABILITIES</span>
          <span className="text-zinc-600">/</span>
          <span>STACK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Technologies I Work With
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          A focused stack built around the MERN ecosystem, modern backend architecture, reliable databases, and AI-accelerated tooling.
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className={`rounded-2xl bg-[#0c0d11] border p-6 flex flex-col justify-between transition-all duration-300 ${
              activeCategoryIndex === idx
                ? 'border-white/30 bg-[#121318]'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
            onMouseEnter={() => setActiveCategoryIndex(idx)}
            onMouseLeave={() => setActiveCategoryIndex(null)}
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="font-semibold text-white text-base">
                    {cat.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  0{idx + 1}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                {cat.description}
              </p>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                      skill.highlight
                        ? 'bg-white/[0.08] text-white border border-white/20 font-medium'
                        : 'bg-white/[0.02] text-zinc-400 border border-white/[0.05] hover:text-zinc-200'
                    }`}
                  >
                    {skill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle Footer indicator */}
            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>{cat.skills.length} core competencies</span>
              <span className="text-[#10b981]">Production tested</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
