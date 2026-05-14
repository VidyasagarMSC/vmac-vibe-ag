"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { Briefcase, Sparkles } from "lucide-react"

export function Experience() {
    const experiences = portfolioData.experience

    return (
        <section id="experience" className="section">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <Briefcase className="w-3.5 h-3.5" />
                        Experience
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Career Journey</h2>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

                    <div className="space-y-12">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${
                                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                <div className="flex-1 md:w-1/2" />
                                
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background z-10" />
                                
                                <div className="flex-1 md:w-1/2 pl-12 md:pl-0">
                                    <div className="bento-item hover:border-accent">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <h3 className="font-semibold text-lg">{exp.role}</h3>
                                                <p className="text-accent font-medium">{exp.company}</p>
                                            </div>
                                            <span className="shrink-0 px-3 py-1 rounded-full bg-muted text-xs font-medium">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}