"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Sparkles, Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function MouseReactiveSphere() {
    const meshRef = useRef<THREE.Mesh>(null)
    const { pointer } = useThree()

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointer.x * 0.5, 0.05)
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointer.y * 0.3, 0.05)
    })

    return (
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.8, 128, 128]} />
                <MeshDistortMaterial
                    color="#5046e5"
                    distort={0.45}
                    speed={2.5}
                    roughness={0}
                    metalness={0.85}
                />
            </mesh>
        </Float>
    )
}

function ParticleRing({ count = 200 }: { count?: number }) {
    const { pointer } = useThree()
    const pointsRef = useRef<THREE.Points>(null)

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const colorA = new THREE.Color("#5046e5")
        const colorB = new THREE.Color("#06b6d4")
        for (let i = 0; i < count; i++) {
            const theta = (i / count) * Math.PI * 2
            const r = 3 + (Math.random() - 0.5) * 2
            positions[i * 3] = Math.cos(theta) * r
            positions[i * 3 + 1] = Math.sin(theta) * r * 0.3 + (Math.random() - 0.5) * 2
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4
            const t = i / count
            const c = colorA.clone().lerp(colorB, t)
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
        }
        return { positions, colors }
    }, [count])

    const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions])
    const colAttr = useMemo(() => new THREE.BufferAttribute(colors, 3), [colors])

    useFrame((state) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08
        pointsRef.current.rotation.x = pointer.y * 0.12
        pointsRef.current.rotation.z = pointer.x * 0.06
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <primitive object={posAttr} attach="attributes-position" />
                <primitive object={colAttr} attach="attributes-color" />
            </bufferGeometry>
            <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.9} />
        </points>
    )
}

function FloatingParticles({ count = 80 }: { count?: number }) {
    const { pointer } = useThree()
    const groupRef = useRef<THREE.Group>(null)

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 14
            arr[i * 3 + 1] = (Math.random() - 0.5) * 14
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8
        }
        return arr
    }, [count])

    const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions])

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.03 + pointer.x * 0.1
        groupRef.current.rotation.x = pointer.y * 0.05
    })

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <primitive object={posAttr} attach="attributes-position" />
                </bufferGeometry>
                <pointsMaterial size={0.04} color="#a78bfa" sizeAttenuation transparent opacity={0.6} />
            </points>
        </group>
    )
}

export function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} color="#5046e5" intensity={3} distance={20} />
            <pointLight position={[-5, -5, -5]} color="#06b6d4" intensity={2} distance={20} />
            <pointLight position={[0, 8, 2]} color="#a78bfa" intensity={1.5} distance={15} />

            <Stars radius={80} depth={60} count={2500} factor={5} saturation={0.3} speed={0.5} />
            <MouseReactiveSphere />
            <ParticleRing count={200} />
            <FloatingParticles count={80} />
            <Sparkles count={60} scale={10} size={3} speed={0.4} opacity={0.7} color="#818cf8" />
        </Canvas>
    )
}
