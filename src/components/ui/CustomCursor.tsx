"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(true)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 200 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            
            if (isHidden) setIsHidden(false)

            const target = e.target as HTMLElement
            const isClickable = 
                target.closest('a') || 
                target.closest('button') || 
                target.closest('.card') ||
                window.getComputedStyle(target).cursor === 'pointer'
            
            setIsPointer(!!isClickable)
        }

        const handleMouseLeave = () => setIsHidden(true)
        const handleMouseEnter = () => setIsHidden(false)

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [cursorX, cursorY, isHidden])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] mix-blend-difference hidden md:block"
            style={{
                x: x,
                y: y,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isHidden ? 0 : 1,
            }}
        >
            <motion.div
                className="w-full h-full rounded-full border border-white bg-white/5"
                animate={{
                    scale: isPointer ? 1.5 : 0.8,
                    borderRadius: isPointer ? "12px" : "50%",
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    )
}
