
"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"

export function Experience() {
    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-primary text-sm">git log --graph --oneline</span>
                    </div>
                    <h2 className="text-3xl font-bold font-heading">Career History</h2>
                </motion.div>

                <div className="relative border-l-2 border-border/60 ml-3 md:ml-0 space-y-12">
                    {portfolioData.experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Node */}
                            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-foreground" />

                            <div className="grid gap-2">
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className="font-mono text-muted-foreground">{job.period}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium font-mono border border-primary/20">
                                        {index === 0 ? 'HEAD' : `v1.${portfolioData.experience.length - index}`}
                                    </span>
                                </div>

                                <div className="bg-secondary/20 p-5 md:p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                                    <h3 className="text-xl font-bold text-foreground font-heading">{job.role}</h3>
                                    <h4 className="text-base font-medium text-foreground/80 mb-3 flex items-center gap-2">
                                        @ {job.company}
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed font-sans">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="relative pl-8 md:pl-12 pt-4">
                        <div className="absolute -left-[6px] top-4 h-3 w-3 rounded-full bg-border" />
                        <span className="font-mono text-sm text-muted-foreground">Initial Commit</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
