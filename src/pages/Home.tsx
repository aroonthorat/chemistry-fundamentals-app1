import { useEffect, Fragment } from 'react';
import { FlaskConical, Atom, TestTube, ArrowRight, GraduationCap, Brain, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveFollowers from '../components/LiveFollowers';
import { useFollowerCount, roundedCount } from '../hooks/useFollowerCount';
import HeroMolecule from '../components/HeroMolecule';

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void;
    };
  }
}

const CarbonOrbits = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
      {/* Orbit 1 */}
      <div 
        className="absolute border border-dashed border-cyan-400/30 rounded-full animate-spin" 
        style={{ width: '160px', height: '160px', animationDuration: '8s' }} 
      />
      {/* Orbit 2 */}
      <div 
        className="absolute border border-dashed border-cyan-400/20 rounded-full animate-spin" 
        style={{ width: '230px', height: '230px', animationDuration: '12s', animationDirection: 'reverse' }} 
      />
      {/* Orbit 3 */}
      <div 
        className="absolute border border-dashed border-cyan-400/10 rounded-full animate-spin" 
        style={{ width: '300px', height: '300px', animationDuration: '18s' }} 
      />
    </div>
  );
};

function Home() {
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
      {/* Navigation / Header */}
      <header className="relative">
        <div className="container navbar">
          <div className="logo">
            <Atom className="logo-icon animate-pulse" size={32} color="var(--cf-cyan)" />
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              chemistry<span className="text-gradient">fundamentals</span>
            </span>
          </div>
          <nav className="nav-links">
            <a href="#topics">Topics</a>
            <Link to="/element/carbon">Element</Link>
            <Link to="/lab">Atomic Lab</Link>
            <Link to="/chemist-lab">Chem Lab</Link>
            <Link to="/periodic-table">Periodic Table</Link>
            <Link to="/acid-reactions">Acid Reactions</Link>
            <a 
              href="https://www.facebook.com/share/1E2hRqzqDW/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #00ff88, #00f0ff)', 
                color: '#000', 
                fontWeight: 800, 
                padding: '8px 24px', 
                borderRadius: '100px',
                fontSize: '0.9rem',
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)',
                textDecoration: 'none'
              }}
            >
              Join Page
            </a>
          </nav>
        </div>
        {/* Glowing gradient line under header */}
        <div className="header-glow-bar" />
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ padding: '160px 0 60px', display: 'flex', alignItems: 'center' }}>
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
        </div>
        <div className="container hero-content">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', textAlign: 'left' }}>
            {/* Left Side: Copy */}
            <div className="hero-copy">
              <div 
                className="hero-badge" 
                style={{ 
                  borderColor: 'var(--cf-acid)', 
                  color: 'var(--cf-acid)', 
                  boxShadow: '0 0 15px rgba(0, 255, 136, 0.15)',
                  background: 'rgba(0, 255, 136, 0.03)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontSize: '0.8rem',
                  padding: '6px 16px',
                  display: 'inline-flex'
                }}
              >
                <GraduationCap size={16} style={{ marginRight: '8px' }} /> XI · XII · NEET · JEE TRACK
              </div>
              
              <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.1, margin: '20px 0', letterSpacing: '-1.5px', color: '#fff' }}>
                Master the <span style={{ color: 'var(--cf-cyan)', fontFamily: 'serif', fontStyle: 'italic', textTransform: 'lowercase', textShadow: '0 0 30px rgba(0,240,255,0.2)' }}>elements</span> of <span className="text-gradient" style={{ fontFamily: 'Outfit, sans-serif' }}>success.</span>
              </h1>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--cf-text-secondary)', lineHeight: 1.6, marginBottom: '35px', maxWidth: '580px' }}>
                A futuristic lab for organic, inorganic and physical chemistry — live simulations, interactive Bohr models, and a community of thousands excelling at boards and entrance exams.
              </p>
              
              <div className="hero-buttons" style={{ display: 'flex', gap: '15px', marginBottom: '50px' }}>
                <Link 
                  to="/acid-reactions" 
                  className="btn btn-primary" 
                  style={{ 
                    background: 'linear-gradient(135deg, #00ff88, #00f0ff)', 
                    color: '#000', 
                    fontWeight: 800,
                    padding: '12px 28px',
                    borderRadius: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.35)',
                    textDecoration: 'none'
                  }}
                >
                  Experience Acid Reactions <Sparkles size={18} />
                </Link>
                <a 
                  href="#topics" 
                  className="btn" 
                  style={{ 
                    border: '1px solid rgba(255, 255, 255, 0.15)', 
                    color: '#fff', 
                    fontWeight: 600,
                    padding: '12px 28px',
                    borderRadius: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    textDecoration: 'none'
                  }}
                >
                  Explore Topics <ArrowRight size={18} />
                </a>
              </div>
              
              {/* Stats */}
              <div style={{ display: 'flex', gap: '50px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '30px' }}>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>35k+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Active Learners</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>118</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Elements Live</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>3</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Chem Disciplines</div>
                </div>
              </div>
            </div>
            
            {/* Right Side: Live Bench */}
            <div>
              <div className="live-bench-card">
                <div className="live-bench-header">
                  <span className="live-bench-title">✦ LIVE BENCH · SESSION 0237</span>
                  <span className="live-bench-recording">
                    <span className="live-bench-dot"></span>
                    RECORDING
                  </span>
                </div>
                <div className="live-bench-body">
                  <HeroMolecule />
                </div>
                <div className="live-bench-specs">
                  <div className="live-bench-row">
                    <span className="live-bench-label">Sample</span>
                    <span className="live-bench-val" style={{ color: 'var(--cf-cyan)' }}>H₂O - 18.015 g/mol</span>
                  </div>
                  <div className="live-bench-row">
                    <span className="live-bench-label">Bond Angle</span>
                    <span className="live-bench-val" style={{ color: 'var(--cf-cyan)' }}>104.5°</span>
                  </div>
                  <div className="live-bench-row">
                    <span className="live-bench-label">Phase</span>
                    <span className="live-bench-val" style={{ color: 'var(--cf-cyan)' }}>Liquid - 298 K</span>
                  </div>
                  <div className="live-bench-row">
                    <span className="live-bench-label">Polarity</span>
                    <span className="live-bench-val" style={{ color: 'var(--cf-pink)' }}>μ = 1.85 D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Molecule Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          {Array.from({ length: 4 }).map((_, loopIdx) => (
            <Fragment key={loopIdx}>
              <div className="ticker-item"><span>NaCl</span> Sodium Chloride</div>
              <div className="ticker-item"><span>CO₂</span> Carbon Dioxide</div>
              <div className="ticker-item"><span>CH₄</span> Methane</div>
              <div className="ticker-item"><span>H₂SO₄</span> Sulfuric Acid</div>
              <div className="ticker-item"><span>NH₃</span> Ammonia</div>
              <div className="ticker-item"><span>C₆H₁₂O₆</span> Glucose</div>
              <div className="ticker-item"><span>HCl</span> Hydrochloric Acid</div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Element of the Week Section */}
      <section className="element-of-week-section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', alignItems: 'center' }}>
          {/* Left side: The Carbon Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="carbon-card">
              <CarbonOrbits />
              <div className="carbon-card-header">
                <div className="carbon-number">06</div>
                <div className="carbon-group-period">
                  Group 14<br />
                  Period 2
                </div>
              </div>
              
              <div className="carbon-symbol-container">
                <div className="carbon-symbol">C</div>
                <div className="carbon-name">Carbon</div>
              </div>
              
              <div className="carbon-card-footer">
                <div>
                  <div className="carbon-footer-label">Atomic Mass</div>
                  <div className="carbon-footer-val">12.011 u</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="carbon-footer-label">Config</div>
                  <div className="carbon-footer-val">[He] 2s² 2p²</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Dossier text */}
          <div style={{ textDecoration: 'none', textAlign: 'left' }}>
            <div 
              className="hero-badge" 
              style={{ 
                borderColor: 'var(--cf-cyan)', 
                color: 'var(--cf-cyan)',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)',
                background: 'rgba(0, 240, 255, 0.03)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                padding: '6px 16px',
                display: 'inline-flex'
              }}
            >
              ✦ Element of the Week ✦
            </div>
            
            <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '20px 0', lineHeight: 1.15, letterSpacing: '-1px', color: '#fff' }}>
              Carbon — the <span style={{ color: 'var(--cf-cyan)', fontFamily: 'serif', fontStyle: 'italic', textTransform: 'lowercase' }}>backbone</span> of every reaction you'll meet.
            </h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--cf-text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
              Few elements rival carbon's versatility. From the diamond lattice to fullerenes, from glucose to graphene — every organic chapter in your syllabus begins right here. Master its hybridisation and the rest of organic chemistry falls into place.
            </p>
            
            {/* Quick Specs Grid */}
            <div className="dossier-specs-grid">
              <div className="dossier-spec-item">
                <span className="dossier-spec-label">Hybridisations</span>
                <span className="dossier-spec-val">sp · sp² · sp³</span>
              </div>
              <div className="dossier-spec-item">
                <span className="dossier-spec-label">Allotropes</span>
                <span className="dossier-spec-val spec-organic">8 known</span>
              </div>
              <div className="dossier-spec-item">
                <span className="dossier-spec-label">Bonds Formed</span>
                <span className="dossier-spec-val">4 covalent</span>
              </div>
              <div className="dossier-spec-item">
                <span className="dossier-spec-label">Exam Weight</span>
                <span className="dossier-spec-val spec-inorganic">≈ 10%</span>
              </div>
            </div>
            
            <Link 
              to="/element/carbon" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #00ff88, #00f0ff)', 
                color: '#000', 
                fontWeight: 800, 
                padding: '12px 32px', 
                borderRadius: '100px',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                textDecoration: 'none'
              }}
            >
              Open the carbon dossier →
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section id="topics" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="watermark-text" style={{ top: '15%', left: '8%' }}>SN1</div>
        <div className="watermark-text" style={{ top: '45%', right: '5%' }}>SN2</div>
        <div className="watermark-text" style={{ bottom: '10%', left: '15%' }}>E1</div>
        <div className="watermark-text" style={{ bottom: '25%', right: '25%' }}>C₆H₅NH₂</div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div 
              className="hero-badge" 
              style={{ 
                borderColor: 'var(--cf-purple)', 
                color: 'var(--cf-purple)', 
                boxShadow: '0 0 15px rgba(138, 43, 226, 0.15)',
                background: 'rgba(138, 43, 226, 0.03)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                padding: '6px 16px',
                display: 'inline-flex'
              }}
            >
              003 · Three Pillars
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', margin: '20px 0', letterSpacing: '-1px' }}>
              The disciplines that build a <span className="text-gradient">chemist's mind.</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--cf-text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Comprehensive coverage of the three core branches — taught through first principles, mechanism logic, and pattern recognition.
            </p>
          </div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {/* Physical Chemistry */}
            <Link to="/discipline/physical" className="pillar-card pillar-physical">
              <div>
                <div className="pillar-header">
                  <span className="pillar-num pillar-num-physical">I</span>
                  <div className="pillar-icon-box">
                    <FlaskConical size={24} />
                  </div>
                </div>
                <h3 className="pillar-title">Physical Chemistry</h3>
                <p className="pillar-desc">
                  Master thermodynamics, kinetics and quantum chemistry through clear mathematical foundations and intuitive problem-solving.
                </p>
              </div>
              <div>
                <div className="pillar-capsules">
                  <span className="pillar-capsule">Thermo</span>
                  <span className="pillar-capsule">Kinetics</span>
                  <span className="pillar-capsule">Quantum</span>
                  <span className="pillar-capsule">Electrochem</span>
                </div>
                <span className="pillar-link pillar-link-physical">OPEN NOTEBOOK →</span>
              </div>
            </Link>

            {/* Organic Chemistry */}
            <Link to="/discipline/organic" className="pillar-card pillar-organic">
              <div>
                <div className="pillar-header">
                  <span className="pillar-num pillar-num-organic">II</span>
                  <div className="pillar-icon-box">
                    <TestTube size={24} />
                  </div>
                </div>
                <h3 className="pillar-title">Organic Chemistry</h3>
                <p className="pillar-desc">
                  Demystify reaction mechanisms, stereochemistry and synthesis. Learn to think in arrows — not in memorised reactions.
                </p>
              </div>
              <div>
                <div className="pillar-capsules">
                  <span className="pillar-capsule">Mechanisms</span>
                  <span className="pillar-capsule">Stereo</span>
                  <span className="pillar-capsule">Synthesis</span>
                  <span className="pillar-capsule">NMR</span>
                </div>
                <span className="pillar-link pillar-link-organic">OPEN NOTEBOOK →</span>
              </div>
            </Link>

            {/* Inorganic Chemistry */}
            <Link to="/discipline/inorganic" className="pillar-card pillar-inorganic">
              <div>
                <div className="pillar-header">
                  <span className="pillar-num pillar-num-inorganic">III</span>
                  <div className="pillar-icon-box">
                    <Atom size={24} />
                  </div>
                </div>
                <h3 className="pillar-title">Inorganic Chemistry</h3>
                <p className="pillar-desc">
                  Decode periodic trends, coordination compounds and metallurgy through structured patterns and fundamental principles.
                </p>
              </div>
              <div>
                <div className="pillar-capsules">
                  <span className="pillar-capsule">Periodic</span>
                  <span className="pillar-capsule">Coord.</span>
                  <span className="pillar-capsule">F-Block</span>
                  <span className="pillar-capsule">Metallurgy</span>
                </div>
                <span className="pillar-link pillar-link-inorganic">OPEN NOTEBOOK →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Community Updates */}
      <section id="community" style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container community-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div className="community-content" style={{ textAlign: 'left' }}>
            <div 
              className="hero-badge" 
              style={{ 
                borderColor: 'var(--cf-acid)', 
                color: 'var(--cf-acid)', 
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.15)',
                background: 'rgba(0, 255, 136, 0.03)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                padding: '6px 16px',
                display: 'inline-flex'
              }}
            >
              <Globe size={16} style={{ marginRight: '8px' }} /> {roundedCount(followerCount)} Followers
            </div>
            
            <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '20px 0', lineHeight: 1.15, letterSpacing: '-1px', color: '#fff' }}>
              Daily <span style={{ color: 'var(--cf-cyan)', fontFamily: 'serif', fontStyle: 'italic', textTransform: 'lowercase' }}>concept</span> drops.
            </h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--cf-text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
              Stay updated with the latest study materials, daily chemistry questions, tips, and important announcements directly from our Facebook page. Join {roundedCount(followerCount)} students actively learning every day!
            </p>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px' }}>
                <LiveFollowers />
              </div>
              <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>Daily</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--cf-text-secondary)', fontWeight: 600 }}>Concept Updates</div>
              </div>
              <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>5k+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--cf-text-secondary)', fontWeight: 600 }}>Weekly Discussions</div>
              </div>
              <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--cf-text-secondary)', fontWeight: 600 }}>Curated Content</div>
              </div>
            </div>

            <a 
              href="https://www.facebook.com/share/1E2hRqzqDW/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #00ff88, #00f0ff)', 
                color: '#000', 
                fontWeight: 800, 
                padding: '12px 30px', 
                borderRadius: '100px',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                textDecoration: 'none'
              }}
            >
              Follow on Facebook <Globe size={20} />
            </a>
          </div>

          <div className="fb-feed-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="fb-wrapper" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div id="fb-root"></div>
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
      <footer style={{ padding: '80px 0 40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(3, 3, 5, 0.95)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '80px', textAlign: 'left' }}>
            <div>
              <div className="footer-logo" style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', marginBottom: '20px' }}>
                <Atom color="var(--cf-cyan)" size={28} className="logo-icon" />
                <span>chemistry<span className="text-gradient">fundamentals</span></span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--cf-text-secondary)', lineHeight: 1.6, marginBottom: '25px' }}>
                A premium interactive lab for the next generation of chemists preparing for boards, JEE and NEET. Built by educators, refined by learners.
              </p>
              {/* Element Capsules */}
              <div className="footer-element-capsules">
                <span className="footer-element-capsule active-c">H</span>
                <span className="footer-element-capsule active-c">C</span>
                <span className="footer-element-capsule active-g">N</span>
                <span className="footer-element-capsule active-p">O</span>
                <span className="footer-element-capsule active-c">F</span>
                <span className="footer-element-capsule active-g">Na</span>
                <span className="footer-element-capsule active-p">Cl</span>
              </div>
            </div>
            
            <div className="footer-columns" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', marginBottom: '20px' }}>Disciplines</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li><Link to="/discipline/physical" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Physical</Link></li>
                  <li><Link to="/discipline/organic" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Organic</Link></li>
                  <li><Link to="/discipline/inorganic" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Inorganic</Link></li>
                  <li><Link to="/acid-reactions" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Acid Reactions</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', marginBottom: '20px' }}>Labs</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li><Link to="/periodic-table" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Periodic Table</Link></li>
                  <li><Link to="/lab" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>3D Atomic Lab</Link></li>
                  <li><Link to="/chemist-lab" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Virtual Chem Lab</Link></li>
                  <li><Link to="/element/carbon" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Element Wiki</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', marginBottom: '20px' }}>Community</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li><a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Facebook Page</a></li>
                  <li><a href="#community" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Updates Feed</a></li>
                  <li><Link to="/element/carbon" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Element of the Week</Link></li>
                  <li><Link to="/discipline/organic" style={{ color: 'var(--cf-text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Study Notes</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '30px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--cf-text-muted)' }}>
              © 2026 chemistryfundamentals · Crafted for JEE, NEET & Board aspirants
            </div>
            <div className="social-links" style={{ display: 'flex', gap: '16px' }}>
              <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" title="Facebook" style={{ color: 'var(--cf-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--cf-text-secondary)'}><Globe size={18} /></a>
              <Link to="/periodic-table" title="Periodic Table" style={{ color: 'var(--cf-text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--cf-text-secondary)'}><Atom size={18} /></Link>
              <a href="https://github.com/aroonthorat/chemistry-fundamentals-app1" target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--cf-text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--cf-text-secondary)'}><Brain size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
