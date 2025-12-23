import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

// Simple random generator to replace maath
const generateSpherePoints = (count, radius) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Uniformly distributed points in a sphere... roughly
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * radius; // cbrt for uniform volume

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

const ParticleField = (props) => {
    const ref = useRef();
    const sphere = useMemo(() => generateSpherePoints(5000, 1.8), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#1a472a"
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

const ConnectedNodes = () => {
    const ref = useRef();
    const sphere = useMemo(() => generateSpherePoints(2000, 2.2), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta / 20;
            ref.current.rotation.y += delta / 25;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 3]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#c5a059"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    )
}

const Hero3D = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <ParticleField />
                <ConnectedNodes />
            </Canvas>
        </div>
    );
};

export default Hero3D;
