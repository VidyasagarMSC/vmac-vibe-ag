"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

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
    const containerRef = useRef<HTMLElement>(null)

    return (
        <section id="experience" ref={containerRef} className="py-28 sm:py-36 relative overflow-hidden">
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
                    {/* Single left rail line */}
                    <div
                        className="absolute left-5 top-2 bottom-2 w-px"
                        style={{
                            background: "linear-gradient(to bottom, var(--primary), rgba(var(--accent-rgb),0.3), transparent)",
                        }}
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
                                    className="relative pl-14"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-[14px] top-6 h-3 w-3 rounded-full -translate-x-1/2 z-10 ring-2 ring-background"
                                        style={{ background: s.color, boxShadow: `0 0 10px ${s.color}80` }}
                                        aria-hidden="true"
                                    />

                                    {/* Card */}
                                    <div
                                        className="glass-card card-hover p-6 sm:p-7 relative overflow-hidden group border-l-2"
                                        style={{ borderLeftColor: `${s.color}70` }}
                                    >
                                        {/* Hover glow */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[inherit]"
                                            style={{ background: `radial-gradient(circle at top left, ${s.color}0c 0%, transparent 65%)` }}
                                            aria-hidden="true"
                                        />

                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 relative z-10">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                                    {job.role}
                                                </h3>
                                                <div
                                                    className="text-sm font-semibold font-mono mt-1"
                                                    style={{ color: s.color }}
                                                >
                                                    {job.company}
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-foreground/50 glass-panel px-2.5 py-1.5 rounded-full self-start"
                                                aria-label={`Employment period: ${job.period}`}
                                            >
                                                <Calendar className="h-2.5 w-2.5" aria-hidden="true" />
                                                {job.period}
                                            </div>
                                        </div>

                                        <p className="text-sm text-foreground/65 leading-relaxed relative z-10">
                                            {job.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
