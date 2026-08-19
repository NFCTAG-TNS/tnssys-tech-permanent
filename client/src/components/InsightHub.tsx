import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw,
  Zap,
  Activity
} from 'lucide-react';
import { DiagnosticQuestion, InsightItem } from '../types';

interface InsightHubProps {
  onStartProject: (initialType: string) => void;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: 'Data Infrastructure',
    question: 'How is your enterprise business data structured for AI ingestion?',
    options: [
      { label: 'Unstructured & Siloed', points: 10, description: 'Data scattered across disparate local spreadsheets & databases.' },
      { label: 'Centralized Cloud Warehouse', points: 25, description: 'Organized in Snowflake/BigQuery with standard schema ingestion.' },
      { label: 'Vector Indexed & Real-time RAG Ready', points: 35, description: 'Embeddings pipeline active with sub-second vector queries.' },
    ],
  },
  {
    id: 2,
    category: 'Security & Compliance',
    question: 'What is your operational cybersecurity & access control protocol?',
    options: [
      { label: 'Traditional Perimeter Firewall', points: 10, description: 'Basic VPN and password policies without Zero-Trust segmentation.' },
      { label: 'MFA & Role-Based Access (RBAC)', points: 20, description: 'Cloud IAM configured with automated session token expiry.' },
      { label: 'Zero-Trust Architecture & Air-Gapped Controls', points: 30, description: 'Continuous verification, encrypted at rest/transit with SOC-2 audit trails.' },
    ],
  },
  {
    id: 3,
    category: 'AI & Prompt Literacy',
    question: 'What is the current technical AI literacy of your workforce?',
    options: [
      { label: 'Ad-hoc Consumer Tools', points: 5, description: 'Employees casually using public chatbots with potential data leakage.' },
      { label: 'Structured API Usage', points: 20, description: 'Core dev team uses API endpoints with rudimentary prompt templates.' },
      { label: 'Certified Corporate AI Workflows', points: 35, description: 'Cross-functional teams trained in advanced prompt engineering & ethics.' },
    ],
  },
];

const INSIGHTS_ARTICLES: InsightItem[] = [
  {
    id: '1',
    title: 'Deploying Sovereign LLMs in Zero-Trust Financial Environments',
    category: 'AI Architecture',
    readTime: '4 min read',
    summary: 'A complete blueprint for self-hosting quantized open-weights models inside air-gapped VPCs without telemetry egress.',
    keyTakeaway: 'Eliminates 100% third-party data leakage while sustaining 120 tokens/sec throughput.',
    metrics: '100% On-Prem Privacy',
  },
  {
    id: '2',
    title: 'Automated Disaster Recovery: Sub-60-Second Failover Topologies',
    category: 'Managed IT',
    readTime: '6 min read',
    summary: 'How modern multi-region Kubernetes clusters paired with distributed raft state achieve zero data loss during cloud outages.',
    keyTakeaway: 'Continuous automated drill simulations keep recovery time objective (RTO) below 45 seconds.',
    metrics: '99.999% Fault Tolerance',
  },
  {
    id: '3',
    title: 'Measuring ROI on Corporate AI Training & Prompt Engineering',
    category: 'Workforce Upskilling',
    readTime: '3 min read',
    summary: 'Empirical telemetry from 4,000+ enterprise trainees revealing a 3.4x acceleration in technical drafting and code verification.',
    keyTakeaway: 'Trained staff reduce hallucination triage time by 78% across legal and engineering workflows.',
    metrics: '+340% Productivity Index',
  },
];

