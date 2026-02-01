
"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Cpu } from "lucide-react"
import Link from "next/link"
import { portfolioData } from "@/data/portfolio"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background border-b border-border/40">
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="flex flex-col items-center text-center space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs font-mono text-muted-foreground"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {portfolioData.personal.tagline}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight font-heading text-foreground"
                    >
                        Architecting <span className="text-muted-foreground font-light italic">Intelligent</span> <br />
                        <span className="relative inline-block">
                            <span className="relative z-10">Digital Solutions</span>
                            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 -skew-x-12 -z-0" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light"
                    >
                        <span className="font-mono text-sm text-primary mr-2">&gt;</span>
                        {portfolioData.personal.summary}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 pt-6"
                    >
                        <Link
                            href="#projects"
                            className="group inline-flex h-11 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                        >
                            <Cpu className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                            View Architecture
                        </Link>
                        <Link
                            href="#contact"
                            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground font-mono"
                        >
                            ./contact_me.sh
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-6 pt-8 border-t border-border/50 w-full max-w-xs justify-center"
                    >
                        {portfolioData.personal.social.github && (
                            <a href={portfolioData.personal.social.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></a>
                        )}
                        {portfolioData.personal.social.linkedin && (
                            <a href={portfolioData.personal.social.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
