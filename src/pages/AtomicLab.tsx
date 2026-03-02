import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { Atom, ArrowLeft, Info, Settings2, Hand } from 'lucide-react';
import * as THREE from 'three';

// --- 3D Models ---

const DaltonModel = () => (
    <group>
        <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial color="#8a2be2" roughness={0.7} metalness={0.2} />
        </mesh>
    </group>
);

const ThomsonModel = () => {
    const electrons = [
        [0.8, 0.5, 0.2], [-0.5, 0.8, -0.2], [0.1, -0.9, 0.4],
        [-0.6, -0.4, 0.8], [0.4, 0.2, -0.9], [-0.3, -0.2, -0.8],
        [0.9, -0.1, -0.1], [-0.8, 0.2, 0.5]
    ];

    return (
        <group>
            <mesh>
                <sphereGeometry args={[1.8, 64, 64]} />
                <meshStandardMaterial color="#ff007f" transparent opacity={0.4} roughness={0.2} />
            </mesh>
            {electrons.map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
                </mesh>
            ))}
        </group>
    );
};

const RutherfordModel = () => {
    const orbits = [
        { radius: 2, rx: 0, rz: 0.2 },
        { radius: 2.2, rx: Math.PI / 4, rz: Math.PI / 3 },
        { radius: 2.5, rx: -Math.PI / 4, rz: -Math.PI / 6 },
        { radius: 2.8, rx: Math.PI / 2, rz: 0 }
    ];

    return (
        <group>
            <mesh>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2} />
            </mesh>
            {orbits.map((orbit, i) => (
                <group key={i} rotation={[orbit.rx, 0, orbit.rz]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[orbit.radius, 0.015, 16, 100]} />
                        <meshBasicMaterial color="white" transparent opacity={0.3} />
                    </mesh>
                    <mesh position={[orbit.radius, 0, 0]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const OrbitingElectron = ({ radius, speed, color, startAngle = 0 }: any) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.x = Math.cos(clock.getElapsedTime() * speed + startAngle) * radius;
            ref.current.position.z = Math.sin(clock.getElapsedTime() * speed + startAngle) * radius;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
    );
};

const BohrModel = ({ activeShell }: { activeShell: number | null }) => {
    const shells = [
        { n: 1, radius: 1, electrons: 2, speed: 2 },
        { n: 2, radius: 2, electrons: 8, speed: 1.5 },
        { n: 3, radius: 3, electrons: 4, speed: 1 }
    ];

    return (
        <group>
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.5} />
            </mesh>

            {shells.map((shell, i) => {
                const isActive = activeShell === null || activeShell === shell.n;
                return (
                    <group key={i}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[shell.radius - 0.02, shell.radius + 0.02, 64]} />
                            <meshBasicMaterial color={isActive ? "#00f0ff" : "white"} transparent opacity={isActive ? 0.6 : 0.1} side={THREE.DoubleSide} />
                        </mesh>

                        {Array.from({ length: shell.electrons }).map((_, ej) => {
                            const angleOffset = (ej / shell.electrons) * Math.PI * 2;
                            return (
                                <OrbitingElectron
                                    key={ej}
                                    radius={shell.radius}
                                    speed={shell.speed}
                                    startAngle={angleOffset}
                                    color={isActive ? "#00f0ff" : "#555"}
                                />
                            );
                        })}
                    </group>
                );
            })}
        </group>
    );
};

const QuantumCloud = () => {
    const count = 10000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        // 1s/2s approximation cloud
        let r = Math.random() * 3.5 * Math.random(); // Dense at center
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return (
        <group>
            <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3} />
            </mesh>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.04} color="#00f0ff" transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
            </points>
        </group>
    );
};

// --- Main Component ---

const models = [
    { id: 'dalton', name: "Dalton's Model", desc: "Solid indivisible sphere, representing atoms as identical, unbreakable particles.", comp: DaltonModel },
    { id: 'thomson', name: "Thomson's Model", desc: "'Plum Pudding' - Positively charged sphere with embedded negative electrons.", comp: ThomsonModel },
    { id: 'rutherford', name: "Rutherford Model", desc: "Dense positive nucleus with electrons orbiting in mostly empty space.", comp: RutherfordModel },
    { id: 'bohr', name: "Bohr Model", desc: "Electrons orbit the nucleus in distinct, quantized circular energy levels (shells).", comp: BohrModel },
    { id: 'quantum', name: "Quantum Model", desc: "Electrons exist in probability clouds (orbitals) rather than exact paths.", comp: QuantumCloud },
];

export default function AtomicLab() {
    const [activeModel, setActiveModel] = useState(3); // Start with Bohr
    const [bohrShell, setBohrShell] = useState<number | null>(null);

    const CurrentModel = models[activeModel].comp;

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'var(--bg-color)', color: 'white' }}>

            {/* Navbar Minimal */}
            <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', zIndex: 100, background: 'rgba(5, 5, 5, 0.7)' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <div className="logo" style={{ fontSize: '1.2rem' }}>
                    <Atom className="logo-icon" size={24} color="var(--accent-cyan)" /> Atomic <span className="text-gradient">3D Lab</span>
                </div>
                <div style={{ width: '100px' }}></div>
            </header>

            {/* Main Content Split */}
            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

                {/* Sidebar Options */}
                <div style={{ width: '300px', padding: '24px', borderRight: '1px solid var(--border-color)', overflowY: 'auto', background: 'rgba(20,20,25,0.6)', backdropFilter: 'blur(10px)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <Settings2 size={18} /> Model Evolution
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {models.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveModel(i)}
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: `1px solid ${activeModel === i ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                                    background: activeModel === i ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                                    color: 'white',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{m.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3D Canvas Area */}
                <div style={{ flex: 1, position: 'relative' }}>

                    {/* Controls Hint */}
                    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '10px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                        <Hand size={16} color="var(--accent-cyan)" /> Rotate & drag to explore
                    </div>

                    <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                        <CurrentModel activeShell={bohrShell} />

                        <OrbitControls enablePan={false} maxDistance={12} minDistance={2} />
                    </Canvas>

                    {/* Interactive Lab Controls (if Bohr Model active) */}
                    {activeModel === 3 && (
                        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '12px', background: 'rgba(20,20,25,0.8)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)' }}>
                            <div style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Info size={16} style={{ marginRight: '6px' }} /> Highlight Shell:
                            </div>
                            <button
                                onClick={() => setBohrShell(null)}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: bohrShell === null ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: bohrShell === null ? 'black' : 'white', cursor: 'pointer', fontWeight: 600 }}
                            >All</button>
                            <button
                                onClick={() => setBohrShell(1)}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: bohrShell === 1 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: bohrShell === 1 ? 'black' : 'white', cursor: 'pointer', fontWeight: 600 }}
                            >K Shell</button>
                            <button
                                onClick={() => setBohrShell(2)}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: bohrShell === 2 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: bohrShell === 2 ? 'black' : 'white', cursor: 'pointer', fontWeight: 600 }}
                            >L Shell</button>
                            <button
                                onClick={() => setBohrShell(3)}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: bohrShell === 3 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: bohrShell === 3 ? 'black' : 'white', cursor: 'pointer', fontWeight: 600 }}
                            >M Shell</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
