'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';
import { interpolateCameraPose } from '@/lib/cameraInterpolation';
import type { StoryPanel } from '@/lib/types';

interface StoryDogProps {
  progress: number;
  panels: StoryPanel[];
  reducedMotion?: boolean;
}

export function StoryDog({ progress, panels, reducedMotion = false }: StoryDogProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const { camera } = useThree();

  // Load cached GLTF
  const { scene, animations } = useGLTF('/models/dog.glb');

  // Clone with SkeletonUtils
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene) as THREE.Group;
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Grand, prominent dog model presence (~25% larger than baseline) filling frame with full paws and ears clear
    const scaleFactor = 2.45 / (size.y || 0.31);
    clone.scale.setScalar(scaleFactor);

    box.setFromObject(clone);
    box.getCenter(center);
    clone.position.x = -center.x;
    clone.position.y = -box.min.y;
    clone.position.z = -center.z;

    return clone;
  }, [scene]);

  const { actions, names } = useAnimations(animations, groupRef);

  // Play continuous idle animation
  useEffect(() => {
    if (reducedMotion) {
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.stop();
      }
      return;
    }

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }

    return () => {
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]]?.fadeOut(0.5);
      }
    };
  }, [actions, names, reducedMotion]);

  // Frame loop for camera & dog pose interpolation
  useFrame((state, delta) => {
    if (!groupRef.current || panels.length === 0) return;

    const currentPose = interpolateCameraPose(progress, panels);

    if (reducedMotion) {
      camera.position.set(...currentPose.position);
      camera.lookAt(...currentPose.target);
      groupRef.current.rotation.y = currentPose.dogRotationY;
      groupRef.current.scale.setScalar(currentPose.dogScale);
      return;
    }

    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, currentPose.position[0], 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, currentPose.position[1], 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, currentPose.position[2], 5, delta);

    // Smoothly lerp lookAt target
    targetLookAt.current.x = THREE.MathUtils.damp(
      targetLookAt.current.x,
      currentPose.target[0],
      5,
      delta,
    );
    targetLookAt.current.y = THREE.MathUtils.damp(
      targetLookAt.current.y,
      currentPose.target[1],
      5,
      delta,
    );
    targetLookAt.current.z = THREE.MathUtils.damp(
      targetLookAt.current.z,
      currentPose.target[2],
      5,
      delta,
    );
    camera.lookAt(targetLookAt.current);

    // Smoothly lerp dog rotation and scale
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      currentPose.dogRotationY,
      5,
      delta,
    );

    const currentScale = groupRef.current.scale.x;
    const targetScale = THREE.MathUtils.damp(currentScale, currentPose.dogScale, 5, delta);
    groupRef.current.scale.setScalar(targetScale);
  });

  return (
    <group ref={groupRef} position={[0, -0.34, 0]} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
}
