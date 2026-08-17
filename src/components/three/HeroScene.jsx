import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense } from "react";

/**
 * Three.js layer over the homepage video — floating "lens elements":
 * transmissive glass discs that refract the video-lit scene behind them.
 * Kept deliberately sparse so the video stays the hero.
 */
function LensDisc({ position, scale = 1, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh position={position} scale={scale} rotation={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.12}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.35}
          color="#EDEAE3"
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.75]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} color="#E8B44A" />
        <LensDisc position={[3.4, 1.4, 0]} scale={0.9} speed={1.2} />
        <LensDisc position={[-3.8, -1.6, -1]} scale={1.3} speed={0.8} />
        <LensDisc position={[2.6, -2.2, -2]} scale={0.6} speed={1.6} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
