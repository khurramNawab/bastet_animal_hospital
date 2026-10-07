'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface GoldDustProps {
  reducedMotion?: boolean;
}

export function GoldDust({ reducedMotion = false }: GoldDustProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    // Subtle mouse parallax effect
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.2;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <Sparkles
        count={70}
        scale={[4.5, 3.5, 3.5]}
        size={2.8}
        speed={reducedMotion ? 0 : 0.45}
        color="#C9A24B"
        opacity={0.75}
        noise={0.3}
      />
    </group>
  );
}
