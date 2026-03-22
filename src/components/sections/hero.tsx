"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useEffect, useState, useRef } from "react"
import { ChevronDown, Github, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"

// SSR-safe Three.js import
const HeroScene = dynamic(
    () => import("@/components/canvas/HeroScene").then((m) => ({ default: m.HeroScene })),
    { ssr: false, loading: () => <div className="absolute inset-0" /> }
)

// Typewriter
function Typewriter({ words }: { words: string[] }) {
    const [idx, setIdx] = useState(0)
    const [txt, setTxt] = useState("")
    const [del, setDel] = useState(false)
    useEffect(() => {
        const w = words[idx]
        const t = setTimeout(() => {
            if (!del) {
                if (txt.length < w.length) setTxt(w.slice(0, txt.length + 1))
                else setTimeout(() => setDel(true), 1800)
            } else {
                if (txt.length > 0) setTxt(txt.slice(0, -1))
                else { setDel(false); setIdx((p) => (p + 1) % words.length) }
            }
        }, del ? 38 : 72)
        return () => clearTimeout(t)
    }, [txt, del, idx, words])
    return <><span className="gradient-text">{txt || "\u00A0"}</span><span className="tw-cursor" /></>
}

// Animated counter
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const [val, setVal] = useState(0)
    const done = useRef(false)
    useEffect(() => {
        if (done.current) return; done.current = true
        const dur = 2000; let start: number
        const tick = (ts: number) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(ease * to))
            if (p < 1) requestAnimationFrame(tick)
        }
        const timer = setTimeout(() => requestAnimationFrame(tick), 800)
        return () => clearTimeout(timer)
    }, [to])
    return <>{val}{suffix}</>
}

const STATS = [
    { to: 18, suffix: "+", label: "Years" },
    { to: 87, suffix: "+", label: "Repos" },
    { to: 550, suffix: "K+", label: "Readers" },
    { to: 6, suffix: "", label: "Platforms" },
]

const CREDENTIALS = [
    { text: "🎓 BCS Fellow", x: "8%", y: "22%", delay: 0.9 },
    { text: "🏛 Distinguished Architect", x: "68%", y: "16%", delay: 1.1 },
    { text: "⚡ IBM Executive", x: "74%", y: "62%", delay: 1.3 },
    { text: "🌍 Global Speaker", x: "5%", y: "68%", delay: 1.5 },
    { text: "📝 550K+ Readers", x: "62%", y: "85%", delay: 1.7 },
    { text: "⚛️ Quantum Researcher", x: "14%", y: "86%", delay: 1.9 },
]

export function Hero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 600], [1, 0])
    const y = useTransform(scrollY, [0, 600], [0, 100])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Three.js WebGL canvas — fills full section */}
            <div className="hero-canvas-wrap">
                <HeroScene />
            </div>

            {/* Dark vignette over canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80 z-10 pointer-events-none" />

            {/* Floating credential badges */}
            <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
                {CREDENTIALS.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: c.delay, duration: 0.6, type: "spring", bounce: 0.3 }}
                        style={{ position: "absolute", left: c.x, top: c.y }}
                    >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                        >
                            <div className="glass rounded-full px-3.5 py-1.5 text-[11px] font-mono font-semibold text-foreground/70 border border-white/10 shadow-lg whitespace-nowrap backdrop-blur-xl">
                                {c.text}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <motion.div
                style={{ opacity, y }}
                className="relative z-30 text-center px-4 flex flex-col items-center gap-6 max-w-5xl"
            >
                {/* Status pill */}
                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-white/10 text-xs font-mono text-foreground/70"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="ping-ring" />
                        <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available for Speaking & Consulting
                </motion.div>

                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                >
                    <motion.div
                        whileHover={{ rotateY: 20, rotateX: -12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="perspective-800 preserve-3d"
                        style={{ transformPerspective: 800 }}
                    >
                        <div className="h-24 w-24 rounded-3xl glass border border-white/15 flex items-center justify-center glow-pulse relative shadow-2xl">
                            <span className="text-3xl font-black gradient-text font-heading select-none">VM</span>
                            <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground text-[9px] font-black font-mono px-2.5 py-1 rounded-full shadow-lg">
                                IBM
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Name */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18 }}
                    className="text-xs font-mono tracking-[0.35em] uppercase text-foreground/50"
                >
                    {portfolioData.personal.name}
                </motion.p>

                {/* Big headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.8, type: "spring", bounce: 0.25 }}
                    className="display text-5xl sm:text-7xl md:text-[7rem] text-foreground"
                >
                    I{" "}
                    <Typewriter words={["Architect", "Advocate", "Innovate", "Empower", "Build"]} />
                    <br />
                    <span className="text-foreground/85">Digital</span>{" "}
                    <span className="gradient-text">Excellence</span>
                    <span style={{ color: "var(--primary)" }}>.</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.7 }}
                    className="text-foreground/60 text-base md:text-lg max-w-2xl leading-relaxed"
                >
                    {portfolioData.personal.summary}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="#projects"
                        className="group relative inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-primary px-10 text-sm font-bold text-primary-foreground overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-all duration-300 hover:-translate-y-1.5">
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:bg-[position:right]" />
                        <span className="relative z-10">View Work</span>
                        <span className="relative z-10 text-lg">→</span>
                    </Link>
                    <Link href="#articles"
                        className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl glass border border-white/12 px-10 text-sm font-bold transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:glow-sm">
                        550K+ Reads ↗
                    </Link>
                </motion.div>

                {/* Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.52 }}
                    className="flex items-center gap-5"
                >
                    {[
                        { href: portfolioData.personal.social.github, icon: <Github className="h-4 w-4" />, hover: "hover:text-foreground" },
                        { href: portfolioData.personal.social.linkedin, icon: <Linkedin className="h-4 w-4" />, hover: "hover:text-[#0077b5]" },
                        { href: portfolioData.personal.social.twitter, icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, hover: "hover:text-sky-400" },
                        { href: portfolioData.personal.social.website, icon: <ExternalLink className="h-4 w-4" />, hover: "hover:text-primary" },
                    ].map((s, i) => s.href && (
                        <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`text-foreground/40 ${s.hover} transition-colors`}>
                            {s.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Stat cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="grid grid-cols-4 gap-3 mt-2 w-full max-w-lg"
                >
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="glass border border-white/10 rounded-2xl py-4 text-center depth-shadow cursor-default"
                        >
                            <div className="text-xl md:text-2xl font-black gradient-text font-heading">
                                <Counter to={s.to} suffix={s.suffix} />
                            </div>
                            <div className="text-[9px] text-foreground/40 font-mono mt-0.5 tracking-widest uppercase">{s.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 z-30 pointer-events-none"
            >
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </motion.div>
        </section>
    )
}
