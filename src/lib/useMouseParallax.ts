"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring, MotionValue } from "framer-motion"

interface MouseParallaxReturn {
    mouseX: MotionValue<number>
    mouseY: MotionValue<number>
    springX: MotionValue<number>
    springY: MotionValue<number>
}

export function useMouseParallax(stiffness = 80, damping = 20): MouseParallaxReturn {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springX = useSpring(mouseX, { stiffness, damping })
    const springY = useSpring(mouseY, { stiffness, damping })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -0.5 → 0.5 range
            const nx = (e.clientX / window.innerWidth) - 0.5
            const ny = (e.clientY / window.innerHeight) - 0.5
            mouseX.set(nx)
            mouseY.set(ny)
        }
        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return { mouseX, mouseY, springX, springY }
}
