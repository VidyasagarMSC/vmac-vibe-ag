"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { BookOpen, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"

export function Articles() {
    const articles = portfolioData.articles.featured.slice(0, 6)

    const platformColors: Record<string, string> = {
        "Dev.to": "bg-blue-500/10 text-blue-500",
        "Medium": "bg-green-500/10 text-green-500",
        "VMacWrites": "bg-purple-500/10 text-purple-500",
        "DZone": "bg-red-500/10 text-red-500",
        "Substack": "bg-yellow-500/10 text-yellow-500",
    }

    return (
        <section id="articles" className="section">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Articles
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Latest Writing</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bento-item group"
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        platformColors[article.platform] || 'bg-muted text-muted-foreground'
                                    }`}>
                                        {article.platform}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                                </div>
                                
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                                    {article.title}
                                </h3>
                                
                                <p className="text-sm text-muted-foreground">
                                    {article.date}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <a
                        href={portfolioData.personal.social.dzone}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-flex items-center gap-2"
                    >
                        View All Articles <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}