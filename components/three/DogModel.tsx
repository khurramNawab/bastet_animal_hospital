'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

interface DogModelProps {
  reducedMotion?: boolean;
  onBoop?: (event: THREE.Intersection) => void;
}

export function DogModel({ reducedMotion = false, onBoop }: DogModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);
  const [boopTime, setBoopTime] = useState<number | null>(null);

  // Load GLTF Model & Animations
  const { scene, animations } = useGLTF('/models/dog.glb');

  // Clone skinned mesh properly with SkeletonUtils to retain bone bindings
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene) as THREE.Group;

    // Enable shadows and proper material shading
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Compute bounding box to normalize scale and ground to y = 0
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale puppy to a majestic, prominent size (~1.82 units height)
    const scaleFactor = 1.82 / (size.y || 0.31);
    clone.scale.setScalar(scaleFactor);

    // Recompute box after scaling to center on X/Z and ground on Y=0
    box.setFromObject(clone);
    box.getCenter(center);
    clone.position.x = -center.x;
    clone.position.y = -box.min.y;
    clone.position.z = -center.z;

    return clone;
  }, [scene]);

  // Pass clonedScene to useAnimations
  const { actions, names } = useAnimations(animations, groupRef);

  // Find head or neck joint from the rig for mouse tracking
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

  // Play idle animation clip smoothly
  useEffect(() => {
    if (reducedMotion) {
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.stop();
      }
      return;
    }

    if (names.length > 0 && actions[names[0]]) {
      const action = actions[names[0]];
      action?.reset().fadeIn(0.5).play();
    }

    return () => {
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.fadeOut(0.5);
      }
    };
  }, [actions, names, reducedMotion]);

  const handleClick = (e: { stopPropagation: () => void; point: THREE.Vector3 }) => {
    if (reducedMotion) return;
    e.stopPropagation();
    setBoopTime(performance.now());
    if (onBoop) {
      onBoop(e as unknown as THREE.Intersection);
    }
  };

  // Frame loop for mouse-follow, breathing, and boop spring physics
  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    const pointerX = state.pointer.x; // -1 to 1
    const pointerY = state.pointer.y; // -1 to 1

    // Clamp yaw (±25°) and pitch (±12°) in radians
    const maxYaw = THREE.MathUtils.degToRad(25);
    const maxPitch = THREE.MathUtils.degToRad(12);

    const targetYaw = THREE.MathUtils.clamp(-pointerX * maxYaw, -maxYaw, maxYaw);
    const targetPitch = THREE.MathUtils.clamp(pointerY * maxPitch, -maxPitch, maxPitch);

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
        -Math.PI / 6 + targetYaw * 0.5,
        3,
        delta,
      );
    }

    // Boop spring squash & bounce
    if (boopTime) {
      const elapsed = (performance.now() - boopTime) / 1000;
      if (elapsed < 0.6) {
        // Damped spring formula
        const spring = Math.exp(-elapsed * 6) * Math.sin(elapsed * 25);
        groupRef.current.scale.y = 1 - spring * 0.12;
        groupRef.current.scale.x = 1 + spring * 0.08;
        groupRef.current.scale.z = 1 + spring * 0.08;
        groupRef.current.position.y = Math.max(0, spring * 0.06);
      } else {
        groupRef.current.scale.set(1, 1, 1);
        groupRef.current.position.y = 0;
        setBoopTime(null);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.05, 0]}
      rotation={[0, -Math.PI / 7, 0]}
      onClick={handleClick}
      dispose={null}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/dog.glb');
