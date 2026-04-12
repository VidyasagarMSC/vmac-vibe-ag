"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useRef } from "react"
import { ArrowUpRight, Star, GitFork, Folder, Code2 } from "lucide-react"
import { useTilt } from "@/lib/useTilt"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Magnetic } from "@/components/ui/Magnetic"

const TECH_COLORS: Record<string, string> = {
    "AI": "#818cf8", "ML": "#a78bfa", "Deep Learning": "#6366f1",
    "Android": "#3ddc84", "IBM Watson": "#6366f1", "Java": "#ed8936",
    "Quantum": "#38bdf8", "Research": "#a78bfa",
    "TensorFlow": "#ff6f00", "IBM Cloud": "#6366f1",
    "Ansible": "#ee0000", "Terraform": "#7b42bc",
    "JavaScript": "#f7df1e", "YAML": "#cb171e", "DevOps": "#818cf8",
    "HCL": "#7b42bc",
}
const STARS: Record<string, number> = {
    "Awesome-AI": 157,
    "WatBot": 43,
    "Awesome-Quantum": 89,
    "Image Classification - Code Engine": 22,
    "Ansible YAML Snippets": 31,
    "Private VPC Network": 18,
}
const getColor = (tech: string) => TECH_COLORS[tech] || "#6b7280"

const BENTO_SIZES = [
    { col: "lg:col-span-2 lg:row-span-2", featured: true },
    { col: "lg:col-span-1 lg:row-span-1", featured: false },
    { col: "lg:col-span-1 lg:row-span-1", featured: false },
    { col: "lg:col-span-1 lg:row-span-2", featured: false },
    { col: "lg:col-span-1 lg:row-span-1", featured: false },
    { col: "lg:col-span-1 lg:row-span-1", featured: false },
]

function ProjectCard({
    project,
    index,
    featured,
}: {
    project: typeof portfolioData.projects[0]
    index: number
    featured: boolean
}) {
    const stars = STARS[project.title] || 20
    const forks = project.techStack.length + 4

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.07, type: "spring", bounce: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`${BENTO_SIZES[index]?.col ?? ""} relative overflow-hidden group`}
        >
            <SpotlightCard className={`p-5 sm:p-6 flex flex-col justify-between h-full relative z-10 w-full ${featured ? "gap-4" : ""}`} containerClassName="h-full">
                <div className="flex-1 flex flex-col">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                        <div
                            className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 bg-primary/10"
                            aria-hidden="true"
                        >
                            <Folder className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            {featured && (
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                    Lead Architect
                                </span>
                            )}
                            <Magnetic strength={0.3}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${project.title} on GitHub`}
                                    className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-muted -mr-1 -mt-1 shrink-0"
                                >
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                            </Magnetic>
                        </div>
                    </div>

                    <h3 className={`font-bold text-foreground ${featured ? "text-xl sm:text-2xl" : "text-sm"} mb-2 leading-tight`}>
                        {project.title}
                    </h3>
                    <p className={`text-muted-foreground flex-grow ${featured ? "text-sm sm:text-base mb-5" : "text-sm mb-4"}`}>
                        {project.description}
                    </p>
                    </div>

                    <div className="mt-auto">
                        {/* Meta row */}
                        <div className="flex items-center gap-4 text-[11px] font-mono font-semibold text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                                <span className="truncate max-w-[80px] sm:max-w-none">{project.techStack[0]}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0" aria-label={`${stars} stars`}>
                                <Star className="h-3 w-3 text-amber-400" aria-hidden="true" />{stars}
                            </div>
                            <div className="flex items-center gap-1 shrink-0" aria-label={`${forks} forks`}>
                                <GitFork className="h-3 w-3" aria-hidden="true" />{forks}
                            </div>
                            <div className="ml-auto opacity-40 text-[9px] uppercase tracking-tighter">
                                Active 2h ago
                            </div>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                            {project.techStack.slice(1).map((t, i) => (
                                <span
                                    key={i}
                                    className="badge bg-muted/60"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
            </SpotlightCard>
        </motion.div>
    )
}

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section id="projects" ref={sectionRef} className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                    className="mb-10 sm:mb-14"
                >
                    <span className="label"><Code2 className="h-3 w-3" aria-hidden="true" /> Open Source</span>
                    <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 tracking-tighter">
                        Selected<br />
                        <span className="gradient-text">Repositories</span>.
                    </h2>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-fr">
                    {portfolioData.projects.map((project, i) => (
                        <ProjectCard
                            key={i}
                            project={project}
                            index={i}
                            featured={i === 0}
                        />
                    ))}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 sm:mt-12 text-center"
                >
                    <Magnetic strength={0.15}>
                        <a
                            href={portfolioData.personal.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View all ${portfolioData.stats.githubRepos}+ repositories on GitHub`}
                            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-card border border-border text-sm font-semibold card-hover hover:bg-muted transition-colors"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            View all {portfolioData.stats.githubRepos}+ repositories
                            <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors" aria-hidden="true" />
                        </a>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    )
}
