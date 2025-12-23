import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Cone, Sphere } from '@react-three/drei';

const FloatingShapes = () => {
    return (
        <group>
            {/* Abstract representation of "Process" steps */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Torus args={[0.8, 0.2, 16, 100]} position={[-2, 1, -2]} rotation={[0.5, 0.5, 0]}>
                    <meshStandardMaterial color="#1a472a" roughness={0.4} metalness={0.6} />
                </Torus>
            </Float>

            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <Cone args={[0.5, 1.5, 32]} position={[2, 0, -3]} rotation={[0, 0, 0.5]}>
                    <meshStandardMaterial color="#c5a059" roughness={0.3} metalness={0.8} />
                </Cone>
            </Float>

            <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
                <Sphere args={[0.4, 32, 32]} position={[0, -1.5, -1]}>
                    <meshStandardMaterial color="#2e7d32" roughness={0.5} />
                </Sphere>
            </Float>

            <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
                <Torus args={[0.5, 0.1, 16, 50]} position={[2.5, 2, -4]}>
                    <meshStandardMaterial color="#e8f5e9" opacity={0.3} transparent />
                </Torus>
            </Float>
        </group>
    );
};

const WorkflowBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 opacity-40 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
                <pointLight position={[-10, -5, -10]} intensity={1} color="#c5a059" />
                <FloatingShapes />
            </Canvas>
        </div>
    );
};

export default WorkflowBackground;
