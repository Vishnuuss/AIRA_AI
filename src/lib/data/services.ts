// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA: Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  techStack: string[];
  features: { title: string; desc: string; icon: string }[];
  cta: string;
}

export const services: Service[] = [
  {
    slug: 'ai-agents',
    title: 'AI Agents That Never Clock Out',
    shortTitle: 'AI Agents',
    tagline: 'AI Agents That Work While You Sleep',
    description:
      'Custom LLM-powered agents for customer support, lead qualification, research, data extraction, and complex multi-step workflows.',
    icon: '🤖',
    accentColor: 'var(--accent)',
    techStack: ['OpenAI', 'Anthropic', 'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'FastAPI', 'Python'],
    features: [
      {
        title: 'Customer Support Agents',
        desc: 'LLM-powered agents that handle tier-1 support 24/7, escalate intelligently, and learn from every interaction.',
        icon: '💬',
      },
      {
        title: 'Lead Qualification Agents',
        desc: 'Autonomous agents that research prospects, score leads, and book discovery calls — without human intervention.',
        icon: '🎯',
      },
      {
        title: 'Research & Scraping Agents',
        desc: 'Multi-step agents that browse, extract, synthesize, and report on any topic or competitor landscape.',
        icon: '🔍',
      },
      {
        title: 'Multi-Agent Orchestration',
        desc: 'Complex agent networks where specialized AIs collaborate: planner, executor, reviewer, and publisher.',
        icon: '🕸️',
      },
    ],
    cta: 'Build Your Agent →',
  },
  {
    slug: 'automation',
    title: 'Automate Everything. Scale Without Hiring.',
    shortTitle: 'Automation',
    tagline: 'End-to-End Workflow Automation',
    description:
      'From Zapier to n8n to custom Python pipelines — we automate the repetitive so your team focuses on what matters.',
    icon: '⚡',
    accentColor: 'var(--accent-2)',
    techStack: ['n8n', 'Make', 'Zapier', 'Python', 'FastAPI', 'Webhooks', 'PostgreSQL', 'Redis'],
    features: [
      {
        title: 'CRM & Lead Automation',
        desc: 'Auto-sync leads from all sources, qualify them, and trigger personalized email sequences in real time.',
        icon: '📊',
      },
      {
        title: 'Data Pipeline Automation',
        desc: 'ETL pipelines that pull, transform, and push data between any two systems, on any schedule.',
        icon: '🔄',
      },
      {
        title: 'Report Generation',
        desc: 'Automated weekly/monthly reports delivered to stakeholders without anyone lifting a finger.',
        icon: '📈',
      },
      {
        title: 'API Integration Systems',
        desc: 'Connect any two platforms via webhook orchestration, even if they don\'t have native integrations.',
        icon: '🔗',
      },
    ],
    cta: 'Automate My Workflow →',
  },
  {
    slug: 'rag',
    title: 'Your Knowledge Base. Finally Searchable.',
    shortTitle: 'RAG Systems',
    tagline: 'RAG Pipelines That Actually Work',
    description:
      'Retrieval-Augmented Generation systems built on your data. Chat with your docs, knowledge bases, and internal systems.',
    icon: '🧠',
    accentColor: 'var(--accent)',
    techStack: ['LlamaIndex', 'LangChain', 'Pinecone', 'Weaviate', 'Qdrant', 'OpenAI Embeddings', 'Cohere Rerank', 'Anthropic'],
    features: [
      {
        title: 'Document Q&A Systems',
        desc: 'Chat with your PDFs, Notion pages, Confluence wikis, and Google Docs — get cited answers instantly.',
        icon: '📚',
      },
      {
        title: 'Internal Knowledge Bases',
        desc: 'Deploy a private AI assistant trained exclusively on your internal documentation and processes.',
        icon: '🏢',
      },
      {
        title: 'Customer-Facing FAQ Bots',
        desc: 'Self-service AI that handles 80% of support questions using your product documentation.',
        icon: '❓',
      },
      {
        title: 'Multi-Source RAG with Reranking',
        desc: 'Aggregate multiple knowledge sources with Cohere reranking for precision retrieval at scale.',
        icon: '🎯',
      },
    ],
    cta: 'Build My RAG System →',
  },
  {
    slug: 'graphics',
    title: 'Design That Makes People Stop Scrolling',
    shortTitle: 'Creative Graphics',
    tagline: 'Design That Commands Attention',
    description:
      'Brand identity, motion graphics, UI/UX, and visual systems engineered to make your brand impossible to ignore.',
    icon: '🎨',
    accentColor: 'var(--accent-2)',
    techStack: ['Figma', 'Adobe Illustrator', 'After Effects', 'Photoshop', 'Rive', 'Principle', 'Spline', 'Lottie'],
    features: [
      {
        title: 'Brand Identity Systems',
        desc: 'Complete visual identity: logo, color system, typography, and comprehensive brand guidelines.',
        icon: '✏️',
      },
      {
        title: 'UI/UX Design',
        desc: 'Pixel-perfect interfaces designed for conversion — from wireframes to production-ready Figma files.',
        icon: '🖥️',
      },
      {
        title: 'Motion Graphics & Video',
        desc: 'Logo animations, product intros, social reels, and presentation motion sequences.',
        icon: '🎬',
      },
      {
        title: 'Social Media Graphics',
        desc: 'On-brand, scroll-stopping graphics across all platforms — built on scalable templates.',
        icon: '📱',
      },
    ],
    cta: 'Start Your Visual Identity →',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
