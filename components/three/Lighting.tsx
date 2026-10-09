'use client';

import React from 'react';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';

export function Lighting() {
  return (
    <>
      {/* Ambient & Directional Warm Studio Key Light */}
      <ambientLight intensity={0.8} color="#FFF6E5" />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFF6E5" castShadow={false} />

      {/* Warm Orange-tinted Side Light */}
      <directionalLight position={[-3, 4, 3]} intensity={1.2} color="#FFB27A" />

      {/* Sand/Warm Rim Back Light for Depth & Contrast */}
      <directionalLight position={[0, 4, -5]} intensity={1.8} color="#F7DAA7" />

      {/* Offline Procedural Studio Environment using Lightformer */}
      <Environment resolution={128}>
        {/* Overhead soft warm dome */}
        <Lightformer
          form="rect"
          intensity={1.5}
          color="#FFF6E5"
          position={[0, 6, 0]}
          scale={[8, 8, 1]}
          target={[0, 0, 0]}
        />
        {/* Warm key highlight */}
        <Lightformer
          form="circle"
          intensity={1.8}
          color="#FF751B"
          position={[4, 3, 2]}
          scale={[3, 3, 1]}
          target={[0, 0, 0]}
        />
        {/* Subtle olive fill */}
        <Lightformer
          form="ring"
          intensity={1.0}
          color="#5F6C37"
          position={[-4, 2, -2]}
          scale={[4, 4, 1]}
          target={[0, 0, 0]}
        />
      </Environment>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.55}
        scale={4}
        blur={1.8}
        far={3}
        resolution={256}
        color="#241E10"
      />
    </>
  );
}
