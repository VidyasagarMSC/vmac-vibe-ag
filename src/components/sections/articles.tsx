
"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { ExternalLink, BookOpen, TrendingUp, Eye, FileText, Calendar, Users } from "lucide-react"

export function Articles() {
    return (
        <section id="articles" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold font-heading mb-2 flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary" />
                        Technical Writing
                    </h2>
                    <p className="text-muted-foreground">Sharing knowledge across platforms.</p>
                </motion.div>

                {/* Platform Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
                >
                    {portfolioData.articles.platforms.map((platform, index) => (
                        <a
                            key={index}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-all hover:shadow-lg text-center"
                        >
                            <h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                                {platform.name}
                            </h3>
                            <span className="text-xs text-muted-foreground font-mono block mb-3">{platform.role}</span>

                            <div className="space-y-1">
                                {platform.stats.views && (
                                    <div className="flex items-center justify-center gap-1 text-xs">
                                        <Eye className="h-3 w-3 text-primary" />
                                        <span className="font-bold text-foreground">{platform.stats.views}</span>
                                        <span className="text-muted-foreground">views</span>
                                    </div>
                                )}
                                {platform.stats.posts && (
                                    <div className="flex items-center justify-center gap-1 text-xs">
                                        <FileText className="h-3 w-3 text-accent" />
                                        <span className="font-bold text-foreground">{platform.stats.posts}</span>
                                        <span className="text-muted-foreground">posts</span>
                                    </div>
                                )}
                                {(platform.stats.followers || platform.stats.readers) && (
                                    <div className="flex items-center justify-center gap-1 text-xs">
                                        <Users className="h-3 w-3 text-green-500" />
                                        <span className="font-bold text-foreground">{platform.stats.followers || platform.stats.readers}</span>
                                        <span className="text-muted-foreground">{platform.stats.followers ? 'followers' : 'readers'}</span>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Featured Articles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Latest Posts
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {portfolioData.articles.featured.map((article, index) => (
                            <motion.a
                                key={index}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group flex items-start gap-4 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-all"
                            >
                                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="font-mono px-1.5 py-0.5 bg-secondary/50 rounded">{article.platform}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {article.date}
                                        </span>
                                    </div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="https://dzone.com/authors/vidyasagarmsc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        View all articles on DZone
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
