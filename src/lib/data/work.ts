// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA: Work / Case Studies
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  client: string;
  timeline: string;
  services: string[];
  outcome: string;
  challenge: string;
  challengeQuote: string;
  solution: { step: string; title: string; desc: string }[];
  results: { value: string; label: string; suffix: string }[];
  techStack: string[];
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  heroGradient: string;
  order: number;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ecommerce-ai-support',
    title: 'AI Customer Support Agent for E-Commerce',
    category: 'AI Agents',
    categoryColor: 'var(--accent)',
    client: 'StyleForge (E-Commerce Brand)',
    timeline: '3 weeks',
    services: ['AI Agents', 'Workflow Automation'],
    outcome: 'Reduced support tickets by 70%',
    challenge:
      'StyleForge was drowning in 2,000+ weekly support tickets — returns, tracking, sizing questions. Their team of 12 agents was burning out, response times hit 4 hours, and NPS was cratering. They needed a solution that could scale without proportional headcount growth.',
    challengeQuote:
      '"We were spending $40K/month on support staff for questions our FAQ already answered. We needed our team focused on edge cases and VIP clients, not tracking queries."',
    solution: [
      {
        step: '01',
        title: 'Audit & Integration Mapping',
        desc: 'We mapped every ticket type, built a taxonomy of 120+ intent categories, and identified integration points with Shopify, Gorgias, and their shipping API.',
      },
      {
        step: '02',
        title: 'LLM Agent Architecture',
        desc: 'We built a multi-tool LangChain agent with access to order lookup, returns initiation, FAQ retrieval (RAG), and human escalation logic.',
      },
      {
        step: '03',
        title: 'Confidence & Escalation Logic',
        desc: 'Any response below 85% confidence threshold automatically escalates to a human with full context pre-loaded. No bad AI answers reach customers.',
      },
      {
        step: '04',
        title: 'Deploy & Tune',
        desc: 'Deployed via Gorgias webhook. First 2 weeks ran in shadow mode (AI alongside humans). Week 3: full autonomous resolution on qualified ticket types.',
      },
    ],
    results: [
      { value: '70', label: 'Ticket reduction', suffix: '%' },
      { value: '4', label: 'Avg response time', suffix: 'min' },
      { value: '28', label: 'Monthly savings', suffix: 'K' },
    ],
    techStack: ['LangChain', 'OpenAI GPT-4o', 'Shopify API', 'Gorgias', 'Pinecone', 'FastAPI'],
    gradient: 'from-emerald-900/20 to-teal-900/20',
    gradientFrom: '#00FF9420',
    gradientTo: '#00A86B20',
    heroGradient: 'linear-gradient(135deg, #00FF9420, #080808)',
    order: 1,
  },
  {
    slug: 'saas-lead-qualification',
    title: 'Lead Qualification Agent for SaaS',
    category: 'AI Agents',
    categoryColor: 'var(--accent)',
    client: 'PipelineIQ (B2B SaaS)',
    timeline: '4 weeks',
    services: ['AI Agents', 'Workflow Automation'],
    outcome: '3x qualified lead throughput',
    challenge:
      "PipelineIQ's sales team was spending 60% of their time on prospects that never converted. Their lead scoring was based on firmographics alone — no intent signals, no conversation analysis. 300 leads/month in, 12 closed deals out.",
    challengeQuote:
      '"Our AEs were burning out doing manual qualification. We knew AI could help but didn\'t know where to start. AIRA gave us a working system in weeks, not months."',
    solution: [
      {
        step: '01',
        title: 'Lead Enrichment Pipeline',
        desc: 'Built an agent that auto-enriches every inbound lead with LinkedIn data, company technographics, news mentions, and funding status.',
      },
      {
        step: '02',
        title: 'Intent Scoring Model',
        desc: 'LLM-based intent scoring using enrichment data + historical win/loss data. Leads scored 0–100 with detailed reasoning.',
      },
      {
        step: '03',
        title: 'Automated Outreach',
        desc: 'High-scoring leads trigger a personalized email sequence (crafted by AI, reviewed by tone). Low-scoring leads routed to nurture.',
      },
      {
        step: '04',
        title: 'CRM Integration',
        desc: 'All enrichment, scores, and reasoning logged directly to HubSpot. AEs walk into every call with a full intelligence brief.',
      },
    ],
    results: [
      { value: '3', label: 'Lead quality multiplier', suffix: 'x' },
      { value: '62', label: 'Time saved on qualification', suffix: '%' },
      { value: '40', label: 'Increase in close rate', suffix: '%' },
    ],
    techStack: ['LangGraph', 'Anthropic Claude', 'HubSpot API', 'Apollo.io', 'n8n', 'Postgres'],
    gradient: 'from-blue-900/20 to-violet-900/20',
    gradientFrom: '#3B82F620',
    gradientTo: '#7C3AED20',
    heroGradient: 'linear-gradient(135deg, #3B82F620, #080808)',
    order: 2,
  },
  {
    slug: 'law-firm-rag',
    title: 'Internal RAG System for Law Firm',
    category: 'RAG Systems',
    categoryColor: 'var(--accent)',
    client: 'Mercer & Holt LLP (Regional Law Firm)',
    timeline: '5 weeks',
    services: ['RAG Systems', 'AI Agents'],
    outcome: 'Search 10,000 docs instantly',
    challenge:
      "Mercer & Holt had 10 years of case files, contracts, precedents, and research memos — all siloed in folders. Associates were spending 3–4 hours per case digging through archives. Senior partners wanted AI but were terrified of hallucinations with legal facts.",
    challengeQuote:
      '"We can\'t afford hallucinations. Our liability is real. AIRA built us something that cites every claim with the exact document and page number."',
    solution: [
      {
        step: '01',
        title: 'Document Ingestion Pipeline',
        desc: 'Built OCR → chunk → embed pipeline for 10,000+ PDFs, Word docs, and email threads. All locally processed for client confidentiality.',
      },
      {
        step: '02',
        title: 'Hybrid Search Architecture',
        desc: 'Combined dense vector search (Qdrant) with BM25 keyword search + Cohere reranking for legal-grade precision.',
      },
      {
        step: '03',
        title: 'Citation-First Interface',
        desc: 'Every AI answer includes exact source document, page number, and highlighted excerpt. Partners can click any citation to open the source.',
      },
      {
        step: '04',
        title: 'On-Premise Deploy',
        desc: 'Entire system deployed on firm\'s own server — no client data ever leaves their network. Complete legal compliance.',
      },
    ],
    results: [
      { value: '94', label: 'Search time reduction', suffix: '%' },
      { value: '10', label: 'Documents searchable', suffix: 'K+' },
      { value: '3', label: 'Associate hours saved/case', suffix: 'hrs' },
    ],
    techStack: ['LlamaIndex', 'Qdrant', 'Cohere Rerank', 'Anthropic Claude', 'FastAPI', 'React', 'Tesseract OCR'],
    gradient: 'from-amber-900/20 to-orange-900/20',
    gradientFrom: '#F59E0B20',
    gradientTo: '#EA580C20',
    heroGradient: 'linear-gradient(135deg, #F59E0B20, #080808)',
    order: 3,
  },
  {
    slug: 'marketing-automation',
    title: 'Full Automation Stack for Marketing Agency',
    category: 'Automation',
    categoryColor: 'var(--accent-2)',
    client: 'GrowthLab Agency (Digital Marketing)',
    timeline: '3 weeks',
    services: ['Workflow Automation', 'AI Agents'],
    outcome: 'Saved 40 hours of work per week',
    challenge:
      "GrowthLab was managing 30+ client accounts with a team of 8. Every Monday: manual report generation. Every Friday: social scheduling. Every day: ad performance exports, client email updates. They were an agency spending more time on ops than strategy.",
    challengeQuote:
      '"We were billing for strategy but doing data entry. AIRA automated everything repetitive and gave our team their creative lives back."',
    solution: [
      {
        step: '01',
        title: 'Report Automation',
        desc: 'Built n8n workflows that pull data from Google Ads, Meta, GA4 and generate branded PDF reports every Monday at 7am — automatically sent to clients.',
      },
      {
        step: '02',
        title: 'Social Publishing Pipeline',
        desc: 'Content calendar → AI caption generation → Buffer scheduling. One approval step, everything else automated.',
      },
      {
        step: '03',
        title: 'Ad Performance Alerts',
        desc: 'Real-time webhook monitoring: when ROAS drops below threshold, Slack alert fires with AI-generated action recommendation.',
      },
      {
        step: '04',
        title: 'Client Communication Automation',
        desc: 'Weekly client update emails generated from performance data, reviewed in one click, sent automatically.',
      },
    ],
    results: [
      { value: '40', label: 'Hours saved weekly', suffix: 'hrs' },
      { value: '85', label: 'Reduction in manual ops', suffix: '%' },
      { value: '22', label: 'Additional revenue capacity', suffix: 'K/mo' },
    ],
    techStack: ['n8n', 'Make', 'Google Ads API', 'Meta API', 'GA4 API', 'Anthropic', 'Buffer API', 'Slack'],
    gradient: 'from-orange-900/20 to-red-900/20',
    gradientFrom: '#FF4D0020',
    gradientTo: '#DC262620',
    heroGradient: 'linear-gradient(135deg, #FF4D0020, #080808)',
    order: 4,
  },
  {
    slug: 'fintech-brand-identity',
    title: 'Complete Brand Identity for FinTech Startup',
    category: 'Creative Graphics',
    categoryColor: 'var(--accent-2)',
    client: 'Vaultr (FinTech Startup)',
    timeline: '4 weeks',
    services: ['Creative Graphics', 'UI/UX'],
    outcome: 'Complete visual system from zero',
    challenge:
      "Vaultr was launching a B2C savings app targeting Gen Z. Their product was great — their brand was a Bootstrap template. Investors at their Series A pitch deck meeting asked, unprompted, why the brand didn't match the ambition of the product.",
    challengeQuote:
      '"We had a product that could compete with Robinhood, but we looked like a weekend hackathon project. AIRA transformed how we show up in the world."',
    solution: [
      {
        step: '01',
        title: 'Brand Strategy Workshop',
        desc: 'Two-day positioning workshop: competitor audit, audience personas, brand archetype definition. Output: brand strategy document.',
      },
      {
        step: '02',
        title: 'Visual Identity Design',
        desc: 'Logo system (primary, icon, wordmark), color palette, typography system, iconography style, and photography art direction.',
      },
      {
        step: '03',
        title: 'UI Design System',
        desc: 'Complete Figma design system: 200+ components, 8 page templates, dark/light variants. Developer-ready with token exports.',
      },
      {
        step: '04',
        title: 'Brand Launch Assets',
        desc: 'App store screenshots, social media templates, investor deck redesign, onboarding animation, and launch video intro.',
      },
    ],
    results: [
      { value: '40', label: 'Increase in app store CVR', suffix: '%' },
      { value: '2', label: 'Investor decks redesigned', suffix: '' },
      { value: '8', label: 'Weeks to Series A close after rebrand', suffix: 'wks' },
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'After Effects', 'Lottie', 'Principle', 'Spline'],
    gradient: 'from-violet-900/20 to-purple-900/20',
    gradientFrom: '#7C3AED20',
    gradientTo: '#A855F720',
    heroGradient: 'linear-gradient(135deg, #7C3AED20, #080808)',
    order: 5,
  },
  {
    slug: 'product-launch-motion',
    title: 'Motion Graphics Package for Product Launch',
    category: 'Creative Graphics',
    categoryColor: 'var(--accent-2)',
    client: 'Nexus Labs (SaaS Startup)',
    timeline: '2 weeks',
    services: ['Creative Graphics', 'Motion Graphics'],
    outcome: 'Video + complete social asset suite',
    challenge:
      "Nexus Labs had a major product launch — their AI writing assistant was going public. They had 14 days, zero motion graphics team, and needed a launch video, social content package, and interactive demo for their product hunt page.",
    challengeQuote:
      '"14 days. One Product Hunt launch. We needed to look like we had a full creative team. AIRA delivered everything on time and it looked like Netflix produced it."',
    solution: [
      {
        step: '01',
        title: 'Launch Video (60s)',
        desc: '60-second product hero video: problem statement → product reveal → key features → CTA. 4K render with custom sound design.',
      },
      {
        step: '02',
        title: 'Social Content Package',
        desc: '30 branded social posts across Instagram, LinkedIn, Twitter — stories, carousels, and single-image formats.',
      },
      {
        step: '03',
        title: 'Animated Product Screenshots',
        desc: 'Interactive Lottie animations showing the product in action — embedded directly in the landing page.',
      },
      {
        step: '04',
        title: 'Product Hunt Assets',
        desc: 'GIF thumbnails, video previews, and gallery images optimized for Product Hunt\'s ranking algorithm.',
      },
    ],
    results: [
      { value: '3', label: 'Product Hunt ranking on launch day', suffix: 'rd' },
      { value: '2400', label: 'Upvotes in 24 hours', suffix: '' },
      { value: '180', label: 'MRR in first month', suffix: 'K' },
    ],
    techStack: ['After Effects', 'Adobe Premiere', 'Lottie', 'Figma', 'DaVinci Resolve', 'Cinema 4D Lite'],
    gradient: 'from-pink-900/20 to-rose-900/20',
    gradientFrom: '#EC489920',
    gradientTo: '#F4366420',
    heroGradient: 'linear-gradient(135deg, #EC489920, #080808)',
    order: 6,
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const nextCaseStudy = (currentSlug: string) => {
  const idx = caseStudies.findIndex((c) => c.slug === currentSlug);
  return caseStudies[(idx + 1) % caseStudies.length];
};
