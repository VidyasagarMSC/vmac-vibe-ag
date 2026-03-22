"use client"

import { useRef, useCallback } from "react"
import { useMotionValue, useSpring } from "framer-motion"

interface TiltOptions {
    max?: number
    perspective?: number
    scale?: number
}

export function useTilt({ max = 15, perspective = 1000, scale = 1.02 }: TiltOptions = {}) {
    const ref = useRef<HTMLElement>(null)

    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 })
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 })
    const springScale = useSpring(useMotionValue(1), { stiffness: 300, damping: 30 })

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  // 0 → 1
        const y = (e.clientY - rect.top) / rect.height   // 0 → 1
        rotateY.set((x - 0.5) * max * 2)
        rotateX.set((0.5 - y) * max * 2)
    }, [max, rotateX, rotateY])

    const handleMouseEnter = useCallback(() => {
        springScale.set(scale)
    }, [scale, springScale])

    const handleMouseLeave = useCallback(() => {
        rotateX.set(0)
        rotateY.set(0)
        springScale.set(1)
    }, [rotateX, rotateY, springScale])

    return {
        ref,
        style: {
            rotateX: springRotateX,
            rotateY: springRotateY,
            scale: springScale,
            transformPerspective: perspective,
        },
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    }
}
