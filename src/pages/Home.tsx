import { useEffect } from 'react';
import { FlaskConical, Atom, TestTube, ArrowRight, BookOpen, GraduationCap, Brain, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollCanvas from '../components/ScrollCanvas';
import LiveFollowers from '../components/LiveFollowers';
import { useFollowerCount, roundedCount } from '../hooks/useFollowerCount';
import InteractivePeriodicTable from '../components/InteractivePeriodicTable';
import ElementDetailModal from '../components/ElementDetailModal';
import type { Element } from '../types/chemistry';
import { useState } from 'react';
import HeroMolecule from '../components/HeroMolecule';
import ParticleField from '../components/ParticleField';

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void;
    };
  }
}

function Home() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const { count: followerCount } = useFollowerCount();

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB?.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      {/* Navigation */}
      <header>
        <div className="container navbar">
          <div className="logo">
            <Atom className="logo-icon" size={32} />
            <span>Chemistry<span className="text-gradient">Fundamentals</span></span>
          </div>
          <nav className="nav-links">
            <a href="#topics">Topics</a>
            <a href="#community">Community</a>
            <Link to="/lab" className="text-gradient" style={{ fontWeight: 700 }}>3D Atomic Lab</Link>
            <Link to="/chemist-lab" className="text-gradient" style={{ fontWeight: 700 }}>Virtual Chem Lab</Link>
            <Link to="/periodic-table" className="text-gradient" style={{ fontWeight: 700 }}>Periodic Table</Link>
            <Link to="/acid-reactions" className="text-gradient" style={{ fontWeight: 700 }}>Acid Reactions</Link>
            <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', color: 'white' }}>Join Page</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <ParticleField />
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
        </div>
        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-badge">
                <GraduationCap size={16} /> XI, XII, NEET & JEE Preparation
              </div>
              <h1>Master the Elements of <span className="text-gradient">Success</span></h1>
              <p className="hero-sub">Your futuristic lab for Organic, Inorganic, and Physical Chemistry — live simulations, interactive atoms, and a community of thousands of students excelling in board exams and competitive tests.</p>
              <div className="hero-buttons">
                <Link to="/acid-reactions" className="btn btn-primary" style={{ background: 'var(--accent-cyan)', color: '#000', fontWeight: 'bold' }}>
                  Experience Acid Reactions <Sparkles size={20} style={{ marginLeft: '8px' }} />
                </Link>
                <a href="#topics" className="btn btn-secondary">
                  Explore Topics <ArrowRight size={20} />
                </a>
              </div>
              <div className="hero-metrics">
                <div className="hero-metric">
                  <strong>35k+</strong>
                  <span>Active learners</span>
                </div>
                <div className="hero-metric">
                  <strong>3</strong>
                  <span>Core chemistry tracks</span>
                </div>
                <div className="hero-metric">
                  <strong>118</strong>
                  <span>Elements live</span>
                </div>
              </div>
            </div>
            <HeroMolecule />
          </div>
        </div>
      </section>

      {/* 3D Scroll Animation */}
      <ScrollCanvas />

      {/* Branches of Chemistry */}
      <section id="topics" className="glass-panel" style={{ margin: '0 24px', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="section-header">
            <div className="hero-badge" style={{ margin: '0 auto 20px', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)', boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)' }}>
              <BookOpen size={16} /> Three Pillars
            </div>
            <h2 className="section-title">Core Disciplines</h2>
            <p className="section-subtitle">Comprehensive coverage of the three main pillars of chemistry to build a rock-solid conceptual foundation.</p>
          </div>

          <div className="features-grid">
            <Link to="/discipline/physical" className="feature-card glass-panel block hover:-translate-y-2 transition-transform duration-300" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-wrapper">
                <FlaskConical size={48} />
              </div>
              <h3>Physical Chemistry</h3>
              <p>Master thermodynamics, kinetics, and quantum chemistry with clear mathematical foundations and intuitive problem-solving strategies.</p>
            </Link>

            <Link to="/discipline/organic" className="feature-card glass-panel block hover:-translate-y-2 transition-transform duration-300" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-wrapper">
                <TestTube size={48} />
              </div>
              <h3>Organic Chemistry</h3>
              <p>Demystify reaction mechanisms, stereochemistry, and synthesis. Learn to think logically rather than memorizing infinite reactions.</p>
            </Link>

            <Link to="/discipline/inorganic" className="feature-card glass-panel block hover:-translate-y-2 transition-transform duration-300" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-wrapper">
                <Atom size={48} />
              </div>
              <h3>Inorganic Chemistry</h3>
              <p>Understand periodic trends, coordination compounds, and metallurgy through structured patterns and fundamental principles.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Periodic Table Section */}
      <section id="periodic-table" className="glass-panel" style={{ margin: '40px 24px', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="hero-badge" style={{ margin: '0 auto 20px' }}>
              <Sparkles style={{ width: '16px', height: '16px', marginRight: '8px' }} size={16} /> New Interactive Experience
            </div>
            <h2 className="section-title">Explore the <span className="text-gradient">Periodic Table</span></h2>
            <p className="section-subtitle">Dive into the microscopic details of every known element. Interactive Bohr models, configurations, and properties—all in one high-tech interface.</p>
          </div>

          <div style={{ 
            background: 'rgba(0,0,0,0.3)', 
            borderRadius: '32px', 
            padding: '40px',
            border: '1px solid rgba(0, 240, 255, 0.1)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.5)'
          }}>
            <InteractivePeriodicTable 
              compact={true} 
              showFilters={false} 
              onElementSelect={(el) => setSelectedElement(el)} 
            />
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/periodic-table" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Launch Full HD Table <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Element Detail Modal (Global) */}
      <ElementDetailModal 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
      />


      {/* Live Community Updates */}
      <section id="community" className="community-section">
        <div className="container community-grid">
          <div className="community-content">
            <h3>Live Updates from our <span className="text-gradient">Community</span></h3>
            <p>Stay updated with the latest study materials, daily chemistry questions, tips, and important announcements directly from our Facebook page. Join {roundedCount(followerCount)} students actively learning every day!</p>

            <div className="stats-grid">
              <div className="stat-item glass-panel">
                <LiveFollowers />
              </div>
              <div className="stat-item glass-panel">
                <div className="stat-number">Daily</div>
                <div className="stat-label">Concept Updates</div>
              </div>
              <div className="stat-item glass-panel">
                <div className="stat-number">5k+</div>
                <div className="stat-label">Weekly Discussions</div>
              </div>
              <div className="stat-item glass-panel">
                <div className="stat-number">100%</div>
                <div className="stat-label">Curated Content</div>
              </div>
            </div>

            <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
              Follow Facebook Page <Globe size={20} />
            </a>
          </div>

          <div className="fb-feed-container">
            <div className="fb-wrapper">
              <div id="fb-root"></div>
              {/* Note: In a real deploy, the data-href should be the clean page URL like https://www.facebook.com/ChemistryFundamentals or its ID. Using the share link for now. */}
              <div
                className="fb-page"
                data-href="https://www.facebook.com/p/Chemistry-Fundamentals-100063990864335/"
                data-tabs="timeline"
                data-width="400"
                data-height="600"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/p/Chemistry-Fundamentals-100063990864335/" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/p/Chemistry-Fundamentals-100063990864335/">Chemistry Fundamentals</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Atom color="var(--accent-cyan)" size={24} />
              Chemistry Fundamentals
            </div>
            <div className="social-links">
              <Link to="/periodic-table" title="Periodic Table"><Atom size={20} /></Link>
              <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer"><Globe size={20} /></a>
              <a href="#topics"><BookOpen size={20} /></a>
              <a href="#about"><Brain size={20} /></a>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Chemistry Fundamentals. All rights reserved. Designed for JEE, NEET & Board Aspirants.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
