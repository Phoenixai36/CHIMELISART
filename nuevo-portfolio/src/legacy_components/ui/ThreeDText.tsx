import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Text3D,
  Center,
  MeshTransmissionMaterial,
  Float,
  Environment,
  ContactShadows,
  Sparkles,
  Edges,
  Text,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';

// Debug component to monitor canvas size and state
const SceneMonitor = () => {
  const { size, viewport } = useThree();
  useEffect(() => {
    console.log(`Canvas Size: ${size.width}x${size.height}`);
    console.log(`Viewport: ${viewport.width}x${viewport.height}`);
  }, [size, viewport]);
  return null;
}

// Layered Sacred Geometry Background
const SacredGeometryBackground = () => {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.05;
      group.current.rotation.y += delta * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.03;
      innerRef.current.rotation.z += delta * 0.05;
    }
  });

  const chars = "+*:·.";

  return (
    <group ref={group} scale={[2.5, 2.5, 2.5]} position={[0, 0, -10]}>
      <mesh>
        <icosahedronGeometry args={[14, 1]} />
        <meshBasicMaterial color="#4b5563" wireframe transparent opacity={0.08} />
      </mesh>

      <group ref={innerRef}>
        <mesh>
          <octahedronGeometry args={[9, 0]} />
          <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.1} />
        </mesh>
      </group>

      {Array.from({ length: 40 }).map((_, i) => (
        <Float key={i} speed={0.5} rotationIntensity={1} floatIntensity={1}>
          <Text
            position={[
              (Math.random() - 0.5) * 14,
              (Math.random() - 0.5) * 14,
              (Math.random() - 0.5) * 14
            ]}
            fontSize={0.4}
            color="#fbbf24"
            fillOpacity={0.2}
          >
            {chars[Math.floor(Math.random() * chars.length)]}
          </Text>
        </Float>
      ))}
    </group>
  );
}

// ... (SceneMonitor constant)

// ... (SacredGeometryBackground constant)

const PrismTextContent = ({ text }: { text: string }) => {
  const fontUrl = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/fonts/helvetiker_bold.typeface.json";
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Center ref={meshRef}>
      <group>
        {/* INNER CORE */}
        <Text3D
          font={fontUrl}
          size={10} // Slightly reduced from 11
          height={1.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.4}
          bevelSize={0.06}
          bevelSegments={1}
          letterSpacing={0.05} // Increased spacing
        >
          {text}
          <meshBasicMaterial color="#92400e" wireframe={true} transparent opacity={0.6} />
        </Text3D>

        {/* OUTER SHELL */}
        <Text3D
          font={fontUrl}
          size={10} // Synced size
          height={3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={1}
          bevelSize={0.1}
          bevelSegments={3}
          letterSpacing={0.05}
        >
          {text}
          <MeshTransmissionMaterial
            backside={true}
            samples={10}
            thickness={3.5}
            roughness={0.2}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.1}
            anisotropy={0.2}
            color="#fbbf24"
            attenuationColor="#78350f"
            attenuationDistance={1}
            background={new THREE.Color('#000')}
          />
          <Edges
            threshold={15}
            color="#fef3c7"
            scale={1}
          />
        </Text3D>
      </group>
    </Center>
  );
};

const Scene = ({ text }: { text: string }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 85]} fov={35} /> {/* Adjusted Z position */}
      <ambientLight intensity={0.5} />
      <spotLight position={[20, 20, 20]} angle={0.2} penumbra={1} intensity={10} color="#fbbf24" />
      <pointLight position={[-10, 0, 10]} intensity={5} color="#d97706" />

      <Environment preset="night" />

      <Float floatIntensity={0.5} speed={1.5}>
        <PrismTextContent text={text} />
      </Float>

      <SacredGeometryBackground />

      <Sparkles count={60} scale={30} size={2} speed={0.3} opacity={0.4} color="#fbbf24" />

      <ContactShadows
        position={[0, -18, 0]} // Brought closer
        opacity={0.5}
        scale={90}
        blur={2.5}
        far={50}
      />
      <SceneMonitor />
    </>
  );
};

interface ThreeDTextProps {
  text: string;
  className?: string;
}

const LoadTrigger = ({ onLoad }: { onLoad: () => void }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return null;
}

export const ThreeDText = ({ text, className = '' }: ThreeDTextProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[350px] md:h-[550px] overflow-visible ${className}`} // Adjusted heights
      style={{ perspective: '1000px' }}
    >
      <h1 className="sr-only">{text}</h1>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      </div>

      {isMounted && (
        <div
          className="w-full h-full transition-opacity duration-1000 bg-transparent"
          style={{
            opacity: isLoaded ? 1 : 0,
          }}
        >
          <Canvas
            dpr={[1, 2]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance"
            }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <Suspense fallback={null}>
              <Scene text={text} />
              <LoadTrigger onLoad={() => setIsLoaded(true)} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};


export default ThreeDText;
