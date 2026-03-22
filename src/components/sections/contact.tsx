"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { MessageSquare, Mic, Sparkles } from "lucide-react"
import { useTilt } from "@/lib/useTilt"

const socials = [
    { key: "linkedin", label: "LinkedIn", color: "#fff", bg: "#0077b5", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
    { key: "github", label: "GitHub", color: "#fff", bg: "#24292e", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg> },
    { key: "twitter", label: "Twitter/X", color: "#fff", bg: "#000", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { key: "website", label: "Website", color: "#fff", bg: "#5046e5", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
    { key: "dzone", label: "DZone", color: "#fff", bg: "#c42127", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.082 16.094l-7.448-4.302V6.854h2.217v3.845l5.726 3.308-2.495 2.087z" /></svg> },
]

// Matrix rain canvas
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = canvas.offsetWidth)
        let h = (canvas.height = canvas.offsetHeight)
        const cols = Math.floor(w / 18)
        const drops = Array(cols).fill(1)
        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01234567890ABCDEF".split("")

        let raf: number
        const draw = () => {
            ctx.fillStyle = "rgba(4,4,15,0.08)"
            ctx.fillRect(0, 0, w, h)
            ctx.fillStyle = "#5046e530"
            ctx.font = "13px JetBrains Mono, monospace"
            drops.forEach((y, i) => {
                const c = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillStyle = i % 5 === 0 ? "#818cf860" : "#5046e530"
                ctx.fillText(c, i * 18, y * 18)
                if (y * 18 > h && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            })
            raf = requestAnimationFrame(draw)
        }
        draw()
        const onResize = () => {
            w = canvas.width = canvas.offsetWidth
            h = canvas.height = canvas.offsetHeight
        }
        window.addEventListener("resize", onResize)
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
    }, [])
    return <canvas ref={canvasRef} className="matrix-canvas w-full h-full" />
}

export function Contact() {
    const tilt = useTilt({ max: 6, perspective: 1400, scale: 1.01 })

    return (
        <section id="contact" className="py-32 min-h-[85vh] flex items-center relative overflow-hidden">
            {/* Matrix rain background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <MatrixRain />
            </div>

            {/* Aurora overlay */}
            <div className="aurora-bg">
                <div className="aurora-1" style={{ opacity: 0.3 }} />
                <div className="aurora-2" style={{ opacity: 0.2 }} />
                <div className="aurora-3" style={{ opacity: 0.15 }} />
            </div>

            {/* Star field */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-white"
                        style={{ left: `${(i * 41) % 100}%`, top: `${(i * 67) % 100}%`, width: `${1 + i % 2}px`, height: `${1 + i % 2}px`, opacity: 0.05 + (i % 5) * 0.04 }} />
                ))}
            </div>

            <div className="container mx-auto max-w-lg relative z-10">
                <motion.div
                    ref={tilt.ref as React.RefObject<HTMLDivElement>}
                    style={tilt.style}
                    onMouseMove={tilt.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
                    onMouseEnter={tilt.onMouseEnter}
                    onMouseLeave={tilt.onMouseLeave}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                    className="glass glow-pulse border border-border rounded-3xl p-10 text-center depth-shadow-lg"
                >
                    {/* Icon */}
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                        style={{ background: "linear-gradient(135deg, #5046e5, #7c3aed, #06b6d4)" }}
                    >
                        <MessageSquare className="h-7 w-7 text-white" />
                    </motion.div>

                    <h2 className="display text-3xl sm:text-4xl mb-3">
                        Let&apos;s <span className="gradient-text">Collaborate</span>
                    </h2>
                    <p className="text-foreground/50 text-sm leading-relaxed mb-6">
                        Whether you need a speaker, enterprise architect, or developer advocate —
                        I&apos;m connecting global teams with transformative ideas.
                    </p>

                    {/* Speaking badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium mb-8"
                        style={{ background: "rgba(80,70,229,0.1)", border: "1px solid rgba(80,70,229,0.2)", color: "var(--primary)" }}>
                        <Mic className="h-4 w-4" />
                        Available for global speaking engagements
                        <Sparkles className="h-4 w-4" />
                    </div>

                    {/* Social buttons */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {socials.map(({ key, label, color, bg, icon }) => {
                            const link = portfolioData.personal.social[key as keyof typeof portfolioData.personal.social]
                            if (!link) return null
                            return (
                                <motion.a
                                    key={key}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -6, scale: 1.08 }}
                                    whileTap={{ scale: 0.96 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-bold shadow-lg"
                                    style={{ color, background: bg }}
                                >
                                    {icon} {label}
                                </motion.a>
                            )
                        })}
                    </div>

                    <p className="text-[10px] text-foreground/25 font-mono mt-8">
                        Global · {portfolioData.personal.location} · Open to opportunities
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
