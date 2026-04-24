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

  // Fast Value Noise (extremely performant)
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Simplified FBM for performance
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 3; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + 100.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Scaled resolution for performance
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Mouse interaction
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;
    float dist = distance(st, mouse);
    
    // Reaction parameters
    float baseRadius = 0.3 + (u_metal_intensity * 0.3);
    float reactionMult = 1.0 + (u_metal_intensity * 6.0);
    float reaction = smoothstep(baseRadius, 0.0, dist) * reactionMult;
    
    // Optimized Fluid Simulation (Reducing FBM calls)
    vec2 q = vec2(fbm(st + u_time * 0.04), fbm(st + vec2(1.0)));
    vec2 r = vec2(fbm(st + q + u_time * 0.07), fbm(st + q + vec2(0.5)));
    
    // Single noise call instead of full FBM for the final detail
    float f = noise(st + r * 2.0);

    // Color mixing
    vec3 color = mix(vec3(0.015), u_color, clamp(f * 2.5, 0.0, 1.0));
    color = mix(color, vec3(0.85), clamp(length(q) * 0.35, 0.0, 1.0));
    color = mix(color, u_color * 1.4, clamp(length(r.x) * 0.5, 0.0, 1.0));

    // Mouse reaction
    vec3 reactionColor = mix(u_color * 2.0, u_metal_color * 3.5, u_metal_intensity);
    reactionColor = mix(reactionColor, vec3(1.0), smoothstep(0.12, 0.0, dist));
    color += reactionColor * reaction;

    // Final vignette and glow
    float vignette = 1.0 - smoothstep(1.5, 0.5, length(st - 0.5));
    gl_FragColor = vec4(color * (f * 0.9 + 0.3) * (vignette * 0.5 + 0.5), 1.0);
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
