"use client"

import { portfolioData } from "@/data/portfolio"
import { motion } from "framer-motion"
import { FolderKanban, Github, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"

export function Projects() {
    const projects = portfolioData.projects

    return (
        <section id="projects" className="section bg-muted/30">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="label mb-4">
                        <FolderKanban className="w-3.5 h-3.5" />
                        Projects
                    </span>
                    <h2 className="display text-4xl sm:text-5xl">Featured Work</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bento-item relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FolderKanban className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-muted hover:bg-accent/10 transition-colors"
                                            >
                                                <Github className="w-4 h-4 text-muted-foreground" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.slice(0, 3).map((tech, j) => (
                                        <span
                                            key={j}
                                            className="px-2 py-1 rounded-md bg-muted text-xs font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}