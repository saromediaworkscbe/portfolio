import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe } from "@react-three/drei";
import { Suspense, useRef } from "react";

/** Slowly rotating wireframe icosahedron — a quiet "render in progress". */
function Gem() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#16181C" />
        <Wireframe stroke="#E8B44A" thickness={0.02} backfaceStroke="#2A2D33" />
      </mesh>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Gem />
      </Suspense>
    </Canvas>
  );
}
