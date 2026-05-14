"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { Sparkles, Award, Globe, Code2, Lightbulb } from "lucide-react"

export function About() {
    const highlights = [
        { icon: Award, title: "18+ Years", desc: "Enterprise Architecture" },
        { icon: Globe, title: "Global Impact", desc: "Multi-region deployments" },
        { icon: Code2, title: "50K+", desc: "Code commits" },
        { icon: Lightbulb, title: "Innovation", desc: "Patented solutions" },
    ]

    const interests = portfolioData.about.interests

    return (
        <section id="about" className="section bg-muted/30">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        About Me
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Crafting Digital Excellence</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bento-item"
                    >
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {portfolioData.about.description}
                        </p>
                    </motion.div>

                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bento-item flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                <item.icon className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bento-item md:col-span-3"
                    >
                        <h4 className="font-semibold mb-4">Interests & Focus Areas</h4>
                        <div className="flex flex-wrap gap-3">
                            {interests.map((interest, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors cursor-default"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}