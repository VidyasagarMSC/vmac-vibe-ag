"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Cpu, Database, Layout, Server, Award, Trophy, Star, Sparkles, Zap } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { cn } from "@/lib/utils"

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
        <section id="skills" className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            {/* Background accent removed for solid flat UI */}

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

                {/* Modern Bento Grid: High-density layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-fr">

                    {/* Languages Panel - 4 cols */}
                    <motion.div
                        className="lg:col-span-4 h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <SkillCard category={portfolioData.skills[0]} cfg={CAT_CONFIG[0]} />
                    </motion.div>

                    {/* Frameworks Panel - 4 cols */}
                    <motion.div
                        className="lg:col-span-4 h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <SkillCard category={portfolioData.skills[2]} cfg={CAT_CONFIG[2]} />
                    </motion.div>

                    {/* Cloud & AI Panel - 4 cols */}
                    <motion.div
                        className="lg:col-span-4 h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <SkillCard category={portfolioData.skills[1]} cfg={CAT_CONFIG[1]} />
                    </motion.div>

                    {/* Architecture Panel - 6 cols (Wide) */}
                    <motion.div
                        className="lg:col-span-6 h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <SkillCard category={portfolioData.skills[3]} cfg={CAT_CONFIG[3]} isHorizontal />
                    </motion.div>

                    {/* Awards panel - 6 cols (Wide) */}
                    <motion.div
                        className="lg:col-span-6 h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <SpotlightCard className="p-7 h-full flex flex-col">
                            <h3 className="font-bold text-base mb-6 flex items-center gap-2">
                                <Award className="h-4 w-4 text-amber-400" aria-hidden="true" /> Global Recognition
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                                {/* Featured Top Award */}
                                <div className="p-5 rounded-2xl bg-muted border border-border flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Trophy className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="text-sm font-bold leading-tight mb-1">{portfolioData.awards[0].title}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{portfolioData.awards[0].year}</p>
                                </div>

                                {/* Scrolling/List Recognition */}
                                <div className="space-y-4 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                                    {portfolioData.awards.slice(1, 5).map((award, i) => {
                                        const cfg = getAward(award.title)
                                        const AIcon = cfg.icon
                                        return (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
                                                    <AIcon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold truncate">{award.title}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">{award.issuer}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function SkillCard({ category, cfg, isHorizontal = false }: { category: any, cfg: any, isHorizontal?: boolean }) {
    const Icon = cfg.icon
    return (
        <SpotlightCard className="p-7 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl" style={{ background: cfg.bg }} aria-hidden="true">
                    <Icon className="h-4 w-4" style={{ color: cfg.color }} />
                </div>
                <h3 className="text-xs font-black font-mono uppercase tracking-[0.2em]" style={{ color: cfg.color }}>
                    {category.category}
                </h3>
            </div>
            <div className={cn(
                "flex flex-wrap gap-2.5",
                isHorizontal ? "grid grid-cols-2 sm:grid-cols-3 gap-3" : ""
            )}>
                {category.items.map((skill: string, si: number) => (
                    <motion.span
                        key={si}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: si * 0.03 }}
                        className={cn(
                            "badge px-3 py-1.5 text-[11px] font-semibold",
                            isHorizontal ? "w-full justify-center" : ""
                        )}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </SpotlightCard>
    )
}
