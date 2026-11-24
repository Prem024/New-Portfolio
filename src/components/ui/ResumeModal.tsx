import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Mail, MapPin, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0d0e12] border border-white/10 shadow-2xl text-white overflow-hidden"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070708]/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                  Prem Nanda — Professional Resume
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.resumeUrl || '/Prem_Nanda_Resume.pdf'}
                  download="Prem_Nanda_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-xs font-mono text-[#10b981] hover:bg-[#10b981]/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Get in Touch
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0a0b0e]">
              {/* Header */}
              <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-lg text-[#10b981] font-medium mt-1">
                  {PERSONAL_INFO.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mt-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {PERSONAL_INFO.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    {PERSONAL_INFO.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                    {PERSONAL_INFO.status}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-4">
                  Work Experience
                </h2>
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{exp.role}</h3>
                        <p className="text-sm text-zinc-400">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#10b981] px-2.5 py-1 rounded bg-[#10b981]/10 border border-[#10b981]/20 mt-1 sm:mt-0 w-fit">
                        {exp.period} ({exp.employmentType})
                      </span>
                    </div>

                    <ul className="space-y-1.5 mt-3">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                          <span className="text-zinc-600 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Technical Expertise */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-4">
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <h3 className="text-xs font-mono font-semibold text-zinc-200 mb-2">
                        {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3">
                  Education & Qualifications
                </h2>
                <div className="space-y-3">
                  {PERSONAL_INFO.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start justify-between text-sm">
                      <div>
                        <p className="font-semibold text-zinc-200">{edu.degree}</p>
                        <p className="text-xs text-zinc-400">{edu.institution} · {edu.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
