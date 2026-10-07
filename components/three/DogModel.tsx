'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface DogModelProps {
  reducedMotion?: boolean;
}

export function DogModel({ reducedMotion = false }: DogModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);

  // Load GLTF Model & Animations
  const { scene, animations } = useGLTF('/models/dog.glb');
  const { actions, names } = useAnimations(animations, groupRef);

  // Clone scene so multiple instances or hot-reloads remain pure
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box to normalize scale and ground to y = 0
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Normalize height to approx ~1.5 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 1.4 / maxDim;
    clone.scale.setScalar(scaleFactor);

    // Recompute box after scaling to place on ground
    box.setFromObject(clone);
    box.getCenter(center);
    clone.position.x = -center.x;
    clone.position.y = -box.min.y;
    clone.position.z = -center.z;

    return clone;
  }, [scene]);

  // Find head or neck joint from the rig
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Bone) {
          if (
            child.name.includes('Head') ||
            child.name.includes('Neck_Top') ||
            child.name.includes('Neck_02')
          ) {
            headBoneRef.current = child;
          }
        }
      });
    }
  }, [clonedScene]);

  // Play idle animation clip
  useEffect(() => {
    if (reducedMotion) {
      actions[names[0]]?.stop();
      return;
    }

    if (names.length > 0 && actions[names[0]]) {
      const action = actions[names[0]];
      action?.reset().fadeIn(0.5).play();
    }

    return () => {
      actions[names[0]]?.fadeOut(0.5);
    };
  }, [actions, names, reducedMotion]);

  // Frame loop for mouse-follow and gentle drift
  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    const pointerX = state.pointer.x; // -1 to 1
    const pointerY = state.pointer.y; // -1 to 1

    // Clamp yaw (±25°) and pitch (±12°) in radians
    const maxYaw = THREE.MathUtils.degToRad(25);
    const maxPitch = THREE.MathUtils.degToRad(12);

    const targetYaw = THREE.MathUtils.clamp(-pointerX * maxYaw, -maxYaw, maxYaw);
    const targetPitch = THREE.MathUtils.clamp(pointerY * maxPitch, -maxPitch, maxPitch);

    // If head bone exists, apply rotation to head; otherwise smoothly rotate the group
    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = THREE.MathUtils.damp(
        headBoneRef.current.rotation.y,
        targetYaw,
        4,
        delta,
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.damp(
        headBoneRef.current.rotation.x,
        targetPitch,
        4,
        delta,
      );
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetYaw * 0.6,
        3,
        delta,
      );
    }

    // Breathing sine fallback if no animation clip is active
    if (names.length === 0) {
      const breath = Math.sin(state.clock.elapsedTime * 2) * 0.005;
      groupRef.current.position.y = breath;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 6, 0]} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/dog.glb');
