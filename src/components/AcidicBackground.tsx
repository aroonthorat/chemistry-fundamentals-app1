import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_metal_intensity;
  uniform vec3 u_metal_color;
  
  varying vec2 vUv;

  // Fast Value Noise (extremely performant, zero risk of WebGL freezing)
  float hash(vec2 p) {
    p = fract(p * vec2(5.3983, 5.4427));
    p += dot(p.yx, p.xy + vec2(21.5351, 14.3137));
    return fract(p.x * p.y * 95.4337);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  // Fractional Brownian Motion (Simplified for extreme performance)
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    // 3 iterations with fast noise
    for (int i = 0; i < 3; ++i) {
      // Map noise from [0, 1] to [-1, 1] for typical FBM behavior
      v += a * (noise(x) * 2.0 - 1.0);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Mouse interaction
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;
    
    // Create ripples/reaction based on distance to mouse
    float dist = distance(st, mouse);
    
    // Base reaction is slightly amplified by metal intensity
    float baseRadius = 0.4 + (u_metal_intensity * 0.4);
    float reactionMult = 1.5 + (u_metal_intensity * 8.0);
    float reaction = smoothstep(baseRadius, 0.0, dist) * reactionMult;
    
    // Liquid distortion - Optimized to only 3 fbm calls total
    vec2 q = vec2(fbm(st + u_time * 0.1), fbm(st + vec2(1.0)));
    vec2 r = vec2(fbm(st + q + vec2(1.7, 9.2) + u_time * 0.15), fbm(st + q + vec2(8.3, 2.8) + u_time * 0.126));
    float f = fbm(st + r);

    // Color mixing
    vec3 color = mix(vec3(0.0, 0.0, 0.0), u_color, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, vec3(1.0, 1.0, 1.0), clamp(length(q), 0.0, 1.0));
    color = mix(color, u_color * 2.0, clamp(length(r.x), 0.0, 1.0));

    // Apply mouse reaction (bright core + colored halo)
    vec3 baseReactionColor = u_color * 3.0;
    vec3 finalReactionColor = mix(baseReactionColor, u_metal_color * 5.0, u_metal_intensity);
    
    vec3 reactionColor = mix(finalReactionColor, vec3(1.0), smoothstep(0.1 + (u_metal_intensity * 0.15), 0.0, dist));
    color += reactionColor * reaction;

    gl_FragColor = vec4((f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);
  }
`;

interface AcidicBackgroundProps {
  color: string; // Hex color
  metalIntensity?: number; // 0 to 1
  metalColor?: string; // Hex color
}

const AcidicBackground: React.FC<AcidicBackgroundProps> = ({ 
  color, 
  metalIntensity = 0, 
  metalColor = '#ffffff' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_color: { value: new THREE.Color(color) },
      u_metal_intensity: { value: metalIntensity },
      u_metal_color: { value: new THREE.Color(metalColor) },
    }),
    [size] // Only re-create on size change
  );

  // Update uniforms when props change
  useEffect(() => {
    if (uniforms.u_color) {
      uniforms.u_color.value.set(color);
      uniforms.u_metal_intensity.value = metalIntensity;
      uniforms.u_metal_color.value.set(metalColor);
    }
  }, [color, metalIntensity, metalColor, uniforms]);

  const targetMouse = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const pointerX = (e.clientX / window.innerWidth) * size.width;
      const pointerY = (1.0 - (e.clientY / window.innerHeight)) * size.height;
      targetMouse.set(pointerX, pointerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Initialize mouse to center
    targetMouse.set(size.width / 2, size.height / 2);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [targetMouse, size.width, size.height]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      // Lerp mouse movement for smoother fluid reaction
      materialRef.current.uniforms.u_mouse.value.lerp(targetMouse, 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};

export default AcidicBackground;
