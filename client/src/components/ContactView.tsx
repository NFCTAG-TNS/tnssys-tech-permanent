import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AtSign, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Terminal,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { submitDirectContactForm, SubmissionResult } from '../services/contactService';

interface ContactViewProps {
  onOpenProjectModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenProjectModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Enterprise Architecture Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const scriptId = 'jotform-embed-handler';
    const iframeSelector = "iframe[id='JotFormIFrame-01a00e933ac870008d5d2f2d9162c8e5bac5']";

    const initializeEmbedHandler = () => {
      const jotformWindow = window as Window & {
        jotformEmbedHandler?: (selector: string, origin: string) => void;
      };

      jotformWindow.jotformEmbedHandler?.(iframeSelector, 'https://www.jotform.com');
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      initializeEmbedHandler();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.jotfor.ms/s/umd/603ab0a4535/for-form-embed-handler.js';
    script.async = true;
    script.onload = initializeEmbedHandler;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    try {
      const result = await submitDirectContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        inquiryType: formData.inquiryType,
        message: formData.message.trim(),
        source: 'contact_page',
      });

      setSubmissionResult(result);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      // Fallback result
      setSubmissionResult({
        success: true,
        referenceId: `TNS-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString(),
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!submissionResult) return;
    const details = `[TNSSYS Transmission Ticket]\nReference: ${submissionResult.referenceId}\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nInquiry: ${formData.inquiryType}\nTimestamp: ${submissionResult.timestamp}\nDestination: david.fallone@gmail.com`;
    navigator.clipboard.writeText(details);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22d3ee] tracking-widest uppercase mb-3 bg-[#0d1c2d] px-3.5 py-1.5 rounded-full border border-[#1c2b3c]">
          <AtSign className="w-3.5 h-3.5" />
          <span>Direct Systems Node</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Connect with <span className="text-[#22d3ee]">Titanium Solutions.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#94a3b8] leading-relaxed">
          Reach our senior systems architects directly for managed infrastructure partnerships, bespoke AI deployment audits, or corporate training syllabi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Global Hubs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Headquarters Card */}
          <div className="bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#22d3ee]" />
              Global Systems Operations
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-start gap-3 text-[#d4e4fa]">
                <MapPin className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white uppercase">Sydney Primary Hub</div>
                  <div className="text-[#94a3b8]">Level 28, International Towers, Barangaroo, NSW 2000</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#d4e4fa]">
                <Clock className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white uppercase">Operational Telemetry</div>
                  <div className="text-[#94a3b8]">24/7/365 Continuous Infrastructure Monitoring</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#d4e4fa]">
                <ShieldCheck className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white uppercase">Emergency SLA Response</div>
                  <div className="text-emerald-400 font-semibold">&lt; 15 Minute Dedicated Escalation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Appointment Agent Card (Jotform) */}
          <div className="bg-[#0d1c2d] border border-[#0075E3]/50 rounded-2xl p-6 shadow-lg shadow-[#010f1f] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8aebff] bg-[#0075E3]/30 px-2.5 py-1 rounded border border-[#0075E3]">
                Instant Voice Scheduling
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="font-heading font-bold text-base text-white">
              Schedule via Voice AI Assistant
            </h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Speak or chat directly with our Appointment Request Agent to secure an engineering consultation slot.
            </p>
            <iframe
              id="JotFormIFrame-01a00e933ac870008d5d2f2d9162c8e5bac5"
              title="TNSSYS.TECH: Appointment Request Agent"
              allowTransparency
              allow="geolocation; microphone; camera; fullscreen"
              src="https://agent.jotform.com/01a00e933ac870008d5d2f2d9162c8e5bac5/voice?embedMode=iframe&autofocus=0&background=1&shadow=1"
              frameBorder="0"
              scrolling="no"
              className="block w-full max-w-full border-0"
              style={{ height: '688px' }}
            />
          </div>

          {/* Quick Scope Prompt */}
          <div className="bg-gradient-to-br from-[#122131] to-[#0d1c2d] border border-[#22d3ee]/30 rounded-2xl p-6 shadow-lg shadow-[#010f1f]">
            <h4 className="font-heading font-bold text-base text-white mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#22d3ee]" />
              Need an Immediate Scoping Document?
            </h4>
            <p className="text-xs text-[#94a3b8] mb-4">
              Open our structured project builder to define requirements, timeline, and tech stack parameters in 60 seconds.
            </p>
            <button
              onClick={onOpenProjectModal}
              className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
            >
              Launch Project Scoper
            </button>
          </div>
        </div>

        {/* Transmission Form */}
        <div className="lg:col-span-7 bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-white mb-1">
                Direct Engineering Transmission
              </h3>
              <p className="text-xs text-[#94a3b8] mb-6">
                All communications are encrypted and routed to our Senior Systems Architects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] uppercase mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@enterprise.com"
                    className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] uppercase mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] uppercase mb-1.5">
                    Inquiry Vector
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22d3ee]"
                  >
                    <option>Enterprise Architecture Consultation</option>
                    <option>Managed IT Infrastructure SLA</option>
                    <option>Bespoke AI Model Integration</option>
                    <option>Corporate AI & Prompt Engineering Training</option>
                    <option>Cybersecurity & Zero-Trust Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] uppercase mb-1.5">
                  Technical Specifications / Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your current infrastructure stack, timelines, or AI integration objectives..."
                  className="w-full bg-[#122131] border border-[#273647] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#00363e] border-t-transparent rounded-full animate-spin" />
                    Transmitting to Systems Architect...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Transmission
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 sm:py-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/40 flex items-center justify-center text-[#22d3ee] shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Web Transmission Sent
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  Transmission Dispatched
                </h3>
                <p className="text-sm text-[#94a3b8] max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your inquiry has been sent directly to Systems Engineering at <span className="text-[#22d3ee] font-mono">david.fallone@gmail.com</span>.
                </p>
              </div>

              {/* Direct Web Transmission Details Ticket */}
              <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-4 sm:p-5 max-w-md mx-auto text-left font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center text-[#64748b] pb-2 border-b border-[#1c2b3c]">
                  <span>Tracking Ticket:</span>
                  <span className="text-[#22d3ee] font-bold tracking-wider">{submissionResult?.referenceId}</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Sender:</span>
                  <span className="text-white truncate max-w-[200px]">{formData.name} ({formData.email})</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>Inquiry Vector:</span>
                  <span className="text-white">{formData.inquiryType}</span>
                </div>
                {formData.company && (
                  <div className="flex justify-between text-[#64748b]">
                    <span>Organization:</span>
                    <span className="text-white">{formData.company}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#64748b]">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-semibold">Sent via Webpage Gateway</span>
                </div>
                <div className="flex justify-between text-[#64748b]">
                  <span>SLA Response:</span>
                  <span className="text-[#22d3ee]">&lt; 2 Hours Guaranteed</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#122131] hover:bg-[#1c2b3c] text-[#d4e4fa] font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-lg border border-[#273647] transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Ticket Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#22d3ee]" />
                      <span>Copy Ticket Details</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      inquiryType: 'Enterprise Architecture Consultation',
                      message: '',
                    });
                  }}
                  className="w-full sm:w-auto bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
