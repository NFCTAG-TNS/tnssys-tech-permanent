/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type NavTab = 'home' | 'solutions' | 'insight' | 'contact';

export interface ServiceDetail {
  id: string;
  title: string;
  category: 'managed_it' | 'ai_implementation' | 'corporate_training';
  tag?: string;
  isCoreFocus?: boolean;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  deliverables: string[];
  icon: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  projectType: string;
  message: string;
  timeline?: string;
  budgetRange?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  timestamp?: string;
}

export interface InsightItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  metrics: string;
}

export interface DiagnosticQuestion {
  id: number;
  category: string;
  question: string;
  options: {
    label: string;
    points: number;
    description: string;
  }[];
}

