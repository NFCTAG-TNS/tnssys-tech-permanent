import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'managed-it',
    title: 'Managed IT',
    category: 'managed_it',
    icon: 'server',
    shortDesc: 'Comprehensive infrastructure support, security, and cloud management for modern enterprises.',
    fullDesc: 'We take complete architectural custody of your digital infrastructure. Through proactive telemetry, automated failover disaster recovery, and Zero-Trust cloud network design, we guarantee 99.99% operational continuity for high-load enterprise workloads.',
    features: [
      'Cybersecurity Hardening',
      'Cloud Infrastructure',
      'Disaster Recovery',
    ],
    metrics: [
      { label: 'Uptime Guarantee', value: '99.99%' },
      { label: 'Incident SLA', value: '< 15 Min' },
      { label: 'Cloud Resilience', value: 'Multi-Region' },
    ],
    deliverables: [
      'AWS, Azure & GCP Multi-Cloud Orchestration',
      'Zero-Trust Network Access & Firewall Hardening',
      'Automated Sub-60s Failover Disaster Recovery',
      '24/7/365 Security Operations Center (SOC) Telemetry',
      'Continuous Compliance Auditing (SOC-2, ISO 27001)',
    ],
  },
  {
    id: 'ai-implementation',
    title: 'AI Implementation',
    category: 'ai_implementation',
    icon: 'brain',
    tag: 'CORE FOCUS',
    isCoreFocus: true,
    shortDesc: 'Bespoke neural networks and machine learning models tailored to your business data.',
    fullDesc: 'From fine-tuning state-of-the-art open transformer models to architecting high-throughput RAG search systems and autonomous agentic workflows, we build sovereign AI infrastructure that turns enterprise proprietary data into an unassailable competitive advantage.',
    features: [
      'Predictive Analytics',
      'Process Automation',
      'Generative AI Strategy',
      'Custom Model Tuning',
      'Workflow Acceleration',
    ],
    metrics: [
      { label: 'Inference Latency', value: '< 45ms' },
      { label: 'Data Sovereignty', value: '100% VPC' },
      { label: 'Efficiency Gain', value: '3.8x ROI' },
    ],
    deliverables: [
      'High-Throughput Sub-Second Vector RAG Systems',
      'Proprietary LLM Quantization & Domain Fine-Tuning',
      'Autonomous Multi-Agent Workflow Automation',
      'Real-Time Predictive Analytics & Telemetry Engines',
      'Air-Gapped Sovereign AI Model Deployments',
    ],
  },
  {
    id: 'corporate-training',
    title: 'Corporate Training',
    category: 'corporate_training',
    icon: 'graduation-cap',
    shortDesc: 'Upskill your workforce with advanced technical seminars and AI-readiness workshops.',
    fullDesc: 'Bridge the technical gap in your organization with rigorous, hands-on masterclasses. We train engineers, product leaders, and executives in prompt engineering mastery, generative AI safety protocols, and cross-departmental process automation.',
    features: [
      'AI Literacy Workshops',
      'Prompt Engineering',
      'Compliance & Ethics',
    ],
    metrics: [
      { label: 'Engineers Upskilled', value: '5,200+' },
      { label: 'Course Rating', value: '98.6%' },
      { label: 'Velocity Multiplier', value: '3.4x' },
    ],
    deliverables: [
      'Hands-On Interactive Prompt Engineering Labs',
      'Enterprise AI Governance & Compliance Playbooks',
      'Executive Leadership AI Strategy Masterclasses',
      'Department-Specific Automation Bootcamp Tracks',
      'Certified Technical AI Competency Badges',
    ],
  },
];
