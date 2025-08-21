import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function ThreeDViewer({ modelPath }) {
  return (
    <div className="w-full h-[400px]">
      <Canvas className="w-full h-full object-contain" shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        <Stage environment="city" intensity={0.6}>
          <Model path={modelPath} />
        </Stage>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
