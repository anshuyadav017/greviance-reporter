import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

// --- Particle Generator ---
// Creates a cloud of points in a specific shape (Sphere-ish)
const generateParticles = (count) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Random point on a sphere surface (more distributed)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 4 + Math.random() * 2; // Radius between 4 and 6

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

const ParticleWave = () => {
    const ref = useRef();
    // Generate 3000 particles
    const positions = useMemo(() => generateParticles(3000), []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Slow, majestic rotation
            ref.current.rotation.x += delta * 0.05;
            ref.current.rotation.y += delta * 0.03;

            // Pulse effect (breathing)
            const t = state.clock.getElapsedTime();
            ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#1a472a"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
};

const GoldenDust = () => {
    const ref = useRef();
    const positions = useMemo(() => {
        const p = new Float32Array(1000 * 3);
        // Random dust across the screen
        for (let i = 0; i < 1000 * 3; i++) p[i] = (Math.random() - 0.5) * 15;
        return p;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.02;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#c5a059"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    )
}

const ImmersiveBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-gray-50 to-white">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <ParticleWave />
                <GoldenDust />
            </Canvas>
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-white/60 pointer-events-none"></div>
        </div>
    );
};

export default ImmersiveBackground;
