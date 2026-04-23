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

  // GLSL noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 3; ++i) {
      v += a * snoise(x);
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
    
    // Liquid distortion
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00 * u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

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

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      // Convert normalized pointer coordinates to pixel coordinates for the shader
      const pointerX = (state.pointer.x + 1) / 2 * size.width;
      const pointerY = (state.pointer.y + 1) / 2 * size.height;
      // Lerp mouse movement for smoother fluid reaction
      targetMouse.set(pointerX, pointerY);
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
