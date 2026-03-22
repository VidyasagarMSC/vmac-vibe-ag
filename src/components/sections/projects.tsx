"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { useRef } from "react"
import { ArrowUpRight, Star, GitFork, Folder, Code2 } from "lucide-react"
import { useTilt } from "@/lib/useTilt"

const TECH_COLORS: Record<string, string> = {
    "AI": "#b600f8", "ML": "#ebb2ff", "Deep Learning": "#00f0ff",
    "Android": "#00dbe9", "IBM Watson": "#006970", "Java": "#b600f8",
    "Quantum": "#00f0ff", "Research": "#ebb2ff",
    "TensorFlow": "#00dbe9", "IBM Cloud": "#b600f8",
    "Ansible": "#00f0ff", "Terraform": "#006970",
}
const STARS: Record<string, number> = {
    "Awesome-AI": 157, "WatBot": 43, "Awesome-Quantum": 89,
    "Image Classification - Code Engine": 22, "Ansible YAML Snippets": 31, "Private VPC Network": 18,
}
const getColor = (tech: string) => TECH_COLORS[tech] || "#6b7280"

function ProjectCard({ project, index }: { project: typeof portfolioData.projects[0]; index: number }) {
    const tilt = useTilt({ max: 12, perspective: 900, scale: 1.03 })
    const primaryColor = getColor(project.techStack[0])
    const stars = STARS[project.title] || 20
    const forks = project.techStack.length + 4

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.2 }}
            className="perspective-800 h-full"
        >
            <motion.div
                ref={tilt.ref as React.RefObject<HTMLDivElement>}
                style={tilt.style}
                onMouseMove={tilt.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
                onMouseEnter={tilt.onMouseEnter}
                onMouseLeave={tilt.onMouseLeave}
                className="group glass-card overflow-hidden h-full flex flex-col cursor-pointer depth-shadow relative"
            >
                {/* Top accent line (animated in on hover) */}
                <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 z-10"
                    style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent 80%)` }} />

                {/* Radial glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
                    style={{ background: `radial-gradient(circle at 50% 30%, ${primaryColor}18 0%, transparent 65%)` }} />

                <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                            style={{ background: `${primaryColor}15`, border: `1px solid ${primaryColor}25` }}>
                            <Folder className="h-4 w-4" style={{ color: primaryColor }} />
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                            className="text-foreground/50 hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/10 -mr-1 -mt-1">
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <h3 className="font-bold font-mono text-foreground text-sm mb-2">{project.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed flex-grow mb-5">{project.description}</p>

                    <div className="flex items-center gap-4 text-[11px] font-mono text-foreground/60 mb-4">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: primaryColor }} />
                            {project.techStack[0]}
                        </div>
                        <div className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{stars}</div>
                        <div className="flex items-center gap-1"><GitFork className="h-3 w-3" />{forks}</div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                        {project.techStack.slice(1).map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold"
                                style={{ background: `${getColor(t)}14`, color: getColor(t), border: `1px solid ${getColor(t)}25` }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
    const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

    return (
        <section id="projects" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
            <motion.div style={{ x: bgX }}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap z-0"
                aria-hidden>
                <span className="text-[18vw] font-black font-heading leading-none">OPEN SOURCE</span>
            </motion.div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 sm:mb-14"
                >
                    <span className="label"><Code2 className="h-3 w-3" /> Open Source</span>
                    <h2 className="display text-3xl sm:text-4xl md:text-6xl mt-3">
                        Selected<br />
                        <span className="gradient-text">Repositories</span>.
                    </h2>
                    <p className="text-foreground/60 font-mono text-xs mt-3 hidden sm:block">Hover for 3D interaction · Click for live demo</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {portfolioData.projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 sm:mt-12 text-center"
                >
                    <motion.a
                        href={portfolioData.personal.social.github}
                        target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -4, scale: 1.03 }}
                        className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl glass-card border border-border/60 text-sm font-bold depth-shadow hover:depth-shadow-lg hover:border-primary/30 transition-all duration-300"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        View all 88+ repositories
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
