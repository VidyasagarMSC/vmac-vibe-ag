
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Terminal, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { portfolioData } from "@/data/portfolio"

export function TerminalHero() {


    // Simple typing effect logic could go here, but for now let's use a static terminal look 
    // with animation blocks for better reliability and speed.

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden border-b border-border/50 bg-background">
            {/* Grid Background */}
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.05] dark:opacity-[0.08]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Terminal Window */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-[#333] overflow-hidden font-mono text-sm md:text-base"
                    >
                        {/* Terminal Header */}
                        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-[#333]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="text-[#999] text-xs flex items-center gap-1">
                                <Terminal className="h-3 w-3" />
                                <span>bash — 80x24</span>
                            </div>
                            <div className="w-12" /> {/* Spacer for centering */}
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 text-[#f0f0f0] min-h-[400px]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="mb-4">
                                    <span className="text-[#27c93f]">➜</span> <span className="text-[#57c7ff]">~</span> <span className="text-yellow-400">whoami</span>
                                    <div className="mt-1 text-emerald-400 font-bold text-lg">{portfolioData.personal.name}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <div className="mb-4">
                                    <span className="text-[#27c93f]">➜</span> <span className="text-[#57c7ff]">~</span> <span className="text-yellow-400">cat role.txt</span>
                                    <div className="mt-1 text-blue-300">{portfolioData.personal.role}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.0 }}
                            >
                                <div className="mb-6">
                                    <span className="text-[#27c93f]">➜</span> <span className="text-[#57c7ff]">~</span> <span className="text-yellow-400">cat summary.txt</span>
                                    <div className="mt-1 text-gray-300 leading-relaxed max-w-2xl">
                                        {portfolioData.personal.summary}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.8 }}
                            >
                                <span className="text-[#27c93f]">➜</span> <span className="text-[#57c7ff]">~</span> <span className="text-yellow-400">./init_portfolio.sh</span>
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <Link href="#contact" className="px-5 py-2 bg-[#27c93f] text-black font-bold rounded hover:bg-[#27c93f]/90 transition-colors">
                                        Contact Me
                                    </Link>
                                    <Link href="#projects" className="px-5 py-2 bg-[#57c7ff] text-black font-bold rounded hover:bg-[#57c7ff]/90 transition-colors">
                                        View Projects
                                    </Link>
                                </div>
                                <div className="mt-6 flex items-center gap-4 text-[#999]">
                                    {portfolioData.personal.social.github && (
                                        <a href={portfolioData.personal.social.github} className="hover:text-white transition-colors" target="_blank"><Github className="h-5 w-5" /></a>
                                    )}
                                    {portfolioData.personal.social.linkedin && (
                                        <a href={portfolioData.personal.social.linkedin} className="hover:text-white transition-colors" target="_blank"><Linkedin className="h-5 w-5" /></a>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.5 }}
                                className="mt-6"
                            >
                                <span className="text-[#27c93f]">➜</span> <span className="text-[#57c7ff]">~</span> <span className="animate-pulse">_</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
