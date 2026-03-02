import { useEffect } from 'react';
import { Beaker, Atom, TestTube, ArrowRight, BookOpen, GraduationCap, Brain, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  // Load Facebook SDK
  useEffect(() => {
    // @ts-ignore
    window.fbAsyncInit = function () {
      // @ts-ignore
      FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      // @ts-ignore
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      {/* Background Elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

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
            <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', color: 'white' }}>Join Page</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge">
            <GraduationCap size={16} /> XI, XII, NEET & JEE Preparation
          </div>
          <h1>Master the Elements of <span className="text-gradient">Success</span></h1>
          <p>Your ultimate companion for dominating Organic, Inorganic, and Physical Chemistry. Join our community of thousands of students excelling in board exams and competitive tests.</p>
          <div className="hero-buttons">
            <a href="#topics" className="btn btn-primary">
              Explore Topics <ArrowRight size={20} />
            </a>
            <a href="#community" className="btn btn-secondary">
              View Updates
            </a>
          </div>
        </div>
      </section>

      {/* Branches of Chemistry */}
      <section id="topics" className="glass-panel" style={{ margin: '0 24px', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="section-header">
            <h2 className="section-title">Core Disciplines</h2>
            <p className="section-subtitle">Comprehensive coverage of the three main pillars of chemistry to build a rock-solid conceptual foundation.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <Beaker size={32} />
              </div>
              <h3>Physical Chemistry</h3>
              <p>Master thermodynamics, kinetics, and quantum chemistry with clear mathematical foundations and intuitive problem-solving strategies.</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <TestTube size={32} />
              </div>
              <h3>Organic Chemistry</h3>
              <p>Demystify reaction mechanisms, stereochemistry, and synthesis. Learn to think logically rather than memorizing infinite reactions.</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <Atom size={32} />
              </div>
              <h3>Inorganic Chemistry</h3>
              <p>Understand periodic trends, coordination compounds, and metallurgy through structured patterns and fundamental principles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Community Updates */}
      <section id="community" className="community-section">
        <div className="container community-grid">
          <div className="community-content">
            <h3>Live Updates from our <span className="text-gradient">Community</span></h3>
            <p>Stay updated with the latest study materials, daily chemistry questions, tips, and important announcements directly from our Facebook page. Join 35,000+ students actively learning every day!</p>

            <div className="stats-grid">
              <div className="stat-item glass-panel">
                <div className="stat-number">35k+</div>
                <div className="stat-label">Active Followers</div>
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
