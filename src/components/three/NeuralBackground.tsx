'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleNetwork({ count = 800 }) {
  const points = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    
    points.current.rotation.y += delta * 0.05;
    points.current.rotation.x += delta * 0.02;

    // Gentle repel from mouse
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const dx = mx - positions[ix];
      const dy = my - positions[iy];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        positions[ix] -= dx * 0.01;
        positions[iy] -= dy * 0.01;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00FF94"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
