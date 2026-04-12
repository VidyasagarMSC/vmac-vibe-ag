"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export function SpotlightCard({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode
    className?: string
    containerClassName?: string
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            className={cn("group card relative", containerClassName)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="spotlight-mask pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(var(--primary-rgb), 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            <div className={cn("relative z-10", className)}>
                {children}
            </div>
        </div>
    )
}
