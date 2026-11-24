import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
          <span>CAREER</span>
          <span className="text-zinc-600">/</span>
          <span>TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Professional Journey
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Hands-on software engineering experience building real-world enterprise backends, financial workflows, and database architectures.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Timeline Dot with Pulse */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#070708] border-2 border-[#10b981] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            </div>

            {/* Experience Card */}
            <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#10b981] mb-1">
                    {exp.company}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.employmentType} Employment
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Key Responsibilities & Contributions:
                </h4>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300"
                    >
                      <ChevronRight className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
                  Technologies & Ecosystem
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