export const InsightHub: React.FC<InsightHubProps> = ({
  onStartProject,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({
    1: 25,
    2: 20,
    3: 20,
  });

  const totalScore = Object.values(selectedAnswers).reduce((acc, curr) => acc + curr, 0);

  const getScoreAssessment = (score: number) => {
    if (score >= 80) {
      return {
        level: 'AI & Cloud Sovereign Leader',
        status: 'Optimal Architecture',
        color: 'text-[#22d3ee]',
        summary: 'Your enterprise is primed for advanced autonomous agents, custom fine-tuning, and ultra-high-throughput edge inference.',
      };
    } else if (score >= 50) {
      return {
        level: 'Modernizing Infrastructure',
        status: 'High Acceleration Potential',
        color: 'text-emerald-400',
        summary: 'Solid foundation. Implementing centralized vector embeddings and automated security telemetry will multiply operational velocity.',
      };
    } else {
      return {
        level: 'Legacy Transition Stage',
        status: 'Immediate Optimization Needed',
        color: 'text-amber-400',
        summary: 'High exposure to data silos and unmonitored AI usage. A Managed IT audit and basic prompt governance workshop are urgent priorities.',
      };
    }
  };

  const assessment = getScoreAssessment(totalScore);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22d3ee] tracking-widest uppercase mb-3 bg-[#0d1c2d] px-3.5 py-1.5 rounded-full border border-[#1c2b3c]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Telemetry & Insights</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Enterprise AI & IT <span className="text-[#22d3ee]">Readiness Audit.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#94a3b8] leading-relaxed">
          Evaluate your organization's digital posture in real-time or consult our technical briefs on infrastructure hardening and machine learning deployment.
        </p>
      </div>

      {/* Interactive Audit Diagnostic Tool */}
      <div className="bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl p-6 sm:p-10 shadow-xl shadow-[#010f1f]">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Questions column */}
          <div className="flex-1 space-y-6 w-full">
            <div className="flex items-center justify-between border-b border-[#1c2b3c] pb-3">
              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#22d3ee]" />
                Infrastructure Diagnostic
              </h3>
              <span className="font-mono text-xs text-[#64748b]">3 Evaluation Vectors</span>
            </div>

            {DIAGNOSTIC_QUESTIONS.map((q) => (
              <div key={q.id} className="bg-[#122131] border border-[#1c2b3c] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider">
                    {q.category}
                  </span>
                </div>
                <h4 className="font-heading text-sm sm:text-base font-semibold text-white">
                  {q.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[q.id] === opt.points;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt.points })}
                        className={`text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#22d3ee]/15 border-[#22d3ee] text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                            : 'bg-[#0d1c2d] border-[#1c2b3c] text-[#94a3b8] hover:text-white hover:border-[#273647]'
                        }`}
                      >
                        <div className="font-mono font-bold text-xs mb-1 text-[#d4e4fa]">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-[#64748b] leading-tight">
                          {opt.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Score Panel */}
          <div className="w-full lg:w-80 bg-[#051424] border-2 border-[#1c2b3c] rounded-xl p-6 flex flex-col justify-between shrink-0">
            <div>
              <div className="text-xs font-mono text-[#64748b] uppercase tracking-wider mb-2">
                Maturity Index Score
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-heading text-5xl font-black text-white">
                  {totalScore}
                </span>
                <span className="font-mono text-sm text-[#64748b]">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#122131] overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${totalScore}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#005763] via-[#22d3ee] to-[#8aebff]"
                />
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-[10px] font-mono text-[#64748b] uppercase">Classification</div>
                  <div className={`font-heading font-bold text-base ${assessment.color}`}>
                    {assessment.level}
                  </div>
                </div>

                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {assessment.summary}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#1c2b3c]">
              <button
                onClick={() => onStartProject(`Audit Scoping (Score: ${totalScore}/100)`)}
                className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
              >
                Request Custom Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Whitepapers & Research */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] tracking-widest uppercase mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Publications</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Engineering Architecture Briefs
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#0d1c2d] border border-[#1c2b3c] hover:border-[#22d3ee]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#010f1f]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#22d3ee] uppercase tracking-wider font-semibold">
                    {article.category}
                  </span>
                  <span className="text-[#64748b]">{article.readTime}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-4">
                  {article.summary}
                </p>

                <div className="bg-[#122131] border border-[#1c2b3c] p-2.5 rounded-lg mb-4 text-xs font-mono">
                  <span className="text-[#64748b]">Telemetry Metric: </span>
                  <span className="text-[#8aebff] font-semibold">{article.metrics}</span>
                </div>
              </div>

              <button
                onClick={() => onStartProject(`Inquiry regarding: ${article.title}`)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#22d3ee] hover:text-[#8aebff] transition-colors cursor-pointer pt-2 border-t border-[#1c2b3c]/60"
              >
                <span>Read Full Technical Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightHub;
