"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { ArrowRight, MapPin, Zap, Code2, Globe, BookOpen } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Magnetic } from "@/components/ui/Magnetic"

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
        <section id="about" className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            {/* Subtle background accent */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10 opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-10 xl:gap-20 items-stretch">

                    {/* Left 7/12 — Narrative & Mastery */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div {...fadeUp(0)} className="mb-4">
                            <span className="label font-bold uppercase tracking-widest text-[10px]"><Zap className="h-2.5 w-2.5" aria-hidden="true" /> The Mission</span>
                        </motion.div>

                        <motion.h2
                            {...fadeUp(0.06)}
                            className="display text-5xl md:text-6xl xl:text-8xl mb-10 tracking-tighter leading-[0.9]"
                        >
                            Bridging <span className="text-muted-foreground/40">binary</span><br />
                            with <span className="gradient-text">business value</span>.
                        </motion.h2>

                        <div className="space-y-6 text-foreground/75 leading-relaxed text-sm sm:text-lg max-w-2xl">
                            <motion.p {...staggerChild(0)}>
                                As an <span className="text-foreground font-bold">Executive IT Architect & Sr Software Development Manager at IBM</span>, I operate at the intersection of deep technical engineering and strategic leadership. Since 2007, I've specialized in transforming complex theoretical landscapes—from AI to Quantum Computing—into scalable, enterprise-grade solutions.
                            </motion.p>
                            <motion.p {...staggerChild(1)}>
                                I don't just architect systems; I architect ecosystems. My work involves onboarding the world's most complex workloads for Top 1% clients, ensuring that technology serves as a catalyst for multi-billion dollar digital transformations.
                            </motion.p>
                            <motion.p {...staggerChild(2)} className="text-muted-foreground font-medium">
                                Elected Fellow of the British Computer Society (FBCS) and Distinguished Architect, I am committed to mentorship, global standards, and the relentless pursuit of technical excellence.
                            </motion.p>
                        </div>

                        {/* Domain Chips */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-2 mt-10"
                        >
                            {portfolioData.about.interests.map((interest, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-secondary/30 text-[11px] font-bold text-secondary-foreground border border-border/50"
                                >
                                    {interest}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right 5/12 — Executive Persona Card */}
                    <motion.div
                        className="lg:col-span-5 flex"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.1 }}
                    >
                        <SpotlightCard className="p-8 sm:p-10 flex flex-col h-full w-full bg-card/40 backdrop-blur-xl border-border/50">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-primary/20">
                                    VM
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-xl tracking-tight leading-tight">{portfolioData.personal.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">{portfolioData.personal.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 flex-grow">
                                {BIG_STATS.map((s, i) => {
                                    const Icon = s.icon
                                    return (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/40 group hover:border-primary/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                                    <Icon className="h-5 w-5" style={{ color: s.color }} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                                    <p className="text-lg font-black leading-tight mt-0.5">{s.value}</p>
                                                </div>
                                            </div>
                                            <div className="text-[9px] font-mono text-muted-foreground pr-2 hidden sm:block">
                                                {s.sub}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-10 pt-8 border-t border-border/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <p className="text-[11px] font-bold text-foreground">Active at IBM Global</p>
                                </div>
                                <div className="flex gap-4">
                                    {Object.entries(portfolioData.personal.social).slice(0, 3).map(([key, url]) => (
                                        <a key={key} href={url as string} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Globe className="h-4 w-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
