import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '20px 0',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            <Atom className="logo-icon" size={32} color="var(--accent-cyan)" />
            <span>Chemistry<span className="text-gradient">Fundamentals</span></span>
          </div>
        </Link>
        <nav className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {isHome ? (
            <>
              <a href="#topics">Topics</a>
              <a href="#community">Community</a>
            </>
          ) : (
            <Link to="/">Home</Link>
          )}
          <Link to="/periodic-table" className={location.pathname === '/periodic-table' ? 'text-gradient' : ''} style={{ fontWeight: 600 }}>Periodic Table</Link>
          <Link to="/lab" className={location.pathname === '/lab' ? 'text-gradient' : ''} style={{ fontWeight: 600 }}>Atomic Lab</Link>
          <Link to="/chemist-lab" className={location.pathname === '/chemist-lab' ? 'text-gradient' : ''} style={{ fontWeight: 600 }}>Chem Lab</Link>
          <a href="https://www.facebook.com/share/1E2hRqzqDW/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', color: 'white' }}>Join Page</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
