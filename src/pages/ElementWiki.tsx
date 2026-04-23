import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Flame, Droplets, Wind, Zap, Shield, Atom, Info } from 'lucide-react';
import elementsData from '../data/elements.json';
import { CATEGORIES } from '../types/chemistry';
import type { Element } from '../types/chemistry';
import { BohrModel } from '../components/ElementDetailModal';

// Helper to generate entertaining tone based on category
const getPersonality = (category: string, element: Element) => {
  const cat = category.toLowerCase();
  
  let trait = "The Mysterious Wanderer";
  let description = "This element is full of surprises, defying simple expectations and standing out from the crowd.";
  let icon = <Sparkles size={24} />;
  
  if (cat.includes("noble gas")) {
    trait = "The Ultimate Loner";
    description = `As a noble gas, ${element.name} is incredibly stable and practically refuses to react with anyone else. It's the cool, aloof royalty of the periodic table!`;
    icon = <Wind size={24} />;
  } else if (cat.includes("alkali metal")) {
    trait = "The Explosive Extrovert";
    description = `Watch out! ${element.name} is an alkali metal, meaning it is highly reactive, especially with water. It's desperate to give away its outer electron to make a connection.`;
    icon = <Flame size={24} />;
  } else if (cat.includes("halogen")) {
    trait = "The Aggressive Collector";
    description = `Being a halogen means ${element.name} is just one electron short of a full shell. It will aggressively react with almost anything to steal that missing piece!`;
    icon = <Zap size={24} />;
  } else if (cat.includes("transition metal")) {
    trait = "The Reliable Backbone";
    description = `Tough, shiny, and versatile! ${element.name} is a transition metal, forming the strong, colorful foundations of many everyday materials and complex chemistry.`;
    icon = <Shield size={24} />;
  } else if (cat.includes("actinide") || cat.includes("lanthanide")) {
    trait = "The Heavyweight Exotic";
    description = `Deep down in the f-block, ${element.name} is a rare and heavy exotic element, often associated with radioactivity, glowing mysteries, and cutting-edge science.`;
    icon = <Atom size={24} />;
  } else if (cat.includes("post-transition metal")) {
    trait = "The Soft Transformer";
    description = `A true post-transition metal, ${element.name} is softer and has lower melting points than its tougher cousins, making it incredibly useful in alloys and modern tech.`;
    icon = <Droplets size={24} />;
  } else if (cat.includes("metalloid")) {
    trait = "The Double Agent";
    description = `Is it a metal? Is it a nonmetal? It's a metalloid! ${element.name} has a dual personality, often acting as a semiconductor which makes the digital age possible.`;
    icon = <Info size={24} />;
  } else if (cat.includes("diatomic nonmetal") || cat.includes("polyatomic nonmetal")) {
    trait = "The Essential Life-Bringer";
    description = `${element.name} is a crucial nonmetal, heavily involved in the organic compounds and fundamental gases that make life and the atmosphere possible!`;
    icon = <Wind size={24} />;
  }

  return { trait, description, icon };
};

const ElementWiki: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const element = useMemo(() => {
    return (elementsData.elements as Element[]).find(
      el => el.name.toLowerCase() === id?.toLowerCase() || el.symbol.toLowerCase() === id?.toLowerCase()
    );
  }, [id]);

  if (!element) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>Element not found. Are you sure you didn't discover a new one?</h2>
        <Link to="/periodic-table" className="btn btn-primary" style={{ marginLeft: '20px' }}>Go Back</Link>
      </div>
    );
  }

  const categoryDef = CATEGORIES.find(c => element.category.includes(c.id));
  const color = categoryDef ? categoryDef.color : '#ffffff';
  const personality = getPersonality(element.category, element);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#050505', 
      color: '#fff',
      paddingTop: '100px',
      paddingBottom: '100px',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Dynamic Backgrounds */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: `radial-gradient(circle, ${color}11 0%, transparent 70%)`, filter: 'blur(80px)', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Link to="/periodic-table" style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', 
          textDecoration: 'none', marginBottom: '40px', fontWeight: 600, padding: '8px 20px',
          background: 'rgba(0, 240, 255, 0.05)', borderRadius: '100px', border: '1px solid rgba(0, 240, 255, 0.2)'
        }}>
          <ArrowLeft className="h-4 w-4" /> Return to Periodic Table
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'start' }}>
          
          {/* Left Column - Visuals & Big Facts */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                background: 'rgba(10, 10, 15, 0.6)', borderRadius: '40px', padding: '40px', 
                border: `1px solid ${color}44`, boxShadow: `0 20px 80px rgba(0,0,0,0.5), inset 0 0 40px ${color}11`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <BohrModel element={element} color={color} />
              </div>
              <h1 style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-2px', margin: '20px 0 10px', lineHeight: 1 }}>
                {element.name}
              </h1>
              <span style={{ 
                fontSize: '1.2rem', color: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px',
                background: 'rgba(255,255,255,0.05)', padding: '8px 24px', borderRadius: '100px', border: `1px solid ${color}33`
              }}>{element.category}</span>
            </motion.div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div className="glass-card" style={{ padding: '20px', textAlign: 'center', border: `1px solid ${color}22` }}>
                <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Number</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: color }}>{element.number}</span>
              </div>
              <div className="glass-card" style={{ padding: '20px', textAlign: 'center', border: `1px solid ${color}22` }}>
                <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Symbol</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>{element.symbol}</span>
              </div>
            </div>
          </div>

          {/* Right Column - The Story */}
          <div style={{ paddingTop: '20px' }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              
              {/* Personality Card */}
              <div style={{ 
                background: `linear-gradient(135deg, ${color}22, transparent)`, borderRadius: '24px', 
                padding: '30px', border: `1px solid ${color}44`, marginBottom: '40px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ background: color, color: '#000', padding: '10px', borderRadius: '12px' }}>
                    {personality.icon}
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#fff' }}>{personality.trait}</h2>
                </div>
                <p style={{ fontSize: '1.2rem', color: '#eee', lineHeight: 1.6, margin: 0 }}>
                  {personality.description}
                </p>
              </div>

              {/* The Real Story */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles color={color} /> The Real Story
                </h3>
                <div style={{ fontSize: '1.15rem', color: '#ccc', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: element.summary.replace(/\n/g, '<br/>') }} />
              </div>

              {/* Entertaining Stats */}
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>By The Numbers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>Atomic Mass (How Heavy?)</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>{element.atomic_mass.toFixed(2)} <span style={{ fontSize: '1rem', color: '#666' }}>u</span></div>
                  <div style={{ width: '100%', height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (element.atomic_mass / 300) * 100)}%`, height: '100%', background: color }} />
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>Electronegativity (Electron Greed)</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>{element.electronegativity_pauling || 'Too Cool'} <span style={{ fontSize: '1rem', color: '#666' }}>Pauling</span></div>
                  <div style={{ width: '100%', height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, ((element.electronegativity_pauling || 0) / 4) * 100)}%`, height: '100%', background: color }} />
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', gridColumn: '1 / -1' }}>
                   <div style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>Who found it?</div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{element.discovered_by || 'Lost to History'}</div>
                   <p style={{ margin: '10px 0 0 0', color: '#aaa', fontSize: '0.95rem' }}>Some say they found it in a lab, others say it found them.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementWiki;
