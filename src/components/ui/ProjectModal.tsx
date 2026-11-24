import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, AlertCircle } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e0f13] border border-white/10 p-6 sm:p-8 shadow-2xl text-white"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] px-2.5 py-1 rounded bg-[#10b981]/10 border border-[#10b981]/20">
                    Project {project.number}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {project.category}
                  </span>
                  {project.organization && (
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                      {project.organization}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-white">
                  {project.name}
                </h3>
                {project.tagline && (
                  <p className="mt-1 text-xs font-mono text-zinc-400">
                    {project.tagline}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-Development / Concept Callout if applicable */}
            {project.isConcept && (
              <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-semibold">{project.conceptNote || 'Concept Phase'}</span>
                  <p className="mt-1 text-xs text-amber-300/80">
                    This project represents an innovative architecture prototype currently under conceptual design and development.
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
                Overview & Architecture
              </h4>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {project.detailedDescription}
              </p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Core Capabilities & Functional Highlights
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-zinc-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span className="font-mono text-xs text-[#10b981] mt-0.5">0{idx + 1}.</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-300"
                    >
                      <p className="font-mono text-[11px] text-zinc-400 mb-1">Architecture #{idx + 1}</p>
                      {arch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-400" />
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/10 text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Preview
                  </a>
                )}
                {project.isEnterprise && (
                  <span className="text-xs font-mono text-zinc-400 italic">
                    Proprietary internal platform · Azentra Technologies
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
