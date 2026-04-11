"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { MessageSquare, Mic, Sparkles, Mail, Github, Linkedin, Globe, ExternalLink } from "lucide-react"

const SOCIALS = [
    {
        key: "linkedin",
        label: "LinkedIn",
        displayLabel: "LinkedIn",
        color: "#fff",
        bg: "#0077b5",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        key: "github",
        label: "GitHub",
        displayLabel: "GitHub",
        color: "#fff",
        bg: "#1c1c1c",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        key: "twitter",
        label: "Twitter / X",
        displayLabel: "Twitter / X",
        color: "#fff",
        bg: "#000",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        key: "website",
        label: "Website",
        displayLabel: "Website",
        color: "#fff",
        bg: "#6366f1",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        key: "dzone",
        label: "DZone",
        displayLabel: "DZone",
        color: "#fff",
        bg: "#c42127",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.082 16.094l-7.448-4.302V6.854h2.217v3.845l5.726 3.308-2.495 2.087z" />
            </svg>
        ),
    },
]

export function Contact() {
    return (
        <section id="contact" className="py-28 sm:py-36 relative overflow-hidden">
            {/* Clean indigo radial background */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(var(--primary-rgb), 0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10 opacity-30 dark:opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.1) 0%, transparent 65%)",
                    filter: "blur(80px)",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                    {/* Left — CTA copy */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                            className="mb-5"
                        >
                            <span className="label">
                                <MessageSquare className="h-3 w-3" aria-hidden="true" /> Contact
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06, duration: 0.6, ease: [0.2, 0, 0, 1] }}
                            className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-7 tracking-tighter"
                        >
                            Let&apos;s<br />
                            <span className="gradient-text">Collaborate</span>.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12, duration: 0.5 }}
                            className="text-foreground/60 text-base leading-[1.8] mb-8 max-w-md"
                        >
                            Whether you need a keynote speaker, enterprise architect, or developer advocate —
                            I&apos;m connecting global teams with transformative ideas.
                        </motion.p>

                        {/* Speaking badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.18 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold mb-8"
                            style={{
                                background: "rgba(var(--primary-rgb), 0.08)",
                                border: "1px solid rgba(var(--primary-rgb), 0.18)",
                                color: "var(--primary)",
                            }}
                        >
                            <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                            Available for global speaking engagements
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        </motion.div>

                        {/* Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.22 }}
                        >
                            <a
                                href="https://www.linkedin.com/in/vidyasagarmsc"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Get in touch via LinkedIn"
                                className="btn-primary inline-flex"
                            >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                Get in touch
                            </a>
                        </motion.div>

                        <p className="text-[10px] text-foreground/30 font-mono mt-6">
                            Global · {portfolioData.personal.location} · Open to opportunities
                        </p>
                    </div>

                    {/* Right — social links grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, type: "spring", bounce: 0.16 }}
                        className="glass-card card-accent-top gradient-border p-8 depth-shadow-lg"
                    >
                        <h3 className="text-sm font-bold text-foreground/60 font-mono uppercase tracking-widest mb-6">
                            Find me on
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {SOCIALS.map(({ key, label, displayLabel, color, bg, icon }) => {
                                const link = portfolioData.personal.social[key as keyof typeof portfolioData.personal.social]
                                if (!link) return null
                                return (
                                    <motion.a
                                        key={key}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${label} profile`}
                                        whileHover={{ y: -4, scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                                        className="inline-flex items-center gap-2.5 h-12 px-4 rounded-xl text-xs font-bold shadow-md"
                                        style={{
                                            color,
                                            background: `${bg}e8`,
                                            border: `1px solid ${bg}44`,
                                            boxShadow: `0 3px 12px ${bg}30`,
                                        }}
                                    >
                                        {icon}
                                        <span>{displayLabel}</span>
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* Bottom tagline */}
                        <div className="mt-7 pt-6 border-t border-border flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <p className="text-xs text-foreground/50 font-mono">
                                Active across all platforms
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
