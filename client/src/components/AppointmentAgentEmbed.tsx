import React, { useEffect } from 'react';

const IFRAME_ID = 'JotFormIFrame-01a00e933ac870008d5d2f2d9162c8e5bac5';
const IFRAME_SELECTOR = `iframe[id='${IFRAME_ID}']`;
const HANDLER_SCRIPT_ID = 'jotform-embed-handler';

export const AppointmentAgentEmbed: React.FC = () => {
  useEffect(() => {
    const initializeEmbedHandler = () => {
      const jotformWindow = window as Window & {
        jotformEmbedHandler?: (selector: string, origin: string) => void;
      };

      jotformWindow.jotformEmbedHandler?.(IFRAME_SELECTOR, 'https://www.jotform.com');
    };

    const existingScript = document.getElementById(HANDLER_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      initializeEmbedHandler();
      return;
    }

    const script = document.createElement('script');
    script.id = HANDLER_SCRIPT_ID;
    script.src = 'https://cdn.jotfor.ms/s/umd/603ab0a4535/for-form-embed-handler.js';
    script.async = true;
    script.onload = initializeEmbedHandler;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <section className="relative z-10 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#0075E3]/50 bg-[#0d1c2d] p-4 shadow-[0_0_35px_rgba(0,117,227,0.16)] sm:p-6">
        <div className="mb-4 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <span className="mb-2 inline-flex rounded border border-[#0075E3] bg-[#0075E3]/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8aebff]">
              Instant Voice Scheduling
            </span>
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
              Schedule via Voice AI Assistant
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#94a3b8] sm:text-sm">
              Speak or chat directly with our Appointment Request Agent to secure an engineering consultation slot.
            </p>
          </div>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
            Agent online
          </span>
        </div>

        <iframe
          id={IFRAME_ID}
          title="TNSSYS.TECH: Appointment Request Agent"
          allowTransparency
          allow="geolocation; microphone; camera; fullscreen"
          src="https://agent.jotform.com/01a00e933ac870008d5d2f2d9162c8e5bac5/voice?embedMode=iframe&autofocus=0&background=1&shadow=1"
          frameBorder="0"
          style={{ maxWidth: '100%', height: '688px', border: 'none', width: '100%' }}
          scrolling="no"
        />
      </div>
    </section>
  );
};

export default AppointmentAgentEmbed;

