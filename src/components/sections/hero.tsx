"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useEffect, useState } from "react"
import { Github, Linkedin, ExternalLink, Sparkles, ArrowUpRight, FileCode2, Cloud, Cpu } from "lucide-react"
import Link from "next/link"
import { Magnetic } from "@/components/ui/Magnetic"

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
                    setTimeout(() => setDeleting(true), 2000)
                }
            } else {
                if (txt.length > 0) {
                    setTxt(txt.slice(0, -1))
                } else {
                    setDeleting(false)
                    setIdx((p) => (p + 1) % words.length)
                }
            }
        }, deleting ? 30 : 60)
        return () => clearTimeout(timer)
    }, [txt, deleting, idx, words])

    return (
        <>
            <span className="gradient-text">{txt || "\u00A0"}</span>
            <span className="animate-pulse text-accent">|</span>
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
            className="text-3xl font-bold gradient-text"
        >
            {val}{suffix}
        </span>
    )
}

export function Hero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 500], [1, 0])
    const y = useTransform(scrollY, [0, 500], [0, 100])

    const stats = [
        { to: 18, suffix: "+", label: "Years", icon: Cpu },
        { to: portfolioData.stats.githubRepos, suffix: "", label: "Repos", icon: FileCode2 },
        { to: 550, suffix: "K+", label: "Readers", icon: Cloud },
    ]

    const credentials = [
        { icon: "🏆", text: "BCS Fellow (FBCS)" },
        { icon: "🏛", text: "Distinguished Architect" },
        { icon: "⚡", text: "IBM Executive" },
    ]

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden dot-pattern">
            <div className="hidden lg:block absolute inset-0 opacity-[0.03]">
                <HeroScene />
            </div>

            <motion.div
                style={{ opacity, y }}
                className="relative z-10 w-full"
            >
                <div className="container-main">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-20 lg:py-32">

                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <span className="label">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Available for Architecture & Consulting
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <h1 className="display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                                    Building
                                    <br />
                                    <Typewriter words={["Enterprise", "Cloud", "AI", "Scale"]} />
                                    <br />
                                    <span className="text-foreground/60">Solutions</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                            >
                                {portfolioData.personal.summary}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <Link href="#projects" className="btn-accent glow">
                                    View Projects <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <Link href="#experience" className="btn-outline">
                                    Experience
                                </Link>

                                <div className="flex items-center gap-3 pl-4 border-l border-border">
                                    {[
                                        { href: portfolioData.personal.social.github, icon: Github, label: "GitHub" },
                                        { href: portfolioData.personal.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                                        { href: portfolioData.personal.social.website, icon: ExternalLink, label: "Website" },
                                    ].map((item, i) => (
                                        item.href && (
                                            <a
                                                key={i}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                            >
                                                <item.icon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                            </a>
                                        )
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="glass-card p-6 lg:p-8"
                            >
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        VM
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{portfolioData.personal.name}</h3>
                                        <p className="text-sm text-muted-foreground">{portfolioData.personal.role}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="text-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <stat.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                                            <Counter to={stat.to} suffix={stat.suffix} />
                                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    {credentials.map((cred, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + i * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                                        >
                                            <span className="text-xl">{cred.icon}</span>
                                            <span className="text-sm font-medium">{cred.text}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="flex items-center gap-2 mt-6 pt-6 border-t border-border/50"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                    </span>
                                    <span className="text-sm font-medium text-muted-foreground">Building at IBM</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                >
                    <motion.div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
                </motion.div>
            </motion.div>
        </section>
    )
}