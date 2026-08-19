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
  Globe
} from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    const targetEmail = 'david.fallone@gmail.com';
    const subject = encodeURIComponent(`[TNSSYS Contact] ${formData.inquiryType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'Not Specified'}\n` +
      `Inquiry Vector: ${formData.inquiryType}\n\n` +
      `Requirements / Message:\n${formData.message || 'No additional specifications provided.'}\n\n` +
      `---\nSent via Titanium Solutions (TNSSYS.TECH)`
    );

    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    // Attempt to open email client
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback if browser blocks protocol
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
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
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/40 flex items-center justify-center text-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                Message Successfully Dispatched
              </h3>
              <p className="text-sm text-[#94a3b8] max-w-md mx-auto">
                Thank you, {formData.name}. Your specifications have been routed to <span className="text-[#22d3ee]">david.fallone@gmail.com</span>. We will follow up to <span className="text-white font-medium">{formData.email}</span> within our guaranteed 2-hour SLA window.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:david.fallone@gmail.com?subject=${encodeURIComponent(`[TNSSYS Contact] ${formData.inquiryType} - ${formData.name}`)}&body=${encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not Specified'}\nInquiry Vector: ${formData.inquiryType}\n\nRequirements / Message:\n${formData.message || 'No additional specifications provided.'}`
                  )}`}
                  className="bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase px-5 py-2.5 rounded-lg transition-all"
                >
                  Send via Email Client
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#122131] hover:bg-[#1c2b3c] text-white font-mono text-xs uppercase px-5 py-2.5 rounded-lg border border-[#1c2b3c] transition-colors"
                >
                  New Transmission
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
