"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"
import { portfolioData } from "@/data/portfolio"
import { SpotlightCard } from "@/components/ui/SpotlightCard"

const COMPANY_STYLES: Record<string, { color: string }> = {
    "ibm":              { color: "#6366f1" },
    "dell":             { color: "#0076ce" },
    "indecomm global":  { color: "#10b981" },
    "cdc software":     { color: "#818cf8" },
    "mahindra satyam":  { color: "#f59e0b" },
}
const getStyle = (name: string) =>
    COMPANY_STYLES[name.toLowerCase()] ?? { color: "var(--primary)" }

export function Experience() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    // Splitting data for UX balance
    const ibmExperience = portfolioData.experience.filter(j => j.company === "IBM")
    const legacyExperience = portfolioData.experience.filter(j => j.company !== "IBM")

    return (
        <section id="experience" ref={sectionRef} className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            <div className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                    className="mb-16 sm:mb-20"
                >
                    <span className="label font-bold uppercase tracking-widest text-[10px]">
                        <Briefcase className="h-3 w-3" aria-hidden="true" /> Career Roadmap
                    </span>
                    <h2 className="display text-5xl sm:text-7xl md:text-8xl mt-4 tracking-tighter leading-[0.85]">
                        18 years of<br />
                        <span className="gradient-text">Architectural Evolution</span>.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">
                    
                    {/* Left 8/12 — The Detailed IBM Era (The Core) */}
                    <div className="lg:col-span-8 relative">
                        <div className="flex items-center gap-3 mb-10">
                            <h3 className="text-xl font-black tracking-tight">The Executive Era <span className="text-primary/40">at IBM</span></h3>
                            <div className="h-px flex-1 bg-border/40" />
                        </div>

                        {/* Timeline Rail */}
                        <div className="absolute left-4 top-24 bottom-10 w-[1px] bg-border/40" aria-hidden="true" />
                        
                        <div className="space-y-12">
                            {ibmExperience.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="relative pl-12"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-background border border-primary/30 flex items-center justify-center -translate-x-1/2 shadow-xl shadow-primary/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    </div>

                                    <div className="group">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                                            <h4 className="text-lg font-bold group-hover:text-primary transition-colors tracking-tight leading-tight">
                                                {job.role}
                                            </h4>
                                            <span className="text-[10px] font-mono font-black text-muted-foreground uppercase shrink-0">
                                                {job.period}
                                            </span>
                                        </div>
                                        <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl">
                                            {job.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right 4/12 — The Growth Era (Compact) */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <h3 className="text-xl font-black tracking-tight">Growth Era <span className="text-muted-foreground/40">07-15</span></h3>
                            <div className="h-px flex-1 bg-border/40" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {legacyExperience.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <SpotlightCard className="p-5 bg-muted/30 border-border/40 hover:bg-muted/50 transition-colors">
                                        <div className="mb-3">
                                            <h4 className="text-[13px] font-bold tracking-tight leading-tight mb-1">{job.role}</h4>
                                            <p className="text-[10px] font-mono font-black text-primary uppercase">{job.company}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/20">
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{job.period}</span>
                                            <div className="h-1.5 w-1.5 rounded-full bg-border" />
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>

                        {/* Early Career Note */}
                        <div className="mt-auto pt-10 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-border/50">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[11px] font-bold text-muted-foreground">Journey established in Bangalore, India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
