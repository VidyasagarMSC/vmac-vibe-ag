"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Connect lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        // Scroll progress bar
        const bar = document.querySelector<HTMLElement>(".scroll-prog")
        if (bar) {
            lenis.on("scroll", ({ progress }: { progress: number }) => {
                bar.style.transform = `scaleX(${progress})`
            })
        }

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
        }
    }, [])

    return <>{children}</>
}
