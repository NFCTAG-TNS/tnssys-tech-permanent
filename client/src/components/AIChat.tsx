import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Terminal, Bot, User, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  onOpenProjectModal?: (serviceType?: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({
  isOpenExternal,
  onCloseExternal,
  onOpenProjectModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Greetings. I am the Titanium Systems Architect AI. How can I assist with your IT infrastructure hardening, bespoke AI model deployment, or corporate training roadmaps?',
      timestamp: 'Active Node',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Sync external open state
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const quickPrompts = [
    'How do we deploy custom RAG search?',
    'What is included in Managed IT SLA?',
    'Corporate AI workshop syllabus',
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: ChatMessage = { 
      role: 'user', 
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 50);

    const responseText = await sendMessageToGemini(text);

    setMessages((prev) => [
      ...prev,
      { 
        role: 'model', 
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[92vw] sm:w-96 bg-[#0d1c2d] border border-[#22d3ee]/40 rounded-2xl overflow-hidden shadow-2xl shadow-[#010f1f]/90"
            id="titanium-ai-chat-window"
          >
            {/* Header */}
            <div className="bg-[#122131] px-4 py-3.5 flex justify-between items-center border-b border-[#1c2b3c]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#22d3ee]/15 border border-[#22d3ee]/40 flex items-center justify-center text-[#22d3ee]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-white tracking-wide flex items-center gap-1.5">
                    Titanium Systems AI
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                  </h3>
                  <span className="font-mono text-[9px] text-[#22d3ee]">Lead Architecture Consultant</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-[#1c2b3c]"
                aria-label="Close AI chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="h-72 sm:h-80 overflow-y-auto p-4 space-y-3.5 bg-[#051424]/90"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-xl text-xs font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#22d3ee] text-[#00363e] font-medium rounded-tr-none shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                        : 'bg-[#122131] text-[#d4e4fa] rounded-tl-none border border-[#1c2b3c]'
                    }`}
                  >
                    {msg.text}
                    {msg.timestamp && (
                      <div className={`text-[9px] mt-1 font-mono ${msg.role === 'user' ? 'text-[#005763]' : 'text-[#64748b]'}`}>
                        {msg.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#122131] border border-[#1c2b3c] p-3 rounded-xl rounded-tl-none flex items-center gap-2 text-xs font-mono text-[#22d3ee]">
                    <span className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full animate-ping" />
                    <span>Synthesizing Architecture Specification...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-[#0d1c2d] border-t border-[#1c2b3c]/60 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap text-[10px] font-mono bg-[#122131] hover:bg-[#1c2b3c] text-[#bbc9cd] hover:text-[#22d3ee] px-2.5 py-1 rounded border border-[#1c2b3c] transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#1c2b3c] bg-[#0d1c2d]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AI, Managed IT, or Workshops..."
                  className="flex-1 bg-[#122131] border border-[#273647] text-white placeholder-[#64748b] text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#22d3ee]"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] px-3.5 py-2.5 rounded-lg transition-colors disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#0d1c2d] border-2 border-[#22d3ee] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] cursor-pointer group"
        aria-label="Titanium AI Consultant"
        id="toggle-ai-chat-btn"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#22d3ee] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#22d3ee] animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
