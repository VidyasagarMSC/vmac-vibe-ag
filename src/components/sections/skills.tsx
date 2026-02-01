
"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Cpu, Database, Layout, Server, Award } from "lucide-react"

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-background border-t border-border/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold font-heading mb-2">Technical Stack</h2>
                    <p className="text-muted-foreground font-mono text-sm">dependencies.json</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Skills Column */}
                    <div className="space-y-10">
                        {portfolioData.skills.map((category, index) => (
                            <div key={index}>
                                <h4 className="flex items-center gap-2 text-base font-bold font-mono text-foreground uppercase tracking-wider mb-4">
                                    {index === 0 && <Layout className="h-4 w-4 text-primary" />}
                                    {index === 1 && <Cpu className="h-4 w-4 text-primary" />}
                                    {index === 2 && <Database className="h-4 w-4 text-primary" />}
                                    {index === 3 && <Server className="h-4 w-4 text-primary" />}
                                    {category.category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-secondary/30 border border-border rounded-sm text-sm font-medium text-foreground hover:border-primary/50 hover:bg-secondary/50 transition-colors font-mono"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Awards Column */}
                    <div className="bg-secondary/10 border border-border/60 rounded-xl p-6 md:p-8 h-fit">
                        <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Recognition
                        </h3>
                        <div className="space-y-5">
                            {portfolioData.awards.map((award, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="mt-2 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                                    <div>
                                        <span className="font-medium text-foreground block group-hover:text-primary transition-colors">{award.title}</span>
                                        <span className="text-xs text-muted-foreground">{award.issuer} • {award.year}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
