"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { Wrench, Sparkles } from "lucide-react"

export function Skills() {
    const skills = portfolioData.skills

    return (
        <section className="section bg-muted/30">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <Wrench className="w-3.5 h-3.5" />
                        Skills
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Technologies</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((category, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bento-item"
                        >
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((skill, j) => (
                                    <span
                                        key={j}
                                        className="px-3 py-1.5 rounded-lg bg-muted/50 text-sm hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}