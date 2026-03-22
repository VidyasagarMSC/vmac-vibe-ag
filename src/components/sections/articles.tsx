"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useRef } from "react"
import { ExternalLink, TrendingUp, Calendar, Rss, BookOpen, Eye, FileText } from "lucide-react"
import { useTilt } from "@/lib/useTilt"

const PLATFORM_META: Record<string, { color: string; letter: string; emoji: string }> = {
    DZone: { color: "#c42127", letter: "DZ", emoji: "📰" },
    "Dev.to": { color: "#3d4250", letter: "DEV", emoji: "💻" },
    Medium: { color: "#111", letter: "M", emoji: "📝" },
    VMacWrites: { color: "#21759b", letter: "VM", emoji: "✍️" },
    Substack: { color: "#ff6719", letter: "SS", emoji: "📧" },
    Hackernoon: { color: "#00d33c", letter: "HN", emoji: "🎩" },
}
const getMeta = (name: string) => PLATFORM_META[name] ?? { color: "#6b7280", letter: name[0], emoji: "📄" }

function PlatformTile({ platform, index }: { platform: typeof portfolioData.articles.platforms[0]; index: number }) {
    const tilt = useTilt({ max: 20, perspective: 700, scale: 1.06 })
    const meta = getMeta(platform.name)

    return (
        <motion.a
            ref={tilt.ref as React.RefObject<HTMLAnchorElement>}
            style={tilt.style}
            onMouseMove={tilt.onMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
            onMouseEnter={tilt.onMouseEnter}
            onMouseLeave={tilt.onMouseLeave}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40, rotateX: 30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, type: "spring", bounce: 0.3 }}
            className="group glass border border-border rounded-2xl p-5 text-center relative overflow-hidden depth-shadow"
        >
            {/* Color wash */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                style={{ background: `${meta.color}0d` }} />
            {/* Bottom border color flash */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: meta.color }} />

            <div className="relative z-10">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center text-[10px] font-black mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${meta.color}18`, color: meta.color, border: `1.5px solid ${meta.color}30` }}>
                    {meta.letter}
                </div>
                <h3 className="text-[11px] font-bold text-foreground mb-0.5 truncate">{platform.name}</h3>
                <span className="text-[9px] text-foreground/30 font-mono block mb-3 truncate">{platform.role}</span>
                <div className="space-y-0.5">
                    {platform.stats.views && (
                        <div className="flex items-center justify-center gap-1 text-[9px]">
                            <Eye className="h-2.5 w-2.5" style={{ color: meta.color }} />
                            <span className="font-bold text-foreground">{platform.stats.views}</span>
                        </div>
                    )}
                    {platform.stats.posts && (
                        <div className="flex items-center justify-center gap-1 text-[9px] text-foreground/40">
                            <FileText className="h-2.5 w-2.5" />
                            {platform.stats.posts} posts
                        </div>
                    )}
                </div>
            </div>
        </motion.a>
    )
}

export function Articles() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
    const bgY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"])

    return (
        <section id="articles" ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Subtle section bg */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(var(--primary-rgb),0.03) 0%, transparent 70%)" }} />
            <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 pointer-events-none">
                <div className="w-full h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 80%, rgba(var(--accent-rgb),0.03) 0%, transparent 70%)" }} />
            </motion.div>

            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="label"><Rss className="h-3 w-3" /> Writing</span>
                    <h2 className="display text-4xl md:text-6xl mt-3">
                        550K+ minds<br />
                        <span className="gradient-text">reached</span>.
                    </h2>
                    <p className="text-foreground/40 font-mono text-xs mt-3">Across 6 platforms · Auto-updated via GitHub Actions weekly</p>
                </motion.div>

                {/* 3D Vanishing point platform tiles */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-14">
                    {portfolioData.articles.platforms.map((p, i) => (
                        <PlatformTile key={i} platform={p} index={i} />
                    ))}
                </div>

                {/* Featured articles */}
                <div>
                    <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Latest Articles
                        <span className="ml-auto text-[10px] font-mono text-foreground/30">auto-updated weekly ↻</span>
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3">
                        {portfolioData.articles.featured.map((article, i) => {
                            const meta = getMeta(article.platform)
                            return (
                                <motion.a
                                    key={i}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    whileHover={{ x: 4 }}
                                    className="group flex items-start gap-4 p-5 glass border border-border rounded-xl transition-all duration-300 hover:border-opacity-50"
                                    style={{ borderLeftWidth: "3px", borderLeftColor: meta.color }}
                                >
                                    <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 text-[9px] font-black transition-transform group-hover:scale-110"
                                        style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}25` }}>
                                        {meta.letter}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug mb-2">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-[10px] text-foreground/40 font-mono">
                                            <span className="px-1.5 py-0.5 rounded" style={{ background: `${meta.color}15`, color: meta.color }}>{article.platform}</span>
                                            <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />{article.date}</span>
                                        </div>
                                    </div>
                                    <ExternalLink className="h-3.5 w-3.5 text-foreground/20 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                                </motion.a>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-3 justify-center mt-8"
                    >
                        {portfolioData.articles.platforms.slice(0, 4).map((p, i) => {
                            const meta = getMeta(p.name)
                            return (
                                <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border text-xs font-semibold transition-all"
                                    style={{ borderColor: `${meta.color}35`, color: meta.color }}>
                                    <BookOpen className="h-3.5 w-3.5" />Read on {p.name}
                                </motion.a>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
