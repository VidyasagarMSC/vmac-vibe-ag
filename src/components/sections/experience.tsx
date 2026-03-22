"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

// Helper to determine brand colors for timeline dots
const getCompany = (name: string) => {
    switch (name.toLowerCase()) {
        case "ibm": return { color: "var(--primary)", bg: "var(--primary-rgb)" }
        case "mahindra satyam": return { color: "#ef4444", bg: "239, 68, 68" }
        case "cdc software": return { color: "#3b82f6", bg: "59, 130, 246" }
        case "indecomm global": return { color: "#10b981", bg: "16, 185, 129" }
        case "dell": return { color: "#0ea5e9", bg: "14, 165, 233" }
        default: return { color: "var(--secondary)", bg: "var(--secondary-rgb)" }
    }
}

export function Experience() {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    const reversedExperience = [...portfolioData.experience].reverse()

    return (
        <section id="experience" ref={containerRef} className="py-24 sm:py-32 relative overflow-hidden">
            {/* Background Typography */}
            <motion.div style={{ y: bgY }}
                className="absolute top-40 left-0 right-0 pointer-events-none select-none opacity-[0.015] whitespace-nowrap z-0 flex justify-center"
                aria-hidden>
                <span className="text-[15vw] font-black font-heading leading-none">JOURNEY</span>
            </motion.div>

            <div className="container mx-auto max-w-5xl relative z-10 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 sm:mb-24 text-center md:text-left"
                >
                    <span className="label justify-center md:justify-start">
                        <Briefcase className="h-3 w-3" /> Professional Journey
                    </span>
                    <h2 className="display text-3xl sm:text-4xl md:text-6xl mt-3">
                        18 years of<br className="hidden md:block" />
                        <span className="gradient-text"> Architecture</span>.
                    </h2>
                </motion.div>

                {/* Vertical Timeline container */}
                <div className="relative border-l border-border/50 md:border-l-0 md:flex md:flex-col md:items-center ml-3 md:ml-0">

                    {/* Desktop Center Line */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border/50 -translate-x-1/2" />
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 origin-top opacity-50" />

                    {reversedExperience.map((job, i) => {
                        const c = getCompany(job.company)
                        const isEven = i % 2 === 0

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`relative pl-8 md:pl-0 pt-8 mt-4 md:mt-0 w-full flex flex-col md:flex-row md:items-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                {/* Center Node (Desktop) */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center z-10 bg-background rounded-full border border-border/50">
                                    <div className="w-3 h-3 rounded-full glow-pulse" style={{ backgroundColor: c.color, boxShadow: `0 0 10px ${c.color}` }} />
                                </div>

                                {/* Side Node (Mobile) */}
                                <div className="md:hidden absolute left-[-5px] top-12 w-2.5 h-2.5 rounded-full z-10" style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }} />

                                {/* Content Card */}
                                <div className={`md:w-[45%] ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                                    <div
                                        className="glass-card p-6 sm:p-8 depth-shadow relative group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                                        style={{ borderTop: `1px solid rgba(${c.bg}, 0.5)` }}
                                    >
                                        {/* Subtle background glow */}
                                        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                                            style={{ background: `radial-gradient(circle at top right, ${c.color}, transparent 70%)` }} />

                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold font-heading text-foreground mb-1 group-hover:text-primary transition-colors">{job.role}</h3>
                                                <div className="flex items-center gap-2 text-sm font-mono" style={{ color: c.color }}>
                                                    <span className="font-semibold">{job.company}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-foreground/40 shrink-0 bg-muted/30 px-2.5 py-1 rounded-full border border-border/50">
                                                <Calendar className="h-3 w-3" />
                                                {job.period}
                                            </div>
                                        </div>

                                        <p className="text-sm text-foreground/60 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
