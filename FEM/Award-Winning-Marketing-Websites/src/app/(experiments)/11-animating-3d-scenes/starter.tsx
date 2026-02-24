"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Page() {
  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black">
      <Canvas>
        <group>
          <Scene />
        </group>
        <PerspectiveCamera fov={28} makeDefault position={[0, 1.5, 5]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[30, 3, 5]} intensity={20} />
        <color args={["black"]} attach="background" />
      </Canvas>
    </div>
  );
}

function Scene() {
  const { scene } = useGLTF("/models/rover/source/Perseverance.glb");

  return <primitive object={scene} />;
}
