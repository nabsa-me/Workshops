"use client";

import { useGSAP } from "@gsap/react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useState } from "react";
import { Group, PointLight } from "three";

export default function Page() {
  const [group, setGroup] = useState<Group | null>(null);
  const [light, setLight] = useState<PointLight | null>(null);

  useGSAP(
    () => {
      if (!group || !light) return;

      gsap.from(group.position, {
        y: -0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(group.rotation, {
        x: 0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(light.position, {
        x: -1,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(light, {
        intensity: 0,
        duration: 1.4,
        ease: "power2.out",
      });
    },
    { dependencies: [group, light], revertOnUpdate: true }
  );

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black">
      <Canvas>
        <group ref={setGroup}>
          <Scene />
        </group>
        <PerspectiveCamera fov={28} makeDefault position={[0, 1.5, 5]} />
        <ambientLight intensity={0.1} />
        <pointLight ref={setLight} position={[30, 3, 5]} intensity={20} />
        <color args={["black"]} attach="background" />
      </Canvas>
    </div>
  );
}

function Scene() {
  const { scene } = useGLTF("/models/rover/source/Perseverance.glb");

  return <primitive object={scene} />;
}
