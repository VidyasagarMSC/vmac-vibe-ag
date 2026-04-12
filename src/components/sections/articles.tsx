"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { ExternalLink, TrendingUp, Calendar, Rss, Eye, FileText, BookOpen, ArrowUpRight } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Magnetic } from "@/components/ui/Magnetic"

const PLATFORM_META: Record<string, { color: string; letter: string; bg: string }> = {
    DZone:      { color: "#c42127", letter: "DZ",  bg: "rgba(196,33,39,0.07)"  },
    "Dev.to":   { color: "#5c6ac4", letter: "DEV", bg: "rgba(92,106,196,0.07)" },
    Medium:     { color: "#292929", letter: "M",   bg: "rgba(41,41,41,0.06)"   },
    VMacWrites: { color: "#6366f1", letter: "VM",  bg: "rgba(99,102,241,0.07)" },
    Substack:   { color: "#ff6719", letter: "SS",  bg: "rgba(255,103,25,0.07)" },
    Hackernoon: { color: "#00d33c", letter: "HN",  bg: "rgba(0,211,60,0.07)"   },
}
const getMeta = (name: string) =>
    PLATFORM_META[name] ?? { color: "#6b7280", letter: name[0], bg: "rgba(107,114,128,0.07)" }

function PlatformChip({ platform, index }: { platform: typeof portfolioData.articles.platforms[0]; index: number }) {
    const meta = getMeta(platform.name)

    return (
        <Magnetic strength={0.2}>
            <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read articles on ${platform.name}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-muted border border-border hover:border-primary/20 transition-colors group min-w-[100px]"
            >
                <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-transform duration-200 group-hover:scale-110 bg-background"
                    style={{ color: meta.color }}
                    aria-hidden="true"
                >
                    {meta.letter}
                </div>
                <span className="text-[11px] font-semibold text-foreground/70 group-hover:text-foreground transition-colors">{platform.name}</span>
                {platform.stats.views && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-foreground/75 font-medium">
                        <Eye className="h-2.5 w-2.5" aria-hidden="true" />
                        {platform.stats.views}
                    </div>
                )}
                {!platform.stats.views && platform.stats.posts && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-foreground/75 font-medium">
                        <FileText className="h-2.5 w-2.5" aria-hidden="true" />
                        {platform.stats.posts} posts
                    </div>
                )}
            </motion.a>
        </Magnetic>
    )
}

export function Articles() {
    return (
        <section id="articles" className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(var(--primary-rgb),0.04) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                    className="mb-10 sm:mb-14"
                >
                    <span className="label"><Rss className="h-3 w-3" aria-hidden="true" /> Writing</span>
                    <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 tracking-tighter">
                        550K+ minds<br />
                        <span className="gradient-text">reached</span>.
                    </h2>
                    <p className="text-foreground/45 font-mono text-xs mt-4">
                        Across 6 platforms · Updated weekly via GitHub Actions
                    </p>
                </motion.div>

                <div className="mb-12 sm:mb-16 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-0 sm:px-0">
                    <div className="flex gap-4 sm:gap-6 w-max pb-4 px-1">
                        {portfolioData.articles.platforms.map((p, i) => (
                            <PlatformChip key={i} platform={p} index={i} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center gap-2.5 text-base font-bold mb-6">
                        <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                        Latest Articles
                        <span className="ml-auto text-[10px] font-mono text-foreground/30 hidden sm:inline">
                            auto-updated weekly ↻
                        </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolioData.articles.featured.map((article, i) => {
                            const meta = getMeta(article.platform)
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.2, 0, 0, 1] }}
                                    className="h-full"
                                >
                                    <SpotlightCard containerClassName="group h-full" className="h-full flex flex-col p-6">
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Read: ${article.title} on ${article.platform}`}
                                            className="flex flex-col h-full gap-5"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-[10px] font-black bg-background border border-border"
                                                    style={{ color: meta.color }}
                                                    aria-hidden="true"
                                                >
                                                    {meta.letter}
                                                </div>
                                                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                                            </div>

                                            <div className="flex-grow">
                                                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-base mb-3 line-clamp-2 md:line-clamp-3 leading-tight">
                                                    {article.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground font-semibold pt-4 border-t border-border mt-auto">
                                                <span>{article.platform}</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-2.5 w-2.5" aria-hidden="true" />{article.date}
                                                </span>
                                            </div>
                                        </a>
                                    </SpotlightCard>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-3 justify-center mt-8 sm:mt-10"
                    >
                        {portfolioData.articles.platforms.slice(0, 4).map((p, i) => {
                            const meta = getMeta(p.name)
                            return (
                                <Magnetic key={i} strength={0.1}>
                                    <motion.a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Read on ${p.name}`}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border text-xs font-semibold transition-all hover:bg-muted"
                                        style={{ borderColor: `${meta.color}28`, color: meta.color }}
                                    >
                                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                                        Read on {p.name}
                                    </motion.a>
                                </Magnetic>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
