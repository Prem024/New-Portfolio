import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Info, Check, Eye, ShieldAlert, Building2 } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { ProjectMockup } from './ProjectMockup';
import { ProjectModal } from '../ui/ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'enterprise' | 'opensource' | 'concept'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'enterprise') return p.isEnterprise;
    if (filter === 'opensource') return p.githubUrl && !p.isEnterprise;
    if (filter === 'concept') return p.isConcept;
    return true;
  });

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
            <span>PORTFOLIO</span>
            <span className="text-zinc-600">/</span>
            <span>ENGINEERING PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Selected Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Real-world systems, enterprise backends, and full-stack MERN applications I&apos;ve engineered.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900/60 border border-white/[0.06] w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === 'all'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Work ({PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter('enterprise')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === 'enterprise'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Enterprise ({PROJECTS.filter((p) => p.isEnterprise).length})
          </button>
          <button
            onClick={() => setFilter('opensource')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === 'opensource'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Open Source ({PROJECTS.filter((p) => p.githubUrl && !p.isEnterprise).length})
          </button>
          <button
            onClick={() => setFilter('concept')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === 'concept'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            AI Concept ({PROJECTS.filter((p) => p.isConcept).length})
          </button>
        </div>
      </div>

      {/* Projects List */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl bg-[#0c0d11] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-premium"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Project Info (Left: 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Category, Number & Enterprise/Org Badge */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] px-2.5 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20">
                        Project {project.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {project.category}
                      </span>
                      {project.organization && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                          <Building2 className="w-3 h-3" />
                          {project.organization}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                      {project.name}
                    </h3>

                    {/* Concept or Enterprise badge */}
                    {project.isConcept && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30">
                        <Info className="w-3 h-3 text-purple-400" />
                        <span>{project.conceptNote}</span>
                      </div>
                    )}
                    {project.isEnterprise && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30">
                        <ShieldAlert className="w-3 h-3 text-[#10b981]" />
                        <span>Production Enterprise Platform</span>
                      </div>
                    )}

                    {/* Tagline / Subtitle */}
                    {project.tagline && (
                      <p className="mt-2 text-xs font-mono text-zinc-400">
                        {project.tagline}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Key Features Quick Peek */}
                  {project.keyFeatures && (
                    <div className="space-y-1.5 pt-1">
                      {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-[#10b981] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Stack Tags */}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Core Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Architecture</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-xs font-mono text-[#10b981] hover:bg-[#10b981]/20 transition-colors"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.isEnterprise && (
                      <span className="text-[11px] font-mono text-zinc-400 italic">
                        Internal Platform / Enterprise Codebase
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Preview / Interactive Mockup (Right: 5 cols) */}
                <div className="lg:col-span-5 h-full">
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    title="Click to view full architecture details"
                  >
                    <ProjectMockup type={project.previewType} title={project.name} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
