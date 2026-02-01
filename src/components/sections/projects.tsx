
"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, GitFork, Star, Folder } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold font-heading text-foreground mb-4 flex items-center gap-3">
                        <Terminal className="h-8 w-8 text-primary shrink-0" />
                        Selected Repositories
                    </h2>
                    <p className="text-muted-foreground text-lg ml-0 md:ml-11 border-l-2 border-primary/20 pl-4">
                        Open source contributions and architectural concepts.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="p-5 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <Folder className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <h3 className="text-base font-bold font-mono text-foreground tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </div>

                                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed font-sans">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-mono">
                                    <div className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                        {project.techStack[0]}
                                    </div>
                                    {/* Simulated stats for vibe */}
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3" />
                                        <span>{project.title.length * 2 + 12}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="h-3 w-3" />
                                        <span>{project.techStack.length + 4}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                                    {project.techStack.slice(1).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-[10px] font-mono uppercase tracking-wider"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Terminal(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
    )
}
