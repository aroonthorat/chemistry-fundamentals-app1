import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';

interface ModelProps {
  url: string;
}

const BohrModel: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  
  // Center and scale the model
  return <primitive object={scene} />;
};

interface ElementBohrModelProps {
  elementName: string;
  modelUrl: string | null;
  onClose: () => void;
  categoryColor: string;
}

const ElementBohrModel: React.FC<ElementBohrModelProps> = ({ elementName, modelUrl, onClose, categoryColor }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(5, 5, 5, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        zIndex: 1001
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>
          {elementName} <span style={{ color: categoryColor, fontSize: '1.5rem', verticalAlign: 'middle', marginLeft: '16px', borderLeft: '2px solid #333', paddingLeft: '16px' }}>3D Bohr Model</span>
        </h2>
        <p style={{ color: '#a0a0ab', fontSize: '1.1rem' }}>Rotate and zoom to explore the atomic structure.</p>
      </div>

      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '100px',
          cursor: 'pointer',
          fontWeight: 600,
          zIndex: 1001,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}
      >
        Close Viewer
      </button>

      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <Stage environment="city" intensity={0.6}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {modelUrl ? (
                  <BohrModel url={modelUrl} />
                ) : (
                  <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color={categoryColor} emissive={categoryColor} emissiveIntensity={0.5} />
                  </mesh>
                )}
              </Float>
            </Stage>
          </Suspense>
        </Canvas>
        
        {!modelUrl && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#a0a0ab'
          }}>
            <p style={{ fontSize: '1.2rem' }}>3D Model not available for this element yet.</p>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        padding: '16px 32px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        color: '#a0a0ab',
        fontSize: '0.9rem'
      }}>
        Model provided by Google AR Education Library
      </div>
    </div>
  );
};

export default ElementBohrModel;
