"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useEffect, useState } from "react"
import { ChevronDown, Github, Linkedin, ExternalLink, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Magnetic } from "@/components/ui/Magnetic"
import { SpotlightCard } from "@/components/ui/SpotlightCard"

const HeroScene = dynamic(
    () => import("@/components/canvas/HeroScene").then((m) => ({ default: m.HeroScene })),
    { ssr: false, loading: () => <div className="absolute inset-0" /> }
)

function Typewriter({ words }: { words: string[] }) {
    const [idx, setIdx] = useState(0)
    const [txt, setTxt] = useState("")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const word = words[idx]
        const timer = setTimeout(() => {
            if (!deleting) {
                if (txt.length < word.length) {
                    setTxt(word.slice(0, txt.length + 1))
                } else {
                    setTimeout(() => setDeleting(true), 2200)
                }
            } else {
                if (txt.length > 0) {
                    setTxt(txt.slice(0, -1))
                } else {
                    setDeleting(false)
                    setIdx((p) => (p + 1) % words.length)
                }
            }
        }, deleting ? 38 : 78)
        return () => clearTimeout(timer)
    }, [txt, deleting, idx, words])

    return (
        <>
            <span className="text-primary">{txt || "\u00A0"}</span>
            <span className="tw-cursor" />
        </>
    )
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const [val, setVal] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (!started) return
        const dur = 2000
        let start: number
        const tick = (ts: number) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(ease * to))
            if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [started, to])

    return (
        <span
            ref={(el) => {
                if (!el || started) return
                const obs = new IntersectionObserver(([e]) => {
                    if (e.isIntersecting) { setStarted(true); obs.disconnect() }
                }, { threshold: 0.5 })
                obs.observe(el)
            }}
        >
            {val}{suffix}
        </span>
    )
}

const STATS = [
    { to: 18, suffix: "+", label: "Years", sub: "of impact" },
    { to: portfolioData.stats.githubRepos, suffix: "+", label: "Repos", sub: "open source" },
    { to: portfolioData.stats.readers, suffix: "K+", label: "Readers", sub: "worldwide" },
    { to: 6, suffix: "", label: "Platforms", sub: "publishing on" },
]

const CREDENTIALS = [
    { emoji: "🎓", text: "BCS Fellow (FBCS)" },
    { emoji: "🏛", text: "Distinguished Architect" },
    { emoji: "⚡", text: "IBM Executive" },
    { emoji: "🌍", text: "Global Speaker" },
]

