import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LenisProvider from '@/components/providers/LenisProvider';

export const metadata: Metadata = {
  title: 'AIRA Agency — Intelligence. Automated. Amplified.',
  description:
    'AIRA builds AI Agents, Workflow Automation systems, RAG Pipelines, and Creative Graphics that make your business unstoppable.',
  keywords: ['AI agency', 'AI agents', 'workflow automation', 'RAG systems', 'LLM', 'n8n', 'LangChain'],
  openGraph: {
    title: 'AIRA Agency',
    description: 'Intelligence. Automated. Amplified.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
