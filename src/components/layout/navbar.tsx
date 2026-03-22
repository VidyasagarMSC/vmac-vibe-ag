"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const NAV = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState("")

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const observers: IntersectionObserver[] = []
        NAV.forEach(({ href }) => {
            const id = href.replace("#", "")
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActive(id) },
                { threshold: 0.3 }
            )
            obs.observe(el)
            observers.push(obs)
        })
        return () => observers.forEach(o => o.disconnect())
    }, [])

    return (
        <>
            {/* Scroll progress bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left"
                style={{ scaleX, background: "linear-gradient(90deg, #5046e5, #a78bfa, #06b6d4)" }} />

            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "backdrop-blur-2xl bg-background/70 border-b border-border shadow-[0_1px_0_rgba(255,255,255,0.05)]" : "bg-transparent"
            )}>
                <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center font-black text-sm text-primary font-heading"
                            style={{ background: "rgba(var(--primary-rgb),0.1)", border: "1px solid rgba(var(--primary-rgb),0.2)" }}>
                            VM
                        </div>
                        <span className="hidden sm:inline font-bold font-heading text-foreground">Vidyasagar</span>
                        <span className="gradient-text text-2xl font-black leading-none">.</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV.map(({ name, href }) => {
                            const id = href.replace("#", "")
                            const isActive = active === id
                            return (
                                <Link key={name} href={href}
                                    className={cn(
                                        "relative px-3.5 py-1.5 text-sm font-mono rounded-xl transition-colors",
                                        isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
                                    )}>
                                    {name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 rounded-xl -z-10"
                                            style={{ background: "rgba(var(--primary-rgb),0.1)", border: "1px solid rgba(var(--primary-rgb),0.2)" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                        <div className="mx-1 h-4 w-px bg-border" />
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary/60 transition-colors relative border border-transparent hover:border-border"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-4 w-4 text-yellow-400 absolute transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
                            <Moon className="h-4 w-4 text-blue-400 absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
                        </button>
                    </nav>

                    {/* Mobile */}
                    <div className="flex items-center gap-1 md:hidden">
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-10 w-10 flex items-center justify-center rounded-xl relative">
                            <Sun className="h-4 w-4 text-yellow-400 absolute transition-all scale-100 dark:scale-0" />
                            <Moon className="h-4 w-4 text-blue-400 absolute transition-all scale-0 dark:scale-100" />
                        </button>
                        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
                            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-secondary/60 transition-colors">
                            <AnimatePresence mode="wait">
                                {open
                                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-5 w-5" /></motion.div>
                                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-5 w-5" /></motion.div>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }} className="md:hidden backdrop-blur-2xl bg-background/80 border-b border-border">
                            <nav className="flex flex-col p-4 gap-1">
                                {NAV.map(({ name, href }) => (
                                    <Link key={name} href={href} onClick={() => setOpen(false)}
                                        className="font-mono text-sm text-foreground/60 hover:text-primary py-3 px-4 rounded-xl hover:bg-secondary/40 transition-colors min-h-[44px] flex items-center">
                                        {name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}
