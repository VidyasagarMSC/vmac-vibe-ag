"use client"

import { useState, useEffect } from "react"
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
    const [mounted, setMounted] = useState(false)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

    useEffect(() => { setMounted(true) }, [])

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

    const isDark = theme === "dark"

    return (
        <>
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left"
                style={{ scaleX, background: "linear-gradient(90deg, var(--primary), #a78bfa, var(--accent))" }}
            />

            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "glass-nav" : "bg-transparent"
            )}>
                <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: -3 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="h-8 w-8 rounded-xl flex items-center justify-center font-black text-sm font-heading"
                            style={{
                                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                color: "#fff",
                                boxShadow: "0 2px 12px rgba(var(--primary-rgb), 0.4)"
                            }}
                        >
                            VM
                        </motion.div>
                        <span className="hidden sm:inline font-bold font-heading text-foreground/80 group-hover:text-foreground transition-colors">
                            Vidyasagar
                        </span>
                        <span className="gradient-text text-2xl font-black leading-none">.</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-0.5">
                        {NAV.map(({ name, href }) => {
                            const id = href.replace("#", "")
                            const isActive = active === id
                            return (
                                <Link
                                    key={name}
                                    href={href}
                                    className={cn(
                                        "relative px-3.5 py-1.5 text-sm font-mono rounded-xl transition-colors duration-200",
                                        isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"
                                    )}
                                >
                                    {name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 rounded-xl -z-10"
                                            style={{
                                                background: "rgba(var(--primary-rgb), 0.1)",
                                                border: "1px solid rgba(var(--primary-rgb), 0.2)"
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}

                        <div className="mx-2 h-4 w-px bg-border" />

                        {/* Theme toggle */}
                        {mounted && (
                            <motion.button
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                whileTap={{ scale: 0.88, rotate: isDark ? -30 : 30 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="h-9 w-9 rounded-xl flex items-center justify-center glass-panel border border-border/60 hover:border-primary/30 transition-colors relative overflow-hidden"
                                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0, y: 8 }}
                                            animate={{ rotate: 0, opacity: 1, y: 0 }}
                                            exit={{ rotate: 90, opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun className="h-4 w-4 text-amber-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0, y: 8 }}
                                            animate={{ rotate: 0, opacity: 1, y: 0 }}
                                            exit={{ rotate: -90, opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon className="h-4 w-4 text-blue-400" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-1.5 md:hidden">
                        {mounted && (
                            <button
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                className="h-10 w-10 flex items-center justify-center rounded-xl glass-panel border border-border/50 relative overflow-hidden"
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div key="sun-m"
                                            initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                            <Sun className="h-4 w-4 text-amber-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon-m"
                                            initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                            <Moon className="h-4 w-4 text-blue-400" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        )}
                        <button
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={open}
                            className="h-10 w-10 flex items-center justify-center rounded-xl glass-panel border border-border/50 transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {open
                                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="md:hidden glass-nav border-t border-border/40 overflow-hidden"
                        >
                            <nav className="flex flex-col px-4 py-3 gap-1">
                                {NAV.map(({ name, href }) => {
                                    const id = href.replace("#", "")
                                    const isActive = active === id
                                    return (
                                        <Link
                                            key={name}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "font-mono text-sm py-3 px-4 rounded-xl transition-all min-h-[44px] flex items-center",
                                                isActive
                                                    ? "text-primary bg-primary/10 border border-primary/20"
                                                    : "text-foreground/60 hover:text-primary hover:bg-primary/8"
                                            )}
                                        >
                                            {name}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}
