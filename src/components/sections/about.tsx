"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { ArrowRight, MapPin, Zap, Code2, Globe, BookOpen } from "lucide-react"

const BIG_STATS = [
    { value: "18+",   label: "Years of impact",    sub: "Enterprise to startup",  icon: Zap,      color: "var(--primary)" },
    { value: "550K+", label: "Minds reached",       sub: "Across 6 platforms",     icon: Globe,    color: "#818cf8" },
    { value: "88+",   label: "Open source repos",   sub: "GitHub contributions",   icon: Code2,    color: "#38bdf8" },
    { value: "BCS",   label: "Fellow (FBCS)",        sub: "Chartered IT Institute", icon: BookOpen, color: "#f59e0b" },
]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
})

const staggerChild = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
})

export function About() {
    return (
        <section id="about" className="py-28 sm:py-36 relative overflow-hidden">
            {/* Subtle background accent */}
            <div
                className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none -z-10 opacity-40 dark:opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.07) 0%, transparent 65%)",
                    filter: "blur(80px)",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

                    {/* Left — bio */}
                    <div>
                        <motion.div {...fadeUp(0)} className="mb-5">
                            <span className="label"><Zap className="h-3 w-3" aria-hidden="true" /> The Story</span>
                        </motion.div>

                        <motion.h2
                            {...fadeUp(0.06)}
                            className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tighter"
                        >
                            The mind<br />
                            <span className="gradient-text">behind the code</span>.
                        </motion.h2>

                        <div className="space-y-5 text-foreground/65 leading-[1.8] text-sm sm:text-base">
                            {[
                                "I'm an Executive IT Architect, Senior Product Manager & Developer Advocate at IBM — a role I've held since 2015, building on experience at Mahindra Satyam, CDC Software, Indecomm, and Dell.",
                                "I specialize in AI, Quantum Computing, Cloud Architecture, and Developer Experience — translating theoretical complexity into real-world business value, then writing about it for 550K+ readers worldwide.",
                                "In 2024 I was elected a BCS Fellow (FBCS) and certified as Distinguished Architect by The Open Group — two of the field's highest independent recognitions.",
                            ].map((para, i) => (
                                <motion.p key={i} {...staggerChild(i)} className="leading-[1.8]">
                                    {para}
                                </motion.p>
                            ))}
                        </div>

                        {/* Interest chips */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-2 mt-8"
                        >
                            {portfolioData.about.interests.map((interest, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, type: "spring", bounce: 0.35 }}
                                    className="skill-chip"
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — identity card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.16 }}
                    >
                        <div className="glass-card card-accent-top gradient-border p-7 sm:p-9 depth-shadow-lg">
                            {/* Identity header */}
                            <div className="flex items-center gap-4 pb-6 border-b border-border mb-7">
                                <div
                                    className="h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl text-white flex-shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                        boxShadow: "0 6px 20px rgba(var(--primary-rgb), 0.35)",
                                    }}
                                    aria-label="VM initials"
                                >
                                    VM
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-foreground truncate">{portfolioData.personal.name}</p>
                                    <p className="text-xs text-foreground/55 mt-0.5 truncate leading-snug">{portfolioData.personal.role}</p>
                                    <div className="flex items-center gap-1 mt-1.5 text-xs text-foreground/40">
                                        <MapPin className="h-2.5 w-2.5 flex-shrink-0" aria-hidden="true" />
                                        <span>Global · IBM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key stats — horizontal row */}
                            <div className="grid grid-cols-2 gap-3 mb-7">
                                {BIG_STATS.map((s, i) => {
                                    const Icon = s.icon
                                    return (
                                        <div
                                            key={i}
                                            className="rounded-xl p-4 border border-border hover:border-primary/20 transition-colors cursor-default"
                                            style={{ background: "rgba(var(--primary-rgb), 0.03)" }}
                                        >
                                            <div
                                                className="h-6 w-6 rounded-lg flex items-center justify-center mb-2.5"
                                                style={{ background: `${s.color}14` }}
                                                aria-hidden="true"
                                            >
                                                <Icon className="h-3 w-3" style={{ color: s.color }} />
                                            </div>
                                            <div className="text-2xl font-black gradient-text">{s.value}</div>
                                            <div className="text-xs font-semibold text-foreground mt-0.5">{s.label}</div>
                                            <div className="text-[10px] text-foreground/40 font-mono mt-0.5">{s.sub}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Status bar */}
                            <div className="flex items-center gap-3 pt-5 border-t border-border">
                                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-bold text-foreground">Currently building at IBM</p>
                                    <p className="text-[10px] text-foreground/40 mt-0.5">Open to speaking engagements worldwide</p>
                                </div>
                                <a
                                    href="#contact"
                                    className="ml-auto flex items-center gap-1 text-xs font-bold text-primary hover:underline whitespace-nowrap flex-shrink-0"
                                    aria-label="Jump to contact section"
                                >
                                    Contact <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
