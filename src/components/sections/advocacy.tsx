"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Mic2, Users, Globe2, Award, ArrowUpRight, Sparkles } from "lucide-react"

const SPEAKING_STATS = [
    { label: "Global Stages", value: "20+", icon: Globe2 },
    { label: "Minds Reached", value: "550K+", icon: Users },
    { label: "Keynotes", value: "15+", icon: Mic2 },
]

export function Advocacy() {
    return (
        <section id="advocacy" className="section bg-muted/30">
            <div className="container-main">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="label mb-4">
                                <Mic2 className="w-3.5 h-3.5" />
                                Speaking & Advocacy
                            </span>
                            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-6">
                                Thought Leadership
                                <br />
                                <span className="gradient-text">On A Global Scale</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-xl mb-10">
                                From keynote stages at IBM Think to mentoring the next generation of engineers, 
                                I bridge the gap between technical complexity and community enablement.
                            </p>

                            <div className="grid grid-cols-3 gap-6">
                                {SPEAKING_STATS.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-card border border-border"
                                    >
                                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                                        <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6"
                        >
                            <h3 className="font-semibold text-lg mb-6">Recent Speaking</h3>

                            <div className="space-y-4">
                                {portfolioData.speaking.map((talk, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium">{talk.event}</h4>
                                            <span className="text-xs text-muted-foreground">{talk.year}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{talk.topic}</p>
                                        <span className="text-xs font-medium text-accent">{talk.role}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="#contact"
                                className="btn-primary w-full mt-6"
                            >
                                Book for Keynote <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}