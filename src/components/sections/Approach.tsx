import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Layout, Code2, Rocket } from 'lucide-react';
import { APPROACH_STEPS } from '../../data/portfolioData';

export const Approach: React.FC = () => {
  const getStepIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      case '02':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case '03':
        return <Code2 className="w-5 h-5 text-[#10b981]" />;
      case '04':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="approach" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
          <span>PROCESS</span>
          <span className="text-zinc-600">/</span>
          <span>METHODOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          My Development Approach
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          A disciplined, four-stage engineering methodology turning abstract requirements into robust, high-performance software.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {APPROACH_STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                <span className="text-3xl font-black font-mono text-zinc-500 group-hover:text-white transition-colors">
                  {step.number}
                </span>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  {getStepIcon(step.number)}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-[#10b981] mt-1 mb-4">
                {step.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Deliverables / Checklist */}
            <div className="mt-8 pt-4 border-t border-white/[0.04] space-y-1.5">
              {step.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
