import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Shader code for a fluid/ethereal logo effect
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;

// Simplex noise function
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
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

void main() {
  vec2 uv = vUv;
  
  // Create a subtle liquid distortion
  float noise = snoise(uv * 3.0 + uTime * 0.2);
  vec2 distortedUv = uv + vec2(noise * 0.02, noise * 0.03);
  
  // Fetch text/logo texture
  vec4 texColor = texture2D(uTexture, distortedUv);
  
  // Add a shimmering glow effect
  float glow = sin(uv.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
  vec3 glowColor = vec3(1.0, 0.8, 0.4); // Gold/Amber glow
  
  // Mix texture with glow
  vec3 color = mix(texColor.rgb, glowColor, glow * 0.3 * texColor.a);
  
  // Dynamic alpha based on texture alpha + noise
  float alpha = texColor.a * (0.8 + 0.2 * noise);
  
  gl_FragColor = vec4(color, alpha);
}
`;

const LogoMesh = ({ url }: { url: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(url);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface ShaderLogoProps {
  className?: string;
}

const ShaderLogo: React.FC<ShaderLogoProps> = ({ className }) => {
  return (
    <div className={`relative w-32 h-16 ${className}`}>
       <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true }}>
        <React.Suspense fallback={null}>
          <LogoMesh url="/logo.png" />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default ShaderLogo;