export function Hero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 400], [1, 0])
    const y = useTransform(scrollY, [0, 400], [0, 60])

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background canvas */}
            {/* Background canvas constrained to right half behind stat card */}
            <div className="hero-canvas-wrap hidden lg:block opacity-60 dark:opacity-80 absolute top-0 right-0 w-1/2 h-full z-0 clip-path-right" aria-hidden="true">
                <HeroScene />
            </div>

            {/* Main content */}
            <motion.div
                style={{ opacity, y }}
                className="relative z-30 w-full"
            >
                <div className="container mx-auto max-w-6xl px-6 py-24 pt-36">
                    <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

                        {/* ── Left column — text ── */}
                        <div className="flex flex-col gap-7">

                            {/* Status */}
                            <motion.div
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full card border text-xs font-mono text-foreground/60 shadow-sm"
                                style={{ borderColor: "rgba(var(--primary-rgb), 0.2)" }}
                            >
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="ping-ring bg-emerald-500" />
                                    <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Available for Architecture &amp; Consulting
                                <Sparkles className="h-3 w-3 text-emerald-500" />
                            </motion.div>

                            {/* Name monogram */}
                             <motion.div
                                 initial={{ opacity: 0, scale: 0.95 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0, 0, 1] }}
                                 className="flex items-center gap-3"
                             >
                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center font-black text-sm text-primary-foreground shadow-sm">
                                    VM
                                </div>
                                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                    {portfolioData.personal.name}
                                </span>
                            </motion.div>

                            {/* Giant headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.75, type: "spring", bounce: 0 }}
                                className="display text-4xl sm:text-5xl md:text-7xl lg:text-[76px] text-foreground leading-[1.05] tracking-tight"
                            >
                                I{" "}
                                <Typewriter words={["Architect", "Advocate", "Innovate", "Empower", "Build"]} />
                                <br />
                                <span className="text-foreground">Digital</span>{" "}
                                <span className="text-foreground">Excellence</span><span className="text-primary">.</span>
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.6 }}
                                className="text-muted-foreground font-medium text-base md:text-lg max-w-lg leading-relaxed"
                            >
                                {portfolioData.personal.summary}
                            </motion.p>

                            {/* CTAs + Socials */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.44 }}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-1"
                            >
                                <div className="flex gap-4">
                                    <Magnetic strength={0.2}>
                                        <Link href="#projects" className="btn-primary">
                                            View Work <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Magnetic>
                                    <Magnetic strength={0.2}>
                                        <Link href="#articles" className="btn-outline">
                                            550K+ Reads
                                        </Link>
                                    </Magnetic>
                                </div>

                                <div className="flex items-center gap-5 sm:border-l sm:border-border sm:pl-6">
                                    {[
                                        {
                                            href: portfolioData.personal.social.github,
                                            icon: <Github className="h-4 w-4" />,
                                            label: "GitHub profile",
                                            cls: "hover:text-foreground",
                                        },
                                        {
                                            href: portfolioData.personal.social.linkedin,
                                            icon: <Linkedin className="h-4 w-4" />,
                                            label: "LinkedIn profile",
                                            cls: "hover:text-[#0077b5]",
                                        },
                                        {
                                            href: portfolioData.personal.social.twitter,
                                            icon: (
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            ),
                                            label: "Twitter / X profile",
                                            cls: "hover:text-sky-400",
                                        },
                                        {
                                            href: portfolioData.personal.social.website,
                                            icon: <ExternalLink className="h-4 w-4" />,
                                            label: "Personal website",
                                            cls: "hover:text-primary",
                                        },
                                    ].map(
                                        (s, i) =>
                                            s.href && (
                                                <Magnetic key={i} strength={0.3}>
                                                    <motion.a
                                                        href={s.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={s.label}
                                                        className={`text-muted-foreground transition-colors p-2 rounded-md hover:bg-muted ${s.cls}`}
                                                    >
                                                        {s.icon}
                                                    </motion.a>
                                                </Magnetic>
                                            )
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right column — stat card ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.7, type: "spring", bounce: 0.18 }}
                            className="hidden lg:block"
                        >
                            <SpotlightCard className="p-8">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                                    <Magnetic strength={0.15}>
                                        <div className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-lg bg-primary text-primary-foreground shadow-sm">
                                            VM
                                        </div>
                                    </Magnetic>
                                    <div>
                                        <p className="font-bold text-foreground text-sm">{portfolioData.personal.name}</p>
                                        <p className="text-xs text-muted-foreground font-medium mt-0.5 leading-tight">{portfolioData.personal.role}</p>
                                    </div>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {STATS.map((s, i) => (
                                        <div key={i} className="text-center p-4 rounded-xl bg-muted transition-colors cursor-default">
                                            <div className="text-2xl font-black text-primary font-heading">
                                                <Counter to={s.to} suffix={s.suffix} />
                                            </div>
                                            <div className="text-xs font-bold text-foreground mt-1">{s.label}</div>
                                            <div className="text-[10px] text-muted-foreground font-mono font-medium mt-0.5">{s.sub}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Credentials */}
                                <div className="space-y-2.5 pt-2">
                                    {CREDENTIALS.map((c, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + i * 0.08 }}
                                            className="flex items-center gap-3 group"
                                        >
                                            <span className="text-base leading-none">{c.emoji}</span>
                                            <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                                                {c.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Status pulse */}
                                <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-border">
                                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    <span className="text-xs font-bold text-muted-foreground">Currently building at IBM</span>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                style={{ opacity }}
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-foreground/25 z-30 pointer-events-none"
                aria-hidden="true"
            >
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </motion.div>
        </section>
    )
}
