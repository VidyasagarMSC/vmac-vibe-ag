"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Cpu, Database, Layout, Server, Award, Trophy, Star, Sparkles, Zap } from "lucide-react"

const CAT_CONFIG = [
    { icon: Layout,   color: "#818cf8", bg: "rgba(129,140,248,0.08)", name: "Languages"         },
    { icon: Cpu,      color: "#a78bfa", bg: "rgba(167,139,250,0.08)", name: "Cloud & AI"        },
    { icon: Database, color: "#38bdf8", bg: "rgba(56,189,248,0.08)",  name: "Frameworks"        },
    { icon: Server,   color: "#6366f1", bg: "rgba(99,102,241,0.08)",  name: "Architecture"      },
]

const AWARD_CFG: Record<string, { icon: typeof Trophy; color: string }> = {
    "BCS":          { icon: Trophy,   color: "#f59e0b" },
    "Distinguished":{ icon: Star,     color: "#6366f1" },
    "Quantum":      { icon: Zap,      color: "#818cf8" },
    "Most Admired": { icon: Award,    color: "#a78bfa" },
    "Globee":       { icon: Award,    color: "#f97316" },
    "Marquis":      { icon: Star,     color: "#64748b" },
    "IBM":          { icon: Trophy,   color: "#6366f1" },
    "DZone":        { icon: Sparkles, color: "#c42127" },
    "Microsoft":    { icon: Star,     color: "#38bdf8" },
    "Intel":        { icon: Zap,      color: "#0076cc" },
}
const getAward = (title: string) => {
    const key = Object.keys(AWARD_CFG).find((k) => title.includes(k))
    return key ? AWARD_CFG[key] : { icon: Award, color: "#6b7280" }
}

export function Skills() {
    return (
        <section id="skills" className="py-28 sm:py-36 relative overflow-hidden">
            {/* Background accent */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-30 dark:opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(var(--primary-rgb),0.08) 0%, transparent 70%)",
                    filter: "blur(70px)",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                    className="mb-10 sm:mb-14"
                >
                    <span className="label"><Cpu className="h-3 w-3" aria-hidden="true" /> Stack</span>
                    <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 tracking-tighter">
                        Tools of the<br />
                        <span className="gradient-text">trade</span>.
                    </h2>
                </motion.div>

                {/* 4-panel bento: 3 skill categories + 1 awards */}
                <div className="grid lg:grid-cols-[1fr_1fr_1fr_340px] gap-5">

                    {/* Skill category panels */}
                    {portfolioData.skills.map((cat, ci) => {
                        const cfg = CAT_CONFIG[ci] ?? CAT_CONFIG[0]
                        const Icon = cfg.icon
                        return (
                            <motion.div
                                key={ci}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: ci * 0.07, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                                className="glass-card card-accent-top p-6"
                            >
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div
                                        className="p-1.5 rounded-lg"
                                        style={{ background: cfg.bg }}
                                        aria-hidden="true"
                                    >
                                        <Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                                    </div>
                                    <span
                                        className="text-[10px] font-black font-mono uppercase tracking-widest"
                                        style={{ color: cfg.color }}
                                    >
                                        {cat.category}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((skill, si) => (
                                        <motion.span
                                            key={si}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: si * 0.04 + ci * 0.05, type: "spring", bounce: 0.3 }}
                                            className="skill-chip"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Awards panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 28 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.16, delay: 0.2 }}
                        className="glass-card card-accent-top p-6"
                    >
                        <h3 className="font-bold text-base mb-5 flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" aria-hidden="true" /> Recognition
                        </h3>

                        {/* Top 2 awards */}
                        <div className="grid grid-cols-2 gap-2.5 mb-5 pb-5 border-b border-border">
                            {portfolioData.awards.slice(0, 2).map((a, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-3.5 text-center cursor-default card-hover border border-border"
                                    style={{ background: "rgba(var(--primary-rgb), 0.04)" }}
                                >
                                    <Trophy className="h-5 w-5 text-amber-400 mx-auto mb-2" aria-hidden="true" />
                                    <p className="text-[10px] font-bold text-foreground leading-tight">{a.title}</p>
                                    <p className="text-[9px] text-foreground/40 font-mono mt-1">{a.year}</p>
                                </div>
                            ))}
                        </div>

                        {/* Remaining awards */}
                        <div className="space-y-3">
                            {portfolioData.awards.slice(2).map((award, i) => {
                                const cfg = getAward(award.title)
                                const AIcon = cfg.icon
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                        className="flex items-center gap-3 group cursor-default"
                                    >
                                        <div
                                            className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ background: `${cfg.color}12` }}
                                            aria-hidden="true"
                                        >
                                            <AIcon className="h-3 w-3" style={{ color: cfg.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate leading-snug">
                                                {award.title}
                                            </p>
                                            <p className="text-[9px] text-foreground/40 font-mono truncate">
                                                {award.issuer} · {award.year}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
