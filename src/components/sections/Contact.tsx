import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Copy, Check, Github, Linkedin, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { submitContactMessage } from '../../lib/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message of at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await submitContactMessage({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : 'Unable to send message right now. Please try again or email directly.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-3">
          <span>CONNECT</span>
          <span className="text-zinc-600">/</span>
          <span>GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Have an idea? Let&apos;s build something meaningful.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          I&apos;m always interested in connecting with developers, teams, and people building interesting products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info & Direct Links (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Quick Contact Card */}
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Direct Contact Channels
            </h3>

            {/* Email quick-copy */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <span className="text-xs font-mono uppercase text-zinc-500">Email Address</span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm text-white hover:text-[#10b981] transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#10b981]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location & Response Time */}
            <div className="space-y-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Typical response time: within 24 hours</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-500 block">
                Professional Networks
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#10b981]" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Github className="w-4 h-4 text-zinc-300" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Delivered</h4>
                <p className="text-sm text-zinc-400 max-w-md">
                  Thank you for reaching out! Your message has been received and I will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-zinc-400">
                      Your Name <span className="text-[#10b981]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Your Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.name
                          ? 'border-red-500/50 focus:ring-red-500'
                          : 'border-white/10 focus:border-white/30 focus:ring-white/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-zinc-400">
                      Your Email <span className="text-[#10b981]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="abc@gmail.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-red-500/50 focus:ring-red-500'
                          : 'border-white/10 focus:border-white/30 focus:ring-white/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono text-zinc-400">
                    Subject <span className="text-[#10b981]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Full-Stack Collaboration"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                      errors.subject
                        ? 'border-red-500/50 focus:ring-red-500'
                        : 'border-white/10 focus:border-white/30 focus:ring-white/20'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-400">
                    Message <span className="text-[#10b981]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project, timeline, and architectural requirements..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all resize-y ${
                      errors.message
                        ? 'border-red-500/50 focus:ring-red-500'
                        : 'border-white/10 focus:border-white/30 focus:ring-white/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs font-mono text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
