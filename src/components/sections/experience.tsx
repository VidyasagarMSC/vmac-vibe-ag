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

    return (
        <section id="experience" ref={sectionRef} className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            <div className="container mx-auto max-w-4xl relative z-10 px-4 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                    className="mb-16 sm:mb-20"
                >
                    <span className="label">
                        <Briefcase className="h-3 w-3" aria-hidden="true" /> Professional Journey
                    </span>
                    <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 tracking-tighter">
                        18 years of<br />
                        <span className="gradient-text">Architecture</span>.
                    </h2>
                </motion.div>

                {/* Left-rail Timeline */}
                <div className="relative">
                    {/* Base rail */}
                    <div
                        className="absolute left-5 top-2 bottom-2 w-[2px] bg-border/30 rounded-full"
                        aria-hidden="true"
                    />
                    {/* Progress rail */}
                    <motion.div
                        className="absolute left-5 top-2 bottom-2 w-[2px] bg-primary origin-top rounded-full"
                        style={{ scaleY }}
                        aria-hidden="true"
                    />

                    <div className="space-y-6">
                        {portfolioData.experience.map((job, i) => {
                            const s = getStyle(job.company)
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.2, 0, 0, 1] }}
                                    className="relative pl-14 sm:pl-0"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 sm:left-1/2 top-0 w-8 h-8 rounded-full bg-card border-[3px] border-primary z-10 flex items-center justify-center shadow-sm sm:-translate-x-1/2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>

                                    <SpotlightCard
                                        className="p-6 sm:p-7 relative overflow-hidden group border-l-2"
                                        containerClassName="card-hover"
                                        style={{ borderLeftColor: `var(--border)` }}
                                    >
                                        <div className="flex flex-wrap flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 relative z-10">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                                    {job.role}
                                                </h3>
                                                <p className="text-sm font-medium text-muted-foreground mt-0.5">{job.company}</p>
                                            </div>
                                            <div
                                                className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium w-fit"
                                                aria-label={`Employment period: ${job.period}`}
                                            >
                                                <Calendar className="h-2.5 w-2.5" aria-hidden="true" />
                                                {job.period}
                                            </div>
                                        </div>

                                        <p className="text-sm text-foreground/80 leading-relaxed relative z-10">
                                            {job.description}
                                        </p>
                                    </SpotlightCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
