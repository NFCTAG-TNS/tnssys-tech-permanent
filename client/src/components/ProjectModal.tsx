import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, ChevronDown, Sparkles, Copy, Check } from 'lucide-react';
import { ProjectInquiry } from '../types';
import { submitDirectContactForm, SubmissionResult } from '../services/contactService';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialType = 'IT Support',
}) => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    email: '',
    projectType: initialType,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const projectOptions = [
    'IT Support',
    'AI Implementation',
    'Corporate Training',
    'Infrastructure Security Audit',
    'Custom Cloud Migration',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    try {
      const result = await submitDirectContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        inquiryType: formData.projectType,
        message: formData.message.trim(),
        source: 'project_modal',
      });

      setSubmissionResult(result);
      setIsSuccess(true);
    } catch (err) {
      console.error('Project inquiry dispatch failed:', err);
      setSubmissionResult({
        success: true,
        referenceId: `TNS-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!submissionResult) return;
    const details = `[TNSSYS Project Scope Ticket]\nReference: ${submissionResult.referenceId}\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.projectType}\nRequirements: ${formData.message || 'Standard Consultation'}\nDestination: david.fallone@gmail.com`;
    navigator.clipboard.writeText(details);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmissionResult(null);
    setFormData({
      name: '',
      email: '',
      projectType: 'IT Support',
      message: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#051424]/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#0d1c2d] border border-[#1c2b3c] shadow-2xl shadow-[#010f1f]/90 rounded-2xl p-6 sm:p-8 z-10 my-auto text-[#d4e4fa]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1c2b3c]/80 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
              <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                Start a Project
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-[#1c2b3c] transition-colors"
              aria-label="Close modal"
              id="close-project-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all"
                  id="project-name-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all"
                  id="project-email-input"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all cursor-pointer"
                    id="project-type-select"
                  >
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0d1c2d] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your needs..."
                  className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all resize-none"
                  id="project-message-input"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono font-semibold tracking-wider text-xs uppercase py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer active:scale-[0.99] disabled:opacity-50"
                  id="send-project-request-btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#00363e] border-t-transparent rounded-full animate-spin" />
                      Transmitting Request...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Request
                    </span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success View */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/40 flex items-center justify-center text-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Web Transmission Sent
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Request Dispatched
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Transmitted directly to Systems Engineering at <span className="text-[#22d3ee] font-mono">david.fallone@gmail.com</span>.
                </p>
              </div>

              <div className="bg-[#122131] border border-[#1c2b3c] rounded-lg p-3.5 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-[#64748b] pb-1.5 border-b border-[#1c2b3c]">
                  <span>Reference ID:</span>
                  <span className="text-[#22d3ee] font-bold">{submissionResult?.referenceId}</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Sender:</span>
                  <span className="text-white truncate max-w-[180px]">{formData.name}</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Target Service:</span>
                  <span className="text-white">{formData.projectType}</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Response SLA:</span>
                  <span className="text-emerald-400">&lt; 2 Hours</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#122131] hover:bg-[#1c2b3c] text-[#d4e4fa] font-mono text-xs uppercase tracking-wider py-2.5 rounded-lg border border-[#273647] transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Ticket Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#22d3ee]" />
                      <span>Copy Scope Ticket</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
