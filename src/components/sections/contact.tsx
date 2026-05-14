"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { MessageSquare, Mail, Sparkles } from "lucide-react"

export function Contact() {
    const platforms = portfolioData.articles.platforms

    const platformColors: Record<string, string> = {
        "DZone": "hover:border-yellow-500",
        "Dev.to": "hover:border-blue-500",
        "Medium": "hover:border-green-500",
    }

    return (
        <section id="contact" className="section">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Connect
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Let's Stay in Touch</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platforms.map((platform, i) => (
                        <motion.a
                            key={i}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bento-item hover:border-accent ${platformColors[platform.name] || ''}`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{platform.name}</h3>
                                    <p className="text-sm text-muted-foreground">{platform.role}</p>
                                </div>
                            </div>
                            {platform.stats && (
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    {Object.entries(platform.stats).map(([key, value]) => (
                                        <span key={key}>
                                            <span className="font-semibold text-foreground">{value}</span> {key}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}